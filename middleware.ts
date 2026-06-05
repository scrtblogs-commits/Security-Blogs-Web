import { NextResponse, type NextRequest } from 'next/server'
import type { CmsRedirect } from './lib/cmsTypes'

// ─────────────────────────────────────────────────────────────────────
// Redirects middleware
//
// Reads the CMS-managed Redirects collection and rewrites/redirects
// incoming requests accordingly. Replaces the bulk of the static
// .htaccess RedirectMatch rules that lived in public/.htaccess during
// the static-export era.
//
// Behaviour per request:
//
//   1. Bypass — never run for /api/, /_next/, /admin/, file extensions
//      with a dot, or the public static assets folder.
//
//   2. Fetch — at most once every CACHE_TTL_MS, pull the active
//      redirects from /api/redirects. The fetch is awaited the first
//      time, then cached at module scope until TTL expires.
//
//   3. Match — literal `fromPath` first (fast), then regex
//      `fromPath` rules. Regex rules support $1/$2 backreferences in
//      `toPath`.
//
//   4. Redirect — return NextResponse.redirect with the matched
//      status code. Best-effort POST to /api/redirects/:id/hit so
//      the CMS dashboard shows real traffic per rule. Hit-counter
//      failures are silently swallowed so the user still gets
//      redirected if the CMS is briefly down.
//
// Edge runtime is used so the middleware is fast and globally
// available — fetch() is the only API needed.
// ─────────────────────────────────────────────────────────────────────

export const config = {
  matcher: [
    // Run on everything EXCEPT the bypass list. Negative lookahead is
    // the standard Next.js pattern.
    '/((?!api/|_next/|admin/|.*\\..*).*)',
  ],
}

const CMS_URL = process.env.CMS_URL ?? 'http://localhost:3001'
const CACHE_TTL_MS = 60 * 1000

type CachedRedirects = {
  fetchedAt: number
  literal: Map<string, CmsRedirect>
  regex: Array<{ rule: CmsRedirect; re: RegExp }>
}

let cache: CachedRedirects | null = null
let inflight: Promise<CachedRedirects> | null = null

async function fetchRedirects(): Promise<CachedRedirects> {
  const res = await fetch(
    `${CMS_URL}/api/redirects?where[isActive][equals]=true&limit=500&depth=0`,
    { headers: { 'Content-Type': 'application/json' } },
  )
  if (!res.ok) throw new Error(`CMS responded ${res.status}`)
  const json = (await res.json()) as { docs: CmsRedirect[] }
  const docs = json.docs ?? []

  const literal = new Map<string, CmsRedirect>()
  const regex: Array<{ rule: CmsRedirect; re: RegExp }> = []
  for (const r of docs) {
    if (r.isRegex) {
      try {
        regex.push({ rule: r, re: new RegExp(r.fromPath) })
      } catch (err) {
        console.warn(`[middleware] bad regex for redirect ${r.id}: ${r.fromPath}`, err)
      }
    } else {
      literal.set(normalizePath(r.fromPath), r)
    }
  }
  return { fetchedAt: Date.now(), literal, regex }
}

async function getRedirects(): Promise<CachedRedirects | null> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) return cache
  if (inflight) return inflight
  inflight = fetchRedirects()
    .then((c) => { cache = c; inflight = null; return c })
    .catch((err) => {
      console.error('[middleware] redirects fetch failed', err)
      inflight = null
      // If we have a stale cache, keep using it rather than losing all
      // redirects when the CMS hiccups.
      return cache ?? { fetchedAt: Date.now(), literal: new Map(), regex: [] }
    })
  return inflight
}

function normalizePath(p: string): string {
  if (!p) return '/'
  // Strip query/hash, ensure leading slash, strip trailing (we'll
  // compare both with and without).
  const noQuery = p.split(/[?#]/)[0]
  const withSlash = noQuery.startsWith('/') ? noQuery : `/${noQuery}`
  return withSlash.length > 1 && withSlash.endsWith('/')
    ? withSlash.slice(0, -1)
    : withSlash
}

function statusCodeNum(s: CmsRedirect['statusCode']): 301 | 302 | 307 | 308 {
  switch (s) {
    case '302': return 302
    case '307': return 307
    case '308': return 308
    default:    return 301
  }
}

function fireHit(id: string) {
  // Note: NOT awaited on purpose.
  fetch(`${CMS_URL}/api/redirects/${id}/hit`, { method: 'POST' }).catch(() => {})
}

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const { pathname, search } = req.nextUrl
  const normalized = normalizePath(pathname)

  const r = await getRedirects()
  if (!r) return NextResponse.next()

  // 1. Literal match
  const literal = r.literal.get(normalized)
  if (literal) {
    const dest = new URL(literal.toPath + search, req.url)
    fireHit(literal.id)
    return NextResponse.redirect(dest, statusCodeNum(literal.statusCode))
  }

  // 2. Regex match — first hit wins, in CMS list order.
  for (const { rule, re } of r.regex) {
    const m = normalized.match(re)
    if (!m) continue
    // Apply $1, $2 etc. backreferences to the destination.
    const resolved = rule.toPath.replace(/\$(\d+)/g, (_, idx) => m[Number(idx)] ?? '')
    const dest = new URL(resolved + search, req.url)
    fireHit(rule.id)
    return NextResponse.redirect(dest, statusCodeNum(rule.statusCode))
  }

  return NextResponse.next()
}
