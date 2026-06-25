import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPostBySlug, allPostSlugs, posts } from '@/lib/posts'
import JsonLd from '@/components/JsonLd'
import BlogReadingProgress from '@/components/ui/BlogReadingProgress'
import BlogTOC from '@/components/ui/BlogTOC'

function injectHeadingIds(html: string): string {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h[23]>/gi, (_, level, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, '')
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`
  })
}

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return allPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Blog · Knowledge Hub' }
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/knowledge-hub/blogs/${post.slug}/` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `/knowledge-hub/blogs/${post.slug}/`,
      siteName: 'SecurityBlogs',
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const bodyWithIds = injectHeadingIds(post.body)

  const related = posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: (post as Record<string, unknown>).updatedAt ?? post.date ?? new Date().toISOString(),
    image: (post as Record<string, unknown>).image ?? 'https://securityblogs.com.au/og-image.png',
    author: { '@type': 'Person', name: 'SecurityBlogs Team', url: 'https://securityblogs.com.au/about-us/' },
    publisher: { '@type': 'Organization', name: 'SecurityBlogs' },
    mainEntityOfPage: `https://securityblogs.com.au/knowledge-hub/blogs/${post.slug}/`,
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-AU', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <>
      <JsonLd data={articleSchema} />
      <BlogReadingProgress />

      <article>
        {/* ── Hero ──────────────────────────────────────── */}
        <div className="sg-post-hero">
          <div className="container" style={{ maxWidth: 900, paddingTop: 0, paddingBottom: 40 }}>
            {/* Breadcrumb */}
            <nav style={{ marginBottom: 20, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-dim)' }}>
              <Link href="/" style={{ color: 'var(--text-dim)' }}>Home</Link>
              <span style={{ opacity: 0.5 }}>/</span>
              <Link href="/knowledge-hub/" style={{ color: 'var(--text-dim)' }}>Knowledge Hub</Link>
              <span style={{ opacity: 0.5 }}>/</span>
              <Link href="/knowledge-hub/blogs/" style={{ color: 'var(--text-dim)' }}>Blog</Link>
              <span style={{ opacity: 0.5 }}>/</span>
              <span style={{ color: 'var(--text-soft)' }}>{post.title}</span>
            </nav>

            {/* Category + meta */}
            <div className="sg-post-meta">
              <span className="chip" style={{ color: 'var(--blue)', borderColor: 'rgba(30,95,224,0.3)', background: 'rgba(30,95,224,0.07)' }}>
                {post.category}
              </span>
              <span className="sep">·</span>
              <span>{formattedDate}</span>
              <span className="sep">·</span>
              <span>{post.read} read</span>
              <span className="sep">·</span>
              <span>By SecurityBlogs Team</span>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: 20,
              maxWidth: 820,
            }}>
              {post.title}
            </h1>

            {/* Excerpt */}
            <p style={{
              fontSize: 'clamp(16px, 2vw, 19px)',
              color: 'var(--text-soft)',
              lineHeight: 1.65,
              maxWidth: 720,
              marginBottom: 28,
            }}>
              {post.excerpt}
            </p>

            {/* Share + back */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/knowledge-hub/blogs/" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13.5, color: 'var(--text-dim)', padding: '8px 14px',
                border: '1px solid var(--line)', borderRadius: 8,
                transition: 'all 0.15s ease',
              }}>
                ← Back to blog
              </Link>
            </div>
          </div>
        </div>

        {/* ── Article body + sidebar ────────────────────── */}
        <section className="section" style={{ paddingTop: 40 }}>
          <div className="container sg-article-layout" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 280px',
            gap: 48,
            alignItems: 'start',
            maxWidth: 1100,
          }}>
            {/* Main content */}
            <div>
              <div
                className="sg-article"
                id="article-body"
                dangerouslySetInnerHTML={{ __html: bodyWithIds }}
              />

              {/* Author card */}
              <div style={{
                marginTop: 48,
                padding: '24px 28px',
                borderRadius: 16,
                border: '1px solid var(--line)',
                background: 'var(--bg-card-2)',
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18,
                  flexShrink: 0,
                }}>
                  SB
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 4 }}>SecurityBlogs Team</div>
                  <div style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.55 }}>
                    We write practical, vendor-neutral guides on SEO, AI visibility and paid advertising for security industry brands in Australia.
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="sg-sidebar" style={{ position: 'sticky', top: 96 }}>
              {/* TOC */}
              <BlogTOC html={bodyWithIds} />

              {/* CTA widget */}
              <div className="sg-sidebar-widget" style={{ background: 'linear-gradient(135deg, rgba(30,95,224,0.08) 0%, rgba(30,95,224,0.02) 100%)', borderColor: 'rgba(30,95,224,0.2)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 10 }}>
                  Free Visibility Audit
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--text-soft)', marginBottom: 14, lineHeight: 1.55 }}>
                  See exactly where your security brand is missing from Google and AI assistants — with a free audit.
                </p>
                <Link href="/contact/" className="btn btn-primary" style={{ fontSize: 13.5, padding: '10px 16px', width: '100%', justifyContent: 'center', display: 'flex' }}>
                  Book free audit →
                </Link>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div className="sg-sidebar-widget">
                  <div className="sg-sidebar-widget-title">Related reads</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {related.map((r) => (
                      <Link key={r.slug} href={`/knowledge-hub/blogs/${r.slug}/`} style={{ display: 'block', textDecoration: 'none' }}>
                        <div style={{ fontSize: 13, color: 'var(--blue)', marginBottom: 3 }}>{r.category}</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.4 }}>{r.title}</div>
                        <div style={{ fontSize: 12.5, color: 'var(--text-dim)', marginTop: 3 }}>{r.read} read</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Directory widget */}
              <div className="sg-sidebar-widget">
                <div className="sg-sidebar-widget-title">Security Directory</div>
                <p style={{ fontSize: 13.5, color: 'var(--text-soft)', marginBottom: 14, lineHeight: 1.55 }}>
                  Find and compare AI-verified security companies across Australia.
                </p>
                <Link href="/security-directory/" style={{ fontSize: 13.5, color: 'var(--blue)', fontWeight: 600 }}>
                  Browse directory →
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* ── Related posts (mobile / bottom) ──────────── */}
        {related.length > 0 && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="container" style={{ maxWidth: 1100 }}>
              <div style={{ marginBottom: 24 }}>
                <span className="eyebrow">More from {post.category}</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, marginTop: 8 }}>
                  Keep reading
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/knowledge-hub/blogs/${r.slug}/`}
                    className="card"
                    style={{ textDecoration: 'none', display: 'block', padding: 24 }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <span className="chip" style={{ color: 'var(--blue)', borderColor: 'rgba(30,95,224,0.3)', background: 'rgba(30,95,224,0.07)' }}>
                        {r.category}
                      </span>
                      <span style={{ fontSize: 12.5, color: 'var(--text-dim)' }}>{r.read}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: 16, lineHeight: 1.3, marginBottom: 8, color: 'var(--text)' }}>
                      {r.title}
                    </div>
                    <p style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.55, margin: 0 }}>
                      {r.excerpt.substring(0, 100)}…
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  )
}
