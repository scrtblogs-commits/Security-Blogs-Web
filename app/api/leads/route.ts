// POST /api/leads
// Sends form submissions to info@securityblogs.com.au via Formsubmit.co.
// No API key or account required — first submission triggers a one-time
// activation email to info@securityblogs.com.au; confirm it and all future
// submissions arrive automatically.

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const NOTIFY_EMAIL = 'info@securityblogs.com.au'

// ── Rate limit (in-memory) ───────────────────────────────────────────
type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const b = buckets.get(ip)
  if (!b || b.resetAt < now) { buckets.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 }); return true }
  if (b.count >= 15) return false
  b.count++; return true
}
function getIp(req: Request) {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
}

function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status })
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch { return bad('Invalid JSON') }

  // Honeypot
  if (typeof body.company_url === 'string' && body.company_url.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const name    = typeof body.name    === 'string' ? body.name.trim()    : ''
  const email   = typeof body.email   === 'string' ? body.email.trim()   : ''
  const phone   = typeof body.phone   === 'string' ? body.phone.trim()   : ''
  const company = typeof body.company === 'string' ? body.company.trim() : ''
  const service = typeof body.service === 'string' ? body.service.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  const source  = typeof body.source  === 'string' ? body.source.trim()  : 'contact'
  const subject = typeof body.subject === 'string' ? body.subject.trim() : 'New form submission'

  if (!name)  return bad('Name is required')
  if (!email) return bad('Email is required')
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return bad('Email looks invalid')

  const ip = getIp(req)
  if (!checkRateLimit(ip)) return NextResponse.json({ ok: false, error: 'Too many submissions. Please wait 15 minutes.' }, { status: 429 })

  const emailBody = [
    `Source: ${source}`,
    `Name: ${name}`,
    `Email: ${email}`,
    phone    ? `Phone: ${phone}`     : '',
    company  ? `Company: ${company}` : '',
    service  ? `Service: ${service}` : '',
    message  ? `\nMessage:\n${message}` : '',
  ].filter(Boolean).join('\n')

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${NOTIFY_EMAIL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `[SecurityBlogs] ${subject} — ${name}`,
        _replyto: email,
        _captcha: 'false',
        _template: 'table',
        name,
        email,
        ...(phone   ? { phone }   : {}),
        ...(company ? { company } : {}),
        ...(service ? { service } : {}),
        ...(message ? { message } : {}),
        source,
        _message: emailBody,
      }),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok || json?.success === 'false' || json?.success === false) {
      console.error('[/api/leads] Formsubmit error', json)
      return NextResponse.json({ ok: false, error: 'Email delivery failed. Please email us directly at info@securityblogs.com.au.' }, { status: 502 })
    }
  } catch (err) {
    console.error('[/api/leads] fetch error', err)
    return NextResponse.json({ ok: false, error: 'Network error. Please try again or email us directly.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

export async function GET()    { return bad('Method not allowed', 405) }
export async function PUT()    { return bad('Method not allowed', 405) }
export async function DELETE() { return bad('Method not allowed', 405) }
