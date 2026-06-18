import HorizontalScrollServices from '@/components/effects/HorizontalScrollServices'
import HeroBg from '@/components/ui/HeroBg'
import MagneticButton from '@/components/ui/MagneticButton'
import SectionHead from '@/components/ui/SectionHead'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SeoCapabilities from './SeoCapabilities'
import ProcessSteps from '@/components/ui/ProcessSteps'
import StatsStrip from '@/components/ui/StatsStrip'
import FAQAccordion from '@/components/ui/FAQAccordion'
import ContactForm from '@/components/ui/ContactForm'
import SerpAnimation from '@/components/ui/SerpAnimation'
import JsonLd from '@/components/JsonLd'
import { serviceSchema } from '@/lib/schema'

const ACCENT = '#1e5fe0'

export const metadata = {
  title: 'Security SEO — Rank #1 for Every Security Keyword',
  description:
    "From 'CCTV installation Melbourne' to 'enterprise access control systems' — we get your security business to the top of Google and keep it there.",
  alternates: { canonical: '/services/security-seo/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/services/security-seo/' },
}

const capabilities = [
  { icon: '📄', title: 'On-Page SEO', desc: 'Title tags, headings, internal linking and content optimised around the exact terms your security buyers search.' },
  { icon: '⚙️', title: 'Technical SEO', desc: 'Crawlability, Core Web Vitals, schema, indexation and site architecture engineered for fast, clean rankings.' },
  { icon: '📍', title: 'Local SEO', desc: 'Google Business Profile, citations and location pages so you dominate every city and service area you operate in.' },
  { icon: '✍️', title: 'Content Strategy', desc: 'E-E-A-T-rich content built around buyer intent, compliance topics and high-converting service pages.' },
  { icon: '🔗', title: 'Link Building', desc: 'Authoritative, industry-relevant backlinks that build trust signals search engines reward.' },
  { icon: '📈', title: 'Rank Tracking', desc: 'Transparent monthly reporting on every keyword, position movement and traffic gain — no vanity metrics.' },
]

const steps = [
  { title: 'SEO Audit & Keyword Research', desc: 'Deep technical audit plus a mapped keyword universe of every high-intent term your buyers use.' },
  { title: 'Technical Fixes & On-Page', desc: 'We resolve crawl, speed and schema issues, then optimise pages around prioritised keywords.' },
  { title: 'Content & Link Building', desc: 'Publish authoritative content and earn relevant backlinks that compound your authority.' },
  { title: 'Monitor & Scale', desc: 'Track rankings, double down on winners and expand into new keyword clusters month over month.' },
]

const stats = [
  { num: '100%', label: 'Focused on the security industry' },
  { num: 'No', label: 'Lock-in contracts' },
  { num: 'Monthly', label: 'Reporting on every tracked keyword' },
  { num: '60–90d', label: 'Typical time to first ranking movement' },
]

const faqs = [
  { q: 'How long until I see results?', a: 'Most clients see movement in 60-90 days, with significant ranking improvements at 6 months.' },
  { q: 'Do you only work with security companies?', a: 'Yes. We work exclusively with the security industry — CCTV, access control, alarms, monitoring, cyber security and integrated security.' },
  { q: 'What makes security SEO different?', a: 'Security is a high-trust, compliance-driven industry. Buyers research heavily. Content needs E-E-A-T signals, technical authority and local SEO all working together.' },
  { q: 'Do you guarantee #1 rankings?', a: 'No ethical SEO agency can guarantee specific positions. We guarantee a proven process, transparent reporting and real results — as shown in our case studies.' },
  { q: 'What does your SEO service include?', a: 'Full technical audit, keyword mapping, on-page optimisation, content creation, link building, local SEO and monthly reporting.' },
  { q: 'How much does security SEO cost?', a: 'Packages start from $1,500/month. Book a free strategy call for a custom quote.' },
]

export default function SecuritySeoPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: 'Security SEO',
        description: 'From \'CCTV installation Melbourne\' to \'enterprise access control systems\' — we get your security business to the top of Google and keep it there.',
        slug: 'security-seo',
        serviceType: 'SEO',
      })} />
      <HeroBg grid>
        <div className="grid-2" style={{ alignItems: 'center', gap: 48 }}>
          <Reveal>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/' }, { label: 'Security SEO' }]} />
            <span className="badge" style={{ marginBottom: 22, color: ACCENT, borderColor: `${ACCENT}55`, background: `${ACCENT}14` }}>
              <span className="dot dot-pulse" /> SECURITY SEO
            </span>
            <h1 className="h1" style={{ marginBottom: 20 }}>
              Rank #1 for Every Security Keyword{' '}
              <span style={{ color: ACCENT, fontStyle: 'italic' }}>That Matters</span>
            </h1>
            <p className="lead" style={{ maxWidth: 560, marginBottom: 28 }}>
              From &lsquo;CCTV installation Melbourne&rsquo; to &lsquo;enterprise access control systems&rsquo; — we get your
              security business to the top of Google and keep it there.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Get your free SEO audit →</MagneticButton>
              <MagneticButton href="/book-strategy-call/" className="btn btn-outline btn-lg">Book a strategy call</MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <SerpAnimation />
          </Reveal>
        </div>
      </HeroBg>

      <HorizontalScrollServices />

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What's included"
            title="Everything your security brand needs to own page one."
            sub="A full-stack SEO programme purpose-built for the high-trust, compliance-driven security industry."
          />
          <SeoCapabilities />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="How it works" title="A proven four-step path to #1." />
          <ProcessSteps steps={steps} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Why security brands choose us" title="A programme built for the security industry." />
          <StatsStrip items={stats} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead eyebrow="FAQ" title="Security SEO questions, answered." />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start', gap: 40 }}>
            <Reveal>
              <span className="eyebrow">Let&rsquo;s talk</span>
              <h2 className="h2" style={{ margin: '12px 0 14px' }}>Get your free security SEO audit.</h2>
              <p className="lead" style={{ marginBottom: 22 }}>
                Tell us about your security business and we&rsquo;ll show you exactly which keywords you can win — and how fast.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['No lock-in contracts', 'Reporting on every keyword', 'Built only for security brands'].map((b) => (
                  <div key={b} className="flex items-center gap-2 text-soft" style={{ fontSize: 15 }}>
                    <span style={{ color: ACCENT }}>✓</span>{b}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <ContactForm submitLabel="Request my SEO audit →" />
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to dominate security search?"
        subtitle="Book a free strategy call and we'll map the exact keywords that will drive qualified leads to your security business."
        ctaLabel="Book my free strategy call →"
        ctaHref="/book-strategy-call/"
      />
    </>
  )
}
