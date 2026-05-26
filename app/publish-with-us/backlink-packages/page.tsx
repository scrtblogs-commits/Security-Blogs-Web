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
  title: 'Sponsored Editorial Placements · Publish With Us',
  description:
    "Sponsored editorial placements on a niche security publication. All placements are disclosed and use rel=\"sponsored\" per Google's webmaster policy — permanent on-page placement, transparent reporting.",
  alternates: { canonical: '/publish-with-us/backlink-packages/' },
  openGraph: { url: '/publish-with-us/backlink-packages/' },
}

// TODO([[FILL: confirm sponsored placement pricing]]) — original prices were
// $199 / $549 / $1,290 AUD. These were paired with DA guarantees and
// "dofollow that passes authority" language that conflicts with Google's
// link-spam policy. Pricing should be set against the new, policy-compliant
// product (sponsored editorial placement, rel="sponsored") rather than
// PageRank transfer.
const plans = [
  {
    name: 'Starter',
    price: 'TODO',
    period: ' AUD',
    features: [
      '1 sponsored editorial placement',
      'Niche-relevant editorial context',
      'rel="sponsored" link to your URL',
      'Permanent placement',
      'Live in ~5 business days',
    ],
    cta: 'Request a quote',
    ctaHref: '/contact/',
  },
  {
    name: 'Growth',
    price: 'TODO',
    period: ' AUD',
    featured: true,
    badge: '⭐ Best Value',
    features: [
      '3 sponsored editorial placements',
      'Contextual editorial articles',
      'rel="sponsored" links to your URLs',
      'Anchor-text preferences accommodated',
      'Live in ~5 business days',
      'Placement report included',
    ],
    cta: 'Request a quote',
    ctaHref: '/contact/',
  },
  {
    name: 'Authority',
    price: 'TODO',
    period: ' AUD',
    features: [
      '8 sponsored editorial placements',
      'Full bespoke editorial articles',
      'rel="sponsored" links with anchor + URL strategy input',
      'Priority placement & scheduling',
      'Detailed placement report',
    ],
    cta: 'Request a quote',
    ctaHref: '/contact/',
  },
]

const whatYouGet = [
  { icon: '✍️', title: 'Editorial placement', desc: 'Your brand featured in original, niche-relevant editorial content on a trusted security publication.' },
  { icon: '🛡️', title: 'Niche relevance', desc: 'Placements live on genuinely security-related pages read by your target buyers.' },
  { icon: '🏛️', title: 'Established publication', desc: 'Placements run on an established, indexed security publication with real readership.' },
  { icon: '🔍', title: 'Contextual exposure', desc: 'Your brand surrounded by relevant, well-written editorial that drives qualified visits — not PageRank.' },
  { icon: '♾️', title: 'Permanent placement', desc: 'Once published, your placement stays live — no rentals or expiry.' },
  { icon: '📈', title: 'Transparent reporting', desc: 'You receive a clear report of every URL where your brand is placed.' },
]

const faqs = [
  { q: 'Why is rel="sponsored" used on the links?', a: "Per Google's link-spam policy, paid or sponsored links must be marked with rel=\"sponsored\" (or rel=\"nofollow\") so they don't pass ranking signals. We apply this to every placement. The value of a sponsored placement is brand exposure, qualified referral traffic and audience reach — not PageRank manipulation. This protects both publishers and advertisers from manual actions." },
  { q: 'Is this safe and policy-compliant?', a: "Yes. Every placement is a disclosed sponsored editorial post on a real, indexed page, with rel=\"sponsored\" on the placed link per Google's webmaster guidelines. We do not use PBNs, link farms or automated schemes." },
  { q: 'Can I control anchor text?', a: 'On the Growth and Authority packages you can specify target URLs and preferred anchor text, subject to our editorial guidelines for natural placement. Final anchor wording remains an editorial decision.' },
  { q: 'How long until placements go live?', a: 'Most placements are live within 5 business days. Authority packages with full bespoke articles may take slightly longer.' },
  { q: 'Are the placements permanent?', a: 'Yes — placements are permanent. There are no recurring fees and we do not remove published articles or their links after placement.' },
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
            Sponsored Editorial{' '}
            <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Placements</span>.
          </h1>
          <p className="lead" style={{ maxWidth: 680 }}>
            Your brand featured in original editorial articles on a niche security publication. Every
            placement is disclosed and uses <code>rel=&quot;sponsored&quot;</code> per Google&apos;s webmaster
            policy — earning exposure and qualified visits, not PageRank.
          </p>
        </Reveal>
      </HeroBg>

      <section className="section" style={{ paddingTop: 32, paddingBottom: 0 }}>
        <div className="container">
          <div role="note" aria-label="Disclosure" style={{ maxWidth: 820, marginInline: 'auto', padding: '14px 18px', border: '1px solid var(--line)', borderRadius: 12, background: 'var(--bg-soft)', fontSize: 13.5, color: 'var(--text-soft)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text)' }}>Disclosure.</strong>{' '}
            SecurityBlogs is a paid-placement publisher. Placements purchased via these packages are
            disclosed as sponsored editorial content, and the links placed for sponsors use
            <code style={{ margin: '0 4px' }}>rel=&quot;sponsored&quot;</code> per
            Google&apos;s link-spam policy. Sponsored placements deliver brand exposure and referral
            traffic; they are not designed or sold to transfer PageRank.
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Pricing" title="Choose your placement package." sub={`One-time pricing per placement. All placements are permanent, editorially published and use rel="sponsored" per Google policy.`} />
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
              <span className="badge badge-blue" style={{ marginBottom: 12 }}>POLICY & ETHICS</span>
              <h3 style={{ marginBottom: 8 }}>Compliant by design.</h3>
              <p className="text-soft" style={{ fontSize: 14.5 }}>
                Every placement is a disclosed sponsored editorial post on a real, indexed page. We
                mark placed links with <code>rel=&quot;sponsored&quot;</code> per Google&apos;s webmaster
                guidelines, never use private blog networks, link farms or automated link schemes, and
                we reject placements for spam, adult, gambling or unrelated content. Compliance protects
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
        title="Ready to reach security-industry buyers?"
        subtitle="Choose a package above or request a custom sponsored editorial proposal for your campaign."
        ctaLabel="Request a quote →"
        ctaHref="/contact/"
      />
    </>
  )
}
