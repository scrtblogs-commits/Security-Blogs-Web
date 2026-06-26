import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Pricing · SecurityBlogs',
  description: 'Transparent pricing for every SecurityBlogs service — SEO, Google Ads, GMB, publishing and more. No lock-in contracts.',
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
      gap: 0,
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
        <span style={{ fontSize: 36, fontWeight: 800, color: '#1e5fe0', fontFamily: 'var(--font-display)' }}>{price}</span>
        {priceSuffix && <span style={{ fontSize: 14, color: 'var(--text-dim)', marginLeft: 4 }}>{priceSuffix}</span>}
      </div>
      {note && <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 20, lineHeight: 1.5 }}>{note}</div>}
      <div style={{ height: 1, background: 'var(--line)', margin: '16px 0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, flex: 1 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-soft)', alignItems: 'flex-start' }}>
            {CHECK}
            <span>{f}</span>
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
          <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'var(--text-soft)', maxWidth: 560, margin: '0 auto 12px', lineHeight: 1.6 }}>
            Monthly retainer services that drive leads for your security business — with no lock-in contracts.
          </p>
        </section>

        {/* SEO + Ads + GMB cards */}
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

        {/* Publishing pricing */}
        <section style={{ background: 'var(--bg-card)', padding: '64px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 40, textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1e5fe0', marginBottom: 10 }}>Publish With Us</div>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: 12, color: 'var(--text)' }}>Publishing &amp; Content Placements</h2>
              <p style={{ fontSize: 15, color: 'var(--text-soft)', maxWidth: 520, margin: '0 auto' }}>One-time placements to build authority and backlinks on the SecurityBlogs platform.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
              {[
                { title: 'Guest Post — Standard', price: 'Free', desc: 'Editorial review, 1 dofollow link, byline credit', href: '/publish-with-us/guest-posting/' },
                { title: 'Guest Post — Priority', price: '$99', desc: 'Faster review, homepage feature 3 days, 2 dofollow links', href: '/publish-with-us/guest-posting/' },
                { title: 'Sponsored Post — Standard', price: '$149', desc: '1 dofollow link, permanent placement, social share', href: '/publish-with-us/sponsored-posts/' },
                { title: 'Sponsored Post — Featured', price: '$299', desc: 'Homepage feature 7 days, 2 dofollow links, newsletter mention', href: '/publish-with-us/sponsored-posts/' },
                { title: 'Press Release', price: '$199', desc: 'Permanent SEO page, up to 2 dofollow links, social + newsletter', href: '/publish-with-us/' },
                { title: 'Backlink Package', price: 'From $149', desc: 'Contextual dofollow links in existing high-authority articles', href: '/publish-with-us/backlink-packages/' },
              ].map((item) => (
                <Link key={item.title} href={item.href} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--line)', padding: '22px 22px', height: '100%', transition: 'box-shadow 0.15s' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#1e5fe0', fontFamily: 'var(--font-display)', marginBottom: 4 }}>{item.price}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <Link href="/publish-with-us/pricing-guidelines/" style={{ fontSize: 14, color: '#1e5fe0', fontWeight: 600 }}>View full pricing guidelines →</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', padding: '64px 24px' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: 12, color: 'var(--text)' }}>Not sure which service fits?</h2>
          <p style={{ fontSize: 15, color: 'var(--text-soft)', maxWidth: 480, margin: '0 auto 28px', lineHeight: 1.6 }}>Book a free strategy call — we'll map the right services to your goals and budget.</p>
          <Link href="/contact/" className="btn btn-primary" style={{ fontSize: 15, padding: '14px 28px' }}>Book free strategy call →</Link>
        </section>

      </main>
    </>
  )
}
