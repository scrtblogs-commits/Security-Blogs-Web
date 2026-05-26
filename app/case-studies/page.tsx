import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import AnimatedSVGTimeline from '@/components/ui/AnimatedSVGTimeline'
import StatsStrip from '@/components/ui/StatsStrip'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import CaseGrid from './CaseGrid'

export const metadata = {
  title: 'Case Studies',
  description: 'Real results from security brands we have grown across SEO, Google Ads, AIO/AEO and GEO. Results that speak louder than rankings.',
  alternates: { canonical: '/case-studies/' },
  openGraph: { url: '/case-studies/' },
}

const journey = [
  { phase: 'Month 1', title: 'Audit & Strategy', desc: 'Deep technical, content and AI-visibility audit feeding a tailored roadmap.' },
  { phase: 'Month 2', title: 'Technical Foundation', desc: 'Core Web Vitals, indexation and structured data locked in.' },
  { phase: 'Month 3', title: 'Content Launch', desc: 'High-intent, citable content clusters go live.' },
  { phase: 'Month 4', title: 'AI Optimisation', desc: 'Schema and entity work earns first AI citations.' },
  { phase: 'Month 5', title: 'Link Authority', desc: 'Earned links from security publications compound trust.' },
  { phase: 'Month 6', title: 'Paid Media', desc: 'Google & Bing campaigns accelerate qualified pipeline.' },
  { phase: 'Month 7', title: 'Scale', desc: 'Winning plays expand into adjacent keyword clusters.' },
  { phase: 'Month 8', title: 'Market Dominance', desc: 'Brand becomes the default answer across search and AI.' },
]

const stats = [
  { num: '50+', label: 'Security clients served' },
  { num: '+280%', label: 'Average traffic growth' },
  { num: '3.4×', label: 'Average ROAS' },
  { num: '12', label: 'Countries reached' },
]

export default function CaseStudiesPage() {
  return (
    <>
      <HeroBg grid blobs>
        <div className="center mx-auto" style={{ maxWidth: 760 }}>
          <Reveal>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Case Studies' }]} />
            <span className="badge badge-blue" style={{ marginBottom: 22 }}>
              <span className="dot dot-pulse" /> PROVEN · MEASURABLE OUTCOMES
            </span>
            <h1 className="h1" style={{ marginBottom: 20 }}>
              Results that speak louder than{' '}
              <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>rankings</span>.
            </h1>
            <p className="lead mx-auto" style={{ maxWidth: 560 }}>
              Filter by channel and see exactly how we move the metrics that matter for security brands.
            </p>
          </Reveal>
        </div>
      </HeroBg>

      <section className="section">
        <div className="container">
          <CaseGrid />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="The path" title="Client Growth Journey" sub="From first audit to full market dominance — the eight-month arc behind our best results." />
          <AnimatedSVGTimeline steps={journey} gradient="linear-gradient(180deg, var(--blue), var(--green))" />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="In aggregate" title="The numbers across our portfolio." />
          <StatsStrip items={stats} />
        </div>
      </section>

      <CTABand title="Want results like these?" subtitle="Get a free AI visibility audit and a 90-day roadmap tailored to your security brand." ctaHref="/book-strategy-call/" />
    </>
  )
}
