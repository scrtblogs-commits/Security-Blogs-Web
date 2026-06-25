// POST /api/directory-access
// Accepts 4-field form, stores verification token in Redis, sends email via Resend.

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

async function sendWeb3Forms(data: Record<string, string>) {
  const key = process.env.WEB3FORMS_ACCESS_KEY
  if (!key) return
  await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_key: key, ...data }),
  })
}

async function sendVerificationEmail(to: string, name: string, verifyUrl: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — skipping verification email')
    return
  }
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'SecurityBlogs Directory <directory@securityblogs.com.au>',
      to: [to],
      subject: 'Verify your email — Security Directory access',
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#0f172a">
          <div style="margin-bottom:24px">
            <img src="https://securityblogs.com.au/logo.png" alt="SecurityBlogs" height="32" style="height:32px" />
          </div>
          <h2 style="font-size:24px;font-weight:800;margin:0 0 12px">Hi ${name}, one quick step</h2>
          <p style="font-size:16px;color:#475569;line-height:1.6;margin:0 0 28px">
            Click the button below to verify your email and unlock full access to the
            Australian Security Company Directory — including direct contact details,
            phone numbers, websites and AI visibility scores.
          </p>
          <a href="${verifyUrl}" style="display:inline-block;background:#3b82f6;color:#fff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:12px;text-decoration:none">
            Verify my email and unlock access →
          </a>
          <p style="font-size:13px;color:#94a3b8;margin-top:28px">
            This link expires in 24 hours. If you did not request access, you can safely ignore this email.
          </p>
          <hr style="border:none;border-top:1px solid #f1f5f9;margin:28px 0" />
          <p style="font-size:12px;color:#94a3b8">
            SecurityBlogs · AI Visibility &amp; SEO for Security Companies · securityblogs.com.au
          </p>
        </div>
      `,
    }),
  })
}

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

  // Check if already verified
  const alreadyVerified = await redisCommand(['GET', `sg:verified:${email}`])
  if (alreadyVerified?.result === '1') {
    return NextResponse.json({ ok: true, alreadyVerified: true })
  }

  // Generate a secure token
  const token = crypto.randomUUID()
  const payload = JSON.stringify({ name, email, company, purpose, createdAt: new Date().toISOString() })

  // Store token with 24h TTL (86400 seconds)
  await redisCommand(['SET', `sg:verify:${token}`, payload, 'EX', 86400])

  // Also store lead info
  await redisCommand(['LPUSH', 'sg:leads', JSON.stringify({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    source: 'directory-access',
    email, name, company, purpose,
  })])

  // Send admin notification
  await sendWeb3Forms({
    subject: '[SecurityBlogs] New Directory Access Request',
    from_name: name,
    email,
    message: `New directory access request.\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nPurpose: ${purpose}`,
  })

  // Build verification URL
  const origin = req.headers.get('origin') || 'https://securityblogs.com.au'
  const verifyUrl = `${origin}/verify-directory/?token=${token}`

  // Send verification email to user
  await sendVerificationEmail(email, name, verifyUrl)

  return NextResponse.json({ ok: true })
}
