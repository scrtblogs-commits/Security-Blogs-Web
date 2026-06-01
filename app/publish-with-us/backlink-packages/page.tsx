import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import PricingCards from '@/components/ui/PricingCards'
import Bento from '@/components/ui/Bento'
import FAQAccordion from '@/components/ui/FAQAccordion'
import ContactForm from '@/components/ui/ContactForm'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import JsonLd from '@/components/JsonLd'
import { serviceSchema } from '@/lib/schema'

// Re-used disclosure block. Rendered twice on the page per Phase D spec:
// once between hero and pricing, once between contact form and final CTA.
function DisclosureBlock() {
  return (
    <div
      role="note"
      aria-label="Sponsored-placement disclosure"
      style={{
        maxWidth: 820, marginInline: 'auto', padding: '16px 20px',
        border: '1px solid var(--line)', borderRadius: 12,
        background: 'var(--bg-soft)', fontSize: 13.5, color: 'var(--text-soft)',
        lineHeight: 1.65,
      }}
    >
      <strong style={{ color: 'var(--text)' }}>Disclosure.</strong>{' '}
      All paid placements on SecurityBlogs are marked{' '}
      <code style={{ margin: '0 2px' }}>rel=&quot;sponsored&quot;</code>{' '}
      per Google&apos;s published link policies. We do not sell undisclosed dofollow links.
      We do not guarantee Domain Authority, rankings or indexing — we publish editorial
      content and let search engines do their job.
    </div>
  )
}

export const metadata = {
  // Layout's title template appends ' | SecurityBlogs' — keep this literal
  // without the suffix to avoid the doubling bug fixed in Phase 2.
  title: 'Sponsored Editorial Placements for Security Brands — Disclosed, Compliant, Permanent',
  description:
    "Disclosed, compliant, permanent sponsored editorial placements on Australia's specialist security publication. Every paid link uses rel=\"sponsored\" per Google's published link policies. No DA guarantees, no PBNs.",
  alternates: { canonical: '/publish-with-us/backlink-packages/' },
  openGraph: { url: '/publish-with-us/backlink-packages/' },
}

// Phase D (seo-final-2026-05): owner reset pricing to the original tier
// figures ($199 / $549 / $1,290). DA guarantees and 'pass authority'
// language removed throughout; every placement is now framed as a
// disclosed, rel="sponsored" editorial placement.
const plans = [
  {
    name: 'Starter',
    price: '$199',
    period: ' AUD',
    features: [
      '1 sponsored editorial placement',
      'Editorially placed in relevant security content',
      'rel="sponsored" link to your URL',
      'Visible "Sponsored" disclosure on the article',
      'Permanent placement, no expiry',
      'Live in ~5 business days',
    ],
    cta: 'Request a quote',
    ctaHref: '/contact/',
  },
  {
    name: 'Growth',
    price: '$549',
    period: ' AUD',
    featured: true,
    badge: '⭐ Best Value',
    features: [
      '3 sponsored editorial placements',
      'Editorially placed in relevant security content',
      'rel="sponsored" links to your URLs',
      'Visible "Sponsored" disclosure on each article',
      'Anchor-text preferences accommodated',
      'Permanent placement, no expiry',
      'Placement report included',
    ],
    cta: 'Request a quote',
    ctaHref: '/contact/',
  },
  {
    name: 'Authority',
    price: '$1,290',
    period: ' AUD',
    features: [
      '8 sponsored editorial placements',
      'Bespoke editorial articles, written or edited in-house',
      'rel="sponsored" links with anchor + URL strategy input',
      'Visible "Sponsored" disclosure on each article',
      'Priority placement & scheduling',
      'Permanent placement, no expiry',
      'Detailed placement report',
    ],
    cta: 'Request a quote',
    ctaHref: '/contact/',
  },
]

const whatYouGet = [
  { icon: '✍️', title: 'Editorial placement', desc: 'Editorially-placed sponsored placements in relevant security content — read by your target buyers, not link networks.' },
  { icon: '🛡️', title: 'Niche relevance', desc: 'Established security-niche domain. Placements live on genuinely security-related pages, not generic high-DA hosts.' },
  { icon: '🔖', title: 'Sponsored disclosure', desc: 'Every paid placement carries a visible "Sponsored" tag on the article and rel="sponsored" on the link.' },
  { icon: '🔍', title: 'Contextual exposure', desc: 'Your brand surrounded by relevant, well-written editorial that drives qualified visits and AI-engine citations.' },
  { icon: '♾️', title: 'Permanent placement', desc: 'Once published, your placement stays live indefinitely — no rentals, no expiry, no recurring fees.' },
  { icon: '📈', title: 'Transparent reporting', desc: 'A clear placement report listing every URL, anchor and disclosure used in your campaign.' },
]

