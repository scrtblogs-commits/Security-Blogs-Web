# SOP 01 — Website SEO Audit

**Organisation:** SecurityBlogs Australia
**Department:** SEO / Digital Marketing
**Document Version:** 1.0
**Last Reviewed:** June 2026
**Review Frequency:** Quarterly

---

## Purpose

To provide a repeatable, comprehensive process for auditing the SecurityBlogs Australia website for SEO health, technical issues, and content quality. The audit identifies problems that may suppress organic rankings, impair crawlability, or degrade user experience, and produces a prioritised action plan to resolve them.

---

## Scope

Applies to all pages within the SecurityBlogs Australia domain (and any subdomain properties). Conducted quarterly as a full audit and monthly as a lighter monitoring sweep. Applicable to the SEO team lead, content strategist, and technical SEO consultant.

---

## Tools Required

| Tool | Purpose | Licence |
|---|---|---|
| Screaming Frog SEO Spider (v21+) | Full site crawl | Paid |
| Google Search Console | Indexation, coverage, CWV | Free |
| Google PageSpeed Insights | Page speed, CWV per URL | Free |
| GTmetrix | Waterfall analysis, speed | Free/Paid |
| Ahrefs | Backlinks, organic traffic, broken links | Paid |
| Google Rich Results Test | Structured data validation | Free |
| Semrush Site Audit | Supplementary crawl checks | Paid |
| Mobile-Friendly Test (Google) | Mobile usability | Free |
| Copyscape / Siteliner | Duplicate content | Paid/Free |
| SSL Labs (ssllabs.com) | HTTPS/SSL certificate check | Free |
| Screaming Frog Log Analyser | Log file analysis (quarterly) | Paid |

---

## Step-by-Step Process

### Phase 1 — Crawl Setup (Screaming Frog)

1. Open Screaming Frog SEO Spider. Navigate to **Configuration > Spider** and confirm the following settings:
   - Crawl JavaScript: enabled (if site uses JS rendering)
   - Maximum URL depth: unlimited
   - Respect robots.txt: **disabled** (to surface blocked URLs)
   - Crawl delay: 0.5–1 second (to avoid server load)
2. Navigate to **Configuration > Custom > Search** and add regex patterns to flag thin content (e.g., word count fewer than 300).
3. Under **Configuration > API Access**, connect Google Search Console and Google Analytics integrations.
4. Enter the root domain (e.g., `https://securityblogs.com.au`) and click **Start**.
5. Allow the crawl to complete fully. Export the raw crawl data in CSV format to the audit working folder.
6. Save the Screaming Frog project file (.seospider) with the date stamp (e.g., `audit-2026-06-15.seospider`).

### Phase 2 — Indexation Check

7. In Google Search Console, navigate to **Index > Pages** (Coverage report).
8. Document the count of:
   - Valid pages indexed
   - Valid pages with warnings
   - Excluded pages (reason-by-reason breakdown)
   - Error pages (404, server errors, redirect errors)
9. Cross-reference excluded pages against the site crawl to determine whether exclusions are intentional (e.g., noindex tags) or problematic.
10. Run a `site:securityblogs.com.au` search in Google and note the approximate index count. Compare to actual page count from the crawl.
11. Identify any important pages (service pages, pillar posts, category pages) that are not indexed. Record in the audit log.

### Phase 3 — Core Web Vitals (CWV)

12. In Google Search Console, navigate to **Experience > Core Web Vitals** and download both Mobile and Desktop reports.
13. Identify URLs marked as **Poor** (LCP > 4s, FID > 300ms, CLS > 0.25) and **Needs Improvement**.
14. For each Poor or Needs Improvement URL, run through **Google PageSpeed Insights** to get per-page diagnostics.
15. Record CWV issues in the audit log with their category (LCP, FID/INP, CLS) and recommended fix.
16. Priority: fix all Poor URLs first, then Needs Improvement.

### Phase 4 — Mobile Usability

17. In Google Search Console, navigate to **Experience > Mobile Usability**.
18. Document any mobile usability errors (e.g., clickable elements too close together, content wider than screen, text too small).
19. Test the 10 highest-traffic pages individually in the **Google Mobile-Friendly Test** tool.
20. Record errors and affected URLs in the audit log.

### Phase 5 — Duplicate Content

21. In Screaming Frog, filter by **Duplicate Page Titles** and **Duplicate Meta Descriptions**. Export.
22. Run the crawl export through **Siteliner** to identify duplicate body content across internal pages.
23. For suspected duplicate content, check canonical tags in Screaming Frog (**Canonicals** tab).
24. Identify cases where:
    - Two URLs serve identical or near-identical content
    - Canonical tag is missing or self-referencing incorrectly
    - Pagination pages duplicate the parent page content
25. Record all instances with recommended fix (consolidate, canonical, noindex, 301 redirect).

