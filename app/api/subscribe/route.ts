// POST /api/subscribe
// Directory newsletter unlock — email only (no name required).

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

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim() : ''
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Valid email required' }, { status: 400 })
  }

  const lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    source: 'directory',
    email,
    name: '',
  }

  await redisCommand(['LPUSH', 'sg:leads', JSON.stringify(lead)])

  await sendWeb3Forms({
    subject: '[SecurityBlogs] New Directory Subscriber',
    from_name: 'Directory Signup',
    email,
    message: `New newsletter subscriber from Security Directory.\n\nEmail: ${email}`,
  })

  return NextResponse.json({ ok: true })
}
