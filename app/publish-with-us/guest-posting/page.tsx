import HeroBg from '@/components/ui/HeroBg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHead from '@/components/ui/SectionHead'
import FAQAccordion from '@/components/ui/FAQAccordion'
import CTABand from '@/components/ui/CTABand'
import Reveal from '@/components/ui/Reveal'
import GuestPostForm from './GuestPostForm'
import GuestPostHeroVisual from './GuestPostHeroVisual'
import GuidelinesAccordion from './GuidelinesAccordion'
import JsonLd from '@/components/JsonLd'
import { serviceSchema } from '@/lib/schema'

export const metadata = {
  title: 'Security Guest Posting — Publish With SecurityBlogs',
  description:
    'Submit an original security guest article to SecurityBlogs. Minimum 800 words, up to 2 dofollow links, original content. Editors respond within 3 business days.',
  alternates: { canonical: '/publish-with-us/guest-posting/' },
  openGraph: {
    title: 'Security Guest Posting — Publish on SecurityBlogs Australia',
    description: 'Guest posting on SecurityBlogs: reach security industry buyers, integrators and decision-makers. Original security articles, up to 2 dofollow links.',
    url: '/publish-with-us/guest-posting/',
    siteName: 'SecurityBlogs Australia',
    type: 'website',
    locale: 'en_AU',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Security Guest Posting — SecurityBlogs' }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Security Guest Posting | SecurityBlogs Australia',
    description: 'Publish a security guest article on SecurityBlogs — reach industry buyers with up to 2 dofollow links.',
    images: ['/logo.png'],
  },
}

const chips = ['Min 800 words', 'Max 2 dofollow links', '100% original content', 'Byline credited', 'Editor review in 3 days']

const guidelines = [
  {
    q: 'Originality & Plagiarism',
    a: 'Every submission must be 100% original, written exclusively for SecurityBlogs, and never published elsewhere — including your own website, Medium, LinkedIn, or any other platform. We run every article through plagiarism detection. AI-generated content that has not been substantially rewritten and fact-checked will be declined.',
  },
  {
    q: 'Relevant Topics',
    a: 'Articles must be directly relevant to the security industry. Accepted topics include: physical security, CCTV & surveillance, access control, alarms & monitoring, cyber security, security consulting, systems integration, smart home security, and SEO/marketing for security businesses. Off-topic submissions (finance, health, unrelated tech) will be rejected.',
  },
  {
    q: 'Length & Structure',
    a: 'Minimum 800 words. Use clear headings (H2 and H3) to structure your article — we recommend at least 3–4 sections. Use short paragraphs (2–4 sentences), bullet points where appropriate, and a strong introduction that hooks the reader. Articles with no structure or headings will be returned for revision.',
  },
  {
    q: 'Links & Backlinks',
    a: 'You may include up to 2 dofollow links in the article body, plus one link in your author bio. All links must point to relevant, high-quality, non-spammy destinations. Links to casino, gambling, adult, pharma, payday loan, or unrelated commercial pages will cause the submission to be rejected. We reserve the right to remove or nofollow any link that does not meet our standards.',
  },
  {
    q: 'Natural Link Integration',
    a: 'Links must be editorially natural — woven into the content as a helpful reference, not forced for SEO gain. Exact-match money keyword anchor text is rarely accepted. Brand name or URL anchors are preferred. Over-optimised anchor text will be changed or the link removed by our editors.',
  },
  {
    q: 'Prohibited Content',
    a: 'We do not publish content that: promotes adult, gambling, illegal weapons, drugs, or hate; makes false or unsubstantiated claims; contains spam or keyword stuffing; attacks individuals or competitors unfairly; or violates Australian or international law. Submissions violating these rules will be permanently rejected and the submitter may be blacklisted.',
  },
  {
    q: 'Formatting Requirements',
    a: 'Submit your article as plain text or Markdown. Use ## for H2 headings and ### for H3. Do not submit Word documents with complex formatting. Images should be high resolution (minimum 1200×630px), original or properly licensed, and provided as a direct URL or attached separately. Always include alt text for images.',
  },
  {
    q: 'Editorial Review & Approval',
    a: 'Our editorial team reviews every article within 3 business days. We may make light edits for grammar, formatting, SEO and house style without notification. For major changes we will contact you first. Approval is at our sole discretion — meeting the guidelines does not guarantee publication. We do not provide individual feedback on rejected submissions.',
  },
]

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

      {/* ── Guidelines section ──────────────────────────────────────────── */}
      <section id="guidelines" className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <SectionHead
            eyebrow="Editorial guidelines"
            title="What we require before publishing."
            sub="Read these carefully before submitting. Submissions that don't meet our guidelines will be declined."
          />
          <Reveal>
            <GuidelinesAccordion items={guidelines} />
          </Reveal>
        </div>
      </section>

      {/* ── Submission form ─────────────────────────────────────────────── */}
      <section id="submit" className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <SectionHead eyebrow="Submission form" title="Submit your guest article." sub="Fill in the details below. Live counters help you meet our editorial guidelines before you submit." />
          <Reveal>
            <GuestPostForm />
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
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
