# SOP: Website Audit — SecurityBlogs Standard

**Version:** 1.0  
**Applies to:** SecurityBlogs website audits and security client website audits  
**Frequency:** Initial audit before any engagement; quarterly for ongoing clients

---

## PURPOSE

A website audit identifies all technical, on-page, and content issues that are limiting organic search performance. This SOP ensures a consistent, thorough audit process for every security client.

---

## TOOLS REQUIRED

- Google Search Console (must have access)
- Google Analytics / GA4 (must have access)
- Screaming Frog SEO Spider (free up to 500 URLs; licence for larger sites)
- Ahrefs or SEMrush (for backlink analysis and keyword tracking)
- PageSpeed Insights / Google Lighthouse
- Google Rich Results Test
- Schema Markup Validator (schema.org/SchemaValidator)
- Chrome DevTools (for rendering, Core Web Vitals)
- WAVE or Axe (for accessibility)

---

## AUDIT SECTIONS

### SECTION 1: CRAWLABILITY & INDEXATION

**Steps:**

1. Check `robots.txt` — is the site blocking any important sections?
   - Verify: Are AI crawlers explicitly allowed? (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
   - Flag any accidental blocks on content pages, service pages, or the sitemap

2. Check `sitemap.xml` — does it exist, is it submitted to Google, and does it include all key pages?
   - Access: `https://[domain]/sitemap.xml`
   - Verify: All service pages, blog posts, case studies, and location pages are included
   - Check: No 404s or redirected URLs in the sitemap

3. Google Search Console — check Index Coverage report
   - How many pages are indexed vs. discovered?
   - What errors exist? (404s, soft 404s, redirect errors, server errors)
   - Are any important pages in "Excluded" status?

4. Crawl the site with Screaming Frog
   - Export: URL list, status codes, title tags, meta descriptions, H1s, canonical tags
   - Identify: Duplicate titles, missing titles, duplicate meta descriptions, missing H1s

**Deliverable:** Indexed pages count, crawl error list, robots.txt status, sitemap status

---

### SECTION 2: TECHNICAL SEO

**Steps:**

1. **Page Speed / Core Web Vitals**
   - Run Google PageSpeed Insights on the homepage, key service pages, and a sample blog post
   - Record: LCP, FID/INP, CLS scores for both mobile and desktop
   - Identify: Images not using next-gen formats, render-blocking resources, unused CSS/JS

2. **HTTPS / Security**
   - Verify all pages load via HTTPS (no mixed content warnings)
   - Check SSL certificate expiry date

3. **Mobile Responsiveness**
   - Test on Google's Mobile-Friendly Test
   - Check on physical mobile devices (iOS and Android)
   - Flag any tap targets that are too small, text that requires zooming, or content that overflows

4. **Canonicalization**
   - Are canonical tags present on all pages?
   - Do they point to the correct (preferred) URL?
   - Is there a www vs. non-www redirect? Is HTTP redirecting to HTTPS?

5. **Structured Data / Schema**
   - Run Google Rich Results Test on key pages
   - Validate with Schema Markup Validator
   - Check: Organisation, WebSite, BreadcrumbList, FAQPage, BlogPosting, LocalBusiness schemas as applicable
   - Flag: Missing schemas, validation errors, outdated schema

6. **URL Structure**
   - Are all URLs lowercase, hyphen-separated, and keyword-rich?
   - Are there any parameter-heavy URLs that should be canonicalised?

7. **Redirect Chains and Loops**
   - Does the site have any redirect chains (A → B → C)? Flatten to direct redirects.
   - Are there any redirect loops?

**Deliverable:** Core Web Vitals scores, technical issues list with severity ratings

---

### SECTION 3: ON-PAGE SEO

**Steps:**

1. **Title Tags** — export from Screaming Frog
   - Missing title tags
   - Duplicate title tags
   - Title tags over 60 characters
   - Title tags under 40 characters
   - Title tags not including the primary keyword

2. **Meta Descriptions**
   - Missing meta descriptions
   - Duplicate meta descriptions
   - Meta descriptions over 160 characters
   - Meta descriptions under 120 characters

3. **Heading Structure**
   - Pages with multiple H1s
   - Pages with no H1
   - H1 not containing the primary keyword
   - Heading hierarchy violations (H1 to H3 skip)

4. **Image Optimisation**
   - Images missing alt text
   - Images with generic alt text (e.g., "image-001.jpg")
   - Images not using WebP format (use next-gen format)
   - Images without width/height attributes (CLS impact)

5. **Internal Linking**
   - Identify orphan pages (pages with no internal links pointing to them)
   - Identify pages with no outbound internal links
   - Flag generic anchor text ("click here", "read more")

6. **Content Quality**
   - Pages with thin content (under 300 words)
   - Duplicate or near-duplicate content
   - Outdated content (check publication dates vs. current relevance)

**Deliverable:** On-page issues spreadsheet with URL, issue type, recommended fix, priority

---

### SECTION 4: CONTENT AUDIT

**Steps:**

1. **Inventory all content**
   - Export all URLs from Screaming Frog or sitemap
   - For each page, record: URL, title, word count, traffic (from GA), rankings (from GSC/Ahrefs), backlinks

2. **Traffic analysis**
   - Which pages are driving the most organic traffic?
   - Which pages have declined in traffic (need updating)?
   - Which pages have zero organic traffic and no clear purpose?

3. **Keyword mapping**
   - Is each page mapped to a distinct primary keyword?
   - Are there keyword cannibalisation issues (multiple pages targeting the same keyword)?

4. **Content gaps**
   - What topics relevant to the business are not covered on the site?
   - What keywords in the database have no corresponding page?

**Deliverable:** Content inventory spreadsheet, gap analysis list, cannibalisation issues

---

### SECTION 5: BACKLINK AUDIT

**Steps:**

1. Export backlink profile from Ahrefs or SEMrush
2. Check: Domain Rating (DR) / Domain Authority (DA) of referring domains
3. Identify: Toxic or spammy links (link farms, irrelevant sites, PBNs)
4. Identify: Lost backlinks (recently dropped — can they be reclaimed?)
5. Compare: Backlink profile vs. top 3 competitors in the same keyword space

**Deliverable:** Backlink profile summary, toxic link list (for disavow consideration), competitor backlink gap

---

### SECTION 6: AI VISIBILITY AUDIT

**Steps:**

1. Check `robots.txt` for AI crawler permissions:
   - Must allow: GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Amazonbot, Meta-ExternalAgent

2. Query AI assistants for the business:
   - Ask ChatGPT: "What are the best [service type] companies in [city]?" — does the business appear?
   - Ask Perplexity: "What is [business name]?" — does it return accurate information?
   - Ask Google: Does a Knowledge Panel appear for the business?

3. Check schema coverage:
   - Is Organisation schema present with sameAs links to LinkedIn, directories?
   - Is LocalBusiness schema present with complete NAP?

4. Check entity signals:
   - Is the business listed in Google Business Profile?
   - Is the business listed in ASIAL directory?
   - Does the Wikipedia/Wikidata entry exist (for larger brands)?

**Deliverable:** AI Visibility Score (from SecurityBlogs tool), AI visibility gap list, entity signal status

---

## AUDIT DELIVERABLE FORMAT

Produce a written audit report containing:

1. **Executive Summary** (1–2 pages) — Overall health assessment, top 5 priority issues, estimated impact
2. **Issue Register** (spreadsheet) — All issues categorised by type, severity (Critical/High/Medium/Low), and effort to fix
3. **Quick Wins** — 5–10 fixes that can be made immediately with high impact
4. **Strategic Recommendations** — Content gaps, keyword opportunities, AI visibility improvements
5. **Competitor Benchmarks** — How does the site compare to the top 3 competitors on key metrics?

---

## SEVERITY RATINGS

| Rating | Definition | Fix Timeline |
|---|---|---|
| **Critical** | Blocking indexation, HTTPS error, site-wide duplicate content | Fix within 48 hours |
| **High** | Missing title tags, no H1, crawl errors, robots.txt blocking | Fix within 1 week |
| **Medium** | Slow page speed, missing meta descriptions, thin content | Fix within 2–4 weeks |
| **Low** | Minor image optimisation, anchor text improvements, minor schema gaps | Fix within 1–3 months |
