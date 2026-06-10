import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import PricingCards from '@/components/ui/PricingCards'
import FAQAccordion from '@/components/ui/FAQAccordion'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import MagneticButton from '@/components/ui/MagneticButton'
import AdPlacementCards from './AdPlacementCards'
import JsonLd from '@/components/JsonLd'
import { serviceSchema } from '@/lib/schema'

export const metadata = {
  title: 'Pricing — All Services & Packages · SecurityBlogs',
  description:
    'Complete pricing for every SecurityBlogs service: SEO, Google Ads, GMB Profile, sponsored posts, guest posting, backlink placements, product promotion, advertising and directory listings.',
  alternates: { canonical: '/pricing/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/pricing/' },
}

/* ─── Marketing Services ───────────────────────────────────────────────── */
const seoPlans = [
  {
    name: 'Security SEO',
    price: 'from $1,500',
    period: ' /month',
    features: [
      'Full technical SEO audit',
      'Keyword mapping & on-page optimisation',
      'Content creation & link building',
      'Local SEO & Google Business Profile',
      'Monthly reporting on every keyword',
      'No lock-in contracts',
    ],
    cta: 'Book a free SEO audit →',
    ctaHref: '/services/security-seo/',
  },
  {
    name: 'Google Ads',
    price: 'from $1,500',
    period: ' /month ad spend',
    featured: true,
    badge: '🏆 Fastest ROI',
    features: [
      'Recommended min. $1,500–$3,000/mo ad spend',
      'Campaign setup & keyword research',
      'Ad copy, extensions & landing pages',
      'Conversion tracking & bid management',
      'Weekly optimisation & monthly ROAS report',
      'No lock-in contracts',
    ],
    cta: 'Book a free Ads audit →',
    ctaHref: '/services/google-ads/',
  },
  {
    name: 'GMB Profile',
    price: 'Custom',
    period: ' quote',
    features: [
      'Full GBP setup & registration',
      'Google Maps verification support',
      'Category & service area optimisation',
      'Photo strategy & review management',
      'Monthly Google Posts & performance report',
      'Citation building (50+ directories)',
    ],
    cta: 'Get a free GBP audit →',
    ctaHref: '/services/gmb-profile/',
  },
]

const aiPlans = [
  {
    name: 'AIO',
    price: 'Custom',
    period: ' quote',
    features: [
      'AI citation audit across ChatGPT, Gemini & Perplexity',
      'Citable content creation',
      'Entity building & schema markup',
      'Monthly citation rate tracking',
    ],
    cta: 'Get my AIO audit →',
    ctaHref: '/services/aio/',
  },
  {
    name: 'AEO',
    price: 'Custom',
    period: ' quote',
    features: [
      'Answer engine optimisation',
      'Featured snippet targeting',
      'Structured Q&A content',
      'AI Overview appearance tracking',
    ],
    cta: 'Get my AEO audit →',
    ctaHref: '/services/aeo/',
  },
  {
    name: 'GEO',
    price: 'Custom',
    period: ' quote',
    features: [
      'Entity creation & Wikidata setup',
      'Brand signal distribution',
      'NAP consistency audit',
      'AI platform recognition tracking',
    ],
    cta: 'Get my GEO audit →',
    ctaHref: '/services/geo/',
  },
]

/* ─── Publishing & Content ─────────────────────────────────────────────── */
const guestPostPlans = [
  {
    name: 'Standard',
    price: 'Free',
    features: [
      'Editorial review & publication',
      '1 dofollow link',
      'Byline credit & author bio',
      'Min 800 words, original content',
      'Response within 3 business days',
    ],
    cta: 'Submit your article →',
    ctaHref: '/publish-with-us/guest-posting/',
  },
  {
    name: 'Priority Placement',
    price: '$99',
    period: ' AUD',
    featured: true,
    badge: '⚡ Fast-Track',
    features: [
      'Faster editorial review',
      'Homepage feature for 3 days',
      '2 dofollow links',
      'Priority scheduling',
      'Byline credit & author bio',
    ],
    cta: 'Choose Priority →',
    ctaHref: '/publish-with-us/guest-posting/',
  },
]

