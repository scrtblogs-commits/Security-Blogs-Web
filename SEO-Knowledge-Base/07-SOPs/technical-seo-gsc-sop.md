# SOP: Technical SEO Audit & Google Search Console Analysis — SecurityBlogs

**Version:** 1.0  
**Applies to:** SecurityBlogs website and all active security client campaigns  
**Frequency:** Technical audit — quarterly. GSC analysis — monthly.

---

# PART A: TECHNICAL SEO AUDIT SOP

## PURPOSE

A technical SEO audit identifies issues with the website's infrastructure, code, and crawlability that prevent Google from efficiently discovering, indexing, and ranking the site's content.

---

## QUARTERLY TECHNICAL SEO AUDIT PROCESS

### Module 1: Crawl & Indexation

**Step 1: Full site crawl**
1. Open Screaming Frog SEO Spider
2. Enter the site URL and run a full crawl
3. Ensure "Crawl Configuration" includes JavaScript rendering (critical for Next.js sites)
4. Export: All URLs, status codes, redirect chains

**Step 2: Status code analysis**
- Filter for `4xx` errors — these are broken pages. Fix or redirect each one.
- Filter for `5xx` errors — server errors. Investigate immediately.
- Filter for `3xx` redirects — check for redirect chains (A→B→C = bad; flatten to A→C)
- Record all broken internal links in the Screaming Frog "Response Codes" report

**Step 3: Indexation check in Google Search Console**
- Open GSC → Index → Pages
- Review the "Why pages aren't indexed" section:
  - **Crawled - currently not indexed**: Google crawled but chose not to index — usually thin content or cannibalisation
  - **Discovered - currently not indexed**: In the queue but not yet crawled — usually a crawl budget issue
  - **Excluded by noindex tag**: Intentional — verify these are all pages that SHOULD be excluded
  - **Duplicate without canonical**: Cannibalisation issue — fix canonical tags
  - **404 Not Found**: Broken pages — fix or redirect

**Step 4: robots.txt check**
- Access: `https://[domain]/robots.txt`
- Confirm: No important content directories are blocked
- Confirm for SecurityBlogs: AI crawlers are explicitly allowed
  ```
  User-agent: GPTBot
  Allow: /
  User-agent: ClaudeBot
  Allow: /
  User-agent: PerplexityBot
  Allow: /
  User-agent: Google-Extended
  Allow: /
  ```
- Flag: Any disallow rules that might block service pages, blog posts, or category pages

**Step 5: sitemap.xml check**
- Access: `https://[domain]/sitemap.xml`
- Confirm: Sitemap is valid XML
- Confirm: All key pages are included (service pages, blog posts, case studies, location pages)
- Check: No 404 or redirected URLs in the sitemap
- Check: Submitted to Google via GSC (Settings → Sitemaps)

---

### Module 2: Core Web Vitals

**Step 6: Core Web Vitals assessment**
Run Google PageSpeed Insights on:
- Homepage
- Primary service page (e.g., /services/security-seo)
- A sample blog post
- A category/hub page

Record for each:

| Metric | What It Measures | Target Score |
|---|---|---|
| LCP (Largest Contentful Paint) | Loading speed — time until largest visible element loads | < 2.5 seconds |
| INP (Interaction to Next Paint) | Responsiveness — time until page responds to interaction | < 200ms |
| CLS (Cumulative Layout Shift) | Visual stability — how much layout shifts during load | < 0.1 |
| FCP (First Contentful Paint) | Time until first content appears | < 1.8 seconds |
| TTFB (Time to First Byte) | Server response time | < 600ms |

**Step 7: Image optimisation check**
- Screaming Frog → Images tab → Export all images
- Flag: Any images not served in WebP or AVIF format
- Flag: Images over 200KB (should be compressed)
- Flag: Images without explicit width and height attributes (causes CLS)
- Flag: Images without lazy loading attribute (`loading="lazy"`) on below-fold images

