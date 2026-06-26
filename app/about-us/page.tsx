import Glyph from '@/components/ui/Glyph'
import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import GlassCard from '@/components/ui/GlassCard'
import AnimatedSVGTimeline from '@/components/ui/AnimatedSVGTimeline'
import CTABand from '@/components/ui/CTABand'
import Reveal, { Stagger, Item } from '@/components/ui/Reveal'
import JsonLd from '@/components/JsonLd'
import { aboutPageSchema } from '@/lib/schema'

export const metadata = {
  title: 'About Us',
  description: 'A specialist AI visibility and SEO agency built exclusively for the security industry. Meet the founder behind SecurityBlogs.',
  alternates: { canonical: '/about-us/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/about-us/' },
}

// Single named founder per Phase B of seo-final-2026-05 (placeholder team
// removed). The Person schema for Yousif Jonaid is already emitted sitewide
// from app/layout.tsx via the siteSchema @graph (@id #founder), so we don't
// re-emit it here — we just render the founder card UI.
const founder = {
  name: 'Yousif Jonaid',
  title: 'Founder & Director, SecurityBlogs',
  initials: 'YJ',
  color: 'var(--blue)',
  linkedin: 'https://www.linkedin.com/in/yousif-jonaid-55893b361',
  bio: "Yousif Jonaid is the Founder and Director of SecurityBlogs, Australia's specialist AI visibility, SEO and authority publishing platform for the security industry. With a background spanning digital marketing and the physical and cyber security sectors, Yousif launched SecurityBlogs in 2025 to fill a critical gap: a dedicated growth platform built specifically for security companies, integrators, MSSPs and manufacturers. SecurityBlogs is headquartered in Australia and operates as a distributed virtual team, with specialists based in the Philippines and Pakistan — giving us global execution capacity while remaining an Australian-led, Australian-focused agency.",
}

const timeline = [
  { phase: 'Foundation', title: 'Domain & Hosting Audit', desc: 'We inspect domain authority, hosting performance and crawl health before anything else.' },
  { phase: 'Foundation', title: 'Technical SEO', desc: 'Core Web Vitals, indexation, sitemaps and a fast, AI-readable architecture.' },
  { phase: 'On-Page', title: 'Keyword & Entity Mapping', desc: 'We map high-intent security queries and the entities AI must associate with your brand.' },
  { phase: 'On-Page', title: 'Content Architecture', desc: 'Topical clusters and citable pages structured for both search and answer engines.' },
  { phase: 'AI Visibility', title: 'Schema & Structured Data', desc: 'Rich structured data so AI platforms understand exactly who you are and what you do.' },
  { phase: 'AI Visibility', title: 'AI Citation Optimisation', desc: 'We engineer content AI models trust, quote and recommend by name.' },
  { phase: 'Authority', title: 'Authority Link Building', desc: 'Earned links from security publications that compound your domain trust.' },
  { phase: 'Paid', title: 'Google & Bing Ads', desc: 'High-intent PPC campaigns tuned for qualified security buyers and strong ROAS.' },
  { phase: 'Growth', title: 'AI Platform Monitoring', desc: 'Continuous tracking of citations across ChatGPT, Gemini, Perplexity and more.' },
  { phase: 'Growth', title: 'Monthly Reporting & Scale', desc: 'Transparent reporting and a roadmap to expand into new markets and clusters.' },
]

const values = [
  { icon: '🤖', title: 'AI-First Thinking', desc: 'We optimise for the answer engines buyers actually use — not just the blue links of 2015.' },
  { icon: '🛡️', title: 'Security Industry Experts', desc: 'We speak installer, integrator and monitoring fluently, so strategy lands from day one.' },
  { icon: '⚡', title: 'Full-Stack Growth', desc: 'SEO, AIO, paid media and web — one team owning every surface where buyers decide.' },
]