const sponsoredPostPlans = [
  {
    name: 'Standard',
    price: '$149',
    period: ' AUD',
    features: [
      '1 dofollow link',
      'Permanent placement',
      'Social share across channels',
      'Published within 3 days',
    ],
    cta: 'Choose Standard →',
    ctaHref: '/publish-with-us/sponsored-posts/',
  },
  {
    name: 'Featured Homepage',
    price: '$299',
    period: ' AUD',
    featured: true,
    badge: '⭐ Most Popular',
    features: [
      'Homepage feature for 7 days',
      '2 dofollow links',
      'Newsletter mention (24K+ subs)',
      'Priority publishing',
    ],
    cta: 'Choose Featured →',
    ctaHref: '/publish-with-us/sponsored-posts/',
  },
  {
    name: 'Authority Series',
    price: '$1,250',
    period: ' AUD',
    features: [
      '5-article sponsored series',
      'Homepage + category features',
      '3 dofollow links per article',
      'Dedicated promotion',
      'Quarterly content refresh',
    ],
    cta: 'Choose Authority →',
    ctaHref: '/publish-with-us/sponsored-posts/',
  },
]

const pressReleasePlans = [
  {
    name: 'Single Release',
    price: '$199',
    period: ' AUD',
    features: [
      'Editorial review & publication',
      'Permanent SEO page',
      'Up to 2 dofollow links',
      'Social & newsletter promotion',
      'Published within 2 business days',
    ],
    cta: 'Submit a press release →',
    ctaHref: '/contact/',
  },
  {
    name: '3-Release Bundle',
    price: '$499',
    period: ' AUD',
    featured: true,
    badge: '💰 Save $98',
    features: [
      '3 press releases at a discount',
      'Priority editorial review',
      'Permanent SEO pages',
      'Up to 2 dofollow links each',
      'Social & newsletter promotion',
    ],
    cta: 'Choose Bundle →',
    ctaHref: '/contact/',
  },
]

const backlinkPlans = [
  {
    name: 'Starter',
    price: '$199',
    period: ' AUD',
    features: [
      '1 sponsored editorial placement',
      'Placed in relevant security content',
      'rel="sponsored" link to your URL',
      'Visible sponsored disclosure',
      'Permanent placement, no expiry',
      'Live in ~5 business days',
    ],
    cta: 'Request a quote →',
    ctaHref: '/publish-with-us/backlink-packages/',
  },
  {
    name: 'Growth',
    price: '$549',
    period: ' AUD',
    featured: true,
    badge: '⭐ Best Value',
    features: [
      '3 sponsored editorial placements',
      'Placed in relevant security content',
      'rel="sponsored" links to your URLs',
      'Anchor-text preferences accommodated',
      'Permanent placement, no expiry',
      'Placement report included',
    ],
    cta: 'Request a quote →',
    ctaHref: '/publish-with-us/backlink-packages/',
  },
  {
    name: 'Authority',
    price: '$1,290',
    period: ' AUD',
    features: [
      '8 sponsored editorial placements',
      'Bespoke articles written in-house',
      'rel="sponsored" with anchor strategy',
      'Priority placement & scheduling',
      'Permanent placement, no expiry',
      'Detailed placement report',
    ],
    cta: 'Request a quote →',
    ctaHref: '/publish-with-us/backlink-packages/',
  },
]

const productPromoPlans = [
  {
    name: 'Spotlight',
    price: '$249',
    period: ' AUD',
    features: [
      '1 product review',
      '1 dofollow link',
      'Social share',
      'Permanent placement',
    ],
    cta: 'Choose Spotlight →',
    ctaHref: '/publish-with-us/product-promotion/',
  },
  {
    name: 'Featured Review',
    price: '$499',
    period: ' AUD',
    featured: true,
    badge: '⭐ Most Popular',
    features: [
      'In-depth review + comparison',
      'Homepage feature for 7 days',
      '2 dofollow links',
      'Newsletter feature (24K+ subs)',
      'Video embed',
    ],
    cta: 'Choose Featured →',
    ctaHref: '/publish-with-us/product-promotion/',
  },
  {
    name: 'Launch Campaign',
    price: '$1,450',
    period: ' AUD',
    features: [
      'Review + comparison + demo',
      "Buyer's guide inclusion",
      '3 dofollow links',
      'Dedicated newsletter feature',
      '90-day on-site promotion',
    ],
    cta: 'Choose Campaign →',
    ctaHref: '/publish-with-us/product-promotion/',
  },
]

