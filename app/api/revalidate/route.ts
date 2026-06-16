import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/revalidate
 * Called by the WordPress plugin (revalidate.php) after every publish/update.
 * Body: { secret: string, tags: string[] }
 */
export async function POST(req: NextRequest) {
  let body: { secret?: string; tags?: string[] }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 })
  }

  const secret = process.env.NEXT_REVALIDATE_SECRET
  if (!secret || body.secret !== secret) {
    return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 })
  }

  const tags = Array.isArray(body.tags) ? body.tags : ['all']

  // Map generic WP tags to the prefixed tags this client uses
  const tagMap: Record<string, string[]> = {
    'all':            ['wp-posts', 'wp-case-studies', 'wp-services', 'wp-team', 'wp-testimonials', 'wp-site-settings', 'wp-featured-posts'],
    'blog':           ['wp-posts', 'wp-featured-posts'],
    'case-studies':   ['wp-case-studies'],
    'services':       ['wp-services'],
    'team':           ['wp-team'],
    'testimonials':   ['wp-testimonials'],
    'industry-news':  ['wp-posts'],
  }

  const resolved = new Set<string>()
  for (const t of tags) {
    const mapped = tagMap[t]
    if (mapped) {
      mapped.forEach(m => resolved.add(m))
    } else {
      // Pass through prefixed tags like "wp-post:some-slug"
      resolved.add(t.startsWith('wp-') ? t : `wp-${t}`)
    }
  }

  for (const tag of resolved) {
    revalidateTag(tag)
  }

  return NextResponse.json({ ok: true, revalidated: [...resolved] })
}
