// POST /api/directory-access
// Sends directory access requests to info@securityblogs.com.au via Formsubmit.co.
// The notification email includes a ready-to-send approval code for the user.

import { NextResponse } from 'next/server'
import { generateCode } from '@/lib/directoryCode'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const NOTIFY_EMAIL = 'info@securityblogs.com.au'

const PURPOSE_OPTIONS = [
  'Looking for a security provider',
  'Comparing security companies',
  'Research / Market analysis',
  'Partnership opportunity',
  'Other',
]

export async function POST(req: Request) {
  try {
    let body: Record<string, unknown>
    try { body = await req.json() } catch {
      return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
    }

    const name    = typeof body.name    === 'string' ? body.name.trim()    : ''
    const email   = typeof body.email   === 'string' ? body.email.trim()   : ''
    const company = typeof body.company === 'string' ? body.company.trim() : ''
    const purpose = typeof body.purpose === 'string' ? body.purpose.trim() : ''

    if (!name || !email || !company || !purpose) {
      return NextResponse.json({ ok: false, error: 'All fields required' }, { status: 400 })
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'Valid business email required' }, { status: 400 })
    }
    if (!PURPOSE_OPTIONS.includes(purpose)) {
      return NextResponse.json({ ok: false, error: 'Invalid purpose selection' }, { status: 400 })
    }

    const approvalCode = generateCode(email)

    const res = await fetch(`https://formsubmit.co/ajax/${NOTIFY_EMAIL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `[SecurityBlogs] Directory Access Request — ${name} from ${company}`,
        _captcha: 'false',
        _template: 'table',
        name,
        email,
        company,
        purpose,
        '--- TO APPROVE ---': `Reply to ${email} with their code below`,
        'Approval Code': approvalCode,
        'Email to send': `Hi ${name}, your SecurityBlogs directory access code is: ${approvalCode} — enter it at securityblogs.com.au/security-directory under "Check My Status".`,
      }),
    })

    const json = await res.json().catch(() => ({}))
    if (json?.success === 'true' || json?.success === true) {
      return NextResponse.json({ ok: true })
    }

    console.error('[directory-access] Formsubmit error', json)
    return NextResponse.json({ ok: false, error: 'Could not send request. Please email us at info@securityblogs.com.au.' }, { status: 502 })
  } catch (err) {
    console.error('[directory-access] error:', err)
    return NextResponse.json({ ok: false, error: 'Server error. Please try again.' }, { status: 500 })
  }
}
