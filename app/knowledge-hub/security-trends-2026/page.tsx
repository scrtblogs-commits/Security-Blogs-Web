import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import ContainerScroll from '@/components/ui/ContainerScroll'
import StatsStrip from '@/components/ui/StatsStrip'
import CTABand from '@/components/ui/CTABand'
import TrendTabs from './TrendTabs'

export const metadata = {
  title: 'Security Trends 2026 · Knowledge Hub · SecurityBlogs',
  description: 'The trends defining 2026 across AI visibility, physical security, cyber, regulation and the security market — with data and analysis.',
}

const trendStats = [
  { num: '60%', label: 'of buyer queries answered by AI in 2026' },
  { num: '$8B+', label: 'in projected security M&A activity' },
  { num: '54%', label: 'of new access deployments mobile-first' },
  { num: '1 in 4', label: 'marketing dollars shifting to AI visibility' },
]

export default function SecurityTrends2026Page() {
  return (
    <>
      <HeroBg>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Knowledge Hub', href: '/knowledge-hub/' }, { label: 'Security Trends 2026' }]} />
        <ContainerScroll
          title={<SectionHead eyebrow="Trends · 2026" title="Security Trends 2026" sub="Where AI visibility, physical security, cyber, regulation and the market are heading — and what it means for your growth strategy." />}
        >
          <div style={{ padding: 28 }}>
            <span className="chip" style={{ marginBottom: 14, color: 'var(--violet)', borderColor: 'var(--violet)' }}>Headline trend</span>
            <h2 className="h2" style={{ fontSize: 28, marginBottom: 12 }}>AI answers are replacing the buyer shortlist</h2>
            <p className="text-soft" style={{ fontSize: 16, maxWidth: 620 }}>
              In 2026, most security buyers ask an AI engine for a ranked provider list before they
              ever visit a website. Entity authority and citation rate become the deciding factors.
            </p>
          </div>
        </ContainerScroll>
      </HeroBg>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="By category" title="Five forces shaping 2026." sub="Switch tabs to explore the trends moving each part of the security landscape." />
          <TrendTabs />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="The numbers" title="2026 in four figures." />
          <StatsStrip items={trendStats} />
        </div>
      </section>

      <CTABand />
    </>
  )
}
