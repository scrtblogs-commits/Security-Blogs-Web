export interface GuideSection {
  heading: string
  body: string
}

export interface Guide {
  slug: string
  title: string
  diff: 'Beginner' | 'Intermediate' | 'Advanced'
  read: string
  excerpt: string
  tags: string[]
  intro: string
  sections: GuideSection[]
  conclusion: string
}

export const guides: Guide[] = [
  {
    slug: 'ai-visibility-playbook-security-brands',
    title: 'The Complete AI Visibility Playbook for Security Brands',
    diff: 'Advanced',
    read: '24 min',
    excerpt: 'A full system for getting cited across ChatGPT, Gemini, Perplexity and AI Overviews.',
    tags: ['Entity authority', 'Citable content', 'Schema', 'Measurement'],
    intro: `Answer engines — ChatGPT, Gemini, Perplexity, Google AI Overviews — now answer millions of security-related questions daily. If your brand isn't in the retrieval pool, you're invisible at the moment a buyer is forming their shortlist. This playbook walks you through every layer of AI visibility: entity building, content architecture, schema, digital PR and measurement. Work through it in order and you'll have a repeatable system that compounds over time.`,
    sections: [
      {
        heading: '1. Understand How Answer Engines Retrieve Security Brands',
        body: `Large language models retrieve brands through two mechanisms: parametric knowledge baked in at training time, and retrieval-augmented generation (RAG) that pulls live web sources. For security brands, training-time presence means being mentioned frequently in authoritative publications — trade press, government cybersecurity sites, industry associations. RAG presence means your pages and third-party mentions appear in the live index the engine queries at inference time.\n\nPractical implication: you need both a strong off-site mention profile and technically sound on-site pages. Neither alone is sufficient.`,
      },
      {
        heading: '2. Build Entity Authority in the Knowledge Graph',
        body: `An "entity" is a uniquely identified real-world thing — your company, your founders, your products. Google's Knowledge Graph and the data models underlying most LLMs rely on entity co-occurrence signals to understand who you are and what you do.\n\nAction steps:\n• Claim and complete your Google Business Profile with precise category, description and service areas.\n• Add Organization schema with legalName, foundingDate, sameAs links to Wikidata, LinkedIn, Crunchbase and industry directories.\n• Get a Wikidata entry — even a stub — so the knowledge graph has a canonical node to link mentions back to.\n• Ensure your name, address and phone (NAP) are byte-for-byte consistent across every directory, citation and schema block.\n• Earn mentions from authoritative security publications (Security Week, CSO, SC Media) that reference you by exact entity name.`,
      },
      {
        heading: '3. Architect Citable Content',
        body: `Answer engines prefer to cite content that directly, concisely answers a question. Long-form SEO copy stuffed with keywords performs poorly. What works:\n\n• Lead with a direct, quotable answer in the first 2–3 sentences of every page and section.\n• Use question-and-answer structure with H2/H3 headings phrased as natural-language questions ("What is the average cost of a commercial CCTV installation?").\n• Include original data, statistics and proprietary research — LLMs heavily favour unique, citable facts.\n• Write at a reading level appropriate for your audience (Flesch–Kincaid 50–60 for B2B security buyers).\n• Keep paragraphs short (3–4 sentences) so the retrieval window captures complete thoughts.\n• Add "At a glance" summary boxes at the top of long guides — these are high-probability citation targets.`,
      },
      {
        heading: '4. Deploy a Full Schema Stack',
        body: `Structured data communicates your entity properties and content type directly to crawlers. For security brands the minimum viable schema stack is:\n\n• **Organization** — legalName, description, logo, url, sameAs, contactPoint, areaServed.\n• **LocalBusiness** (if relevant) — extends Organization with address, geo, openingHours.\n• **Service** — one block per core service (CCTV installation, access control, alarm monitoring) with name, description, provider, areaServed, offers.\n• **FAQPage** — wrap every FAQ section in FAQPage/Question/Answer markup.\n• **BreadcrumbList** — on every page for navigation context.\n• **Article / BlogPosting** — on all editorial content with datePublished, dateModified, author.\n\nValidate every schema block via Google's Rich Results Test and Schema.org validator before publishing.`,
      },
      {
        heading: '5. Build a Digital PR Pipeline',
        body: `Third-party mentions are the fuel of AI visibility. A single well-placed quote in a Security Week article can increase citation rate more than ten new pages on your own domain. Build a repeatable PR pipeline:\n\n• Monitor journalist queries via HARO, Qwoted and ResponseSource, filtering for security and technology categories.\n• Respond to every relevant query within 60 minutes — journalists work on short deadlines.\n• Publish original research (survey data, incident statistics, benchmark reports) that journalists need to cite.\n• Maintain a press page with high-resolution logos, executive headshots, approved company boilerplate and recent coverage — journalists use this to verify and link.\n• Aim for a minimum of two earned media placements per month in the first year.`,
      },
      {
        heading: '6. Measure AI Citation Rate',
        body: `You can't manage what you can't measure. Set up a weekly tracking process:\n\n• Run a standard set of 20–30 brand-relevant queries in ChatGPT, Gemini, Perplexity and Copilot — log whether your brand is named, in what position and with what sentiment.\n• Track the same queries in Google AI Overviews (use incognito, logged out).\n• Use a spreadsheet or lightweight BI tool to chart citation rate (% of queries you appear in) week over week.\n• Calculate share of voice: your citations ÷ total brand citations in your competitive set.\n• Set a 90-day baseline, then a quarterly improvement target of +10–15 percentage points.`,
      },
    ],
    conclusion: `AI visibility is a compounding asset. Every authoritative mention, every schema block and every piece of citable content you publish increases your probability of being retrieved. Start with entity authority (section 2), add citable content architecture (section 3), deploy schema (section 4), then build the PR pipeline (section 5). Measure weekly and you'll see clear signal within 90 days.`,
  },
  {
    slug: 'schema-markup-blueprint-security-websites',
    title: 'Schema Markup Blueprint for Security Websites',
    diff: 'Intermediate',
    read: '16 min',
    excerpt: 'Copy-paste structured data for Organization, Service, FAQ and Review across your site.',
    tags: ['Schema', 'Structured data', 'Technical SEO', 'Rich results'],
    intro: `Structured data is the bridge between your content and the machines that rank, retrieve and cite it. For security companies — alarm installers, CCTV integrators, access control specialists, cybersecurity consultancies — the right schema stack unlocks rich results, improves Knowledge Panel accuracy and dramatically increases AI citation probability. This blueprint gives you copy-paste-ready JSON-LD blocks for every major page type on a security website.`,
    sections: [
      {
        heading: '1. Organization Schema (Sitewide)',
        body: `Add this to your homepage <head> and reference it across the site via @id:\n\n\`\`\`json\n{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "@id": "https://yourdomain.com/#organization",\n  "name": "Your Security Company Ltd",\n  "legalName": "Your Security Company Limited",\n  "url": "https://yourdomain.com",\n  "logo": "https://yourdomain.com/images/logo.png",\n  "description": "Award-winning CCTV installation, access control and alarm monitoring for commercial and residential clients across [Region].",\n  "foundingDate": "2015",\n  "telephone": "+44 1234 567890",\n  "email": "info@yourdomain.com",\n  "areaServed": ["London", "South East England"],\n  "sameAs": [\n    "https://www.linkedin.com/company/your-company",\n    "https://www.facebook.com/yourcompany",\n    "https://www.wikidata.org/wiki/Q1234567"\n  ]\n}\n\`\`\`\n\nKey points: legalName must match Companies House registration exactly. sameAs links anchor your entity in the knowledge graph.`,
      },
      {
        heading: '2. LocalBusiness Schema (Homepage / Contact Page)',
        body: `If you serve physical locations, extend Organization with LocalBusiness. For security companies the most appropriate sub-type is usually SecurityService or ProfessionalService:\n\n\`\`\`json\n{\n  "@context": "https://schema.org",\n  "@type": ["LocalBusiness", "SecurityService"],\n  "@id": "https://yourdomain.com/#localbusiness",\n  "name": "Your Security Company",\n  "address": {\n    "@type": "PostalAddress",\n    "streetAddress": "123 Commerce Way",\n    "addressLocality": "London",\n    "postalCode": "EC1A 1BB",\n    "addressCountry": "GB"\n  },\n  "geo": {\n    "@type": "GeoCoordinates",\n    "latitude": 51.5074,\n    "longitude": -0.1278\n  },\n  "openingHoursSpecification": [\n    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "18:00" }\n  ],\n  "priceRange": "££"\n}\n\`\`\``,
      },
      {
        heading: '3. Service Schema (One Per Service Page)',
        body: `Each core service page (CCTV installation, access control, alarm monitoring, etc.) needs its own Service block:\n\n\`\`\`json\n{\n  "@context": "https://schema.org",\n  "@type": "Service",\n  "name": "Commercial CCTV Installation",\n  "description": "Design, supply and installation of IP CCTV systems for commercial properties. Hikvision, Axis and Hanwha systems. SBD-accredited engineers.",\n  "provider": { "@id": "https://yourdomain.com/#organization" },\n  "areaServed": { "@type": "AdministrativeArea", "name": "London" },\n  "serviceType": "CCTV Installation",\n  "offers": {\n    "@type": "Offer",\n    "availability": "https://schema.org/InStock",\n    "priceCurrency": "GBP"\n  }\n}\n\`\`\`\n\nRepeat for every distinct service. This is what powers "services offered by" Knowledge Panel sections and AI citations for service queries.`,
      },
      {
        heading: '4. FAQPage Schema',
        body: `Wrap every FAQ section in FAQPage markup. This targets featured snippets, People Also Ask boxes and is heavily cited by AI Overviews:\n\n\`\`\`json\n{\n  "@context": "https://schema.org",\n  "@type": "FAQPage",\n  "mainEntity": [\n    {\n      "@type": "Question",\n      "name": "How much does a commercial CCTV system cost?",\n      "acceptedAnswer": {\n        "@type": "Answer",\n        "text": "A commercial CCTV installation typically costs between £1,500 and £8,000 depending on the number of cameras, resolution, storage requirements and cable runs. Most small business installs (4–8 cameras) fall in the £2,000–£4,000 range including labour and a 3-year warranty."\n      }\n    }\n  ]\n}\n\`\`\`\n\nWrite answers as complete, self-contained paragraphs — the text attribute is quoted verbatim by AI engines.`,
      },
      {
        heading: '5. Review / AggregateRating Schema',
        body: `Social proof schema improves both CTR in traditional search and trust signals for AI retrieval:\n\n\`\`\`json\n{\n  "@context": "https://schema.org",\n  "@type": "LocalBusiness",\n  "@id": "https://yourdomain.com/#localbusiness",\n  "aggregateRating": {\n    "@type": "AggregateRating",\n    "ratingValue": "4.9",\n    "reviewCount": "127",\n    "bestRating": "5",\n    "worstRating": "1"\n  }\n}\n\`\`\`\n\nNever fabricate ratings. Only include aggregateRating when you have genuine, verifiable reviews. Pull figures from Google Business Profile, Trustpilot or Checkatrade.`,
      },
      {
        heading: '6. BreadcrumbList Schema',
        body: `Add to every page for navigation context:\n\n\`\`\`json\n{\n  "@context": "https://schema.org",\n  "@type": "BreadcrumbList",\n  "itemListElement": [\n    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yourdomain.com/" },\n    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://yourdomain.com/services/" },\n    { "@type": "ListItem", "position": 3, "name": "CCTV Installation", "item": "https://yourdomain.com/services/cctv-installation/" }\n  ]\n}\n\`\`\``,
      },
      {
        heading: '7. Validation Checklist',
        body: `Before pushing schema live:\n• Run every page through Google's Rich Results Test.\n• Check Schema.org validator for type errors.\n• Verify sameAs URLs resolve to your actual profiles.\n• Confirm @id values are consistent across pages referencing the same entity.\n• Use Google Search Console > Enhancements tab to monitor for structured data errors after deployment.\n• Re-test after any CMS or template update — schema breaks silently.`,
      },
    ],
    conclusion: `A complete schema stack is the single highest-leverage technical improvement most security websites can make. Build the Organization and LocalBusiness blocks first (maximum impact, minimal risk), add Service blocks for each core service, then layer in FAQPage and AggregateRating. With a valid, consistent schema implementation you create a machine-readable identity that knowledge graphs and AI engines can trust.`,
  },
  {
    slug: 'local-seo-zero-to-local-pack',
    title: 'Local SEO: From Zero to Local Pack',
    diff: 'Beginner',
    read: '14 min',
    excerpt: 'Set up Google Business Profile, service-area pages and reviews the right way.',
    tags: ['Local SEO', 'Google Business Profile', 'Reviews', 'Service-area pages'],
    intro: `For security companies — alarm installers, CCTV fitters, locksmiths, patrol services — local search is the primary demand channel. When a homeowner searches "CCTV installer near me" or a facilities manager searches "access control company Manchester", the three businesses that appear in the Map Pack capture the majority of clicks. This guide walks you through every step required to enter and sustain a top-3 local pack position.`,
    sections: [
      {
        heading: '1. Claim and Optimise Your Google Business Profile',
        body: `Google Business Profile (GBP) is the single most important asset in local SEO. If you haven't claimed yours, go to business.google.com and claim it now.\n\n**Category selection:** Choose the most specific primary category available. "Security System Supplier", "Alarm System Supplier", "CCTV Installation Service" or "Locksmith" depending on your core business. Add up to 9 secondary categories for adjacent services.\n\n**Business description:** Write 200–250 words that include your primary service, target geography, years in business, certifications (NSI, SSAIB, SIA) and a call to action. This text is indexed and cited by AI Overviews.\n\n**Services:** Add every distinct service with name and description. GBP service blocks feed directly into local knowledge panels and are cited by Gemini and ChatGPT in local queries.\n\n**Photos:** Upload at minimum 20 photos — logo, exterior, interior, team, completed installs. Profiles with 100+ photos receive significantly more calls and direction requests.\n\n**Hours:** Keep hours accurate and update them for bank holidays. Inaccurate hours are one of the fastest ways to lose local pack position.`,
      },
      {
        heading: '2. NAP Consistency Across All Citations',
        body: `NAP — Name, Address, Phone — must be byte-for-byte identical everywhere it appears online: your website, GBP, Companies House, industry directories, trade associations and social profiles.\n\nCommon mistakes to fix:\n• "Ltd" vs "Limited" vs "Ltd." — pick one and use it everywhere.\n• "Street" vs "St" vs "St." in the address.\n• Mobile vs landline phone number inconsistency.\n• Old addresses not removed from directories after a move.\n\nPriority citation sources for UK security companies: Yell, Thomson Local, Checkatrade, TrustATrader, NSI's online directory, SSAIB's directory, FCA register (if monitoring), local Chamber of Commerce.\n\nUse a tool like BrightLocal Citation Tracker or Whitespark to audit your citation profile and identify inconsistencies.`,
      },
      {
        heading: '3. Build Service-Area Landing Pages',
        body: `If you cover multiple towns, cities or boroughs, you need individual landing pages for each. A generic "we cover the South East" statement does not rank for "[service] + [location]" queries.\n\n**Page structure for each location page:**\n• H1: "[Service] in [Location]" (e.g. "CCTV Installation in Reading")\n• 300–500 words of unique, locally relevant content — mention local landmarks, business parks, crime statistics if available.\n• An embedded Google Map showing your service area.\n• LocalBusiness + Service schema with the specific location in areaServed.\n• Testimonials from customers in that area (with permission).\n• Internal links to your main service pages and the contact page.\n\nAim for 5–10 location pages initially. Thin, duplicate-ish pages hurt more than no pages — write genuine content for each.`,
      },
      {
        heading: '4. Generate and Manage Reviews Systematically',
        body: `Review volume and recency are direct ranking factors for the local pack. They also influence AI citation sentiment — engines that cite local businesses prefer those with higher review scores.\n\n**Review generation system:**\n• After every completed job, send a text message or email with a direct link to your GBP review page (shortlink from your GBP dashboard).\n• Automate review requests via your CRM — most CRMs (Jobber, ServiceM8, Commusoft) support post-job email/SMS automation.\n• Brief your engineers to ask verbally: "If you're happy with the work, we'd really appreciate a Google review — I'll send you the link now."\n\n**Responding to reviews:**\n• Reply to every review within 48 hours — positive and negative.\n• Responses that include service keywords and location terms ("Thank you for choosing us for your CCTV installation in Bristol") pass additional relevance signals to Google.\n• For negative reviews, acknowledge, apologise where appropriate and take the conversation offline — never argue publicly.`,
      },
      {
        heading: '5. On-Site Local SEO Foundations',
        body: `Your website must reinforce the geographic relevance signals from GBP and citations:\n\n• Embed a Google Map on your contact page.\n• Add your full NAP in the footer of every page (matching GBP exactly).\n• Include your city and service area in the homepage title tag and H1.\n• Create a dedicated contact page with full address, phone, opening hours and a contact form.\n• Add LocalBusiness schema on the homepage and contact page (see the Schema Markup Blueprint guide).\n• Ensure your site loads in under 2.5 seconds on mobile — Core Web Vitals affect local pack ranking.`,
      },
      {
        heading: '6. Track and Iterate',
        body: `Monitor performance monthly:\n• GBP Insights: views, calls, direction requests, website clicks.\n• BrightLocal or Whitespark rank tracker for "[service] + [location]" keywords.\n• Google Search Console for local keyword impressions and CTR.\n• Set up a monthly review count goal (e.g. +8 reviews per month) and track actuals.\n\nAfter 3 months you'll have enough data to see which location pages and service categories are gaining traction and which need more content investment.`,
      },
    ],
    conclusion: `Local SEO is not a one-time project — it's a system. Optimise your GBP this week, fix NAP inconsistencies in the following week, publish your first batch of location pages in month 1, and build your review generation process into every job completion. Within 90 days of consistent execution, most security companies see measurable improvement in local pack visibility.`,
  },
  {
    slug: 'topical-authority-content-clusters',
    title: 'Building Topical Authority with Content Clusters',
    diff: 'Intermediate',
    read: '18 min',
    excerpt: 'Architect pillar and cluster pages that rank and feed answer-engine retrieval.',
    tags: ['Content strategy', 'Topical authority', 'Pillar pages', 'Internal linking'],
    intro: `Google's Helpful Content system and the retrieval models underlying LLMs both reward sites that demonstrate deep, comprehensive expertise in a specific domain. For security companies, this means building topical authority around your core services — not publishing a handful of blog posts, but constructing an interconnected architecture of pillar pages and cluster content that covers every relevant question a buyer might ask. This guide shows you how to design and build that architecture.`,
    sections: [
      {
        heading: '1. What Topical Authority Means in Practice',
        body: `Topical authority is Google's confidence that your site is the most thorough, reliable source on a given topic. It's built through breadth (covering all subtopics within a domain) and depth (covering each subtopic comprehensively). A security company with 40 tightly interlinked pages about commercial CCTV will outrank a competitor with 5 pages and 200 unrelated blog posts.\n\nFor AI retrieval, topical authority means your content appears as a source document during RAG retrieval. When ChatGPT answers "what is the best access control system for a multi-site retail business", it retrieves content from sites that have covered the topic comprehensively. Thin sites are not retrieved.`,
      },
      {
        heading: '2. Identify Your Core Topics',
        body: `Start with your service lines. For a typical physical security company, core topics might be:\n• CCTV and video surveillance\n• Access control and door entry\n• Intruder alarm and detection\n• Remote monitoring and response\n• Fire detection and suppression (if applicable)\n\nFor each core topic, you need a pillar page — a comprehensive, 2,000–4,000-word resource that covers the topic at a high level and links to all cluster pages within that topic. Think of the pillar as a "complete guide to X" and the clusters as the chapters.`,
      },
      {
        heading: '3. Map Cluster Content with Keyword Research',
        body: `For each pillar topic, use a keyword research tool (Ahrefs, Semrush, Google Keyword Planner) to identify every meaningful subtopic question:\n\nExample for "commercial CCTV":\n• How much does commercial CCTV cost? (transactional)\n• IP CCTV vs analogue CCTV (comparison)\n• How many CCTV cameras do I need for my business? (educational)\n• CCTV installation regulations UK (informational)\n• Best CCTV systems for warehouses (application-specific)\n• CCTV data protection requirements (compliance)\n• How to choose a CCTV installer (buyer guide)\n\nEach of these becomes a cluster page. Aim for 8–15 cluster pages per pillar in year one.`,
      },
      {
        heading: '4. Structure Each Piece for Dual-Engine Performance',
        body: `Every pillar and cluster page must perform for both traditional search and AI retrieval:\n\n**For traditional search:**\n• Target keyword in H1, first paragraph, at least one H2, URL slug and meta title.\n• Comprehensive coverage of the topic (use "People Also Ask" for Google to identify gaps).\n• Internal links to all related cluster pages (from pillar) and back to pillar (from each cluster).\n• External links to authoritative sources where appropriate.\n\n**For AI retrieval:**\n• Open each page with a direct, quotable definition or answer.\n• Use FAQ sections at the bottom with question-phrased H3s.\n• Include original data points or statistics — AI engines prioritise unique, citable facts.\n• Keep paragraphs short and self-contained.\n• Summarise key takeaways in a bullet list.`,
      },
      {
        heading: '5. Internal Linking Architecture',
        body: `Internal linking is the mechanism that transfers topical authority signals between pages. Follow these rules:\n\n• Every cluster page must link back to its pillar page using anchor text that includes the topic keyword.\n• The pillar page must link to every cluster page under that topic.\n• Related clusters can link to each other where genuinely useful to the reader.\n• Use descriptive anchor text — not "click here" but "commercial CCTV installation guide".\n• Add an "In this topic" navigation widget on pillar pages listing all clusters.\n• Avoid orphan pages (pages with no internal links pointing to them).`,
      },
      {
        heading: '6. Content Velocity and Maintenance',
        body: `Building topical authority is a 12–18 month project for most security companies. A sustainable velocity:\n\n• Month 1–2: Publish all pillar pages and 3–4 clusters per topic.\n• Month 3–6: Complete the remaining cluster content.\n• Month 7+: Add supplementary content (case studies, updated statistics, expanded FAQs).\n• Quarterly review: Check rankings and traffic for each cluster. Expand or rewrite underperforming pages.\n\nContent maintenance is as important as creation. A page with stale statistics or outdated regulations actively hurts trust signals. Set calendar reminders to review your top 20 pages annually.`,
      },
    ],
    conclusion: `Topical authority is the most durable competitive advantage in content marketing. Once you own the topic in Google's model and the LLM retrieval pool, it is very hard for competitors to displace you without a sustained, multi-year investment. Start by mapping your pillar topics and publishing a complete cluster architecture. The compound returns from this approach outperform any tactical content play.`,
  },
  {
    slug: 'technical-seo-audit-step-by-step',
    title: 'Technical SEO Audit, Step by Step',
    diff: 'Advanced',
    read: '22 min',
    excerpt: 'Crawl budget, indexation, Core Web Vitals and render checks with a repeatable checklist.',
    tags: ['Technical SEO', 'Core Web Vitals', 'Crawlability', 'Indexation'],
    intro: `Technical SEO is the foundation everything else sits on. The best content strategy in the world is neutered by a misconfigured robots.txt, slow server response times or JavaScript rendering failures. This guide gives you a repeatable technical audit process you can run quarterly — or hand to a developer — to ensure your security website's technical infrastructure is supporting rather than undermining your visibility.`,
    sections: [
      {
        heading: '1. Crawlability and Robots.txt',
        body: `Start every audit by checking whether Googlebot can actually access your pages.\n\n**robots.txt audit:**\n• Fetch yourdomain.com/robots.txt and review manually.\n• Common mistakes: accidentally blocking /wp-admin/ without realising it disallows CSS/JS, blocking entire directories needed for indexation, no sitemap declaration.\n• Test specific URLs in Google Search Console's robots.txt Tester.\n• Correct robots.txt for most security sites:\n\`\`\`\nUser-agent: *\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\nSitemap: https://yourdomain.com/sitemap.xml\n\`\`\`\n\n**Crawl simulation:**\n• Run Screaming Frog (free up to 500 URLs) or Sitebulb against your domain.\n• Review the response codes report: flag all 4xx errors, 5xx errors and redirect chains longer than 1 hop.\n• Check that your XML sitemap only lists indexable, canonical, 200-status pages.`,
      },
      {
        heading: '2. Indexation Audit',
        body: `Open Google Search Console > Index > Pages and review each status bucket:\n\n• **Crawled — currently not indexed:** Google can see these pages but has chosen not to index them. Usually indicates thin content, duplication or low quality. Review each flagged URL individually.\n• **Discovered — currently not indexed:** Googlebot knows these pages exist but hasn't crawled them. Often a crawl budget or internal linking issue.\n• **Duplicate, Google chose different canonical than user:** Your canonical tags are being overridden. Check self-referencing canonicals, pagination handling and hreflang if applicable.\n• **Excluded by noindex:** Verify these are intentionally excluded — staging pages leaking to production is a common issue.\n\nTarget state: every page you want indexed should appear in the "Indexed" bucket with no warnings.`,
      },
      {
        heading: '3. Core Web Vitals Assessment',
        body: `Core Web Vitals are a direct ranking factor and a proxy for user experience. The three metrics:\n\n• **LCP (Largest Contentful Paint):** Should be under 2.5 seconds. Usually the hero image or above-the-fold text block. Fix by compressing images, using WebP format, preloading the LCP element.\n• **CLS (Cumulative Layout Shift):** Should be under 0.1. Caused by images without explicit dimensions, late-loading fonts, banner ads. Fix with width/height attributes and font-display: swap.\n• **INP (Interaction to Next Paint):** Should be under 200ms. Heavy JavaScript on the main thread is the usual culprit. Defer non-critical JS, split code bundles.\n\n**Tools:** Google PageSpeed Insights (lab data), CrWUX in Search Console (field data). Field data is what Google uses for ranking — lab data is for diagnosis.`,
      },
      {
        heading: '4. JavaScript Rendering Check',
        body: `Many modern security websites use React, Vue or Next.js. If your content is rendered client-side and Googlebot can't execute JavaScript, your pages may appear blank to the crawler.\n\n**Diagnosis:**\n• Use Google Search Console's URL Inspection tool > "View Crawled Page" > toggle between HTML and Rendered tabs.\n• If the Rendered tab shows full content but the HTML tab is empty, you have a client-side rendering dependency.\n\n**Solutions:**\n• Implement server-side rendering (SSR) or static site generation (SSG) for all SEO-critical pages.\n• Use Next.js getStaticProps or getServerSideProps appropriately.\n• Ensure dynamic schema injection happens server-side, not in a client-only useEffect hook.\n• Test with Fetch as Google in Search Console after any rendering architecture change.`,
      },
      {
        heading: '5. Redirect and Link Audit',
        body: `Redirect chains bleed PageRank and slow crawl speed. Run a full crawl and:\n\n• Identify every redirect chain (A→B→C) and collapse to a direct redirect (A→C).\n• Find and fix 404 errors linked internally — these waste crawl budget.\n• Check that HTTP redirects to HTTPS on all URLs (including www variants).\n• Audit your backlink profile for links pointing to 301-redirected URLs — update these where possible.\n• Remove broken external links from your content.\n\nPriority fix order: (1) broken internal links causing 404s, (2) redirect chains of 3+ hops, (3) HTTP→HTTPS redirect issues.`,
      },
      {
        heading: '6. Structured Data and Meta Integrity',
        body: `Run a meta audit across all key pages:\n\n• Every page should have a unique, descriptive title tag (50–60 characters) and meta description (150–160 characters).\n• Flag duplicate title tags and meta descriptions in Screaming Frog's Duplicate report.\n• Check for missing H1s and pages with multiple H1s.\n• Validate all schema blocks via Google's Rich Results Test — fix all errors, review warnings.\n• Confirm canonical tags are self-referencing on all canonical pages and pointing to the correct URL on paginated or parameter-filtered variants.\n• Audit hreflang implementation if you serve multiple regions or languages.`,
      },
    ],
    conclusion: `Run this audit at least quarterly. Block an afternoon, work through each section in order and log every finding in a simple spreadsheet with a priority rating (critical/high/medium/low) and assigned owner. Critical issues (crawl blocks, mass deindexation, broken canonical chains) should be fixed within 48 hours of discovery. A clean technical foundation multiplies the return on every content and link investment you make.`,
  },
  {
    slug: 'google-ads-security-campaign-architecture',
    title: 'Google Ads for Security: Campaign Architecture',
    diff: 'Intermediate',
    read: '15 min',
    excerpt: 'Campaign and ad-group structure, match types and landing pages built for ROAS.',
    tags: ['Google Ads', 'PPC', 'Campaign structure', 'ROAS'],
    intro: `Google Ads is the fastest way to generate qualified leads for security companies, but poor account architecture — the single most common issue in security industry accounts — destroys ROAS before a single ad shows. This guide walks you through campaign structure, ad-group design, match type strategy and landing page requirements that maximise Quality Score and minimise wasted spend.`,
    sections: [
      {
        heading: '1. Account Structure Philosophy',
        body: `The guiding principle of a well-structured Google Ads account is relevance: the ad the user sees should be closely related to the keyword that triggered it, and the landing page the ad sends them to should directly address that keyword's intent.\n\nFor security companies, structure accounts by service line, not by match type:\n\n• Campaign: CCTV Installation – Commercial\n• Campaign: CCTV Installation – Residential\n• Campaign: Access Control\n• Campaign: Alarm Installation – Commercial\n• Campaign: Alarm Installation – Residential\n• Campaign: Security Monitoring\n• Campaign: Brand (your company name)\n\nSeparate commercial and residential intent at the campaign level — their economics (CPL, LTV, conversion rate) are completely different and need separate budgets and bidding strategies.`,
      },
      {
        heading: '2. Ad Group Design',
        body: `Within each campaign, create tightly themed ad groups. The goal is for every keyword in an ad group to be answered by the same ad.\n\nExample ad groups within "CCTV Installation – Commercial":\n• Core: [commercial cctv installation], "commercial cctv installation"\n• System type: [ip cctv system installation], "ip camera installation"\n• Application: [warehouse cctv], "factory cctv installation"\n• Budget signal: [cctv installation cost], "how much does commercial cctv cost"\n\nDo NOT mix "cctv" and "security camera" queries in the same ad group unless you've confirmed identical intent and you're writing one ad that addresses both naturally. Thematic cleanliness drives Quality Score.`,
      },
      {
        heading: '3. Match Type Strategy',
        body: `Google's match type landscape has consolidated significantly. The practical 2026 approach:\n\n• **Exact match [keyword]:** Use for your highest-value, highest-confidence head terms. Provides the tightest control. Monitor search terms weekly and add new variations as exact match targets.\n• **Phrase match "keyword":** Use for moderate-confidence terms where word order matters. Catches variants you haven't explicitly added.\n• **Broad match keyword:** Use only when supported by Smart Bidding with strong conversion data (100+ conversions per month). Without sufficient data, broad match bleeds budget to irrelevant queries.\n\nNegative keywords are as important as positive keywords. Build a comprehensive negative list before launching: "diy", "jobs", "career", "training", "software", "app", "cheap", "free" and any competitor names you're not explicitly targeting.`,
      },
      {
        heading: '4. Bidding Strategy Selection',
        body: `Choose your bidding strategy based on your data maturity:\n\n• **New account (< 30 conversions/month):** Manual CPC or Maximise Clicks with a bid cap. Build conversion data before trusting automated bidding.\n• **Growing account (30–100 conversions/month):** Target CPA bidding once you have a reliable average CPA benchmark. Set the target at your actual CPA, not an aspirational one — Smart Bidding needs achievable targets.\n• **Mature account (100+ conversions/month):** Target ROAS if you're passing revenue values to Google Ads (essential for contract-value businesses). Maximise Conversion Value as an alternative.\n\nConversion tracking: you must be tracking phone calls (minimum 60-second call duration), form submissions and, ideally, quote requests and won jobs. Tracking only form fills gives Smart Bidding an incomplete picture.`,
      },
      {
        heading: '5. Landing Page Requirements',
        body: `Quality Score is 60% landing page experience. A high-performing PPC landing page for security services must:\n\n• Match the keyword intent exactly — a "commercial CCTV installation London" ad must land on a page specifically about commercial CCTV installation in London, not a generic services page.\n• Load in under 2 seconds on mobile. Use PageSpeed Insights to measure.\n• Have a clear, prominent call to action above the fold — "Get a Free Survey" or "Request a Quote" — with a click-to-call phone number and a short form.\n• Include trust signals: accreditations (NSI/SSAIB logo), years in business, review count, case study thumbnails.\n• Have no navigation menu (reduces exit options and keeps focus on conversion).\n• Be mobile-first — 70%+ of security service searches happen on mobile.',\n\nBuild dedicated landing pages per campaign type rather than pointing all ads to your homepage. The uplift in conversion rate typically pays for the development cost within 2 months.`,
      },
      {
        heading: '6. Reporting and Optimisation Cadence',
        body: `Weekly optimisation tasks:\n• Review Search Terms report — add new negatives and new exact match targets.\n• Check impression share — if below 60% on core terms, increase bids or budget.\n• Monitor Quality Score changes on key terms.\n\nMonthly optimisation tasks:\n• Review auction insights — are you losing share to new competitors?\n• Analyse device performance — should mobile bid adjustments change?\n• Review day-of-week and hour-of-day performance — apply bid adjustments to concentrate spend when leads convert.\n• A/B test ad copy — run minimum 2 responsive search ad variants per ad group and rotate using "optimise for best-performing ads" after 500 impressions.`,
      },
    ],
    conclusion: `A well-structured Google Ads account for a security company is a lead-generation machine that compounds as you accumulate conversion data and refine targeting. Invest the time in proper campaign architecture before you spend a pound. The difference in ROAS between a well-structured and a poorly structured account is routinely 3–5x.`,
  },
  {
    slug: 'earning-links-security-publications',
    title: 'Earning Links from Security Publications',
    diff: 'Intermediate',
    read: '13 min',
    excerpt: 'Outreach, digital PR and resource link strategies that compound domain authority.',
    tags: ['Link building', 'Digital PR', 'Outreach', 'Domain authority'],
    intro: `Backlinks from security trade publications, cybersecurity news sites and industry associations remain one of the strongest ranking signals in Google's algorithm. They're also disproportionately powerful for AI visibility — LLMs trained on web data weight content from authoritative publications highly. This guide gives you three proven link-building approaches specifically suited to security companies: journalist outreach, digital PR with original research, and resource link building.`,
    sections: [
      {
        heading: '1. Why Links From Security Publications Matter More',
        body: `Not all links are equal. A single link from Security Week, CSO Online, SC Magazine or the NSI website is worth more than 50 links from generic business directories. Topically relevant links — from sites that Google has categorised as being about security — pass stronger relevance signals for security-related keyword rankings.\n\nFor AI visibility, this effect is amplified. LLMs specifically trained on curated web corpora (like Common Crawl subsets) over-represent content from established trade publications. Being cited in these sources increases your probability of appearing in LLM training data and in RAG retrieval contexts.\n\nPriority target publications: Security Week, CSO Online, SC Media, Infosecurity Magazine, Security Buyer, IFSEC Global, Installer Magazine, and national press technology sections.`,
      },
      {
        heading: '2. Journalist Outreach via HARO and Qwoted',
        body: `Help A Reporter Out (HARO, now Connectively), Qwoted and ResponseSource connect journalists seeking expert sources with businesses that can provide them. This is the most reliable, scalable method for earning editorial coverage links.\n\n**System setup:**\n• Create accounts on HARO/Connectively, Qwoted and ResponseSource.\n• Filter queries to "Technology", "Security", "Business" and "Real Estate" categories.\n• Set up email alerts for each platform.\n\n**Response protocol:**\n• Respond within 60 minutes of query publication — early responders are significantly more likely to be included.\n• Lead with your credentials in 2 sentences: name, title, company, relevant certification/experience.\n• Give a substantive, quotable answer (150–250 words) — journalists don't use vague platitudes.\n• Offer to provide more detail or be available for a follow-up call.\n• Include a headshot link and company logo link.\n\n**Volume:** Aim to respond to 10–15 relevant queries per week. Expect a 15–25% placement rate.`,
      },
      {
        heading: '3. Digital PR with Original Research',
        body: `Original research is the highest-yield, most scalable link-building asset a security company can produce. A well-executed research report can earn 20–100 editorial links from a single campaign.\n\n**Research angles that generate coverage in security publications:**\n• Survey data: "We surveyed 500 UK SME owners about their physical security practices — here's what we found."\n• Incident analysis: "We analysed 1,000 CCTV incidents submitted by our monitoring team — the most common failure points in commercial security systems."\n• Cost benchmarking: "Security system installation costs by region: a data analysis of 2,000 quotes."\n• Trend reports: "AI in physical security: adoption survey of UK integrators 2026."\n\n**Production process:**\n1. Design a concise survey (10–15 questions) and distribute via LinkedIn, industry forums or a panel provider.\n2. Analyse results and find 3–5 data-driven headlines.\n3. Write a press release and a long-form findings page on your website.\n4. Pitch to journalists 1 week before publishing, offering an embargo exclusive to tier-1 publications.\n5. Publish and follow up with the broader media list.`,
      },
      {
        heading: '4. Resource Link Building',
        body: `Resource link building involves identifying pages that link to helpful resources in your industry and earning a place on those lists.\n\n**Finding resource pages:**\n• Search Google for: site:.gov.uk security resources, site:.edu security guide, "security resources" OR "security links" inurl:resources\n• Look for: local authority crime prevention pages, industry association resource lists, university security management course reading lists.\n\n**The pitch:**\n• Identify a specific resource page URL.\n• Find the editor's email (Hunter.io, LinkedIn).\n• Write a brief, personalised email (3–4 sentences) mentioning the specific page, explaining what your resource offers and why it's worth adding.\n• Don't attach PDFs or include multiple links.\n\n**What to build:** Free tools and resources earn links most reliably: a downloadable security audit checklist, a regional crime statistics dashboard, a CCTV lens calculator, a video surveillance coverage calculator.`,
      },
      {
        heading: '5. Avoiding Link-Building Pitfalls',
        body: `Common mistakes that neutralise or penalise link-building efforts:\n\n• **Buying links:** Google's link spam algorithms detect paid link patterns. The risk is not worth the short-term gain — manual penalties can remove your site from the index entirely.\n• **Guest posting on irrelevant sites:** Links from low-quality "write for us" sites with no topical relevance have near-zero value and may trigger Penguin-era signals.\n• **Over-optimised anchor text:** If 40% of your links use exact-match anchor text like "CCTV installation London", that's a red flag pattern. Aim for a natural distribution: brand name (40%), bare URL (20%), generic ("click here", "read more") (20%), partial match (20%).\n• **Reciprocal link schemes:** Swapping links with partner companies at scale is a violation of Google's guidelines. Occasional, editorially warranted cross-links between genuinely related businesses are fine.`,
      },
    ],
    conclusion: `Link building for security companies is a long-term game — meaningful results from digital PR and journalist outreach typically materialise over 6–12 months. But the compounding effect is real: as your domain authority rises, new content ranks faster, and AI engines cite you more frequently. Run the HARO/Qwoted system as a weekly discipline, invest in one original research campaign per quarter, and build 2–3 free resource tools in year one.`,
  },
  {
    slug: 'measuring-ai-citation-rate-share-of-voice',
    title: 'Measuring AI Citation Rate and Share of Voice',
    diff: 'Advanced',
    read: '17 min',
    excerpt: 'Track how often each engine names your brand and benchmark against competitors.',
    tags: ['AI visibility', 'Share of voice', 'Measurement', 'Analytics'],
    intro: `"What you can't measure, you can't manage" has never been more relevant than in AI search. As ChatGPT, Gemini, Perplexity and Google AI Overviews increasingly become the first stop for security buyers researching vendors and services, tracking your brand's presence in these answer engines is no longer optional. This guide builds a practical, repeatable measurement framework for AI citation rate and share of voice — without requiring expensive enterprise tooling.`,
    sections: [
      {
        heading: '1. Define Your Measurement Universe',
        body: `Before you can track citation rate, you need a defined set of queries to track consistently. These should represent the questions your target buyers actually ask answer engines.\n\n**Query categories for security companies:**\n• Brand awareness: "what are the leading [region] CCTV companies", "best commercial security companies in [city]"\n• Service-specific: "who should I hire for CCTV installation", "best access control company for multi-site businesses"\n• Problem-based: "how do I prevent break-ins at my warehouse", "what security system is best for a school"\n• Comparison: "is IP CCTV better than analogue", "NSI vs SSAIB certification difference"\n\nAim for 20–40 queries in your tracking set. Include both branded and unbranded queries. Queries should be stable — don't change them frequently or you lose trend comparability.`,
      },
      {
        heading: '2. Manual Tracking Process',
        body: `Without enterprise tools, build a manual tracking cadence. This takes approximately 2–3 hours per week.\n\n**Setup:**\n• Create a Google Sheet with columns: Date, Query, Engine, Response (truncated), Brand Named (Y/N), Position in Response, Sentiment (Positive/Neutral/Negative), Source URL cited.\n• Run each query in ChatGPT (GPT-4o), Google Gemini, Perplexity AI and Microsoft Copilot.\n• For Google AI Overviews: use a private/incognito window, logged out. AI Overviews don't show for all queries — note when absent.\n\n**Tracking rules:**\n• Run queries from the same IP/account context each week for consistency.\n• Copy the relevant portion of each response into the sheet.\n• Mark whether your brand is named, and in what position (1st mention, 2nd mention, etc.).\n• Note which competitor brands are mentioned in the same response.`,
      },
      {
        heading: '3. Calculate Citation Rate and Share of Voice',
        body: `With 4 weeks of data, you can calculate meaningful metrics:\n\n**Citation Rate (per engine):**\nCitation Rate = (Queries where your brand was named ÷ Total queries tracked) × 100\n\nExample: You tracked 30 queries in ChatGPT. Your brand appeared in 9 responses. Citation rate = 30%.\n\n**Share of Voice (per engine):**\nShare of Voice = (Your brand mentions ÷ Total brand mentions by all competitors) × 100\n\nExample: Across 30 queries in Gemini, your brand was mentioned 9 times. Competitors A, B, C were mentioned 6, 8 and 7 times respectively. Total mentions = 30. Your SoV = 9/30 = 30%.\n\n**Trend over time:** Plot citation rate and SoV monthly. Look for inflection points that correlate with content publishing, schema updates or earned media placements. This is your feedback loop.`,
      },
      {
        heading: '4. Identify Retrieval Gaps',
        body: `When your brand is not cited in response to a query, diagnose why:\n\n**Step 1: Test the query manually.** Copy the response. Who is cited? What sources does Perplexity link to?\n\n**Step 2: Check if you have content targeting this query.** If a query is "best CCTV system for schools" and you have no page targeting education-sector security, that's a content gap.\n\n**Step 3: Check whether cited sources have structural advantages.** Are they faster to load? Do they use FAQ schema? Do they have more authoritative inbound links from trade publications?\n\n**Step 4: Check entity recognition.** Ask ChatGPT directly: "What do you know about [Your Company Name]?" If it has no information or returns generic content, you have an entity authority gap to address (see the AI Visibility Playbook guide).`,
      },
      {
        heading: '5. Scaling with Tools',
        body: `Once the manual process is established and you understand what to measure, consider scaling with tools:\n\n• **Profound** (getprofound.com): Purpose-built AI citation tracking. Monitors brand mentions across ChatGPT, Gemini, Perplexity and Copilot at scale.\n• **Semrush AI Visibility tracker:** Integrated into Semrush's existing rank tracking interface, tracks AI overview presence alongside traditional rankings.\n• **Otterly.ai:** Lightweight tool specifically for AI share of voice monitoring.\n• **Custom GPT API tracking:** For technically capable teams, the OpenAI API allows systematic query running with logging — build a simple script to run your query set weekly and log responses to a database.\n\nBudget context: enterprise AI visibility tools typically run £300–£800/month. Manual tracking is free but labour-intensive. Most security companies should start manual and migrate to tooling once they've validated the process.`,
      },
      {
        heading: '6. Connecting AI Citation to Business Outcomes',
        body: `AI citation rate is a leading indicator, not a lagging business metric. Connect it to outcomes:\n\n• **Brand search volume:** As AI citation increases, branded search (people typing your company name into Google) should also increase. Monitor in Search Console and Google Trends.\n• **Direct traffic:** An increase in direct traffic (users typing your URL directly) correlates with increased brand awareness from AI citations.\n• **Lead source tracking:** Add "How did you hear about us?" to your contact forms. Over 12+ months, "AI / ChatGPT" should appear as a growing category.\n• **Sales pipeline tagging:** Ask your sales team to note when prospects mention discovering you via an AI engine.\n\nBuilding this attribution chain takes 6–12 months of consistent tracking. The companies investing in it now will have a significant analytics advantage over those who start later.`,
      },
    ],
    conclusion: `AI citation tracking is the new rank tracking. The companies that build measurement systems now will optimise faster, outmanoeuvre competitors earlier and make better content investment decisions. Start with the manual tracking process this week using the 30-query template, establish your baseline citation rate across the four major engines, and review monthly. The signal becomes clear within a quarter.`,
  },
]
