import Link from 'next/link'
import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import AIVisibilityScore from '@/components/ui/AIVisibilityScore'
import MarqueeStrip from '@/components/ui/MarqueeStrip'
import SectionHead from '@/components/ui/SectionHead'
import StatsStrip from '@/components/ui/StatsStrip'
import CTABand from '@/components/ui/CTABand'
import Reveal, { Stagger, Item } from '@/components/ui/Reveal'
import { services, stats } from '@/lib/site'

export default function HomePage() {
  return (
    <>
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
            <AIVisibilityScore />
          </Reveal>
        </div>
      </HeroBg>

      <MarqueeStrip />

      <section className="section" id="services">
        <div className="container">
          <SectionHead eyebrow="What we do" title="One growth engine. Every channel that matters." sub="From classic search to AI answer engines, we own every surface where security buyers discover, compare and choose vendors." />
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {services.map((s) => (
              <Item key={s.slug}>
                <Link href={`/services/${s.slug}/`} className="card" style={{ display: 'block', height: '100%' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, display: 'grid', placeItems: 'center', fontSize: 26, background: `${s.color}18`, marginBottom: 16 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 20, marginBottom: 8 }}>{s.title}</h3>
                  <p className="text-soft" style={{ fontSize: 14.5, marginBottom: 14 }}>{s.desc}</p>
                  <span style={{ color: s.color, fontWeight: 600, fontSize: 14 }}>Learn more →</span>
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" id="stats" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="The results" title="Numbers our clients brag about." />
          <StatsStrip items={stats} />
        </div>
      </section>

      <CTABand />
    </>
  )
}
