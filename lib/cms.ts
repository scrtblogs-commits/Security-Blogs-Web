// ─────────────────────────────────────────────────────────────────────
// Typed CMS client — single entry point for every read the marketing
// site performs against the Payload REST API.
//
// Why a thin wrapper instead of calling fetch() directly from each page:
//
//   1. ISR control lives in ONE place. Every getter defaults to
//      revalidate: 60s — change it here to slow or speed the entire
//      site's cache invalidation. Per-call override available via opts.
//
//   2. Error handling is consistent. A missing record returns null, not
//      a thrown exception, so pages can call notFound() cleanly.
//
//   3. Server-only auth header is attached centrally. The PAYLOAD_API_KEY
//      stays out of the client bundle by virtue of this module never
//      being imported from a 'use client' file.
//
//   4. The Payload REST URL shape (/api/<collection>?where[slug][equals]=…)
//      stays out of page code. Pages get a clean getService('aio').
//
// Pages should import only from here, never from cms/ directly.
// ─────────────────────────────────────────────────────────────────────

import type {
  CmsCaseStudy,
  CmsPage,
  CmsPartner,
  CmsPost,
  CmsPostCategory,
  CmsRedirect,
  CmsService,
  CmsSettings,
} from './cmsTypes'

const CMS_URL = process.env.CMS_URL ?? 'http://localhost:3001'
const API_KEY = process.env.PAYLOAD_API_KEY ?? ''
const DEFAULT_REVALIDATE = 60

type FetchOpts = { revalidate?: number | false; tag?: string }

function buildHeaders(): HeadersInit {
  const h: Record<string, string> = { 'Content-Type': 'application/json' }
  if (API_KEY) h['Authorization'] = `users API-Key ${API_KEY}`
  return h
}

async function cmsFetch<T>(path: string, opts: FetchOpts = {}): Promise<T | null> {
  const url = `${CMS_URL}${path}`
  const revalidate = opts.revalidate === undefined ? DEFAULT_REVALIDATE : opts.revalidate
  const tags = opts.tag ? [opts.tag] : undefined

  try {
    const res = await fetch(url, {
      headers: buildHeaders(),
      next: { revalidate: revalidate === false ? 0 : revalidate, tags },
    })
    if (res.status === 404) return null
    if (!res.ok) {
      console.error(`[cms] ${res.status} ${res.statusText} for ${url}`)
      return null
    }
    return (await res.json()) as T
  } catch (err) {
    console.error(`[cms] network error for ${url}`, err)
    return null
  }
}

// Payload list responses always have this envelope shape.
type ListEnvelope<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
}

// ───────── Settings (singleton global) ──────────────────────────────
export async function getSettings(opts?: FetchOpts): Promise<CmsSettings | null> {
  return cmsFetch<CmsSettings>('/api/globals/settings?depth=2', { tag: 'settings', ...opts })
}

// ───────── Services ─────────────────────────────────────────────────
export async function getServices(opts?: FetchOpts): Promise<CmsService[]> {
  const env = await cmsFetch<ListEnvelope<CmsService>>(
    '/api/services?where[status][equals]=published&sort=order&limit=50&depth=1',
    { tag: 'services', ...opts },
  )
  return env?.docs ?? []
}

export async function getService(slug: string, opts?: FetchOpts): Promise<CmsService | null> {
  const env = await cmsFetch<ListEnvelope<CmsService>>(
    `/api/services?where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&limit=1&depth=2`,
    { tag: `service:${slug}`, ...opts },
  )
  return env?.docs[0] ?? null
}

// ───────── Case Studies ─────────────────────────────────────────────
export async function getCaseStudies(opts?: FetchOpts): Promise<CmsCaseStudy[]> {
  const env = await cmsFetch<ListEnvelope<CmsCaseStudy>>(
    '/api/case-studies?where[status][equals]=published&sort=-publishedAt&limit=100&depth=1',
    { tag: 'case-studies', ...opts },
  )
  return env?.docs ?? []
}

export async function getCaseStudy(slug: string, opts?: FetchOpts): Promise<CmsCaseStudy | null> {
  const env = await cmsFetch<ListEnvelope<CmsCaseStudy>>(
    `/api/case-studies?where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&limit=1&depth=2`,
    { tag: `case-study:${slug}`, ...opts },
  )
  return env?.docs[0] ?? null
}

