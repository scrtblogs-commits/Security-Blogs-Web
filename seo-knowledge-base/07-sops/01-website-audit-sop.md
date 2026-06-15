# SOP-01: Website SEO Audit

**Organisation:** SecurityBlogs Australia
**Department:** SEO / Digital Marketing
**Version:** 1.0
**Last Reviewed:** June 2026
**Owner:** SEO Lead

---

## Purpose

To establish a repeatable, comprehensive process for auditing the SecurityBlogs Australia website and client websites for technical SEO issues, on-page deficiencies, and performance problems that may be limiting organic search visibility and rankings.

---

## Scope

This SOP applies to:
- The SecurityBlogs Australia website (securityblogs.com.au)
- Client websites managed under the SecurityBlogs digital marketing agency arm
- Any new website onboarding requiring a baseline SEO health assessment

This SOP covers technical SEO, on-page SEO, and performance — it does not cover off-page SEO or content strategy (see SOP-07 and SOP-04 respectively).

---

## Tools Required

| Tool | Purpose | Access Level |
|---|---|---|
| Screaming Frog SEO Spider (licensed) | Full site crawl | Desktop — SEO team |
| Google Search Console | Indexation, coverage, Core Web Vitals | Property owner access |
| Google PageSpeed Insights | Page speed and CWV per URL | Free / public |
| GTmetrix (Pro) | Waterfall analysis, speed testing | Agency account |
| Ahrefs Site Audit | Supplementary crawl, backlink data | Agency account |
| Google Rich Results Test | Structured data validation | Free / public |
| Redirect Checker (httpstatus.io) | Redirect chain analysis | Free / public |
| Screaming Frog Log File Analyser | Log file review (quarterly) | Desktop — SEO team |
| Google Analytics 4 | Traffic and behavioural data | Property access |
| W3C Markup Validator | HTML validation | Free / public |

---

## Step-by-Step Process

### Phase 1: Pre-Crawl Setup

1. **Create an audit project folder** using the naming convention: `YYYY-MM_ClientName_SEO-Audit`. Store in the shared drive under `/Audits/`.

2. **Download or export the current XML sitemap** from the target domain (e.g., `https://domain.com.au/sitemap.xml`). Save locally.

3. **Open Screaming Frog SEO Spider.** Go to **Configuration > Spider** and confirm the following settings:
   - Check HTML, JavaScript, CSS, Images, and PDFs
   - Enable "Follow internal nofollow links" — ON
   - Enable "Crawl outside of start folder" — OFF (unless subdomain audit required)
   - Set "Max Threads" appropriate to site size (start at 5 for shared hosting)

4. **Configure custom extraction** in Screaming Frog if required:
   - Extract schema markup (JSON-LD)
   - Extract Open Graph tags
   - Custom: any CMS-specific meta fields

5. **Upload the sitemap to Screaming Frog** via **Mode > List Mode** if you want to audit sitemap URLs only. For a full crawl, use Spider mode.

6. **Set user agent** to Googlebot (Configuration > User-Agent) to simulate how Google crawls.

7. **Enter the target URL** and click **Start**. Allow the crawl to complete fully before exporting data.

---

### Phase 2: Crawl Data Analysis

8. **Export all crawl data** to CSV. Go to **Reports > Crawl Overview** first for a summary.

9. **Check Response Codes tab:**
   - Filter for `4xx` errors — log all broken URLs, note referring pages
   - Filter for `5xx` errors — flag for developer
   - Filter for `3xx` redirects — identify redirect chains (3+ hops)
   - Note any pages returning 200 status that should be 404 (soft 404s)

10. **Check Page Titles tab:**
    - Filter: Missing titles (critical fix)
    - Filter: Duplicate titles (consolidation required)
    - Filter: Titles over 60 characters (risk of truncation)
    - Filter: Titles under 20 characters (thin/weak)
    - Filter: Same as H1 (not necessarily an error but note for review)

11. **Check Meta Description tab:**
    - Filter: Missing meta descriptions
    - Filter: Duplicate meta descriptions
    - Filter: Over 155 characters
    - Filter: Under 50 characters

12. **Check H1 tab:**
    - Filter: Missing H1
    - Filter: Multiple H1 tags on a single page
    - Filter: H1 over 70 characters
    - Cross-reference H1 vs page title for alignment

13. **Check H2–H6 tabs** for structural issues and keyword usage patterns.

14. **Check Canonicals tab:**
    - Pages with no canonical tag
    - Pages with a canonical pointing to a different URL (intentional vs error)
    - Canonical chains (canonical → page that also has a different canonical)
    - Non-indexable pages with self-referencing canonicals

15. **Check Images tab:**
    - Filter: Missing alt text
    - Filter: Alt text over 100 characters
    - Filter: Large images (over 100KB) — flag for compression
    - Filter: Broken images (4xx)

