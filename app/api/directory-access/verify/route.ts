// GET /api/directory-access/verify?token=xxx
// Validates a one-time access token issued on admin approval.
// Sets sg:dir:approved:{email} = '1' permanently (already set at approval time).

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

  const result = await redisCommand(['GET', `sg:dir:access:${token}`])
  if (!result?.result) {
    return NextResponse.json({ ok: false, error: 'Invalid or expired access link' }, { status: 400 })
  }

  const email = result.result as string

  // Confirm approved state (should already be set but ensure consistency)
  await redisCommand(['SET', `sg:dir:approved:${email}`, '1'])

  // Keep the token alive (don't delete — allow re-use within 30-day window)

  return NextResponse.json({ ok: true, email })
}
