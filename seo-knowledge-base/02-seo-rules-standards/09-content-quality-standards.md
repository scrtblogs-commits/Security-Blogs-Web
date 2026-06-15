# Content Quality Standards — SecurityBlogs Australia

**Document type:** SEO Rules & Standards  
**Applies to:** All content published on SecurityBlogs — articles, service pages, guides, comparison pages, FAQs  
**Last reviewed:** June 2026  
**Owner:** Editorial Team / SEO Team

---

## Overview

Content quality is the single most consequential variable in SecurityBlogs' long-term SEO performance, brand reputation, and audience growth. Google's Helpful Content system and its quality rater guidelines place enormous weight on whether content genuinely serves the reader — not just whether it technically contains keywords.

These content quality standards exist to ensure every piece published on SecurityBlogs:

- Earns and deserves its ranking through genuine utility
- Demonstrates E-E-A-T (see `08-eeat-guidelines.md`)
- Meets minimum depth and accuracy thresholds
- Is original, readable, and free of errors
- Remains accurate and current over time

No content that falls below these standards should be published. Existing content that falls below these standards should be updated, consolidated, or removed.

---

## 1. Minimum Word Counts by Page Type

Word count is not a quality metric in isolation — thin but accurate content can outrank bloated filler. However, most security industry topics require genuine depth to be useful, and thin pages rarely satisfy the full search intent.

The following minimums exist not to pad content but to ensure topics are covered with sufficient depth.

| Page Type | Minimum Word Count | Notes |
|---|---|---|
| **Homepage** | 600 words | Introductory — complemented by structural elements |
| **Service pages** | 1,500 words | Must cover the service, process, benefits, FAQs, and CTA |
| **Blog posts** | 1,200 words | Standard informational articles |
| **Long-form blog / ultimate guides** | 2,500 words | In-depth guides covering a topic comprehensively |
| **Comparison pages** | 2,000 words | Side-by-side analysis requires genuine depth per option |
| **FAQ pages / resource pages** | 1,000 words | Minimum 10 questions with substantive answers |
| **Location pages** | 800 words | Must contain unique, location-specific content |
| **Category / archive pages** | 300 words | Introductory copy above the article listing |
| **About page** | 400 words | |
| **Guest posts (external contributors)** | 1,000 words minimum | Must meet all other quality standards |

### 1.1 Word Count Verification

- Word count is measured on the **body content only** — excluding navigation, footer, sidebar, and schema markup
- Use the word count tool in WordPress or the Yoast/Rank Math readability panel
- Submissions that fall below minimum are returned to the writer for expansion before editorial review

### 1.2 Quality Over Padding

If a topic is genuinely covered in fewer words than the minimum, that is a signal the brief was too narrow. Expand the brief — add a FAQ section, additional context, real-world examples, or related subtopics — rather than padding with filler sentences.

Padding (repeating points, excessive transitional filler, restating the introduction in the conclusion) is worse than being slightly under the word count. It actively harms quality scores.

---

## 2. Fact-Checking Requirements

SecurityBlogs publishes content about the Australian security industry, digital marketing strategies, and Google's systems. Errors in any of these areas — especially industry facts — damage credibility and can expose the publication to legal and reputational risk.

### 2.1 Mandatory Fact-Checking Process

Every article must undergo fact-checking before publication:

**Step 1 — Source every factual claim**  
Every statistic, regulatory fact, licensing requirement, company claim, and technical assertion must be traceable to a named source. Writers must include source links in the draft (these may be removed from the published version or left as references, depending on content type).

**Step 2 — Use authoritative Australian sources**  
Priority sources for fact-checking:

| Category | Preferred Sources |
|---|---|
| Security industry regulation | ASIAL, state licensing bodies (Vic Pol, NSW SLED, QLD OFT), government.au |
| Australian law | Australasian Legal Information Institute (AustLII), government legislation portals |
| Google / SEO | Google Search Central documentation, Google Search Console blog, official Google research |
| Australian statistics | ABS (Australian Bureau of Statistics), government department publications |
| Industry data | ASIAL annual reports, IBISWorld (where accessible), peer-reviewed research |

**Step 3 — Editorial review**  
The editorial reviewer checks all sourced claims against the referenced source. Unsourced factual claims are flagged for removal or sourcing before publication.

**Step 4 — Verification sign-off**  
The editor signs off on the article only after fact-checking is complete. Fact-checking completion is logged in the content management system.

### 2.2 Updating Outdated Facts

- When a published article is found to contain outdated information, it must be updated within 5 business days of discovery
- Apply the correction notice policy (see `08-eeat-guidelines.md` Section 4.3)
- Re-publish with the updated `dateModified` value

