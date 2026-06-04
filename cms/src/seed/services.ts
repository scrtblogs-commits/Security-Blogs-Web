// Seed the 7 service offerings from current production data.
// Idempotent: upserts each service by slug.
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../../payload.config'

type ServiceSeed = {
  slug: string
  title: string
  shortDesc: string
  intro: string
  heroBadge: string
  accentColor: string
  sortOrder: number
  statChip: string
  capabilities: Array<{ title: string; description: string; previewVariant: string }>
  processSteps: Array<{ title: string; description: string; previewVariant?: string }>
  stats: Array<{ num: string; label: string; sub?: string; trend?: 'up' | 'flat' | 'down' }>
  faqs: Array<{ q: string; a: string }>
  benefits: Array<{ title: string; description: string }>
}

const SERVICES: ServiceSeed[] = [
  {
    slug: 'security-seo',
    title: 'Security SEO',
    shortDesc: 'Rank #1 for every high-intent security keyword your buyers search.',
    intro: 'Specialist security-industry SEO. Technical, on-page, content and link strategy built exclusively for security brands.',
    heroBadge: 'SECURITY SEO',
    accentColor: '#1e9e75',
    sortOrder: 10,
    statChip: '+180% organic traffic',
    capabilities: [
      { title: 'On-Page SEO',     description: 'Title tags, headings, internal linking and content optimised around the exact terms your security buyers search.', previewVariant: 'on-page' },
      { title: 'Technical SEO',   description: 'Crawlability, Core Web Vitals, schema, indexation and site architecture engineered for fast, clean rankings.',     previewVariant: 'technical-seo' },
      { title: 'Local SEO',       description: 'Google Business Profile, citations and location pages so you dominate every city and service area you operate in.', previewVariant: 'local-seo' },
      { title: 'Content Strategy', description: 'E-E-A-T-rich content built around buyer intent, compliance topics and high-converting service pages.',             previewVariant: 'content-cluster' },
      { title: 'Link Building',    description: 'Authoritative, industry-relevant backlinks that build trust signals search engines reward.',                       previewVariant: 'backlinks' },
      { title: 'Rank Tracking',    description: 'Transparent monthly reporting on every keyword, position movement and traffic gain — no vanity metrics.',         previewVariant: 'rank-tracking' },
    ],
    processSteps: [
      { title: 'Audit & Baseline', description: 'Full technical + content + link-profile baseline.' },
      { title: 'Fix & Foundations', description: 'Core Web Vitals, schema, sitemap, indexation locked in.' },
      { title: 'Content Sprint',    description: 'High-intent content built on E-E-A-T principles.' },
      { title: 'Authority Building', description: 'Earned + editorial links from security publications.' },
    ],
    stats: [
      { num: '+180%', label: 'Average organic traffic growth', trend: 'up' },
      { num: '#1',    label: 'Average top position won' },
      { num: '94%',   label: 'Client retention' },
      { num: '50+',   label: 'Security brands served' },
    ],
    faqs: [
      { q: 'How long until I see results?', a: 'First wins appear in 60–90 days; compounding growth from month 4 onwards.' },
      { q: 'Do you guarantee rankings?',     a: 'No serious SEO partner does — we guarantee the inputs (technical health, content quality, link earning) that drive rankings.' },
    ],
    benefits: [
      { title: 'Rank for high-intent buyer keywords', description: 'Every line of content targets terms with actual purchase intent.' },
      { title: 'Technical + on-page + content built for security', description: 'Compliance-aware, jargon-correct, industry-tuned.' },
      { title: 'Local & national domination',        description: 'Every city, every service area, every search-intent variant.' },
    ],
  },
  {
    slug: 'aio',
    title: 'AIO',
    shortDesc: 'Get cited by ChatGPT, Perplexity & every AI answer engine.',
    intro: 'AI Optimisation makes your security brand discoverable, trustworthy and citable by ChatGPT, Perplexity, Gemini, Google AI and every answer engine.',
    heroBadge: 'AI OPTIMISATION',
    accentColor: '#6f4dff',
    sortOrder: 20,
    statChip: '87% AI citation rate',
    capabilities: [
      { title: 'Schema Markup',           description: 'Structured schema that tells AI systems exactly what your security brand does, serves and is trusted for.', previewVariant: 'schema' },
      { title: 'Semantic Content Mapping', description: 'Content modelled around the topics, entities and questions AI engines associate with your niche.',          previewVariant: 'semantic' },
      { title: 'Structured Data',          description: 'Clean, machine-readable data layers so answer engines can parse and cite your information with confidence.', previewVariant: 'structured-data' },
      { title: 'Entity Signal Building',   description: 'Consistent signals across the web that establish your brand as a recognised, authoritative entity.',         previewVariant: 'signal-meters' },
      { title: 'Content Freshness',        description: 'Ongoing updates and new assets that keep your brand current in fast-moving AI indexes.',                      previewVariant: 'freshness' },
      { title: 'Citation Monitoring',      description: 'Track when and where ChatGPT, Perplexity and Gemini mention your brand — and grow the share.',                previewVariant: 'citations' },
    ],
    processSteps: [
      { title: 'AI Visibility Audit',      description: 'We test how every major AI platform sees, describes and cites your security brand today.' },
      { title: 'Schema & Structure',       description: 'Implement schema, structured data and entity markup that make your brand machine-readable.' },
      { title: 'Citable Content Build',    description: 'Create authoritative, well-sourced content assets engineered to be quoted by answer engines.' },
      { title: 'Monitor & Optimise',       description: 'Track AI citations across platforms and refine signals to expand your mention share over time.' },
    ],
    stats: [
      { num: '87%', label: 'Average AI citation rate',      trend: 'up' },
      { num: '6',   label: 'AI platforms targeted' },
      { num: '47',  label: 'Average AI mentions per month', trend: 'up' },
      { num: '3.2×', label: 'More inbound leads',           trend: 'up' },
    ],
    faqs: [
      { q: 'What exactly is AIO?',          a: 'AIO (AI Optimisation) structures your brand, content and data so AI platforms like ChatGPT, Perplexity and Gemini can discover, trust and cite you in their answers.' },
      { q: 'How is AIO different from SEO?', a: 'SEO ranks pages; AIO makes your brand the source AI engines pull from when generating answers.' },
    ],
    benefits: [
      { title: 'Engineered to be cited by ChatGPT & Perplexity', description: '' },
      { title: 'Entity & schema foundations', description: '' },
      { title: 'Citable, authoritative content assets', description: '' },
    ],
  },
  {
    slug: 'aeo',
    title: 'AEO',
    shortDesc: 'Become the featured answer in AI-generated responses.',
    intro: 'Answer Engine Optimisation: structure your content as the answer AI engines lift verbatim.',
    heroBadge: 'ANSWER ENGINE OPTIMISATION',
    accentColor: '#7f77dd',
    sortOrder: 30,
    statChip: '3.4× featured answers',
    capabilities: [
      { title: 'Answer Optimisation',  description: 'Content structured as clear, authoritative answers AI engines can lift and present verbatim.', previewVariant: 'answer-box' },
      { title: 'Featured Snippets',    description: 'Format and target the question-led queries that win position-zero snippets on Google.',         previewVariant: 'featured-snippet' },
      { title: 'FAQ Schema',           description: 'Marked-up Q&A that feeds AI assistants and voice results with crisp, citable responses.',        previewVariant: 'faq-schema' },
      { title: 'Voice Search Ready',   description: 'Natural-language content tuned for the conversational queries voice and AI assistants handle.', previewVariant: 'voice' },
      { title: 'AI Snippet Capture',   description: 'Engineer the passages AI overviews and chat assistants extract when buyers ask about your services.', previewVariant: 'ai-overview' },
      { title: 'Brand Authority Signals', description: 'E-E-A-T, reviews and trust markers that make AI confident enough to recommend you by name.', previewVariant: 'eeat' },
    ],
    processSteps: [
      { title: 'Question Discovery',  description: 'Identify the precise questions your buyers ask AI assistants and search engines.' },
      { title: 'Answer Engineering',  description: 'Restructure content into definitive, citable answers with the right schema.' },
      { title: 'Schema Implementation', description: 'FAQ, HowTo, QAPage schema markup wired into the right templates.' },
      { title: 'Position Tracking',   description: 'Monitor featured-snippet and AI-overview placements monthly.' },
    ],
    stats: [
      { num: '3.4×',  label: 'Average featured-answer wins', trend: 'up' },
      { num: '#0',    label: 'Position-zero targeting' },
      { num: '100%',  label: 'FAQ schema validated' },
      { num: '8 wks', label: 'Average to first AI overview' },
    ],
    faqs: [
      { q: 'How does AEO differ from AIO?', a: 'AIO targets the entity layer so AI knows about you; AEO targets the answer layer so AI uses your exact words.' },
    ],
    benefits: [
      { title: 'Win featured answers & snippets', description: '' },
      { title: 'Structured FAQ & Q&A optimisation', description: '' },
      { title: 'Answer-first content architecture', description: '' },
    ],
  },
  {
    slug: 'geo',
    title: 'GEO',
    shortDesc: 'Build entity authority so AI platforms trust your brand.',
    intro: "GEO (Generative Engine Optimisation) makes AI platforms recognise, trust and consistently recommend your security brand by building your entity authority across the entire AI ecosystem.",
    heroBadge: 'GENERATIVE ENGINE OPTIMISATION',
    accentColor: '#e23744',
    sortOrder: 40,
    statChip: 'Verified entity in 90 days',
    capabilities: [
      { title: 'Entity Building',          description: 'Establish your security brand as a defined, recognised entity AI systems can identify with confidence.', previewVariant: 'entity-card' },
      { title: 'Knowledge Panel Optimisation', description: 'Shape the knowledge panels and brand cards that surface across Google and AI platforms.',           previewVariant: 'knowledge-panel' },
      { title: 'Brand Signal Distribution', description: 'Seed consistent, authoritative signals across the directories and sources AI engines learn from.',     previewVariant: 'signal-distribution' },
      { title: 'Cross-Platform Consistency', description: 'Align how every AI platform describes your brand so the story is identical everywhere.',               previewVariant: 'cross-platform' },
      { title: 'NAP Consistency',          description: 'Lock in matching Name, Address and Phone data across the web to reinforce entity trust.',                previewVariant: 'nap' },
      { title: 'AI Platform Confirmation', description: 'Verify and confirm your entity directly with the AI platforms that matter to your buyers.',              previewVariant: 'confirmation' },
    ],
    processSteps: [
      { title: 'Entity Creation & Verification',        description: 'Define and verify your brand entity with structured data and authoritative source profiles.' },
      { title: 'Signal Distribution Across Platforms', description: 'Push consistent brand signals into the directories, knowledge bases and sources AI engines trust.' },
      { title: 'Authority Building & Citations',        description: 'Earn citations and references that strengthen your entity authority across the AI ecosystem.' },
      { title: 'AI Confirmation & Monitoring',          description: 'Confirm recognition on each platform and monitor how AI describes and recommends your brand.' },
    ],
    stats: [
      { num: '6',       label: 'AI platforms confirming your entity' },
      { num: '90 days', label: 'Average to verified entity' },
      { num: '100%',    label: 'NAP consistency achieved' },
      { num: '4.5×',    label: 'More branded AI recommendations', trend: 'up' },
    ],
    faqs: [
      { q: 'What is GEO?', a: 'GEO builds your brand into the knowledge graphs AI platforms rely on, so they recognise your entity, trust your data and consistently recommend you by name.' },
    ],
    benefits: [
      { title: 'Build a verified knowledge-graph entity', description: '' },
      { title: 'Cross-platform authority signals',         description: '' },
      { title: 'Wikidata & directory presence',            description: '' },
    ],
  },
  {
    slug: 'google-ads',
    title: 'Google Ads',
    shortDesc: 'High-converting PPC campaigns built for security buyers.',
    intro: 'High-converting Google Ads campaigns engineered for security buyers. 3.2× average ROAS, transparent reporting and conversion tracking built in.',
    heroBadge: 'GOOGLE ADS',
    accentColor: '#f6c715',
    sortOrder: 50,
    statChip: '3.2× average ROAS',
    capabilities: [
      { title: 'Search Intent Targeting', description: 'We bid only on keywords with genuine buyer intent — "commercial CCTV installer", "access control quote" — not tyre-kicker traffic.', previewVariant: 'keywords' },
      { title: 'Geo-Targeting by Suburb',  description: 'Concentrate spend on the suburbs and service radius where your highest-value security jobs actually convert.', previewVariant: 'geo-target' },
      { title: 'Budget & Bid Control',     description: 'Smart bidding tuned to your margins, with day-parting and device adjustments so no dollar is wasted.',          previewVariant: 'bid' },
      { title: 'Conversion Tracking',      description: 'Calls, forms and quote requests tracked end-to-end so every lead is attributed to the exact keyword and ad.',    previewVariant: 'funnel' },
      { title: 'Remarketing Audiences',    description: 'Stay in front of buyers who viewed your quote page but did not convert across Search, Display and YouTube.',      previewVariant: 'remarketing' },
      { title: 'Competitor Keyword Targeting', description: 'Appear above rival security firms when buyers search their brand names — and win the click with a stronger offer.', previewVariant: 'auction' },
    ],
    processSteps: [
      { title: 'Keyword + Audit',     description: 'Comprehensive keyword + competitor audit.' },
      { title: 'Campaign Build',      description: 'Search, Display, YouTube structured for security buyers.' },
      { title: 'Conversion Tracking', description: 'Calls, forms, demo bookings all wired to GA4 + Ads.' },
      { title: 'Optimisation',        description: 'Weekly bid + creative + audience tuning.' },
    ],
    stats: [
      { num: '3.2×', label: 'Average ROAS', trend: 'up' },
      { num: '$12.04', label: 'Average CPC' },
      { num: '7.1%', label: 'Average CTR' },
      { num: '184',  label: 'Average monthly conversions', trend: 'up' },
    ],
    faqs: [
      { q: 'Will you run my account or transfer ownership?', a: 'You own the Google Ads account, billing and data. We have manager-level access only.' },
    ],
    benefits: [
      { title: 'Security-buyer keyword targeting',     description: '' },
      { title: 'Conversion-optimised landing pages',   description: '' },
      { title: 'Transparent ROAS reporting',            description: '' },
    ],
  },
  {
    slug: 'bing-ads',
    title: 'Bing Ads',
    shortDesc: 'Capture 41% of B2B buyers searching on Microsoft Bing.',
    intro: 'Microsoft Ads (formerly Bing Ads): reach 41% of B2B buyers searching on Bing, with lower CPCs and LinkedIn audience targeting.',
    heroBadge: 'MICROSOFT ADS',
    accentColor: '#0078d4',
    sortOrder: 60,
    statChip: '41% lower CPC',
    capabilities: [
      { title: 'LinkedIn Audience Targeting', description: 'Target security buyers by job title, industry, company size and seniority — profile data only Microsoft can offer.', previewVariant: 'linkedin' },
      { title: 'Lower CPCs Than Google',      description: 'Less competition on Microsoft means the same high-intent security clicks at roughly half the cost-per-click.',       previewVariant: 'cpc' },
      { title: 'B2B Decision Makers',         description: '41% of B2B buyers use Bing and Microsoft properties — often older, higher-budget commercial decision-makers.',        previewVariant: 'b2b' },
      { title: 'Microsoft Clarity Analytics', description: 'Free session recordings and heatmaps reveal exactly how security buyers interact with your landing pages.',            previewVariant: 'clarity' },
      { title: 'Sequential Remarketing',      description: 'Show buyers a story across the Audience Network — awareness, proof, then offer — until they convert.',                 previewVariant: 'journey' },
      { title: 'Competitor Intelligence',     description: 'Conquest rival security brands and use auction insights to find gaps Google advertisers are ignoring.',                previewVariant: 'auction' },
    ],
    processSteps: [
      { title: 'Audience Build',       description: 'LinkedIn job-title and industry layering.' },
      { title: 'Campaign Build',       description: 'Microsoft Search + Audience Network campaigns.' },
      { title: 'Clarity Wiring',       description: 'Microsoft Clarity heatmaps + session replays.' },
      { title: 'Optimisation Cycle',   description: 'Weekly bid + audience + creative tuning.' },
    ],
    stats: [
      { num: '41%',  label: 'Lower CPC than Google for same keywords', trend: 'up' },
      { num: '41%',  label: 'B2B buyers using Microsoft properties' },
      { num: '0.96', label: 'Average impression share' },
      { num: '53%',  label: 'Cost-per-acquisition reduction' },
    ],
    faqs: [
      { q: 'Why pair Microsoft with Google?', a: 'Microsoft buyers skew older, higher-income, and more B2B than Google buyers. Pairing both maximises reach without keyword cannibalisation.' },
    ],
    benefits: [
      { title: 'Reach 41% of B2B Microsoft searchers',  description: '' },
      { title: 'Lower CPCs, higher-intent clicks',      description: '' },
      { title: 'Cross-network retargeting',             description: '' },
    ],
  },
  {
    slug: 'web-design',
    title: 'Web Design',
    shortDesc: 'AI-ready websites that rank, convert and get cited.',
    intro: "We don't just build beautiful security websites — we build AI-optimised, schema-rich, conversion-focused websites that get your brand found on Google, Bing and every AI platform.",
    heroBadge: 'WEB DESIGN',
    accentColor: '#1e5fe0',
    sortOrder: 70,
    statChip: '2.1× conversion lift',
    capabilities: [
      { title: 'Security Website Design',       description: 'Conversion-focused websites built specifically for security installers, monitoring firms and product brands.', previewVariant: 'browser' },
      { title: 'WordPress Development',         description: 'Fast, secure, easy-to-edit WordPress builds with custom themes and blocks.',                                    previewVariant: 'wp-editor' },
      { title: 'Core Web Vitals Optimisation',  description: 'Every site is engineered for green Core Web Vitals — fast loads, stable layouts and instant interactivity.',     previewVariant: 'cwv' },
      { title: 'Hosting & Maintenance',         description: 'Managed edge hosting, security patching, backups and uptime monitoring.',                                         previewVariant: 'uptime' },
      { title: 'AI Search Architecture',        description: 'Schema-rich, entity-mapped, answer-first architecture so AI engines like ChatGPT and Perplexity can cite your brand.', previewVariant: 'schema-graph' },
      { title: 'Website Redesign',              description: 'Modernise an ageing security site without losing rankings — careful URL mapping, 301 redirects, content migration.', previewVariant: 'before-after' },
    ],
    processSteps: [
      { title: 'Discovery & UX Strategy', description: 'Map buyers, services and competitors; plan a site built to rank, convert and be AI-citable.' },
      { title: 'Design',                  description: 'High-fidelity design with conversion-first information architecture.' },
      { title: 'Build',                   description: 'Schema-first, Core-Web-Vitals-tuned code on Next.js or WordPress.' },
      { title: 'Launch & Optimise',       description: 'Careful migration, 301 mapping, ongoing CWV monitoring.' },
    ],
    stats: [
      { num: '2.1×', label: 'Average conversion lift', trend: 'up' },
      { num: '1.2s', label: 'Average LCP (mobile)' },
      { num: '0.04', label: 'Average CLS' },
      { num: '99.99%', label: 'Hosting uptime' },
    ],
    faqs: [
      { q: 'Will my new website rank on Google?',          a: 'Ranking is engineered in from day one. A new site will not rank overnight, but it will be built on the strongest possible foundation.' },
      { q: 'Will my website be optimised for AI?',          a: 'Yes — schema-rich, entity-mapped, answer-first architecture so AI platforms can understand, trust and cite your brand.' },
    ],
    benefits: [
      { title: 'AI-ready, schema-rich builds',        description: '' },
      { title: 'Fast, Core Web Vitals optimised',     description: '' },
      { title: 'Conversion-focused UX',                description: '' },
    ],
  },
]

async function main() {
  const payload = await getPayload({ config })

  for (const s of SERVICES) {
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: s.slug } },
      limit: 1,
    })

    if (existing.totalDocs > 0) {
      await payload.update({
        collection: 'services',
        id: existing.docs[0].id,
        data: { ...s, status: 'published' },
        overrideAccess: true,
      })
      console.log(`↻ Updated service: ${s.slug}`)
    } else {
      await payload.create({
        collection: 'services',
        data: { ...s, status: 'published' },
        overrideAccess: true,
      })
      console.log(`+ Created service: ${s.slug}`)
    }
  }
  console.log(`✓ ${SERVICES.length} services seeded.`)
  process.exit(0)
}

main().catch((err) => { console.error(err); process.exit(1) })
