import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import Bento from '@/components/ui/Bento'
import PricingCards from '@/components/ui/PricingCards'
import FAQAccordion from '@/components/ui/FAQAccordion'
import ContactForm from '@/components/ui/ContactForm'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import JsonLd from '@/components/JsonLd'
import { serviceSchema } from '@/lib/schema'

export const metadata = {
  title: 'Product Promotion · Publish With Us',
  description:
    'Promote your security product with reviews, comparisons, demo spotlights and buyer-guide inclusions on SecurityBlogs. Reach in-market buyers ready to purchase.',
  alternates: { canonical: '/publish-with-us/product-promotion/' },
  openGraph: { url: '/publish-with-us/product-promotion/' },
}

const howItWorks = [
  { icon: '📩', title: 'Send your product', desc: 'Share specs, key features and what makes your product stand out.' },
  { icon: '🧪', title: 'We test & write', desc: 'Our reviewers evaluate against real-world security use cases.' },
  { icon: '🚀', title: 'Publish & promote', desc: 'Your feature goes live with social, newsletter and on-site promotion.' },
]

const formats = [
  { icon: '⭐', title: 'Product Review', desc: 'An in-depth, honest review with verdict, pros and cons.' },
  { icon: '⚖️', title: 'Comparison Feature', desc: 'Your product positioned against alternatives buyers consider.' },
  { icon: '🎬', title: 'Demo Spotlight', desc: 'A walkthrough article or embedded demo of your product in action.' },
  { icon: '📘', title: "Buyer's Guide Inclusion", desc: 'Featured placement inside our high-traffic buyer guides.' },
  { icon: '📺', title: 'Video Embed', desc: 'Your product video embedded in a dedicated editorial piece.' },
  { icon: '📬', title: 'Newsletter Feature', desc: 'A spotlight sent directly to 24K+ security subscribers.' },
]

const plans = [
  {
    name: 'Spotlight',
    price: '$249',
    period: ' AUD',
    features: ['1 product review', '1 dofollow link', 'Social share', 'Permanent placement'],
    cta: 'Choose Spotlight',
    ctaHref: '/contact/',
  },
  {
    name: 'Featured Review',
    price: '$499',
    period: ' AUD',
    featured: true,
    badge: '⭐ Most Popular',
    features: ['In-depth review + comparison', 'Homepage feature 7 days', '2 dofollow links', 'Newsletter feature', 'Video embed'],
    cta: 'Choose Featured',
    ctaHref: '/contact/',
  },
  {
    name: 'Launch Campaign',
    price: '$1,450',
    period: ' AUD',
    features: ['Review + comparison + demo', "Buyer's guide inclusion", '3 dofollow links', 'Dedicated newsletter', '90-day promotion'],
    cta: 'Choose Campaign',
    ctaHref: '/contact/',
  },
]

const faqs = [
  { q: 'Are your reviews honest?', a: 'Yes. We write balanced, useful reviews that build trust with our audience. Sponsored reviews are clearly disclosed while still earning genuine reader attention.' },
  { q: 'Do I need to send a physical product?', a: 'Not always. Hardware reviews benefit from a unit or trial access, but software and service products can be reviewed via demo access or a guided walkthrough.' },
  { q: 'Can I choose the format?', a: 'Yes — pick any format from reviews to comparisons, demo spotlights, buyer-guide inclusions, video embeds or newsletter features. We can also bundle several.' },
  { q: 'How long until it goes live?', a: 'Most product features publish within 5–7 business days of receiving your product details and assets.' },
]

export default function ProductPromotionPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: 'Product Promotion',
        description: 'Promote your security product with reviews, comparisons, demo spotlights and buyer-guide inclusions on SecurityBlogs. Reach in-market buyers ready to purchase.',
        path: '/publish-with-us/product-promotion/',
        serviceType: 'Sponsored Content',
      })} />
      <HeroBg grid blobs>
        <Reveal>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Publish With Us', href: '/publish-with-us/' }, { label: 'Product Promotion' }]} />
          <span className="badge badge-blue" style={{ marginBottom: 20 }}>
            <span className="dot dot-pulse" /> PRODUCT PROMOTION
          </span>
          <h1 className="h1" style={{ maxWidth: 820, marginBottom: 18 }}>
            Product{' '}
            <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Promotion</span>.
          </h1>
          <p className="lead" style={{ maxWidth: 640 }}>
            Put your security product in front of buyers at the exact moment they&apos;re comparing options.
            Reviews, comparisons, demos and buyer-guide placements that drive real purchase intent.
          </p>
        </Reveal>
      </HeroBg>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="How it works" title="From product to published review." sub="A simple, transparent process built to earn genuine reader trust." />
          <div className="grid-3" style={{ gap: 18 }}>
            {howItWorks.map((b, i) => (
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
        <div className="container">
          <SectionHead eyebrow="Formats" title="Six ways to promote your product." />
          <Bento cells={formats} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Pricing" title="Choose your promotion package." sub="One-time pricing in AUD. Mix formats or talk to us about a custom launch." />
          <PricingCards plans={plans} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHead eyebrow="FAQ" title="Product promotion questions." />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <SectionHead eyebrow="Get in touch" title="Tell us about your product." />
          <Reveal>
            <ContactForm
              fields={[
                { name: 'name', label: 'Name', required: true },
                { name: 'email', label: 'Email', type: 'email', required: true },
                { name: 'company', label: 'Company / Brand' },
                { name: 'product', label: 'Product name' },
                { name: 'format', label: 'Preferred format', type: 'select', options: ['Product Review', 'Comparison Feature', 'Demo Spotlight', "Buyer's Guide Inclusion", 'Video Embed', 'Newsletter Feature', 'Not sure yet'], full: true },
                { name: 'message', label: 'Tell us about your product', type: 'textarea', required: true, full: true },
              ]}
              submitLabel="Request a promotion →"
              successMsg="✓ Received! Our team will reach out within 1 business day to discuss your product promotion."
            />
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Ready to get your product in front of buyers?"
        subtitle="Choose a package or send us your product details and we'll recommend the best format."
        ctaLabel="Promote my product →"
        ctaHref="/contact/"
      />
    </>
  )
}
