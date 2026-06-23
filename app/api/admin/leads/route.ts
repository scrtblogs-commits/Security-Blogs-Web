// GET /api/admin/leads?password=xxx
// Returns all stored leads from Upstash Redis. Password-protected.

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function redisCommand(args: (string | number)[]) {
  const url   = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return { result: [] }
  const res = await fetch(`${url}/${args.map(encodeURIComponent).join('/')}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const password = searchParams.get('password') ?? ''
  const adminPass = process.env.ADMIN_PASSWORD ?? ''

  if (!adminPass || password !== adminPass) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  // LRANGE sg:leads 0 -1 returns all items newest first
  const data = await redisCommand(['LRANGE', 'sg:leads', 0, -1])
  const items = (data?.result ?? []) as string[]
  const leads = items.map((s: string) => {
    try { return JSON.parse(s) } catch { return null }
  }).filter(Boolean)

  return NextResponse.json({ ok: true, leads, total: leads.length })
}