### Phase 6 — Broken Links and Redirect Chains

26. In Screaming Frog, navigate to **Response Codes** and filter by **4xx** (client errors). Export.
27. Filter by **5xx** (server errors). Export.
28. Navigate to **Redirects** and filter by **3xx**. Identify:
    - Redirect chains (3 or more hops)
    - Redirect loops
    - 302 redirects being used where 301 is appropriate
29. In Ahrefs **Site Audit**, run the Broken Links report to capture both internal and external broken outbound links.
30. Record all broken links (source URL + broken URL) and redirect chains in the audit log with priority (inbound-linked broken pages = high priority).

### Phase 7 — Canonical Issues

31. In Screaming Frog, navigate to **Canonicals** tab.
32. Identify and record:
    - Pages with no canonical tag
    - Pages with a canonical pointing to a different URL (non-self-referencing)
    - Pages with multiple canonical tags
    - Pages where canonical URL returns a non-200 response
    - HTTP pages with a canonical pointing to HTTPS (or vice versa)
33. Check that paginated pages (/page/2, /page/3 etc.) use correct canonical or rel=prev/next (if applicable).

### Phase 8 — Thin Content Pages

34. In Screaming Frog, use **Custom > Search** or the **Page Word Count** export to identify pages with fewer than 300 words of body text.
35. Export all URLs with low word count.
36. Manually review each thin page and classify as:
    - Genuinely thin (needs content expansion)
    - Intentionally short (contact page, thank-you page — consider noindex)
    - Near-duplicate of another page (consider consolidation)
37. Record recommendations (expand, consolidate, noindex) in the audit log.

### Phase 9 — Meta Data Issues

38. In Screaming Frog, navigate to **Page Titles** tab. Export. Identify:
    - Missing title tags
    - Duplicate title tags
    - Title tags over 60 characters (may be truncated in SERPs)
    - Title tags under 30 characters (under-optimised)
39. Navigate to **Meta Description** tab. Export. Identify:
    - Missing meta descriptions
    - Duplicate meta descriptions
    - Descriptions over 160 characters
40. Navigate to **H1** tab. Identify:
    - Missing H1 tags
    - Pages with multiple H1 tags
    - H1 not matching or misaligned with title tag
41. Record all issues with affected URLs in the audit log.

### Phase 10 — Structured Data Errors

42. In Screaming Frog, navigate to **Structured Data** tab (requires JS rendering enabled).
43. Export all detected schema types and note any errors or warnings.
44. Run the 10 most important URLs through **Google Rich Results Test** and check for errors.
45. In Google Search Console, navigate to **Enhancements** and review any structured data reports (Articles, FAQPage, BreadcrumbList, Organisation).
46. Record schema errors and missing schema opportunities (e.g., Article schema on blog posts, FAQPage on FAQ sections).

### Phase 11 — Page Speed

47. Using **GTmetrix**, test the homepage, top 5 blog posts, and top 5 service or landing pages.
48. Record: Performance score, LCP, TBT, CLS, page size, number of requests, and time to fully loaded.
49. Identify specific GTmetrix recommendations (e.g., unminified CSS/JS, render-blocking resources, uncompressed images, missing caching headers).
50. Run the same pages through **Google PageSpeed Insights** and record Mobile and Desktop scores.
51. Identify the top 3 speed issues across the site and record in the audit log with estimated impact.

### Phase 12 — Security (HTTPS)

52. Visit `https://www.ssllabs.com/ssltest/` and run the SecurityBlogs domain.
53. Confirm SSL certificate grade is A or A+.
54. Confirm SSL certificate expiry date — flag if fewer than 60 days to expiry.
55. In Screaming Frog, filter URLs by **HTTP** (non-secure). Any HTTP URLs present should be flagged.
56. Confirm that HTTP URLs 301 redirect to HTTPS equivalents.
57. Check the **Strict-Transport-Security (HSTS)** header is present in site response headers.
58. Record any HTTPS or security issues in the audit log.

### Phase 13 — XML Sitemap

59. Locate the XML sitemap (typically at `/sitemap.xml` or via `robots.txt`).
60. Open the sitemap and confirm:
    - All important pages are included
    - No 301, 302, 4xx, or 5xx URLs are listed
    - No noindex pages are listed
    - `<lastmod>` dates are present and accurate
    - Sitemap is submitted to Google Search Console
61. If using a sitemap index, check all child sitemaps are accessible and valid.
62. In Google Search Console, navigate to **Sitemaps** and confirm the latest submission shows no errors.
63. Record any sitemap issues in the audit log.

### Phase 14 — Robots.txt

64. Access `https://securityblogs.com.au/robots.txt` and review the file.
65. Confirm:
    - Sitemap URL is declared in robots.txt
    - No important pages or directories are accidentally blocked
    - No `Disallow: /` rule is active on the production site
    - User-agent rules are correctly formatted
