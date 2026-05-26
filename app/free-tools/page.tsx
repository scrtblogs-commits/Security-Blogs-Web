import SpiralAnimation from '@/components/ui/SpiralAnimation'
import SectionHead from '@/components/ui/SectionHead'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import Breadcrumb from '@/components/ui/Breadcrumb'
import MarqueeStrip from '@/components/ui/MarqueeStrip'
import VisibilityChecker from './VisibilityChecker'
import Checklist from './Checklist'
import GuidesTabs from './GuidesTabs'
import JsonLd from '@/components/JsonLd'
import { itemListSchema } from '@/lib/schema'

export const metadata = {
  title: 'Free AI Visibility Tools for Security Brands',
  description:
    'Free AI visibility tools for security brands — check if AI cites you, score your readiness, and follow step-by-step Google & Bing ranking guides. No login required.',
  alternates: { canonical: '/free-tools/' },
  openGraph: { url: '/free-tools/' },
}

export default function FreeToolsPage() {
  return (
    <>
      <JsonLd data={itemListSchema({
        name: 'Free AI Visibility Tools',
        path: '/free-tools/',
        items: [
          { name: 'AI Visibility Checker', url: '/free-tools/#checker',   description: 'See whether ChatGPT, Perplexity, Gemini and friends actually mention your brand when buyers ask.' },
          { name: 'AI Visibility Checklist', url: '/free-tools/#checklist', description: 'Tick off 20 essentials across technical SEO, content, authority and AI signals.' },
          { name: 'Ranking Guides',         url: '/free-tools/#guides',    description: 'Step-by-step playbooks to rank on Google and Bing.' },
        ],
      })} />
      <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <SpiralAnimation tint="#1e5fe0" />
        <div className="container z1">
          <Reveal>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Free Tools' }]} />
            <span className="badge badge-blue" style={{ marginBottom: 22 }}>
              <span className="dot dot-pulse" /> 100% FREE · NO LOGIN
            </span>
            <h1 className="h1" style={{ marginBottom: 20, maxWidth: 900 }}>
              Free AI Visibility Tools for{' '}
              <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Security Brands</span>
            </h1>
            <p className="lead" style={{ maxWidth: 620, marginBottom: 28 }}>
              No login required. No credit card. Just results.
            </p>
            <div className="flex flex-wrap gap-2">
              <a href="#checker" className="pill">⚡ AI Visibility Checker</a>
              <a href="#checklist" className="pill">✅ Visibility Checklist</a>
              <a href="#guides" className="pill">📚 Ranking Guides</a>
            </div>
          </Reveal>
        </div>
      </section>

      <MarqueeStrip />

      {/* TOOL 1 */}
      <section className="section" id="checker">
        <div className="container">
          <SectionHead
            eyebrow="Tool 01"
            title="AI Visibility Checker"
            sub="See whether ChatGPT, Perplexity, Gemini and friends actually mention your brand when buyers ask."
          />
          <VisibilityChecker />
        </div>
      </section>

      {/* TOOL 2 */}
      <section className="section" id="checklist" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="Tool 02"
            title="AI Visibility Checklist"
            sub="Tick off 20 essentials across technical SEO, content, authority and AI signals — watch your score climb live."
          />
          <Checklist />
        </div>
      </section>

      {/* TOOL 3 */}
      <section className="section" id="guides" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="Tool 03"
            title="Ranking Guides"
            sub="Step-by-step playbooks to rank on the two search engines that still matter most."
          />
          <GuidesTabs />
        </div>
      </section>

      <CTABand
        title="Want us to do it for you?"
        subtitle="Our team turns these checklists into rankings and AI citations for security brands every day. Get a free, no-obligation audit."
        ctaLabel="Get your free audit →"
        ctaHref="/contact/"
      />
    </>
  )
}
