import Link from 'next/link'
import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import StatsStrip from '@/components/ui/StatsStrip'
import FAQAccordion from '@/components/ui/FAQAccordion'
import CTABand from '@/components/ui/CTABand'
import MagneticButton from '@/components/ui/MagneticButton'
import Reveal, { Stagger, Item } from '@/components/ui/Reveal'
import { publishWithUs } from '@/lib/site'
import TiltCard from './TiltCard'

export const metadata = {
  title: 'Publish With Us · SecurityGrowth',
  description:
    'Reach security-industry buyers, integrators and decision-makers. Guest posts, sponsored content, product promotion, press releases, backlinks and advertising on SecurityGrowth.',
}

const icons: Record<string, string> = {
  'Guest Posting': '✍️',
  'Sponsored Posts': '📣',
  'Product Promotion': '📦',
  'Press Release': '📰',
  'Backlink Packages': '🔗',
  'Pricing Guidelines': '💲',
  Advertise: '🎯',
}

const descs: Record<string, string> = {
  'Guest Posting': 'Publish original, byline-credited articles in front of an engaged security audience.',
  'Sponsored Posts': 'Permanent placements with dofollow links and full editorial promotion.',
  'Product Promotion': 'Reviews, comparisons and demo spotlights for security hardware & software.',
  'Press Release': 'Distribute company news to readers, integrators and industry buyers.',
  'Backlink Packages': 'Niche-relevant, high-authority links from a trusted security domain.',
  'Pricing Guidelines': 'Transparent rates and editorial standards across every placement type.',
  Advertise: 'Banners, newsletter sponsorships and category takeovers in our media kit.',
}

const benefits = [
  { icon: '🛡️', title: '100% security niche', desc: 'No generic traffic — every reader is in the physical or cyber security space.' },
  { icon: '📈', title: 'High domain authority', desc: 'Links carry real SEO weight from an established, topically-relevant domain.' },
  { icon: '⚡', title: 'Fast turnaround', desc: 'Most placements go live within 2–3 business days of editorial approval.' },
  { icon: '🌍', title: 'Global buyer reach', desc: 'Read across Australia, the US, UK, UAE and Singapore security markets.' },
]

const faqs = [
  { q: 'What kind of content do you accept?', a: 'Original, well-researched articles relevant to physical security, cyber security, surveillance, access control and the wider industry. No spun, AI-dumped or off-topic content.' },
  { q: 'How long until my content is published?', a: 'After editorial approval, most placements go live within 2–3 business days. Sponsored and press-release options can be prioritised.' },
  { q: 'Do you offer dofollow links?', a: 'Yes. Most paid placements include one or more dofollow links to relevant, non-spammy destinations. Limits vary by package.' },
  { q: 'Who is your audience?', a: 'Security integrators, installers, facility and IT managers, procurement teams and brand decision-makers across multiple regions.' },
  { q: 'Can I see pricing before committing?', a: 'Absolutely. Our Pricing Guidelines page lists transparent rates for every placement type, and you can always request a custom quote.' },
]

export default function PublishHubPage() {
  return (
    <>
      <HeroBg grid blobs>
        <div className="grid-2" style={{ alignItems: 'center', gap: 56 }}>
          <Reveal>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Publish With Us' }]} />
            <span className="badge badge-blue" style={{ marginBottom: 20 }}>
              <span className="dot dot-pulse" /> PUBLISH WITH US
            </span>
            <h1 className="h1" style={{ marginBottom: 18 }}>
              Publish With{' '}
              <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Us</span>.
            </h1>
            <p className="lead" style={{ maxWidth: 520, marginBottom: 28 }}>
              Put your brand, products and announcements in front of the people who actually buy
              security solutions. Guest posts, sponsored content, backlinks and advertising — all on a
              trusted, niche-relevant domain.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="/publish-with-us/guest-posting/">Submit a guest post →</MagneticButton>
              <Link href="/publish-with-us/pricing-guidelines/" className="btn btn-outline">View pricing</Link>
            </div>
          </Reveal>

          <TiltCard>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Now accepting submissions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { title: 'Guest article — Access Control', tag: 'Live in 3 days' },
                { title: 'Sponsored review — CCTV brand', tag: '⭐ Featured' },
                { title: 'Press release — funding round', tag: 'Distributed' },
              ].map((p, i) => (
                <div key={i} className="card" style={{ padding: 16 }}>
                  <span className="chip" style={{ marginBottom: 8 }}>{p.tag}</span>
                  <div style={{ fontWeight: 600, fontFamily: 'var(--font-display)' }}>{p.title}</div>
                </div>
              ))}
            </div>
          </TiltCard>
        </div>
      </HeroBg>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Ways to publish" title="Choose how you want to reach our audience." sub="Seven flexible options — from editorial guest posts to full media-kit advertising." />
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="sg-options">
            {publishWithUs.map((o) => (
              <Item key={o.href}>
                <Link href={o.href} className="card" style={{ display: 'block', height: '100%', textDecoration: 'none' }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{icons[o.title] || '•'}</div>
                  <h3 style={{ fontSize: 18, marginBottom: 6 }}>{o.title}</h3>
                  <p className="text-soft" style={{ fontSize: 14, marginBottom: 14 }}>{descs[o.title]}</p>
                  <span className="accent" style={{ fontSize: 14, fontWeight: 600 }}>Learn more →</span>
                </Link>
              </Item>
            ))}
          </Stagger>
          <style>{`@media (max-width: 860px){ .sg-options { grid-template-columns: 1fr 1fr !important; } }
            @media (max-width: 520px){ .sg-options { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Why SecurityGrowth" title="A trusted home for security-industry content." />
          <div style={{ marginBottom: 40 }}>
            <StatsStrip
              items={[
                { value: 180, suffix: 'K+', label: 'Monthly readers' },
                { value: 24, suffix: 'K+', label: 'Newsletter subscribers' },
                { value: 68, label: 'Average domain authority' },
                { value: 12, suffix: '+', label: 'Countries reached' },
              ]}
            />
          </div>
          <div className="grid-4" style={{ gap: 18 }}>
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="card" style={{ height: '100%' }}>
                  <div style={{ fontSize: 26, marginBottom: 12 }}>{b.icon}</div>
                  <h4 style={{ fontSize: 16, marginBottom: 6 }}>{b.title}</h4>
                  <p className="text-soft" style={{ fontSize: 13.5 }}>{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHead eyebrow="FAQ" title="Common questions." />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTABand
        title="Ready to publish with SecurityGrowth?"
        subtitle="Pick a placement type, or talk to our editorial team about a custom campaign across multiple formats."
        ctaLabel="Get started →"
        ctaHref="/contact/"
      />
    </>
  )
}
