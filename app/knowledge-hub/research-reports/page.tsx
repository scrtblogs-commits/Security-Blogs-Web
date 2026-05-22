import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import ContainerScroll from '@/components/ui/ContainerScroll'
import MagneticButton from '@/components/ui/MagneticButton'
import CTABand from '@/components/ui/CTABand'
import { Stagger, Item } from '@/components/ui/Reveal'

export const metadata = {
  title: 'Research Reports · Knowledge Hub · SecurityGrowth',
  description: 'Downloadable research reports on AI visibility, SEO and growth benchmarks for the security industry — original data you can act on.',
}

const reports = [
  { title: 'The 2026 AI Visibility Benchmark for Security', year: '2026', pages: 42, abstract: 'We tracked 4,000 buyer queries across five answer engines to reveal who gets cited — and why.' },
  { title: 'State of Security SEO Report', year: '2026', pages: 38, abstract: 'Rankings, content and technical health across 500 security industry websites, segmented by category.' },
  { title: 'How AI Engines Cite B2B Vendors', year: '2026', pages: 29, abstract: 'A breakdown of the retrieval and trust signals that determine which brands AI names by default.' },
  { title: 'Security Buyer Journey in the AI Era', year: '2025', pages: 34, abstract: 'Survey of 1,200 security buyers on how they research, compare and select providers today.' },
  { title: 'Schema Adoption in the Security Industry', year: '2025', pages: 26, abstract: 'Which structured-data types security sites use, and the citation lift correlated with each.' },
  { title: 'Paid Search Benchmarks for Security', year: '2025', pages: 31, abstract: 'CPCs, conversion rates and ROAS benchmarks across Google and Bing for security verticals.' },
]

export default function ResearchReportsPage() {
  return (
    <>
      <HeroBg>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Knowledge Hub', href: '/knowledge-hub/' }, { label: 'Research Reports' }]} />
        <ContainerScroll
          title={<SectionHead eyebrow="Research" title="Original Security Research Reports" sub="Data-backed studies on AI visibility, SEO and growth in the security industry — free to download and built to act on." />}
        >
          <div style={{ padding: 28 }}>
            <span className="chip" style={{ marginBottom: 14, color: 'var(--violet)', borderColor: 'var(--violet)' }}>Latest · 2026</span>
            <h2 className="h2" style={{ fontSize: 28, marginBottom: 12 }}>The 2026 AI Visibility Benchmark for Security</h2>
            <p className="text-soft" style={{ fontSize: 16, maxWidth: 620 }}>
              4,000 buyer queries. Five answer engines. One question: which security brands get cited,
              and what they do differently. The definitive benchmark for the AI era.
            </p>
          </div>
        </ContainerScroll>
      </HeroBg>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="The library" title="Download the research." sub="Every report is original, free, and based on data we collected ourselves." />
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {reports.map((r) => (
              <Item key={r.title}>
                <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, display: 'grid', placeItems: 'center', fontSize: 26, background: 'var(--violet)18', marginBottom: 16 }}>📊</div>
                  <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
                    <span className="chip" style={{ color: 'var(--violet)', borderColor: 'var(--violet)' }}>{r.year}</span>
                    <span className="text-dim" style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>{r.pages} pages</span>
                  </div>
                  <h3 style={{ fontSize: 18, marginBottom: 8 }}>{r.title}</h3>
                  <p className="text-soft" style={{ fontSize: 14, marginBottom: 18, flex: 1 }}>{r.abstract}</p>
                  <MagneticButton href="/contact/" className="btn btn-outline">Download PDF →</MagneticButton>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <CTABand />
    </>
  )
}