16. **Check Directives tab:**
    - Pages marked `noindex` — confirm intentional
    - Pages marked `nofollow` — confirm intentional
    - Orphan pages (not linked internally)

17. **Check Links tab:**
    - Internal links to broken pages
    - Pages with no internal inlinks (orphan pages)
    - Pages with excessive outbound links

18. **Check Hreflang tab** (if site targets AU/US/UK):
    - Missing hreflang annotations
    - Incorrect country/language codes
    - Non-reciprocal hreflang relationships

19. **Run Duplicate Content check:**
    - In Screaming Frog: **Reports > Duplicate Content**
    - Export near-duplicate and exact duplicate URLs
    - Note URL pairs and which to canonicalise or consolidate

---

### Phase 3: Indexation Check

20. **Log in to Google Search Console.** Navigate to **Coverage (Index) report.**

21. **Review each status tab:**
    - **Error:** Pages Google tried to index but could not — document each error type
    - **Valid with Warning:** Submitted URLs with issues (e.g., submitted and noindexed)
    - **Excluded:** Review "Crawled but not indexed", "Discovered but not indexed", "Duplicate" clusters
    - **Valid:** Confirm total indexed pages aligns with expected site size

22. **Cross-reference indexed page count** with Screaming Frog crawl total. A significant gap indicates either blocked pages or indexing issues.

23. **Run a site: operator search** in Google (`site:domain.com.au`) to get a rough indexed page count and check for unexpected pages appearing in the index.

24. **Review robots.txt** at `domain.com.au/robots.txt`:
    - Check for accidental disallow rules blocking important URLs
    - Check sitemap declaration is present and correct
    - Validate using **Google Search Console > robots.txt Tester** (if available) or robotstxt.org

25. **Audit XML sitemap:**
    - All URLs in sitemap return 200 status
    - No noindex pages included in sitemap
    - No redirect URLs in sitemap
    - Sitemap last modified date is current
    - Image sitemap present (if applicable)

---

### Phase 4: Core Web Vitals and Performance

26. **Export Core Web Vitals data from Google Search Console** (Experience > Core Web Vitals). Note which URLs are in "Poor", "Needs Improvement", or "Good" status for both mobile and desktop.

27. **Run PageSpeed Insights** on the top 10 most important pages (homepage, key pillar pages, highest traffic pages per GA4):
    - Record LCP (target: under 2.5s)
    - Record FID/INP (target: FID under 100ms, INP under 200ms)
    - Record CLS (target: under 0.1)
    - Record Performance Score (target: 75+)

28. **Run GTmetrix** on the same top 10 pages:
    - Review Waterfall chart for render-blocking resources
    - Note largest resources (images, scripts, fonts)
    - Check time-to-first-byte (TTFB) — target under 600ms
    - Note any third-party scripts significantly impacting load time

29. **Document performance findings** by URL in the audit spreadsheet.

---

### Phase 5: Mobile Usability

30. **In Google Search Console**, go to **Experience > Mobile Usability.** Note any pages with mobile usability errors (clickable elements too close, content wider than screen, text too small).

31. **Manually test key pages** using Google's Mobile-Friendly Test (search.google.com/test/mobile-friendly) and Chrome DevTools (toggle device toolbar — test at 375px width for iPhone SE and 390px for iPhone 14).

32. **Check touch target sizes** — minimum 48x48px recommended.

33. **Confirm viewport meta tag** is present on all pages: `<meta name="viewport" content="width=device-width, initial-scale=1">`.

---

### Phase 6: Security and HTTPS

34. **Confirm HTTPS is enforced** across the entire site:
    - HTTP URLs redirect to HTTPS (301, not 302)
    - No mixed content warnings (use Chrome DevTools Console or whynopadlock.com)
    - SSL certificate is valid, not expiring within 30 days
    - HSTS header is present (check via securityheaders.com)

35. **Check for www/non-www redirect:** One version should 301 to the other consistently.

36. **Run SSL Labs test** (ssllabs.com/ssltest/) — target grade A or A+.

---

### Phase 7: Structured Data

37. **In Screaming Frog,** go to **Structured Data tab** to see pages with schema markup present.

38. **Validate structured data** on key page types using **Google Rich Results Test:**
    - Homepage (Organisation schema)
    - Blog posts (Article schema)
    - Author pages (Person schema)
    - FAQ pages (FAQPage schema)
    - Product/service pages (Service schema)

39. **Check Google Search Console > Enhancements** for any structured data errors or warnings flagged by Google.

40. **Note any missed opportunities** for structured data (e.g., breadcrumbs, HowTo, LocalBusiness for AU-based clients).

---

### Phase 8: Thin Content Review

