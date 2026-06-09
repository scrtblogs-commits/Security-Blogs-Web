import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import MarqueeStrip from '@/components/ui/MarqueeStrip'
import SectionHead from '@/components/ui/SectionHead'
import StatsStrip from '@/components/ui/StatsStrip'
import CTABand from '@/components/ui/CTABand'
import FAQAccordion from '@/components/ui/FAQAccordion'
import Reveal from '@/components/ui/Reveal'
import LocalVisibilityCheck from '@/components/immersive/LocalVisibilityCheck'
import AIVisibilityScore from '@/components/ui/AIVisibilityScore'
import { stats } from '@/lib/site'
import { siteConfig } from '@/lib/siteConfig'
import HeroAIIcons from './HeroAIIcons'
import ScrollStackSection from './ScrollStackSection'
import TestimonialsSection from './TestimonialsSection'
import AIScoreWithVideo from './AIScoreWithVideo'

export default function HomePage() {
  return (
    <>
      {/* ─────────────────────────────────────────
          1. HERO
          Left  → headline + buttons
          Right → floating AI platform icons
      ───────────────────────────────────────── */}
      <HeroBg>
        <div className="grid-2" style={{ alignItems: 'center', gap: 56 }}>
          <Reveal>
            <span className="badge badge-blue" style={{ marginBottom: 22 }}>
              <span className="dot dot-pulse" /> LIVE · AI VISIBILITY ENGINE
            </span>
            <h1 className="h1" style={{ marginBottom: 20 }}>
              Be the{' '}
              <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>answer</span>{' '}
              <span style={{ color: 'var(--red)' }}>AI</span> gives.
            </h1>
            <p className="lead" style={{ maxWidth: 520, marginBottom: 28 }}>
              When buyers ask ChatGPT, Gemini or Google AI for the best security
              provider — your brand should be named. We make that happen.
            </p>
            <div className="flex flex-wrap gap-3" style={{ marginBottom: 24 }}>
              <MagneticButton href="/contact/" className="btn btn-primary btn-lg">
                Get your free audit →
              </MagneticButton>
              <MagneticButton href="/free-tools/" className="btn btn-outline btn-lg">
                Try the live score
              </MagneticButton>
            </div>
            <p className="text-dim" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              Trusted across AU · US · UK · UAE · SG
            </p>
          </Reveal>

          {/* Floating AI brand icons with micro-oscillation */}
          <Reveal delay={0.15}>
            <HeroAIIcons />
          </Reveal>
        </div>
      </HeroBg>

      {/* ─────────────────────────────────────────
          2. MARQUEE — AI platforms strip
      ───────────────────────────────────────── */}
      <MarqueeStrip />

      {/* ─────────────────────────────────────────
          3. AI VISIBILITY SCORE + PROMO VIDEO
          Card and video are two separate elements.
          Video slides out from behind the card.
      ───────────────────────────────────────── */}
      <section className="section" id="ai-score">
        <div className="container">
          <SectionHead
            eyebrow="Live score"
            title="See how visible you are to AI."
            sub="Our engine checks 10+ AI platforms and scores your brand's citation rate in real time."
          />
          <AIScoreWithVideo />
        </div>
      </section>

      {/* ─────────────────────────────────────────
          4. SERVICES — scroll-sticky card stack
          Cards slide up one by one as you scroll
      ───────────────────────────────────────── */}
      <section className="section" id="services" style={{ paddingBottom: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="What we do"
            title="One growth engine. Every channel that matters."
            sub="From classic search to AI answer engines, we own every surface where security buyers discover, compare and choose vendors."
          />
        </div>
        {/* ScrollStackSection is full-width intentionally */}
        <div className="container">
          <ScrollStackSection />
        </div>
      </section>

      {/* ─────────────────────────────────────────
          5. STATS
      ───────────────────────────────────────── */}
      <section className="section" id="stats" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="The results" title="Numbers our clients brag about." />
          <StatsStrip items={stats} />
        </div>
      </section>

      {/* ─────────────────────────────────────────
          6. TESTIMONIALS
          "Here's what our users say"
          Scroll-triggered entrance + hover lift
      ───────────────────────────────────────── */}
      <TestimonialsSection items={siteConfig.testimonials} />

      {/* ─────────────────────────────────────────
          7. CTA BAND — animated gradient cycling
      ───────────────────────────────────────── */}
      <CTABand ctaHref="/contact/" />

      {/* ─────────────────────────────────────────
          8. MAP — UNCHANGED
          Who shows up when locals search?
      ───────────────────────────────────────── */}
      <LocalVisibilityCheck service="security companies" />

      {/* ─────────────────────────────────────────
          9. FAQ
      ───────────────────────────────────────── */}
      <section className="section" id="faq">
        <div className="container">
          <SectionHead
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            sub="Everything you need to know about AI visibility for security brands."
          />
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <FAQAccordion items={siteConfig.faqs} />
          </div>
        </div>
      </section>
    </>
  )
}
