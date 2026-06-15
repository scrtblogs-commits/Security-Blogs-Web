# Meta Title Rules — SecurityBlogs Australia

**Document type:** SEO Rules & Standards  
**Applies to:** All pages published on SecurityBlogs  
**Last reviewed:** June 2026  
**Owner:** SEO Team

---

## Overview

Meta titles (also called title tags) are one of the most influential on-page SEO elements. They appear in search engine results pages (SERPs), browser tabs, and social media previews. Every page on SecurityBlogs must have a unique, optimised meta title that follows these rules without exception.

Getting meta titles right is not optional — a poorly written title tag can cost a page its ranking regardless of how good the content is. Equally, a well-crafted title tag can lift click-through rate (CTR) from SERPs by 20–30% without any change to content.

---

## 1. Character Limits

| Limit Type | Value |
|---|---|
| **Recommended minimum** | 50 characters |
| **Recommended maximum** | 60 characters |
| **Hard cutoff (Google truncation)** | ~580–600 pixels wide |
| **Absolute maximum before truncation risk** | 65 characters |
| **Working budget (content before brand suffix)** | ~44 characters |

**Why this matters:** Google truncates meta titles that exceed roughly 600 pixels in the SERP snippet. The ` | SecurityBlogs` suffix consumes 16 characters, leaving approximately 44 characters for the content portion of the title. Truncated titles lose impact, look unprofessional, and may cut off the brand suffix.

**Counting tip:** Always count characters including spaces. Use a SERP preview tool (e.g., Mangools, Portent Title Tag Checker, or Ahrefs SERP Simulator) to verify pixel width before publishing. Character count alone is not sufficient — wide characters (W, M) consume more pixels than narrow ones (i, l).

---

## 2. Keyword Placement

- **Primary keyword must appear first** (or within the first 3 words where grammatically possible)
- Secondary keywords may appear in the middle of the title if space allows
- Brand suffix always appears last
- Never pad the front of a title with stop words (e.g., "The Best…", "A Guide to…", "Welcome to…")
- Do not repeat the same keyword in different forms within the same title
- Maximum two focus keywords per title — prioritise the primary keyword always

**Rationale:** Google assigns greater weight to words appearing earlier in the title. Users scanning SERPs also read from left to right and make split-second decisions based on the first few words they see. Front-loading the primary keyword improves both ranking relevance and CTR.

---

## 3. Brand Suffix Format

All page titles on SecurityBlogs must end with the brand suffix:

```
| SecurityBlogs
```

**Rules for the suffix:**
- Use a pipe character ( | ) with a **single space on each side**
- "SecurityBlogs" is always written as **one word** with a capital S and capital B — never "Security Blogs" (two words)
- Do **not** use a dash ( — ), colon ( : ), or slash ( / ) as the separator
- Do **not** abbreviate to "SB", "Sec Blogs", or any other variant
- Do **not** append "Australia" to the suffix (e.g., `| SecurityBlogs Australia`) unless a specific page absolutely requires disambiguation — this adds character count unnecessarily
- The brand suffix is applied automatically by the CMS (Yoast SEO / Rank Math) on most page types — verify it is not being duplicated

**Suffix character count:** ` | SecurityBlogs` = 16 characters (including the leading space)

---

## 4. Rules by Page Type

### 4.1 Homepage

**Purpose:** Establish brand identity and target the broadest relevant keyword for the publication.

**Rules:**
- Lead with a primary brand keyword or value descriptor
- Include a short value proposition or primary service descriptor
- Keep it broad — do not target a single niche long-tail keyword on the homepage
- The homepage title represents the brand at its highest level

**Formula:**
```
[Primary Brand Keyword or Service] — [Value Proposition or Audience] | SecurityBlogs
```

**Good examples:**
```
Security Industry Marketing & SEO | SecurityBlogs
```
*(49 characters — within limit)*

```
Australia's Security Industry Publication | SecurityBlogs
```
*(57 characters)*

**Bad examples:**
```
SecurityBlogs - SEO, Web Design, Google Ads, Guest Posts, AEO, GEO Services Australia
```
— Too long, tries to list all services, keyword stuffed

