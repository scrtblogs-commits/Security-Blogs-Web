import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import SectionHead from '@/components/ui/SectionHead'
import Reveal from '@/components/ui/Reveal'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AioCapabilities from './AioCapabilities'
import { AioResults } from './AioLiveSections'
import AioHowItWorks from './AioHowItWorks'
import FAQAccordion from '@/components/ui/FAQAccordion'
import JsonLd from '@/components/JsonLd'
import { serviceSchema } from '@/lib/schema'
import AioSearchVisual from './AioSearchVisual'
import AioAnalyticsDashboard from './AioAnalyticsDashboard'

const ACCENT = '#6f4dff'

export const metadata = {
  title: 'AIO — Get Your Security Brand Cited by Every AI Platform',
  description:
    'AI Optimisation makes your security brand discoverable, trustworthy and citable by ChatGPT, Perplexity, Gemini, Google AI and every answer engine.',
  alternates: { canonical: '/services/aio/' },
  openGraph: {
    title: 'AIO Services for Security Brands — AI Optimisation | SecurityBlogs',
    description: 'Get cited by ChatGPT, Perplexity, Gemini and every AI answer engine with our specialist AIO service for security companies.',
    url: '/services/aio/',
    siteName: 'SecurityBlogs Australia',
    type: 'website',
    locale: 'en_AU',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'AIO Services — SecurityBlogs' }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'AIO — Get Your Security Brand Cited by Every AI Platform',
    description: 'AI Optimisation: get cited by ChatGPT, Perplexity, Gemini and every AI answer engine.',
    images: ['/logo.png'],
  },
}

const capabilities = [
  { icon: '🏷️', title: 'Schema Markup', desc: 'Structured schema that tells AI systems exactly what your security brand does, serves and is trusted for.' },
  { icon: '🧠', title: 'Semantic Content Mapping', desc: 'Content modelled around the topics, entities and questions AI engines associate with your niche.' },
  { icon: '🗂️', title: 'Structured Data', desc: 'Clean, machine-readable data layers so answer engines can parse and cite your information with confidence.' },
  { icon: '🔗', title: 'Entity Signal Building', desc: 'Consistent signals across the web that establish your brand as a recognised, authoritative entity.' },
  { icon: '🔄', title: 'Content Freshness', desc: 'Ongoing updates and new assets that keep your brand current in fast-moving AI indexes.' },
  { icon: '📡', title: 'Citation Monitoring', desc: 'Track when and where ChatGPT, Perplexity and Gemini mention your brand — and grow the share.' },
]

const steps = [
  { title: 'AI Visibility Audit', desc: 'We test how every major AI platform sees, describes and cites your security brand today.' },
  { title: 'Schema & Structure', desc: 'Implement schema, structured data and entity markup that make your brand machine-readable.' },
  { title: 'Citable Content Build', desc: 'Create authoritative, well-sourced content assets engineered to be quoted by answer engines.' },
  { title: 'Monitor & Optimise', desc: 'Track AI citations across platforms and refine signals to expand your mention share over time.' },
]

const stats = [
  { num: '87%', label: 'Average AI citation rate' },
  { num: '6', label: 'AI platforms targeted' },
  { num: '47', label: 'Average AI mentions per month' },
  { num: '3.2×', label: 'More inbound leads' },
]

const faqs = [
  { q: 'What exactly is AIO?', a: 'AIO (AI Optimisation) is the practice of structuring your brand, content and data so AI platforms like ChatGPT, Perplexity and Gemini can discover, trust and cite you in their answers.' },
  { q: 'How is AIO different from SEO?', a: 'SEO ranks pages in search results; AIO makes your brand the source AI engines pull from when generating answers. The two work together, but AIO targets the citation layer of AI responses.' },
  { q: 'Which AI platforms do you optimise for?', a: 'We target the six platforms that matter most for security buyers — ChatGPT, Perplexity, Gemini, Google AI Overviews, Bing Copilot and Claude.' },
  { q: 'How do you measure AI citations?', a: 'We continuously query each platform and track when, where and how your brand is mentioned, then report on your citation rate and mention volume each month.' },
]

export default function AioPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: 'AIO — AI Optimisation',
        description: 'AI Optimisation makes your security brand discoverable, trustworthy and citable by ChatGPT, Perplexity, Gemini, Google AI and every answer engine.',
        slug: 'aio',
        serviceType: 'AI Optimisation',
      })} />
      <HeroBg grid>
        <div className="grid-2" style={{ alignItems: 'center', gap: 48 }}>
          <Reveal>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/' }, { label: 'AIO' }]} />
            <span className="badge" style={{ marginBottom: 22, color: ACCENT, borderColor: `${ACCENT}55`, background: `${ACCENT}14` }}>
              <span className="dot dot-pulse" /> AI OPTIMISATION
            </span>
            <h1 className="h1" style={{ marginBottom: 20 }}>
              Get Your Security Brand{' '}
              <span style={{ color: ACCENT, fontStyle: 'italic' }}>Cited by Every AI Platform</span>
            </h1>
            <p className="lead" style={{ maxWidth: 560, marginBottom: 28 }}>
              AIO (AI Optimisation) is the process of making your security brand discoverable, trustworthy and
              citable by ChatGPT, Perplexity, Gemini, Google AI and every answer engine.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Get your AI visibility audit →</MagneticButton>
              <MagneticButton href="/book-strategy-call/" className="btn btn-outline btn-lg">Book a strategy call</MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <AioSearchVisual />
          </Reveal>
        </div>
      </HeroBg>

      <section className="section" style={{ background: '#f6f8fd' }}>
        <div className="container">
          <SectionHead
            eyebrow="Live analytics"
            title="Real growth. Measurable results."
            sub="See exactly how AIO moves the needle — traffic, AI citations, conversions and acquisition channels, all in one live dashboard."
          />
          <AioAnalyticsDashboard />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What's included"
            title="The full AIO stack for AI-era visibility."
            sub="Every signal AI platforms use to decide which security brands to trust — engineered, monitored and grown."
          />
          <AioCapabilities />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="The results" title="What AIO delivers for security brands." />
          <AioResults />
        </div>
      </section>

      <AioHowItWorks />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead eyebrow="FAQ" title="AIO questions, answered." />
          <FAQAccordion items={faqs} />
        </div>
      </section>
    </>
  )
}
