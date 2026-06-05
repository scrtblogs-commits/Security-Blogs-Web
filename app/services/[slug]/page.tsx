import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getService, getServices } from '@/lib/cms'

// ─────────────────────────────────────────────────────────────────────
// /services/[slug] — CMS-driven service page.
//
// Coexists with the legacy hand-built /services/<name>/page.tsx routes
// (aio, aeo, geo, security-seo, google-ads, bing-ads, web-design). In
// the Next.js App Router, a static segment at the same level shadows
// the dynamic [slug], so the existing pages keep rendering until each
// is deleted and the CMS record takes over.
//
// As each legacy service page is retired, that route's content is
// already in the CMS (seeded in Phase B), so removing the static folder
// is a no-op for the end-user.
//
// ISR: each service revalidates every 60 seconds via the cms client's
// default. Force-purge from the admin via the `service:<slug>` tag.
// ─────────────────────────────────────────────────────────────────────

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const svc = await getService(slug)
  if (!svc) return { title: 'Service' }
  return {
    title: svc.seo?.title ?? svc.title,
    description: svc.seo?.description ?? svc.tagline,
    alternates: { canonical: svc.seo?.canonical ?? `/services/${svc.slug}/` },
    robots: svc.seo?.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: svc.seo?.title ?? svc.title,
      description: svc.seo?.description ?? svc.tagline,
      url: `/services/${svc.slug}/`,
      type: 'website',
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const svc = await getService(slug)
  if (!svc) notFound()

  return (
    <main>
      {/* Hero */}
      <section className="section section-hero">
        <div className="container">
          <h1 className="h1">{svc.title}</h1>
          <p className="lede" style={{ marginTop: 16, maxWidth: 720 }}>{svc.tagline}</p>
          <p style={{ marginTop: 16, maxWidth: 760 }}>{svc.heroDescription}</p>
        </div>
      </section>

      {/* Capabilities */}
      {svc.capabilities && svc.capabilities.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="h2">What's included</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginTop: 24 }}>
              {svc.capabilities.map((c, i) => (
                <div key={i} className="card capability-card" data-variant={c.previewVariant ?? 'generic'}>
                  <h3 className="h3">{c.title}</h3>
                  <p style={{ marginTop: 10, color: 'var(--text-soft)' }}>{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {svc.processSteps && svc.processSteps.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="h2">How we work</h2>
            <ol style={{ marginTop: 24, display: 'grid', gap: 16, listStyle: 'none', padding: 0 }}>
              {svc.processSteps.map((s, i) => (
                <li key={i} className="card" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 20 }}>
                  <div aria-hidden style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="h3">{s.title}</h3>
                    <p style={{ marginTop: 8, color: 'var(--text-soft)' }}>{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Stats */}
      {svc.stats && svc.stats.length > 0 && (
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`, gap: 24 }}>
              {svc.stats.map((s, i) => (
                <div key={i} className="card" style={{ textAlign: 'center' }}>
                  <div className="h1" style={{ color: 'var(--blue)' }}>{s.value}</div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {svc.faqs && svc.faqs.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="h2">FAQs</h2>
            <div style={{ marginTop: 24, display: 'grid', gap: 12, maxWidth: 820 }}>
              {svc.faqs.map((f, i) => (
                <details key={i} className="card">
                  <summary style={{ cursor: 'pointer', fontWeight: 600 }}>{f.question}</summary>
                  <p style={{ marginTop: 12, color: 'var(--text-soft)' }}>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
