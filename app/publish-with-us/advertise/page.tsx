import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import StatsStrip from '@/components/ui/StatsStrip'
import PricingCards from '@/components/ui/PricingCards'
import FAQAccordion from '@/components/ui/FAQAccordion'
import ContactForm from '@/components/ui/ContactForm'
import CTABand from '@/components/ui/CTABand'
import MagneticButton from '@/components/ui/MagneticButton'
import Reveal, { Stagger, Item } from '@/components/ui/Reveal'

export const metadata = {
  title: 'Advertise · Publish With Us · SecurityBlogs',
  description:
    'Advertise with SecurityBlogs. Reach 180K+ monthly security-industry readers via banners, newsletter sponsorships, category takeovers and sponsored content.',
}

const placements = [
  { icon: '🖼️', title: 'Homepage Banner', desc: 'Top-of-page banner across our highest-traffic page.', price: 'from $650/mo' },
  { icon: '📬', title: 'Newsletter Sponsor', desc: 'Dedicated slot in our newsletter to 24K+ subscribers.', price: 'from $249/send' },
  { icon: '📂', title: 'Category Takeover', desc: 'Own a full category with banner + sponsored label.', price: 'from $900/mo' },
  { icon: '📝', title: 'Sponsored Content', desc: 'Native editorial article with permanent placement.', price: 'from $299' },
  { icon: '🎙️', title: 'Podcast Mention', desc: 'A read-out mention in our security industry podcast.', price: 'from $350/ep' },
  { icon: '📇', title: 'Directory Feature', desc: 'Premium placement in our security vendor directory.', price: 'from $199/mo' },
]

const plans = [
  {
    name: 'Starter',
    price: '$499',
    period: ' AUD/mo',
    features: ['1 newsletter sponsorship', 'Directory feature', 'Basic monthly report'],
    cta: 'Choose Starter',
    ctaHref: '/contact/',
  },
  {
    name: 'Growth',
    price: '$1,200',
    period: ' AUD/mo',
    featured: true,
    badge: '⭐ Most Popular',
    features: ['Homepage banner', '2 newsletter sponsorships', '1 sponsored article', 'Directory feature', 'Detailed reporting'],
    cta: 'Choose Growth',
    ctaHref: '/contact/',
  },
  {
    name: 'Dominate',
    price: '$2,750',
    period: ' AUD/mo',
    features: ['Category takeover', 'Homepage banner', '4 newsletter sponsorships', '2 sponsored articles', 'Podcast mention', 'Dedicated account manager'],
    cta: 'Choose Dominate',
    ctaHref: '/contact/',
  },
]

const faqs = [
  { q: 'Who is your audience?', a: 'Security integrators, installers, IT and facility managers, procurement teams and brand decision-makers across Australia, the US, UK, UAE and Singapore.' },
  { q: 'Can I run a custom campaign?', a: 'Yes. We regularly build custom packages combining banners, newsletter slots, sponsored content and podcast mentions. Tell us your goals and budget.' },
  { q: 'Do you offer reporting?', a: 'Every package includes performance reporting. Higher tiers add detailed reporting and a dedicated account manager.' },
  { q: 'What ad formats do you accept?', a: 'Standard IAB banner sizes, newsletter creative, and native sponsored content. Our team can help produce assets if needed.' },
]

export default function AdvertisePage() {
  return (
    <>
      <HeroBg grid blobs>
        <Reveal>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Publish With Us', href: '/publish-with-us/' }, { label: 'Advertise' }]} />
          <span className="badge badge-blue" style={{ marginBottom: 20 }}>
            <span className="dot dot-pulse" /> MEDIA KIT
          </span>
          <h1 className="h1" style={{ maxWidth: 820, marginBottom: 18 }}>
            Advertise With{' '}
            <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>SecurityBlogs</span>.
          </h1>
          <p className="lead" style={{ maxWidth: 640, marginBottom: 24 }}>
            Reach a focused, in-market audience of security buyers and decision-makers. Banners,
            newsletter sponsorships, category takeovers and native content — all in one media kit.
          </p>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/contact/">Book a campaign →</MagneticButton>
          </div>
        </Reveal>
      </HeroBg>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Audience" title="Who you'll reach." sub="A high-intent audience that lives and breathes the security industry." />
          <StatsStrip
            items={[
              { value: 180, suffix: 'K+', label: 'Monthly readers' },
              { value: 24, suffix: 'K+', label: 'Newsletter subscribers' },
              { value: 68, label: 'Average domain authority' },
              { value: 12, suffix: '+', label: 'Countries reached' },
            ]}
          />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Placements" title="Where your brand can appear." />
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="sg-placements">
            {placements.map((p) => (
              <Item key={p.title}>
                <div className="card" style={{ height: '100%' }}>
                  <div style={{ fontSize: 26, marginBottom: 12 }}>{p.icon}</div>
                  <h4 style={{ fontSize: 16, marginBottom: 6 }}>{p.title}</h4>
                  <p className="text-soft" style={{ fontSize: 13.5, marginBottom: 12 }}>{p.desc}</p>
                  <span className="chip">{p.price}</span>
                </div>
              </Item>
            ))}
          </Stagger>
          <style>{`@media (max-width: 860px){ .sg-placements { grid-template-columns: 1fr 1fr !important; } }
            @media (max-width: 520px){ .sg-placements { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Packages" title="Monthly advertising packages." sub="Bundled pricing in AUD. Mix and match or request a fully custom plan." />
          <PricingCards plans={plans} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="glass glow-border center" style={{ maxWidth: 720, marginInline: 'auto', padding: 32 }}>
              <span className="badge badge-blue" style={{ marginBottom: 12 }}>MEDIA KIT</span>
              <h3 style={{ marginBottom: 8 }}>Want the full media kit?</h3>
              <p className="text-soft" style={{ fontSize: 14.5, marginBottom: 20 }}>
                Get our complete media kit with audience demographics, traffic data, ad specs and rate card.
              </p>
              <MagneticButton href="/contact/">Download media kit →</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <SectionHead eyebrow="Get in touch" title="Plan your advertising campaign." />
          <Reveal>
            <ContactForm
              fields={[
                { name: 'name', label: 'Name', required: true },
                { name: 'email', label: 'Email', type: 'email', required: true },
                { name: 'company', label: 'Company' },
                { name: 'placement', label: 'Placement of interest', type: 'select', options: ['Homepage Banner', 'Newsletter Sponsor', 'Category Takeover', 'Sponsored Content', 'Podcast Mention', 'Directory Feature', 'Custom package'], full: true },
                { name: 'budget', label: 'Monthly budget (AUD)', placeholder: 'e.g. $1,200' },
                { name: 'message', label: 'Tell us about your goals', type: 'textarea', required: true, full: true },
              ]}
              submitLabel="Request a campaign →"
              successMsg="✓ Received! Our advertising team will send a tailored proposal within 1 business day."
            />
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Ready to put your brand in front of security buyers?"
        subtitle="Book a campaign or request the full media kit and rate card today."
        ctaLabel="Start advertising →"
        ctaHref="/contact/"
      />
    </>
  )
}
