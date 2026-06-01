import LocalVisibilityCheck from '@/components/immersive/LocalVisibilityCheck'
import CookieBanner from '@/components/immersive/CookieBanner'

// Separate preview path that demonstrates the focused below-hero widget.
// Pairs a stand-in H1 hero (representing the existing service-page hero we
// will NOT touch) with the new <LocalVisibilityCheck/> beneath it. Noindex
// during review.
export const metadata = {
  title: 'Local Visibility Widget (Preview)',
  description: 'Preview of the below-hero local visibility widget.',
  alternates: { canonical: '/services-preview-local/' },
  robots: { index: false, follow: false },
}

export default function ServicesPreviewLocalPage() {
  return (
    <>
      {/* STAND-IN HERO — represents whatever existing H1 banner / hero image
          sits on the destination service page. We DO NOT touch the real
          hero in production; this is here only so the widget reviews in
          the same visual context (below a hero) on this preview path. */}
      <section
        style={{
          padding: '140px 24px 80px',
          background:
            'linear-gradient(180deg, #f0f7ff 0%, #e7f3ff 60%, #ffffff 100%)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ fontSize: 12, letterSpacing: 2, color: '#1e5fe0', fontWeight: 600, marginBottom: 12 }}>
            PREVIEW · WIDGET DROPS BELOW THIS HERO
          </p>
          <h1 style={{ fontSize: 'clamp(34px, 5.4vw, 60px)', fontWeight: 700, color: '#0f2244', lineHeight: 1.05, margin: 0 }}>
            Be the <span style={{ color: '#1e5fe0', fontStyle: 'italic' }}>answer</span> AI gives.
          </h1>
          <p style={{ marginTop: 18, fontSize: 16, color: '#46546e', maxWidth: 520, margin: '18px auto 0', lineHeight: 1.55 }}>
            (Stand-in for an existing page hero. The new focused widget renders
            directly below — see next section.)
          </p>
        </div>
      </section>

      {/* THE NEW WIDGET */}
      <LocalVisibilityCheck service="security companies" />

      <CookieBanner />

      <section style={{ padding: '60px 24px', background: '#fff', textAlign: 'center', color: '#46546e' }}>
        <p style={{ fontSize: 13, fontFamily: 'var(--font-mono, monospace)', letterSpacing: 1.2, marginBottom: 6 }}>
          PREVIEW · NOINDEX
        </p>
        <p style={{ fontSize: 14, maxWidth: 600, margin: '0 auto', lineHeight: 1.55 }}>
          The widget above is what gets added below the existing hero on a real
          service page once approved. Nothing on <code>/services/security-seo/</code>{' '}
          or <code>/services-preview/</code> has been touched.
        </p>
      </section>
    </>
  )
}
