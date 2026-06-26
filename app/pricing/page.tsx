import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Pricing · SecurityBlogs',
  description: 'Transparent pricing for every SecurityBlogs service — SEO, AI visibility, Google Ads, GMB, web design and publishing. No lock-in contracts.',
  alternates: { canonical: '/pricing/' },
}

const CHECK = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
    <circle cx="8" cy="8" r="8" fill="rgba(30,95,224,0.1)" />
    <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#1e5fe0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

type PlanCardProps = {
  title: string
  price: string
  priceSuffix?: string
  note?: string
  features: string[]
  cta: string
  ctaHref: string
  highlight?: boolean
  badge?: string
}

function PlanCard({ title, price, priceSuffix, note, features, cta, ctaHref, highlight, badge }: PlanCardProps) {
  return (
    <div style={{
      borderRadius: 20,
      border: highlight ? '2px solid #1e5fe0' : '1px solid var(--line)',
      background: '#fff',
      padding: '32px 28px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      boxShadow: highlight ? '0 8px 32px rgba(30,95,224,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
    }}>
      {badge && (
        <div style={{
          position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
          background: '#1e5fe0', color: '#fff', fontSize: 12, fontWeight: 700,
          padding: '4px 14px', borderRadius: 99, whiteSpace: 'nowrap', letterSpacing: '0.04em',
        }}>
          {badge}
        </div>
      )}
      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{title}</div>
      <div style={{ marginBottom: 4 }}>
        <span style={{ fontSize: 34, fontWeight: 800, color: '#1e5fe0', fontFamily: 'var(--font-display)' }}>{price}</span>
        {priceSuffix && <span style={{ fontSize: 13, color: 'var(--text-dim)', marginLeft: 4 }}>{priceSuffix}</span>}
      </div>
      {note && <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 16, lineHeight: 1.5 }}>{note}</div>}
      <div style={{ height: 1, background: 'var(--line)', margin: '16px 0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, flex: 1 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-soft)', alignItems: 'flex-start' }}>
            {CHECK}<span>{f}</span>
          </div>
        ))}
      </div>
      <Link href={ctaHref} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '12px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600,
        background: highlight ? '#1e5fe0' : 'transparent',
        color: highlight ? '#fff' : 'var(--text)',
        border: highlight ? 'none' : '1.5px solid var(--line)',
        textDecoration: 'none',
      }}>
        {cta}
      </Link>
    </div>
  )
}

