import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import SectionHead from '@/components/ui/SectionHead'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import Breadcrumb from '@/components/ui/Breadcrumb'
import GeoCapabilities from './GeoCapabilities'
import ProcessSteps from '@/components/ui/ProcessSteps'
import StatsStrip from '@/components/ui/StatsStrip'
import FAQAccordion from '@/components/ui/FAQAccordion'
import BeforeAfter from '@/components/ui/BeforeAfter'
import GeoMapDemo from './GeoMapDemo'
import JsonLd from '@/components/JsonLd'
import { serviceSchema } from '@/lib/schema'

const ACCENT = '#e23744'

export const metadata = {
  title: "GEO — Build Your Security Brand's AI Knowledge Graph",
  description:
    'GEO makes AI platforms recognise, trust and consistently recommend your security brand by building entity authority across the entire AI ecosystem.',
  alternates: { canonical: '/services/geo/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/services/geo/' },
}

const capabilities = [
  { icon: '🧩', title: 'Entity Building', desc: 'Establish your security brand as a defined, recognised entity AI systems can identify with confidence.' },
  { icon: '📋', title: 'Knowledge Panel Optimisation', desc: 'Shape the knowledge panels and brand cards that surface across Google and AI platforms.' },
  { icon: '📡', title: 'Brand Signal Distribution', desc: 'Seed consistent, authoritative signals across the directories and sources AI engines learn from.' },
  { icon: '🔁', title: 'Cross-Platform Consistency', desc: 'Align how every AI platform describes your brand so the story is identical everywhere.' },
  { icon: '📍', title: 'NAP Consistency', desc: 'Lock in matching Name, Address and Phone data across the web to reinforce entity trust.' },
  { icon: '🤝', title: 'AI Platform Confirmation', desc: 'Verify and confirm your entity directly with the AI platforms that matter to your buyers.' },
]

const steps = [
  { title: 'Entity Creation & Verification', desc: 'Define and verify your brand entity with structured data and authoritative source profiles.' },
  { title: 'Signal Distribution Across Platforms', desc: 'Push consistent brand signals into the directories, knowledge bases and sources AI engines trust.' },
  { title: 'Authority Building & Citations', desc: 'Earn citations and references that strengthen your entity authority across the AI ecosystem.' },
  { title: 'AI Confirmation & Monitoring', desc: 'Confirm recognition on each platform and monitor how AI describes and recommends your brand.' },
]

const stats = [
  { num: '6', label: 'AI platforms confirming your entity' },
  { num: '90 days', label: 'Average to verified entity' },
  { num: '100%', label: 'NAP consistency achieved' },
  { num: '4.5×', label: 'More branded AI recommendations' },
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
      <HeroBg grid>
        <div className="grid-2" style={{ alignItems: 'center', gap: 48 }}>
          <Reveal>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/' }, { label: 'GEO' }]} />
            <span className="badge" style={{ marginBottom: 22, color: ACCENT, borderColor: `${ACCENT}55`, background: `${ACCENT}14` }}>
              <span className="dot dot-pulse" /> GENERATIVE ENGINE OPTIMISATION
            </span>
            <h1 className="h1" style={{ marginBottom: 20 }}>
              Build Your Security Brand&rsquo;s{' '}
              <span style={{ color: ACCENT, fontStyle: 'italic' }}>AI Knowledge Graph</span>
            </h1>
            <p className="lead" style={{ maxWidth: 560, marginBottom: 28 }}>
              GEO makes AI platforms recognise, trust and consistently recommend your security brand by building your
              entity authority across the entire AI ecosystem.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Get my GEO audit →</MagneticButton>
              <MagneticButton href="/book-strategy-call/" className="btn btn-outline btn-lg">Book a strategy call</MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            {/* Live AI-Maps demo replaces the orbital diagram — Australia
                with pulsing capitals + SecurityBlogs at position 1 */}
            <GeoMapDemo />
          </Reveal>
        </div>
      </HeroBg>

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
          <Reveal>
            <BeforeAfter
              before={["AI doesn't recognise your brand", 'Inconsistent NAP across the web', 'Competitors cited instead of you']}
              after={['Entity confirmed on 6 AI platforms', 'Consistent signals everywhere', 'AI recommends you by name']}
            />
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="The results" title="What GEO delivers for security brands." />
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
        title="Get my GEO audit →"
        subtitle="See how AI platforms recognise your security brand today — and the entity signals it takes to be recommended by name."
        ctaLabel="Get my GEO audit →"
        ctaHref="/contact/"
      />
    </>
  )
}
