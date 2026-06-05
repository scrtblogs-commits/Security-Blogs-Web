import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCaseStudies, getCaseStudy } from '@/lib/cms'
import LexicalRenderer from '@/components/modules/LexicalRenderer'

// /case-studies/[slug] — CMS-driven case study detail page.
//
// The existing /case-studies/ index (app/case-studies/page.tsx) is the
// hand-built grid that already lists the seeded studies. Once it's
// rewired to fetch from the CMS in Phase C.2 it will keep pointing at
// these dynamic detail pages.

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const studies = await getCaseStudies()
  return studies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = await getCaseStudy(slug)
  if (!cs) return { title: 'Case Study' }
  return {
    title: cs.seo?.title ?? `${cs.clientName} — Case Study`,
    description: cs.seo?.description ?? cs.summary,
    alternates: { canonical: cs.seo?.canonical ?? `/case-studies/${cs.slug}/` },
    robots: cs.seo?.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: cs.seo?.title ?? `${cs.clientName} — Case Study`,
      description: cs.seo?.description ?? cs.summary,
      url: `/case-studies/${cs.slug}/`,
      type: 'article',
      publishedTime: cs.publishedAt,
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const cs = await getCaseStudy(slug)
  if (!cs) notFound()

  return (
    <main>
      <article>
        <header className="section section-hero">
          <div className="container" style={{ maxWidth: 820 }}>
            <div className="eyebrow">Case Study</div>
            <h1 className="h1" style={{ marginTop: 8 }}>{cs.clientName}</h1>
            <p className="lede" style={{ marginTop: 16 }}>{cs.summary}</p>
            <div style={{ display: 'flex', gap: 24, marginTop: 24, flexWrap: 'wrap', color: 'var(--text-soft)', fontSize: 14 }}>
              {cs.service && <span><strong>Service:</strong> {cs.service.title}</span>}
              {cs.partner && <span><strong>Partner:</strong> {cs.partner.name}</span>}
              {cs.publishedAt && <span><strong>Published:</strong> {new Date(cs.publishedAt).toLocaleDateString('en-AU')}</span>}
            </div>
          </div>
        </header>

        {cs.results && cs.results.length > 0 && (
          <section className="section">
            <div className="container">
              <h2 className="h2">Results</h2>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`, gap: 24, marginTop: 24 }}>
                {cs.results.map((r, i) => (
                  <div key={i} className="card" style={{ textAlign: 'center' }}>
                    <div className="h1" style={{ color: 'var(--blue)' }}>{r.value}</div>
                    <div style={{ marginTop: 8, fontWeight: 600 }}>{r.metric}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {cs.body !== undefined && cs.body !== null && (
          <section className="section">
            <div className="container prose" style={{ maxWidth: 760 }}>
              <LexicalRenderer state={cs.body} />
            </div>
          </section>
        )}
      </article>
    </main>
  )
}