function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 40 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1e5fe0', marginBottom: 10 }}>{eyebrow}</div>
      <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: 12, color: 'var(--text)' }}>{title}</h2>
      {sub && <p style={{ fontSize: 15, color: 'var(--text-soft)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>{sub}</p>}
    </div>
  )
}

type TableRow = { tier: string; price: string; includes: string }
function PriceTable({ rows }: { rows: TableRow[] }) {
  return (
    <div style={{ borderRadius: 14, border: '1px solid var(--line)', overflow: 'hidden', marginBottom: 8 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: 'var(--bg-card)', textAlign: 'left' }}>
            <th style={{ padding: '12px 18px', borderBottom: '1px solid var(--line)', fontWeight: 600 }}>Tier</th>
            <th style={{ padding: '12px 18px', borderBottom: '1px solid var(--line)', fontWeight: 600 }}>Price (AUD)</th>
            <th style={{ padding: '12px 18px', borderBottom: '1px solid var(--line)', fontWeight: 600 }}>What&apos;s included</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: '#fff' }}>
              <td style={{ padding: '12px 18px', borderBottom: '1px solid var(--line)', fontWeight: 600 }}>{r.tier}</td>
              <td style={{ padding: '12px 18px', borderBottom: '1px solid var(--line)', color: '#1e5fe0', fontWeight: 700, whiteSpace: 'nowrap' }}>{r.price}</td>
              <td style={{ padding: '12px 18px', borderBottom: '1px solid var(--line)', color: 'var(--text-soft)' }}>{r.includes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function PricingPage() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Pricing · SecurityBlogs',
        description: 'Transparent pricing for every SecurityBlogs service.',
        url: 'https://securityblogs.com.au/pricing/',
      }} />

      <main style={{ paddingTop: 100 }}>

        {/* Hero */}
        <section style={{ textAlign: 'center', padding: '60px 24px 48px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(30,95,224,0.08)', border: '1px solid rgba(30,95,224,0.2)', borderRadius: 99, padding: '6px 16px', fontSize: 12, fontWeight: 700, color: '#1e5fe0', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>
            Transparent Pricing
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', marginBottom: 16, color: 'var(--text)' }}>
            SEO, Paid Ads &amp; Local Search
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: 'var(--text-soft)', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            Monthly retainer services that drive leads for your security business — with no lock-in contracts.
          </p>
        </section>

        {/* ── Retainer Services ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 72px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <PlanCard
              title="Security SEO"
              price="from $1,500"
              priceSuffix="/month"
              features={[
                'Full technical SEO audit',
                'Keyword mapping & on-page optimisation',
                'Content creation & link building',
                'Local SEO & Google Business Profile',
                'Monthly reporting on every keyword',
                'No lock-in contracts',
              ]}
              cta="Book a free SEO audit →"
              ctaHref="/contact/"
            />
            <PlanCard
              title="Google Ads"
              price="from $1,500"
              priceSuffix="/month ad spend"
              note="Recommended min. $1,500–$3,000/mo ad spend"
              features={[
                'Campaign setup & keyword research',
                'Ad copy, extensions & landing pages',
                'Conversion tracking & bid management',
                'Weekly optimisation & monthly ROAS report',
                'No lock-in contracts',
              ]}
              cta="Book a free Ads audit →"
              ctaHref="/contact/"
              highlight
              badge="Fastest ROI"
            />
            <PlanCard
              title="GMB Profile"
              price="Custom"
              priceSuffix="quote"
              features={[
                'Full GBP setup & registration',
                'Google Maps verification support',
                'Category & service area optimisation',
                'Photo strategy & review management',
                'Monthly Google Posts & performance report',
                'Citation building (50+ directories)',
              ]}
              cta="Get a free GBP audit →"
              ctaHref="/contact/"
            />
          </div>
        </section>

        {/* ── AI Visibility Services ── */}
        <section style={{ background: 'var(--bg-card)', padding: '64px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <SectionHeading
              eyebrow="AI Visibility"
              title="AI Visibility Services"
              sub="Get cited by ChatGPT, Perplexity, Gemini and every major AI answer engine."
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {[
                {
                  title: 'AIO — AI Overviews Optimisation',
                  href: '/services/aio/',
                  features: ['AI citation audit', 'Entity & schema build-out', 'Citable content assets', 'Answer engine monitoring', 'Monthly AI visibility report'],
                },
                {
                  title: 'AEO — Answer Engine Optimisation',
                  href: '/services/aeo/',
                  features: ['Question-intent keyword mapping', 'Structured answer formatting', 'Featured snippet optimisation', 'Voice search readiness', 'Monthly AEO report'],
                },
                {
                  title: 'GEO — Generative Engine Optimisation',
                  href: '/services/geo/',
                  features: ['Brand entity authority build', 'Knowledge panel optimisation', 'AI trust signal strategy', 'Cross-platform entity consistency', 'Monthly GEO report'],
                },
              ].map((s) => (
                <div key={s.title} style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--line)', padding: '28px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#1e5fe0', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Custom</div>
                  <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 16 }}>quote — scoped to your goals</div>
                  <div style={{ height: 1, background: 'var(--line)', marginBottom: 16 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    {s.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-soft)', alignItems: 'flex-start' }}>
                        {CHECK}<span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={s.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '11px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600, color: 'var(--text)', border: '1.5px solid var(--line)', textDecoration: 'none' }}>
                    Learn more →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bing Ads ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px' }}>
          <SectionHeading
            eyebrow="Paid Media"
            title="Bing / Microsoft Ads"
            sub="Capture B2B security buyers on Microsoft search at 2× lower CPC than Google."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <PlanCard
              title="Bing Ads Management"
              price="from $800"
              priceSuffix="/month management fee"
              note="No markup on your ad spend — media budget goes straight to Microsoft."
              features={[
                'Campaign setup & keyword research',
                'Ad copy & audience targeting',
                'Microsoft Audience Network access',
                'Conversion tracking & bid management',
                'Monthly ROAS report',
                'No lock-in contracts',
              ]}
              cta="Get a Bing Ads quote →"
              ctaHref="/contact/"
            />
            <div style={{ background: 'rgba(30,95,224,0.04)', borderRadius: 20, border: '1px solid rgba(30,95,224,0.15)', padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1e5fe0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Why Bing?</div>
              {[
                'Avg CPC $8.40 vs Google\'s $17.60',
                '41% of B2B buyers search on Microsoft',
                'Less competition, faster results',
                'Ideal complement to Google Ads',
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-soft)', alignItems: 'flex-start' }}>
                  {CHECK}<span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Web Design ── */}
        <section style={{ background: 'var(--bg-card)', padding: '64px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <SectionHeading
              eyebrow="Web Design"
              title="Security Website Design"
              sub="AI-ready websites that rank, convert and get cited — fixed scope, no surprise add-ons."
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
              {[
                { range: '$3k – $8k', label: 'Starter', desc: 'Clean, fast security website with on-page SEO, schema and analytics setup.' },
                { range: '$8k – $20k', label: 'Growth', desc: 'Custom design, AI-visibility architecture, CRO, full content strategy and launch.' },
                { range: '$20k+', label: 'Enterprise', desc: 'Bespoke Next.js build, multiple service areas, AI citation framework and ongoing optimisation.' },
              ].map((t) => (
                <div key={t.label} style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--line)', padding: '24px 22px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#1e5fe0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{t.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: '#1e5fe0', fontFamily: 'var(--font-display)', marginBottom: 8 }}>{t.range}</div>
                  <div style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.55 }}>{t.desc}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-dim)', textAlign: 'center', marginTop: 20 }}>
              All builds include: strategy, UX, design, development, responsive layout, on-page SEO, schema, Core Web Vitals and analytics setup.
            </p>
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <Link href="/contact/" style={{ fontSize: 14, color: '#1e5fe0', fontWeight: 600 }}>Get a custom quote →</Link>
            </div>
          </div>
        </section>

        {/* ── Publishing ── */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px' }}>
          <SectionHeading
            eyebrow="Publish With Us"
            title="Publishing &amp; Content Placements"
            sub="One-time placements to build authority and backlinks on the SecurityBlogs platform."
          />

          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: 'var(--text)' }}>Guest Posting</h3>
          <PriceTable rows={[
            { tier: 'Standard submission', price: 'Free', includes: 'Editorial review, 1 dofollow link, byline credit' },
            { tier: 'Priority placement', price: '$99', includes: 'Faster review, homepage feature 3 days, 2 dofollow links' },
          ]} />

          <h3 style={{ fontSize: 16, fontWeight: 700, margin: '28px 0 12px', color: 'var(--text)' }}>Sponsored Posts</h3>
          <PriceTable rows={[
            { tier: 'Standard', price: '$149', includes: '1 dofollow link, permanent placement, social share, live in 3 days' },
            { tier: 'Featured Homepage', price: '$299', includes: 'Homepage feature 7 days, 2 dofollow links, newsletter mention' },
            { tier: 'Authority Series', price: '$1,250', includes: '5-article series, homepage + category features, 3 links each, quarterly refresh' },
          ]} />

          <h3 style={{ fontSize: 16, fontWeight: 700, margin: '28px 0 12px', color: 'var(--text)' }}>Press Release</h3>
          <PriceTable rows={[
            { tier: 'Single release', price: '$199', includes: 'Editorial review, permanent SEO page, up to 2 dofollow links, social + newsletter' },
            { tier: '3-release bundle', price: '$499', includes: 'Three releases at a discount, priority review' },
          ]} />

          <h3 style={{ fontSize: 16, fontWeight: 700, margin: '28px 0 12px', color: 'var(--text)' }}>Backlink Packages</h3>
          <PriceTable rows={[
            { tier: 'Starter', price: '$199', includes: '1 sponsored placement on an established security-niche domain, permanent' },
            { tier: 'Growth', price: '$549', includes: '3 sponsored placements on established security-niche pages, anchor control, reporting' },
            { tier: 'Authority', price: '$1,290', includes: '8 sponsored placements in full editorial articles on established security-niche pages, detailed report' },
          ]} />

          <h3 style={{ fontSize: 16, fontWeight: 700, margin: '28px 0 12px', color: 'var(--text)' }}>Product Promotion</h3>
          <PriceTable rows={[
            { tier: 'Spotlight', price: '$249', includes: '1 product review, 1 dofollow link, social share' },
            { tier: 'Featured Review', price: '$499', includes: 'Review + comparison, homepage feature, 2 links, video embed' },
            { tier: 'Launch Campaign', price: '$1,450', includes: "Review + comparison + demo, buyer's guide, 3 links, 90-day promotion" },
          ]} />

          <h3 style={{ fontSize: 16, fontWeight: 700, margin: '28px 0 12px', color: 'var(--text)' }}>Advertising</h3>
          <PriceTable rows={[
            { tier: 'Newsletter Sponsor', price: '$249 / send', includes: 'Dedicated slot to 24K+ subscribers' },
            { tier: 'Homepage Banner', price: '$650 / month', includes: 'Top-of-page banner across the homepage' },
            { tier: 'Category Takeover', price: '$900 / month', includes: 'Banner + sponsored label across a full category' },
          ]} />

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/publish-with-us/pricing-guidelines/" style={{ fontSize: 14, color: '#1e5fe0', fontWeight: 600 }}>View full editorial guidelines →</Link>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: 'var(--bg-card)', textAlign: 'center', padding: '64px 24px' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: 12, color: 'var(--text)' }}>Not sure which service fits?</h2>
          <p style={{ fontSize: 15, color: 'var(--text-soft)', maxWidth: 480, margin: '0 auto 28px', lineHeight: 1.6 }}>Book a free strategy call — we&apos;ll map the right services to your goals and budget.</p>
          <Link href="/contact/" className="btn btn-primary" style={{ fontSize: 15, padding: '14px 28px' }}>Book free strategy call →</Link>
        </section>

      </main>
    </>
  )
}
