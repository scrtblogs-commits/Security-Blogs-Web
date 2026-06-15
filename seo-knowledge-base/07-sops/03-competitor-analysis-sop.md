# SOP 03 — Competitor Analysis

**Organisation:** SecurityBlogs Australia
**Department:** SEO / Digital Marketing
**Document Version:** 1.0
**Last Reviewed:** June 2026
**Review Frequency:** Quarterly

---

## Purpose

To provide a structured process for identifying, analysing, and benchmarking SecurityBlogs Australia's top organic search competitors. The output informs keyword strategy, content planning, link-building targets, and overall SEO positioning within the Australian security industry.

---

## Scope

Applies to quarterly full competitor audits and to any new keyword cluster research where competitor context is required. Relevant to the SEO strategist and content team lead. Competitors are defined as domains ranking in the top 10 SERPs for SecurityBlogs' target keyword clusters — not necessarily direct business competitors.

---

## Tools Required

| Tool | Purpose | Licence |
|---|---|---|
| Ahrefs | Domain metrics, backlink analysis, keyword gap, traffic | Paid |
| Semrush | Traffic analytics, keyword overlap, content gap | Paid |
| Google Search (incognito) | SERP competitor identification | Free |
| Moz Link Explorer | Domain Authority (DA) cross-check | Free/Paid |
| SimilarWeb | Traffic estimates, audience data | Free/Paid |
| BuzzSumo | Content performance and social shares | Paid |
| Google Alerts | Ongoing competitor brand mention monitoring | Free |

---

## Step-by-Step Process

### Phase 1 — Identify Top SERP Competitors

1. Open a new Google Sheet titled `Competitor Analysis — [Quarter] [Year]`.
2. Select 10–15 representative seed keywords across SecurityBlogs' main keyword clusters (pull from the Keyword Map — SOP 02).
3. For each keyword, open an **incognito browser window** and perform the Google search. Record the top 10 organic results (URLs and domains).
4. Tally the frequency of each domain appearing across all keyword searches. The domains with the highest frequency are the primary SERP competitors.
5. Identify the top 5–10 SERP competitors. These may include:
   - Other Australian security industry publications (e.g., Security Insider, ASIAL website)
   - Security company websites with strong blogs
   - Trade association sites
   - General news or tech sites with security coverage
6. Record the final competitor list in the **Competitor List** tab of the spreadsheet.

### Phase 2 — Domain Metrics Analysis

7. For each competitor domain, gather the following metrics using **Ahrefs Site Explorer**:
   - Domain Rating (DR)
   - Referring Domains (total)
   - Organic Keywords (AU)
   - Estimated Monthly Organic Traffic (AU)
   - Total Backlinks
8. Cross-check Domain Authority (DA) via **Moz Link Explorer** for a secondary metric.
9. Check **SimilarWeb** for total estimated monthly visits, traffic sources breakdown (organic, direct, referral, social, paid), and top source countries.
10. Record all metrics in the **Domain Metrics** tab of the competitor spreadsheet.

### Phase 3 — Backlink Profile Analysis

11. For each competitor, open **Ahrefs Site Explorer > Backlinks**.
12. Apply filters:
    - Link type: Dofollow only
    - One link per domain
    - DR: 30+
13. Export the top 100 referring domains for each competitor.
14. Analyse the backlink profile for:
    - **Link types:** Editorial, directory, guest post, press, association
    - **Top linking domains:** Note high-DR, niche-relevant domains that link to competitors but not to SecurityBlogs
    - **Anchor text distribution:** Note over-optimised anchor patterns that may indicate risky link-building
15. Create a **Backlink Gap** list: referring domains that link to 2 or more competitors but do not link to SecurityBlogs. These are priority prospecting targets for link building (pass to Off-Page SEO SOP — SOP 07).
16. Record findings in the **Backlink Analysis** tab.

### Phase 4 — Content Gap Analysis

17. In **Ahrefs**, navigate to **Competitive Analysis > Content Gap**.
18. Enter SecurityBlogs as the target domain. Enter the top 5 competitor domains.
19. Export all keywords where competitors rank in positions 1–10 but SecurityBlogs does not rank in the top 100.
20. Filter results:
    - AU monthly volume ≥ 100 (or global ≥ 500)
    - Keyword Difficulty ≤ 50
21. Categorise the content gap keywords by topic cluster.
22. Identify the top 20 content gap opportunities and flag for inclusion in the Content Planning SOP (SOP 04).
23. Repeat using **Semrush Keyword Gap** for secondary validation.
24. Record results in the **Content Gap** tab.

### Phase 5 — SERP Feature Analysis

25. For the 10–15 seed keywords used in Phase 1, record which SERP features are present for each:
    - Featured Snippet (and which competitor owns it)
    - People Also Ask
    - Knowledge Panel
    - Image Pack
    - Video Carousel
    - News Pack
    - Local Pack (3-pack)
    - Top Stories
26. Identify SERP features that SecurityBlogs could realistically target based on content type (e.g., FAQ schema for PAA, structured how-to content for Featured Snippets).
27. Note which competitors consistently appear in SERP features. Analyse their content structure to understand why (e.g., direct question-answer format, schema markup, concise definitions).
28. Record SERP feature opportunities in the **SERP Features** tab.

### Phase 6 — Keyword Overlap Score

29. In **Semrush Traffic Analytics > Audience Overlap**, compare SecurityBlogs against each competitor.
30. Note the **keyword overlap percentage** between SecurityBlogs and each competitor.
31. In **Ahrefs**, use the **Organic Competitors** report to view the automatically calculated overlap score (shared keywords as a percentage of total).
32. Record overlap scores in the **Domain Metrics** tab. High overlap (> 30%) = direct competitor; low overlap (< 10%) = aspirational or adjacent competitor.