---

## 3. Readability Targets

Content published on SecurityBlogs is aimed at Australian security business owners, operators, and professionals. This audience is intelligent and industry-experienced but does not necessarily have advanced academic or technical writing backgrounds. Content must be accessible and scannable.

### 3.1 Flesch-Kincaid Reading Grade Level

**Target: Grade 8–10 (Flesch-Kincaid Grade Level)**

| Score Range | Interpretation |
|---|---|
| Grade 6–8 | Very easy — appropriate for consumer-facing content |
| **Grade 8–10** | **Target range — clear, professional, accessible** |
| Grade 11–13 | More complex — acceptable for technical/legal documents only |
| Grade 14+ | Academic — too complex for most SecurityBlogs content |

**How to check:**  
- Yoast SEO and Rank Math both include readability analysis in WordPress
- Hemingway Editor (hemingwayapp.com) provides a grade level score and highlights complex sentences
- Aim for a Flesch Reading Ease score of 50–65

### 3.2 Sentence and Paragraph Length

| Element | Target |
|---|---|
| Average sentence length | 15–20 words |
| Maximum sentence length (individual) | 30 words |
| Paragraph length | 2–4 sentences |
| Consecutive long sentences | Avoid 3+ long sentences in a row |

- Break complex ideas into multiple shorter sentences
- Vary sentence length for rhythm — not every sentence should be the same length
- Use bullet points and numbered lists to break up dense information blocks

### 3.3 Vocabulary

- Use plain English wherever possible without sacrificing accuracy
- Define technical terms on first use (e.g., "AEO (Answer Engine Optimisation)")
- Do not use jargon to appear expert — use it only when it is the most precise and appropriate term
- Avoid American colloquialisms (see `07-australian-english-rules.md`)

### 3.4 Passive Voice

- Limit passive voice to under 15% of sentences (Yoast SEO flags this)
- Use active voice as the default: "SecurityBlogs helps security companies rank on Google" not "Security companies are helped to rank on Google by SecurityBlogs"

---

## 4. Image Alt Text Rules

All images published on SecurityBlogs — in articles, service pages, and any other content — must have descriptive, accurate alt text.

### 4.1 Why Alt Text Matters

- **Accessibility:** Screen readers use alt text to describe images for visually impaired users — a legal requirement under Australian accessibility guidelines (WCAG 2.1 AA, referenced in the *Disability Discrimination Act 1992*)
- **SEO:** Google cannot see images; alt text tells Google what an image depicts, contributing to image search rankings and topic relevance signals
- **Fallback display:** When an image fails to load, alt text is displayed in its place

### 4.2 Alt Text Rules

| Rule | Detail |
|---|---|
| **Be descriptive** | Describe what the image actually shows, not what you want it to say |
| **Include keyword where natural** | Include the primary keyword if it genuinely describes the image — do not force it |
| **Length** | 5–15 words; sufficient to describe the image without being excessive |
| **No "image of" or "photo of"** | Google already knows it's an image — begin with the description directly |
| **No keyword stuffing** | "SEO security company Australia website design security guard" is not acceptable |
| **Decorative images** | If an image is purely decorative (a divider line, an abstract background), use `alt=""` (empty alt) |
| **Infographics** | Describe the key data or conclusion — full infographic content may need a text alternative |
| **Screenshots** | Describe what the screenshot shows, including the tool name if relevant |

### 4.3 Alt Text Examples

| Image | Poor Alt Text | Good Alt Text |
|---|---|---|
| Photo of security officer at building entrance | "image" | "Security officer at the entrance of a commercial building in Melbourne" |
| Screenshot of Google Search Console | "screenshot" | "Google Search Console performance report showing security company clicks over 3 months" |
| Graph showing website traffic increase | "graph" | "Bar graph showing 45% increase in organic traffic for a security company after SEO implementation" |
| SecurityBlogs logo | "logo" | "SecurityBlogs logo — Australian security industry publication" |
| Stock photo of two people in business meeting | "meeting" | "Two professionals reviewing a digital marketing strategy for a security business" |

### 4.4 File Naming Convention

Image file names should also be descriptive and keyword-relevant:

- ✔ `security-company-seo-australia.jpg`
- ✔ `local-seo-security-guard-business.png`
- ✗ `IMG_2045.jpg`
- ✗ `image1.png`
- Use hyphens to separate words; all lowercase; no spaces

---

## 5. Content Freshness Policy

Content freshness is both an SEO signal (Google favours recently updated content for time-sensitive queries) and a credibility requirement (outdated information damages trust).

