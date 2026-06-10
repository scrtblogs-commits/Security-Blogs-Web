import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { validateSession, SESSION_COOKIE } from '@/lib/admin-session'
import { queryLeads, type LeadStatus } from '@/lib/leads-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function auth(): Promise<boolean> {
  const jar = await cookies()
  return validateSession(jar.get(SESSION_COOKIE)?.value)
}

export async function GET(req: Request) {
  if (!await auth()) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const result = queryLeads({
    status:  (searchParams.get('status')  ?? undefined) as LeadStatus | undefined,
    service: searchParams.get('service')  ?? undefined,
    search:  searchParams.get('search')   ?? undefined,
    page:    parseInt(searchParams.get('page')  ?? '1',  10),
    limit:   parseInt(searchParams.get('limit') ?? '30', 10),
  })
  return NextResponse.json({ ok: true, ...result })
}
