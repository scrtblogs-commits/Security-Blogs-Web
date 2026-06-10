// Static security guide content — rendered at /knowledge-hub/security-guides/[slug]/

export type GuideSection = {
  heading: string
  body: string[]
  steps?: string[]
  checklist?: string[]
  tip?: string
}

export type StaticGuide = {
  slug: string
  title: string
  diff: 'Beginner' | 'Intermediate' | 'Advanced'
  read: string
  excerpt: string
  image: string
  imageAlt: string
  topics: string[]
  intro: string
  sections: GuideSection[]
  keyTakeaways: string[]
}

const staticGuides: StaticGuide[] = [

  // ─── 1. AI Visibility Playbook ──────────────────────────────────────────────
  {
    slug: 'the-complete-ai-visibility-playbook-for-security-brands',
    title: 'The complete AI visibility playbook for security brands',
    diff: 'Advanced',
    read: '24 min',
    excerpt: 'A full system for getting cited across ChatGPT, Gemini, Perplexity and AI Overviews.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&q=85&fit=crop&auto=format',
    imageAlt: 'AI neural network visualization for security brand visibility',
    topics: ['AIO', 'AEO', 'GEO', 'Entity authority', 'Schema', 'Citable content', 'AI citation measurement'],
    intro: 'When a procurement manager asks ChatGPT "which commercial CCTV company should I use in Sydney?", the answer shapes their shortlist before your sales team ever picks up the phone. This guide is a full operating system for making your security brand the answer AI engines give — consistently, across every platform.',
    keyTakeaways: [
      'AI citation is now a buying signal. Security buyers use ChatGPT, Perplexity and Gemini for vendor discovery before visiting your website.',
      'Entity authority — not domain authority — determines AI citation frequency. You need to be a verified, consistent entity.',
      'Citable content follows a strict structure: direct answer first, supporting evidence second, no filler.',
      'Schema markup is the bridge between your website and AI knowledge graphs. Most security sites have none.',
      'Citation rate should be measured monthly with a controlled prompt set and benchmarked against three competitors.',
    ],
    sections: [
      {
        heading: 'How AI answer engines decide who to cite',
        body: [
          'Large language models like GPT-4 and Gemini do not run a PageRank algorithm. They combine pre-training knowledge (what was on the internet when they were trained), live retrieval (what they can fetch right now), and structured knowledge sources (entity graphs, Wikidata, schema-rich pages). Security brands that appear in all three layers get cited; brands in only one or two do not.',
          'The practical implication: traditional SEO — ranking on page one for "alarm installer Melbourne" — is necessary but not sufficient. A brand can rank #1 on Google and be completely absent from AI answers. This is the gap that AI visibility optimisation fills.',
        ],
        steps: [
          'Audit your current AI citation: run 20 standardised prompts across ChatGPT, Perplexity and Gemini. Record whether your brand appears and in what position.',
          'Identify the three AI engines your buyers use most. B2B security buyers skew toward ChatGPT and Perplexity; consumer buyers use Google AI Overviews most.',
          'Set a baseline citation rate (brand mentions ÷ total prompts tested) before starting any optimisation work.',
        ],
      },
      {
        heading: 'Phase 1 — Build your entity foundation',
        body: [
          'An "entity" is a distinct, verifiable thing — your company, in this case. AI engines trust entities that are consistently described across multiple authoritative sources. Inconsistency (different founding year on LinkedIn vs your about page, or "Pty Ltd" vs "Pty. Ltd." across directories) creates signal conflicts that reduce trust scores.',
        ],
        checklist: [
          'Create or claim your Wikidata entry (wikidata.org). Add P31 (instance of: private company), P17 (country), P571 (founding date), P452 (industry), P856 (website). Cite every claim.',
          'Verify your Google Business Profile is 100% complete with correct NAP (Name, Address, Phone).',
          'Align your LinkedIn Company Page, Crunchbase entry, and industry association listings with identical brand description.',
          'Publish an authoritative /about page that functions as an entity reference: founding story, leadership team, service areas, certifications (AS2201, ISO 27001 etc.), and client count.',
          'List on at least 5 industry directories: ASIAL, Master Locksmiths, SIA, Yellow Pages, True Local. Ensure identical NAP on all.',
        ],
        tip: 'The fastest entity win: create a Wikidata entry today. It takes 2–3 hours and AI training datasets draw from it directly.',
      },
      {
        heading: 'Phase 2 — Schema markup for AI parsing',
        body: [
          'Schema markup is JSON-LD code that tells crawlers exactly what your content means. AI systems use schema to extract structured facts about your business without having to interpret natural language. A security website without schema is like a filing cabinet without labels — the information is there, but it takes too long to retrieve.',
          'Priority schema types for security brands: Organization (company facts), LocalBusiness with SecuritySystem subtype (local presence), Service (each service offered), FAQPage (Q&A content), Review and AggregateRating (social proof).',
        ],
        steps: [
          'Implement Organization schema on every page via your site-wide layout. Include name, url, logo, contactPoint, areaServed, sameAs (linking to Wikidata, LinkedIn, and ASIAL listing).',
          'Add Service schema to every service landing page: name, description, provider, areaServed, hasOfferCatalog.',
          'Add FAQPage schema to any page with questions and answers. This feeds both Google AI Overviews and Perplexity directly.',
          'Add LocalBusiness schema with your full address and opening hours to your contact page.',
          'Validate all schema using Google\'s Rich Results Test and Schema.org validator before deploying.',
        ],
      },
      {
        heading: 'Phase 3 — Citable content architecture',
        body: [
          'Citable content is content structured so that an AI can extract a clean, accurate passage and quote it verbatim. The key structural difference from traditional SEO content: the answer must appear in the first 40–60 words of the page, not after 300 words of context.',
          'For security brands, the highest-value citable content topics are the evaluation questions buyers ask during the consideration stage: "What certifications should a commercial CCTV installer have?", "How much does access control installation cost for a 50-person office?", "What is the difference between monitored and self-monitored alarms?"',
        ],
        checklist: [
          'Identify your top 10 buyer evaluation questions using sales call recordings, support tickets and AlsoAsked.com.',
          'Create a dedicated page or section for each question. Open with a 50-word direct answer, then expand with detail.',
          'Structure body content with H2 headings that each answer a related sub-question.',
          'Add FAQPage schema to every Q&A section.',
          'Update each page quarterly to maintain recency signals.',
          'Link citable pages from your service pages and homepage to accumulate internal authority.',
        ],
        tip: 'Voice your answers in second person ("You should look for...") not third person. AI engines prefer first-person or second-person framing for cited passages.',
      },
      {
        heading: 'Phase 4 — Measurement and iteration',
        body: [
          'AI citation rate should be tracked monthly using a consistent prompt methodology. Run the same 20–30 prompts each month, across the same engines, and record: whether your brand appears, how early it appears in the response, and the sentiment of the surrounding context (positive, neutral, negative).',
          'Competitive benchmarking: run the same prompt set asking about your three main competitors. Your goal is to increase your citation frequency relative to theirs, not just in absolute terms.',
        ],
        steps: [
          'Build a prompt library of 25–30 prompts covering: branded queries ("Is [Your Brand] reputable?"), category queries ("best CCTV installer in [city]"), and comparison queries ("compare [Your Brand] vs [Competitor]").',
          'Run all prompts on the first Monday of each month. Log results in a spreadsheet.',
          'Track: citation rate (%), average position when cited, and sentiment score (1–5).',
          'Identify which content pages are being cited and invest in expanding them.',
          'Set a 6-month goal: increase citation rate by 20 percentage points across all tested engines.',
        ],
      },
    ],
  },

  // ─── 2. Schema Markup Blueprint ─────────────────────────────────────────────
  {
    slug: 'schema-markup-blueprint-for-security-websites',
    title: 'Schema markup blueprint for security websites',
    diff: 'Intermediate',
    read: '16 min',
    excerpt: 'Copy-paste structured data for Organization, Service, FAQ and Review across your site.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=85&fit=crop&auto=format',
    imageAlt: 'Developer implementing schema markup code for security website',
    topics: ['Schema markup', 'JSON-LD', 'Organization schema', 'Service schema', 'FAQPage', 'Rich results', 'Structured data'],
    intro: 'Schema markup is the single most underused SEO tool in the security industry. Most security websites have zero structured data — which means search engines and AI engines have to guess what your business does, where you operate, and why buyers should trust you. This guide gives you every schema type you need, with real examples you can adapt today.',
    keyTakeaways: [
      'Schema markup is machine-readable metadata that tells search engines and AI engines exactly what your content means.',
      'Security websites should implement at minimum: Organization, LocalBusiness, Service, FAQPage, and AggregateRating.',
      'JSON-LD (JavaScript Object Notation for Linked Data) is the format Google recommends — it goes in a <script> tag and does not affect page appearance.',
      'Valid, complete schema can trigger rich results in Google (star ratings, FAQ dropdowns) and increases AI citation likelihood.',
      'Test every schema implementation using Google\'s Rich Results Test before deploying to production.',
    ],
    sections: [
      {
        heading: 'Why schema matters more now than ever',
        body: [
          'Before AI answer engines, schema\'s main benefit was rich results — the star ratings and FAQ dropdowns that appear in Google search results. Those still matter (pages with review schema earn 15–35% higher CTR). But the bigger value in 2026 is AI parsing.',
          'When ChatGPT retrieves your website during a live query, it uses structured data to extract facts quickly and reliably. A page with Service schema that includes a clear description and areaServed will be cited far more accurately than a page where the AI has to infer your service area from paragraph text.',
        ],
      },
      {
        heading: 'Organization schema — your company\'s digital identity card',
        body: [
          'Organization schema should appear on every page of your site, implemented in the site-wide layout. This creates a persistent entity definition that AI engines can reference regardless of which page they crawl. The minimum required properties are name, url, and logo. Everything else compounds authority.',
        ],
        steps: [
          'Add the following JSON-LD to your site layout: @type: "Organization", name: "[Your Company Name]", url: "[your-domain.com.au]", logo: "[logo-url]", contactPoint with @type "ContactPoint" and telephone.',
          'Add areaServed as an array of your service regions: ["Melbourne", "Sydney", "Brisbane"] or use country codes for national coverage.',
          'Add sameAs as an array of your verified profiles: LinkedIn, Facebook, Wikidata, Crunchbase, ASIAL directory URL.',
          'Add foundingDate in ISO format (e.g., "2014-03-01") and numberOfEmployees if you are comfortable disclosing it.',
          'Validate using schema.org/Organization to confirm all properties are correctly typed.',
        ],
        tip: 'The sameAs property is one of the most powerful entity signals. Every URL in that array tells AI engines: "this is the same organisation, verified from that source." Include at least 4–5 authoritative URLs.',
      },
      {
        heading: 'LocalBusiness schema — essential for any service-area business',
        body: [
          'If your security company serves a geographic area (almost all do), LocalBusiness schema is mandatory. It feeds Google Business Profile cross-referencing, local pack eligibility signals, and AI queries with geographic intent ("security company near me", "alarm installer in Parramatta").',
          'Use the most specific subtype available. SecuritySystem and Electrician are both valid subtypes of LocalBusiness. Using SecuritySystem signals industry expertise without any ambiguity.',
        ],
        checklist: [
          'Implement @type: "SecuritySystem" (extends LocalBusiness) on your contact/location page.',
          'Include full address with @type: "PostalAddress", streetAddress, addressLocality, addressRegion, postalCode, addressCountry.',
          'Add openingHoursSpecification for each day you operate, including 24/7 monitoring if applicable.',
          'Add priceRange if relevant (e.g., "$$" or "Custom quotes from $2,500").',
          'Include hasMap linking to your Google Maps listing.',
          'Add areaServed listing each suburb or LGA you service.',
        ],
      },
      {
        heading: 'Service schema — one schema block per service',
        body: [
          'Every service page on your site should have Service schema. This is where most security companies miss the biggest opportunity. Instead of relying on AI engines to infer what CCTV installation or access control means for your business, you are telling them directly.',
        ],
        steps: [
          'Create a Service schema block for each service: @type: "Service", name: "[Service Name]", description: "[Clear 2-sentence description]", provider (linking back to your Organization), areaServed, and serviceType.',
          'Add offers with @type "Offer" if you have fixed pricing or clear price ranges.',
          'Add aggregateRating if the service page includes or references reviews.',
          'Connect services to your Organization via the provider property using the same @id as your Organization schema.',
        ],
      },
      {
        heading: 'FAQPage schema — your fast track to AI Overviews',
        body: [
          'FAQPage schema is the highest-leverage schema type for AI visibility. Google\'s AI Overviews source heavily from FAQ-structured content, and Perplexity explicitly looks for question-answer structures when building its responses. Any page with a Q&A section should have FAQPage schema.',
          'The rule is simple: if your page has a question followed by an answer, wrap it in FAQPage schema. This includes service pages ("What is included in a CCTV installation?"), pricing pages ("How much does access control cost?"), and dedicated FAQ pages.',
        ],
        checklist: [
          'Add @type: "FAQPage" with mainEntity as an array of Question objects.',
          'Each Question has @type: "Question", name: "[The question text]", and acceptedAnswer with @type: "Answer" and text: "[The answer text]".',
          'Keep answer text under 300 words for each FAQ item — Google truncates longer answers in rich results.',
          'Use the exact same question text in your schema as on the page — schema that does not match visible content is flagged as spam.',
          'Add FAQPage schema to at least 6 pages initially: home, each main service page, and your about page.',
        ],
        tip: 'The question text in your FAQ schema is essentially a keyword. Write questions the way your buyers actually speak: "How much does a security camera system cost?" not "CCTV pricing enquiry".',
      },
      {
        heading: 'AggregateRating and Review schema',
        body: [
          'Review schema enables the gold star ratings visible in Google search results. For security companies, these stars are major conversion drivers — a 4.8-star rating next to your listing versus a competitor with no stars is a visible trust advantage. The stars must come from reviews that are hosted on your own website, not pulled from third-party platforms.',
          'Important: never add AggregateRating schema with fake or self-generated reviews. Google will penalise pages found to be gaming review schema.',
        ],
        steps: [
          'Implement a reviews section on your main service pages using real customer testimonials you have collected.',
          'Add Review schema for each individual review: @type "Review", reviewRating with @type "Rating" and ratingValue, author with @type "Person" and name.',
          'Add AggregateRating to your Organization or Service schema: @type "AggregateRating", ratingValue (average), reviewCount, bestRating: 5.',
          'Aim for at least 10 on-site reviews before adding AggregateRating schema — sparse review counts can look suspicious.',
        ],
      },
    ],
  },

  // ─── 3. Local SEO ────────────────────────────────────────────────────────────
  {
    slug: 'local-seo-from-zero-to-local-pack',
    title: 'Local SEO from zero to local pack',
    diff: 'Beginner',
    read: '14 min',
    excerpt: 'Set up Google Business Profile, service-area pages and reviews the right way.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85&fit=crop&auto=format',
    imageAlt: 'Security professional conducting local site survey for alarm installation',
    topics: ['Local SEO', 'Google Business Profile', 'NAP consistency', 'Service-area pages', 'Review strategy', 'Local citations'],
    intro: 'For security companies that serve a geographic area — alarm installers, CCTV integrators, access control specialists — local SEO is the highest-ROI marketing channel available. The three-pack of Google Maps results at the top of local searches captures 44% of all clicks. This guide walks you through every step to get there, in order of impact.',
    keyTakeaways: [
      'Google Business Profile (GBP) is the most important local ranking asset — treat it like a second website.',
      'NAP consistency (Name, Address, Phone) across every directory is non-negotiable. One discrepancy creates trust conflicts.',
      'Service-area pages targeting specific suburbs outperform generic city landing pages by 4× in local rankings.',
      'A review velocity of 2–4 new reviews per month sustains local pack rankings without triggering spam filters.',
      'The local pack is won through proximity, relevance, and prominence — GBP signals drive all three.',
    ],
    sections: [
      {
        heading: 'Step 1 — Claim and optimise your Google Business Profile',
        body: [
          'Your Google Business Profile (GBP) is the single most important local SEO asset. It feeds the Maps three-pack, the Knowledge Panel, and increasingly, Google AI Overviews for local queries. An incomplete or inconsistent profile is the most common reason security companies fail to appear locally despite having excellent service reputations.',
        ],
        checklist: [
          'Claim your GBP at business.google.com and verify via postcard or phone.',
          'Set your primary category to the most specific option: "Security System Supplier", "Burglar Alarm Store", or "Security Guard Service" depending on your focus.',
          'Add all applicable secondary categories: CCTV installer, Access Control, Smart Home Security System.',
          'Complete every available field: business description (750 characters, keyword-rich), services, attributes (e.g., "Women-led", "Locally owned"), and products.',
          'Upload at least 20 photos: exterior, interior, team, completed installations. Use geotagged photos where possible.',
          'Set up messaging and configure an auto-reply. Response rate affects your listing prominence.',
          'Enable bookings if you offer site surveys or consultations.',
          'Post a GBP update at least once per week. Posts expire after 7 days but reset your activity signal.',
        ],
        tip: 'Your GBP business description is not indexed by Google for ranking, but it appears in your Knowledge Panel and is read by potential buyers. Write it for humans first, but include your main keywords naturally.',
      },
      {
        heading: 'Step 2 — NAP consistency across all directories',
        body: [
          'NAP stands for Name, Address, Phone — the three data points Google cross-references across the web to confirm your business exists where you say it does. A single variation between listings (Pty Ltd vs Pty. Ltd., a mobile number on one directory and a landline on another, or an old address that was never updated) creates a signal conflict that suppresses your local pack visibility.',
          'Before building any new citations, audit your existing ones. Search your business name and phone number across the major Australian directories and export any discrepancies.',
        ],
        steps: [
          'Conduct a NAP audit: search "[Your Business Name] [city]" and your phone number across Google, Yellow Pages, True Local, Hipages, and Word of Mouth. Log every listing in a spreadsheet.',
          'Define your canonical NAP: the exact format you will use on every listing. Decide: "Pty Ltd" or "Pty. Ltd."? Mobile or landline? Full street address or PO Box? Lock it in.',
          'Update every non-matching listing to match your canonical NAP exactly.',
          'Create new listings on any high-authority Australian directories you are missing: ASIAL directory, Master Locksmiths, Hipages, Service.com.au, Houzz (for residential).',
          'Set a quarterly reminder to re-audit your top 15 directory listings.',
        ],
      },
      {
        heading: 'Step 3 — Build service-area pages that actually rank',
        body: [
          'Generic landing pages ("We serve Melbourne") do not rank for local queries. Google needs geographic specificity to understand your service footprint and match it to a searcher\'s location. The winning pattern is a dedicated page per suburb or LGA that you actively service.',
          'A well-built service-area page for "alarm installation Parramatta" will typically rank in local organic results within 60–90 days with minimal link building, purely on relevance signals.',
        ],
        checklist: [
          'List every suburb or LGA where you have completed at least 5 jobs — these are your target service-area pages.',
          'Create one page per location: URL should be /services/[service-type]/[suburb]/ (e.g., /services/alarm-installation/parramatta/).',
          'Write a unique opening paragraph (100+ words) mentioning the suburb name, the specific service offered there, and at least one local reference (council name, major landmark, local industry).',
          'Add a Google Maps embed showing your service area.',
          'Include a testimonial from a customer in that area (or from a nearby suburb if unavailable).',
          'Add LocalBusiness schema with the suburb name in the areaServed property.',
          'Link each service-area page from your main services page and your GBP website field.',
        ],
        tip: 'Do not create service-area pages for suburbs where you have never worked. Thin, location-stuffed pages are a spam signal. Build pages as you grow your footprint.',
      },
      {
        heading: 'Step 4 — Build a sustainable review velocity',
        body: [
          'More reviews improve local pack rankings, but the pattern matters as much as the count. A business that collects 40 reviews in a week then nothing for six months appears manipulated to Google\'s algorithms. The goal is a consistent drip: 2–4 new reviews per month, with occasional spikes after large commercial jobs.',
          'The highest-converting review request method is the post-installation SMS with a direct link to your GBP review form. Send it within 24 hours of job completion when satisfaction is highest.',
        ],
        steps: [
          'Create a short GBP review link using Google\'s Place ID lookup tool. This link takes customers directly to the review form.',
          'Automate a review request SMS sent 24 hours after every job completion from your CRM or job management software.',
          'Follow up with an email at 72 hours if the SMS received no response.',
          'Reply to every review — positive and negative — within 48 hours. Google weights response rate in prominence scoring.',
          'Never offer discounts or gifts in exchange for reviews. This violates Google\'s review policy and risks suspension.',
        ],
      },
    ],
  },

  // ─── 4. Topical Authority ────────────────────────────────────────────────────
  {
    slug: 'building-topical-authority-with-content-clusters',
    title: 'Building topical authority with content clusters',
    diff: 'Intermediate',
    read: '18 min',
    excerpt: 'Architect pillar and cluster pages that rank and feed answer-engine retrieval.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=85&fit=crop&auto=format',
    imageAlt: 'Content strategy planning session showing topic cluster map',
    topics: ['Content clusters', 'Pillar pages', 'Topical authority', 'Internal linking', 'Content architecture', 'AIO', 'SEO content strategy'],
    intro: 'Google increasingly rewards websites that demonstrate deep expertise in a specific topic area over sites that cover many topics shallowly. For security companies, this means building a body of content that covers every aspect of your service area — from beginner questions to expert-level specifics — in a connected, internally-linked architecture called a content cluster.',
    keyTakeaways: [
      'Topical authority signals that your site is the go-to resource for a subject, not just a page that happens to mention relevant keywords.',
      'A content cluster consists of one authoritative pillar page and 6–12 cluster pages covering related subtopics.',
      'Internal linking between pillar and cluster pages is what creates the topical authority signal — disconnected pages do not compound.',
      'Content clusters serve dual purpose: they rank in traditional search AND provide the breadth of citable content that AI engines prefer.',
      'Security companies should build 3–5 clusters, not 20. Depth beats breadth.',
    ],
    sections: [
      {
        heading: 'What topical authority actually means',
        body: [
          'Traditional SEO focused on individual page relevance: does this page have the keyword enough times? Topical authority operates at the domain level: does this website comprehensively cover this subject? A site with 40 deeply interlinked pages about CCTV installation will outrank a site with one highly-optimised CCTV page on competitive CCTV queries.',
          'The content cluster model operationalises topical authority. A pillar page provides comprehensive coverage of a broad topic. Cluster pages drill down into specific subtopics and link back to the pillar. The cluster functions as a self-contained knowledge hub that signals expertise to both search engines and AI systems.',
        ],
      },
      {
        heading: 'Step 1 — Map your topic clusters',
        body: [
          'Security companies typically have 3–5 natural cluster topics, aligned to their main service areas. The right number is determined by the scope of your business, not by content volume targets. A residential alarm installer might have clusters around Home Security Systems, Smart Home Integration, and Security Monitoring. A commercial integrator might have clusters around Access Control, CCTV Systems, and Perimeter Security.',
        ],
        steps: [
          'List your three to five most important services or product areas. Each becomes a cluster topic.',
          'For each cluster topic, brainstorm every question a buyer could have: beginner ("What is access control?"), intermediate ("How much does access control cost for 50 doors?"), and expert ("How do I integrate access control with my HR system?").',
          'Use AlsoAsked.com and AnswerThePublic to find question variations you may have missed.',
          'Prioritise questions by search volume and buyer intent. Evaluation-intent questions (How much? How do I choose? What is the difference between?) are highest value.',
        ],
        tip: 'Your sales team and support inbox are gold mines for cluster topics. The questions your buyers ask in pre-sales calls are the exact questions they searched for before calling you.',
      },
      {
        heading: 'Step 2 — Build your pillar pages',
        body: [
          'A pillar page is a comprehensive, authoritative guide to a broad topic. It covers the topic thoroughly enough to be a useful standalone resource, while creating natural link opportunities to every cluster page. Length is a byproduct of comprehensiveness, not a target — aim for 2,500–4,000 words.',
          'The structure of an effective security pillar page: overview of the topic, why it matters for the reader\'s use case, the key components or considerations, a comparison of the main options, a buying or implementation guide, and an FAQ section.',
        ],
        checklist: [
          'Write one pillar page per cluster topic. Title format: "The Complete Guide to [Topic] for [Audience]" or "Everything You Need to Know About [Topic]".',
          'Include a table of contents with anchor links to each major section.',
          'Link out to every cluster page from the relevant section of the pillar.',
          'Add FAQPage schema covering the most common questions in your FAQ section.',
          'Aim for at least 2,500 words. Quality and comprehensiveness — not length — is the goal.',
          'Include original data, case studies, or statistics wherever possible. Original data earns links naturally.',
        ],
      },
      {
        heading: 'Step 3 — Write cluster content that supports the pillar',
        body: [
          'Cluster pages are focused, specific pages that answer one question or cover one subtopic in depth. They do not need to be long — 800–1,500 words is typical. What they must do is: answer the question definitively, link back to the pillar page in context, and link to 2–3 related cluster pages.',
          'For a CCTV cluster, example cluster pages might be: "Indoor vs outdoor security cameras: which do you need?", "How many cameras do you need for a 10,000 sq ft warehouse?", "CCTV storage: how long is footage kept and why?", "IP vs analogue CCTV: a practical comparison."',
        ],
        steps: [
          'Write cluster pages in the answer-first format: first paragraph directly answers the title question in 40–60 words.',
          'Include the pillar page as a contextual "related guide" link with descriptive anchor text.',
          'Add Schema markup: Article, and FAQPage if the page includes Q&A content.',
          'Publish at a consistent rate — one to two cluster pages per week is sustainable for most security companies.',
          'After 10+ cluster pages are published, do an internal link audit to ensure every cluster links back to the pillar.',
        ],
      },
      {
        heading: 'Step 4 — Internal linking strategy',
        body: [
          'Internal linking is what converts a collection of pages into a topical authority cluster. Without internal links, Google sees individual pages. With a properly linked cluster, Google sees a knowledge hub. The rule of thumb: every cluster page should have at least 3 internal incoming links (from the pillar and from related cluster pages).',
        ],
        checklist: [
          'Audit your existing content: identify pillar-worthy pages that already rank well but have no cluster support.',
          'Use descriptive anchor text that includes the target page\'s primary keyword. "Learn more about CCTV storage options" is better than "click here".',
          'Link from the pillar to all cluster pages in the relevant section, not just a "related articles" sidebar.',
          'Link between cluster pages where the topics are adjacent. CCTV storage naturally links to CCTV maintenance.',
          'Avoid orphan pages — every new page should be linked from at least 2 existing pages before publishing.',
        ],
      },
    ],
  },

  // ─── 5. Technical SEO Audit ──────────────────────────────────────────────────
  {
    slug: 'technical-seo-audit-step-by-step',
    title: 'Technical SEO audit, step by step',
    diff: 'Advanced',
    read: '22 min',
    excerpt: 'Crawl budget, indexation, Core Web Vitals and render checks with a repeatable checklist.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85&fit=crop&auto=format',
    imageAlt: 'Technical SEO audit dashboard showing site health metrics',
    topics: ['Technical SEO', 'Crawl health', 'Core Web Vitals', 'Indexation', 'Schema', 'Site speed', 'Mobile optimisation'],
    intro: 'A technical SEO audit is the diagnostic layer of your marketing strategy. It identifies the silent ranking suppressors — broken links, crawl budget waste, failing Core Web Vitals, and indexation errors — that stop excellent content from reaching its potential. This guide walks through a full technical audit in a repeatable, prioritised format.',
    keyTakeaways: [
      'Over 60% of security websites have at least one critical technical issue that is actively suppressing rankings.',
      'Core Web Vitals (LCP, INP, CLS) are confirmed ranking signals. Security sites with large image galleries routinely fail LCP.',
      'Duplicate content from templated service-area pages is the most common indexation problem in the security sector.',
      'A technical audit without prioritisation is useless — fix critical issues before moving to medium-priority improvements.',
      'Run a full technical audit quarterly, with a lighter crawl-health check monthly.',
    ],
    sections: [
      {
        heading: 'Before you start: the tools you need',
        body: [
          'A thorough technical SEO audit requires access to crawl data, Google Search Console data, and a PageSpeed testing tool. Free options are sufficient for most security company websites under 500 pages.',
        ],
        checklist: [
          'Google Search Console (free) — indexation status, Core Web Vitals field data, crawl errors, search performance.',
          'Screaming Frog SEO Spider (free up to 500 URLs) — full site crawl, redirect chains, duplicate content, missing tags.',
          'Google PageSpeed Insights (free) — LCP, INP, CLS lab and field data.',
          'Schema.org Validator and Google Rich Results Test (both free) — schema correctness.',
          'Ahrefs Webmaster Tools (free) — backlink profile and broken external links.',
        ],
      },
      {
        heading: 'Phase 1 — Crawl and indexation',
        body: [
          'Start every audit with a full site crawl using Screaming Frog. Export the URL list and filter by status code. Your goal is a clean crawl: all important pages returning 200, no important pages returning 4xx or 5xx, and no redirect chains longer than one hop.',
        ],
        steps: [
          'Run Screaming Frog on your domain. In Configuration > Spider, enable "Follow Internal Nofollow Links" to catch everything.',
          'Filter by 4xx response codes. Every broken internal link is a wasted ranking signal. Fix redirects or update the link to the correct destination.',
          'Filter by 3xx response codes. Look for redirect chains (A → B → C) — collapse these to single hops (A → C).',
          'Export the list and cross-reference with Google Search Console\'s Coverage report. Pages GSC shows as "excluded" that you want indexed are a priority fix.',
          'Check your XML sitemap: does it include all pages you want indexed? Does it exclude pages you do not (pagination, tag archives, thin category pages)?',
          'Verify canonical tags: every page should either be self-canonical or point to the correct canonical version. Look for accidental cross-canonicalisations.',
        ],
        tip: 'In GSC, check the "Not indexed" tab under Pages > Indexing. "Discovered — currently not indexed" means Google found the page but deprioritised it, usually because of thin content or crawl budget constraints.',
      },
      {
        heading: 'Phase 2 — Core Web Vitals for security sites',
        body: [
          'Core Web Vitals are user experience metrics that Google uses as a ranking signal. The three metrics are Largest Contentful Paint (LCP — how quickly the main content loads), Interaction to Next Paint (INP — how quickly the page responds to interaction), and Cumulative Layout Shift (CLS — how much the page layout jumps during loading).',
          'Security websites fail LCP most commonly because of unoptimised job photo galleries — before/after images of installations that are uploaded at full resolution without compression. A single 4MB image can cause an LCP of 8+ seconds.',
        ],
        checklist: [
          'Check your Core Web Vitals field data in GSC under Experience > Core Web Vitals. Field data is what Google uses for ranking.',
          'For LCP: compress all images to WebP format at a maximum of 200KB for hero images, 100KB for gallery images. Use lazy loading for images below the fold.',
          'For INP: audit third-party scripts (live chat widgets, tracking pixels). Load non-critical scripts asynchronously.',
          'For CLS: add explicit width and height attributes to all images and video embeds. This prevents layout shift as assets load.',
          'Re-run PageSpeed Insights after each fix. Target: LCP under 2.5s, INP under 200ms, CLS under 0.1.',
        ],
      },
      {
        heading: 'Phase 3 — Duplicate content and thin pages',
        body: [
          'Duplicate content is common on security websites because service-area pages are often created from a template with minimal unique content per page. Three pages that all say "We offer CCTV installation in [suburb], call us today" compete against each other and dilute ranking signals rather than compounding them.',
        ],
        steps: [
          'In Screaming Frog, use the Duplicates tab to find pages with identical or near-identical content.',
          'For genuinely thin or duplicate pages, choose one of: expand the page with unique local content (preferred), consolidate similar pages and redirect, or add noindex to low-value pages.',
          'Filter Screaming Frog for pages under 300 words. These are thin content candidates — either expand them or canonicalise to a more comprehensive page.',
          'Check for duplicate title tags and meta descriptions. These are a signal that pages are not differentiated.',
        ],
      },
      {
        heading: 'Phase 4 — Schema validation and completeness',
        body: [
          'Technical schema errors — missing required properties, incorrect @type values, schema that does not match on-page content — prevent rich results from displaying and reduce AI parsing accuracy. This phase validates every schema implementation on your site.',
        ],
        checklist: [
          'Use Google\'s Rich Results Test on your homepage, each main service page, and your contact page.',
          'Fix any "Required property missing" errors first — these prevent rich results from appearing.',
          'Fix any "Incorrect value type" warnings — these can cause incorrect data extraction by AI engines.',
          'Ensure your AggregateRating schema matches the actual on-page review content.',
          'Verify that FAQPage schema matches the exact question and answer text visible on the page.',
          'Test LocalBusiness schema: the address in schema must exactly match your GBP address.',
        ],
      },
      {
        heading: 'Phase 5 — Mobile and rendering',
        body: [
          'Most security company web traffic arrives on mobile devices. A site that looks and performs well on desktop but poorly on mobile is leaving the majority of its audience underserved and losing ranking signals on Google\'s mobile-first index.',
        ],
        steps: [
          'Use Google\'s Mobile-Friendly Test on your homepage, service pages, and contact page.',
          'Check Screaming Frog\'s JavaScript rendering mode to identify content that does not render for crawlers.',
          'Test your contact forms on mobile. Broken forms on mobile devices are a common and costly issue.',
          'Check tap target sizes: buttons and links should be at least 44×44px on mobile to avoid tap-target warnings.',
          'Review your mobile navigation: security websites often have complex desktop navigation that collapses poorly on mobile.',
        ],
      },
    ],
  },

  // ─── 6. Google Ads Campaign Architecture ─────────────────────────────────────
  {
    slug: 'google-ads-for-security-campaign-architecture',
    title: 'Google Ads for security: campaign architecture',
    diff: 'Intermediate',
    read: '15 min',
    excerpt: 'Campaign and ad-group structure, match types and landing pages built for ROAS.',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1400&q=85&fit=crop&auto=format',
    imageAlt: 'Google Ads campaign architecture dashboard for security company',
    topics: ['Google Ads', 'Campaign structure', 'Ad groups', 'Match types', 'Negative keywords', 'Landing pages', 'ROAS', 'B2B PPC'],
    intro: 'Most security companies running Google Ads are wasting 30–50% of their budget on the wrong traffic. The root cause is almost always account architecture — too few campaigns, over-reliance on broad match, and sending all traffic to the homepage. This guide shows you how to build a Google Ads account from the ground up for security industry ROAS.',
    keyTakeaways: [
      'Account structure determines performance ceiling. Poor structure cannot be overcome by clever bidding or great ad copy.',
      'Security search intent splits into four tiers — each tier needs its own campaign, match types, and landing page.',
      'Without a comprehensive negative keyword list, security accounts waste an average of 23% of budget on irrelevant queries.',
      'Dedicated service landing pages convert at 3–5× the rate of homepage traffic for security Google Ads.',
      'For accounts with fewer than 30 conversions per month, manual CPC outperforms Smart Bidding strategies.',
    ],
    sections: [
      {
        heading: 'The four intent tiers of security search',
        body: [
          'Security search queries do not all carry the same value. Structuring your campaigns around purchase intent — not just keyword themes — is the key architectural decision that separates high-ROAS accounts from budget-burning ones.',
        ],
        steps: [
          'Tier 1 — Purchase intent: "access control installation quote", "commercial CCTV installer near me", "alarm monitoring annual contract". Highest bids. Dedicated landing pages with lead-gen forms above the fold.',
          'Tier 2 — Evaluation intent: "best access control system for warehouse", "IP CCTV vs analogue comparison", "how much does alarm monitoring cost". Mid bids. Feature and benefit landing pages with social proof.',
          'Tier 3 — Problem-aware: "how to secure construction site", "remote site security options", "security audit for commercial property". Lower bids. Content landing pages. Email capture for nurture sequence.',
          'Tier 4 — Branded and competitor: "[Your Brand] reviews", "[Competitor] alternative", "[Competitor] pricing". Match selectively. Lead with your strongest differentiator.',
        ],
        tip: 'Start with Tier 1 only. Many security companies dilute budget across all tiers before they have enough conversion data to optimise. Build Tier 1, hit 30+ conversions per month, then layer Tier 2.',
      },
      {
        heading: 'Campaign and ad group structure',
        body: [
          'The correct unit of organisation is: one campaign per service area or geographic market, with 3–5 tightly-themed ad groups per campaign. Each ad group should contain 10–20 closely related keywords with the same intent and applicable to the same landing page.',
        ],
        checklist: [
          'Create one Search campaign per major service: Commercial CCTV, Access Control, Monitored Alarms, Intercom Systems.',
          'Within each campaign, create ad groups by intent and audience: Large Business, Small Business, Residential (if applicable).',
          'Keep ad groups tightly themed — if you need more than one landing page to serve an ad group, split it.',
          'Create one Remarketing campaign targeting website visitors who did not convert, with a separate message addressing common objections.',
          'Create one Branded campaign targeting searches for your company name. Bid defensively to prevent competitors from claiming your branded traffic.',
        ],
      },
      {
        heading: 'Keyword match types and negative lists',
        body: [
          'Broad match keywords in security Google Ads campaigns routinely attract job seekers, cybersecurity queries, and social services searches. The default Google recommendation to "start with broad match and let the algorithm learn" is expensive advice for security companies. Start with phrase and exact match, then cautiously expand.',
        ],
        steps: [
          'Build your initial keyword list with phrase match for your core service terms: "CCTV installation", "access control system", "alarm monitoring".',
          'Add exact match for your highest-value commercial terms: [commercial CCTV installer sydney], [access control quote].',
          'Build your negative keyword list before launching. Mandatory exclusions: all employment terms (jobs, careers, salary, recruitment), education terms (course, training, certificate, degree), IT/cyber terms if you are physical security only (firewall, antivirus, penetration testing).',
          'Add negatives at campaign and ad group level. Job-seeker negatives at campaign level; service-specific exclusions at ad group level.',
          'Review your Search Terms report weekly for the first 60 days. Add every irrelevant term that appears as a negative immediately.',
        ],
        tip: 'The best negative keyword list is built from your actual search terms data, not from a generic template. Run your campaigns for 2 weeks before mining for negatives — you will find terms you could never have predicted.',
      },
      {
        heading: 'Landing page requirements for security PPC',
        body: [
          'The single most impactful change most security companies can make to their Google Ads ROAS is stopping the practice of sending all traffic to the homepage. The homepage is designed for multiple audiences with multiple goals. A PPC landing page has one job: convert a buyer who has already demonstrated purchase intent.',
        ],
        checklist: [
          'Build a dedicated landing page for each major ad group theme. The page headline must match the ad headline exactly — this is "message match".',
          'Place your primary CTA (phone number + form) above the fold. Do not make buyers scroll to contact you.',
          'Include 3–5 trust signals: industry certifications (AS2201, ISO), client logos, review count and average rating, years in operation.',
          'Remove navigation. Landing pages should have one exit: converting. Navigation gives buyers an escape route.',
          'Add a phone number that is trackable via call tracking (CallRail, WhatConverts). Many security buyers call rather than fill forms.',
          'Test two landing page variants simultaneously. Even a 10% improvement in conversion rate doubles the effective value of every click.',
        ],
      },
      {
        heading: 'Bid strategy and budget allocation',
        body: [
          'Smart bidding (Target ROAS, Target CPA) requires a minimum of 30–50 conversions per month to function correctly. Below this volume, the algorithm has insufficient data and produces erratic results. Build conversion volume first.',
        ],
        steps: [
          'Launch with Manual CPC or Maximise Clicks with a CPC cap. This gives you control while conversion data accumulates.',
          'Set CPC caps at roughly 20–25% of your target cost per lead. If your target CPL is $60, cap CPCs at $12–15 initially.',
          'Allocate 70% of budget to Tier 1 campaigns, 20% to remarketing, 10% to Tier 2 or branded.',
          'Once you reach 30+ conversions per month in a campaign, test Maximise Conversions for 4 weeks. Compare CPL and conversion quality.',
          'Add bid modifiers: +30–50% for business hours (Mon–Fri 8am–6pm), -30% for midnight–6am, +15% for your primary service areas.',
        ],
      },
    ],
  },

  // ─── 7. Link Building ────────────────────────────────────────────────────────
  {
    slug: 'earning-links-from-security-publications',
    title: 'Earning links from security publications',
    diff: 'Intermediate',
    read: '13 min',
    excerpt: 'Outreach, digital PR and resource link strategies that compound domain authority.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=85&fit=crop&auto=format',
    imageAlt: 'Security industry publication outreach and link building strategy',
    topics: ['Link building', 'Digital PR', 'Security publications', 'Domain authority', 'Outreach', 'Resource links', 'Backlinks'],
    intro: 'Backlinks remain a major Google ranking signal in 2026. For security companies, earning links from relevant security and business publications is both more achievable and more valuable than generic link-building tactics. A single editorial link from a major security trade publication can move rankings more than 50 directory listings. This guide shows you how to earn them.',
    keyTakeaways: [
      'Topically relevant links from security publications carry far more weight than generic directory links.',
      'Original research and data are the most reliable link magnets — security industry statistics are routinely cited by publications.',
      'Expert commentary (responding to journalist queries) earns high-authority links with relatively little effort.',
      'Guest posting on security trade publications builds links, brand awareness, and author authority simultaneously.',
      'A focused link-building programme targeting 8–12 quality links per quarter outperforms chasing volume.',
    ],
    sections: [
      {
        heading: 'Why links still matter in the AI era',
        body: [
          'Some marketers have questioned whether link building matters when AI answer engines do not use PageRank. The answer: links remain a primary signal for traditional Google rankings, and traditional rankings still determine which pages are eligible to be cited in Google AI Overviews. The investment compounds: a link from Security Systems News today improves your rankings for the next several years.',
          'Beyond rankings, links from reputable security publications build the entity authority that AI engines use directly. A brand mentioned in IFSEC International, Benchmark, and Security Systems News is perceived as more authoritative and credible than a brand only visible on its own website.',
        ],
      },
      {
        heading: 'The security publication landscape',
        body: [
          'The security industry has a well-developed trade press, both in Australia and internationally. These publications actively seek expert content, industry data, and commentary from credible security companies. The barrier is quality and relevance, not access.',
        ],
        steps: [
          'Build your target publication list. Australian: Security Electronics & Networks (SEN), Security Insider, ASIAL news. International: IFSEC International, Security Systems News, Security Dealer & Integrator, Benchmark Magazine, Security Management.',
          'Identify which publications accept guest articles, which publish contributed research, and which use expert sources for feature stories.',
          'Follow the editors and journalists of your target publications on LinkedIn. Understand what topics they cover and what questions they ask.',
        ],
        tip: 'Many security trade publications accept "sponsored content" or "contributed articles" that look identical to editorial content. These are paid placements, not earned links, and carry less SEO value. Focus on earning editorial links, not paying for placement.',
      },
      {
        heading: 'Strategy 1 — Original research and data',
        body: [
          'Publications that will not publish a product announcement will happily publish data that informs their readers. Original research is the highest-value link-building asset available to security companies because it generates links passively as people cite your data over months and years.',
          'You already have data that the security industry would find valuable: job volumes by suburb or sector, average installation costs, technology adoption rates among your customer base, or crime incident patterns in the areas you service.',
        ],
        checklist: [
          'Identify 2–3 data points you can extract from your own operations: number of jobs by region, average job size, most common security vulnerabilities found in audits.',
          'Survey your customer base on industry questions: "What triggered you to upgrade your security system?" or "What is your biggest security concern in 2026?"',
          'Package the data as a short, visually clear report (a PDF and a landing page with the key findings).',
          'Pitch it to 5–8 security trade publications as exclusive data. Offer the editor first rights to publish the findings.',
          'After publication, send a follow-up to 20–30 security blogs and newsletters noting the published research.',
        ],
      },
      {
        heading: 'Strategy 2 — Expert commentary and HARO',
        body: [
          'Journalists writing about physical security, workplace safety, and property protection regularly need expert quotes from credible practitioners. Services like Help a Reporter Out (HARO), Connectively, and SourceBottle connect journalists with expert sources. A quote in a national publication earns a high-authority link with minimal effort beyond a 200-word expert response.',
        ],
        steps: [
          'Create accounts on HARO (helpareporter.com), Connectively, and SourceBottle. Set keyword alerts for: security, alarm, CCTV, access control, surveillance, physical security.',
          'Respond to relevant queries within 2–4 hours. Journalists work to deadlines and early, useful responses get used.',
          'Keep responses concise (150–250 words), lead with a direct answer to the question, and include your name, title, company, and website.',
          'Follow up with journalists who use your quotes. Building relationships with 5–10 regular journalists is more valuable than one-off contributions.',
        ],
      },
      {
        heading: 'Strategy 3 — Guest articles on trade publications',
        body: [
          'A guest article in IFSEC International or Security Systems News earns a do-follow link from a domain with significant authority, reaches thousands of security industry professionals, and builds your personal and company brand as a credible voice.',
          'The key to getting guest articles accepted: pitch educational, data-informed content that serves the publication\'s readers, not content that promotes your services.',
        ],
        steps: [
          'Read 10–15 recent articles from your target publication to understand tone, format, and topic preferences.',
          'Pitch a specific idea (not a general offer to write) via email to the editor. Include a headline, 3-sentence summary, and why their readers would value this particular topic now.',
          'Write the article as if you are the editor — objective, educational, not promotional. You can include a brief bio with a website link; that is the only self-promotion.',
          'After the article is published, share it widely on LinkedIn and link to it from your own website\'s about or press page.',
        ],
        tip: 'Your first pitch to a new publication will probably be declined or ignored. Follow up once after 10 days, then pitch a different topic. Persistence and quality eventually succeed.',
      },
    ],
  },

  // ─── 8. Measuring AI Citation Rate ──────────────────────────────────────────
  {
    slug: 'measuring-ai-citation-rate-and-share-of-voice',
    title: 'Measuring AI citation rate and share of voice',
    diff: 'Advanced',
    read: '17 min',
    excerpt: 'Track how often each engine names your brand and benchmark against competitors.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85&fit=crop&auto=format',
    imageAlt: 'AI visibility measurement dashboard tracking citation rates across platforms',
    topics: ['AI citation tracking', 'Share of voice', 'Perplexity analytics', 'ChatGPT monitoring', 'Brand measurement', 'AI visibility KPIs', 'Competitive benchmarking'],
    intro: 'AI search has created a new category of brand measurement: citation rate. Unlike traditional SEO where ranking position is objectively measurable, AI citation requires a structured testing methodology. This guide builds your complete AI citation measurement system — from prompt design to competitive benchmarking to monthly reporting.',
    keyTakeaways: [
      'AI citation rate is the percentage of standardised test prompts in which your brand is named or referenced.',
      'A controlled prompt library of 25–30 prompts, run consistently each month, is the only reliable way to track progress.',
      'ChatGPT, Perplexity, and Google AI Overviews each have different citation patterns. Benchmark each separately.',
      'Share of AI voice (your citation rate ÷ the sum of citation rates for all competitors tested) is more meaningful than absolute citation rate.',
      'Citation sentiment — whether AI responses frame your brand positively, neutrally, or negatively — matters as much as citation frequency.',
    ],
    sections: [
      {
        heading: 'Why AI citation requires its own measurement framework',
        body: [
          'Traditional SEO measurement relies on objective data: ranking positions from a rank tracker, traffic from Google Search Console, conversions from Google Analytics. These tools do not measure AI citation. There is no Google Search Console for ChatGPT. AI citation tracking requires you to simulate the behaviour of your target buyers: asking AI engines the questions your prospects ask, recording the answers, and analysing whether and how your brand appears.',
          'This manual methodology has limitations — you cannot track every possible prompt, and AI responses vary between sessions. But a consistent, structured prompt library, run at regular intervals, gives you directionally reliable trend data and clear before/after measurement for optimisation work.',
        ],
      },
      {
        heading: 'Step 1 — Build your prompt library',
        body: [
          'Your prompt library should simulate the range of questions your target buyers actually ask AI engines. Research has shown security buyers use AI for three distinct query types: discovery queries (finding vendors), evaluation queries (comparing options), and validation queries (confirming a shortlist choice).',
        ],
        steps: [
          'Discovery prompts (8–10): "What are the best commercial CCTV companies in Australia?", "Which security companies specialise in healthcare facility security?", "Recommend a security integrator for a 20-site retail chain."',
          'Evaluation prompts (8–10): "Compare [Your Brand] and [Competitor] for large commercial projects", "What are the strengths and weaknesses of [Your Brand]?", "Is [Your Brand] a reliable security company?"',
          'Category-expertise prompts (8–10): "Who are the leading experts in IP CCTV integration in Australia?", "Which security companies are known for AS2201-compliant alarm systems?", "What security companies do property developers typically use?"',
          'Standardise prompt phrasing. Run the exact same prompts each month — variation in prompt wording makes month-on-month comparison unreliable.',
        ],
        tip: 'Include 2–3 prompts that explicitly name your competitors but not your brand. These reveal whether AI engines proactively introduce your brand when discussing your competitive space.',
      },
      {
        heading: 'Step 2 — Execute monthly citation tests',
        body: [
          'Run your full prompt library on the first Monday of every month. Use fresh browser sessions for each engine (no browsing history, no logged-in accounts that might personalise results). Record every response verbatim or screenshot it for audit purposes.',
        ],
        checklist: [
          'Open ChatGPT (GPT-4) in an incognito browser window. Run all 25–30 prompts and record responses.',
          'Open Perplexity.ai in an incognito window. Run the same prompts and record responses.',
          'Open Google with AI Overviews enabled. Run the same prompts in Google Search and record any AI Overview responses.',
          'For each response, record: whether your brand was named (yes/no), how early in the response it appeared (position), and the sentiment of the surrounding language (positive / neutral / negative).',
          'Calculate your citation rate per engine: (number of prompts where you were cited ÷ total prompts) × 100.',
        ],
      },
      {
        heading: 'Step 3 — Competitive benchmarking',
        body: [
          'Absolute citation rate tells you how often you are mentioned. Share of AI voice tells you how you are performing relative to competitors. Track 2–3 main competitors using the same prompt library. This contextualises your data: a citation rate of 40% is excellent if competitors average 15%, but concerning if they average 65%.',
        ],
        steps: [
          'Choose 2–3 competitors whose target audience overlaps significantly with yours.',
          'Run your full prompt library with each competitor\'s brand name substituted in where appropriate.',
          'Calculate Share of AI Voice: your citation count ÷ (your count + all competitor counts) × 100.',
          'Track Share of Voice monthly alongside absolute citation rate. The goal is to grow both.',
          'When a competitor\'s citation rate increases sharply, audit their recent content and entity changes. They have done something worth learning from.',
        ],
      },
      {
        heading: 'Step 4 — Diagnose what is driving (or blocking) citations',
        body: [
          'Raw citation numbers tell you whether your visibility is improving, but not why. Diagnosing the drivers requires correlating your citation data with your content and entity changes.',
        ],
        checklist: [
          'When citation rate increases: identify what changed in the 60 days prior — new content published, schema added, entity sources updated, links earned. That is your positive signal to double down on.',
          'When citation rate decreases: check whether a competitor has published significant new content, earned major links, or updated their entity data. Check whether your own schema is still valid.',
          'Analyse which prompt categories perform best. If you appear often in discovery queries but rarely in evaluation queries, your brand description and reputation content needs work.',
          'Review citation sentiment quarterly. If AI engines introduce your brand but describe it neutrally or vaguely, your authority content is lacking. If sentiment is negative, investigate the source.',
          'Cross-reference citation rate improvement with lead quality. Higher citation rate should correlate with better-informed, higher-intent inbound enquiries.',
        ],
      },
      {
        heading: 'Building your monthly AI visibility report',
        body: [
          'Monthly reporting makes the data actionable. The right audience for your AI visibility report depends on your company size: for owner-operated businesses, it is your own growth dashboard. For agencies or larger marketing teams, it is a client-facing or board-level report.',
        ],
        steps: [
          'Build a one-page monthly dashboard with: citation rate per engine (current month vs prior month), Share of AI Voice trend, top cited pages, and sentiment distribution.',
          'Add a "What changed this month" annotation — content published, schema updated, links earned. This builds an institutional memory of what works.',
          'Set quarterly targets: typically 15–25 percentage point improvement in citation rate over a 6-month programme.',
          'Share the dashboard with your marketing team or agency as part of a monthly review. AI visibility optimisation requires ongoing content and technical iteration, and accountability drives consistency.',
        ],
      },
    ],
  },

]

export function getStaticGuide(slug: string): StaticGuide | undefined {
  return staticGuides.find((g) => g.slug === slug)
}

export { staticGuides }