### 5.1 Freshness Categories

| Category | Freshness Requirement |
|---|---|
| **News / Industry Updates** | Publish within 24–48 hours of the event; no minimum freshness window required |
| **Blog posts — informational** | Review every 12 months; update if material information has changed |
| **Blog posts — evergreen guides** | Major review every 18–24 months; minor updates (statistics, examples) as needed |
| **Service pages** | Review every 6 months; update when services, pricing, or processes change |
| **FAQ pages** | Review every 6 months; add new questions as they emerge from client/search data |
| **Comparison pages** | Review every 6 months — competitor and tool landscapes change quickly |
| **Location pages** | Review every 12 months |

### 5.2 What Constitutes a Meaningful Update

Not every edit qualifies as a meaningful content refresh. Google's systems detect substantive changes versus cosmetic edits.

**Meaningful updates include:**
- Adding new sections or substantially rewriting existing sections
- Updating statistics with current data
- Adding new examples, case studies, or real-world references
- Correcting outdated information
- Adding a FAQ section to existing content
- Incorporating new search queries identified from Google Search Console

**Not meaningful updates:**
- Changing a comma or fixing a typo (without substantive content change)
- Updating the publication date without changing any content
- Minor rephrasing of a single sentence

### 5.3 Content Audit Schedule

| Action | Frequency |
|---|---|
| Full site content audit | Annually |
| Service page review | Every 6 months |
| Blog post freshness check (top 20 performing posts) | Every 6 months |
| Identify and address declining traffic pages | Quarterly |
| Remove or consolidate underperforming thin content | Annually |

---

## 6. Duplicate Content Prevention

Duplicate content — identical or near-identical content appearing on multiple URLs — confuses Google's indexing systems, dilutes ranking authority, and can trigger quality penalties.

### 6.1 Types of Duplicate Content to Avoid

**Internal duplicates:**
- Multiple pages targeting the same keyword with near-identical content
- Location pages that use the same template copy with only the city name changed
- Category pages that replicate article content verbatim

**External duplicates:**
- Republishing a guest post word-for-word that was published elsewhere first (syndication without canonical)
- Copying content from a client's existing website onto their guest post
- Scraping or rephrasing competitor content

**Technical duplicates:**
- www and non-www versions of the same page both returning 200 OK
- HTTP and HTTPS versions both accessible
- URL parameter variations (e.g., `?ref=newsletter`) without canonical tags
- Paginated category pages without proper canonical or rel="next/prev" treatment

### 6.2 Duplicate Content Prevention Rules

- **One topic, one page** — if two drafts cover the same topic, they must be consolidated into one comprehensive page
- Location pages must contain at minimum 60% unique content specific to that location — not templated copy with only the city name swapped
- Canonical tags must be set correctly on every page (see `05-url-structure-rules.md`)
- Guest posts published elsewhere first must use a `rel="canonical"` pointing back to the original source, or the SecurityBlogs version must be substantially different
- Run Siteliner or Screaming Frog quarterly to identify internal duplication

---

## 7. AI-Generated Content Policy

AI writing tools (including ChatGPT, Claude, Gemini, and similar) may be used in the content production process at SecurityBlogs, subject to the following requirements. SecurityBlogs' position is that AI is a productivity tool, not a replacement for genuine expertise and editorial judgement.

### 7.1 Permitted Uses of AI

- Generating initial outlines or draft structures for editorial review
- Suggesting headline variations for A/B testing
- Drafting boilerplate sections (e.g., privacy policy language, standard disclaimers) for legal review
- Assisting with rephrasing or improving readability of human-written content
- Generating schema markup code from briefed parameters
- Brainstorming keyword clusters or content ideas for human evaluation

### 7.2 Requirements for AI-Assisted Content

All AI-assisted content must meet the following before publication:

**Mandatory editing:** AI-generated drafts must be substantially edited by a human writer or editor. "Substantially" means rewriting at minimum 40–50% of the content — not merely running spellcheck or changing a few words.

**Fact verification:** AI language models hallucinate — they generate plausible-sounding but incorrect information. Every factual claim in AI-drafted content must be independently verified against an authoritative Australian source before publication. No exceptions.

**Security industry accuracy check:** AI models have limited knowledge of Australian security industry specifics — licensing classes, ASIAL guidelines, state legislation, and industry terminology. These elements must be reviewed and corrected by a human with genuine industry knowledge.

**Author attribution:** AI-assisted content must still be attributed to a named human author who takes editorial responsibility for the content. Anonymous AI content is not permitted.

