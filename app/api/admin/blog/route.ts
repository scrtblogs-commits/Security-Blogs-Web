import { NextRequest, NextResponse } from 'next/server'
import { validateSession, SESSION_COOKIE } from '@/lib/admin-session'
import { cookies }       from 'next/headers'
import { getBlogPosts, saveBlogPost, type BlogPost } from '@/lib/content-store'
import { randomUUID }    from 'node:crypto'

async function auth(): Promise<boolean> {
  const jar = await cookies()
  const tok = jar.get(SESSION_COOKIE)?.value
  return validateSession(tok)
}

export async function GET() {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json({ ok: true, posts: getBlogPosts() })
}

export async function POST(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json() as Partial<BlogPost>
  const post: BlogPost = {
    id:         randomUUID(),
    slug:       body.slug        ?? '',
    title:      body.title       ?? 'Untitled',
    excerpt:    body.excerpt     ?? '',
    content:    body.content     ?? '',
    cat:        body.cat         ?? 'SEO',
    date:       body.date        ?? new Date().toISOString().slice(0, 10),
    read:       body.read        ?? '5 min',
    featured:   body.featured    ?? false,
    published:  body.published   ?? false,
    author:     body.author      ?? 'SecurityBlogs',
    coverImage: body.coverImage,
  }
  await saveBlogPost(post)
  return NextResponse.json({ ok: true, post })
}
