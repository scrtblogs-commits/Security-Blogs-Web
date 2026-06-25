import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import SectionHead from '@/components/ui/SectionHead'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProcessSteps from '@/components/ui/ProcessSteps'
import JsonLd from '@/components/JsonLd'
import PricingCards from '@/components/ui/PricingCards'
import DirectoryClient from '@/components/ui/DirectoryClient'
import DirectoryHowItWorks from '@/components/ui/DirectoryHowItWorks'
import { serviceSchema } from '@/lib/schema'

export const metadata = {
  title: "Australia's #1 AI-Verified Security Company Directory",
  description:
    'Find and compare verified Australian security companies ranked by AI visibility score, client reviews and industry authority.',
  alternates: { canonical: '/security-directory/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/security-directory/' },
}

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
      <JsonLd data={serviceSchema({
        name: 'Security Directory Listing',
        description: "AI-verified directory listing service for Australian security companies. Get your business listed, verified, scored on AI visibility and discovered by buyers on SecurityBlogs's directory.",
        path: '/security-directory/',
        serviceType: 'Business Directory Listing',
      })} />

      <HeroBg grid>
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
            and industry authority. Subscribe free to unlock full contact details.
          </p>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Get my business listed →</MagneticButton>
            <MagneticButton href="#membership" className="btn btn-outline btn-lg">View membership plans</MagneticButton>
          </div>
        </Reveal>
      </HeroBg>

      {/* ── Interactive Directory ── */}
      <DirectoryClient />

      {/* ── Membership Plans ── */}
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

      {/* ── How it works — visitor journey ── */}
      <DirectoryHowItWorks />

      {/* ── How to get listed — for businesses ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Get your business listed" title="From application to live listing in four steps." />
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
