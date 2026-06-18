import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import AIVisibilityScore from '@/components/ui/AIVisibilityScore'
import MarqueeStrip from '@/components/ui/MarqueeStrip'
import SectionHead from '@/components/ui/SectionHead'
import StatsStrip from '@/components/ui/StatsStrip'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import ServicesCardStack from './ServicesCardStack'
import LocalVisibilityCheck from '@/components/immersive/LocalVisibilityCheck'
import HorizontalScrollServices from '@/components/effects/HorizontalScrollServices'
import { stats } from '@/lib/site'
import AIChatDemo from '@/components/ui/AIChatDemo'

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <HeroBg>
        <div className="grid-2" style={{ alignItems: 'center', gap: 56 }}>
          <Reveal>
            <span className="badge badge-blue" style={{ marginBottom: 22 }}>
              <span className="dot dot-pulse" /> LIVE · AI VISIBILITY ENGINE
            </span>
            <h1 className="h1" style={{ marginBottom: 20 }}>
              Be the <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>answer</span>{' '}
              <span style={{ color: 'var(--red)' }}>AI</span> gives.
            </h1>
            <p className="lead" style={{ maxWidth: 520, marginBottom: 28 }}>
              When buyers ask ChatGPT, Gemini or Google AI for the best security provider — your
              brand should be named. We make that happen.
            </p>
            <div className="flex flex-wrap gap-3" style={{ marginBottom: 24 }}>
              <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Get your free audit →</MagneticButton>
              <MagneticButton href="/free-tools/" className="btn btn-outline btn-lg">Try the live score</MagneticButton>
            </div>
            <p className="text-dim" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>Trusted across AU · US · UK · UAE · SG</p>
          </Reveal>
          <Reveal delay={0.15}>
            <AIChatDemo />
          </Reveal>
        </div>
      </HeroBg>

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
