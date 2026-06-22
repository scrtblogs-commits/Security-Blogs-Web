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
        background: 'linear-gradient(180deg, #eef2ff 0%, #f8f9fc 55%, #ffffff 100%)',
        paddingTop: 'calc(var(--nav-h) + 64px)',
        paddingBottom: 80,
        overflow: 'hidden',
      }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <span className="badge badge-blue">
                <span className="dot dot-pulse" /> LIVE · AI VISIBILITY ENGINE
              </span>
            </div>

            <h1 style={{
              textAlign: 'center',
              fontSize: 'clamp(40px, 6.5vw, 80px)',
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
              textAlign: 'center',
              fontSize: 'clamp(17px, 2vw, 21px)',
              color: '#475569',
              maxWidth: 600,
              margin: '0 auto 36px',
              lineHeight: 1.65,
            }}>
              When buyers ask ChatGPT, Gemini or Google AI for the best security provider —
              your brand should be named. We make that happen.
            </p>

            <div className="flex flex-wrap gap-3" style={{ justifyContent: 'center', marginBottom: 56 }}>
              <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Get your free audit →</MagneticButton>
              <MagneticButton href="/free-tools/" className="btn btn-outline btn-lg">Try the live score</MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <HeroDashboard />
          </Reveal>

          <p style={{ textAlign: 'center', marginTop: 28, fontSize: 13, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
            Trusted across AU · US · UK · UAE · SG
          </p>
        </div>
      </section>

      <MarqueeStrip />

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
