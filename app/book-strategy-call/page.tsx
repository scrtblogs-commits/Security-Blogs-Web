import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import SpiralAnimation from '@/components/ui/SpiralAnimation'
import GlassCard from '@/components/ui/GlassCard'
import AIVisibilityChallenge from '@/components/ui/AIVisibilityChallenge'
import FAQAccordion from '@/components/ui/FAQAccordion'
import CTABand from '@/components/ui/CTABand'
import Reveal, { Stagger, Item } from '@/components/ui/Reveal'

export const metadata = {
  title: 'Book a Strategy Call',
  description: 'Book your free 30-minute AI visibility strategy call. Get an audit, competitor gaps and a 90-day growth roadmap — no obligation.',
  alternates: { canonical: '/book-strategy-call/' },
  openGraph: { url: '/book-strategy-call/' },
}

const heroBullets = [
  'AI Visibility audit for your brand',
  'Top 3 competitor gaps identified',
  '90-day growth roadmap',
  'No obligation, no hard sell',
]

const slots = ['Tue 10:00 AM', 'Tue 2:30 PM', 'Wed 11:00 AM', 'Thu 9:30 AM', 'Fri 1:00 PM']

const expect = [
  { icon: '🔍', title: 'Live audit walkthrough', desc: 'We screen-share your current visibility across Google and AI platforms.' },
  { icon: '🎯', title: 'Competitor gap analysis', desc: 'See where rivals get cited and you don&apos;t — and how to flip it.' },
  { icon: '🗺️', title: '90-day roadmap', desc: 'A prioritised plan you can run with, whether with us or not.' },
  { icon: '💬', title: 'Your questions, answered', desc: 'Bring anything — strategy, channels, timelines, budget.' },
  { icon: '📄', title: 'Written strategy PDF', desc: 'A documented summary emailed within 24 hours of the call.' },
]

const benefits = [
  { icon: '🎁', label: 'Free audit' },
  { icon: '🔓', label: 'No lock-in contracts' },
  { icon: '📄', label: 'Strategy PDF emailed' },
  { icon: '🧠', label: 'Expert security marketer' },
]

const faqs = [
  { q: 'Is this really free?', a: 'Yes — 100% free, no credit card, no obligation.' },
  { q: 'How long is the call?', a: '30 minutes via Google Meet or Zoom.' },
  { q: 'Do you work with all security companies?', a: 'We work with security installers, integrators, manufacturers, consultants and monitoring companies across AU, US, UK, UAE and SG.' },
  { q: 'What happens after the call?', a: "You receive a written strategy PDF within 24 hours. Then it's entirely your choice." },
]

export default function BookStrategyCallPage() {
  return (
    <>
      <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <SpiralAnimation tint="#1e5fe0" />
        <div className="container z1">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Book Strategy Call' }]} />
          <div className="grid-2" style={{ alignItems: 'center', gap: 48 }}>
            <Reveal>
              <span className="badge badge-blue" style={{ marginBottom: 22 }}>
                <span className="dot dot-pulse" /> FREE · 30 MINUTES
              </span>
              <h1 className="h1" style={{ marginBottom: 20 }}>
                Book Your Free 30-Min AI Visibility{' '}
                <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Strategy Call</span>
              </h1>
              <p className="lead" style={{ maxWidth: 520, marginBottom: 24 }}>
                A focused, no-pressure session that maps exactly how to make your security brand the answer AI gives.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {heroBullets.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <span className="accent" style={{ fontSize: 18 }}>✓</span>
                    <span style={{ fontSize: 15.5 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15}>
              <GlassCard tilt glow>
                <h3 style={{ fontSize: 20, marginBottom: 6 }}>Schedule your call</h3>
                <p className="text-soft" style={{ fontSize: 14, marginBottom: 18 }}>Pick a time that suits you.</p>
                <div className="flex flex-wrap gap-2" style={{ marginBottom: 18 }}>
                  {slots.map((s) => <button key={s} className="pill">{s}</button>)}
                </div>
                <p className="text-dim center" style={{ fontSize: 12.5, fontFamily: 'var(--font-mono)' }}>Live scheduling embeds here.</p>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="The agenda" title="What to expect on the call." />
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {expect.map((e) => (
              <Item key={e.title}>
                <div className="card" style={{ height: '100%' }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{e.icon}</div>
                  <h3 style={{ fontSize: 18, marginBottom: 8 }}>{e.title}</h3>
                  <p className="text-soft" style={{ fontSize: 14 }} dangerouslySetInnerHTML={{ __html: e.desc }} />
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHead eyebrow="Preview" title="Get a head start before we talk." sub="Run the quick AI visibility challenge so we can dive straight into strategy on the call." />
          <AIVisibilityChallenge variant="compact" />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18 }}>
            {benefits.map((b) => (
              <Item key={b.label}>
                <div className="glass center" style={{ padding: 26 }}>
                  <div style={{ fontSize: 30, marginBottom: 10 }}>{b.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{b.label}</div>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHead eyebrow="Good to know" title="Frequently asked questions." />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTABand title="Prefer to message first?" subtitle="No problem — drop us a line and we'll point you in the right direction." ctaLabel="Contact us →" ctaHref="/contact/" />
    </>
  )
}
