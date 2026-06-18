import HorizontalScrollServices from '@/components/effects/HorizontalScrollServices'
import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import SectionHead from '@/components/ui/SectionHead'
import CTABand from '@/components/ui/CTABand'
import Breadcrumb from '@/components/ui/Breadcrumb'
import GeoCapabilities from './GeoCapabilities'
import ProcessSteps from '@/components/ui/ProcessSteps'
import StatsStrip from '@/components/ui/StatsStrip'
import FAQAccordion from '@/components/ui/FAQAccordion'
import BeforeAfter from '@/components/ui/BeforeAfter'
import JsonLd from '@/components/JsonLd'
import { serviceSchema } from '@/lib/schema'

const ACCENT = '#1e5fe0'

export const metadata = {
  title: "GEO — Build Your Security Brand's AI Knowledge Graph",
  description:
    'GEO makes AI platforms recognise, trust and consistently recommend your security brand by building entity authority across the entire AI ecosystem.',
  alternates: { canonical: '/services/geo/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/services/geo/' },
}

const steps = [
  { title: 'Entity Creation & Verification', desc: 'Define and verify your brand entity with structured data and authoritative source profiles.' },
  { title: 'Signal Distribution Across Platforms', desc: 'Push consistent brand signals into the directories, knowledge bases and sources AI engines trust.' },
  { title: 'Authority Building & Citations', desc: 'Earn citations and references that strengthen your entity authority across the AI ecosystem.' },
  { title: 'AI Confirmation & Monitoring', desc: 'Confirm recognition on each platform and monitor how AI describes and recommends your brand.' },
]

const stats = [
  { num: '6+', label: 'AI platforms we build entity signals across' },
  { num: 'Wikidata', label: 'Knowledge-graph sources we target' },
  { num: 'NAP', label: 'Consistency across every citation' },
  { num: 'Schema', label: 'Organization & entity markup' },
]

const faqs = [
  { q: 'What is GEO?', a: 'GEO (Generative Engine Optimisation) builds your brand into the knowledge graphs that AI platforms rely on, so they recognise your entity, trust your data and consistently recommend you by name.' },
  { q: 'Why does my brand need an AI knowledge graph?', a: 'AI assistants recommend brands they can confidently identify. If your entity is undefined or inconsistent, AI either ignores you or cites a competitor instead.' },
  { q: 'How long does GEO take?', a: 'Most security brands reach a verified, AI-recognised entity within around 90 days, with authority and recommendation share compounding from there.' },
  { q: 'How is GEO different from AIO and AEO?', a: 'AIO makes content citable and AEO wins specific answers; GEO builds the underlying entity authority and knowledge graph that makes AI trust your brand in the first place.' },
]

export default function GeoPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: 'GEO — Generative Engine Optimisation',
        description: 'GEO makes AI platforms recognise, trust and consistently recommend your security brand by building entity authority across the entire AI ecosystem.',
        slug: 'geo',
        serviceType: 'Generative Engine Optimisation',
      })} />

      <HeroBg accent={ACCENT}>
        <Breadcrumb items={[{ label: 'Services', href: '/services/' }, { label: 'GEO' }]} />
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: 14 }}>GEO — Generative Engine Optimisation</p>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 68px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 24 }}>
          Build your security brand's<br />AI knowledge graph.
        </h1>
        <p style={{ fontSize: 18, opacity: 0.7, maxWidth: 540, marginBottom: 36 }}>
          GEO makes AI platforms recognise, trust and consistently recommend your security brand by building entity authority across the entire AI ecosystem.
        </p>
        <MagneticButton href="/contact/" accent={ACCENT}>Get my GEO audit →</MagneticButton>
      </HeroBg>

      <HorizontalScrollServices />
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What's included"
            title="The full GEO programme for entity authority."
            sub="We build, distribute and confirm the signals that turn your security brand into a trusted AI entity."
          />
          <GeoCapabilities />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="How it works" title="From unknown to AI-recommended." />
          <ProcessSteps steps={steps} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="The transformation" title="What GEO changes for your brand." />
          <BeforeAfter
            before={["AI doesn't recognise your brand", 'Inconsistent NAP across the web', 'Competitors cited instead of you']}
            after={['Entity recognised across major AI platforms', 'Consistent signals everywhere', 'AI can recommend you by name']}
          />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Our approach" title="How we build your AI entity." />
          <StatsStrip items={stats} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead eyebrow="FAQ" title="GEO questions, answered." />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTABand
        title="Ready to own the AI map?"
        subtitle="Get your free GEO audit and see exactly which entity signals are missing from your security brand."
        ctaLabel="Get my GEO audit →"
        ctaHref="/contact/"
      />
    </>
  )
}
