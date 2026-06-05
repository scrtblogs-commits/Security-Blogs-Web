import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPost, getPosts } from '@/lib/cms'
import type { CmsPostCategory } from '@/lib/cmsTypes'
import LexicalRenderer from '@/components/modules/LexicalRenderer'

// /knowledge-hub/[category]/[slug] — CMS-driven blog post page.
//
// Categories map 1:1 to the CMS `category` enum:
//   blog, industry-news, security-guides, research-reports,
//   security-industry-seo, security-trends-2026
//
// The existing /knowledge-hub/<category>/ index routes (already static)
// keep working as the category landings — they'll be rewired to fetch
// from the CMS in Phase C.2.

export const revalidate = 60

const VALID_CATEGORIES: ReadonlyArray<CmsPostCategory> = [
  'blog', 'industry-news', 'security-guides', 'research-reports',
  'security-industry-seo', 'security-trends-2026',
]

type Props = { params: Promise<{ category: string; slug: string }> }

function isValidCategory(c: string): c is CmsPostCategory {
  return (VALID_CATEGORIES as readonly string[]).includes(c)
}

export async function generateStaticParams() {
  // Pre-render the most-recent N per category at build time; older posts
  // are generated on-demand by ISR.
  const out: Array<{ category: string; slug: string }> = []
  for (const category of VALID_CATEGORIES) {
    const posts = await getPosts({ category, limit: 50 })
    for (const p of posts) out.push({ category, slug: p.slug })
  }
  return out
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  if (!isValidCategory(category)) return { title: 'Knowledge Hub' }
  const post = await getPost(slug)
  if (!post || post.category !== category) return { title: 'Knowledge Hub' }
  return {
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
    alternates: { canonical: post.seo?.canonical ?? `/knowledge-hub/${category}/${slug}/` },
    robots: post.seo?.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: post.seo?.title ?? post.title,
      description: post.seo?.description ?? post.excerpt,
      url: `/knowledge-hub/${category}/${slug}/`,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { category, slug } = await params
  if (!isValidCategory(category)) notFound()
  const post = await getPost(slug)
  if (!post || post.category !== category) notFound()

  return (
    <main>
      <article>
        <header className="section section-hero">
          <div className="container" style={{ maxWidth: 760 }}>
            <div className="eyebrow">{category.replace(/-/g, ' ')}</div>
            <h1 className="h1" style={{ marginTop: 8 }}>{post.title}</h1>
            {post.excerpt && <p className="lede" style={{ marginTop: 16 }}>{post.excerpt}</p>}
            {(post.publishedAt || post.authors?.length) && (
              <div style={{ marginTop: 24, color: 'var(--text-soft)', fontSize: 14, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
                {post.authors?.length ? <span>By {post.authors.map((a) => a.name).join(', ')}</span> : null}
              </div>
            )}
          </div>
        </header>
        <section className="section">
          <div className="container prose" style={{ maxWidth: 760 }}>
            <LexicalRenderer state={post.body} />
          </div>
        </section>
      </article>
    </main>
  )
}
