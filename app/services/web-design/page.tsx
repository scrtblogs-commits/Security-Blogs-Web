import MagneticButton from '@/components/ui/MagneticButton'
import SectionHead from '@/components/ui/SectionHead'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Bento from '@/components/ui/Bento'
import ProcessSteps from '@/components/ui/ProcessSteps'
import FAQAccordion from '@/components/ui/FAQAccordion'
import ContactForm from '@/components/ui/ContactForm'
import SpiralAnimation from '@/components/ui/SpiralAnimation'
import CodeTypingAnimation from '@/components/ui/CodeTypingAnimation'
import DualSerp from './DualSerp'
import JsonLd from '@/components/JsonLd'
import { serviceSchema } from '@/lib/schema'

const ACCENT = '#1e5fe0'

export const metadata = {
  title: 'AI-Ready Security Website Design',
  description:
    'We build AI-optimised, schema-rich, conversion-focused security websites that rank on Google and Bing — and get cited by ChatGPT, Perplexity and every AI platform.',
  alternates: { canonical: '/services/web-design/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/services/web-design/' },
}

const bento = [
  { icon: '🛡️', title: 'Security Website Design', desc: 'Conversion-focused websites built specifically for security installers, monitoring firms and product brands — designed to turn visitors into qualified enquiries.' },
  { icon: '🧩', title: 'WordPress Development', desc: 'Fast, secure, easy-to-edit WordPress builds with custom themes and blocks so your team can update content without touching code.' },
  { icon: '⚡', title: 'Core Web Vitals Optimisation', desc: 'Every site is engineered for green Core Web Vitals — fast loads, stable layouts and instant interactivity that Google and buyers reward.' },
  { icon: '🔧', title: 'Hosting & Maintenance', desc: 'Managed edge hosting, security patching, backups and uptime monitoring so your site stays fast, safe and online — hands-off for you.' },
  { icon: '🤖', title: 'AI Search Architecture', desc: 'Schema-rich, entity-mapped, answer-first architecture so AI engines like ChatGPT and Perplexity can understand and cite your brand.' },
  { icon: '🎨', title: 'Website Redesign', desc: 'Modernise an ageing security site without losing rankings — we migrate carefully, preserve equity and lift conversions and speed.' },
]

const steps = [
  { title: 'Discovery & UX Strategy', desc: 'We map your buyers, services and competitors, then plan a site structure built to rank, convert and be AI-citable.' },
  { title: 'Design & Brand System', desc: 'A polished, trustworthy design system tailored to the security industry — credible, modern and conversion-driven.' },
  { title: 'Development & Testing', desc: 'Clean, fast, schema-rich code with Core Web Vitals tuning and cross-device QA before anything goes live.' },
  { title: 'Launch & Ongoing Optimisation', desc: 'Careful launch with redirects and tracking, then continuous optimisation for rankings, AI visibility and conversions.' },
]

const techStack = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Framer Motion', 'Vercel', 'Cloudflare', 'Google Analytics', 'Search Console']

const faqs = [
  { q: 'How long does a security website take to build?', a: 'A typical security website takes 4–8 weeks from kickoff to launch, depending on page count and content readiness. A larger multi-service or multi-location site can run 8–12 weeks. We share a clear timeline with milestones at the start so you always know what happens next.' },
  { q: 'Do you build on WordPress or custom code?', a: 'Both — we recommend the right tool for your goals. WordPress is ideal when your team needs to edit content easily and frequently. Custom builds on Next.js/React are best when speed, AI architecture and bespoke functionality matter most. We’ll advise honestly based on your needs, not ours.' },
  { q: 'Will my new website rank on Google?', a: 'Ranking is engineered in from day one: clean technical foundations, fast Core Web Vitals, semantic structure, schema markup and keyword-mapped content. A new site won’t rank overnight, but it will be built on the strongest possible foundation — and we offer ongoing SEO to accelerate it.' },
  { q: "What's included in the price?", a: 'Strategy, UX, design, development, responsive build, on-page SEO, schema markup, Core Web Vitals optimisation, analytics setup and launch. We quote a fixed scope up front with no surprise add-ons, and clearly flag anything optional like ongoing maintenance or content writing.' },
  { q: 'Do you handle hosting?', a: 'Yes — we offer managed edge hosting on Vercel and Cloudflare with SSL, backups, security patching and uptime monitoring included. You can also host elsewhere if you prefer; we’ll hand over a clean, well-documented build either way.' },
  { q: 'Can you redesign my existing website?', a: 'Absolutely. We modernise ageing security sites while protecting your existing rankings — careful URL mapping, 301 redirects and content migration mean you keep your SEO equity while gaining speed, design and conversion improvements.' },
  { q: 'Will my website be optimised for AI?', a: 'Yes, and it’s a core focus. We build schema-rich, entity-mapped, answer-first architecture so AI platforms like ChatGPT, Perplexity, Google AI Overviews and Gemini can understand, trust and cite your brand when buyers ask them security questions.' },
  { q: 'What ongoing support do you offer?', a: 'Beyond maintenance and hosting, we offer ongoing optimisation packages covering SEO, AI visibility, Core Web Vitals monitoring, content updates and conversion rate testing — so your site keeps improving long after launch.' },
]

