// GET /api/directory-access/verify?token=xxx
// Validates token, marks email as verified in Redis.

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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json({ ok: false, error: 'Token required' }, { status: 400 })
  }

  const result = await redisCommand(['GET', `sg:verify:${token}`])
  if (!result?.result) {
    return NextResponse.json({ ok: false, error: 'Invalid or expired token' }, { status: 400 })
  }

  let payload: { name: string; email: string; company: string; purpose: string }
  try { payload = JSON.parse(result.result) } catch {
    return NextResponse.json({ ok: false, error: 'Corrupt token data' }, { status: 400 })
  }

  // Mark email as permanently verified (no expiry)
  await redisCommand(['SET', `sg:verified:${payload.email}`, '1'])

  // Delete the one-time token
  await redisCommand(['DEL', `sg:verify:${token}`])

  return NextResponse.json({ ok: true, email: payload.email, name: payload.name })
}
