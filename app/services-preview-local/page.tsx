import SkyMapBackground from '@/components/immersive/SkyMapBackground'
import LocalVisibilityCheck from '@/components/immersive/LocalVisibilityCheck'
import CookieBanner from '@/components/immersive/CookieBanner'

// Preview path showing the final composition:
//   - <SkyMapBackground/> sits FIXED page-wide behind everything. As the
//     visitor scrolls, sky + clouds fade out and a country-level satellite
//     image fades in. No street-level imagery in the background.
//   - Hero + service blocks render OVER the background.
//   - <LocalVisibilityCheck/> renders directly above the footer. It is the
//     ONLY interactive element with a search input + live Google Maps
//     local-pack results.
//
// Noindex. The live /services-preview/ (full immersive scroll experience)
// and live /services/security-seo/ are untouched.
export const metadata = {
  title: 'Sky-to-Map Preview',
  description: 'Preview of the page-wide sky-to-map descent with the below-footer local visibility widget.',
  alternates: { canonical: '/services-preview-local/' },
  robots: { index: false, follow: false },
}

export default function ServicesPreviewLocalPage() {
  return (
    <>
      <SkyMapBackground />

      {/* HERO — sky shows through */}
      <section style={{ padding: '160px 24px 80px', position: 'relative', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ fontSize: 12, letterSpacing: 2, color: '#1e5fe0', fontWeight: 700, marginBottom: 14 }}>
            ● LIVE AI VISIBILITY ENGINE
          </p>
          <h1 style={{ fontSize: 'clamp(38px, 5.6vw, 72px)', fontWeight: 800, color: '#0f2244', lineHeight: 1.04, margin: 0 }}>
            Be the <span style={{ color: '#1e5fe0', fontStyle: 'italic' }}>answer</span><br />
            AI gives.
          </h1>
          <p style={{ marginTop: 22, fontSize: 17, color: '#34466a', maxWidth: 560, margin: '22px auto 0', lineHeight: 1.55 }}>
            Scroll down — we&apos;ll descend from sky to your local market and show
            you exactly where customers don&apos;t see you yet.
          </p>
          <div style={{ marginTop: 32, fontSize: 12, color: '#5f6f8a', fontFamily: 'var(--font-mono, monospace)', letterSpacing: 1.4 }}>
            ↓ KEEP SCROLLING
          </div>
        </div>
      </section>

      {/* TRANSITION BLOCK — sky fading, satellite emerging */}
      <section style={{ padding: '100px 24px', position: 'relative', textAlign: 'center' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(26px, 3.6vw, 40px)', fontWeight: 700, color: '#0f2244', margin: '0 0 16px' }}>
            We rank security brands across <span style={{ color: '#1e5fe0' }}>five markets</span>.
          </h2>
          <p style={{ fontSize: 16, color: '#34466a', lineHeight: 1.6, maxWidth: 640, margin: '0 auto' }}>
            Australia, the US, the UK, the UAE and Singapore. Different search
            engines, different AI engines, the same job: make sure when locals
            ask, your name is the one they hear.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 28, flexWrap: 'wrap', fontFamily: 'var(--font-mono, monospace)', fontSize: 12, letterSpacing: 1.4, color: '#5f6f8a' }}>
            <span>● GOOGLE</span><span>● CHATGPT</span><span>● GEMINI</span><span>● PERPLEXITY</span><span>● CLAUDE</span>
          </div>
        </div>
      </section>

      {/* SATELLITE BLOCK — image dominates, copy is short */}
      <section style={{ padding: '120px 24px 100px', position: 'relative', textAlign: 'center' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 22, padding: '36px 28px', boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 36px)', fontWeight: 700, color: '#0f2244', margin: '0 0 14px' }}>
            We&apos;ve almost reached your local market.
          </h2>
          <p style={{ fontSize: 15.5, color: '#34466a', lineHeight: 1.6, maxWidth: 580, margin: '0 auto' }}>
            One more scroll. The next section detects where you are and shows you the live competition for your service in your suburb.
          </p>
        </div>
      </section>

      {/* THE WIDGET — placed directly above the footer */}
      <LocalVisibilityCheck service="security companies" />

      <CookieBanner />
    </>
  )
}
