import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import SectionHead from '@/components/ui/SectionHead'
import CTABand from '@/components/ui/CTABand'
import Reveal, { Stagger, Item } from '@/components/ui/Reveal'
import Breadcrumb from '@/components/ui/Breadcrumb'
import GlassCard from '@/components/ui/GlassCard'
import AnimatedSkeleton from '@/components/ui/AnimatedSkeleton'
import PricingCards from '@/components/ui/PricingCards'
import ProcessSteps from '@/components/ui/ProcessSteps'

export const metadata = {
  title: "Australia's #1 AI-Verified Security Company Directory",
  description:
    'Find and compare verified Australian security companies ranked by AI visibility score, client reviews and industry authority.',
  alternates: { canonical: '/security-directory/' },
  openGraph: { url: '/security-directory/' },
}

const teasers = [
  { name: 'Sentinel Guard Systems', location: 'Sydney, NSW', category: 'Access Control', score: 92 },
  { name: 'Apex Surveillance Co.', location: 'Melbourne, VIC', category: 'CCTV & Monitoring', score: 88 },
  { name: 'Fortress Cyber Defence', location: 'Brisbane, QLD', category: 'Cyber Security', score: 85 },
]

const plans = [
  {
    name: 'Listed',
    price: 'Free',
    features: ['Basic profile', '1 category', 'Standard listing position'],
    cta: 'Get listed free →',
    ctaHref: '/contact/',
  },
  {
    name: 'AI-Verified',
    price: '$49',
    period: '/month',
    featured: true,
    badge: '⭐ Most Popular',
    features: ['AI score badge', 'Priority position', 'Monthly visibility report', '3 categories'],
    cta: 'Get AI-Verified →',
    ctaHref: '/contact/',
  },
  {
    name: 'Authority',
    price: '$149',
    period: '/month',
    features: [
      'Featured homepage placement',
      '5 categories',
      'Dofollow backlink',
      'Content feature',
      'Dedicated account manager',
    ],
    cta: 'Become an Authority →',
    ctaHref: '/contact/',
  },
]

const steps = [
  { title: 'Apply online', desc: 'Submit your business details in under two minutes — free to start.' },
  { title: 'Verification check', desc: 'We confirm licensing, reviews and legitimacy before you go live.' },
  { title: 'AI Score assigned', desc: 'Our engine scores your real-world AI visibility across every answer engine.' },
  { title: 'Go live in directory', desc: 'Your verified profile is published and ranked for buyers to discover.' },
]

export default function SecurityDirectoryPage() {
  return (
    <>
      <HeroBg grid blobs>
        <Reveal>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Directory' }]} />
          <span className="badge badge-blue" style={{ marginBottom: 22 }}>
            <span className="dot dot-pulse" /> 200+ VERIFIED COMPANIES
          </span>
          <h1 className="h1" style={{ marginBottom: 20, maxWidth: 900 }}>
            Australia's <span style={{ color: 'var(--blue)' }}>#1</span> AI-Verified Security Company{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--violet)' }}>Directory</span>
          </h1>
          <p className="lead" style={{ maxWidth: 660, marginBottom: 28 }}>
            Find and compare verified security companies ranked by AI visibility score, client reviews
            and industry authority.
          </p>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Get my business listed →</MagneticButton>
            <MagneticButton href="#membership" className="btn btn-outline btn-lg">View membership plans</MagneticButton>
          </div>
        </Reveal>
      </HeroBg>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Top-ranked"
            title="A glimpse of Australia's most AI-visible security firms."
            sub="The full directory of 200+ verified companies — names, contacts and scores — is available to members."
          />
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {teasers.map((t, i) => (
              <Item key={i}>
                <GlassCard glow style={{ height: '100%' }}>
                  <div className="flex justify-between items-center" style={{ marginBottom: 14 }}>
                    <span className="badge badge-blue">{t.category}</span>
                    <span className="chip">🤖 AI Verified</span>
                  </div>
                  <h3 style={{ fontSize: 20, marginBottom: 4, filter: 'blur(6px)', userSelect: 'none' }}>{t.name}</h3>
                  <p className="text-soft" style={{ fontSize: 14, marginBottom: 16, filter: 'blur(6px)', userSelect: 'none' }}>📍 {t.location}</p>
                  <div className="flex justify-between items-center" style={{ fontSize: 13, marginBottom: 8 }}>
                    <span className="text-dim">AI Visibility Score</span>
                    <span className="accent" style={{ fontWeight: 700 }}>{t.score}/100</span>
                  </div>
                  <div className="meter">
                    <span style={{ width: `${t.score}%`, background: 'linear-gradient(90deg, var(--blue), var(--violet))' }} />
                  </div>
                  <p className="text-dim center" style={{ fontSize: 12.5, marginTop: 16 }}>🔒 Unlock to view full profile</p>
                </GlassCard>
              </Item>
            ))}
          </Stagger>

          <div style={{ position: 'relative', marginTop: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, filter: 'blur(2px)' }} aria-hidden="true">
              {Array.from({ length: 6 }).map((_, i) => (
                <AnimatedSkeleton key={i} lines={3} height={200} />
              ))}
            </div>

            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
                padding: 20,
              }}
            >
              <Reveal>
                <div className="glass center" style={{ padding: 'clamp(28px, 5vw, 48px)', maxWidth: 540 }}>
                  <span className="badge" style={{ marginBottom: 18 }}>🔒 Members Only</span>
                  <h3 style={{ fontSize: 'clamp(22px, 3vw, 30px)', marginBottom: 12 }}>
                    Unlock 200+ Verified Security Companies
                  </h3>
                  <p className="text-soft" style={{ marginBottom: 26, fontSize: 15 }}>
                    See every verified firm's full profile, contact details and live AI visibility score —
                    or get your own business listed and ranked.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Get My Business Listed (Free) →</MagneticButton>
                    <MagneticButton href="#membership" className="btn btn-outline btn-lg">Unlock Full Directory →</MagneticButton>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="membership" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="Directory Membership"
            title="Pick the visibility tier that fits your firm."
            sub="Start free and upgrade as you climb the rankings. Cancel anytime."
          />
          <PricingCards plans={plans} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="How it works" title="From application to live listing in four steps." />
          <ProcessSteps steps={steps} />
        </div>
      </section>

      <CTABand
        title="Get your security business listed today — it's free to start."
        subtitle="Join 200+ verified Australian security companies discovered by buyers and AI alike."
        ctaLabel="List my business free →"
        ctaHref="/contact/"
      />
    </>
  )
}
