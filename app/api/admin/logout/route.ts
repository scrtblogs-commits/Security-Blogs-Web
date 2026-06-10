import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { revokeSession, SESSION_COOKIE } from '@/lib/admin-session'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST() {
  const jar   = await cookies()
  const token = jar.get(SESSION_COOKIE)?.value
  if (token) revokeSession(token)
  const res = NextResponse.json({ ok: true })
  res.cookies.delete(SESSION_COOKIE)
  return res
}
