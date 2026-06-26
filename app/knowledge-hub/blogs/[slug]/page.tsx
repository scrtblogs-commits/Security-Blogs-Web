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

      <style>{`
        @media (max-width: 1024px) { .blog-hero-grid { grid-template-columns: 1fr !important; } .blog-hero-img { display: none !important; } }
        @media (max-width: 900px) { .blog-article-grid { grid-template-columns: 1fr !important; } .blog-sidebar { display: none !important; } }
      `}</style>

      <article>
        {/* ── Dark Navy Hero ── */}
        <div style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #060f1f 0%, #0d1e3d 55%, #071428 100%)',
          overflow: 'hidden',
          paddingTop: 'calc(var(--nav-h) + 48px)',
          paddingBottom: 64,
        }}>
          {/* Dot grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
          {/* Glow blobs */}
          <div style={{ position: 'absolute', top: '10%', left: '5%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,95,224,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '0%', right: '10%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,57,224,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
            <div className="blog-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr minmax(0, 360px)', gap: 48, alignItems: 'center' }}>

              {/* Left: text */}
              <div>
                {/* Breadcrumb */}
                <nav style={{ marginBottom: 20, fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Link href="/" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>Home</Link>
                  <span style={{ color: 'rgba(255,255,255,0.25)' }}>/</span>
                  <Link href="/knowledge-hub/" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>Knowledge Hub</Link>
                  <span style={{ color: 'rgba(255,255,255,0.25)' }}>/</span>
                  <Link href="/knowledge-hub/blogs/" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>Blog</Link>
                  <span style={{ color: 'rgba(255,255,255,0.25)' }}>/</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>{post.category}</span>
                </nav>

                {/* Meta row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7eb3ff', background: 'rgba(30,95,224,0.2)', border: '1px solid rgba(30,95,224,0.35)', borderRadius: 99, padding: '4px 12px' }}>
                    {post.category}
                  </span>
                  <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.4)' }}>·</span>
                  <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)' }}>{formattedDate}</span>
                  <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.4)' }}>·</span>
                  <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)' }}>{post.read} read</span>
                  <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.4)' }}>·</span>
                  <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)' }}>By SecurityBlogs Team</span>
                </div>

                {/* Title */}
                <h1 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.025em',
                  color: '#fff',
                  marginBottom: 20,
                  maxWidth: 760,
                }}>
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p style={{
                  fontSize: 'clamp(15px, 1.8vw, 18px)',
                  color: 'rgba(255,255,255,0.62)',
                  lineHeight: 1.7,
                  maxWidth: 660,
                  marginBottom: 32,
                }}>
                  {post.excerpt}
                </p>

                {/* Back link */}
                <Link href="/knowledge-hub/blogs/" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 13.5, color: 'rgba(255,255,255,0.55)',
                  padding: '8px 16px', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 8, textDecoration: 'none',
                }}>
                  ← Back to blog
                </Link>
              </div>

              {/* Right: decorative glow card */}
              <div className="blog-hero-img" style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20,
                padding: 28,
                backdropFilter: 'blur(16px)',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
                  {post.category} · SecurityBlogs
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 20 }}>
                  {post.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[formattedDate, `${post.read} read`, 'By SecurityBlogs Team'].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1e5fe0', flexShrink: 0 }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Bottom fade */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom, transparent, #fff)', pointerEvents: 'none' }} />
        </div>

        {/* ── Article body + sidebar ── */}
        <section style={{ paddingTop: 48, paddingBottom: 64 }}>
          <div className="blog-article-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) 300px',
            gap: 48,
            alignItems: 'start',
            maxWidth: 1440,
            margin: '0 auto',
            padding: '0 32px',
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
            <aside className="blog-sidebar" style={{ position: 'sticky', top: 96 }}>
              <BlogTOC html={bodyWithIds} />

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

        {/* ── Related posts bottom ── */}
        {related.length > 0 && (
          <section style={{ paddingBottom: 64, paddingTop: 0 }}>
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 32px' }}>
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
