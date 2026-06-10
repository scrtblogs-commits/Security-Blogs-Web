import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getStaticPost, staticPosts } from '@/lib/staticBlogPosts'
import CTABand from '@/components/ui/CTABand'
import Breadcrumb from '@/components/ui/Breadcrumb'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return staticPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getStaticPost(slug)
  if (!post) return { title: 'Blog · Knowledge Hub' }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/knowledge-hub/blog/${slug}/` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/knowledge-hub/blog/${slug}/`,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  }
}

const CAT_META: Record<string, { color: string; bg: string }> = {
  'SEO':      { color: '#1e9e75', bg: '#1e9e7514' },
  'AIO/AEO':  { color: '#6f4dff', bg: '#6f4dff14' },
  'GEO':      { color: '#e23744', bg: '#e2374414' },
  'Paid Ads': { color: '#d4900a', bg: '#f6c71516' },
  'Industry': { color: '#1e5fe0', bg: '#1e5fe014' },
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getStaticPost(slug)
  if (!post) notFound()

  const meta = CAT_META[post.cat] ?? CAT_META['Industry']

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: 480,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}>
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.imageAlt}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,18,32,0.35) 0%, rgba(10,18,32,0.72) 60%, rgba(10,18,32,0.92) 100%)',
        }} />

        {/* Hero content */}
        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '40px 32px 48px' }}>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Knowledge Hub', href: '/knowledge-hub/' },
              { label: 'Blog', href: '/knowledge-hub/blogs/' },
              { label: post.cat },
            ]}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '18px 0 16px' }}>
            <span style={{
              background: meta.bg, color: meta.color, border: `1px solid ${meta.color}50`,
              borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em',
              backdropFilter: 'blur(8px)',
            }}>{post.cat}</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-mono)' }}>{post.date}</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>·</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-mono)' }}>{post.read} read</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 900, color: '#ffffff',
            lineHeight: 1.2, letterSpacing: '-0.025em', maxWidth: 780, marginBottom: 16,
          }}>{post.title}</h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', maxWidth: 640, lineHeight: 1.65 }}>
            {post.excerpt}
          </p>
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: `linear-gradient(135deg, ${meta.color}, ${meta.color}99)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, color: '#fff', fontWeight: 800, flexShrink: 0,
            }}>
              {post.author.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{post.author}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{post.authorRole}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Takeaways ─────────────────────────────────────────────── */}
      <section style={{ background: '#f8faff', borderBottom: '1px solid #e8edf7' }}>
        <div className="container" style={{ maxWidth: 860, padding: '32px 32px' }}>
          <div style={{
            background: '#fff', borderRadius: 16,
            border: `1.5px solid ${meta.color}25`,
            boxShadow: `0 4px 24px -8px ${meta.color}18`,
            padding: '24px 28px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 18 }}>✦</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: meta.color, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Key takeaways
              </span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {post.keyTakeaways.map((t, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14.5, color: '#2d3a52', lineHeight: 1.6 }}>
                  <span style={{ color: meta.color, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Article body ──────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: 860, padding: '48px 32px 56px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 56, alignItems: 'start' }}>

            {/* Main content */}
            <article>
              {post.body.map((section, si) => (
                <div key={si} style={{ marginBottom: 40 }}>
                  {section.heading && (
                    <h2 style={{
                      fontSize: 22, fontWeight: 800, color: '#0f2244',
                      letterSpacing: '-0.015em', lineHeight: 1.35,
                      marginBottom: 16, paddingBottom: 12,
                      borderBottom: `2px solid ${meta.color}20`,
                    }}>
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((p, pi) => (
                    <p key={pi} style={{
                      fontSize: 16, color: '#3a4a63', lineHeight: 1.8,
                      marginBottom: 16,
                    }}>
                      {p}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {section.bullets.map((b, bi) => (
                        <li key={bi} style={{
                          display: 'flex', alignItems: 'flex-start', gap: 10,
                          fontSize: 15, color: '#3a4a63', lineHeight: 1.7,
                          background: '#f8faff', borderRadius: 10,
                          padding: '10px 14px',
                          border: `1px solid ${meta.color}15`,
                        }}>
                          <span style={{ color: meta.color, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>→</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Keywords footer */}
              <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #e8edf7' }}>
                <div style={{ fontSize: 12, color: '#8896af', fontFamily: 'var(--font-mono)', marginBottom: 10, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Topics covered
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {post.keywords.map((k) => (
                    <span key={k} style={{
                      background: meta.bg, color: meta.color,
                      border: `1px solid ${meta.color}25`,
                      borderRadius: 999, padding: '4px 12px',
                      fontSize: 12, fontWeight: 600,
                    }}>{k}</span>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside style={{ position: 'sticky', top: 96 }}>
              {/* Table of contents */}
              <div style={{
                background: '#f8faff', borderRadius: 14,
                border: '1px solid #e8edf7',
                padding: '20px 20px',
                marginBottom: 20,
              }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#8896af', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 14 }}>
                  Contents
                </div>
                <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {post.body.filter((s) => s.heading).map((s, i) => (
                    <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 11, color: meta.color, fontWeight: 700, fontFamily: 'var(--font-mono)', flexShrink: 0, paddingTop: 2 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: 13, color: '#46546e', lineHeight: 1.45 }}>{s.heading}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Post meta card */}
              <div style={{
                background: '#fff', borderRadius: 14,
                border: `1.5px solid ${meta.color}20`,
                padding: '18px 18px',
              }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#8896af', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 14 }}>
                  About this post
                </div>
                {[
                  { label: 'Category', value: post.cat },
                  { label: 'Published', value: post.date },
                  { label: 'Read time', value: `${post.read} read` },
                  { label: 'Author', value: post.author },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 8 }}>
                    <span style={{ fontSize: 12, color: '#8896af' }}>{label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#2d3a52', textAlign: 'right' }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Back to blog */}
              <a
                href="/knowledge-hub/blogs/"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  marginTop: 16, padding: '10px 0', borderRadius: 10,
                  background: meta.bg, color: meta.color,
                  border: `1.5px solid ${meta.color}30`,
                  fontSize: 13, fontWeight: 700, textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                ← Back to all posts
              </a>
            </aside>
          </div>
        </div>
      </section>

      <CTABand
        title="Want results like this for your security brand?"
        subtitle="Our team specialises exclusively in security industry marketing — SEO, AIO, GEO and paid media."
        ctaLabel="Get your free audit →"
        ctaHref="/contact/"
      />
    </>
  )
}