// ───────── Partners ─────────────────────────────────────────────────
export async function getPartners(opts?: FetchOpts): Promise<CmsPartner[]> {
  const env = await cmsFetch<ListEnvelope<CmsPartner>>(
    '/api/partners?sort=name&limit=100&depth=1',
    { tag: 'partners', ...opts },
  )
  return env?.docs ?? []
}

export async function getPartner(slug: string, opts?: FetchOpts): Promise<CmsPartner | null> {
  const env = await cmsFetch<ListEnvelope<CmsPartner>>(
    `/api/partners?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=2`,
    { tag: `partner:${slug}`, ...opts },
  )
  return env?.docs[0] ?? null
}

// ───────── Pages (block-based marketing pages) ──────────────────────
export async function getPage(slug: string, opts?: FetchOpts): Promise<CmsPage | null> {
  const env = await cmsFetch<ListEnvelope<CmsPage>>(
    `/api/pages?where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&limit=1&depth=2`,
    { tag: `page:${slug}`, ...opts },
  )
  return env?.docs[0] ?? null
}

// Used by sitemap.ts to enumerate every published page slug.
export async function getPages(opts?: FetchOpts): Promise<CmsPage[]> {
  const env = await cmsFetch<ListEnvelope<CmsPage>>(
    '/api/pages?where[status][equals]=published&limit=500&depth=0',
    { tag: 'pages', ...opts },
  )
  return env?.docs ?? []
}

// ───────── Posts (blog) ─────────────────────────────────────────────
type PostQuery = { category?: CmsPostCategory; limit?: number; page?: number }

export async function getPosts(q: PostQuery = {}, opts?: FetchOpts): Promise<CmsPost[]> {
  const params = new URLSearchParams()
  params.set('where[status][equals]', 'published')
  if (q.category) params.set('where[category][equals]', q.category)
  params.set('sort', '-publishedAt')
  params.set('limit', String(q.limit ?? 50))
  if (q.page) params.set('page', String(q.page))
  params.set('depth', '1')

  const env = await cmsFetch<ListEnvelope<CmsPost>>(`/api/posts?${params}`, {
    tag: q.category ? `posts:${q.category}` : 'posts',
    ...opts,
  })
  return env?.docs ?? []
}

export async function getPost(slug: string, opts?: FetchOpts): Promise<CmsPost | null> {
  const env = await cmsFetch<ListEnvelope<CmsPost>>(
    `/api/posts?where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&limit=1&depth=2`,
    { tag: `post:${slug}`, ...opts },
  )
  return env?.docs[0] ?? null
}

// ───────── Redirects (consumed by middleware.ts) ────────────────────
//
// Long-poll cached for 60s — middleware runs on every request and we
// must not hammer the CMS. Force a revalidate by purging tag 'redirects'
// from the Payload `afterChange` hook in the Redirects collection.
export async function getActiveRedirects(opts?: FetchOpts): Promise<CmsRedirect[]> {
  const env = await cmsFetch<ListEnvelope<CmsRedirect>>(
    '/api/redirects?where[isActive][equals]=true&limit=500&depth=0',
    { tag: 'redirects', ...opts },
  )
  return env?.docs ?? []
}

// Fire-and-forget hit counter — middleware calls this without awaiting
// to avoid adding latency to the redirect response.
export async function incrementRedirectHit(id: string): Promise<void> {
  try {
    await fetch(`${CMS_URL}/api/redirects/${id}/hit`, {
      method: 'POST',
      headers: buildHeaders(),
    })
  } catch {
    /* never block the redirect on this */
  }
}

// ───────── Lead creation (internal — called by /api/leads) ──────────
export type LeadInput = {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message?: string
  source: string                     // form id: contact | challenge | checker | careers | guest-post
  meta?: Record<string, unknown>
}

export async function createLead(input: LeadInput): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const res = await fetch(`${CMS_URL}/api/leads`, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        phone: input.phone,
        company: input.company,
        serviceInterest: input.service,
        message: input.message,
        source: input.source,
        status: 'new',
        meta: input.meta ?? {},
      }),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) {
      return { ok: false, error: json?.message || `CMS rejected lead (${res.status})` }
    }
    return { ok: true, id: json?.doc?.id }
  } catch (err) {
    return { ok: false, error: (err as Error).message }
  }
}