```
Welcome to SecurityBlogs Australia
```
— No brand suffix, no primary keyword, "Welcome to" wastes space

---

### 4.2 Service Pages

**Purpose:** Rank for specific service-related searches with commercial intent.

**Rules:**
- Primary keyword = the exact service name as it is searched (e.g., "SEO for Security Companies")
- Include a location modifier if the service is geographically targeted (e.g., "in Australia", "in Melbourne")
- Reflect a key benefit or differentiator where character budget allows
- Do not use generic superlatives like "best" or "leading" unless supported by verifiable claims

**Formula:**
```
[Primary Service Keyword] [Location Modifier] | SecurityBlogs
```
or
```
[Primary Service Keyword] — [Key Differentiator] | SecurityBlogs
```

**Good examples:**
```
SEO for Security Companies in Australia | SecurityBlogs
```
*(55 characters)*

```
Google Ads Management for Security Businesses | SecurityBlogs
```
*(61 characters — borderline, consider trimming)*

```
Security Industry Web Design Services | SecurityBlogs
```
*(53 characters)*

```
Guest Posting on Australian Security Websites | SecurityBlogs
```
*(61 characters — review with pixel checker)*

```
GEO Services for Australian Security Firms | SecurityBlogs
```
*(58 characters)*

**Bad examples:**
```
SEO Services | SecurityBlogs
```
— Too short, no qualifier, wastes keyword space, will not rank competitively

```
The Best Search Engine Optimisation Services for Security Companies Across All of Australia | SecurityBlogs
```
— Exceeds character limit, will be truncated; "The Best" wastes leading space

---

### 4.3 Blog Posts / Articles

**Purpose:** Rank for informational, navigational, or long-tail queries; build audience and authority.

**Rules:**
- Lead with the primary keyword or keyword phrase users would actually type into Google
- May use question format if the post targets a question-based query (e.g., "What Is…", "How Do…")
- Can include a number if the post is a list article (e.g., "7 Ways to…", "10 Tips for…")
- Avoid clickbait — titles must accurately reflect the page content
- Use Australian English spelling at all times (e.g., "Optimisation" not "Optimization")
- A colon ( : ) is acceptable to separate keyword from descriptor

**Formula:**
```
[Primary Keyword Phrase]: [Descriptor or Hook] | SecurityBlogs
```
or for question-based posts:
```
[Question Containing Primary Keyword] | SecurityBlogs
```
or for list posts:
```
[Number] [Topic] [Tips/Ways/Strategies] for [Audience] | SecurityBlogs
```

**Good examples:**
```
Security Guard SEO: A Complete Australian Guide | SecurityBlogs
```
*(62 characters — check with pixel tool)*

```
What Is AEO and Why Security Businesses Need It | SecurityBlogs
```
*(62 characters — check with pixel tool)*

```
10 Local SEO Tips for Security Companies | SecurityBlogs
```
*(56 characters)*

```
GEO vs SEO: What Security Firms Need to Know | SecurityBlogs
```
*(60 characters)*

**Bad examples:**
```
SEO Tips
```
— No brand suffix, too vague, too short, will not rank

```
You Won't Believe These SEO Tricks for Security Companies!! | SecurityBlogs
```
— Clickbait tone, exclamation marks, unprofessional

```
A Very Comprehensive and Detailed Guide to Search Engine Optimisation for Security Businesses
```
— Exceeds character limit; "A Very Comprehensive and Detailed" is wasted space

---

### 4.4 Category / Archive Pages

**Purpose:** Act as hub pages for topic clusters; rank for broad category-level searches.

**Rules:**
- Use the category keyword as the primary term
- Append "Articles & Guides", "News", or "Resources" to signal content type and improve relevance
- Keep titles broad and inclusive of all content within the category
- Do not target long-tail keywords on category pages — keep them broad
- Do not include the word "Category:" — it adds no SEO value

**Formula:**
```
[Category Keyword] Articles & Guides | SecurityBlogs
```

