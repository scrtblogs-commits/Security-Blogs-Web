// GET  /api/directory-access/requests?key=ADMIN_SECRET  — list all requests
// POST /api/directory-access/requests                    — approve or reject (no emails sent)

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function redisCommand(args: (string | number)[]) {
  const url   = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  const res = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  })
  return res.json()
}

function checkAdminKey(key: string | null): boolean {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return true  // dev mode — no secret set
  return key === secret
}

// GET — list all requests
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const key = searchParams.get('key')

  if (!checkAdminKey(key)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const listResult = await redisCommand(['LRANGE', 'sg:dir:reqs', 0, 199])
  const ids: string[] = listResult?.result ?? []

  if (ids.length === 0) {
    return NextResponse.json({ ok: true, requests: [] })
  }

  const requests = await Promise.all(
    ids.map(id =>
      redisCommand(['GET', `sg:dir:req:${id}`]).then(r => {
        if (!r?.result) return null
        try { return JSON.parse(r.result) } catch { return null }
      })
    )
  )

  return NextResponse.json({ ok: true, requests: requests.filter(Boolean) })
}

// POST — approve or reject (status update only, no emails)
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

  const existing = await redisCommand(['GET', `sg:dir:req:${id}`])
  if (!existing?.result) {
    return NextResponse.json({ ok: false, error: 'Request not found' }, { status: 404 })
  }

  let request: { id: string; name: string; email: string; company: string; purpose: string; createdAt: string; status: string }
  try { request = JSON.parse(existing.result) } catch {
    return NextResponse.json({ ok: false, error: 'Corrupt request data' }, { status: 500 })
  }

  if (action === 'approve') {
    // Mark email as approved (one-time: consumed on first Check Access use)
    await redisCommand(['SET', `sg:dir:approved:${request.email}`, '1'])
    const updated = { ...request, status: 'approved', approvedAt: new Date().toISOString() }
    await redisCommand(['SET', `sg:dir:req:${id}`, JSON.stringify(updated)])
  } else {
    // Reject — remove email index so they can re-apply later
    const updated = { ...request, status: 'rejected', rejectedAt: new Date().toISOString() }
    await redisCommand(['SET', `sg:dir:req:${id}`, JSON.stringify(updated)])
    await redisCommand(['DEL', `sg:dir:email:${request.email}`])
  }

  return NextResponse.json({ ok: true, action })
}
