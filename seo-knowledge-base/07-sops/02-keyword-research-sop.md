# SOP 02 — Keyword Research

**Organisation:** SecurityBlogs Australia
**Department:** SEO / Digital Marketing
**Document Version:** 1.0
**Last Reviewed:** June 2026
**Review Frequency:** Quarterly

---

## Purpose

To establish a repeatable, data-driven process for identifying, evaluating, and mapping keywords that drive qualified organic traffic to SecurityBlogs Australia. The output is a prioritised keyword map that guides content creation, on-page optimisation, and site architecture decisions.

---

## Scope

Applies to all new content projects, site section expansions, and quarterly keyword strategy reviews. Relevant to the SEO strategist, content team lead, and any staff creating content briefs. Covers Australian-focused security industry keywords with secondary consideration of global English-language search demand.

---

## Tools Required

| Tool | Purpose | Licence |
|---|---|---|
| Ahrefs | Keyword Explorer, competitor gap, traffic data | Paid |
| Semrush | Keyword Magic Tool, position tracking, gap analysis | Paid |
| Google Keyword Planner | Search volume, AU filtering, CPC data | Free (Google Ads account) |
| Google Search Console | Existing ranking queries, CTR and position data | Free |
| Google Search (People Also Ask) | Related question discovery | Free |
| Google Autocomplete | Long-tail suggestion mining | Free |
| AnswerThePublic / AlsoAsked | Question-based keyword discovery | Free/Paid |
| Google Trends | Seasonality, AU vs global demand | Free |

---

## Step-by-Step Process

### Phase 1 — Seed Keyword Generation

1. Open a new Google Sheet titled `Keyword Research — [Topic/Project] — [Month Year]`.
2. Brainstorm seed keywords relevant to the content project or site section being researched. For SecurityBlogs Australia, seed topics typically include:
   - Security industry verticals (e.g., access control, CCTV, alarm systems, security guards, cybersecurity)
   - Buyer intent terms (e.g., "security company", "security services", "security installer")
   - Location-based terms (e.g., "security company Sydney", "CCTV installation Melbourne")
   - Industry roles and associations (e.g., "ASIAL member", "security licence", "security officer training")
   - Content topics (e.g., "security industry news", "physical security trends", "security technology")
3. List all seed keywords in Column A of the spreadsheet. Aim for 20–50 seed terms per project.
4. Review recent client briefs, industry publications (e.g., Security Insider, ASIAL updates), and trending security news to surface additional seed terms.

### Phase 2 — Keyword Expansion (Ahrefs)

5. Open **Ahrefs Keyword Explorer**. Set country to **Australia**.
6. Enter all seed keywords (batch input supported). Select **Phrase match** report.
7. Export the full results. Import to the working spreadsheet.
8. Repeat with **Having same terms** and **Questions** filters in Ahrefs to surface long-tail and question-based variants.
9. Note the following data points for each keyword: Monthly Volume (AU), Keyword Difficulty (KD), Traffic Potential, Global Volume, CPC.

### Phase 3 — Keyword Expansion (Semrush)

10. Open **Semrush Keyword Magic Tool**. Set database to **Australia**.
11. Enter each seed keyword. Select **Broad Match** and export results.
12. Also run **Questions** filter to capture interrogative terms.
13. Import results to the working spreadsheet, deduplicating against the Ahrefs export.

### Phase 4 — Google Keyword Planner

14. Open **Google Keyword Planner** (requires Google Ads account). Navigate to **Discover New Keywords**.
15. Enter seed keywords. Set location to **Australia** and language to **English**.
16. Export data. Import average monthly searches and competition data to the working spreadsheet.
17. Note: GKP volumes are approximate ranges; use Ahrefs/Semrush for more precise data. GKP is valuable for confirming AU-specific demand.

### Phase 5 — Google Search Console Query Mining

18. Open Google Search Console. Navigate to **Performance > Search Results**.
19. Set date range to **last 12 months**. Filter by **Country: Australia**.
20. Export all queries (up to 1,000 rows). Import to the working spreadsheet.
21. Identify:
    - Queries where the site ranks positions 11–30 (quick-win opportunities with content updates)
    - Queries where impressions are high but CTR is low (meta data improvement opportunities)
    - Queries that are not yet targeted by any existing page (new content opportunities)
