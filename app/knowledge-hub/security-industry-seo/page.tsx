import Link from 'next/link'
import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import Bento from '@/components/ui/Bento'
import ProcessSteps from '@/components/ui/ProcessSteps'
import FAQAccordion from '@/components/ui/FAQAccordion'
import CTABand from '@/components/ui/CTABand'
import Reveal, { Stagger, Item } from '@/components/ui/Reveal'

export const metadata = {
  title: 'Security Industry SEO · Knowledge Hub',
  description: 'The complete pillar on SEO for the security industry — local SEO, technical SEO, E-E-A-T, schema, link building and rank tracking for installers, integrators and SaaS.',
  alternates: { canonical: '/knowledge-hub/security-industry-seo/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/knowledge-hub/security-industry-seo/' },
}

const subtopics = [
  { icon: '📍', title: 'Local SEO for installers', desc: 'Service-area pages, Google Business Profile and review velocity that win the local pack.' },
  { icon: '⚙️', title: 'Technical SEO', desc: 'Crawl health, indexation, Core Web Vitals and a fast, AI-readable architecture.' },
  { icon: '🛡️', title: 'Content & E-E-A-T', desc: 'Demonstrable expertise and trust signals that satisfy both Google and answer engines.' },
  { icon: '🔗', title: 'Link building', desc: 'Earned links from security publications that compound domain authority.' },
  { icon: '🧩', title: 'Schema markup', desc: 'Organization, Service, FAQ and Product structured data AI crawlers can reuse.' },
  { icon: '📊', title: 'Rank tracking', desc: 'Measuring positions, share of voice and AI citation rate across every engine.' },
]

const steps = [
  { title: 'Audit & baseline', desc: 'Crawl, index and authority audit to find the gaps capping your rankings today.' },
  { title: 'Keyword & entity map', desc: 'Map high-intent security queries and the entities AI must associate with your brand.' },
  { title: 'On-page & schema', desc: 'Optimise pages and ship structured data so search and AI both understand you.' },
  { title: 'Authority & links', desc: 'Earn citations and links from trusted security sources to build durable trust.' },
  { title: 'Track & scale', desc: 'Monitor rankings and AI citations, then expand into new clusters and markets.' },
]

const faqs = [
  { q: 'How is SEO different for security companies?', a: 'Security buyers research with high intent and long sales cycles, often comparing installers, integrators and SaaS in the same query. Winning means local relevance, deep E-E-A-T, and increasingly being cited by AI answer engines — not just ranking blue links.' },
  { q: 'How long until a security site sees SEO results?', a: 'Technical and on-page fixes can lift rankings within 4–8 weeks. Authority-driven gains and AI citations typically compound over 3–6 months as trust signals accumulate.' },
  { q: 'Does local SEO matter for national security brands?', a: 'Yes. Even national integrators win regional projects through service-area pages and local entity signals, while AI engines lean heavily on consistent NAP and local trust data.' },
  { q: 'What schema should a security website use?', a: 'Start with Organization and LocalBusiness, then layer Service, Product, FAQ and Review markup. This helps AI crawlers parse exactly what you do and cite you accurately.' },
  { q: 'Is SEO still worth it now that AI answers questions?', a: 'More than ever. The same content architecture and authority that ranks in Google is what AI engines retrieve and cite. Strong SEO is the foundation of AI visibility.' },
]

const related = [
  { title: 'In-Depth Security Marketing Guides', href: '/knowledge-hub/security-guides/' },
  { title: 'Definitions & Glossary', href: '/knowledge-hub/definitions-glossary/' },
  { title: 'Security Trends 2026', href: '/knowledge-hub/security-trends-2026/' },
]

export default function SecurityIndustrySEOPage() {
  return (
    <>
      <HeroBg>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Knowledge Hub', href: '/knowledge-hub/' }, { label: 'Security Industry SEO' }]} />
        <Reveal>
          <span className="badge badge-blue" style={{ marginBottom: 20 }}>PILLAR GUIDE</span>
          <h1 className="h1" style={{ maxWidth: 820, marginBottom: 18 }}>
            SEO for the <span style={{ color: 'var(--green)', fontStyle: 'italic' }}>security industry</span>, end to end.
          </h1>
          <p className="lead" style={{ maxWidth: 680 }}>
            A single resource covering everything that moves rankings for installers, integrators,
            monitoring providers and security SaaS — and how it now feeds AI visibility too.
          </p>
        </Reveal>
      </HeroBg>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="The landscape" title="Why security SEO is its own discipline." sub="High-intent buyers, long sales cycles and trust-sensitive decisions mean generic SEO advice falls short. These are the levers that actually matter." align="center" />
          <Bento cells={subtopics} cols={3} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="The process" title="A repeatable path to page one." sub="The same five-stage framework we run for every security client engagement." />
          <ProcessSteps steps={steps} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Questions" title="Security SEO, answered." />
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Keep reading" title="Related resources." />
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {related.map((r) => (
              <Item key={r.href}>
                <Link href={r.href} className="card" style={{ display: 'block', height: '100%' }}>
                  <h3 style={{ fontSize: 18, marginBottom: 10 }}>{r.title}</h3>
                  <span className="accent" style={{ fontWeight: 600, fontSize: 14 }}>Open →</span>
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
