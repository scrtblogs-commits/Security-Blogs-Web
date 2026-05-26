import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import ContainerScroll from '@/components/ui/ContainerScroll'
import CTABand from '@/components/ui/CTABand'
import { Stagger, Item } from '@/components/ui/Reveal'

export const metadata = {
  title: 'Security Guides · Knowledge Hub · SecurityBlogs',
  description: 'In-depth, step-by-step security marketing guides covering SEO, AI visibility, schema, paid ads and conversion for security industry brands.',
}

const guides = [
  { title: 'The complete AI visibility playbook for security brands', diff: 'Advanced', read: '24 min', excerpt: 'A full system for getting cited across ChatGPT, Gemini, Perplexity and AI Overviews.' },
  { title: 'Schema markup blueprint for security websites', diff: 'Intermediate', read: '16 min', excerpt: 'Copy-paste structured data for Organization, Service, FAQ and Review across your site.' },
  { title: 'Local SEO from zero to local pack', diff: 'Beginner', read: '14 min', excerpt: 'Set up Google Business Profile, service-area pages and reviews the right way.' },
  { title: 'Building topical authority with content clusters', diff: 'Intermediate', read: '18 min', excerpt: 'Architect pillar and cluster pages that rank and feed answer-engine retrieval.' },
  { title: 'Technical SEO audit, step by step', diff: 'Advanced', read: '22 min', excerpt: 'Crawl budget, indexation, Core Web Vitals and render checks with a repeatable checklist.' },
  { title: 'Google Ads for security: campaign architecture', diff: 'Intermediate', read: '15 min', excerpt: 'Campaign and ad-group structure, match types and landing pages built for ROAS.' },
  { title: 'Earning links from security publications', diff: 'Intermediate', read: '13 min', excerpt: 'Outreach, digital PR and resource link strategies that compound domain authority.' },
  { title: 'Measuring AI citation rate and share of voice', diff: 'Advanced', read: '17 min', excerpt: 'Track how often each engine names your brand and benchmark against competitors.' },
]

const diffColor: Record<string, string> = { Beginner: 'var(--green)', Intermediate: 'var(--yellow)', Advanced: 'var(--red)' }

export default function SecurityGuidesPage() {
  return (
    <>
      <HeroBg>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Knowledge Hub', href: '/knowledge-hub/' }, { label: 'Security Guides' }]} />
        <ContainerScroll
          title={<SectionHead eyebrow="Guides" title="In-Depth Security Marketing Guides" sub="Long-form, action-ready playbooks you can run this quarter — from first principles to advanced AI visibility." />}
        >
          <div style={{ padding: 28 }}>
            <span className="chip" style={{ marginBottom: 14, color: 'var(--red)', borderColor: 'var(--red)' }}>Featured · Advanced</span>
            <h2 className="h2" style={{ fontSize: 28, marginBottom: 12 }}>The complete AI visibility playbook for security brands</h2>
            <p className="text-soft" style={{ fontSize: 16, marginBottom: 20, maxWidth: 620 }}>
              A full operating system for getting your brand cited across every major answer engine —
              entity building, citable content, schema and measurement, in one guide.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Entity authority', 'Citable content', 'Schema', 'Measurement'].map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
        </ContainerScroll>
      </HeroBg>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="The library" title="Pick a guide and get to work." sub="Every guide is self-contained, with checklists and examples drawn from real security campaigns." />
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {guides.map((g) => (
              <Item key={g.title}>
                <a href="#" className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none' }}>
                  <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
                    <span className="chip" style={{ color: diffColor[g.diff], borderColor: diffColor[g.diff] }}>{g.diff}</span>
                    <span className="text-dim" style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>{g.read} read</span>
                  </div>
                  <h3 style={{ fontSize: 18, marginBottom: 8 }}>{g.title}</h3>
                  <p className="text-soft" style={{ fontSize: 14, marginBottom: 16, flex: 1 }}>{g.excerpt}</p>
                  <span className="accent" style={{ fontWeight: 600, fontSize: 14 }}>Open guide →</span>
                </a>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <CTABand />
    </>
  )
}
