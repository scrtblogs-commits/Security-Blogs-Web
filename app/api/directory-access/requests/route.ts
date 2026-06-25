// GET  /api/directory-access/requests?key=ADMIN_SECRET  — list all requests
// POST /api/directory-access/requests                    — approve or reject a request

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

function checkAdminKey(key: string | null): boolean {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return true  // dev mode — no secret set
  return key === secret
}

async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — skipping email to', to)
    return
  }
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'SecurityBlogs Directory <directory@securityblogs.com.au>',
      to: [to],
      subject,
      html,
    }),
  })
}

// GET — list all requests (paginated, 50 per page)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const key = searchParams.get('key')

  if (!checkAdminKey(key)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  // Get all request IDs from the list
  const listResult = await redisCommand(['LRANGE', 'sg:dir:reqs', 0, 199])
  const ids: string[] = listResult?.result ?? []

  if (ids.length === 0) {
    return NextResponse.json({ ok: true, requests: [] })
  }

  // Fetch each request in parallel via pipeline (MGET)
  const keys = ids.map(id => `sg:dir:req:${id}`)
  // Upstash REST doesn't support MGET directly; fetch individually
  const requests = await Promise.all(
    keys.map(k => redisCommand(['GET', k]).then(r => {
      if (!r?.result) return null
      try { return JSON.parse(r.result) } catch { return null }
    }))
  )

  return NextResponse.json({
    ok: true,
    requests: requests.filter(Boolean),
  })
}

// POST — approve or reject
export async function POST(req: Request) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const key    = typeof body.key    === 'string' ? body.key    : null
  const id     = typeof body.id     === 'string' ? body.id     : ''
  const action = typeof body.action === 'string' ? body.action : ''

  if (!checkAdminKey(key)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  if (!id) return NextResponse.json({ ok: false, error: 'Request ID required' }, { status: 400 })
  if (action !== 'approve' && action !== 'reject') {
    return NextResponse.json({ ok: false, error: 'Action must be approve or reject' }, { status: 400 })
  }

  // Fetch existing request
  const existing = await redisCommand(['GET', `sg:dir:req:${id}`])
  if (!existing?.result) {
    return NextResponse.json({ ok: false, error: 'Request not found' }, { status: 404 })
  }

  let request: { id: string; name: string; email: string; company: string; purpose: string; createdAt: string; status: string }
  try { request = JSON.parse(existing.result) } catch {
    return NextResponse.json({ ok: false, error: 'Corrupt request data' }, { status: 500 })
  }

  const origin = req.headers.get('origin') || 'https://securityblogs.com.au'

  if (action === 'approve') {
    // Generate a one-time access token (30-day TTL)
    const accessToken = crypto.randomUUID()
    await redisCommand(['SET', `sg:dir:access:${accessToken}`, request.email, 'EX', 2592000])

    // Mark email as approved
    await redisCommand(['SET', `sg:dir:approved:${request.email}`, '1'])

    // Update request status
    const updated = { ...request, status: 'approved', approvedAt: new Date().toISOString() }
    await redisCommand(['SET', `sg:dir:req:${id}`, JSON.stringify(updated)])

    // Send approval email with access link
    const accessUrl = `${origin}/verify-directory/?token=${accessToken}`
    await sendEmail(
      request.email,
      'Your Security Directory access has been approved',
      `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#0f172a">
          <h2 style="font-size:24px;font-weight:800;margin:0 0 16px">Hi ${request.name},</h2>
          <p style="font-size:16px;color:#475569;line-height:1.6;margin:0 0 12px">
            Good news — your request to access the Australian Security Company Directory has been <strong style="color:#16a34a">approved</strong>.
          </p>
          <p style="font-size:15px;color:#475569;line-height:1.6;margin:0 0 28px">
            Click the button below to unlock full access — including direct contact details, phone numbers, websites and AI visibility scores for 200+ verified companies.
          </p>
          <a href="${accessUrl}" style="display:inline-block;background:#3b82f6;color:#fff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:12px;text-decoration:none">
            Access the Directory Now →
          </a>
          <p style="font-size:13px;color:#94a3b8;margin-top:24px">
            This link is valid for 30 days. If you did not request access, you can safely ignore this email.
          </p>
          <hr style="border:none;border-top:1px solid #f1f5f9;margin:28px 0" />
          <p style="font-size:12px;color:#94a3b8">SecurityBlogs · securityblogs.com.au</p>
        </div>
      `
    )
  } else {
    // Reject — update status and send rejection email
    const updated = { ...request, status: 'rejected', rejectedAt: new Date().toISOString() }
    await redisCommand(['SET', `sg:dir:req:${id}`, JSON.stringify(updated)])
    // Remove email index so they can re-apply
    await redisCommand(['DEL', `sg:dir:email:${request.email}`])

    await sendEmail(
      request.email,
      'Update on your Security Directory access request',
      `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#0f172a">
          <h2 style="font-size:24px;font-weight:800;margin:0 0 16px">Hi ${request.name},</h2>
          <p style="font-size:16px;color:#475569;line-height:1.6;margin:0 0 12px">
            Thank you for your interest in the Australian Security Company Directory.
          </p>
          <p style="font-size:15px;color:#475569;line-height:1.6;margin:0 0 28px">
            After reviewing your request, we are unable to approve directory access at this time. If you believe this is a mistake or would like to provide more context, please reach out to us directly.
          </p>
          <a href="${origin}/contact/" style="display:inline-block;background:#0f172a;color:#fff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:12px;text-decoration:none">
            Contact Us →
          </a>
          <hr style="border:none;border-top:1px solid #f1f5f9;margin:28px 0" />
          <p style="font-size:12px;color:#94a3b8">SecurityBlogs · securityblogs.com.au</p>
        </div>
      `
    )
  }

  return NextResponse.json({ ok: true, action })
}
