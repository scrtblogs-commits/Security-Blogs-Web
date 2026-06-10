import { NextRequest, NextResponse } from 'next/server'
import { validateSession, SESSION_COOKIE } from '@/lib/admin-session'
import { cookies }   from 'next/headers'
import {
  writeContent,
  getSiteSettings, getHomepageContent, getStats, getFaqs,
  getTestimonials, getServices, getPricing,
} from '@/lib/content-store'

type Params = { params: Promise<{ type: string }> }

const READERS: Record<string, () => unknown> = {
  'site-settings': getSiteSettings,
  'homepage':      getHomepageContent,
  'stats':         getStats,
  'faqs':          getFaqs,
  'testimonials':  getTestimonials,
  'services':      getServices,
  'pricing':       getPricing,
}

async function auth(): Promise<boolean> {
  const jar = await cookies()
  const tok = jar.get(SESSION_COOKIE)?.value
  return validateSession(tok)
}

export async function GET(_req: NextRequest, { params }: Params) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { type } = await params
  const reader = READERS[type]
  if (!reader) return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
  return NextResponse.json({ ok: true, data: reader() })
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { type } = await params
  if (!READERS[type]) return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
  const body = await req.json()
  await writeContent(type, body)
  return NextResponse.json({ ok: true })
}
