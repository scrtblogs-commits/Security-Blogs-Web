// POST /api/leads
//
// Receives form submissions from every public form on the site.
// Delivery pipeline (in priority order):
//
//   1. Web3Forms  — if WEB3FORMS_KEY env var is set (recommended for prod)
//   2. CMS        — if CMS_URL + PAYLOAD_API_KEY are set (Payload backend)
//   3. Dev-log    — neither configured → logs to console, returns ok:true
//                   so forms work locally without any setup
//
// To go live:
//   • Register free at https://web3forms.com, copy your Access Key, and
//     add  WEB3FORMS_KEY=<your-key>  to .env.local / your hosting env.
//   • The submission will be emailed to info@securityblogs.com.au.

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const WEB3FORMS_KEY = process.env.WEB3FORMS_KEY ?? ''
const CMS_URL       = process.env.CMS_URL ?? ''
const API_KEY       = process.env.PAYLOAD_API_KEY ?? ''
const CONTACT_EMAIL = 'info@securityblogs.com.au'

// ── In-memory rate limit (15 req / 15 min per IP) ─────────────────────────
type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()
const WINDOW  = 15 * 60 * 1000
const MAX     = 15

function getIp(req: Request): string {
  return (req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown').split(',')[0].trim()
}
function rateOk(ip: string): boolean {
  const now = Date.now()
  const b = buckets.get(ip)
  if (!b || b.resetAt < now) { buckets.set(ip, { count: 1, resetAt: now + WINDOW }); return true }
  if (b.count >= MAX) return false
  b.count++; return true
}

function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status })
}

// ── Delivery: Web3Forms ────────────────────────────────────────────────────
async function sendViaWeb3Forms(fields: Record<string, unknown>): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...fields }),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok || json.success === false) {
      return { ok: false, error: json.message || 'Web3Forms rejected submission' }
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: (err as Error).message }
  }
}

// ── Delivery: Payload CMS ──────────────────────────────────────────────────
async function sendViaCms(input: Record<string, unknown>): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (API_KEY) headers['Authorization'] = `users API-Key ${API_KEY}`
    const res = await fetch(`${CMS_URL}/api/leads`, {
      method: 'POST',
      headers,
      body: JSON.stringify(input),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) return { ok: false, error: json?.message || `CMS error ${res.status}` }
    return { ok: true, id: json?.doc?.id }
  } catch (err) {
    return { ok: false, error: (err as Error).message }
  }
}

// ── Handler ────────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return bad('Invalid JSON body')
  }

  // Honeypot
  if (typeof body.company_url === 'string' && body.company_url.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  // Shape validation
  const name    = typeof body.name  === 'string' ? body.name.trim()  : ''
  const email   = typeof body.email === 'string' ? body.email.trim() : ''
  if (!name)  return bad('Name is required')
  if (!email) return bad('Email is required')
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return bad('Email looks invalid')

  // Rate limit
  const ip = getIp(req)
  if (!rateOk(ip)) return NextResponse.json({ ok: false, error: 'Too many submissions — please wait 15 minutes.' }, { status: 429 })

  // Collect all non-sensitive fields for the submission payload
  const fields: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(body)) {
    if (k === 'company_url' || k === 'cf-turnstile-response') continue
    fields[k] = v
  }

  // 1. Try Web3Forms
  if (WEB3FORMS_KEY) {
    const result = await sendViaWeb3Forms({
      subject: `New enquiry from ${name} — SecurityBlogs`,
      from_name: name,
      email,
      to_email: CONTACT_EMAIL,
      replyto: email,
      ...fields,
    })
    if (result.ok) return NextResponse.json({ ok: true })
    console.error('[/api/leads] Web3Forms failed:', result.error)
    // Fall through to CMS attempt
  }

  // 2. Try CMS (Payload)
  if (CMS_URL && API_KEY) {
    const result = await sendViaCms({
      name,
      email,
      phone:          typeof body.phone   === 'string' ? body.phone.trim()   : undefined,
      company:        typeof body.company === 'string' ? body.company.trim() : undefined,
      serviceInterest:typeof body.service === 'string' ? body.service.trim() : undefined,
      message:        typeof body.message === 'string' ? body.message.trim() : undefined,
      source:         typeof body.source  === 'string' ? body.source.trim()  : 'contact',
      status: 'new',
      meta: { ip, userAgent: req.headers.get('user-agent') ?? undefined },
    })
    if (result.ok) return NextResponse.json({ ok: true, id: result.id })
    console.error('[/api/leads] CMS failed:', result.error)
  }

  // 3. Dev fallback — log to console so local testing works with zero config
  if (!WEB3FORMS_KEY && !CMS_URL) {
    console.log('[/api/leads] DEV — no delivery configured. Submission received:', fields)
    return NextResponse.json({ ok: true })
  }

  // Both delivery methods failed
  return NextResponse.json(
    { ok: false, error: 'Could not send your message. Please email us at ' + CONTACT_EMAIL },
    { status: 502 },
  )
}

export async function GET()    { return bad('Method not allowed', 405) }
export async function PUT()    { return bad('Method not allowed', 405) }
export async function DELETE() { return bad('Method not allowed', 405) }