### Phase 7 — Content Calendar Reverse Engineering

33. For the top 3 competitors, conduct a content audit by reviewing their blog or news sections.
34. Record the following for each competitor's last 30 published posts:
    - Post title
    - Estimated publish date
    - Topic category
    - Estimated word count
    - Social share count (via BuzzSumo)
    - Estimated organic traffic (Ahrefs URL-level traffic)
35. Identify:
    - Content categories they publish most frequently
    - Topics driving the most traffic
    - Content gaps in their strategy (topics they are not covering)
    - Publication frequency (posts per week/month)
36. Record findings in the **Content Calendar Intel** tab.

### Phase 8 — Social Presence Check

37. For each competitor, check the following social channels and record follower counts and posting frequency:
    - LinkedIn (most relevant for B2B security industry)
    - Facebook
    - Twitter / X
    - YouTube
    - Instagram
38. Note which social channels drive the most engagement for competitors.
39. Identify content formats performing well (video, infographics, industry news posts).
40. Record findings in the **Social Presence** tab.

### Phase 9 — Compile Competitor Comparison Matrix

41. Consolidate all data into the **Competitor Comparison Matrix** (see template below).
42. Write a brief narrative summary (2–3 paragraphs) covering:
    - Who the strongest SERP competitor is and why
    - The biggest content gap opportunities for SecurityBlogs
    - The top backlink prospecting targets identified
    - Key SERP features SecurityBlogs should target
43. Share the completed analysis with the SEO team lead and content strategist.

---

## Competitor Comparison Matrix Template

```
# SecurityBlogs Australia — Competitor Analysis
Quarter: [Q1/Q2/Q3/Q4] [Year]
Analyst: [Name]

## Competitor Overview
| Metric | SecurityBlogs | Competitor 1 | Competitor 2 | Competitor 3 | Competitor 4 | Competitor 5 |
|---|---|---|---|---|---|---|
| Domain | securityblogs.com.au | | | | | |
| DR (Ahrefs) | | | | | | |
| DA (Moz) | | | | | | |
| Referring Domains | | | | | | |
| Organic Keywords (AU) | | | | | | |
| Est. Monthly Traffic (AU) | | | | | | |
| Total Backlinks | | | | | | |
| Keyword Overlap % | — | | | | | |
| Publishing Frequency | | | | | | |
| LinkedIn Followers | | | | | | |

## Top Content Gap Opportunities
| Keyword | Vol (AU) | KD | Competitors Ranking | Recommended Content Type |
|---|---|---|---|---|

## Backlink Gap — Priority Prospects
| Referring Domain | DR | Niche Relevance | Links To Competitors | Link Opportunity Type |
|---|---|---|---|---|

## SERP Feature Opportunities
| Keyword | Current SERP Feature | Owner | SecurityBlogs Opportunity |
|---|---|---|---|

## Narrative Summary
[Insert 2–3 paragraph summary here]
```

---

## Quality Checklist

- [ ] Top 5–10 SERP competitors identified using actual Google SERP data (incognito)
- [ ] Domain metrics collected from Ahrefs and cross-checked with Moz
- [ ] Backlink gap list created with at least 20 link prospecting targets
- [ ] Content gap analysis run in both Ahrefs and Semrush
- [ ] SERP features documented for primary keyword clusters
- [ ] Keyword overlap scores recorded for all competitors
- [ ] Top 3 competitors' content calendars reverse-engineered (last 30 posts)
- [ ] Social presence data recorded for all competitors
- [ ] Competitor comparison matrix completed and shared with team
- [ ] Top content gap opportunities passed to Content Planning SOP (SOP 04)
- [ ] Top backlink prospects passed to Off-Page SEO SOP (SOP 07)

---

## Common Mistakes to Avoid

- **Confusing SERP competitors with business competitors** — a solo blogger or trade association may outrank a direct business rival in search. Track SERP competitors, not just businesses you compete with commercially.
- **Using only one tool for metrics** — Ahrefs and Semrush use different methodologies. Cross-referencing gives a more accurate picture.
- **Analysing competitors only once** — SERP landscapes shift. Quarterly reviews are the minimum; monthly checks of top competitor content publishing are best practice.
- **Ignoring low-DR competitors** — A DR 25 niche blog that consistently ranks in the top 3 for security industry terms is worth studying for content strategy even if its link profile is modest.
- **Copying competitor strategies directly** — the goal is to identify gaps and do it better, not replicate what already exists. Look for what competitors are NOT doing.

---

## Time Estimate

| Phase | Estimated Time |
|---|---|
| SERP competitor identification | 45 minutes |
| Domain metrics collection | 60 minutes |
| Backlink profile analysis | 60 minutes |
| Content gap analysis | 45 minutes |
| SERP feature analysis | 30 minutes |
| Keyword overlap scoring | 20 minutes |
| Content calendar reverse engineering | 60 minutes |
| Social presence check | 30 minutes |
| Matrix compilation and summary | 45 minutes |
| **Total** | **6–7 hours** |

---

## Output / Deliverable

- Competitor Analysis Spreadsheet saved to `/SEO/Competitor Analysis/[Quarter]-[Year]-competitor-analysis.xlsx`
- Competitor Comparison Matrix (PDF export for stakeholders)
- Content gap keyword list passed to Content Planning SOP (SOP 04)
- Backlink prospect list passed to Off-Page SEO SOP (SOP 07)
- SERP feature opportunities passed to On-Page SEO SOP (SOP 06) and Content Planning SOP (SOP 04)