22. Flag all GSC-sourced queries in the spreadsheet with the source column marked "GSC".

### Phase 6 — People Also Ask and Autocomplete Mining

23. For each primary seed keyword, perform a Google search and record all **People Also Ask (PAA)** questions shown. Use the **AlsoAsked** tool to bulk-expand PAA trees.
24. Record PAA questions in the spreadsheet. These often represent high-intent long-tail targets suitable for FAQ sections or dedicated cluster content.
25. Use **Google Autocomplete** by typing each seed keyword and recording all suggestions. Repeat with letters A–Z appended for comprehensive coverage (can use a tool like Keyword Sh*tter or Ubersuggest for bulk autocomplete mining).
26. Import all findings to the working spreadsheet.

### Phase 7 — Competitor Keyword Gap Analysis

27. In **Ahrefs**, navigate to **Competitive Analysis > Content Gap**.
28. Enter the SecurityBlogs domain as the target. Enter 3–5 top competitor domains as the comparison (refer to SOP 03 for competitor identification).
29. Export keywords that competitors rank for but SecurityBlogs does not.
30. Filter results by:
    - Australian monthly volume ≥ 100 (or global volume ≥ 500)
    - Keyword Difficulty ≤ 50 (adjust based on domain authority)
31. Import filtered results to the working spreadsheet and mark source as "Competitor Gap".
32. Repeat in **Semrush Keyword Gap** tool for additional coverage.

### Phase 8 — Search Intent Classification

33. For every keyword in the spreadsheet, assign a **Search Intent** category:
    - **Informational (I):** User wants to learn (e.g., "how does access control work", "what is CCTV")
    - **Commercial Investigation (C):** User is comparing options (e.g., "best security companies Australia", "Hikvision vs Dahua")
    - **Transactional (T):** User is ready to act (e.g., "hire security guard Brisbane", "buy CCTV system")
    - **Navigational (N):** User seeks a specific brand or site (e.g., "ASIAL login", "SecurityBlogs news")
34. Confirm intent classification by examining the actual Google SERP for each keyword and noting what types of content rank (blog posts = informational, product/service pages = transactional, etc.).
35. Record intent in a dedicated column in the spreadsheet.

### Phase 9 — Keyword Difficulty Filtering and Volume Thresholds

36. Apply the following minimum volume thresholds to filter out negligible keywords:
    - **Australian monthly search volume:** minimum 100 searches/month
    - **Global monthly search volume:** minimum 500 searches/month (for AU-relevant topics where AU volume data may be suppressed)
37. Apply the following keyword difficulty (KD) guidelines based on domain authority stage:
    - **New or low-DA site (DR < 30):** Target KD 0–20
    - **Growing site (DR 30–50):** Target KD 0–35
    - **Established site (DR 50+):** Target KD 0–50 with selective KD 50–70 for pillar content
38. Mark keywords below volume thresholds as "Deprioritised" but retain them in the spreadsheet for future reference.
39. Mark keywords above KD threshold as "Long-Term Target" and retain for future quarters.

### Phase 10 — Keyword Mapping to Pages

40. Review the site's existing page inventory (URL, title, current primary keyword) in Column A of the Keyword Map tab.
41. For each keyword that passes volume and difficulty filters, assign it to one of the following:
    - **Existing page** (keyword can be added/optimised on a current page)
    - **New page required** (no suitable existing page; add to content plan)
    - **Duplicate mapping** (keyword is already well-covered; deprioritise)
42. Ensure each URL has only **one primary keyword** assigned. Multiple related keywords can be listed as secondary keywords for the same page.
43. Flag any instances of **keyword cannibalisation** (two or more URLs competing for the same primary keyword) for resolution.

### Phase 11 — Priority Scoring Matrix

44. Apply the following scoring system to each keyword to determine priority:

| Factor | Weight | Scoring |
|---|---|---|
| Monthly AU Volume | 30% | 100–499 = 1pt, 500–999 = 2pt, 1,000–4,999 = 3pt, 5,000+ = 4pt |
| Keyword Difficulty | 25% | KD 0–20 = 4pt, KD 21–35 = 3pt, KD 36–50 = 2pt, KD 51+ = 1pt |
| Business Relevance | 25% | Direct service = 4pt, Industry-adjacent = 3pt, General industry = 2pt, Tangential = 1pt |
| Search Intent Alignment | 20% | Transactional = 4pt, Commercial = 3pt, Informational = 2pt, Navigational = 1pt |

