// POST /api/directory-access/verify
// Checks whether an email has been approved.
// One-time use: on success, deletes the approved key so access cannot be reused
// on another device — user must re-request from scratch next time.

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

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Valid email required' }, { status: 400 })
  }

  // Check approved key
  const approved = await redisCommand(['GET', `sg:dir:approved:${email}`])
  if (approved?.result === '1') {
    // One-time use: delete approved key so they must re-request for any future device
    await redisCommand(['DEL', `sg:dir:approved:${email}`])
    // Also clear the email index so they can submit a new request next time
    await redisCommand(['DEL', `sg:dir:email:${email}`])
    return NextResponse.json({ ok: true, status: 'approved' })
  }

  // Check if request exists at all
  const requestId = await redisCommand(['GET', `sg:dir:email:${email}`])
  if (!requestId?.result) {
    return NextResponse.json({ ok: true, status: 'not_found' })
  }

  // Get request to check its status
  const requestData = await redisCommand(['GET', `sg:dir:req:${requestId.result}`])
  if (!requestData?.result) {
    return NextResponse.json({ ok: true, status: 'not_found' })
  }

  let request: { status: string }
  try { request = JSON.parse(requestData.result) } catch {
    return NextResponse.json({ ok: true, status: 'not_found' })
  }

  if (request.status === 'rejected') {
    return NextResponse.json({ ok: true, status: 'rejected' })
  }

  // pending or anything else
  return NextResponse.json({ ok: true, status: 'pending' })
}
