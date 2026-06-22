import MagneticButton from '@/components/ui/MagneticButton'
import MarqueeStrip from '@/components/ui/MarqueeStrip'
import SectionHead from '@/components/ui/SectionHead'
import StatsStrip from '@/components/ui/StatsStrip'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import LocalVisibilityCheck from '@/components/immersive/LocalVisibilityCheck'
import HorizontalScrollServices from '@/components/effects/HorizontalScrollServices'
import HeroDashboard from '@/components/ui/HeroDashboard'
import { stats } from '@/lib/site'

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(180deg, #f0f4ff 0%, #f8f9fc 60%, #ffffff 100%)',
        paddingTop: 'calc(var(--nav-h) + 56px)',
        paddingBottom: 72,
        overflow: 'hidden',
      }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <Reveal>
            {/* Badge */}
            <div style={{ textAlign: 'center', marginBottom: 18 }}>
              <span className="badge badge-blue">
                <span className="dot dot-pulse" /> LIVE · AI VISIBILITY ENGINE
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              textAlign: 'center',
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#0f172a',
              marginBottom: 20,
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

            {/* Sub text */}
            <p style={{
              textAlign: 'center',
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: '#475569',
              maxWidth: 580,
              margin: '0 auto 32px',
              lineHeight: 1.6,
            }}>
              When buyers ask ChatGPT, Gemini or Google AI for the best security provider —
              your brand should be named. We make that happen.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3" style={{ justifyContent: 'center', marginBottom: 48 }}>
              <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Get your free audit →</MagneticButton>
              <MagneticButton href="/free-tools/" className="btn btn-outline btn-lg">Try the live score</MagneticButton>
            </div>
          </Reveal>

          {/* Dashboard */}
          <Reveal delay={0.15}>
            <HeroDashboard />
          </Reveal>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
            Trusted across AU · US · UK · UAE · SG
          </p>
        </div>
      </section>

      <MarqueeStrip />

      {/* ── PINNED HORIZONTAL SCROLL ─────────────────
          Page hangs here; 3 service panels slide in
          from the right as the user scrolls.
          Falls back to normal vertical stack on touch
          and under prefers-reduced-motion.           */}
      <HorizontalScrollServices />

      {/* ── STATS ────────────────────────────────────── */}
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