// FAQ items per Phase D spec — five questions on rel="sponsored", SEO
// impact, reader disclosure, authorship, and permanence. Answers stay in
// the 40–70 word range and avoid making domain-authority or ranking
// promises.
const faqs = [
  {
    q: "Why use rel='sponsored' instead of dofollow?",
    a: "Google requires paid links to be marked with rel='sponsored' or rel='nofollow'. Selling undisclosed dofollow links is treated as a link scheme and can trigger a manual action against both publisher and advertiser. Marking placements rel='sponsored' keeps your brand and ours in good standing while still delivering exposure and qualified referral traffic to your site.",
  },
  {
    q: "Does a rel='sponsored' link still help my SEO?",
    a: "Indirectly, yes. The link itself doesn't pass ranking signals, but the placement does. A contextual mention on a relevant, indexed security publication builds entity recognition, earns referral traffic, and signals to AI engines — which read editorial content, not just link graphs — that your brand belongs in the conversation. We don't promise ranking or DA changes.",
  },
  {
    q: 'Will my placement be labelled as sponsored to readers?',
    a: "Yes. Every paid placement carries a visible 'Sponsored' tag near the byline, in line with consumer-protection disclosure rules and Google's reader-disclosure guidance. Readers always know they're seeing paid content. In our experience, transparent labelling improves trust and click-through on security topics, where buyers are already cautious about marketing claims.",
  },
  {
    q: 'Can I write the article myself?',
    a: "On the Growth and Authority tiers, yes. You submit a draft and we edit it to match our editorial style, fact-check claims, and place the rel='sponsored' link naturally. The Starter tier uses our in-house writers to keep turnaround fast. Either way, every published piece goes through editorial review for accuracy and tone before it goes live.",
  },
  {
    q: 'Are placements permanent?',
    a: "Yes. Once a sponsored placement is published it stays live on SecurityBlogs indefinitely — no rentals, no expiry, no recurring fees. The only time we'd remove a placement is if the linked destination becomes unsafe (malware, expired domain, redirect to spam), and we'd notify you first to either repoint the link or de-link the placement.",
  },
]

export default function BacklinkPackagesPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: 'Sponsored Editorial Placements for Security Brands',
        description: "Disclosed, compliant, permanent sponsored editorial placements on Australia's specialist security publication. Every paid link uses rel='sponsored' per Google's published link policies.",
        path: '/publish-with-us/backlink-packages/',
        serviceType: 'Sponsored Content',
        catalogName: 'Sponsored Editorial Placement Packages',
        offers: [
          { name: 'Starter',   price: '199',   priceCurrency: 'AUD', description: '1 sponsored editorial placement with visible Sponsored disclosure and rel="sponsored" link.' },
          { name: 'Growth',    price: '549',   priceCurrency: 'AUD', description: '3 sponsored editorial placements with anchor-text preferences accommodated. Placement report included.' },
          { name: 'Authority', price: '1290',  priceCurrency: 'AUD', description: '8 bespoke editorial articles with priority placement and detailed placement report. rel="sponsored" with anchor + URL strategy input.' },
        ],
      })} />
      <HeroBg grid blobs>
        <Reveal>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Publish With Us', href: '/publish-with-us/' }, { label: 'Sponsored Editorial Placements' }]} />
          <span className="badge badge-blue" style={{ marginBottom: 20 }}>
            <span className="dot dot-pulse" /> SPONSORED EDITORIAL PLACEMENTS
          </span>
          <h1 className="h1" style={{ maxWidth: 880, marginBottom: 18 }}>
            Sponsored Editorial Placements for{' '}
            <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Security Brands</span>
          </h1>
          <p className="lead" style={{ maxWidth: 680 }}>
            Disclosed, compliant, permanent. Your brand featured in original editorial articles on
            Australia&apos;s specialist security publication. Every paid link uses{' '}
            <code>rel=&quot;sponsored&quot;</code> per Google&apos;s published link policies — earning
            qualified exposure, not PageRank manipulation.
          </p>
        </Reveal>
      </HeroBg>

      <section className="section" style={{ paddingTop: 32, paddingBottom: 0 }}>
        <div className="container">
          <DisclosureBlock />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Pricing" title="Choose your placement package." sub={`One-time pricing per placement. Every placement is permanent, disclosed and uses rel="sponsored" per Google's published link policies. No DA guarantees, no indexing guarantees, no PBNs.`} />
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
                we reject placements for spam, adult, gambling or unrelated content. We don&apos;t
                guarantee Domain Authority changes, ranking changes or indexing — we publish editorial
                content and let search engines do their job. Compliance protects both your brand and
                ours.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHead eyebrow="FAQ" title="Sponsored placement questions." />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <SectionHead eyebrow="Get a quote" title="Tell us about your placement goals." />
          <Reveal>
            <ContactForm
              fields={[
                { name: 'name', label: 'Name', required: true },
                { name: 'email', label: 'Email', type: 'email', required: true },
                { name: 'website', label: 'Destination URL for the sponsored link' },
                { name: 'package', label: 'Package of interest', type: 'select', options: ['Starter', 'Growth', 'Authority', 'Custom / not sure'], full: true },
                { name: 'message', label: 'Target pages & anchor preferences', type: 'textarea', required: true, full: true, placeholder: 'Share the URLs you want placements to point at and any preferred anchor wording.' },
              ]}
              submitLabel="Request a quote →"
              successMsg="✓ Received! We'll send a tailored sponsored placement proposal within 1 business day."
            />
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <DisclosureBlock />
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