export default function AboutPage() {
  return (
    <>
      <HeroBg grid>
        <div className="center mx-auto" style={{ maxWidth: 760 }}>
          <Reveal>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
            <span className="badge badge-blue" style={{ marginBottom: 22 }}>
              <span className="dot dot-pulse" /> SPECIALIST · SECURITY INDUSTRY
            </span>
            <h1 className="h1" style={{ marginBottom: 20 }}>
              The team that gets security brands{' '}
              <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>found</span>.
            </h1>
            <p className="lead mx-auto" style={{ maxWidth: 580 }}>
              We&apos;re a specialist AI visibility and SEO agency built exclusively for the security industry.
            </p>
          </Reveal>
        </div>
      </HeroBg>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Leadership" title="Founder & Director" sub="One named owner. Direct, senior accountability on every brief." />
          <Reveal>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              <GlassCard glow>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'flex-start' }}>
                  <div
                    aria-hidden="true"
                    style={{
                      width: 120, height: 120, borderRadius: '50%',
                      display: 'grid', placeItems: 'center',
                      fontSize: 38, fontWeight: 800, color: '#fff',
                      fontFamily: 'var(--font-display)',
                      background: `linear-gradient(135deg, ${founder.color}, var(--violet))`,
                      flexShrink: 0,
                    }}
                  >
                    {founder.initials}
                  </div>
                  <div style={{ flex: '1 1 320px', minWidth: 0 }}>
                    <h3 style={{ fontSize: 24, marginBottom: 6 }}>{founder.name}</h3>
                    <p className="accent" style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>{founder.title}</p>
                    <p className="text-soft" style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 22 }}>
                      {founder.bio}
                    </p>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${founder.name} on LinkedIn`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        padding: '10px 16px', borderRadius: 10,
                        background: 'rgba(30,95,224,0.1)', color: 'var(--blue)',
                        fontWeight: 600, fontSize: 14,
                        border: '1px solid var(--line)',
                      }}
                    >
                      <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </GlassCard>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Where We Operate" title="Australian-headquartered. Globally distributed." sub="We are an Australian business operating as a lean, virtual team — with specialists across Australia, the Philippines and Pakistan." />
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, maxWidth: 960, margin: '0 auto' }}>
              {[
                { flag: '🇦🇺', country: 'Australia', role: 'Headquarters', detail: 'Strategy, client leadership, account management and business direction are all run from Australia.' },
                { flag: '🇵🇭', country: 'Philippines', role: 'Virtual Team', detail: 'Content production, SEO execution, research and digital operations specialists.' },
                { flag: '🇵🇰', country: 'Pakistan', role: 'Virtual Team', detail: 'Technical SEO, web development, schema implementation and data analysis.' },
              ].map((loc) => (
                <div key={loc.country} className="card" style={{ textAlign: 'center', padding: '28px 24px' }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>{loc.flag}</div>
                  <div style={{ fontWeight: 800, fontSize: 18, fontFamily: 'var(--font-display)', marginBottom: 4, color: 'var(--text)' }}>{loc.country}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 12 }}>{loc.role}</div>
                  <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.6, margin: 0 }}>{loc.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Our process" title="How We Work" sub="A proven 10-step engine that takes security brands from invisible to authority across search and AI." />
          <AnimatedSVGTimeline steps={timeline} gradient="linear-gradient(180deg, var(--blue), var(--violet))" />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="What drives us" title="The values behind every campaign." />
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {values.map((v) => (
              <Item key={v.title}>
                <div className="card" style={{ height: '100%' }}>
                  <div style={{ fontSize: 30, marginBottom: 14 }}><Glyph icon={v.icon} size={22} /></div>
                  <h3 style={{ fontSize: 20, marginBottom: 8 }}>{v.title}</h3>
                  <p className="text-soft" style={{ fontSize: 14.5 }}>{v.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <JsonLd data={aboutPageSchema({
        path: '/about-us/',
        description: 'A specialist AI visibility and SEO agency built exclusively for the security industry.',
      })} />
      <CTABand title="Work with a team that understands security." subtitle="Get a free AI visibility audit and a 90-day roadmap built specifically for your security brand." ctaHref="/book-strategy-call/" />
    </>
  )
}
