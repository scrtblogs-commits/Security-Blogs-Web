import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import SectionHead from '@/components/ui/SectionHead'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AeoCapabilities from './AeoCapabilities'
import ProcessSteps from '@/components/ui/ProcessSteps'
import StatsStrip from '@/components/ui/StatsStrip'
import FAQAccordion from '@/components/ui/FAQAccordion'
import AIChatDemo from '@/components/ui/AIChatDemo'
import JsonLd from '@/components/JsonLd'
import { serviceSchema } from '@/lib/schema'

const ACCENT = '#7f77dd'

export const metadata = {
  title: 'AEO — Become the Answer AI Recommends',
  description:
    'Answer Engine Optimisation positions your security brand as the trusted, quotable answer AI assistants and search engines surface to buyers.',
  alternates: { canonical: '/services/aeo/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/services/aeo/' },
}

const capabilities = [
  { icon: '✅', title: 'Answer Optimisation', desc: 'Content structured as clear, authoritative answers AI engines can lift and present verbatim.' },
  { icon: '⭐', title: 'Featured Snippets', desc: 'Format and target the question-led queries that win position-zero snippets on Google.' },
  { icon: '❓', title: 'FAQ Schema', desc: 'Marked-up Q&A that feeds AI assistants and voice results with crisp, citable responses.' },
  { icon: '🎙️', title: 'Voice Search Ready', desc: 'Natural-language content tuned for the conversational queries voice and AI assistants handle.' },
  { icon: '🤖', title: 'AI Snippet Capture', desc: 'Engineer the passages AI overviews and chat assistants extract when buyers ask about your services.' },
  { icon: '🛡️', title: 'Brand Authority Signals', desc: 'E-E-A-T, reviews and trust markers that make AI confident enough to recommend you by name.' },
]

const steps = [
  { title: 'Question & Intent Mapping', desc: 'We identify the exact questions security buyers ask AI assistants and search engines.' },
  { title: 'Answer-First Content', desc: 'Restructure and create content that answers those questions cleanly and authoritatively.' },
  { title: 'Schema & Snippet Targeting', desc: 'Apply FAQ schema and formatting that wins featured snippets and AI extractions.' },
  { title: 'Track & Expand', desc: 'Monitor answer appearances and snippet wins, then expand into adjacent question clusters.' },
]

const stats = [
  { num: '+340%', label: 'AI answer appearances' },
  { num: '91%', label: 'Featured snippet rate' },
  { num: '78%', label: 'Of buyers trust AI answers' },
  { num: '4.2s', label: 'Average AI response time' },
]

const faqs = [
  { q: 'What is Answer Engine Optimisation?', a: 'AEO is the practice of structuring your content so search engines and AI assistants surface your brand as the direct answer to buyer questions — in snippets, voice results and AI-generated responses.' },
  { q: 'How is AEO different from traditional SEO?', a: 'SEO competes for ranked links; AEO competes to be the single answer that gets read aloud or quoted. It focuses on question intent, structured answers and snippet formatting rather than just page rankings.' },
  { q: 'Does AEO help with voice search?', a: 'Yes. Voice assistants typically read back a single answer, so the same answer-first content and schema that win AEO also capture voice search results.' },
  { q: 'How do you measure AEO success?', a: 'We track featured snippet ownership, AI answer appearances and the share of buyer questions where your brand is the surfaced answer.' },
]

export default function AeoPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: 'AEO — Answer Engine Optimisation',
        description: 'Answer Engine Optimisation positions your security brand as the trusted, quotable answer AI assistants and search engines surface to buyers.',
        slug: 'aeo',
        serviceType: 'Answer Engine Optimisation',
      })} />
      <HeroBg grid>
        <div className="grid-2" style={{ alignItems: 'center', gap: 48 }}>
          <Reveal>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/' }, { label: 'AEO' }]} />
            <span className="badge" style={{ marginBottom: 22, color: ACCENT, borderColor: `${ACCENT}55`, background: `${ACCENT}14` }}>
              <span className="dot dot-pulse" /> ANSWER ENGINE OPTIMISATION
            </span>
            <h1 className="h1" style={{ marginBottom: 20 }}>
              Become the{' '}
              <span style={{ color: ACCENT, fontStyle: 'italic' }}>Answer AI Recommends</span>
            </h1>
            <p className="lead" style={{ maxWidth: 560, marginBottom: 28 }}>
              When buyers ask AI assistants for the best security provider, AEO makes sure your brand is the trusted,
              quotable answer they hear — in featured snippets, voice results and AI-generated responses.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Get your free AEO audit →</MagneticButton>
              <MagneticButton href="/book-strategy-call/" className="btn btn-outline btn-lg">Book a strategy call</MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <AIChatDemo />
          </Reveal>
        </div>
      </HeroBg>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What's included"
            title="Everything it takes to own the answer."
            sub="We engineer the structured, authoritative content that AI assistants and search engines choose to surface."
          />
          <AeoCapabilities />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="How it works" title="From ranked link to recommended answer." />
          <ProcessSteps steps={steps} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="The results" title="What AEO delivers for security brands." />
          <StatsStrip items={stats} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead eyebrow="FAQ" title="AEO questions, answered." />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTABand
        title="Get quoted by AI →"
        subtitle="See which buyer questions your security brand could be answering — and how to become the response AI assistants recommend."
        ctaLabel="Get my free AEO audit →"
        ctaHref="/contact/"
      />
    </>
  )
}