/* ─── Advertising ──────────────────────────────────────────────────────── */
const advertisingPlans = [
  {
    name: 'Starter',
    price: '$499',
    period: ' AUD/mo',
    features: [
      '1 newsletter sponsorship (24K+ subs)',
      'Directory feature listing',
      'Basic monthly performance report',
    ],
    cta: 'Choose Starter →',
    ctaHref: '/publish-with-us/advertise/',
  },
  {
    name: 'Growth',
    price: '$1,200',
    period: ' AUD/mo',
    featured: true,
    badge: '⭐ Most Popular',
    features: [
      'Homepage banner (top of page)',
      '2 newsletter sponsorships',
      '1 sponsored editorial article',
      'Directory feature listing',
      'Detailed monthly reporting',
    ],
    cta: 'Choose Growth →',
    ctaHref: '/publish-with-us/advertise/',
  },
  {
    name: 'Dominate',
    price: '$2,750',
    period: ' AUD/mo',
    features: [
      'Full category takeover (banner + label)',
      'Homepage banner',
      '4 newsletter sponsorships',
      '2 sponsored editorial articles',
      'Podcast mention',
      'Dedicated account manager',
    ],
    cta: 'Choose Dominate →',
    ctaHref: '/publish-with-us/advertise/',
  },
]

/* ─── Directory ────────────────────────────────────────────────────────── */
const directoryPlans = [
  {
    name: 'Listed',
    price: 'Free',
    features: [
      'Basic business profile',
      '1 category listing',
      'Standard listing position',
    ],
    cta: 'Get listed free →',
    ctaHref: '/security-directory/',
  },
  {
    name: 'AI-Verified',
    price: '$49',
    period: '/month',
    featured: true,
    badge: '⭐ Most Popular',
    features: [
      'AI score badge on profile',
      'Priority listing position',
      'Monthly visibility report',
      '3 category listings',
    ],
    cta: 'Get AI-Verified →',
    ctaHref: '/security-directory/',
  },
  {
    name: 'Authority',
    price: '$149',
    period: '/month',
    features: [
      'Featured homepage placement',
      '5 category listings',
      'Dofollow backlink',
      'Content feature article',
      'Dedicated account manager',
    ],
    cta: 'Become an Authority →',
    ctaHref: '/security-directory/',
  },
]

/* ─── Individual ad placements ────────────────────────────────────────── */
const adPlacements = [
  { icon: '📬', label: 'Newsletter Sponsor', price: 'from $249 / send', desc: 'Dedicated slot to 24K+ subscribers', href: '/publish-with-us/advertise/' },
  { icon: '🖼️', label: 'Homepage Banner', price: 'from $650 / month', desc: 'Top-of-page banner across the homepage', href: '/publish-with-us/advertise/' },
  { icon: '📂', label: 'Category Takeover', price: 'from $900 / month', desc: 'Banner + sponsored label across a full category', href: '/publish-with-us/advertise/' },
  { icon: '📝', label: 'Sponsored Content', price: 'from $299', desc: 'Native editorial article with permanent placement', href: '/publish-with-us/sponsored-posts/' },
  { icon: '🎙️', label: 'Podcast Mention', price: 'from $350 / ep', desc: 'Read-out mention in our security industry podcast', href: '/publish-with-us/advertise/' },
  { icon: '📇', label: 'Directory Feature', price: 'from $199 / month', desc: 'Premium placement in the security vendor directory', href: '/security-directory/' },
]

const faqs = [
  { q: 'Do I need to commit to a long-term contract for marketing services?', a: 'No. All our marketing services — SEO, Google Ads, GMB Profile — run month to month with no lock-in contracts. We earn retention through results.' },
  { q: 'Are sponsored posts and backlinks marked as paid content?', a: "Yes. Every paid placement on SecurityBlogs carries a visible 'Sponsored' disclosure and uses rel='sponsored' on the link per Google's published link policies. We never sell undisclosed dofollow links." },
  { q: 'What is the minimum Google Ads spend for security campaigns?', a: 'We recommend a minimum of $1,500–$3,000/month in ad spend to gather enough conversion data and compete in major Australian security markets. Our management fee is separate and quoted on request.' },
  { q: 'Can I bundle services for a discount?', a: 'Yes. Clients using multiple services (e.g. SEO + Google Ads, or backlinks + sponsored posts) can request a bundled proposal. Contact our team for a custom quote.' },
  { q: 'How quickly do published placements go live?', a: 'Guest posts and sponsored posts typically publish within 3–5 business days of submission. Press releases within 2 business days. Priority placement tiers are faster.' },
  { q: 'Is the security directory listing really free?', a: 'Yes. Basic directory listing is 100% free. Paid AI-Verified and Authority tiers add visibility, reporting and featured placements.' },
]

