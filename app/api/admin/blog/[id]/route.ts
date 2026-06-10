import { NextRequest, NextResponse } from 'next/server'
import { validateSession, SESSION_COOKIE } from '@/lib/admin-session'
import { cookies }       from 'next/headers'
import { getBlogPost, saveBlogPost, deleteBlogPost } from '@/lib/content-store'

type Params = { params: Promise<{ id: string }> }

async function auth(): Promise<boolean> {
  const jar = await cookies()
  const tok = jar.get(SESSION_COOKIE)?.value
  return validateSession(tok)
}

export async function GET(_req: NextRequest, { params }: Params) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const post   = getBlogPost(id)
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ ok: true, post })
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const existing = getBlogPost(id)
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const body = await req.json()
  const updated = { ...existing, ...body, id }
  await saveBlogPost(updated)
  return NextResponse.json({ ok: true, post: updated })
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id }  = await params
  const deleted = await deleteBlogPost(id)
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