45. Calculate the weighted score for each keyword. Sort the keyword map by score (descending).
46. Top-scoring keywords (score ≥ 3.0) are marked **Priority 1**; 2.0–2.9 are **Priority 2**; below 2.0 are **Priority 3**.

### Phase 12 — Final Review and Sign-Off

47. Review the completed keyword map with the SEO team lead.
48. Confirm all Priority 1 keywords are assigned to existing or planned pages.
49. Pass Priority 1 and Priority 2 keywords requiring new content to the Content Planning SOP (SOP 04).
50. Save and share the final keyword map spreadsheet to `/SEO/Keyword Research/[Project]-keyword-map-[Month-Year].xlsx`.

---

## Keyword Map Spreadsheet Template

```
Tabs:
1. Master Keyword List
   Columns: Keyword | Monthly Vol (AU) | Monthly Vol (Global) | KD | CPC | Search Intent | Source | Priority Score | Mapped URL | New Page Required? | Notes

2. Competitor Gap Keywords
   Columns: Keyword | Vol (AU) | KD | Competitor 1 Rank | Competitor 2 Rank | Competitor 3 Rank | Opportunity Score

3. GSC Quick Wins
   Columns: Query | Impressions | Clicks | CTR | Avg Position | Opportunity Type | Recommended Action

4. Keyword Map (Final)
   Columns: URL | Page Title | Primary Keyword | Secondary Keywords (1–5) | Search Intent | Monthly Vol | KD | Priority | Content Status | Owner | Due Date

5. Cannibalisation Issues
   Columns: Keyword | URL 1 | URL 2 | Recommended Resolution
```

---

## Quality Checklist

- [ ] Seed keywords reviewed and approved before expansion begins
- [ ] Ahrefs and Semrush both used for expansion (dual-source validation)
- [ ] Google Search Console queries incorporated
- [ ] PAA and autocomplete mining completed
- [ ] Competitor gap analysis run against at least 3 competitor domains
- [ ] Every keyword has a search intent classification
- [ ] Volume thresholds applied (AU ≥ 100/month or global ≥ 500/month)
- [ ] Keyword difficulty filters applied and documented
- [ ] Every qualifying keyword mapped to a page (existing or new)
- [ ] No keyword cannibalisation left unresolved
- [ ] Priority scoring completed for all keywords
- [ ] Final keyword map reviewed and approved by SEO team lead
- [ ] File saved to correct shared drive location

---

## Common Mistakes to Avoid

- **Mapping two priority pages to the same primary keyword** — this creates cannibalisation. One keyword, one primary page.
- **Ignoring GSC data** — existing rankings are the fastest optimisation opportunities. Always mine GSC before building a new list from scratch.
- **Only targeting high-volume keywords** — security industry terms often have moderate AU volumes (100–1,000/month) but very high purchase intent and lifetime client value. Volume alone is not the metric.
- **Skipping intent classification** — assigning a transactional keyword to a blog post (or vice versa) will fail to rank regardless of content quality.
- **Not filtering by country** — global volume figures can be misleading for AU-focused content. Always confirm AU-specific demand separately.
- **Setting and forgetting** — keyword maps should be reviewed quarterly. Search volumes, difficulty, and competitor positions change.

---

## Time Estimate

| Phase | Estimated Time |
|---|---|
| Seed keyword generation | 30 minutes |
| Ahrefs and Semrush expansion | 60 minutes |
| GKP and GSC mining | 30 minutes |
| PAA and autocomplete mining | 45 minutes |
| Competitor gap analysis | 45 minutes |
| Intent classification | 60 minutes |
| Filtering and mapping | 60 minutes |
| Priority scoring and review | 45 minutes |
| **Total** | **6–7 hours** |

---

## Output / Deliverable

- Keyword Map Spreadsheet saved to `/SEO/Keyword Research/[Project]-keyword-map-[Month-Year].xlsx`
- Summary slide (top 20 priority keywords with rationale) for stakeholder presentation
- Content plan additions: list of new pages required, passed to Content Planning SOP (SOP 04)
- Quick-win list: existing pages requiring on-page optimisation, passed to On-Page SEO SOP (SOP 06)
