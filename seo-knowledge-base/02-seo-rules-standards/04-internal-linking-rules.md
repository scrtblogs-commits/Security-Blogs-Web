# Internal Linking Rules — SecurityBlogs Australia

**Document type:** SEO Rules & Standards  
**Applies to:** All pages published on SecurityBlogs  
**Last reviewed:** June 2026  
**Owner:** SEO Team

---

## Overview

Internal linking is the practice of hyperlinking from one page on SecurityBlogs to another page on SecurityBlogs. It is one of the most powerful and underutilised on-page SEO levers available — fully within our control, zero cost, and immediately impactful.

Internal links serve four critical functions:

1. **PageRank distribution** — Passing link equity from authoritative pages to pages that need ranking support
2. **Crawl efficiency** — Helping Google discover and index pages that may not be linked from external sources
3. **Topical authority signalling** — Demonstrating the depth and breadth of SecurityBlogs' coverage on security industry topics
4. **User experience** — Guiding readers to related, useful content that keeps them engaged on site

Poor internal linking results in orphan pages (pages with no internal links pointing to them), wasted PageRank, thin topic clusters, and missed ranking opportunities. These rules must be followed on every page published.

---

## 1. Anchor Text Guidelines

Anchor text is the clickable, hyperlinked text that users see. It is one of the most significant signals Google uses to understand the topic of the destination page.

### 1.1 Anchor Text Types and Rules

| Anchor Text Type | Description | Use Frequency |
|---|---|---|
| **Exact match** | Anchor = exact target keyword (e.g., "SEO for security companies") | Sparingly — 1 per page max per keyword |
| **Partial match** | Anchor contains the keyword plus other words (e.g., "our SEO services for security firms") | Primary type — use most frequently |
| **Branded** | Anchor = SecurityBlogs brand name | Acceptable — use for homepage or brand pages |
| **Natural/contextual** | Descriptive phrase that explains the link (e.g., "learn more about our content strategy approach") | Frequently — for supplementary links |
| **Generic** | "Click here", "read more", "learn more" alone | Avoid — provides no keyword signal to Google |
| **Naked URL** | "https://securityblogs.com.au/seo" | Avoid in body content; acceptable in technical references |

### 1.2 Anchor Text Rules

- **Never use generic anchors** ("click here", "here", "this page", "read more" alone) — they waste the keyword signal opportunity
- **Do not over-optimise** — having too many exact-match anchors pointing to the same page from across the site looks manipulative
- **Vary anchor text** for the same destination page across different source pages — use exact, partial, and natural variations
- Anchor text must be **relevant and descriptive** — the user should be able to predict what they will find on the destination page
- **Maximum one exact-match anchor** for any given target keyword per page

### 1.3 Examples

**Avoid:**
```
To learn about SEO, click here.
```

**Better:**
```
Learn how SecurityBlogs delivers SEO strategies for security companies.
```

**Best (partial match, natural):**
```
Our approach to security industry SEO combines technical site work with 
targeted content to build rankings over time.
```

---

## 2. Link Frequency

Internal links must be distributed with intent — neither too sparse (missing opportunities) nor too dense (diluting link equity and appearing manipulative).

### 2.1 Frequency Rule

| Content Length | Recommended Internal Links |
|---|---|
| Under 500 words | 1–2 internal links |
| 500–1,000 words | 2–3 internal links |
| 1,000–2,000 words | 3–5 internal links |
| 2,000–3,500 words | 5–8 internal links |
| 3,500+ words | 8–12 internal links |

**General rule of thumb:** Aim for **1 internal link per 200–300 words** of body content.

### 2.2 Placement Rules

- Place internal links **within the body content** — not just in sidebars, footers, or navigation menus
- **First internal link** should appear within the first 200 words of the page where relevant
- Do not cluster multiple links in one paragraph — spread them across the page
- Contextual links (within sentence flow) outperform standalone "see also" links for passing link equity

---

## 3. Contextual vs Navigation Links

Not all internal links are equal. Understanding the difference between contextual and navigation links ensures link equity is distributed effectively.

### 3.1 Contextual Links

Contextual links appear **within the body copy** of a page, embedded naturally in the flow of the content. These are the highest-value internal links because:

