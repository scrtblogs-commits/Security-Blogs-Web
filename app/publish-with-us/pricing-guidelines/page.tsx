import ArticleLayout from '@/components/ui/ArticleLayout'
import CTABand from '@/components/ui/CTABand'
import JsonLd from '@/components/JsonLd'
import { serviceSchema } from '@/lib/schema'

export const metadata = {
  title: 'Pricing & Guidelines · Publish With Us',
  description:
    'Transparent pricing and editorial guidelines for guest posts, sponsored posts, press releases, backlinks, product promotion and advertising on SecurityBlogs.',
  alternates: { canonical: '/publish-with-us/pricing-guidelines/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/publish-with-us/pricing-guidelines/' },
}

const toc = [
  { id: 'guest-posting', label: 'Guest Posting' },
  { id: 'sponsored-posts', label: 'Sponsored Posts' },
  { id: 'press-release', label: 'Press Release' },
  { id: 'backlinks', label: 'Backlink Packages' },
  { id: 'product-promotion', label: 'Product Promotion' },
  { id: 'advertising', label: 'Advertising' },
  { id: 'editorial', label: 'Editorial Guidelines' },
]

type Row = { tier: string; price: string; includes: string }

function PriceTable({ rows }: { rows: Row[] }) {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 8 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: 'var(--bg-card)', textAlign: 'left' }}>
            <th style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)' }}>Tier</th>
            <th style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)' }}>Price (AUD)</th>
            <th style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)' }}>What&apos;s included</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.tier}>
              <td style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', fontWeight: 600 }}>{r.tier}</td>
              <td style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', color: 'var(--blue)', fontWeight: 700, whiteSpace: 'nowrap' }}>{r.price}</td>
              <td style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', color: 'var(--text-soft)' }}>{r.includes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function PricingGuidelinesPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: 'Pricing and Editorial Guidelines',
        description: 'Transparent pricing and editorial guidelines for guest posts, sponsored posts, press releases, backlinks, product promotion and advertising on SecurityBlogs.',
        path: '/publish-with-us/pricing-guidelines/',
        serviceType: 'Editorial Guidelines',
      })} />
      <ArticleLayout
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Publish With Us', href: '/publish-with-us/' }, { label: 'Pricing Guidelines' }]}
        title="Pricing & Guidelines"
        subtitle="Transparent rates across every publishing option, plus the editorial standards we hold all content to."
        toc={toc}
      >
        <p>
          Below is a complete breakdown of our publishing rates and the editorial guidelines every
          submission must meet. All prices are in Australian dollars (AUD), one-time unless noted, and
          custom or bundled packages are always available — just <a href="/contact/">get in touch</a>.
        </p>

        <h2 id="guest-posting">Guest Posting</h2>
        <p>Byline-credited editorial articles. Free to submit; paid options add promotion and links.</p>
        <PriceTable
          rows={[
            { tier: 'Standard submission', price: 'Free', includes: 'Editorial review, 1 dofollow link, byline credit' },
            { tier: 'Priority placement', price: '$99', includes: 'Faster review, homepage feature 3 days, 2 dofollow links' },
          ]}
        />

        <h2 id="sponsored-posts">Sponsored Posts</h2>
        <p>Permanent, disclosed sponsored placements with full editorial promotion.</p>
        <PriceTable
          rows={[
            { tier: 'Standard', price: '$149', includes: '1 dofollow link, permanent placement, social share, live in 3 days' },
            { tier: 'Featured Homepage', price: '$299', includes: 'Homepage feature 7 days, 2 dofollow links, newsletter mention' },
            { tier: 'Authority Series', price: '$1,250', includes: '5-article series, homepage + category features, 3 links each, quarterly refresh' },
          ]}
        />

        <h2 id="press-release">Press Release</h2>
        <p>Newswire distribution for company announcements, reviewed within 2 business days.</p>
        <PriceTable
          rows={[
            { tier: 'Single release', price: '$199', includes: 'Editorial review, permanent SEO page, up to 2 dofollow links, social + newsletter' },
            { tier: '3-release bundle', price: '$499', includes: 'Three releases at a discount, priority review' },
          ]}
        />

        <h2 id="backlinks">Backlink Packages</h2>
        <p>White-hat, niche-relevant dofollow links from established security domains.</p>
        <PriceTable
          rows={[
            { tier: 'Starter', price: '$199', includes: '1 dofollow link, DA 60+, niche-relevant, permanent' },
            { tier: 'Growth', price: '$549', includes: '3 dofollow links, DA 65+, anchor control, reporting' },
            { tier: 'Authority', price: '$1,290', includes: '8 dofollow links, DA 68+, full editorial articles, detailed report' },
          ]}
        />

        <h2 id="product-promotion">Product Promotion</h2>
        <p>Reviews, comparisons, demos and buyer-guide inclusions for security products.</p>
        <PriceTable
          rows={[
            { tier: 'Spotlight', price: '$249', includes: '1 product review, 1 dofollow link, social share' },
            { tier: 'Featured Review', price: '$499', includes: 'Review + comparison, homepage feature, 2 links, video embed' },
            { tier: 'Launch Campaign', price: '$1,450', includes: "Review + comparison + demo, buyer's guide, 3 links, 90-day promotion" },
          ]}
        />

        <h2 id="advertising">Advertising</h2>
        <p>Display, newsletter and category placements from our media kit.</p>
        <PriceTable
          rows={[
            { tier: 'Newsletter Sponsor', price: '$249 / send', includes: 'Dedicated slot to 24K+ subscribers' },
            { tier: 'Homepage Banner', price: '$650 / month', includes: 'Top-of-page banner across the homepage' },
            { tier: 'Category Takeover', price: '$900 / month', includes: 'Banner + sponsored label across a full category' },
          ]}
        />

        <h2 id="editorial">Editorial Guidelines</h2>
        <ul>
          <li>Content must be original — no plagiarism, spun or low-effort AI-generated text.</li>
          <li>Guest articles must be at least 800 words and on-topic for the security industry.</li>
          <li>A maximum of 2 dofollow links per guest post, pointing to relevant, reputable destinations.</li>
          <li>No links to spam, adult, gambling, or content unrelated to security.</li>
          <li>Sponsored content is clearly disclosed to readers while still passing link value.</li>
          <li>We reserve the right to lightly edit for grammar, formatting, SEO and house style.</li>
          <li>All claims should be accurate; we may request sources for statistics or strong assertions.</li>
          <li>Final editorial discretion on acceptance and placement rests with SecurityBlogs.</li>
        </ul>
      </ArticleLayout>

      <CTABand
        title="Ready to publish with SecurityBlogs?"
        subtitle="Choose a placement type or contact our team for a custom quote across multiple formats."
        ctaLabel="Get started →"
        ctaHref="/contact/"
      />
    </>
  )
}