41. **In Screaming Frog,** filter **Word Count column** (requires JavaScript rendering or custom extraction). Flag pages under 300 words that are not intentional thin pages (e.g., contact, thank you pages).

42. **Export page list with word count** and cross-reference with GA4 traffic data. Thin pages with no traffic and no inbound links are candidates for consolidation or removal.

43. **Identify doorway pages, near-duplicate content**, and pages that may be cannibalising each other's rankings via keyword similarity.

---

### Phase 9: Redirect Audit

44. **Export all 3xx redirect URLs** from Screaming Frog.

45. **Paste into httpstatus.io** or use Screaming Frog's Redirect Chains report to identify:
    - Redirect chains (A → B → C — should be A → C)
    - Redirect loops
    - 302 redirects that should be 301s (temporary vs permanent)

46. **Document each redirect chain** and provide a fix recommendation (update the redirect to go directly to the final destination).

---

## Quality Checklist

- [ ] Screaming Frog crawl completed with 0 errors/interruptions
- [ ] All crawl data exported to CSV and saved in project folder
- [ ] Response codes reviewed (4xx, 5xx, 3xx)
- [ ] Title tags reviewed (missing, duplicate, length)
- [ ] Meta descriptions reviewed (missing, duplicate, length)
- [ ] H1 tags reviewed (missing, multiple)
- [ ] Canonical tags reviewed
- [ ] Images reviewed (alt text, file size, broken)
- [ ] Indexation confirmed via GSC Coverage report
- [ ] robots.txt reviewed and validated
- [ ] XML sitemap audited
- [ ] Core Web Vitals pulled from GSC and PageSpeed Insights
- [ ] GTmetrix run on top 10 pages
- [ ] Mobile usability check completed
- [ ] HTTPS/SSL confirmed valid
- [ ] Mixed content issues checked
- [ ] Structured data validated on key page types
- [ ] Thin content pages identified
- [ ] Redirect chains documented
- [ ] Duplicate content report exported
- [ ] All findings entered into the audit report template
- [ ] Prioritised recommendations list created (P1/P2/P3)

---

## Audit Report Template Structure

```
# SEO Audit Report — [Domain] — [Month Year]

## Executive Summary
- Overall health score (Red / Amber / Green)
- Top 3 critical issues
- Estimated impact of fixes

## 1. Crawl Overview
- Total URLs crawled
- Total indexed URLs
- Gap analysis

## 2. Critical Issues (P1 — Fix Immediately)
| Issue | Affected URLs | Recommendation | Effort |
|---|---|---|---|

## 3. High Priority Issues (P2 — Fix Within 30 Days)
| Issue | Affected URLs | Recommendation | Effort |
|---|---|---|---|

## 4. Improvements (P3 — Fix Within 90 Days)
| Issue | Affected URLs | Recommendation | Effort |
|---|---|---|---|

## 5. Response Codes Summary
## 6. On-Page SEO Summary
## 7. Technical SEO Summary
## 8. Performance Summary
## 9. Structured Data Summary
## 10. Appendix — Full Data Exports
```

---

## Common Mistakes to Avoid

- **Starting the crawl without configuring Screaming Frog correctly** — incorrect settings lead to incomplete or misleading data.
- **Ignoring JavaScript-rendered content** — if the site uses React/Vue/Angular, enable JS rendering in Screaming Frog or use a rendered crawl tool.
- **Reporting all issues equally** — always prioritise by impact. A missing meta description on a low-traffic page is not P1.
- **Confusing 302 redirects with 301s** — always confirm which type is being used before documenting.
- **Not cross-referencing crawl data with GSC** — crawl data alone can miss indexation-specific issues that only GSC reveals.
- **Auditing without access to GA4** — traffic context is essential for prioritising which issues to fix first.
- **Not saving raw data exports** — always keep original CSV files in the project folder for future comparison.

---

## Time Estimate

| Site Size | Estimated Time |
|---|---|
| Small (under 200 pages) | 4–6 hours |
| Medium (200–1,000 pages) | 8–12 hours |
| Large (1,000–5,000 pages) | 2–3 days |
| Enterprise (5,000+ pages) | 3–5 days |

*Time includes crawl, analysis, and report writing. Does not include remediation.*

---

## Output / Deliverable

1. **SEO Audit Report** (PDF + Google Doc) — structured using the template above
2. **Audit Data Folder** (Google Drive) containing:
   - Screaming Frog crawl export (CSV)
   - Redirect chain report (CSV)
   - Duplicate content report (CSV)
   - PageSpeed Insights screenshots per tested URL
   - GSC Coverage export
3. **Prioritised Fix Tracker** (Google Sheet) — columns: Issue, Priority, URL, Recommendation, Owner, Status, Due Date
4. **Executive Summary Slide** (1–2 slides for client presentations)
