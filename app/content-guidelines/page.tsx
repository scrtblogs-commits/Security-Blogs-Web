import ArticleLayout from '@/components/ui/ArticleLayout'

export const metadata = {
  title: 'Content Guidelines · SecurityBlogs',
  description: 'Editorial guidelines for contributors and guest authors writing for SecurityBlogs — covering originality, formatting, links, E-E-A-T, SEO requirements and our review process.',
}

const toc = [
  { id: 'overview', label: 'Overview' },
  { id: 'who-can-contribute', label: 'Who Can Contribute' },
  { id: 'topic-relevance', label: 'Topic Relevance' },
  { id: 'originality', label: 'Originality & Plagiarism' },
  { id: 'word-count', label: 'Word Count & Formatting' },
  { id: 'links', label: 'Links & Promotion' },
  { id: 'eeat', label: 'E-E-A-T & Author Credentials' },
  { id: 'images', label: 'Images & Media' },
  { id: 'prohibited', label: 'Prohibited Content' },
  { id: 'seo', label: 'SEO Requirements' },
  { id: 'review', label: 'Review Process & Timeline' },
  { id: 'editorial-rights', label: 'Editorial Rights' },
  { id: 'contact', label: 'Contact the Editors' },
]

export default function ContentGuidelinesPage() {
  return (
    <ArticleLayout
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Content Guidelines' }]}
      title="Content Guidelines"
      subtitle="Last updated: May 2026"
      toc={toc}
    >
      <h2 id="overview">Overview</h2>
      <p>
        Thank you for your interest in contributing to SecurityBlogs. We publish high-quality, original
        editorial content that helps security businesses grow their visibility across search engines and
        AI platforms. These guidelines set out what we expect from contributors and guest authors so that
        every piece we publish meets our editorial standards and serves our readers. Please read them in
        full before submitting a pitch or draft.
      </p>

      <h2 id="who-can-contribute">Who Can Contribute</h2>
      <p>
        We welcome submissions from practitioners, marketers and subject-matter experts who can offer
        genuine insight to a security-industry audience. Ideal contributors include:
      </p>
      <ul>
        <li>Security business owners, operators and consultants.</li>
        <li>Marketing, SEO and AI visibility specialists with security-sector experience.</li>
        <li>Technology vendors and integrators serving the security market.</li>
        <li>Researchers and analysts covering physical and cyber security trends.</li>
      </ul>
      <p>
        Contributors should be willing to provide verifiable credentials and a short author bio. We do not
        accept anonymous submissions or content produced solely by automated tools without meaningful human
        expertise and editing.
      </p>

      <h2 id="topic-relevance">Topic Relevance (Security Industry)</h2>
      <p>
        All content must be directly relevant to the security industry and our audience of security
        business decision-makers and marketers. Suitable topics include security marketing, AI visibility,
        SEO, lead generation, industry trends, technology adoption, compliance and operational best
        practice. Pitches that are off-topic, overly generic, or only loosely connected to security will
        not be accepted.
      </p>

      <h2 id="originality">Originality &amp; Plagiarism</h2>
      <p>
        Every submission must be 100% original and written exclusively for SecurityBlogs. We do not accept
        content that has been published elsewhere, spun, or substantially copied from other sources. All
        submissions are checked with plagiarism-detection tools. Quotes and statistics must be properly
        attributed and cited. Any submission found to contain plagiarised material will be rejected and the
        contributor may be barred from future submissions.
      </p>

      <h2 id="word-count">Word Count &amp; Formatting</h2>
      <p>
        Articles should be a minimum of 800 words, with most well-developed pieces ranging between 1,000 and
        2,000 words. To keep content readable and scannable, please follow these formatting conventions:
      </p>
      <ul>
        <li>Use a clear, descriptive working title and logical heading structure (H2 and H3).</li>
        <li>Keep paragraphs short — generally two to four sentences.</li>
        <li>Use bullet or numbered lists to break down complex points.</li>
        <li>Write in clear, professional, plain English and avoid unexplained jargon.</li>
        <li>Submit drafts in Google Docs or a clean Word document with formatting applied via headings, not manual styling.</li>
      </ul>

      <h2 id="links">Links &amp; Promotion</h2>
      <p>
        We allow relevant, value-adding links within content, subject to the following limits:
      </p>
      <ul>
        <li>A maximum of <strong>two dofollow links</strong> to a contributor&apos;s own website or resources.</li>
        <li>Links must point to relevant, high-quality, non-spammy destinations.</li>
        <li>Additional outbound links to authoritative third-party sources are encouraged where they support the content.</li>
        <li>Overtly promotional, affiliate or low-quality links may be removed or marked nofollow at our discretion.</li>
      </ul>
      <p>Content that reads as an advertisement rather than a genuinely useful article will not be published.</p>

      <h2 id="eeat">E-E-A-T &amp; Author Credentials</h2>
      <p>
        We prioritise content that demonstrates Experience, Expertise, Authoritativeness and Trustworthiness
        (E-E-A-T). To support this, contributors must provide:
      </p>
      <ul>
        <li>A concise author bio (40–60 words) describing relevant experience and qualifications.</li>
        <li>A professional headshot and a link to a verifiable profile (such as LinkedIn or a company page).</li>
        <li>First-hand examples, data or experience that substantiate the claims made in the article.</li>
      </ul>

      <h2 id="images">Images &amp; Media</h2>
      <p>
        Where images, diagrams, screenshots or charts strengthen an article, we encourage their use.
        Contributors must ensure they own the rights to any media submitted or that it is properly licensed
        for commercial use. Please supply images at high resolution, include descriptive alt text, and credit
        sources where required. We may resize, compress or replace media for performance and consistency.
      </p>

      <h2 id="prohibited">Prohibited Content</h2>
      <p>We will not publish content that:</p>
      <ul>
        <li>Is plagiarised, defamatory, misleading or factually unsupported.</li>
        <li>Contains hate speech, harassment, discrimination or illegal material.</li>
        <li>Promotes unsafe, unethical or non-compliant security practices.</li>
        <li>Is purely promotional, contains hidden affiliate schemes, or is keyword-stuffed.</li>
        <li>Infringes intellectual property or privacy rights.</li>
      </ul>

      <h2 id="seo">SEO Requirements</h2>
      <p>
        Because our content is built to perform in search and AI platforms, contributors should submit basic
        on-page SEO elements alongside each draft:
      </p>
      <ul>
        <li>A meta title of up to 60 characters that includes the primary keyword.</li>
        <li>A meta description of up to 155 characters that accurately summarises the article.</li>
        <li>A suggested short, hyphenated URL slug (for example, security-seo-best-practices).</li>
        <li>A clear primary keyword or topic focus, with natural rather than forced keyword usage.</li>
      </ul>

      <h2 id="review">Review Process &amp; Timeline</h2>
      <p>
        After you submit a pitch or draft, our editorial team will review it for relevance, quality and
        compliance with these guidelines. We typically respond within five to ten business days. Accepted
        drafts may go through one or more rounds of revision before publication. We will let you know the
        expected publication date once your article has been approved. Submission does not guarantee
        publication.
      </p>

      <h2 id="editorial-rights">Editorial Rights</h2>
      <p>
        SecurityBlogs reserves the right to edit submissions for clarity, accuracy, length, style, SEO and
        consistency with our editorial voice. We may add or adjust headings, internal links and media. We
        also reserve the right to decline, unpublish or update any content at our discretion. By submitting
        content, you grant us a licence to publish, edit and promote it across our website and channels.
      </p>

      <h2 id="contact">Contact the Editors</h2>
      <p>
        To pitch an idea or submit a draft, please email our editorial team at{' '}
        <a href="mailto:hello@securityblogs.com.au">hello@securityblogs.com.au</a>. You can also reach us via
        our <a href="/contact/">contact page</a>. We look forward to reading your ideas.
      </p>
    </ArticleLayout>
  )
}
