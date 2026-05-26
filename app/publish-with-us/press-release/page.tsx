import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import ProcessSteps from '@/components/ui/ProcessSteps'
import FAQAccordion from '@/components/ui/FAQAccordion'
import ContactForm from '@/components/ui/ContactForm'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import JsonLd from '@/components/JsonLd'
import { serviceSchema } from '@/lib/schema'

export const metadata = {
  title: 'Press Release Distribution · Publish With Us',
  description:
    'Distribute your security company press release to engaged industry readers, integrators and buyers. Editorial review within 2 business days.',
  alternates: { canonical: '/publish-with-us/press-release/' },
  openGraph: { url: '/publish-with-us/press-release/' },
}

const steps = [
  { title: 'Submit your release', desc: 'Send your headline, body and any media using the form below.' },
  { title: 'Editorial review', desc: 'Our team checks newsworthiness, formatting and links within 2 days.' },
  { title: 'Publish', desc: 'Your release goes live on the newswire with a permanent URL.' },
  { title: 'Promote', desc: 'We share it across social channels and our industry newsletter.' },
]

const faqs = [
  { q: 'What makes a release newsworthy?', a: 'Funding rounds, product launches, partnerships, acquisitions, leadership changes, awards and major milestones all work well. Purely promotional copy is better suited to a sponsored post.' },
  { q: 'How fast is distribution?', a: 'Our editorial team reviews every release within 2 business days and publishes approved releases shortly after.' },
  { q: 'Can I include links and images?', a: 'Yes — include a media or image URL and relevant dofollow links to your site, product page or newsroom.' },
  { q: 'Will my release be indexed by search engines?', a: 'Yes. Releases are published as permanent, SEO-optimised pages and shared across our channels for additional reach.' },
]

const categories = [
  'Funding & Investment',
  'Product Launch',
  'Partnership',
  'Acquisition / M&A',
  'Leadership & People',
  'Awards & Recognition',
  'Company Milestone',
  'Other',
]

export default function PressReleasePage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: 'Press Release Distribution',
        description: 'Publish a security-industry press release on SecurityBlogs with editorial review and permanent placement on a niche security publication.',
        path: '/publish-with-us/press-release/',
        serviceType: 'Press Release Distribution',
      })} />
      <HeroBg grid blobs>
        <Reveal>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Publish With Us', href: '/publish-with-us/' }, { label: 'Press Release' }]} />
          <span className="badge badge-blue" style={{ marginBottom: 20 }}>
            <span className="dot dot-pulse" /> PRESS RELEASE DISTRIBUTION
          </span>
          <h1 className="h1" style={{ maxWidth: 820, marginBottom: 18 }}>
            Press Release{' '}
            <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Distribution</span>.
          </h1>
          <p className="lead" style={{ maxWidth: 640 }}>
            Announce your security company&apos;s news where the industry is watching. Submit your release
            below — our editorial team reviews every submission within 2 business days.
          </p>
        </Reveal>
      </HeroBg>

      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHead eyebrow="Submission form" title="Submit your press release." sub="Complete the fields below. Required fields are marked with an asterisk." />
          <Reveal>
            <ContactForm
              fields={[
                { name: 'companyName', label: 'Company Name', required: true },
                { name: 'contactName', label: 'Contact Name', required: true },
                { name: 'email', label: 'Email', type: 'email', required: true },
                { name: 'headline', label: 'Headline', required: true, full: true },
                { name: 'releaseDate', label: 'Release Date', placeholder: 'e.g. 22 May 2026' },
                { name: 'category', label: 'Category', type: 'select', options: categories },
                { name: 'body', label: 'Press Release Body', type: 'textarea', required: true, full: true, placeholder: 'Paste the full text of your press release here.' },
                { name: 'mediaUrl', label: 'Media / Image URL', full: true, placeholder: 'https://...' },
              ]}
              submitLabel="Submit Press Release →"
              successMsg="✓ Received! Our editorial team will review within 2 business days."
            />
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="card center" style={{ maxWidth: 720, marginInline: 'auto', padding: 32 }}>
              <span className="badge badge-blue" style={{ marginBottom: 12 }}>PRICING</span>
              <h3 style={{ marginBottom: 8 }}>Press release distribution from <span className="accent">$199 AUD</span></h3>
              <p className="text-soft" style={{ fontSize: 14.5 }}>
                Includes editorial review, a permanent SEO-optimised page, up to 2 dofollow links and
                promotion across our social channels and newsletter. Multi-release bundles available on request.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="How it works" title="From submission to live in days." />
          <ProcessSteps steps={steps} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHead eyebrow="FAQ" title="Press release questions." />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTABand
        title="Have news the security industry should hear?"
        subtitle="Submit your press release above, or contact our editorial team to discuss a distribution bundle."
        ctaLabel="Contact editorial →"
        ctaHref="/contact/"
      />
    </>
  )
}