66. Cross-reference blocked URLs in robots.txt against the GSC Coverage report (Excluded > Blocked by robots.txt).
67. Record any robots.txt issues in the audit log.

### Phase 15 — Compile Audit Report

68. Consolidate all findings from the audit log into the Audit Report Template (see below).
69. Assign each issue a **Priority** (P1 Critical, P2 High, P3 Medium, P4 Low) based on:
    - P1: Issues causing indexation loss, security risk, or significant ranking suppression
    - P2: Issues directly impacting user experience or significant crawlability problems
    - P3: Issues with moderate ranking impact
    - P4: Minor improvements and best practices
70. Create a prioritised action plan with assigned owner and due date for each item.
71. Share the report with the SEO team lead and relevant stakeholders for review.

---

## Audit Report Template Structure

```
# SecurityBlogs Australia — SEO Audit Report
Audit Date: [Date]
Auditor: [Name]
Domain: securityblogs.com.au
Audit Period: [Month Year]

---

## Executive Summary
[3–5 sentence overview of overall site health and top priority findings]

## Key Metrics Summary
| Metric | Current | Previous | Change |
|---|---|---|---|
| Total URLs Crawled | | | |
| Indexed Pages (GSC) | | | |
| Crawl Errors | | | |
| 4xx Errors | | | |
| Redirect Chains | | | |
| Duplicate Pages | | | |
| Thin Content Pages | | | |
| CWV — Poor (Mobile) | | | |
| CWV — Poor (Desktop) | | | |
| PageSpeed Score (Mobile avg) | | | |
| PageSpeed Score (Desktop avg) | | | |

## Priority Issues

### P1 — Critical
| Issue | Affected URLs | Recommended Fix | Owner | Due Date |
|---|---|---|---|---|

### P2 — High
| Issue | Affected URLs | Recommended Fix | Owner | Due Date |
|---|---|---|---|---|

### P3 — Medium
| Issue | Affected URLs | Recommended Fix | Owner | Due Date |
|---|---|---|---|---|

### P4 — Low
| Issue | Affected URLs | Recommended Fix | Owner | Due Date |
|---|---|---|---|---|

## Detailed Findings
1. Indexation
2. Core Web Vitals
3. Mobile Usability
4. Duplicate Content
5. Broken Links and Redirects
6. Canonical Issues
7. Thin Content
8. Meta Data
9. Structured Data
10. Page Speed
11. Security (HTTPS)
12. XML Sitemap
13. Robots.txt

## Appendix
- Screaming Frog crawl export (linked)
- GSC Coverage export (linked)
- CWV report export (linked)
```

---

## Quality Checklist

- [ ] Screaming Frog crawl completed with 100% of URLs discovered
- [ ] Google Search Console data exported (Coverage, CWV, Mobile Usability)
- [ ] All 14 audit phases completed and documented
- [ ] Audit report compiled with priority classifications
- [ ] Action plan created with owners and due dates
- [ ] Previous audit findings compared (delta reported)
- [ ] Report reviewed by SEO team lead before distribution
- [ ] Audit project file saved with date stamp to shared drive

---

## Common Mistakes to Avoid

- **Crawling with robots.txt respected** — always disable robots.txt enforcement in Screaming Frog to surface all blocked URLs; just document what is blocked.
- **Ignoring mobile CWV** — Desktop scores can mask serious mobile performance issues. Always check both.
- **Treating all thin content as bad** — Contact, confirmation, and legal pages are legitimately short. Assess intent before recommending expansion.
- **Not comparing to the previous audit** — Without a delta, it is impossible to measure improvement. Always pull the prior audit report.
- **Skipping robots.txt review** — A single accidental `Disallow: /` on production can deindex the entire site.
- **Missing subdomain properties** — If subdomains exist (e.g., `blog.securityblogs.com.au`), they require their own crawl and separate GSC property.

---

## Time Estimate

| Phase | Estimated Time |
|---|---|
| Crawl setup and execution | 30–60 minutes |
| Indexation and CWV check | 30 minutes |
| Mobile usability | 20 minutes |
| Duplicate content analysis | 30 minutes |
| Broken links and redirects | 30 minutes |
| Canonical and meta data review | 30 minutes |
| Structured data and schema | 20 minutes |
| Page speed analysis | 30 minutes |
| HTTPS, robots.txt and sitemap | 20 minutes |
| Report compilation | 60–90 minutes |
| **Total** | **5–6 hours** |

---

## Output / Deliverable

- Completed SEO Audit Report (PDF and Google Doc) saved to `/SEO/Audits/[Year]/[Month]-audit-report.pdf`
- Prioritised action plan (Google Sheet) shared with team
- Screaming Frog project file archived to shared drive
- Tasks for P1 and P2 issues created in project management tool (Asana/Notion) and assigned with due dates
