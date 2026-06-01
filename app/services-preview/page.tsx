import CookieBanner from '@/components/immersive/CookieBanner'
import ClientHero from './ClientHero'

// PREVIEW of the new /services/ immersive hero. Lives at /services-preview/
// while we iterate. When approved, this page is promoted to /services/.
// noindex/nofollow so search engines don't pick it up during the review cycle.
export const metadata = {
  title: 'AI Visibility Engine (Preview)',
  description: 'Live preview of the new immersive services experience for SecurityBlogs.',
  alternates: { canonical: '/services-preview/' },
  robots: { index: false, follow: false },
}

export default function ServicesPreviewPage() {
  return (
    <>
      <ClientHero />
      <CookieBanner />
      <section style={{ padding: '80px 24px', background: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, marginInline: 'auto' }}>
          <p style={{ fontSize: 13, color: '#5f6f8a', fontFamily: 'var(--font-mono, monospace)', letterSpacing: 1.5, marginBottom: 8 }}>
            PREVIEW PAGE · NOINDEX
          </p>
          <h2 style={{ fontSize: 28, marginBottom: 12 }}>
            The actual services list goes below.
          </h2>
          <p style={{ fontSize: 14.5, color: '#46546e', lineHeight: 1.6 }}>
            When this immersive experience is approved it replaces the hero on{' '}
            <code>/services/</code>. The existing services grid and content
            stays unchanged below it.
          </p>
        </div>
      </section>
    </>
  )
}
