import SpiralAnimation from '@/components/ui/SpiralAnimation'
import MagneticButton from '@/components/ui/MagneticButton'
import SectionHead from '@/components/ui/SectionHead'
import StatsStrip from '@/components/ui/StatsStrip'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AnimatedSVGTimeline from '@/components/ui/AnimatedSVGTimeline'
import BeforeAfter from '@/components/ui/BeforeAfter'
import MarqueeStrip from '@/components/ui/MarqueeStrip'
import ScoreCalculator from './ScoreCalculator'
import Interactive3D from './Interactive3D'
import OrbitalTimeline from './OrbitalTimeline'

export const metadata = {
  title: 'AI Visibility Center — How AI Sees Your Security Brand | SecurityGrowth',
  description:
    '73% of B2B security buyers use AI to find and vet vendors. See how AI discovers, scores and cites your brand — and how to become the answer it gives.',
}

const timeline = [
  { phase: 'Trigger', title: 'Buyer asks AI a security question', desc: 'A decision-maker types "best access-control provider in Sydney" into ChatGPT or Perplexity.' },
  { phase: 'Retrieval', title: 'AI queries training data + live web', desc: 'The model blends its training corpus with real-time retrieval from the open web.' },
  { phase: 'Recognition', title: 'Entity recognition scan', desc: 'AI identifies which brands are real, distinct entities with consistent signals.' },
  { phase: 'Scoring', title: 'Authority & trust scoring', desc: 'It weighs reviews, citations, backlinks and content depth to rank credibility.' },
  { phase: 'Comparison', title: 'Competitor comparison', desc: 'Your brand is benchmarked against rivals on relevance and authority.' },
  { phase: 'Synthesis', title: 'Response generation', desc: 'The model drafts a confident, conversational recommendation.' },
  { phase: 'Attribution', title: 'Citation attribution', desc: 'Sources and brands are named, linked and credited inside the answer.' },
  { phase: 'Result', title: 'Buyer sees your brand as THE answer', desc: 'You become the recommendation — before a single click ever happens.' },
]

const stats = [
  { num: '73%', label: 'B2B buyers use AI for vendor research' },
  { num: '89%', label: 'of AI answers cite the same 5 brands' },
  { num: '3.2×', label: 'more leads from AI-cited brands' },
  { num: '180', label: 'avg days to reach Authority tier' },
]

export default function AIVisibilityCenterPage() {
  return (
    <>
      <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <SpiralAnimation tint="#1e5fe0" />
        <div className="container z1">
          <Reveal>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'AI Visibility Center' }]} />
            <span className="badge badge-blue" style={{ marginBottom: 22 }}>
              <span className="dot dot-pulse" /> THE AI VISIBILITY CENTER
            </span>
            <h1 className="h1" style={{ marginBottom: 20, maxWidth: 900 }}>
              How AI Sees Your{' '}
              <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Security Brand</span>
            </h1>
            <p className="lead" style={{ maxWidth: 660, marginBottom: 28 }}>
              73% of B2B security buyers now use AI to find and vet vendors. Here's how to make sure
              AI recommends you every time.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="#calculator" className="btn btn-primary btn-lg">Get your AI Visibility Score →</MagneticButton>
              <MagneticButton href="/contact/" className="btn btn-outline btn-lg">Talk to a strategist</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Reveal>
            <Interactive3D />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="The mechanics"
            title="How AI Discovers & Cites Your Brand"
            sub="Eight steps run silently every time a buyer asks. Win them all and you become the default recommendation."
          />
          <AnimatedSVGTimeline steps={timeline} gradient="linear-gradient(180deg, var(--red), var(--yellow), var(--blue))" />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="The journey"
            title="Your brand's orbit to AI authority"
            sub="Tap any node to explore the milestones — and how they connect — on the path to becoming the answer AI gives."
          />
          <OrbitalTimeline />
        </div>
      </section>

      <section className="section" id="calculator" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="Free calculator"
            title="What's your AI Visibility Score?"
            sub="Answer six quick questions and watch your score, tier and tailored next steps update live."
          />
          <ScoreCalculator />
        </div>
      </section>

      <MarqueeStrip />

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="The transformation"
            title="From invisible to inevitable."
            sub="What changes when your brand becomes the answer AI gives."
          />
          <BeforeAfter
            before={['Not cited by AI', 'Page 4 on Google', '2 leads/month']}
            after={['Cited by ChatGPT, Perplexity, Gemini', '#1 on Google for 28 keywords', '47 leads/month']}
          />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="The stakes" title="The numbers behind AI vendor discovery." />
          <StatsStrip items={stats} />
        </div>
      </section>

      <CTABand
        title="Get your AI Visibility Score →"
        subtitle="See exactly where AI cites your competitors instead of you — and the fastest path to becoming the answer."
        ctaLabel="Get your free score →"
        ctaHref="/contact/"
      />
    </>
  )
}
