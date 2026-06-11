import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import SectionHead from '@/components/ui/SectionHead'
import Reveal from '@/components/ui/Reveal'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AeoCapabilities from './AeoCapabilities'
import StatsStrip from '@/components/ui/StatsStrip'
import FAQAccordion from '@/components/ui/FAQAccordion'
import JsonLd from '@/components/JsonLd'
import AeoHeroVisual from './AeoHeroVisual'
import AeoHowItWorks from './AeoHowItWorks'
import PromoVideoSection from '@/components/ui/PromoVideoSection'
import { serviceSchema } from '@/lib/schema'

const ACCENT = '#7f77dd'

export const metadata = {
  title: 'AEO — Become the Answer AI Recommends',
  description:
    'Answer Engine Optimisation positions your security brand as the trusted, quotable answer AI assistants and search engines surface to buyers.',
  alternates: { canonical: '/services/aeo/' },
  openGraph: {
    title: 'AEO Services for Security Companies — Answer Engine Optimisation | SecurityBlogs',
    description: 'Answer Engine Optimisation for security brands. Become the trusted answer AI assistants surface to buyers searching for security solutions.',
    url: '/services/aeo/',
    siteName: 'SecurityBlogs Australia',
    type: 'website',
    locale: 'en_AU',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'AEO Services — SecurityBlogs' }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AEO — Become the Answer AI Recommends for Security',
    description: 'Answer Engine Optimisation positions your security brand as the answer AI surfaces to buyers.',
    images: ['/logo.png'],
  },
}

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
            <AeoHeroVisual />
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

      <PromoVideoSection
        eyebrow="See AEO in action"
        title="Watch your brand become the AI answer"
        subtitle="Our AEO framework structures your security brand's content so AI assistants and Google feature it as the definitive answer — in snippets, voice results and AI-generated responses."
        accent={ACCENT}
      />

      <AeoHowItWorks />
    </>
  )
}