- They appear within topically relevant surrounding text (giving Google strong signal about the destination page's topic)
- They are more likely to be clicked by engaged readers
- They pass more PageRank weight than navigational links

**Rule:** Prioritise contextual links. Every piece of content should have at least 2 contextual internal links.

### 3.2 Navigation Links

Navigation links appear in menus, headers, footers, breadcrumbs, and sidebars. They are important for usability and crawlability but carry less contextual weight than body links.

**Rule:** Navigation links count toward the site's crawlability but should NOT be counted in the per-page body link frequency targets above.

### 3.3 Related Posts / Content Blocks

"Related articles" or "You may also like" blocks at the bottom of blog posts provide valuable internal links. These should:

- Link to genuinely related content (same topic cluster), not arbitrary recent posts
- Use descriptive link text matching the title of the linked post
- Include 3–5 related post links per article

---

## 4. Linking to Pillar Pages

Pillar pages are the cornerstone content pieces for each major topic cluster on SecurityBlogs (e.g., a comprehensive guide to "SEO for Security Companies" is the pillar page for the SEO cluster).

### 4.1 Pillar Page Linking Rule

Every cluster content piece (blog post, guide, or supporting page within a topic cluster) must include **at least one internal link pointing back to the relevant pillar page**. This concentrates link equity on the pillar, reinforcing its authority on the topic.

### 4.2 SecurityBlogs Pillar Pages (Current Topic Clusters)

| Topic Cluster | Pillar Page Topic | Target URL Pattern |
|---|---|---|
| SEO | SEO for Security Companies — Complete Guide | `/services/seo/` or `/seo-guide/` |
| AEO | Answer Engine Optimisation for Security Businesses | `/services/aeo/` |
| GEO | Generative Engine Optimisation — Security Industry | `/services/geo/` |
| AI Visibility | AI Visibility for Security Companies | `/services/ai-visibility/` |
| Web Design | Web Design for Security Companies | `/services/web-design/` |
| Google Ads | Google Ads for Security Businesses | `/services/google-ads/` |
| Guest Posting | Guest Posting on SecurityBlogs | `/guest-posting/` |
| Advertising | Advertising with SecurityBlogs | `/advertise/` |

### 4.3 Hub-and-Spoke Model

Each pillar page links **out** to its supporting cluster content (spokes), and each spoke links **back** to the pillar. This creates a closed-loop topic cluster that Google recognises as a comprehensive authority resource.

```
Pillar Page: SEO for Security Companies
    └── Blog: Local SEO Tips for Security Firms → links back to Pillar
    └── Blog: How to Choose Security Company Keywords → links back to Pillar
    └── Blog: On-Page SEO Checklist for Security Websites → links back to Pillar
    └── Guide: Security Industry SEO FAQ → links back to Pillar
```

---

## 5. Avoiding Over-Optimisation

Internal linking over-optimisation occurs when a site:

- Uses exact-match anchor text for every internal link to a given page
- Links to the same destination page from every paragraph of a long article
- Creates circular linking patterns with no logical hierarchy
- Uses manipulative anchor text that does not reflect the user experience

### 5.1 Signs of Over-Optimisation

- More than 2 exact-match anchors for the same keyword on a single page
- The same destination page is linked more than 3 times within a single article
- Anchor text reads unnaturally ("SEO for security companies in Australia offering security industry SEO services")
- Links added that have no genuine relevance to the surrounding content

### 5.2 Rules to Prevent Over-Optimisation

- **Maximum 3 links to the same destination page** within a single article
- **No more than 1 exact-match anchor** for any keyword per page
- Vary anchor text each time you link to a frequently linked-to page
- Every internal link must pass the "does this genuinely help the reader?" test — if the answer is no, do not add it

---

## 6. Orphan Page Prevention

An orphan page is a page that has **no internal links pointing to it** from anywhere else on the site. Orphan pages are effectively invisible to Google's crawler (which discovers pages by following links), may not get indexed, and will not accumulate any link equity.

### 6.1 Orphan Page Rules

- **Every page published on SecurityBlogs must have at least two internal links pointing to it** before going live
- New blog posts must be linked from:
  1. A relevant category or archive page
  2. At least one related blog post or pillar page
- New service pages must be linked from:
  1. The main services navigation menu
  2. At least one blog post within the relevant topic cluster
  3. The homepage (if it is a primary service)

### 6.2 Orphan Page Audit Process

- Run a Screaming Frog crawl quarterly
- Export the "Response Codes" and "All Inlinks" reports
- Filter for pages with zero inlinks — these are orphan pages
- Add internal links to orphan pages from the most relevant existing content

---

## 7. Silo Structure for Security Topics

A content silo is an organisational structure that groups related content together and links within the group while minimising cross-silo links. This reinforces topical authority signals to Google.

### 7.1 SecurityBlogs Topic Silos

SecurityBlogs uses a **soft silo** structure — content is grouped by topic, internal links are prioritised within the silo, but cross-silo links are permitted when genuinely relevant.

**Silo 1: SEO**
- SEO service page (pillar)
- Blog: keyword research for security companies
- Blog: on-page SEO checklist
- Blog: local SEO for security firms
- Blog: technical SEO for security websites
- FAQ: security company SEO questions

**Silo 2: AEO / AI Visibility**
- AEO service page (pillar)
- GEO service page (pillar)
- AI Visibility service page (pillar)
- Blog: what is AEO
- Blog: how to optimise for AI search
- Blog: GEO vs SEO comparison

**Silo 3: Web Design**
- Web design service page (pillar)
- Blog: website must-haves for security companies
- Blog: conversion rate optimisation for security sites
- Blog: page speed for security websites

**Silo 4: Google Ads**
- Google Ads service page (pillar)
- Blog: Google Ads for security companies guide
- Blog: PPC vs SEO for security businesses
- Blog: security industry Google Ads keywords

**Silo 5: Content & Publishing**
- Guest posting page (pillar)
- Advertising/media kit page (pillar)
- Blog: benefits of guest posting for security companies
- Blog: how to write for SecurityBlogs

### 7.2 Cross-Silo Linking Rules

- Cross-silo links are permitted when there is genuine relevance (e.g., an SEO article can link to the web design service page if page speed is discussed)
- Do not force cross-silo links just to increase link frequency
- Cross-silo links should always use natural/contextual anchor text rather than exact-match keywords

---

## 8. Internal Link Quality Checklist

Before publishing any page, verify:

- [ ] At least 1 internal link per 200–300 words of body content
- [ ] At least 2 contextual internal links in the body copy
- [ ] All anchors are descriptive — no "click here" or standalone "read more"
- [ ] Anchor text is varied — no more than 1 exact-match anchor per keyword per page
- [ ] Page links to its relevant pillar page (for cluster content)
- [ ] At least two internal links point TO this page from elsewhere on the site
- [ ] No more than 3 links to any single destination page
- [ ] All linked pages are live and return a 200 status code (no broken links)
- [ ] Related posts block contains 3–5 genuinely relevant articles
- [ ] Linking follows the silo structure — priority links within the same topic cluster

---

*Part of the SecurityBlogs SEO Knowledge Base — 02 SEO Rules & Standards*  
*Last updated: June 2026 | Owner: SecurityBlogs SEO Team*
