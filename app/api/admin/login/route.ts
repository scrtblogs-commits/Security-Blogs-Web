import { NextResponse } from 'next/server'
import { adminLogin, pruneExpired, SESSION_COOKIE } from '@/lib/admin-session'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  pruneExpired()
  let body: { username?: string; password?: string }
  try { body = await req.json() } catch { return NextResponse.json({ ok: false, error: 'Invalid body' }, { status: 400 }) }

  const token = adminLogin(body.username?.trim() ?? '', body.password ?? '')
  if (!token) {
    return NextResponse.json({ ok: false, error: 'Invalid username or password.' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 24 * 60 * 60,   // 24 hours
    secure: process.env.NODE_ENV === 'production',
  })
  return res
}
