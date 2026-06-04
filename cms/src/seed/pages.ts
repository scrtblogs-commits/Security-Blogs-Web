// Seed core Pages from current production copy.
// Idempotent: upserts by slug.
//
// Pages are composed of an ordered `modules` blocks list — each block has
// a `blockType` matching one of the blocks defined in cms/src/collections/Pages.ts.
//
// This seed covers the top 10 pages. Editors finish the rest of the long
// tail (the 7 publish-with-us sub-pages, legal pages, knowledge-hub
// category landings) from the admin UI now that the collection exists.
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../../payload.config'

type PageSeed = {
  slug: string
  title: string
  modules: Array<Record<string, unknown>>
}

const PAGES: PageSeed[] = [
  {
    slug: 'home',
    title: 'SecurityBlogs — The AI Visibility Platform for Security Brands',
    modules: [
      {
        blockType: 'hero',
        badge: 'LIVE · AI VISIBILITY ENGINE',
        h1: 'Be the answer AI gives.',
        h1Highlight: 'answer',
        subtitle: 'When buyers ask ChatGPT, Gemini or Google AI for the best security provider — your brand should be named. We make that happen.',
        ctas: [
          { label: 'Get your free audit →', href: '/contact/', style: 'primary' },
          { label: 'Try the live score',     href: '/free-tools/', style: 'outline' },
        ],
      },
      {
        blockType: 'stats',
        eyebrow: 'The results',
        title: 'Numbers our clients brag about.',
        items: [
          { num: '+180%', label: 'Average organic traffic growth' },
          { num: '3.2×',  label: 'Average ROAS on Google Ads' },
          { num: '87%',   label: 'AI citation rate achieved' },
          { num: '50+',   label: 'Security brands served' },
        ],
      },
      {
        blockType: 'cta-band',
        title: 'Ready to be the answer AI gives?',
        subtitle: 'Get a free AI visibility audit and see exactly where your security brand wins — and where competitors get cited instead of you.',
        ctaLabel: 'Get your free audit →',
        ctaHref: '/contact/',
      },
    ],
  },
  {
    slug: 'about-us',
    title: 'About SecurityBlogs',
    modules: [
      {
        blockType: 'hero',
        badge: 'ABOUT US',
        h1: 'A specialist platform built exclusively for the security industry.',
        subtitle: 'Australian-incorporated and remote-first, serving clients across Australia, the USA, UK, UAE and Singapore.',
        ctas: [
          { label: 'Get your free audit →', href: '/contact/', style: 'primary' },
        ],
      },
      {
        blockType: 'values',
        eyebrow: 'How we work',
        title: 'Values that shape every brief.',
        items: [
          { iconToken: '🛡️',  title: 'Security-exclusive', description: 'We work only with security brands — we know your buyers, your jargon and your compliance.' },
          { iconToken: '🤖',  title: 'AI-native approach', description: 'Every service is built so AI answer engines discover, trust and cite your brand.' },
          { iconToken: '📈', title: 'Proven results',     description: '50+ security brands, +180% average organic growth and an 87% AI citation rate.' },
          { iconToken: '⚙️', title: 'Full-stack team',    description: 'SEO, AIO, paid media, content and engineering under one roof — no agency hand-offs.' },
        ],
      },
    ],
  },
  {
    slug: 'contact',
    title: 'Contact',
    modules: [
      {
        blockType: 'hero',
        badge: "LET'S TALK",
        h1: "Let's get your brand cited.",
        h1Highlight: 'cited',
        subtitle: 'Take the AI visibility challenge below, or send us a message — we reply within 24 hours.',
      },
    ],
  },
  {
    slug: 'case-studies',
    title: 'Case Studies',
    modules: [
      {
        blockType: 'hero',
        badge: 'PROVEN · MEASURABLE OUTCOMES',
        h1: 'Results that speak louder than rankings.',
        h1Highlight: 'rankings',
        subtitle: 'Filter by channel and see exactly how we move the metrics that matter for security brands.',
      },
    ],
  },
  {
    slug: 'free-tools',
    title: 'Free Tools',
    modules: [
      {
        blockType: 'hero',
        badge: 'FREE TOOLS',
        h1: 'See how AI sees your brand.',
        subtitle: 'Run the AI visibility checker and download the audit checklist.',
        ctas: [
          { label: 'Get my AI audit →', href: '/contact/', style: 'primary' },
        ],
      },
    ],
  },
  {
    slug: 'ai-visibility-center',
    title: 'AI Visibility Center',
    modules: [
      {
        blockType: 'hero',
        badge: 'INTERACTIVE',
        h1: 'See your brand the way AI sees it.',
        h1Highlight: 'AI sees it',
        subtitle: 'Every answer engine builds a live model of your security brand — its entities, signals and authority. Explore the 3D model to understand exactly what AI knows about you.',
      },
    ],
  },
  {
    slug: 'book-strategy-call',
    title: 'Book a Strategy Call',
    modules: [
      {
        blockType: 'hero',
        badge: 'FREE · 30 MINUTES',
        h1: 'Book Your Free 30-Min AI Visibility Strategy Call',
        h1Highlight: 'Strategy Call',
        subtitle: 'A focused, no-pressure session that maps exactly how to make your security brand the answer AI gives.',
      },
    ],
  },
  {
    slug: 'career',
    title: 'Career',
    modules: [
      {
        blockType: 'hero',
        badge: 'CAREER',
        h1: 'Build the future of AI visibility with us.',
        subtitle: 'Remote-first, Australia-based. Specialist roles for AI-native marketers, engineers and content strategists.',
      },
    ],
  },
  {
    slug: 'security-directory',
    title: 'Security Directory',
    modules: [
      {
        blockType: 'hero',
        badge: 'DIRECTORY',
        h1: 'Australia\'s specialist security industry directory.',
        subtitle: 'Verified security companies, integrators, monitoring providers and product brands across AU, US, UK, UAE and SG.',
      },
    ],
  },
  {
    slug: 'thank-you',
    title: 'Thank You',
    modules: [
      {
        blockType: 'rich-text',
        title: 'Thanks — we\'ll be in touch within one business day.',
        body: { root: { children: [{ type: 'paragraph', children: [{ text: 'Your message is in our inbox. We reply within 24 hours, Monday to Friday AEST.' }] }], direction: 'ltr', format: '', indent: 0, type: 'root', version: 1 } },
      },
    ],
  },
]

async function main() {
  const payload = await getPayload({ config })

  for (const p of PAGES) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: p.slug } },
      limit: 1,
    })

    const data = { ...p, status: 'published' as const }

    if (existing.totalDocs > 0) {
      await payload.update({ collection: 'pages', id: existing.docs[0].id, data, overrideAccess: true })
      console.log(`↻ Updated page: ${p.slug}`)
    } else {
      await payload.create({ collection: 'pages', data, overrideAccess: true })
      console.log(`+ Created page: ${p.slug}`)
    }
  }
  console.log(`✓ ${PAGES.length} pages seeded.`)
  process.exit(0)
}

main().catch((err) => { console.error(err); process.exit(1) })