export default function PricingPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: 'SecurityBlogs Pricing',
        description: 'Complete pricing for every SecurityBlogs service: SEO, Google Ads, GMB, sponsored content, backlinks, advertising and directory.',
        path: '/pricing/',
        serviceType: 'Marketing Services',
      })} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <HeroBg grid>
        <Reveal>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Pricing' }]} />
          <span className="badge badge-blue" style={{ marginBottom: 20 }}>
            <span className="dot dot-pulse" /> TRANSPARENT PRICING
          </span>
          <h1 className="h1" style={{ maxWidth: 820, marginBottom: 18 }}>
            Every Service. Every Package.{' '}
            <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>One Page.</span>
          </h1>
          <p className="lead" style={{ maxWidth: 640, marginBottom: 28 }}>
            From security SEO retainers to one-off sponsored posts — all our pricing in one place.
            No hidden fees, no lock-in contracts, no surprises.
          </p>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Get a custom quote →</MagneticButton>
            <MagneticButton href="/book-strategy-call/" className="btn btn-outline btn-lg">Book a strategy call</MagneticButton>
          </div>
        </Reveal>
      </HeroBg>

      {/* ── Jump nav ─────────────────────────────────────────────────── */}
      <section style={{ background: '#f8faff', borderBottom: '1px solid #e8edf7', padding: '18px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#8896af', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginRight: 4 }}>JUMP TO:</span>
            {[
              { label: 'Marketing Services', id: 'marketing' },
              { label: 'AI Services', id: 'ai-services' },
              { label: 'Guest Posting', id: 'guest-posting' },
              { label: 'Sponsored Posts', id: 'sponsored-posts' },
              { label: 'Press Release', id: 'press-release' },
              { label: 'Backlink Packages', id: 'backlink-packages' },
              { label: 'Product Promotion', id: 'product-promotion' },
              { label: 'Advertising', id: 'advertising' },
              { label: 'Directory', id: 'directory' },
            ].map((item) => (
              <a key={item.id} href={`#${item.id}`} style={{
                fontSize: 13, fontWeight: 600, color: 'var(--blue)',
                padding: '5px 14px', borderRadius: 999,
                background: 'rgba(30,95,224,0.07)',
                border: '1px solid rgba(30,95,224,0.15)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}>{item.label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          MARKETING SERVICES
      ════════════════════════════════════════════════════════════════ */}
      <section id="marketing" className="section">
        <div className="container">
          <SectionHead
            eyebrow="Marketing Services"
            title="SEO, Paid Ads & Local Search"
            sub="Monthly retainer services that drive leads for your security business — with no lock-in contracts."
          />
          <PricingCards plans={seoPlans} />
          <div style={{ marginTop: 20, padding: '16px 20px', background: '#f8faff', borderRadius: 12, border: '1px solid #e8edf7', maxWidth: 820, marginInline: 'auto', fontSize: 13.5, color: 'var(--text-soft)', lineHeight: 1.65 }}>
            <strong style={{ color: 'var(--text)' }}>Note.</strong>{' '}
            Marketing service pricing is quoted based on your business size, location and competition level. Book a free strategy call for a custom proposal. Bing Ads and Web Design are also available — <a href="/contact/" style={{ color: 'var(--blue)' }}>enquire for pricing</a>.
          </div>
        </div>
      </section>

      {/* ── AI Services ─────────────────────────────────────────────── */}
      <section id="ai-services" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="AI Visibility Services"
            title="AIO · AEO · GEO"
            sub="Get your security brand cited by ChatGPT, Gemini, Perplexity and AI Overviews. Custom-quoted based on your current entity authority and target platforms."
          />
          <PricingCards plans={aiPlans} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          DIVIDER
      ════════════════════════════════════════════════════════════════ */}
      <div style={{ background: '#f0f4ff', borderTop: '1px solid #e8edf7', borderBottom: '1px solid #e8edf7', padding: '28px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0f2244', marginBottom: 4 }}>Publishing & Content Packages</div>
              <div style={{ fontSize: 14, color: '#46546e' }}>One-time AUD prices unless noted. All placements are permanent. Paid placements carry sponsored disclosure per Google's link policies.</div>
            </div>
            <MagneticButton href="/publish-with-us/" className="btn btn-outline">View all publishing options →</MagneticButton>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          GUEST POSTING
      ════════════════════════════════════════════════════════════════ */}
      <section id="guest-posting" className="section">
        <div className="container">
          <SectionHead
            eyebrow="Guest Posting"
            title="Share your expertise. Earn a byline."
            sub="Submit an original article to SecurityBlogs. Reach 38,000+ monthly security professionals with a byline-credited piece and dofollow links."
          />
          <PricingCards plans={guestPostPlans} />
        </div>
      </section>

      {/* ── Sponsored Posts ─────────────────────────────────────────── */}
      <section id="sponsored-posts" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="Sponsored Posts"
            title="Promote your brand with permanent sponsored content."
            sub="Permanent, disclosed sponsored placements with full editorial promotion and dofollow links from $149 AUD."
          />
          <PricingCards plans={sponsoredPostPlans} />
        </div>
      </section>

      {/* ── Press Release ─────────────────────────────────────────────── */}
      <section id="press-release" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="Press Release"
            title="Get your security news published."
            sub="Editorial review and permanent SEO publication for company announcements, product launches and industry news."
          />
          <PricingCards plans={pressReleasePlans} />
        </div>
      </section>

      {/* ── Backlink Packages ───────────────────────────────────────── */}
      <section id="backlink-packages" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="Sponsored Editorial Placements"
            title="Contextual brand exposure in security content."
            sub={`Disclosed, compliant, permanent. Every paid link uses rel="sponsored" per Google's published link policies. No DA guarantees, no PBNs.`}
          />
          <PricingCards plans={backlinkPlans} />
          <div style={{ marginTop: 20, padding: '16px 20px', background: '#f8faff', borderRadius: 12, border: '1px solid #e8edf7', maxWidth: 820, marginInline: 'auto', fontSize: 13.5, color: 'var(--text-soft)', lineHeight: 1.65 }}>
            <strong style={{ color: 'var(--text)' }}>Disclosure.</strong>{' '}
            All paid placements are marked <code>rel=&quot;sponsored&quot;</code> per Google&apos;s published link policies. We do not sell undisclosed dofollow links and do not guarantee Domain Authority, rankings or indexing.
          </div>
        </div>
      </section>

      {/* ── Product Promotion ─────────────────────────────────────────── */}
      <section id="product-promotion" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="Product Promotion"
            title="Reviews, comparisons and launch campaigns."
            sub="Reach in-market security buyers ready to purchase. From a single product review to a full 90-day launch campaign."
          />
          <PricingCards plans={productPromoPlans} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          ADVERTISING
      ════════════════════════════════════════════════════════════════ */}
      <section id="advertising" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="Advertising"
            title="Reach 38,000+ monthly security professionals."
            sub="Banner placements, newsletter sponsorships, category takeovers and native content — in one media kit."
          />

          {/* Individual placement cards */}
          <AdPlacementCards placements={adPlacements} />

          {/* Bundle packages */}
          <SectionHead eyebrow="Bundle packages" title="Save more with a monthly bundle." sub="Combine newsletter, banners and editorial into one recurring campaign." />
          <PricingCards plans={advertisingPlans} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          DIRECTORY
      ════════════════════════════════════════════════════════════════ */}
      <section id="directory" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="Security Directory"
            title="Get your business listed and discovered."
            sub="Australia's #1 AI-verified security company directory. Free to list — paid tiers add AI scoring, priority position and featured placement."
          />
          <PricingCards plans={directoryPlans} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead eyebrow="FAQ" title="Pricing questions, answered." />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTABand
        title="Not sure which package is right for you?"
        subtitle="Book a free strategy call — we'll match the right service mix to your security business goals and budget."
        ctaLabel="Book a free strategy call →"
        ctaHref="/book-strategy-call/"
      />
    </>
  )
}