**Step 8: Render-blocking resources**
In PageSpeed Insights → "Opportunities" section:
- Identify: Any render-blocking JS or CSS
- Identify: Unused JavaScript (code that loads but isn't needed on that page)
- Record: Which resources are flagged and their estimated savings

---

### Module 3: Schema & Structured Data

**Step 9: Schema coverage audit**
- Run Google Rich Results Test on: homepage, each service page, 3 sample blog posts
- Validate at Schema.org/SchemaValidator
- Check that all required schema types are present and error-free:
  - Organisation — homepage/sitewide
  - WebSite — homepage/sitewide
  - BreadcrumbList — every page except homepage
  - BlogPosting — every blog/article page
  - FAQPage — every page with a FAQ section
  - ProfessionalService — service pages

**Step 10: Schema accuracy check**
- Verify: Schema data matches the visible page content (no discrepancies)
- Verify: `dateModified` is updated whenever content is changed
- Verify: All `@id` URLs resolve correctly (no broken entity references)

---

### Module 4: Mobile & Accessibility

**Step 11: Mobile usability**
- GSC → Experience → Mobile Usability
- Fix any flagged issues: text too small, clickable elements too close, content wider than screen

**Step 12: SSL/HTTPS**
- Test: Does the domain redirect HTTP → HTTPS?
- Test: Does www redirect to non-www (or vice versa — choose one and be consistent)?
- Check: SSL certificate expiry date (alert at 30 days before expiry)

---

## QUARTERLY TECHNICAL SEO DELIVERABLE

Produce an issue register with:
- Issue description
- Affected URLs (or "sitewide")
- Severity (Critical / High / Medium / Low)
- Recommended fix
- Estimated effort (hours)
- Assigned to (team member)
- Fixed date (filled in after resolution)

---

# PART B: GOOGLE SEARCH CONSOLE MONTHLY ANALYSIS SOP

## PURPOSE

Monthly GSC analysis tracks search performance, identifies quick wins, and catches emerging issues before they compound.

---

## MONTHLY GSC ANALYSIS PROCESS (60 minutes)

### Step 1: Performance Overview (10 minutes)

1. Open GSC → Performance → Search Results
2. Set date range: Last 3 months vs. previous 3 months (for trend comparison)
3. Record:
   - Total clicks (vs. previous period)
   - Total impressions (vs. previous period)
   - Average CTR (vs. previous period)
   - Average position (vs. previous period)
4. Note: Any significant changes? Investigate any drops > 20%

---

### Step 2: Top Pages Analysis (10 minutes)

1. Click the "Pages" tab in Performance
2. Sort by: Clicks (highest first)
3. Record the top 10 pages by clicks
4. Compare vs. last month — any pages that have dropped off the top 10?
5. For each top page:
   - What is the average CTR? (Under 3% for non-branded terms is a flag — meta description may need updating)
   - What is the average position? (Position 4–10 = improve on-page; Position 1–3 = protect + optimise CTR)

---

### Step 3: Query Analysis — Quick Wins (15 minutes)

1. Click the "Queries" tab in Performance
2. Filter: Position > 10 (ranking but not page 1)
3. Filter: Impressions > 50 (enough data to act on)
4. Sort by: Impressions (highest first)
5. These are your "quick wins" — pages ranking in positions 11–30 that could reach page 1 with focused improvements
6. Record the top 10–15 quick-win keywords
7. Action: For each keyword, go to the ranking page and:
   - Add the keyword to the title tag if not present
   - Add the keyword to a H2 or H3 if not present
   - Improve the meta description CTR
   - Add more content addressing this keyword

---

### Step 4: New Keyword Discovery (10 minutes)

1. In the Queries tab, filter: Impressions > 10
2. Sort by: Impressions (highest first)
3. Look for: Queries you're not actively targeting
4. These can become new keyword targets — add to the keyword database and content calendar

---

### Step 5: Index Coverage Review (10 minutes)

1. GSC → Index → Pages
2. Check:
   - Any new 404 errors appearing? (Fix or redirect)
   - Any new "Excluded" pages that shouldn't be excluded?
   - Total indexed pages — is it growing, stable, or declining?
3. If indexed page count is declining: investigate for mass deindexation issues immediately

---

### Step 6: Core Web Vitals Status (5 minutes)

1. GSC → Experience → Core Web Vitals
2. Check: Any new URLs in "Poor" or "Needs Improvement" categories?
3. Check: Has overall score improved since last month?

---

### Step 7: Manual Actions & Security (5 minutes)

1. GSC → Security & Manual Actions → Manual Actions
2. Check: Any manual action penalties? (Should be "No issues detected")
3. GSC → Security & Manual Actions → Security Issues
4. Check: Any security issues flagged? (Hacked content, malware, phishing)

---

## MONTHLY GSC REPORT TEMPLATE

```
## GSC Monthly Report — [Month Year]

### Performance Summary
- Clicks this period: [X] (vs. [Y] last period — [+/-Z%])
- Impressions this period: [X] (vs. [Y] last period — [+/-Z%])
- Average CTR: [X%] (vs. [Y%] last period)
- Average Position: [X] (vs. [Y] last period)

### Top Pages (by clicks)
1. [URL] — [clicks] clicks, [position] avg position
2. [URL] — ...

### Quick Win Keywords (Position 11–30, >50 impressions)
1. [keyword] — [position], [impressions] impressions, [ranking URL]
   Action: [Specific on-page action]
2. ...

### New Keyword Opportunities
1. [keyword] — [impressions] impressions, no current target page
   Action: Add to content calendar

### Index Coverage
- Total indexed: [X]
- New errors: [list or "none"]
- Investigation needed: [yes/no — detail]

### Core Web Vitals
- Poor URLs: [X] (up/down from [Y])
- Actions: [list any new issues]

### Recommendations for Next Month
1. [Action item]
2. [Action item]
3. [Action item]
```