**Good examples:**
```
SEO Articles & Guides | SecurityBlogs
```
*(38 characters — acceptable for category pages)*

```
Security Industry News & Insights | SecurityBlogs
```
*(49 characters)*

```
Digital Marketing for Security Companies | SecurityBlogs
```
*(56 characters)*

**Bad examples:**
```
Category: SEO | SecurityBlogs
```
— "Category:" adds no SEO value; remove it

```
All Our Security Industry Blog Posts and Articles and Guides | SecurityBlogs
```
— Verbose, keyword-diluted, likely to truncate

---

### 4.5 Location / Regional Pages

**Purpose:** Rank for geographically targeted searches by security businesses in specific cities or states.

**Rules:**
- Include the location name prominently (suburb, city, or state — not abbreviations)
- Pair with the primary service or topic keyword
- Each location page must have a unique title — do not create near-duplicate titles by swapping city names only (Google penalises thin content patterns)
- Use full location names: "Melbourne" not "Melb", "Queensland" not "QLD" (in the title)

**Formula:**
```
[Primary Service Keyword] in [Location] | SecurityBlogs
```

**Good examples:**
```
Security Company SEO in Sydney | SecurityBlogs
```
*(46 characters)*

```
Melbourne Security Firm Web Design | SecurityBlogs
```
*(50 characters)*

```
Security Industry News for Queensland Businesses | SecurityBlogs
```
*(63 characters — check with pixel tool)*

**Bad examples:**
```
SEO in Melb | SecurityBlogs
```
— Abbreviation "Melb" looks unprofessional and reduces keyword clarity

```
Security Company SEO in Sydney | Security Company SEO in Melbourne | SecurityBlogs
```
— Multiple locations in one title; create separate pages instead

---

### 4.6 FAQ and Resource Pages

**Purpose:** Capture featured snippet opportunities and answer-intent queries; build topical authority.

**Rules:**
- Lead with the topic keyword, not necessarily the question format
- Use "FAQ", "Guide", or "Overview" as a descriptor where appropriate
- Optimise for the overarching topic, not a single question within the FAQ

**Formula:**
```
[Topic Keyword] FAQ — Common Questions Answered | SecurityBlogs
```
or
```
[Topic] Guide: [Specific Focus Area] | SecurityBlogs
```

**Good examples:**
```
Security Business SEO FAQ | SecurityBlogs
```
*(41 characters)*

```
AI Visibility Guide for Security Companies | SecurityBlogs
```
*(57 characters)*

---

### 4.7 Author Pages

**Purpose:** Build E-E-A-T signals; help users and search engines understand who creates content.

**Formula:**
```
[Author Name] — Security Industry Writer | SecurityBlogs
```

**Rules:**
- Use the author's real full name as credited on their articles
- Include a role descriptor ("Security Industry Writer", "SEO Specialist", "Digital Marketing Analyst")
- Character limit still applies — shorten the role descriptor if needed

---

### 4.8 Tag Pages

Tag pages should typically have `noindex` set unless they represent a meaningful topic cluster with sufficient unique content. If a tag page is indexed:

**Formula:**
```
[Tag Name] Articles | SecurityBlogs
```

---

## 5. Australian English Note

All meta titles must use **Australian English spelling** without exception. This is a brand standard and an audience signal — SecurityBlogs serves Australian security businesses and must present as an Australian publication.

| Australian (Correct) | American (Incorrect) |
|---|---|
| Optimisation | Optimization |
| Organise | Organize |
| Specialise | Specialize |
| Recognise | Recognize |
| Centre | Center |
| Analyse | Analyze |

Refer to `/07-australian-english-rules.md` for the full spelling reference list.

---

## 6. Good vs Bad Title Examples — Full Comparison Table

