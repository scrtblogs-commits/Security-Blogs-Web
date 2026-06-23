// POST /api/leads
// Unified form handler: Web3Forms email notification + Upstash Redis storage.
// Replaces the previous Payload CMS createLead() pipeline.

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ── Upstash Redis REST helpers ───────────────────────────────────────
async function redisCommand(args: (string | number)[]) {
  const url  = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) {
    console.warn('[/api/leads] Upstash env vars not set — skipping storage')
    return null
  }
  const res = await fetch(`${url}/${args.map(encodeURIComponent).join('/')}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

// ── Web3Forms email notification ─────────────────────────────────────
async function sendWeb3Forms(data: Record<string, string>) {
  const key = process.env.WEB3FORMS_ACCESS_KEY
  if (!key) {
    console.warn('[/api/leads] WEB3FORMS_ACCESS_KEY not set — skipping email')
    return
  }
  await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_key: key, ...data }),
  })
}

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

  const lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    source, name, email, phone, company, service, message, subject, ip,
  }

  // 1. Store in Upstash (LPUSH so newest is first)
  await redisCommand(['LPUSH', 'sg:leads', JSON.stringify(lead)])

  // 2. Email via Web3Forms
  await sendWeb3Forms({
    subject: `[SecurityBlogs] ${subject} — ${name}`,
    from_name: name,
    email,
    message: [
      `Source: ${source}`,
      `Name: ${name}`,
      `Email: ${email}`,
      phone    ? `Phone: ${phone}`     : '',
      company  ? `Company: ${company}` : '',
      service  ? `Service: ${service}` : '',
      message  ? `\nMessage:\n${message}` : '',
    ].filter(Boolean).join('\n'),
  })

  return NextResponse.json({ ok: true, id: lead.id })
}

export async function GET()    { return bad('Method not allowed', 405) }
export async function PUT()    { return bad('Method not allowed', 405) }
export async function DELETE() { return bad('Method not allowed', 405) }
