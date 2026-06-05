// ─────────────────────────────────────────────────────────────────────
// POST /api/leads
//
// Single endpoint that every public form on the marketing site posts
// to. Replaces the Web3Forms integration that lived in
// lib/submitForm.ts during the static-export era.
//
// Pipeline per request:
//   1. Pull form fields from JSON body
//   2. Honeypot — reject if `company_url` is non-empty
//   3. Cloudflare Turnstile — verify the token server-side
//   4. Simple per-IP rate limit (15 submissions / 15 minutes)
//   5. Shape validation (manual, no zod dep to keep bundle lean)
//   6. createLead() via the CMS local client
//   7. Return JSON { ok: true, id } or { ok: false, error }
//
// The marketing site fetches this from the SAME origin — no CORS
// preflight needed. Phase D's reverse proxy puts the marketing site
// and CMS behind one hostname so the in-process call is internal.
// ─────────────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server'
import { createLead, type LeadInput } from '@/lib/cms'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'    // never cached

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY ?? ''

// In-memory rate limit. Acceptable for a single-VPS deployment — the
// VPS process is the only place this endpoint runs, so the Map sees
// every request. If you ever scale horizontally, swap to Redis / KV.
type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX = 15

function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  const real = req.headers.get('x-real-ip')
  if (real) return real.trim()
  return 'unknown'
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const bucket = buckets.get(ip)
  if (!bucket || bucket.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (bucket.count >= RATE_LIMIT_MAX) return false
  bucket.count += 1
  return true
}

// Drop stale buckets every 100 requests so the Map can't grow unbounded.
let cleanupCounter = 0
function maybeCleanup() {
  if (++cleanupCounter < 100) return
  cleanupCounter = 0
  const now = Date.now()
  for (const [ip, b] of buckets.entries()) if (b.resetAt < now) buckets.delete(ip)
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!TURNSTILE_SECRET) {
    // No secret configured = dev mode. Log a warning so it's obvious in
    // server logs, but allow the submission through so local testing
    // works without standing up Cloudflare.
    console.warn('[/api/leads] TURNSTILE_SECRET_KEY not set — skipping verification (dev only)')
    return true
  }
  try {
    const body = new URLSearchParams()
    body.set('secret', TURNSTILE_SECRET)
    body.set('response', token)
    if (ip !== 'unknown') body.set('remoteip', ip)
    const res = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body })
    const json = (await res.json()) as { success: boolean }
    return json.success === true
  } catch (err) {
    console.error('[/api/leads] Turnstile verification failed', err)
    return false
  }
}

function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status })
}

export async function POST(req: Request) {
  maybeCleanup()

  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return bad('Invalid JSON body')
  }

  // 1. Honeypot — bots fill every field; humans never see this one.
  if (typeof body.company_url === 'string' && body.company_url.trim() !== '') {
    // Pretend it worked so the bot doesn't retry.
    return NextResponse.json({ ok: true })
  }

  // 2. Shape check.
  const name    = typeof body.name    === 'string' ? body.name.trim()    : ''
  const email   = typeof body.email   === 'string' ? body.email.trim()   : ''
  const phone   = typeof body.phone   === 'string' ? body.phone.trim()   : undefined
  const company = typeof body.company === 'string' ? body.company.trim() : undefined
  const service = typeof body.service === 'string' ? body.service.trim() : undefined
  const message = typeof body.message === 'string' ? body.message.trim() : undefined
  const source  = typeof body.source  === 'string' ? body.source.trim()  : 'unknown'
  const token   = typeof body['cf-turnstile-response'] === 'string'
    ? (body['cf-turnstile-response'] as string)
    : ''

  if (!name)  return bad('Name is required')
  if (!email) return bad('Email is required')
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return bad('Email looks invalid')

  // 3. Rate-limit by IP.
  const ip = getClientIp(req)
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many submissions. Please wait 15 minutes and try again.' },
      { status: 429 },
    )
  }

  // 4. Turnstile.
  const tokenOk = await verifyTurnstile(token, ip)
  if (!tokenOk) return bad('Captcha verification failed. Refresh the page and try again.')

  // 5. Create the lead.
  const meta: Record<string, unknown> = {
    ip,
    userAgent: req.headers.get('user-agent') ?? undefined,
    referer: req.headers.get('referer') ?? undefined,
  }
  // Pass through any extra fields the form sent (e.g. cv_url for careers).
  for (const k of Object.keys(body)) {
    if (['name','email','phone','company','service','message','source','cf-turnstile-response','company_url'].includes(k)) continue
    meta[k] = body[k]
  }

  const input: LeadInput = { name, email, phone, company, service, message, source, meta }
  const result = await createLead(input)
  if (!result.ok) return bad(result.error ?? 'Could not save your enquiry. Please try again.', 502)

  return NextResponse.json({ ok: true, id: result.id })
}

// Reject other methods cleanly so Next.js doesn't return its default 405.
export async function GET()    { return bad('Method not allowed', 405) }
export async function PUT()    { return bad('Method not allowed', 405) }
export async function DELETE() { return bad('Method not allowed', 405) }