**Originality check:** Run AI-edited content through a plagiarism detection tool (e.g., Copyscape, Grammarly Plagiarism Checker) before publication. AI models sometimes reproduce training data verbatim.

**Brand voice alignment:** AI drafts frequently default to generic, American-English, and corporate language. Review all AI content against SecurityBlogs' brand voice guidelines and `07-australian-english-rules.md`.

### 7.3 Prohibited Uses of AI

- Publishing AI-generated content without substantive human editing
- Using AI to generate fake author bios, fabricated testimonials, or manufactured reviews
- Using AI to create content that purports to be based on first-hand experience when no such experience occurred
- Using AI to generate content designed to manipulate search rankings without genuine value to readers
- Using AI to spin or rephrase existing SecurityBlogs content to create duplicate pages

### 7.4 Disclosure

SecurityBlogs does not currently require a mandatory "AI-assisted" disclosure label on published content, provided the content has been substantively human-edited and verified. However, this policy is subject to change as industry standards and Google's requirements evolve.

Where AI has contributed substantially to content that was not significantly rewritten, a disclosure is recommended:

> *"This article was drafted with AI assistance and reviewed and edited by the SecurityBlogs editorial team."*

---

## 8. Plagiarism Rules

Plagiarism — using another party's content without permission or attribution — is a serious breach of editorial standards, copyright law, and Google's spam policies.

### 8.1 What Constitutes Plagiarism at SecurityBlogs

- Copying text from another website, publication, or document without permission
- Rephrasing another source so closely that the original structure and ideas are preserved with only words substituted
- Using stock phrases or passages from AI training-data reproduction (handled in Section 7.3)
- Using statistics or data without attributing the original source

### 8.2 Plagiarism Prevention Process

**Before submission:**
- Writers are required to submit original work
- Submissions are run through Copyscape Premium before editorial review

**Acceptable use of sources:**
- Quoting: Short quotes (up to 50 words) are acceptable with clear attribution and a link to the source
- Paraphrasing: Paraphrased ideas must be attributed to the source with a link, even if not directly quoted
- Statistics: Every statistic must include the source name, organisation, and year in-text or as a footnote

### 8.3 Consequence of Plagiarism

Content found to contain plagiarism is removed immediately. Writers who submit plagiarised content will not be commissioned again. Published content found to be plagiarised after publication is removed and a notice may be published at the URL explaining the removal.

---

## 9. Content Quality Checklist

Before publishing any piece of content, verify all of the following:

### Word Count and Depth
- [ ] Content meets the minimum word count for its page type
- [ ] Content is not padded — all words serve a purpose
- [ ] Topic is covered with genuine depth, not a surface-level overview
- [ ] At least one concrete example or real-world reference is included

### Fact-Checking
- [ ] All statistics are attributed to a named source
- [ ] All industry regulatory facts verified against Australian sources
- [ ] All SEO/digital marketing claims reflect current best practice
- [ ] No unverified or fabricated claims
- [ ] Fact-checking sign-off logged in the CMS

### Readability
- [ ] Flesch-Kincaid Grade Level is between 8 and 10
- [ ] Average sentence length is under 20 words
- [ ] Paragraphs are 2–4 sentences each
- [ ] Passive voice is under 15% of sentences
- [ ] Australian English spelling used throughout

### Images
- [ ] All images have descriptive alt text
- [ ] Alt text includes primary keyword where naturally applicable
- [ ] Alt text is 5–15 words
- [ ] Image files are named descriptively with hyphens

### Originality and AI Use
- [ ] Content has been run through Copyscape (no plagiarism detected)
- [ ] If AI-assisted: substantive human editing completed (40%+ rewritten)
- [ ] If AI-assisted: all facts independently verified
- [ ] If AI-assisted: security industry terminology checked and corrected
- [ ] Author attribution is to a named human editor responsible for the content

### Freshness and Maintenance
- [ ] Publication date is accurate
- [ ] Content reflects current information (not outdated stats or defunct tools)
- [ ] Scheduled for review in the content calendar at the appropriate freshness interval
- [ ] Internal links verified as live (no 404s)

### Duplicate Content
- [ ] No other page on SecurityBlogs covers the same topic with near-identical content
- [ ] If a location page: at minimum 60% content is unique to this location
- [ ] Canonical tag is correctly set
- [ ] Content does not replicate sourced material beyond short attributed quotes

---

*Part of the SecurityBlogs SEO Knowledge Base — 02 SEO Rules & Standards*  
*Last updated: June 2026 | Owner: SecurityBlogs Editorial Team / SEO Team*
