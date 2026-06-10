// POST /api/leads
//
// Receives all public form submissions.
// Pipeline:
//   1. Honeypot check
//   2. Validation
//   3. Rate limit
//   4. Save to /data/leads.json
//   5. Email notification (Web3Forms if WEB3FORMS_KEY is set)
//
// Forms work in dev with zero configuration — data is always saved locally.
// To receive email notifications, set WEB3FORMS_KEY in .env.local.

import { NextResponse } from 'next/server'
import { createLead } from '@/lib/leads-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const WEB3FORMS_KEY  = process.env.WEB3FORMS_KEY ?? ''
const CONTACT_EMAIL  = 'info@securityblogs.com.au'

// ── Rate limit ─────────────────────────────────────────────────────────────
type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()
function getIp(req: Request) {
  return (req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown').split(',')[0].trim()
}
function rateOk(ip: string): boolean {
  const now = Date.now(); const b = buckets.get(ip)
  if (!b || b.resetAt < now) { buckets.set(ip, { count: 1, resetAt: now + 15 * 60_000 }); return true }
  if (b.count >= 15) return false
  b.count++; return true
}

function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status })
}

// ── Email notification via Web3Forms ──────────────────────────────────────
async function notifyEmail(fields: Record<string, unknown>) {
  if (!WEB3FORMS_KEY) return
  const rows = Object.entries(fields)
    .filter(([k]) => !['source', 'company_url'].includes(k))
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;color:#374151;white-space:nowrap">${k}</td><td style="padding:6px 12px;color:#111827">${v ?? '—'}</td></tr>`)
    .join('')
  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `New enquiry from ${fields.name} — SecurityBlogs`,
        from_name: 'SecurityBlogs Forms',
        to_email: CONTACT_EMAIL,
        replyto: fields.email,
        html: `<h2 style="color:#1e5fe0;margin-bottom:16px">New form submission</h2><table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows}</table>`,
      }),
    })
  } catch (err) {
    console.error('[/api/leads] email notification failed:', err)
  }
}

// ── Handler ────────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch { return bad('Invalid JSON') }

  // Honeypot
  if (typeof body.company_url === 'string' && body.company_url.trim()) {
    return NextResponse.json({ ok: true })
  }

  const name    = typeof body.name    === 'string' ? body.name.trim()    : ''
  const email   = typeof body.email   === 'string' ? body.email.trim()   : ''
  const phone   = typeof body.phone   === 'string' ? body.phone.trim()   : undefined
  const company = typeof body.company === 'string' ? body.company.trim() : undefined
  const service = typeof body.service === 'string' ? body.service.trim() : undefined
  const message = typeof body.message === 'string' ? body.message.trim() : undefined
  const source  = typeof body.source  === 'string' ? body.source.trim()  : 'contact'

  if (!name)  return bad('Name is required')
  if (!email) return bad('Email is required')
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return bad('Email looks invalid')

  const ip = getIp(req)
  if (!rateOk(ip)) return NextResponse.json(
    { ok: false, error: 'Too many submissions — please wait 15 minutes.' }, { status: 429 }
  )

  // Save to file store
  const lead = await createLead({
    name, email, phone, company, service, message, source,
    ip,
    userAgent: req.headers.get('user-agent') ?? undefined,
  })

  // Send email notification (non-blocking)
  notifyEmail({ name, email, phone, company, service, message, source,
    submitted: new Date(lead.createdAt).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' }),
  })

  return NextResponse.json({ ok: true, id: lead.id })
}

export async function GET()    { return bad('Method not allowed', 405) }
export async function PUT()    { return bad('Method not allowed', 405) }
export async function DELETE() { return bad('Method not allowed', 405) }
