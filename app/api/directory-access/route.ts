// POST /api/directory-access
// Saves a new directory access request as "pending" in Redis.
// Sends admin notification via Web3Forms — no auto-approval, no user email.

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function redisCommand(args: (string | number)[]) {
  const url   = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  const res = await fetch(`${url}/${args.map(encodeURIComponent).join('/')}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

async function sendAdminNotification(name: string, email: string, company: string, purpose: string, adminUrl: string) {
  const key = process.env.WEB3FORMS_ACCESS_KEY
  if (!key) return
  await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: key,
      subject: `[SecurityBlogs] New Directory Access Request — ${name} (${company})`,
      from_name: 'Directory Access System',
      email: process.env.ADMIN_EMAIL || email,
      message: `New directory access request submitted.\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nPurpose: ${purpose}\n\nReview and approve/reject in the admin panel:\n${adminUrl}`,
    }),
  })
}

const PURPOSE_OPTIONS = [
  'Looking for a security provider',
  'Comparing security companies',
  'Research / Market analysis',
  'Partnership opportunity',
  'Other',
]

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const name    = typeof body.name    === 'string' ? body.name.trim()    : ''
  const email   = typeof body.email   === 'string' ? body.email.trim()   : ''
  const company = typeof body.company === 'string' ? body.company.trim() : ''
  const purpose = typeof body.purpose === 'string' ? body.purpose.trim() : ''

  if (!name || !email || !company || !purpose) {
    return NextResponse.json({ ok: false, error: 'All fields required' }, { status: 400 })
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Valid business email required' }, { status: 400 })
  }
  if (!PURPOSE_OPTIONS.includes(purpose)) {
    return NextResponse.json({ ok: false, error: 'Invalid purpose selection' }, { status: 400 })
  }

  // Check if already approved
  const alreadyApproved = await redisCommand(['GET', `sg:dir:approved:${email}`])
  if (alreadyApproved?.result === '1') {
    return NextResponse.json({ ok: true, alreadyApproved: true })
  }

  // Check for existing pending request
  const existingId = await redisCommand(['GET', `sg:dir:email:${email}`])
  if (existingId?.result) {
    // Already submitted — just re-notify admin and return pending
    return NextResponse.json({ ok: true, pending: true })
  }

  const id = crypto.randomUUID()
  const request = {
    id,
    name,
    email,
    company,
    purpose,
    createdAt: new Date().toISOString(),
    status: 'pending',
  }

  // Store request data
  await redisCommand(['SET', `sg:dir:req:${id}`, JSON.stringify(request)])
  // Index by email for duplicate checks
  await redisCommand(['SET', `sg:dir:email:${email}`, id])
  // Append to requests list (newest first)
  await redisCommand(['LPUSH', 'sg:dir:reqs', id])

  // Admin panel URL
  const origin = req.headers.get('origin') || 'https://securityblogs.com.au'
  const adminSecret = process.env.ADMIN_SECRET || ''
  const adminUrl = `${origin}/admin/directory-requests/${adminSecret ? `?key=${adminSecret}` : ''}`

  await sendAdminNotification(name, email, company, purpose, adminUrl)

  return NextResponse.json({ ok: true })
}
