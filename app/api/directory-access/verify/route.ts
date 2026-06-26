import { NextResponse } from 'next/server'
import { generateCode } from '@/lib/directoryCode'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const code  = typeof body.code  === 'string' ? body.code.trim().toUpperCase()  : ''

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Valid email required' }, { status: 400 })
  }
  if (!code) {
    return NextResponse.json({ ok: false, error: 'Access code required' }, { status: 400 })
  }

  const expected = generateCode(email)
  if (code === expected) {
    return NextResponse.json({ ok: true, status: 'approved' })
  }

  return NextResponse.json({ ok: true, status: 'invalid_code' })
}
