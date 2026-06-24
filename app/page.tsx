import MagneticButton from '@/components/ui/MagneticButton'
import MarqueeStrip from '@/components/ui/MarqueeStrip'
import SectionHead from '@/components/ui/SectionHead'
import StatsStrip from '@/components/ui/StatsStrip'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import LocalVisibilityCheck from '@/components/immersive/LocalVisibilityCheck'
import HorizontalScrollServices from '@/components/effects/HorizontalScrollServices'
import AIChatDemo from '@/components/ui/AIChatDemo'
import { stats } from '@/lib/site'

export const metadata = {
  title: 'AI Visibility & SEO for Security Companies | SecurityBlogs',
  description: 'SecurityBlogs helps Australian security companies get named by ChatGPT, Gemini and Google AI. Expert SEO, AIO, AEO and GEO services built exclusively for the security industry.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'AI Visibility & SEO for Security Companies | SecurityBlogs',
    description: 'Be the answer AI gives. We help security companies rank on Google and get cited by ChatGPT, Gemini and Perplexity.',
    url: '/',
    siteName: 'SecurityBlogs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'SecurityBlogs' }],
  },
}

export default function HomePage() {
  return (
    <>
      <section style={{
        background: '#f6f8fb',
        paddingTop: 'calc(var(--nav-h) + 64px)',
        paddingBottom: 80,
        overflow: 'hidden',
      }}>
        <div className="container" style={{ maxWidth: 1200 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'center',
          }}
          className="hero-grid"
          >
            {/* Left: text + CTAs */}
            <Reveal>
              <div>
                <div style={{ marginBottom: 20 }}>
                  <span className="badge badge-blue">
                    <span className="dot dot-pulse" /> LIVE · AI VISIBILITY ENGINE
                  </span>
                </div>

                <h1 style={{
                  fontSize: 'clamp(36px, 5vw, 68px)',
                  fontWeight: 900,
                  lineHeight: 1.04,
                  letterSpacing: '-0.035em',
                  color: '#0f172a',
                  marginBottom: 22,
                }}>
                  Be the{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontStyle: 'italic',
                  }}>answer</span>{' '}
                  <span style={{ color: '#e23744' }}>AI</span> gives.
                </h1>

                <p style={{
                  fontSize: 'clamp(16px, 1.6vw, 20px)',
                  color: '#475569',
                  maxWidth: 520,
                  marginBottom: 36,
                  lineHeight: 1.65,
                }}>
                  When buyers ask ChatGPT, Gemini or Google AI for the best security provider —
                  your brand should be named. We make that happen.
                </p>

                <div className="flex flex-wrap gap-3" style={{ marginBottom: 32 }}>
                  <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Get your free audit →</MagneticButton>
                  <MagneticButton href="/free-tools/" className="btn btn-outline btn-lg">Try the live score</MagneticButton>
                </div>

                <p style={{ fontSize: 13, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                  Trusted across AU · US · UK · UAE · SG
                </p>
              </div>
            </Reveal>

            {/* Right: animated ChatGPT demo */}
            <Reveal delay={0.12}>
              <AIChatDemo />
            </Reveal>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>

      <MarqueeStrip />

      <HorizontalScrollServices />

      <section className="section" id="stats" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Why security brands choose us" title="Built for the security industry, end to end." />
          <StatsStrip items={stats} />
        </div>
      </section>

      <CTABand ctaHref="/contact/" />

      <LocalVisibilityCheck service="security companies" />
    </>
  )
}