const formFields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'email', label: 'Email', type: 'email' as const, required: true },
  { name: 'phone', label: 'Phone', required: true },
  { name: 'company', label: 'Company', required: true },
  { name: 'website', label: 'Current website URL', placeholder: 'https://' },
  { name: 'service', label: 'Service', type: 'select' as const, options: ['New website', 'Redesign', 'WordPress dev', 'Maintenance'] },
  { name: 'timeline', label: 'Timeline', type: 'select' as const, options: ['ASAP', '1–2 months', '3+ months', 'Just researching'] },
  { name: 'budget', label: 'Budget', type: 'select' as const, options: ['$0–3k', '$3k–8k', '$8k–20k', '$20k+'] },
  { name: 'message', label: 'Tell us about your project', type: 'textarea' as const, required: true, full: true },
]

export default function WebDesignPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: 'AI-Ready Security Website Design',
        description: 'We build AI-optimised, schema-rich, conversion-focused security websites that rank on Google and Bing — and get cited by ChatGPT, Perplexity and every AI platform.',
        slug: 'web-design',
        serviceType: 'Web Design & Development',
      })} />
      <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <SpiralAnimation tint={ACCENT} />
        <div className="container z1">
          <Reveal>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/' }, { label: 'Web Design' }]} />
            <span className="badge badge-blue" style={{ marginBottom: 22 }}>
              <span className="dot dot-pulse" /> AI-READY SECURITY WEB DESIGN
            </span>
            <h1 className="h1" style={{ marginBottom: 20, maxWidth: 940 }}>
              AI-Ready Security Websites That{' '}
              <span style={{ color: ACCENT, fontStyle: 'italic' }}>Rank, Convert &amp; Get Cited</span>
            </h1>
            <p className="lead" style={{ maxWidth: 700, marginBottom: 28 }}>
              We don&apos;t just build beautiful security websites — we build AI-optimised, schema-rich,
              conversion-focused websites that get your brand found on Google, Bing and every AI platform.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Start your project →</MagneticButton>
              <MagneticButton href="/book-strategy-call/" className="btn btn-outline btn-lg">Book a strategy call</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="How we build" title="Watch an AI-ready security site come to life." sub="Schema-first architecture, Core Web Vitals tuning and edge deployment — built in from the first line of code." />
          <CodeTypingAnimation />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Dual SERP climb" title="From page two to #1 — on Google and Bing." sub="Watch a security brand climb both search engines, then surface inside the AI answers buyers actually read." />
          <DualSerp />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="What we build" title="Everything your security brand needs online." />
          <Bento cells={bento} cols={3} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Our process" title="A clear path from idea to launch." />
          <ProcessSteps steps={steps} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Our stack" title="Built on a modern, AI-ready tech stack." />
          <Reveal>
            <div className="flex flex-wrap gap-3 justify-center">
              {techStack.map((t) => (
                <span key={t} className="chip" style={{ fontSize: 14.5, padding: '10px 18px' }}>{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead eyebrow="FAQ" title="Web design questions, answered honestly." />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead eyebrow="Start your project" title="Tell us about your security website." sub="Share a few details and we'll come back with a tailored plan, timeline and quote." />
          <ContactForm
            fields={formFields}
            submitLabel="Send project brief →"
            successMsg="✓ Brief received! We'll review it and reply with a tailored plan within 24 hours."
          />
        </div>
      </section>

      <CTABand
        title="Ready for a security website that works as hard as you do?"
        subtitle="Get a free website + AI-visibility review and a clear plan to rank, convert and get cited."
        ctaLabel="Start your project →"
        ctaHref="/contact/"
      />
    </>
  )
}
