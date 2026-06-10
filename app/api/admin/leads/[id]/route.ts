import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { validateSession, SESSION_COOKIE } from '@/lib/admin-session'
import { updateLead, deleteLead, type LeadStatus } from '@/lib/leads-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function auth(): Promise<boolean> {
  const jar = await cookies()
  return validateSession(jar.get(SESSION_COOKIE)?.value)
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await auth()) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  let body: { status?: LeadStatus; notes?: string }
  try { body = await req.json() } catch { return NextResponse.json({ ok: false, error: 'Invalid body' }, { status: 400 }) }

  const patch: Partial<{ status: LeadStatus; notes: string }> = {}
  if (body.status !== undefined) patch.status = body.status
  if (body.notes  !== undefined) patch.notes  = body.notes

  const updated = await updateLead(id, patch)
  if (!updated) return NextResponse.json({ ok: false, error: 'Lead not found' }, { status: 404 })
  return NextResponse.json({ ok: true, lead: updated })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await auth()) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const ok = await deleteLead(id)
  if (!ok) return NextResponse.json({ ok: false, error: 'Lead not found' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
