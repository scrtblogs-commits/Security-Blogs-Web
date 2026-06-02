import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import ContainerScroll from '@/components/ui/ContainerScroll'
import AnimatedSVGTimeline from '@/components/ui/AnimatedSVGTimeline'
import CTABand from '@/components/ui/CTABand'
import NewsTabs from './NewsTabs'

export const metadata = {
  title: 'Industry News · Knowledge Hub',
  description: 'The latest security industry news — acquisitions, product launches, regulation and AI developments shaping the market.',
  alternates: { canonical: '/knowledge-hub/industry-news/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/knowledge-hub/industry-news/' },
}

const monthSteps = [
  { phase: 'May 20', title: 'Cloud access vendor raises $120M', desc: 'Series D values the mobile-credential platform at $1.4B.' },
  { phase: 'May 18', title: 'Edge AI camera launches', desc: 'On-device analytics promise lower bandwidth and better privacy.' },
  { phase: 'May 17', title: 'AI Overviews name installers', desc: 'Google confirms generated provider shortlists for local queries.' },
  { phase: 'May 14', title: 'Regional monitoring merger', desc: 'Combined entity to serve 400,000 accounts across the Midwest.' },
  { phase: 'May 11', title: 'EU tightens surveillance rules', desc: 'New retention and consent requirements land in Q4.' },
  { phase: 'May 6', title: 'PE backs alarm rollup', desc: 'New fund targets fragmented residential installers.' },
]

export default function IndustryNewsPage() {
  return (
    <>
      <HeroBg>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Knowledge Hub', href: '/knowledge-hub/' }, { label: 'Industry News' }]} />
        <ContainerScroll
          title={<SectionHead eyebrow="News" title="Security Industry News" sub="Acquisitions, launches, regulation and AI moves — curated for marketers and operators who need the signal, not the noise." />}
        >
          <div style={{ padding: 28 }}>
            <span className="chip" style={{ marginBottom: 14, color: 'var(--red)', borderColor: 'var(--red)' }}>Top story</span>
            <h2 className="h2" style={{ fontSize: 28, marginBottom: 12 }}>AI Overviews now name security installers by default</h2>
            <p className="text-soft" style={{ fontSize: 16, maxWidth: 620 }}>
              Google confirms local service queries increasingly return AI-generated provider
              shortlists — raising the stakes on entity authority for every security brand.
            </p>
          </div>
        </ContainerScroll>
      </HeroBg>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Browse by topic" title="The latest, sorted." sub="Switch categories to see what is moving in each corner of the market." />
          <NewsTabs />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Timeline" title="This month in security." sub="A scroll-driven recap of the stories that mattered this month." />
          <AnimatedSVGTimeline steps={monthSteps} />
        </div>
      </section>

      <CTABand />
    </>
  )
}
