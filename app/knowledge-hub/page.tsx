import Link from 'next/link'
import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import MarqueeStrip from '@/components/ui/MarqueeStrip'
import SectionHead from '@/components/ui/SectionHead'
import CTABand from '@/components/ui/CTABand'
import Reveal, { Stagger, Item } from '@/components/ui/Reveal'
import { knowledgeHub } from '@/lib/site'

export const metadata = {
  title: 'Knowledge Hub · SecurityGrowth',
  description: 'Guides, research, news and definitions on AI visibility, SEO and growth for the security industry — all in one place.',
}

const hubIcons: Record<string, { icon: string; color: string; desc: string }> = {
  '/knowledge-hub/blogs/': { icon: '✍️', color: 'var(--blue)', desc: 'Tactical reads on SEO, AIO, GEO and paid growth for security brands.' },
  '/knowledge-hub/security-industry-seo/': { icon: '🔍', color: 'var(--green)', desc: 'The complete pillar on ranking security installers, integrators and SaaS.' },
  '/knowledge-hub/security-guides/': { icon: '📘', color: 'var(--violet)', desc: 'Step-by-step playbooks you can action this quarter.' },
  '/knowledge-hub/industry-news/': { icon: '📰', color: 'var(--red)', desc: 'Acquisitions, launches and regulation moving the security market.' },
  '/knowledge-hub/security-trends-2026/': { icon: '📈', color: 'var(--yellow)', desc: 'Where AI visibility, physical and cyber security are heading next year.' },
  '/knowledge-hub/definitions-glossary/': { icon: '📖', color: 'var(--blue)', desc: 'Plain-English definitions for AIO, AEO, GEO, schema and more.' },
  '/knowledge-hub/research-reports/': { icon: '📊', color: 'var(--violet)', desc: 'Downloadable data on how AI engines cite security vendors.' },
}

const latest = [
  { title: 'How ChatGPT decides which security vendor to name', cat: 'AIO/AEO', date: 'May 18, 2026', excerpt: 'Inside the retrieval signals answer engines weigh when a buyer asks for the best monitoring provider.', href: '/knowledge-hub/blogs/' },
  { title: 'Local SEO for alarm installers: the 2026 checklist', cat: 'SEO', date: 'May 12, 2026', excerpt: 'NAP consistency, service-area pages and review velocity that move the local pack.', href: '/knowledge-hub/security-industry-seo/' },
  { title: 'Schema patterns that get security sites cited', cat: 'Technical', date: 'May 6, 2026', excerpt: 'Organization, Service and FAQ markup that AI crawlers actually parse and reuse.', href: '/knowledge-hub/security-guides/' },
  { title: 'Q2 2026: three major access-control acquisitions', cat: 'Industry', date: 'Apr 29, 2026', excerpt: 'Consolidation continues as platform vendors absorb cloud-native access startups.', href: '/knowledge-hub/industry-news/' },
  { title: 'GEO explained: building entity authority for AI', cat: 'GEO', date: 'Apr 22, 2026', excerpt: 'Why knowledge-graph presence now outweighs raw backlinks for AI trust.', href: '/knowledge-hub/definitions-glossary/' },
  { title: 'The 2026 AI Visibility Benchmark for security', cat: 'Report', date: 'Apr 15, 2026', excerpt: 'We tracked 4,000 buyer queries across five engines. Here is who got named.', href: '/knowledge-hub/research-reports/' },
]

export default function KnowledgeHubPage() {
  return (
    <>
      <HeroBg>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Knowledge Hub' }]} />
        <div className="grid-2" style={{ alignItems: 'center', gap: 56 }}>
          <Reveal>
            <span className="badge badge-blue" style={{ marginBottom: 20 }}>
              <span className="dot dot-pulse" /> THE KNOWLEDGE HUB
            </span>
            <h1 className="h1" style={{ marginBottom: 18 }}>
              The AI Visibility <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Knowledge Hub</span>
            </h1>
            <p className="lead" style={{ maxWidth: 520 }}>
              Everything we know about getting security brands found, cited and chosen — guides,
              research, news and a living glossary, updated as the answer engines evolve.
            </p>
          </Reveal>
          <Reveal delay={0.15} style={{ perspective: 1000 }}>
            <div className="glass" style={{ padding: 22, borderRadius: 'var(--radius-lg)', transform: 'rotateY(-8deg) rotateX(4deg)' }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Featured read</div>
              <div className="card" style={{ padding: 18 }}>
                <span className="chip" style={{ marginBottom: 10 }}>AIO/AEO</span>
                <h3 style={{ fontSize: 19, marginBottom: 8 }}>How ChatGPT decides which security vendor to name</h3>
                <p className="text-soft" style={{ fontSize: 14, marginBottom: 12 }}>
                  Inside the retrieval signals answer engines weigh when a buyer asks for the best provider.
                </p>
                <div className="flex items-center gap-2" style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>
                  <span className="text-dim">May 18, 2026</span>
                  <span className="text-dim">·</span>
                  <span className="accent">8 min read</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </HeroBg>

      <MarqueeStrip />

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Browse the hub" title="Pick your path to AI visibility." sub="Seven curated collections, each built for a different stage of the security growth journey." />
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {knowledgeHub.map((h) => {
              const meta = hubIcons[h.href]
              return (
                <Item key={h.href}>
                  <Link href={h.href} className="card" style={{ display: 'block', height: '100%' }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, display: 'grid', placeItems: 'center', fontSize: 26, background: `${meta.color}18`, marginBottom: 16 }}>{meta.icon}</div>
                    <h3 style={{ fontSize: 20, marginBottom: 8 }}>{h.title}</h3>
                    <p className="text-soft" style={{ fontSize: 14.5, marginBottom: 14 }}>{meta.desc}</p>
                    <span style={{ color: meta.color, fontWeight: 600, fontSize: 14 }}>Explore →</span>
                  </Link>
                </Item>
              )
            })}
          </Stagger>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Fresh from the team" title="Latest articles." sub="The most recent thinking from our SEO, AIO and growth specialists." />
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {latest.map((a, i) => (
              <Item key={i}>
                <Link href={a.href} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
                    <span className="chip">{a.cat}</span>
                    <span className="text-dim" style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>{a.date}</span>
                  </div>
                  <h3 style={{ fontSize: 18, marginBottom: 8 }}>{a.title}</h3>
                  <p className="text-soft" style={{ fontSize: 14, marginBottom: 16, flex: 1 }}>{a.excerpt}</p>
                  <span className="accent" style={{ fontWeight: 600, fontSize: 14 }}>Read →</span>
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <CTABand />
    </>
  )
}
