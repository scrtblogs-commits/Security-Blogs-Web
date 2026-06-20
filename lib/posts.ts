// Static blog posts for the Knowledge Hub. Self-contained (no CMS dependency)
// so posts render and deploy with the site. Written by the SecurityBlogs team
// as practical, vendor-neutral guidance — no fabricated statistics or claims.

export type BlogCategory = 'SEO' | 'AIO/AEO' | 'GEO' | 'Paid Ads' | 'Industry'

export type Post = {
  slug: string
  title: string
  category: BlogCategory
  date: string // ISO
  read: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  body: string // HTML
}

const cta =
  '<h2>Want help applying this to your security brand?</h2><p>SecurityBlogs builds SEO, AI-visibility and paid-search programs exclusively for the security industry — CCTV, access control, alarms, monitoring, locksmiths, fencing and more. <a href="/contact/">Book a free visibility audit</a> and we\'ll show you the highest-impact fixes for your site.</p>'

export const posts: Post[] = [
  {
    slug: 'seo-for-security-companies-2026-playbook',
    title: 'SEO for Security Companies: The 2026 Playbook',
    category: 'SEO',
    date: '2026-06-18',
    read: '9 min',
    excerpt: 'A practical, channel-by-channel playbook for ranking a security business on Google in 2026 — from technical foundations to local and content.',
    metaTitle: 'SEO for Security Companies: The 2026 Playbook | SecurityBlogs',
    metaDescription: 'A step-by-step SEO playbook for security companies in 2026 — technical foundations, local SEO, content and authority that win high-intent buyers.',
    body:
      '<p>Security buyers research carefully before they call. Whether someone is comparing CCTV installers, access-control integrators or monitoring providers, most of that journey now happens in search — and increasingly inside AI assistants. This playbook walks through the SEO foundations that move a security business up the results, in the order we tackle them with clients.</p>' +
      '<h2>1. Fix the technical foundations first</h2><p>Rankings cap out fast on a site search engines struggle to crawl. Confirm the basics: HTTPS everywhere, a clean XML sitemap, a sensible robots.txt, fast Core Web Vitals, and mobile-first layouts. Resolve duplicate URLs and make sure every important page is actually indexed in Google Search Console.</p>' +
      '<h2>2. Map keywords to buyer intent</h2><p>Group the terms your buyers use by intent: research ("how does monitored alarm work"), comparison ("best access control system Sydney"), and ready-to-buy ("CCTV installation quote"). Build a page for each high-intent theme rather than stuffing everything onto the homepage.</p>' +
      '<h2>3. Win local search</h2><p>For installers and service businesses, local is where the revenue is. Claim and complete your Google Business Profile, keep your name, address and phone (NAP) consistent across directories, and build location and service-area pages that genuinely describe the work you do in each area.</p>' +
      '<h2>4. Publish content that demonstrates expertise</h2><p>Security is a high-trust, compliance-driven industry. Content that answers real buyer questions — standards, installation considerations, cost factors, maintenance — builds the E-E-A-T signals Google rewards and gives AI engines something credible to cite.</p>' +
      '<h2>5. Earn authority, don\'t buy it</h2><p>Relevant mentions and links from industry publications, associations and local press build trust. Guest articles, original research and genuinely useful tools attract these naturally. Avoid bought-link schemes — they put the whole domain at risk.</p>' +
      '<h2>6. Measure what matters</h2><p>Track impressions and positions in Search Console, not vanity metrics. Movement usually appears first as impressions, then improving positions, then clicks as you break onto page one. For a newer domain in a competitive niche, expect a 4–9 month climb.</p>' +
      cta,
  },
  {
    slug: 'get-cited-by-chatgpt-gemini-perplexity',
    title: 'How to Get Your Security Brand Cited by ChatGPT, Gemini & Perplexity',
    category: 'AIO/AEO',
    date: '2026-06-16',
    read: '8 min',
    excerpt: 'AI Optimisation (AIO) is the practice of making your brand discoverable and citable by answer engines. Here is how security brands earn those mentions.',
    metaTitle: 'Get Your Security Brand Cited by ChatGPT & Perplexity | SecurityBlogs',
    metaDescription: 'How security companies earn citations in ChatGPT, Gemini and Perplexity — entity signals, structured data and citable content that AI engines trust.',
    body:
      '<p>More B2B buyers now open ChatGPT or Perplexity before Google when they need a shortlist. If an AI assistant doesn\'t recognise your brand as a real, trustworthy entity, it recommends a competitor instead. AI Optimisation (AIO) is how you change that.</p>' +
      '<h2>Why AI engines cite some brands and not others</h2><p>Answer engines blend their training data with live retrieval from the open web. They favour sources that are clearly identified, internally consistent, and corroborated across multiple places. The goal of AIO is to make your brand one of those trusted, machine-readable sources.</p>' +
      '<h2>Define your entity</h2><p>Make it unambiguous who you are: consistent business name, description and contact details across your site, Google Business Profile, LinkedIn and reputable directories. Add Organization schema so machines can parse your identity directly.</p>' +
      '<h2>Publish citable content</h2><p>AI engines quote clear, well-structured answers. Write content that states a question and answers it directly in the first paragraph, then supports it with detail. Original frameworks, checklists and definitions are especially "quotable".</p>' +
      '<h2>Add structured data</h2><p>FAQ, Article and Service schema help engines understand what each page is about and lift the right passages into answers. Keep markup accurate — never mark up content that isn\'t actually on the page.</p>' +
      '<h2>Build corroboration</h2><p>The more places a consistent version of your brand appears — industry media, association listings, genuine reviews — the more confidently an AI will name you. This is slow, compounding work, not a switch you flip.</p>' +
      '<h2>Track your mentions</h2><p>Periodically ask the major engines the questions your buyers ask ("best access-control provider in Melbourne") and note when and how you\'re named. That mention share is the real AIO metric.</p>' +
      cta,
  },
  {
    slug: 'answer-engine-optimisation-aeo-security-firms',
    title: 'Answer Engine Optimisation (AEO) for Security Firms',
    category: 'AIO/AEO',
    date: '2026-06-14',
    read: '7 min',
    excerpt: 'AEO positions your content as the direct answer buyers get — in featured snippets, voice results and AI overviews. Here is how to win it.',
    metaTitle: 'Answer Engine Optimisation (AEO) for Security Firms | SecurityBlogs',
    metaDescription: 'A practical guide to Answer Engine Optimisation for security companies — question mapping, answer-first content and schema that win the answer slot.',
    body:
      '<p>Answer Engine Optimisation (AEO) is about becoming the single answer a buyer hears or reads — the featured snippet on Google, the spoken response from a voice assistant, the passage an AI overview lifts. For security firms, that often means owning the practical questions buyers ask before they enquire.</p>' +
      '<h2>Start with the questions</h2><p>List the exact questions your buyers ask: "how much does a monitored alarm cost", "do I need a licence for CCTV", "access control vs key cards". These long-tail, intent-rich queries are where AEO wins are easiest.</p>' +
      '<h2>Answer first, then elaborate</h2><p>Lead each page or section with a concise, direct answer — two or three sentences a machine can lift cleanly — then expand with detail, examples and caveats. Burying the answer three paragraphs down loses the snippet.</p>' +
      '<h2>Use FAQ schema</h2><p>Marked-up question-and-answer blocks feed both Google\'s rich results and AI assistants. Keep them genuinely useful, not keyword-stuffed.</p>' +
      '<h2>Structure for scanability</h2><p>Clear H2/H3 headings, short paragraphs, ordered steps and tables make it easy for engines to extract the right passage. Good structure is good AEO.</p>' +
      '<h2>Be the trusted source</h2><p>Engines prefer answers from sources that demonstrate expertise. Accurate, compliance-aware content backed by a credible author and consistent brand signals is far more likely to be surfaced than thin copy.</p>' +
      cta,
  },
  {
    slug: 'generative-engine-optimisation-geo-entity-authority',
    title: 'Generative Engine Optimisation (GEO): Building Entity Authority',
    category: 'GEO',
    date: '2026-06-12',
    read: '8 min',
    excerpt: 'GEO builds the entity authority that makes AI engines recognise and recommend your brand. Here is the practical difference from SEO and AEO.',
    metaTitle: 'Generative Engine Optimisation (GEO) for Security Brands | SecurityBlogs',
    metaDescription: 'What GEO is and how security brands build the entity authority that makes AI engines recognise, trust and recommend them by name.',
    body:
      '<p>Generative Engine Optimisation (GEO) is the layer beneath AIO and AEO. Where AIO makes content citable and AEO wins specific answers, GEO builds the underlying <em>entity authority</em> that makes an AI engine confident enough to name your brand in the first place.</p>' +
      '<h2>What is an entity?</h2><p>To an AI engine, your brand is an entity — a distinct "thing" it can identify, describe and connect to other things. If that entity is undefined or inconsistent, the engine either ignores you or attributes your work to a competitor.</p>' +
      '<h2>Step 1: Define and verify the entity</h2><p>Create a single, consistent description of your business and reinforce it everywhere — site, schema, Google Business Profile, LinkedIn, knowledge-graph sources. Consistency is the signal.</p>' +
      '<h2>Step 2: Distribute consistent signals</h2><p>Push the same name, category, location and contact details into the directories, association listings and reputable sources AI engines trust. Mismatched details dilute authority.</p>' +
      '<h2>Step 3: Earn citations</h2><p>Genuine references — industry media, guest articles, original research — strengthen the entity. Each credible mention adds confidence to the engine\'s model of who you are.</p>' +
      '<h2>Step 4: Confirm and monitor</h2><p>Periodically check how each engine describes your brand. Correct inaccuracies at the source (your site, your profiles) and watch recognition and recommendation share grow — typically over a few months, not days.</p>' +
      cta,
  },
  {
    slug: 'local-seo-cctv-alarm-installers',
    title: 'Local SEO for CCTV & Alarm Installers',
    category: 'SEO',
    date: '2026-06-10',
    read: '10 min',
    excerpt: 'A field-tested local SEO checklist for installers — Google Business Profile, service-area pages, citations and reviews that move the local pack.',
    metaTitle: 'Local SEO for CCTV & Alarm Installers | SecurityBlogs',
    metaDescription: 'The local SEO checklist for CCTV and alarm installers — GBP optimisation, NAP consistency, service-area pages and review velocity that win the local pack.',
    body:
      '<p>For installers, most enquiries come from buyers searching nearby: "CCTV installer near me", "alarm system [suburb]". Local SEO is how you show up in that map pack and the local results around it. Here is the checklist we work through.</p>' +
      '<h2>Optimise your Google Business Profile</h2><p>Claim it, choose the most accurate primary category, fill every field, add real photos of your work, and keep hours current. A complete, active profile consistently outperforms a neglected one.</p>' +
      '<h2>Keep NAP consistent</h2><p>Your business name, address and phone number should be identical across your website, GBP and every directory. Inconsistencies confuse search engines and weaken local rankings.</p>' +
      '<h2>Build service-area and service pages</h2><p>Create genuine pages for the areas you serve and the services you offer — not thin doorway pages, but real content describing the work, considerations and outcomes for each. This helps you rank for "[service] in [area]" queries.</p>' +
      '<h2>Earn local citations</h2><p>Get listed in reputable local and industry directories. Quality and consistency matter more than volume.</p>' +
      '<h2>Generate reviews — the honest way</h2><p>Ask satisfied customers for genuine reviews and respond to them. Never buy or fabricate reviews; it breaches platform rules and consumer law, and buyers can usually tell.</p>' +
      '<h2>Track the local pack</h2><p>Monitor your map-pack visibility for priority terms in each area you serve, and double down where you\'re close to breaking into the top three.</p>' +
      cta,
  },
  {
    slug: 'google-ads-for-security-companies',
    title: 'Google Ads for Security Companies: A Practical Guide',
    category: 'Paid Ads',
    date: '2026-06-08',
    read: '8 min',
    excerpt: 'How to run Google Ads that reach genuine security buyers — intent-led keywords, tight geo-targeting, conversion tracking and budget control.',
    metaTitle: 'Google Ads for Security Companies: A Practical Guide | SecurityBlogs',
    metaDescription: 'A practical Google Ads guide for security companies — high-intent keywords, geo-targeting, conversion tracking and budget discipline that drive real leads.',
    body:
      '<p>Done well, Google Ads puts your security business in front of buyers at the exact moment they\'re ready to enquire. Done carelessly, it burns budget on tyre-kickers. The difference is intent, targeting and measurement.</p>' +
      '<h2>Bid on intent, not just volume</h2><p>Prioritise keywords that signal a ready buyer — "commercial CCTV installer", "access control quote" — and add negative keywords to filter out jobs, DIY and irrelevant searches.</p>' +
      '<h2>Target where you actually work</h2><p>Concentrate spend on the suburbs and service radius where your highest-value jobs convert. Broad national targeting wastes money for most installers.</p>' +
      '<h2>Track conversions properly</h2><p>Calls, form submissions and quote requests should all be tracked end-to-end so you know which keyword and ad produced each lead. Without conversion tracking, you\'re optimising blind.</p>' +
      '<h2>Match the landing page to the ad</h2><p>Send each ad to a page that answers the searcher\'s exact need with a clear call to action. Generic homepages convert poorly.</p>' +
      '<h2>Control budget and bids</h2><p>Use sensible daily budgets, day-parting and device adjustments. Review search terms weekly and prune waste. Small, disciplined accounts often beat large, neglected ones.</p>' +
      cta,
  },
  {
    slug: 'microsoft-bing-ads-b2b-security-buyers',
    title: 'Microsoft (Bing) Ads for B2B Security Buyers',
    category: 'Paid Ads',
    date: '2026-06-06',
    read: '6 min',
    excerpt: 'Why Microsoft Advertising can be a smart, lower-competition channel for B2B security demand — and how to set it up to capture qualified buyers.',
    metaTitle: 'Microsoft (Bing) Ads for B2B Security Buyers | SecurityBlogs',
    metaDescription: 'How security companies use Microsoft (Bing) Ads to reach B2B buyers — lower-competition keywords, LinkedIn-profile targeting and Clarity analytics.',
    body:
      '<p>Microsoft Advertising is often overlooked, but it reaches buyers many competitors ignore — frequently older, higher-budget commercial decision-makers using Bing across Windows and Edge. For B2B security demand, it can be a cost-effective complement to Google.</p>' +
      '<h2>Why consider it</h2><p>Lower competition on Microsoft can mean the same high-intent clicks at a lower cost-per-click, with less crowded auctions for niche security terms.</p>' +
      '<h2>Reuse and re-tune your Google structure</h2><p>You can import proven campaigns from Google, then re-tune bids and keywords for Microsoft\'s audience rather than running them identically.</p>' +
      '<h2>Layer LinkedIn-profile targeting</h2><p>Microsoft can target by job title, industry and company size — useful for putting B2B security offers in front of the right decision-makers.</p>' +
      '<h2>Use Microsoft Clarity</h2><p>Clarity\'s free session recordings and heatmaps show exactly how buyers interact with your landing pages, so you can fix friction and lift conversions.</p>' +
      '<h2>Measure and expand</h2><p>Track conversions the same way you do on Google, then scale into the Audience Network as cost-per-lead and quality justify it.</p>' +
      cta,
  },
  {
    slug: 'website-design-for-security-companies',
    title: 'Website Design for Security Companies That Converts',
    category: 'SEO',
    date: '2026-06-04',
    read: '7 min',
    excerpt: 'What separates a security website that ranks and converts from one that just looks nice — speed, structure, trust signals and AI-readiness.',
    metaTitle: 'Website Design for Security Companies That Converts | SecurityBlogs',
    metaDescription: 'How to design a security company website that ranks, converts and is AI-ready — fast performance, clear structure, trust signals and schema.',
    body:
      '<p>A security website has two jobs: get found and turn visitors into enquiries. A polished design that\'s slow, unclear or invisible to search engines fails both. Here is what actually matters.</p>' +
      '<h2>Speed and Core Web Vitals</h2><p>Buyers and search engines both reward fast, stable pages. Optimise images, minimise heavy scripts and aim for green Core Web Vitals across devices.</p>' +
      '<h2>Clear structure</h2><p>Organise the site around your services and the areas you serve, with obvious navigation. Each service should have its own page that ranks and converts on its own.</p>' +
      '<h2>Trust signals</h2><p>Licences, accreditations, genuine reviews, case examples and clear contact details reassure cautious buyers. In a high-trust industry, credibility converts.</p>' +
      '<h2>Conversion-focused layout</h2><p>Make the next step obvious on every page — a clear call to action, an easy quote form, a visible phone number. Reduce friction at every point.</p>' +
      '<h2>AI-ready architecture</h2><p>Schema markup, clean semantic HTML and well-structured content help AI engines understand and cite your brand — increasingly important as buyers discover vendors through assistants.</p>' +
      cta,
  },
  {
    slug: 'schema-markup-for-security-websites',
    title: 'Schema Markup for Security Websites: A Starter Guide',
    category: 'AIO/AEO',
    date: '2026-06-02',
    read: '7 min',
    excerpt: 'Structured data tells Google and AI engines exactly what your security business does. Here are the schema types that matter most and how to use them.',
    metaTitle: 'Schema Markup for Security Websites: A Starter Guide | SecurityBlogs',
    metaDescription: 'The schema markup that helps security websites earn rich results and AI citations — Organization, LocalBusiness, Service and FAQ, used correctly.',
    body:
      '<p>Schema markup is structured data that tells search engines and AI assistants what your content means, not just what it says. For security businesses, a few well-chosen schema types can earn rich results and make your brand easier for AI to understand and cite.</p>' +
      '<h2>Organization / LocalBusiness</h2><p>Define your business identity — name, logo, contact details, location and service area. LocalBusiness is especially valuable for installers serving specific areas.</p>' +
      '<h2>Service</h2><p>Mark up each service you offer (CCTV installation, access control, monitoring) so engines can connect your pages to the right buyer queries.</p>' +
      '<h2>FAQPage</h2><p>Structured question-and-answer blocks feed rich results and AI answers. Use them on pages where you genuinely answer common buyer questions.</p>' +
      '<h2>BreadcrumbList</h2><p>Helps engines understand your site structure and can improve how your pages appear in results.</p>' +
      '<h2>Golden rules</h2><p>Only mark up content that actually appears on the page, keep details accurate and consistent with the rest of your site, and validate your markup. Misleading schema can do more harm than good.</p>' +
      cta,
  },
  {
    slug: 'content-strategy-for-security-brands',
    title: 'Content Strategy for Security Brands',
    category: 'SEO',
    date: '2026-05-30',
    read: '8 min',
    excerpt: 'A simple content framework for security companies that builds rankings, trust and AI-citability — without churning out thin, low-value posts.',
    metaTitle: 'Content Strategy for Security Brands | SecurityBlogs',
    metaDescription: 'A practical content strategy for security companies — topic clusters, buyer questions and E-E-A-T signals that build rankings, trust and AI citations.',
    body:
      '<p>Content is how a security brand demonstrates expertise to buyers, search engines and AI assistants alike. But volume for its own sake backfires — thin, generic posts can trigger spam signals. The aim is fewer, genuinely useful pieces, organised well.</p>' +
      '<h2>Build topic clusters</h2><p>Create a comprehensive "pillar" page on each major theme (e.g. access control), supported by focused articles answering specific sub-questions. Interlink them so authority flows across the cluster.</p>' +
      '<h2>Start from buyer questions</h2><p>Mine the real questions buyers ask — sales calls, search suggestions, "people also ask" — and build content that answers them clearly and completely.</p>' +
      '<h2>Demonstrate E-E-A-T</h2><p>Experience, expertise, authoritativeness and trust matter most in high-stakes industries. Credible authorship, accurate detail and compliance awareness all strengthen your content.</p>' +
      '<h2>Write to be cited</h2><p>Clear definitions, frameworks and checklists are the passages AI engines and featured snippets pull. Structure content so the key answer is easy to extract.</p>' +
      '<h2>Keep it honest</h2><p>Never invent statistics, results or reviews. Accurate, verifiable content builds the trust that both buyers and algorithms reward — and avoids consumer-law risk.</p>' +
      cta,
  },
  {
    slug: 'how-security-buyers-search-in-2026',
    title: 'How Security Buyers Search in 2026 (AI + Google)',
    category: 'Industry',
    date: '2026-05-28',
    read: '6 min',
    excerpt: 'The security buyer journey now spans Google, maps and AI assistants. Understanding it is the first step to being found at every stage.',
    metaTitle: 'How Security Buyers Search in 2026 (AI + Google) | SecurityBlogs',
    metaDescription: 'How security buyers research and shortlist vendors in 2026 across Google, maps and AI assistants — and how to be visible at every stage.',
    body:
      '<p>The way security buyers find vendors has changed. A single decision now often spans a Google search, a map lookup, a few competitor sites and — increasingly — a question put to an AI assistant. Being visible means showing up across that whole journey.</p>' +
      '<h2>Research stage</h2><p>Buyers start broad: understanding options, standards and rough costs. Educational content and clear answers capture them here and build early trust.</p>' +
      '<h2>Comparison stage</h2><p>They shortlist providers, often via local search, reviews and AI assistants asked for "the best" option. Strong local SEO, genuine reviews and consistent brand signals decide who makes the list.</p>' +
      '<h2>Decision stage</h2><p>Ready-to-buy searches ("[service] quote", "installer near me") convert. Fast, conversion-focused pages and easy enquiry paths win the job.</p>' +
      '<h2>The AI overlay</h2><p>At every stage, AI assistants increasingly mediate discovery. If your brand isn\'t a recognised, citable entity, you\'re invisible in those answers — which is why AIO, AEO and GEO now sit alongside classic SEO.</p>' +
      '<h2>What to do about it</h2><p>Map your own buyers\' journey, then make sure you appear at each step: educational content, strong local presence, conversion-ready pages and clear entity signals for AI.</p>' +
      cta,
  },
  {
    slug: 'technical-seo-audit-for-security-websites',
    title: 'Technical SEO Audit for Security Websites',
    category: 'SEO',
    date: '2026-05-26',
    read: '9 min',
    excerpt: 'A practical technical SEO checklist for security websites — crawlability, speed, indexation and schema issues that quietly cap your rankings.',
    metaTitle: 'Technical SEO Audit for Security Websites | SecurityBlogs',
    metaDescription: 'A practical technical SEO audit checklist for security websites — crawl health, Core Web Vitals, indexation and schema issues that limit rankings.',
    body:
      '<p>Even great content can\'t rank on a technically broken site. A technical SEO audit finds the issues quietly capping your visibility. Here is the checklist we run for security websites.</p>' +
      '<h2>Crawlability</h2><p>Make sure search engines can reach your important pages: a valid XML sitemap, a sensible robots.txt, no accidental noindex tags, and a logical internal link structure.</p>' +
      '<h2>Indexation</h2><p>Check Google Search Console\'s coverage report for pages that should be indexed but aren\'t — and pages that shouldn\'t be (thin, duplicate or staging URLs) that are.</p>' +
      '<h2>Core Web Vitals</h2><p>Measure loading, interactivity and visual stability. Compress images, defer non-critical scripts and fix layout shifts to keep all three in the green.</p>' +
      '<h2>Site architecture</h2><p>Keep important pages a few clicks from the homepage, use descriptive URLs, and avoid orphaned pages with no internal links.</p>' +
      '<h2>Structured data</h2><p>Validate your schema. Errors or markup that doesn\'t match on-page content can suppress rich results.</p>' +
      '<h2>Security and hygiene</h2><p>HTTPS everywhere, no mixed content, working redirects and no broken links. These basics protect both rankings and buyer trust.</p>' +
      cta,
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function allPostSlugs(): string[] {
  return posts.map((p) => p.slug)
}
