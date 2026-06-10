import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getStaticGuide, staticGuides } from '@/lib/staticGuides'
import CTABand from '@/components/ui/CTABand'
import Breadcrumb from '@/components/ui/Breadcrumb'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return staticGuides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = getStaticGuide(slug)
  if (!guide) return { title: 'Security Guides · Knowledge Hub' }
  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: `/knowledge-hub/security-guides/${slug}/` },
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      url: `/knowledge-hub/security-guides/${slug}/`,
      type: 'article',
      images: [{ url: guide.image, alt: guide.imageAlt }],
    },
  }
}

const DIFF_META: Record<string, { color: string; bg: string }> = {
  Beginner:     { color: '#16a34a', bg: '#16a34a14' },
  Intermediate: { color: '#d4900a', bg: '#f6c71516' },
  Advanced:     { color: '#e23744', bg: '#e2374414' },
}

export default async function SecurityGuidePage({ params }: Props) {
  const { slug } = await params
  const guide = getStaticGuide(slug)
  if (!guide) notFound()

  const meta = DIFF_META[guide.diff] ?? DIFF_META['Intermediate']

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={guide.image}
          alt={guide.imageAlt}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,18,32,0.35) 0%, rgba(10,18,32,0.72) 60%, rgba(10,18,32,0.92) 100%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '40px 32px 48px' }}>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Knowledge Hub', href: '/knowledge-hub/' },
              { label: 'Security Guides', href: '/knowledge-hub/security-guides/' },
              { label: guide.diff },
            ]}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '18px 0 16px' }}>
            <span style={{
              background: meta.bg, color: meta.color, border: `1px solid ${meta.color}50`,
              borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em',
              backdropFilter: 'blur(8px)',
            }}>{guide.diff}</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-mono)' }}>{guide.read} read</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 900, color: '#ffffff',
            lineHeight: 1.2, letterSpacing: '-0.025em', maxWidth: 780, marginBottom: 16,
          }}>{guide.title}</h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', maxWidth: 640, lineHeight: 1.65 }}>
            {guide.excerpt}
          </p>
          {/* Topics row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
            {guide.topics.map((t) => (
              <span key={t} style={{
                background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 999, padding: '4px 12px',
                fontSize: 12, fontWeight: 600,
                backdropFilter: 'blur(8px)',
              }}>{t}</span>
            ))}
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
              {guide.keyTakeaways.map((t, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14.5, color: '#2d3a52', lineHeight: 1.6 }}>
                  <span style={{ color: meta.color, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Guide body ────────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: 860, padding: '48px 32px 56px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 56, alignItems: 'start' }}>

            {/* Main content */}
            <article>
              {/* Intro */}
              <p style={{
                fontSize: 17, color: '#3a4a63', lineHeight: 1.8, marginBottom: 40,
                paddingBottom: 32, borderBottom: `2px solid ${meta.color}18`,
                fontStyle: 'italic',
              }}>
                {guide.intro}
              </p>

              {guide.sections.map((section, si) => (
                <div key={si} style={{ marginBottom: 44 }}>
                  <h2 style={{
                    fontSize: 22, fontWeight: 800, color: '#0f2244',
                    letterSpacing: '-0.015em', lineHeight: 1.35,
                    marginBottom: 16, paddingBottom: 12,
                    borderBottom: `2px solid ${meta.color}20`,
                  }}>
                    {section.heading}
                  </h2>

                  {section.body.map((p, pi) => (
                    <p key={pi} style={{ fontSize: 16, color: '#3a4a63', lineHeight: 1.8, marginBottom: 16 }}>
                      {p}
                    </p>
                  ))}

                  {section.steps && (
                    <div style={{ margin: '20px 0 0' }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: meta.color, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
                        Steps
                      </div>
                      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {section.steps.map((step, i) => (
                          <li key={i} style={{
                            display: 'flex', alignItems: 'flex-start', gap: 12,
                            background: '#f8faff', borderRadius: 10,
                            padding: '12px 16px',
                            border: `1px solid ${meta.color}18`,
                          }}>
                            <span style={{
                              width: 24, height: 24, borderRadius: '50%',
                              background: meta.color, color: '#fff',
                              fontSize: 11, fontWeight: 800, fontFamily: 'var(--font-mono)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              flexShrink: 0,
                            }}>{i + 1}</span>
                            <span style={{ fontSize: 14.5, color: '#3a4a63', lineHeight: 1.65 }}>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {section.checklist && (
                    <div style={{ margin: '20px 0 0' }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: meta.color, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
                        Checklist
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                        {section.checklist.map((item, i) => (
                          <li key={i} style={{
                            display: 'flex', alignItems: 'flex-start', gap: 10,
                            fontSize: 14.5, color: '#3a4a63', lineHeight: 1.65,
                          }}>
                            <span style={{
                              width: 18, height: 18, borderRadius: 5,
                              border: `2px solid ${meta.color}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              flexShrink: 0, marginTop: 3,
                            }}>
                              <span style={{ width: 8, height: 8, borderRadius: 2, background: meta.color }} />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.tip && (
                    <div style={{
                      marginTop: 20, padding: '14px 18px',
                      background: `${meta.color}0a`,
                      border: `1.5px solid ${meta.color}30`,
                      borderRadius: 12, borderLeft: `4px solid ${meta.color}`,
                    }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: meta.color, textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>Tip · </span>
                      <span style={{ fontSize: 14, color: '#3a4a63', lineHeight: 1.65 }}>{section.tip}</span>
                    </div>
                  )}
                </div>
              ))}

              {/* Topics footer */}
              <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #e8edf7' }}>
                <div style={{ fontSize: 12, color: '#8896af', fontFamily: 'var(--font-mono)', marginBottom: 10, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Topics covered
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {guide.topics.map((t) => (
                    <span key={t} style={{
                      background: meta.bg, color: meta.color,
                      border: `1px solid ${meta.color}25`,
                      borderRadius: 999, padding: '4px 12px',
                      fontSize: 12, fontWeight: 600,
                    }}>{t}</span>
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
                  {guide.sections.map((s, i) => (
                    <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 11, color: meta.color, fontWeight: 700, fontFamily: 'var(--font-mono)', flexShrink: 0, paddingTop: 2 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: 13, color: '#46546e', lineHeight: 1.45 }}>{s.heading}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Guide meta card */}
              <div style={{
                background: '#fff', borderRadius: 14,
                border: `1.5px solid ${meta.color}20`,
                padding: '18px 18px',
              }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#8896af', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 14 }}>
                  About this guide
                </div>
                {[
                  { label: 'Difficulty', value: guide.diff },
                  { label: 'Read time', value: `${guide.read} read` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 8 }}>
                    <span style={{ fontSize: 12, color: '#8896af' }}>{label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#2d3a52', textAlign: 'right' }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Back link */}
              <a
                href="/knowledge-hub/security-guides/"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  marginTop: 16, padding: '10px 0', borderRadius: 10,
                  background: meta.bg, color: meta.color,
                  border: `1.5px solid ${meta.color}30`,
                  fontSize: 13, fontWeight: 700, textDecoration: 'none',
                }}
              >
                ← Back to all guides
              </a>
            </aside>
          </div>
        </div>
      </section>

      <CTABand
        title="Need help implementing these strategies?"
        subtitle="Our team specialises exclusively in security industry marketing — SEO, AIO, GEO and paid media."
        ctaLabel="Get your free audit →"
        ctaHref="/contact/"
      />
    </>
  )
}
