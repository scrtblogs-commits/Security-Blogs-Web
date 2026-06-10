import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import FAQAccordion from '@/components/ui/FAQAccordion'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import GuestPostForm from './GuestPostForm'
import GuestPostHeroVisual from './GuestPostHeroVisual'
import JsonLd from '@/components/JsonLd'
import { serviceSchema } from '@/lib/schema'

export const metadata = {
  title: 'Guest Posting · Publish With Us',
  description:
    'Submit an original guest article to SecurityBlogs. Minimum 800 words, up to 2 dofollow links, original content. Editors respond within 3 business days.',
  alternates: { canonical: '/publish-with-us/guest-posting/' },
  openGraph: { siteName: 'SecurityBlogs', url: '/publish-with-us/guest-posting/' },
}

const chips = ['Min 800 words', 'Max 2 dofollow links', '100% original content', 'Byline credited', 'Editor review in 3 days']

const faqs = [
  { q: 'What are the content guidelines?', a: 'Articles must be original (no plagiarism or spun content), at least 800 words, on-topic for the security industry, and include no more than 2 dofollow links to relevant destinations.' },
  { q: 'How long does review take?', a: 'Our editorial team reviews every submission and responds within 3 business days. Approved articles are typically published within another 1–2 days.' },
  { q: 'Can I include a backlink to my site?', a: 'Yes — you may include up to 2 dofollow links plus an author bio link. Links must point to relevant, high-quality, non-spammy destinations.' },
  { q: 'Do you edit my article?', a: 'We may make light edits for grammar, formatting, SEO and house style. Major changes are always confirmed with you before publishing.' },
]

export default function GuestPostingPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: 'Guest Post Submission',
        description: 'Submit an original guest article to SecurityBlogs. Minimum 800 words, up to 2 dofollow links, original content. Editors respond within 3 business days.',
        path: '/publish-with-us/guest-posting/',
        serviceType: 'Content Publishing',
      })} />
      <HeroBg grid>
        <div className="grid-2" style={{ alignItems: 'center', gap: 52 }}>
          <Reveal>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Publish With Us', href: '/publish-with-us/' }, { label: 'Guest Posting' }]} />
            <span className="badge badge-blue" style={{ marginBottom: 20 }}>
              <span className="dot dot-pulse" /> NOW ACCEPTING GUEST POSTS
            </span>
            <h1 className="h1" style={{ maxWidth: 600, marginBottom: 18 }}>
              Get Your Expertise in Front of{' '}
              <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>38,000 Security Professionals</span>.
            </h1>
            <p className="lead" style={{ maxWidth: 520, marginBottom: 24 }}>
              Guest post on SecurityBlogs and earn two dofollow backlinks, a byline, and direct exposure to the buyers, integrators and decision-makers shaping the security industry.
            </p>
            <div className="flex flex-wrap gap-2" style={{ marginBottom: 20 }}>
              {chips.map((c) => <span key={c} className="chip">{c}</span>)}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="#submit" className="btn btn-primary" style={{ padding: '11px 22px' }}>Submit your article →</a>
              <a href="#guidelines" className="btn btn-outline" style={{ padding: '11px 22px' }}>See guidelines</a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <GuestPostHeroVisual />
          </Reveal>
        </div>
      </HeroBg>

      <section id="submit" className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <SectionHead eyebrow="Submission form" title="Submit your guest article." sub="Fill in the details below. Live counters help you meet our editorial guidelines before you submit." />
          <Reveal>
            <GuestPostForm />
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionHead eyebrow="FAQ" title="Guest posting questions." />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTABand
        title="Got a story the security industry needs to hear?"
        subtitle="Submit your guest article today, or reach out to our editorial team to pitch an idea first."
        ctaLabel="Talk to an editor →"
        ctaHref="/contact/"
      />
    </>
  )
}
