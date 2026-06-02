import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import SectionHead from '@/components/ui/SectionHead'
import CTABand from '@/components/ui/CTABand'
import Reveal, { Stagger, Item } from '@/components/ui/Reveal'
import Breadcrumb from '@/components/ui/Breadcrumb'
import JsonLd from '@/components/JsonLd'
import { itemListSchema } from '@/lib/schema'
import { services } from '@/lib/site'
import { ServiceFace } from '../service-card-faces'

export const metadata = {
  title: 'AI-Powered Growth Services for Security Brands',
  description:
    'From SEO to AI citations, Google Ads to web design — every SecurityBlogs service is engineered exclusively for the security industry.',
  alternates: { canonical: '/services/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/services/' },
}

const benefits: Record<string, string[]> = {
  'security-seo': [
    'Rank for high-intent buyer keywords',
    'Technical + on-page + content built for security',
    'Local & national domination',
  ],
  aio: [
    'Engineered to be cited by ChatGPT & Perplexity',
    'Entity & schema foundations',
    'Citable, authoritative content assets',
  ],
  aeo: [
    'Win featured answers & snippets',
    'Structured FAQ & Q&A optimisation',
    'Answer-first content architecture',
  ],
  geo: [
    'Build a verified knowledge-graph entity',
    'Cross-platform authority signals',
    'Wikidata & directory presence',
  ],
  'google-ads': [
    'Security-buyer keyword targeting',
    'Conversion-optimised landing pages',
    'Transparent ROAS reporting',
  ],
  'bing-ads': [
    'Reach 41% of B2B Microsoft searchers',
    'Lower CPCs, higher-intent clicks',
    'Cross-network retargeting',
  ],
  'web-design': [
    'AI-ready, schema-rich builds',
    'Fast, Core Web Vitals optimised',
    'Conversion-focused UX',
  ],
}

const statChip: Record<string, string> = {
  'security-seo': '+180% organic traffic',
  aio: '87% AI citation rate',
  aeo: '3.4× featured answers',
  geo: 'Verified entity in 90 days',
  'google-ads': '3.2× average ROAS',
  'bing-ads': '41% lower CPC',
  'web-design': '2.1× conversion lift',
}

const why = [
  { icon: '🛡️', title: 'Security-exclusive', desc: 'We work only with security brands — we know your buyers, your jargon and your compliance.' },
  { icon: '🤖', title: 'AI-native approach', desc: 'Every service is built so AI answer engines discover, trust and cite your brand.' },
  { icon: '📈', title: 'Proven results', desc: '50+ security brands, +180% average organic growth and an 87% AI citation rate.' },
  { icon: '⚙️', title: 'Full-stack team', desc: 'SEO, AIO, paid media, content and engineering under one roof — no agency hand-offs.' },
]

export default function ServicesPage() {
  return (
    <>
      <HeroBg grid>
        <Reveal>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
          <span className="badge badge-blue" style={{ marginBottom: 22 }}>
            <span className="dot dot-pulse" /> 7 SERVICES · ONE GROWTH ENGINE
          </span>
          <h1 className="h1" style={{ marginBottom: 20, maxWidth: 880 }}>
            AI-Powered Growth Services for{' '}
            <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Security Brands</span>
          </h1>
          <p className="lead" style={{ maxWidth: 640, marginBottom: 28 }}>
            From SEO to AI citations, Google Ads to web design — every service is built exclusively
            for the security industry.
          </p>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Get your free audit →</MagneticButton>
            <MagneticButton href="/book-strategy-call/" className="btn btn-outline btn-lg">Book a strategy call</MagneticButton>
          </div>
        </Reveal>
      </HeroBg>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What we do"
            title="Every channel security buyers use to discover you."
            sub="Pick a single service or run the full stack. Each one compounds the others into unstoppable AI visibility."
          />
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 22 }}>
            {services.map((s) => (
              <Item key={s.slug}>
                {/* Live face — same visual the homepage card stack shows.
                    Renders its own background + title + description + CTA;
                    we just give it the right slug and route. */}
                <div
                  style={{
                    height: 320,
                    borderRadius: 18,
                    overflow: 'hidden',
                    boxShadow: '0 12px 30px -10px rgba(18, 42, 86, 0.18)',
                    border: '1px solid var(--line)',
                  }}
                >
                  <ServiceFace
                    slug={s.slug}
                    title={s.title}
                    description={s.desc}
                    href={`/services/${s.slug}/`}
                  />
                </div>
              </Item>
            ))}
          </Stagger>

          {/* Compact "what's included" strip — keeps the benefits + stat
              info the old cards carried, without re-introducing visual
              clutter on the live cards themselves. */}
          <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {services.map((s) => (
              <div
                key={s.slug}
                style={{
                  padding: 18,
                  border: '1px solid var(--line)',
                  borderRadius: 14,
                  background: 'var(--bg-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <strong style={{ fontSize: 14, color: 'var(--text)' }}>{s.title}</strong>
                <span className="chip" style={{ alignSelf: 'flex-start' }}>📊 {statChip[s.slug]}</span>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {benefits[s.slug].map((b, i) => (
                    <li key={i} style={{ fontSize: 13.5, color: 'var(--text-soft)', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                      <span style={{ color: 'var(--blue)' }}>✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Why SecurityBlogs?" title="Built differently — for one industry, for the AI era." />
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {why.map((w) => (
              <Item key={w.title}>
                <div className="glass" style={{ padding: 26, height: '100%' }}>
                  <div style={{ fontSize: 30, marginBottom: 14 }}>{w.icon}</div>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>{w.title}</h4>
                  <p className="text-soft" style={{ fontSize: 14 }}>{w.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <JsonLd data={itemListSchema({
        name: 'SecurityBlogs services',
        path: '/services/',
        items: services.map(s => ({
          name: s.title,
          url: `/services/${s.slug}/`,
          description: s.desc,
        })),
      })} />
      <CTABand
        title="Not sure which service you need?"
        subtitle="Get a free AI visibility audit and we'll show you exactly which channels will move the needle fastest for your security brand."
        ctaLabel="Get your free audit →"
        ctaHref="/contact/"
      />
    </>
  )
}
