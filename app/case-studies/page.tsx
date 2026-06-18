import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import AnimatedSVGTimeline from '@/components/ui/AnimatedSVGTimeline'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import MagneticButton from '@/components/ui/MagneticButton'

export const metadata = {
  title: 'Case Studies',
  description: 'Case studies are published only once we have real, client-approved results — no invented numbers. See how we work and request a free AI-visibility audit.',
  alternates: { canonical: '/case-studies/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/case-studies/' },
}

const journey = [
  { phase: 'Month 1', title: 'Audit & Strategy', desc: 'Deep technical, content and AI-visibility audit feeding a tailored roadmap.' },
  { phase: 'Month 2', title: 'Technical Foundation', desc: 'Core Web Vitals, indexation and structured data locked in.' },
  { phase: 'Month 3', title: 'Content Launch', desc: 'High-intent, citable content clusters go live.' },
  { phase: 'Month 4', title: 'AI Optimisation', desc: 'Schema and entity work earns first AI citations.' },
  { phase: 'Month 5', title: 'Link Authority', desc: 'Earned links from security publications compound trust.' },
  { phase: 'Month 6', title: 'Paid Media', desc: 'Google & Bing campaigns accelerate qualified pipeline.' },
  { phase: 'Month 7', title: 'Scale', desc: 'Winning plays expand into adjacent keyword clusters.' },
  { phase: 'Month 8', title: 'Market Presence', desc: 'Brand becomes a default answer across search and AI.' },
]

export default function CaseStudiesPage() {
  return (
    <>
      <HeroBg grid>
        <div className="center mx-auto" style={{ maxWidth: 760 }}>
          <Reveal>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Case Studies' }]} currentPath="/case-studies/" />
            <span className="badge badge-blue" style={{ marginBottom: 22 }}>
              <span className="dot dot-pulse" /> CASE STUDIES · COMING SOON
            </span>
            <h1 className="h1" style={{ marginBottom: 20 }}>
              Real results,{' '}
              <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>coming soon</span>.
            </h1>
            <p className="lead mx-auto" style={{ maxWidth: 600 }}>
              We publish case studies only once we have real, client-approved outcomes to share — never
              invented numbers. We&rsquo;re gathering verified results now. In the meantime, see how we work
              and get a free AI-visibility audit.
            </p>
          </Reveal>
        </div>
      </HeroBg>

      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <Reveal>
            <div className="card center" style={{ padding: 'clamp(28px,5vw,48px)' }}>
              <h2 className="h2" style={{ marginBottom: 12 }}>Verified case studies are on the way</h2>
              <p className="text-soft" style={{ maxWidth: 560, margin: '0 auto 24px' }}>
                Every result we publish will be backed by real client data — Search Console, Ahrefs and
                platform reporting — and shared with the client&rsquo;s permission. We&rsquo;d rather show you
                nothing than show you numbers we can&rsquo;t stand behind.
              </p>
              <div className="flex flex-wrap gap-3" style={{ justifyContent: 'center' }}>
                <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Get your free AI visibility audit →</MagneticButton>
                <MagneticButton href="/ai-visibility-center/" className="btn btn-outline btn-lg">Try the AI Visibility Center</MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="How we work" title="Our growth method" sub="The eight-month arc we run with security clients — from first audit to becoming a default answer across search and AI." />
          <AnimatedSVGTimeline steps={journey} gradient="linear-gradient(180deg, var(--blue), var(--green))" />
        </div>
      </section>

      <CTABand title="Want to be our first published result?" subtitle="Get a free AI visibility audit and a 90-day roadmap tailored to your security brand." ctaHref="/book-strategy-call/" />
    </>
  )
}
