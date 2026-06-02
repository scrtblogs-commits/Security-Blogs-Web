import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import GlassCard from '@/components/ui/GlassCard'
import CTABand from '@/components/ui/CTABand'
import Reveal, { Stagger, Item } from '@/components/ui/Reveal'
import ApplicationForm from './ApplicationForm'

export const metadata = {
  title: 'Careers',
  description: 'Work at the frontier of AI and security. Remote-first, flexible and AI-forward roles at a specialist security-industry growth agency.',
  alternates: { canonical: '/career/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/career/' },
}

const roleBadges = ['AI Content Strategist', 'Security SEO Specialist', 'Paid Media Manager', 'Full-Stack Developer', 'GEO & Entity Specialist', 'Business Development']

const jobs = [
  {
    title: 'AI Content Strategist',
    color: 'var(--violet)',
    chips: ['Remote', 'Full-time'],
    responsibilities: [
      'Design citable content architectures that AI answer engines trust and quote.',
      'Map entities and topical clusters for security-industry clients.',
      'Partner with SEO and GEO specialists to maximise AI citation rates.',
    ],
  },
  {
    title: 'Security SEO Specialist',
    color: 'var(--blue)',
    chips: ['Remote', 'Full-time'],
    responsibilities: [
      'Own technical and on-page SEO for security installers, integrators and manufacturers.',
      'Run keyword and competitor research for high-intent security queries.',
      'Build and execute link-authority campaigns with security publications.',
    ],
  },
  {
    title: 'Paid Media Manager',
    color: 'var(--yellow)',
    chips: ['Remote', 'Full-time'],
    responsibilities: [
      'Plan and optimise Google and Bing Ads campaigns for strong ROAS.',
      'Build conversion-focused landing experiences for security buyers.',
      'Report transparently on spend, pipeline and qualified-lead quality.',
    ],
  },
  {
    title: 'Full-Stack Developer (Next.js)',
    color: 'var(--green)',
    chips: ['Remote', 'Contract'],
    responsibilities: [
      'Build fast, AI-ready Next.js sites with excellent Core Web Vitals.',
      'Implement structured data and schema for AI visibility.',
      'Ship polished, motion-rich interfaces with TypeScript and React.',
    ],
  },
  {
    title: 'GEO & Entity Specialist',
    color: 'var(--red)',
    chips: ['Remote', 'Part-time'],
    responsibilities: [
      'Establish and confirm brand entities across major AI platforms.',
      'Win knowledge panels and grow branded search demand.',
      'Monitor and improve citation accuracy across ChatGPT, Gemini and Perplexity.',
    ],
  },
  {
    title: 'Business Development Manager',
    color: 'var(--blue)',
    chips: ['AU/UK', 'Full-time'],
    responsibilities: [
      'Build relationships with security brands across AU and UK markets.',
      'Run discovery and strategy calls that convert into long-term partnerships.',
      'Work with delivery teams to scope and price high-value engagements.',
    ],
  },
]

const values = [
  { icon: '🌍', title: 'Remote-first culture', desc: 'Work from anywhere with flexible hours and async-friendly collaboration built in.' },
  { icon: '🤖', title: 'AI-forward thinking', desc: 'We live on the cutting edge of answer engines and AI visibility — every single day.' },
  { icon: '🔒', title: 'Security industry focus', desc: 'Deep specialisation means meaningful work for clients who genuinely value expertise.' },
]

export default function CareerPage() {
  return (
    <>
      <HeroBg grid>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Career' }]} />
        <div className="grid-2" style={{ alignItems: 'center', gap: 48 }}>
          <Reveal>
            <span className="badge badge-blue" style={{ marginBottom: 22 }}>
              <span className="dot dot-pulse" /> WE&apos;RE HIRING
            </span>
            <h1 className="h1" style={{ marginBottom: 20 }}>
              Work at the Frontier of{' '}
              <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>AI</span> + Security.
            </h1>
            <p className="lead" style={{ maxWidth: 520, marginBottom: 24 }}>
              Join a small, senior team building the future of how security brands get discovered, compared and chosen across search and AI.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Remote', 'Flexible', 'AI-forward'].map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              {roleBadges.map((r, i) => (
                <Item key={r}>
                  <div className="card float" style={{ animationDelay: `${i * 0.4}s`, padding: 18, fontSize: 14, fontWeight: 600 }}>
                    <span className="dot dot-pulse" style={{ marginRight: 8 }} />
                    {r}
                  </div>
                </Item>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </HeroBg>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Open roles" title="Find your seat at the table." sub="Six ways to join the team that makes security brands the answer AI gives." />
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {jobs.map((j) => (
              <Item key={j.title}>
                <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: 20, marginBottom: 12 }}>{j.title}</h3>
                  <div className="flex flex-wrap gap-2" style={{ marginBottom: 16 }}>
                    {j.chips.map((c) => <span key={c} className="chip" style={{ borderColor: j.color, color: j.color }}>{c}</span>)}
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {j.responsibilities.map((r) => (
                      <li key={r} className="flex gap-3" style={{ alignItems: 'flex-start' }}>
                        <span className="accent" style={{ fontSize: 15, lineHeight: 1.5 }}>→</span>
                        <span className="text-soft" style={{ fontSize: 14 }}>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Why us" title="What it&apos;s like to work here." />
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {values.map((v) => (
              <Item key={v.title}>
                <GlassCard tilt glow style={{ height: '100%' }}>
                  <div style={{ fontSize: 30, marginBottom: 14 }}>{v.icon}</div>
                  <h3 style={{ fontSize: 20, marginBottom: 8 }}>{v.title}</h3>
                  <p className="text-soft" style={{ fontSize: 14.5 }}>{v.desc}</p>
                </GlassCard>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHead eyebrow="Apply now" title="Tell us why you&apos;d be a great fit." sub="We review every application within five business days — no black holes." />
          <Reveal>
            <ApplicationForm />
          </Reveal>
        </div>
      </section>

      <CTABand title="Not the right role yet?" subtitle="We&apos;re always keen to meet talented people who love AI, search and the security industry." ctaLabel="Get in touch →" ctaHref="/contact/" />
    </>
  )
}
