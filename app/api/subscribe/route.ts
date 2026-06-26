// POST /api/subscribe
// Directory newsletter signup — sends subscriber email to info@securityblogs.com.au

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const NOTIFY_EMAIL = 'info@securityblogs.com.au'

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim() : ''
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Valid email required' }, { status: 400 })
  }

  try {
    await fetch(`https://formsubmit.co/ajax/${NOTIFY_EMAIL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: '[SecurityBlogs] New Directory Subscriber',
        _captcha: 'false',
        _template: 'table',
        email,
        source: 'directory-subscribe',
      }),
    })
  } catch (err) {
    console.error('[/api/subscribe] fetch error', err)
  }

  return NextResponse.json({ ok: true })
}
