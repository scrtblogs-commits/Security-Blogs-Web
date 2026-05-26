import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import GlassCard from '@/components/ui/GlassCard'
import AnimatedSVGTimeline from '@/components/ui/AnimatedSVGTimeline'
import CTABand from '@/components/ui/CTABand'
import Reveal, { Stagger, Item } from '@/components/ui/Reveal'

export const metadata = {
  title: 'About Us · SecurityBlogs',
  description: 'A specialist AI visibility and SEO agency built exclusively for the security industry. Meet the team that gets security brands found.',
}

const team = [
  { name: 'Sarah Chen', role: 'AI Visibility Lead', initials: 'SC', color: 'var(--violet)', chips: ['AIO', 'AEO', 'Schema'] },
  { name: 'Marcus Webb', role: 'Security SEO Director', initials: 'MW', color: 'var(--blue)', chips: ['Technical SEO', 'Link Building', 'Local SEO'] },
  { name: 'Priya Nair', role: 'Paid Media Strategist', initials: 'PN', color: 'var(--red)', chips: ['Google Ads', 'Bing Ads', 'Analytics'] },
  { name: 'Jordan Blake', role: 'Web Architect', initials: 'JB', color: 'var(--green)', chips: ['Next.js', 'Core Web Vitals', 'AI Architecture'] },
]

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
      <HeroBg grid blobs>
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
          <SectionHead eyebrow="Who we are" title="A small, senior team. Zero hand-offs." sub="Every specialist you meet is the one doing the work — no juniors, no churn." />
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {team.map((m) => (
              <Item key={m.name}>
                <GlassCard tilt glow style={{ height: '100%', textAlign: 'center' }}>
                  <div style={{ width: 78, height: 78, borderRadius: '50%', margin: '0 auto 16px', display: 'grid', placeItems: 'center', fontSize: 26, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)', background: `linear-gradient(135deg, ${m.color}, var(--blue))` }}>
                    {m.initials}
                  </div>
                  <h3 style={{ fontSize: 19, marginBottom: 4 }}>{m.name}</h3>
                  <p className="accent" style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 16 }}>{m.role}</p>
                  <div className="flex flex-wrap justify-center gap-2" style={{ marginBottom: 18 }}>
                    {m.chips.map((c) => <span key={c} className="chip">{c}</span>)}
                  </div>
                  <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`} style={{ display: 'inline-grid', placeItems: 'center', width: 34, height: 34, borderRadius: 9, background: 'rgba(30,95,224,0.1)', color: 'var(--blue)', fontWeight: 800, fontSize: 13, border: '1px solid var(--line)' }}>
                    in
                  </a>
                </GlassCard>
              </Item>
            ))}
          </Stagger>
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
                  <div style={{ fontSize: 30, marginBottom: 14 }}>{v.icon}</div>
                  <h3 style={{ fontSize: 20, marginBottom: 8 }}>{v.title}</h3>
                  <p className="text-soft" style={{ fontSize: 14.5 }}>{v.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <CTABand title="Work with a team that understands security." subtitle="Get a free AI visibility audit and a 90-day roadmap built specifically for your security brand." ctaHref="/book-strategy-call/" />
    </>
  )
}