| Page Type | Good Title | Why It Works | Bad Title | Why It Fails |
|---|---|---|---|---|
| Homepage | `Security Industry Marketing & SEO \| SecurityBlogs` | Keyword first, concise, brand suffix | `Welcome to SecurityBlogs — Your #1 Home for Everything Security Marketing` | "Welcome to" wastes space; no brand suffix |
| Service Page | `SEO for Security Companies in Australia \| SecurityBlogs` | Service + location + brand, 55 chars | `Our SEO Services \| SecurityBlogs` | "Our" wastes position one; no location, too short |
| Blog Post | `10 Local SEO Tips for Security Companies \| SecurityBlogs` | Number + keyword + audience + brand | `SEO Tips You Need to Read \| SecurityBlogs` | Vague, no audience specificity, clickbait-adjacent |
| Category | `SEO Articles & Guides \| SecurityBlogs` | Clear topic, content type signalled | `Category: SEO \| SecurityBlogs` | "Category:" adds no value |
| Location | `Security Firm SEO in Melbourne \| SecurityBlogs` | Service + city + brand | `SEO \| Melbourne \| SecurityBlogs` | Pipe-separated list looks spammy |
| FAQ | `Security Business SEO FAQ \| SecurityBlogs` | Clear intent signal, clean format | `Questions About SEO \| SecurityBlogs` | No audience specificity |

---

## 7. Title Formula Quick Reference

| Page Type | Formula |
|---|---|
| Homepage | `[Brand Keyword] — [Value Proposition] \| SecurityBlogs` |
| Service Page | `[Service Keyword] [Location] \| SecurityBlogs` |
| Blog Post | `[Primary Keyword]: [Hook or Descriptor] \| SecurityBlogs` |
| List Post | `[Number] [Topic] [Tips/Ways] for [Audience] \| SecurityBlogs` |
| Category Page | `[Category Keyword] Articles & Guides \| SecurityBlogs` |
| Location Page | `[Service Keyword] in [Location] \| SecurityBlogs` |
| FAQ / Resource | `[Topic Keyword] FAQ — [Short Descriptor] \| SecurityBlogs` |
| Author Page | `[Author Name] — [Role] \| SecurityBlogs` |

---

## 8. Technical Notes

### Duplicate Titles
- Every page must have a **unique** meta title — no two pages may share the same title
- Run a site crawl quarterly (Screaming Frog, Ahrefs, or Semrush) to identify duplicate titles
- Duplicate titles dilute rankings and confuse Google's understanding of page hierarchy

### CMS / Plugin Configuration
- SecurityBlogs uses Yoast SEO or Rank Math — configure the brand suffix in the plugin's separator settings
- Test all auto-generated title templates before going live
- Confirm the brand suffix is not being duplicated by the theme and the SEO plugin simultaneously

### Dynamic Title Templates
- For blog posts: `%%title%% | SecurityBlogs`
- For category archives: `%%term_title%% Articles & Guides | SecurityBlogs`
- For author archives: `%%name%% — Security Industry Writer | SecurityBlogs`

### No Keyword Stuffing
- A focus keyword should appear **once** in the title
- Do not repeat the primary keyword in different forms within the same title (e.g., "SEO Search Engine Optimisation" is redundant)

### Punctuation Standards
- Colons ( : ) are acceptable as separators within the content area of the title
- Em dashes ( — ) may be used sparingly for stylistic separation
- Do **not** use exclamation marks
- Do **not** use ALL CAPS words
- Do **not** use multiple pipes within a single title

---

## 9. Quality Checklist

Before publishing any page, confirm all of the following:

- [ ] Primary keyword appears within the first 3 words
- [ ] Total character count is between 50 and 60 characters
- [ ] Pixel width verified using a SERP preview tool
- [ ] Title ends with ` | SecurityBlogs` (16 characters, including leading space)
- [ ] Australian English spelling is used throughout
- [ ] Title is unique — no other published page has an identical or near-identical title
- [ ] Title accurately reflects the page content (no clickbait or misdirection)
- [ ] No keyword stuffing (primary keyword appears once only)
- [ ] No ALL CAPS, exclamation marks, or multiple pipes
- [ ] Page type formula has been applied correctly

---

*Part of the SecurityBlogs SEO Knowledge Base — 02 SEO Rules & Standards*  
*Last updated: June 2026 | Owner: SecurityBlogs SEO Team*
