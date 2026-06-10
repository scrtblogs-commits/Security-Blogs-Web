import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { guides } from '../guidesData'
import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CTABand from '@/components/ui/CTABand'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) return { title: 'Security Guides · Knowledge Hub' }
  return {
    title: `${guide.title} · Security Guides`,
    description: guide.excerpt,
    alternates: { canonical: `/knowledge-hub/security-guides/${slug}/` },
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      url: `/knowledge-hub/security-guides/${slug}/`,
      type: 'article',
    },
  }
}

const diffColor: Record<string, string> = {
  Beginner: 'var(--green)',
  Intermediate: 'var(--yellow)',
  Advanced: 'var(--red)',
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) notFound()

  return (
    <>
      <HeroBg>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Knowledge Hub', href: '/knowledge-hub/' },
            { label: 'Security Guides', href: '/knowledge-hub/security-guides/' },
            { label: guide.title },
          ]}
        />
        <div style={{ maxWidth: 760, paddingTop: 32, paddingBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span
              className="chip"
              style={{ color: diffColor[guide.diff], borderColor: diffColor[guide.diff] }}
            >
              {guide.diff}
            </span>
            <span className="text-dim" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              {guide.read} read
            </span>
          </div>
          <h1 className="h1" style={{ marginBottom: 20 }}>
            {guide.title}
          </h1>
          <p className="lead" style={{ marginBottom: 28 }}>
            {guide.excerpt}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {guide.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </HeroBg>

      <article>
        <section className="section">
          <div className="container prose" style={{ maxWidth: 760 }}>
            <p style={{ fontSize: 17, lineHeight: 1.75, marginBottom: 40, color: 'var(--text-soft)' }}>
              {guide.intro}
            </p>

            {guide.sections.map((section) => (
              <div key={section.heading} style={{ marginBottom: 48 }}>
                <h2
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    marginBottom: 16,
                    fontFamily: 'var(--font-display)',
                    color: 'var(--text)',
                  }}
                >
                  {section.heading}
                </h2>
                <div style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-soft)' }}>
                  {section.body.split('\n').map((line, i) => {
                    if (line.trim() === '') return <br key={i} />
                    if (line.startsWith('```')) return null
                    if (line.startsWith('• ')) {
                      return (
                        <li
                          key={i}
                          style={{ marginLeft: 20, marginBottom: 6, listStyleType: 'disc' }}
                        >
                          {line.slice(2)}
                        </li>
                      )
                    }
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <p key={i} style={{ fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>
                          {line.slice(2, -2)}
                        </p>
                      )
                    }
                    return (
                      <p key={i} style={{ marginBottom: 12 }}>
                        {line}
                      </p>
                    )
                  })}
                </div>
              </div>
            ))}

            <div
              className="card"
              style={{
                padding: 28,
                marginTop: 48,
                borderLeft: '3px solid var(--accent)',
                background: 'var(--surface-2)',
              }}
            >
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: 'var(--text)' }}>
                Key Takeaway
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-soft)', margin: 0 }}>
                {guide.conclusion}
              </p>
            </div>

            <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
              <Link
                href="/knowledge-hub/security-guides/"
                className="accent"
                style={{ fontWeight: 600, fontSize: 15 }}
              >
                ← Back to all Security Guides
              </Link>
            </div>
          </div>
        </section>
      </article>

      <CTABand />
    </>
  )
}
