import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import PricingCards from '@/components/ui/PricingCards'
import Bento from '@/components/ui/Bento'
import FAQAccordion from '@/components/ui/FAQAccordion'
import ContactForm from '@/components/ui/ContactForm'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'

export const metadata = {
  title: 'Backlink Packages · Publish With Us',
  description:
    'High-authority, niche-relevant backlinks from a trusted security domain. Dofollow links, editorial placement and transparent pricing in AUD.',
  alternates: { canonical: '/publish-with-us/backlink-packages/' },
  openGraph: { url: '/publish-with-us/backlink-packages/' },
}

const plans = [
  {
    name: 'Starter',
    price: '$199',
    period: ' AUD',
    features: ['1 dofollow link', 'DA 60+ domain', 'Niche-relevant placement', 'Permanent link', 'Live in 5 days'],
    cta: 'Choose Starter',
    ctaHref: '/contact/',
  },
  {
    name: 'Growth',
    price: '$549',
    period: ' AUD',
    featured: true,
    badge: '⭐ Best Value',
    features: ['3 dofollow links', 'DA 65+ domains', 'Contextual editorial placement', 'Anchor-text control', 'Live in 5 days', 'Reporting included'],
    cta: 'Choose Growth',
    ctaHref: '/contact/',
  },
  {
    name: 'Authority',
    price: '$1,290',
    period: ' AUD',
    features: ['8 dofollow links', 'DA 68+ premium domains', 'Full editorial articles', 'Anchor + URL strategy', 'Priority placement', 'Detailed link report'],
    cta: 'Choose Authority',
    ctaHref: '/contact/',
  },
]

const whatYouGet = [
  { icon: '🔗', title: 'Dofollow links', desc: 'Real, editorially-placed dofollow links that pass authority.' },
  { icon: '🛡️', title: 'Niche relevance', desc: 'Links live on genuinely security-related pages and articles.' },
  { icon: '📊', title: 'High domain authority', desc: 'Placements on established domains with DA 60+.' },
  { icon: '✍️', title: 'Contextual placement', desc: 'Links surrounded by relevant, well-written editorial content.' },
  { icon: '♾️', title: 'Permanent links', desc: 'Once live, your links stay live — no rentals or expiry.' },
  { icon: '📈', title: 'Transparent reporting', desc: 'You receive a clear report of every live URL and anchor.' },
]

const faqs = [
  { q: 'Are these links safe and white-hat?', a: 'Yes. Every link is editorially placed within relevant, original content on a real, indexed page. We do not use PBNs, link farms or automated schemes.' },
  { q: 'Can I control anchor text?', a: 'On the Growth and Authority packages you can specify target URLs and preferred anchor text, subject to editorial guidelines for natural placement.' },
  { q: 'How long until links go live?', a: 'Most placements are live within 5 business days. Authority packages with full articles may take slightly longer.' },
  { q: 'Are the links permanent?', a: 'Yes — all links are permanent. There are no recurring fees and we do not remove links after placement.' },
]

export default function BacklinkPackagesPage() {
  return (
    <>
      <HeroBg grid blobs>
        <Reveal>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Publish With Us', href: '/publish-with-us/' }, { label: 'Backlink Packages' }]} />
          <span className="badge badge-blue" style={{ marginBottom: 20 }}>
            <span className="dot dot-pulse" /> BACKLINK PACKAGES
          </span>
          <h1 className="h1" style={{ maxWidth: 820, marginBottom: 18 }}>
            Backlink{' '}
            <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Packages</span>.
          </h1>
          <p className="lead" style={{ maxWidth: 640 }}>
            Build authority with white-hat, niche-relevant dofollow links from a trusted security domain.
            Editorial placement, permanent links and transparent reporting — no PBNs, ever.
          </p>
        </Reveal>
      </HeroBg>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Pricing" title="Choose your backlink package." sub="One-time pricing in AUD. All links are permanent, dofollow and editorially placed." />
          <PricingCards plans={plans} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="What you get" title="Every package includes." />
          <Bento cells={whatYouGet} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="glass glow-border" style={{ maxWidth: 760, marginInline: 'auto', padding: 32 }}>
              <span className="badge badge-blue" style={{ marginBottom: 12 }}>QUALITY & ETHICS</span>
              <h3 style={{ marginBottom: 8 }}>White-hat by design.</h3>
              <p className="text-soft" style={{ fontSize: 14.5 }}>
                We only place links within original, relevant editorial content on real, indexed pages.
                We never use private blog networks, link farms or automated link schemes, and we reject
                requests for links to spam, adult, gambling or unrelated content. Quality placement protects
                both your brand and ours.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHead eyebrow="FAQ" title="Backlink questions." />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <SectionHead eyebrow="Get a quote" title="Tell us about your link goals." />
          <Reveal>
            <ContactForm
              fields={[
                { name: 'name', label: 'Name', required: true },
                { name: 'email', label: 'Email', type: 'email', required: true },
                { name: 'website', label: 'Website to link to' },
                { name: 'package', label: 'Package of interest', type: 'select', options: ['Starter', 'Growth', 'Authority', 'Custom / not sure'], full: true },
                { name: 'message', label: 'Target pages & anchors', type: 'textarea', required: true, full: true, placeholder: 'Share the URLs you want to rank and any preferred anchor text.' },
              ]}
              submitLabel="Request a quote →"
              successMsg="✓ Received! We'll send a tailored backlink proposal within 1 business day."
            />
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Ready to build security-niche authority?"
        subtitle="Choose a package above or request a custom link-building proposal for your campaign."
        ctaLabel="Get backlinks →"
        ctaHref="/contact/"
      />
    </>
  )
}
