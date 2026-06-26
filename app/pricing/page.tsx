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
      <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: 12, color: 'var(--text)' }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {sub && <p style={{ fontSize: 15, color: 'var(--text-soft)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>{sub}</p>}
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
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 72px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
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
              title="GMB / Local SEO"
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
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <SectionHeading
              eyebrow="AI Visibility"
              title="AI Visibility Services"
              sub="Get cited by ChatGPT, Perplexity, Gemini and every major AI answer engine."
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
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
                <div key={s.title} style={{
                  background: '#fff', borderRadius: 20, border: '1px solid var(--line)',
                  padding: '32px 28px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontSize: 34, fontWeight: 800, color: '#1e5fe0', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Custom</div>
                  <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 4 }}>quote — scoped to your goals</div>
                  <div style={{ height: 1, background: 'var(--line)', margin: '16px 0' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, flex: 1 }}>
                    {s.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-soft)', alignItems: 'flex-start' }}>
                        {CHECK}<span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={s.href} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '12px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600,
                    color: 'var(--text)', border: '1.5px solid var(--line)', textDecoration: 'none',
                  }}>
                    Learn more →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bing Ads ── */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
          <SectionHeading
            eyebrow="Paid Media"
            title="Bing / Microsoft Ads"
            sub="Capture B2B security buyers on Microsoft search at lower CPC than Google."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
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
            <div style={{
              background: '#fff', borderRadius: 20, border: '1px solid var(--line)',
              padding: '32px 28px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Why Add Bing?</div>
              <div style={{ fontSize: 34, fontWeight: 800, color: '#1e5fe0', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Lower CPC</div>
              <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 4 }}>more budget, less competition</div>
              <div style={{ height: 1, background: 'var(--line)', margin: '16px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, flex: 1 }}>
                {[
                  '41% of B2B buyers search on Microsoft',
                  'Less competition, faster results',
                  'LinkedIn-profile audience targeting',
                  'Ideal complement to Google Ads',
                  'Microsoft Clarity heatmaps included',
                ].map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-soft)', alignItems: 'flex-start' }}>
                    {CHECK}<span>{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/services/bing-ads/" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '12px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600,
                color: 'var(--text)', border: '1.5px solid var(--line)', textDecoration: 'none',
              }}>
                Learn more →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Web Design ── */}
        <section style={{ background: 'var(--bg-card)', padding: '64px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <SectionHeading
              eyebrow="Web Design"
              title="Security Website Design"
              sub="AI-ready websites that rank, convert and get cited — fixed scope, no surprise add-ons."
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              <PlanCard
                title="Starter Website"
                price="$3k – $8k"
                note="Fixed scope, single project fee"
                features={[
                  'Clean, fast security website',
                  'On-page SEO for all service pages',
                  'Schema markup & analytics setup',
                  'Responsive mobile-first design',
                  'Core Web Vitals optimised',
                  'Google Search Console setup',
                ]}
                cta="Get a quote →"
                ctaHref="/contact/"
              />
              <PlanCard
                title="Growth Website"
                price="$8k – $20k"
                note="Fixed scope, single project fee"
                features={[
                  'Custom design & AI-visibility architecture',
                  'Conversion rate optimisation (CRO)',
                  'Full content strategy & copywriting',
                  'Service-area page framework',
                  'Entity schema & AI citation setup',
                  'Launch + 30-day post-launch support',
                ]}
                cta="Get a quote →"
                ctaHref="/contact/"
                highlight
                badge="Most Popular"
              />
              <PlanCard
                title="Enterprise Website"
                price="$20k+"
                note="Fixed scope, single project fee"
                features={[
                  'Bespoke Next.js build',
                  'Multiple service areas & locations',
                  'Full AI citation framework',
                  'Ongoing optimisation retainer included',
                  'Custom integrations & portals',
                  'Dedicated project manager',
                ]}
                cta="Get a quote →"
                ctaHref="/contact/"
              />
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-dim)', textAlign: 'center', marginTop: 24 }}>
              All builds include: strategy, UX, design, development, responsive layout, on-page SEO, schema, Core Web Vitals and analytics setup.
            </p>
          </div>
        </section>

        {/* ── Publishing ── */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
          <SectionHeading
            eyebrow="Publish With Us"
            title="Publishing &amp; Content Placements"
            sub="One-time placements to build authority and backlinks on the SecurityBlogs platform."
          />

          {[
            {
              category: 'Guest Posting',
              href: '/publish-with-us/guest-posting/',
              tiers: [
                { tier: 'Standard submission', price: 'Free', note: 'no upfront cost', includes: ['Editorial review & feedback', '1 dofollow backlink', 'Byline credit + author bio', 'Published in relevant category'] },
                { tier: 'Priority placement', price: '$99', note: 'one-time', includes: ['Faster editorial review', 'Homepage feature for 3 days', '2 dofollow backlinks', 'Social share on all channels'] },
              ],
            },
            {
              category: 'Sponsored Posts',
              href: '/publish-with-us/sponsored-posts/',
              tiers: [
                { tier: 'Standard', price: '$149', note: 'one-time', includes: ['1 dofollow backlink', 'Permanent placement', 'Social share', 'Live in 3 business days'] },
                { tier: 'Featured Homepage', price: '$299', note: 'one-time', includes: ['Homepage feature for 7 days', '2 dofollow backlinks', 'Newsletter mention to subscribers', 'Social share on all channels'] },
                { tier: 'Authority Series', price: '$1,250', note: 'one-time', includes: ['5-article editorial series', 'Homepage + category features', '3 dofollow links per article', 'Quarterly content refresh'] },
              ],
            },
            {
              category: 'Press Release',
              href: '/publish-with-us/sponsored-posts/',
              tiers: [
                { tier: 'Single release', price: '$199', note: 'one-time', includes: ['Editorial review & polish', 'Permanent SEO page', 'Up to 2 dofollow backlinks', 'Social share + newsletter inclusion'] },
                { tier: '3-release bundle', price: '$499', note: 'bundle saving', includes: ['Three press releases', 'Priority editorial review', 'Permanent SEO pages for all three', 'Bulk discount applied'] },
              ],
            },
            {
              category: 'Backlink Packages',
              href: '/publish-with-us/backlink-packages/',
              tiers: [
                { tier: 'Starter', price: '$199', note: 'one-time', includes: ['1 sponsored placement', 'Established security-niche domain', 'Permanent placement', 'Anchor text control'] },
                { tier: 'Growth', price: '$549', note: 'one-time', includes: ['3 sponsored placements', 'Established security-niche pages', 'Full anchor text control', 'Placement report delivered'] },
                { tier: 'Authority', price: '$1,290', note: 'one-time', includes: ['8 sponsored placements', 'Full editorial articles on niche pages', 'Detailed placement & metrics report', 'Quarterly link audit included'] },
              ],
            },
            {
              category: 'Product Promotion',
              href: '/publish-with-us/product-promotion/',
              tiers: [
                { tier: 'Spotlight', price: '$249', note: 'one-time', includes: ['1 product review article', '1 dofollow backlink', 'Social share on all channels', 'Permanent placement'] },
                { tier: 'Featured Review', price: '$499', note: 'one-time', includes: ['Review + competitor comparison', 'Homepage feature slot', '2 dofollow backlinks', 'Video embed support'] },
                { tier: 'Launch Campaign', price: '$1,450', note: 'one-time', includes: ["Review + comparison + product demo", "Buyer's guide feature", '3 dofollow backlinks', '90-day category promotion'] },
              ],
            },
            {
              category: 'Advertising',
              href: '/publish-with-us/advertise/',
              tiers: [
                { tier: 'Newsletter Sponsor', price: '$249', note: 'per send', includes: ['Dedicated sponsor slot', '24K+ subscriber list', 'Plain-text or HTML format', 'Performance report included'] },
                { tier: 'Homepage Banner', price: '$650', note: 'per month', includes: ['Top-of-page banner placement', 'Desktop + mobile ad served', 'Click-through tracking', 'Monthly impressions report'] },
                { tier: 'Category Takeover', price: '$900', note: 'per month', includes: ['Banner across a full category', 'Sponsored label on relevant posts', 'Desktop + mobile delivery', 'Monthly performance report'] },
              ],
            },
          ].map((group) => (
            <div key={group.category} style={{ marginBottom: 56 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: 20, color: 'var(--text)' }}>{group.category}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                {group.tiers.map((t) => (
                  <div key={t.tier} style={{
                    background: '#fff',
                    border: '1px solid var(--line)',
                    borderRadius: 20,
                    padding: '32px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{t.tier}</div>
                    <div style={{ marginBottom: 4 }}>
                      <span style={{ fontSize: 34, fontWeight: 800, color: '#1e5fe0', fontFamily: 'var(--font-display)' }}>{t.price}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 4 }}>{t.note}</div>
                    <div style={{ height: 1, background: 'var(--line)', margin: '16px 0' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, flex: 1 }}>
                      {t.includes.map((f, i) => (
                        <div key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-soft)', alignItems: 'flex-start' }}>
                          {CHECK}<span>{f}</span>
                        </div>
                      ))}
                    </div>
                    <Link href={group.href} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: '12px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600,
                      color: 'var(--text)', border: '1.5px solid var(--line)', textDecoration: 'none',
                    }}>
                      Learn more →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: 8 }}>
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
