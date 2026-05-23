import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import AIVisibilityScore from '@/components/ui/AIVisibilityScore'
import MarqueeStrip from '@/components/ui/MarqueeStrip'
import SectionHead from '@/components/ui/SectionHead'
import StatsStrip from '@/components/ui/StatsStrip'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import ServicesCardStack from './ServicesCardStack'
import { stats } from '@/lib/site'
import { SITE } from '@/content/site'

export default function HomePage() {
  return (
    <>
      <HeroBg>
        <div className="grid-2" style={{ alignItems: 'center', gap: 56 }}>
          <Reveal>
            <span className="badge badge-blue" style={{ marginBottom: 22 }}>
              <span className="dot dot-pulse" /> {SITE.home.badge}
            </span>
            <h1 className="h1" style={{ marginBottom: 20 }}>
              Be the <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>answer</span>{' '}
              <span style={{ color: 'var(--red)' }}>AI</span> gives.
            </h1>
            <p className="lead" style={{ maxWidth: 520, marginBottom: 28 }}>{SITE.home.lead}</p>
            <div className="flex flex-wrap gap-3" style={{ marginBottom: 24 }}>
              <MagneticButton href={SITE.home.ctaPrimary.href} className="btn btn-primary btn-lg">{SITE.home.ctaPrimary.label}</MagneticButton>
              <MagneticButton href={SITE.home.ctaSecondary.href} className="btn btn-outline btn-lg">{SITE.home.ctaSecondary.label}</MagneticButton>
            </div>
            <p className="text-dim" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{SITE.home.trust}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <AIVisibilityScore />
          </Reveal>
        </div>
      </HeroBg>

      <MarqueeStrip />

      <section className="section" id="services">
        <div className="container">
          <SectionHead eyebrow={SITE.home.servicesEyebrow} title={SITE.home.servicesTitle} sub={SITE.home.servicesSub} />
          <ServicesCardStack />
        </div>
      </section>

      <section className="section" id="stats" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow={SITE.home.statsEyebrow} title={SITE.home.statsTitle} />
          <StatsStrip items={stats} />
        </div>
      </section>

      <CTABand />
    </>
  )
}
