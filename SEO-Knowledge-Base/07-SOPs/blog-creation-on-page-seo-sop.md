# SOP: Blog Creation & On-Page SEO — SecurityBlogs Standard

**Version:** 1.0  
**Applies to:** All blog posts, guides, and Knowledge Hub articles on SecurityBlogs  
**Frequency:** Applied to every piece of content before publication

---

## BLOG CREATION WORKFLOW

### Stage 1: Brief & Planning (Before Writing)

**Step 1: Select the target keyword**
- Pull from the Keyword Database (04-Keyword-Database) or keyword research output
- Confirm: Is there already a page targeting this keyword? (Check for cannibalisation)
- Confirm: Does this fit into an existing content cluster? (06-Content-Clusters)

**Step 2: Research the SERP**
Search the target keyword in Google (Australian search — check you're seeing au.google.com results) and record:
- What types of content rank on page 1? (blog posts, guides, comparison pages, Q&As)
- What is the average word count of top-ranking pages?
- What headings do top-ranking pages use?
- What is the featured snippet (if any)?
- What questions appear in "People Also Ask"?
- Are there AI Overviews? What do they say?

**Step 3: Choose the right template**
Based on the keyword and SERP analysis, select from the Blog Templates folder (03-Blog-Templates):
- General SEO blog → `seo-blog-template.md`
- AI Visibility blog → `ai-visibility-blog-template.md`
- Security Industry blog → `security-industry-blog-template.md`
- Comparison page → `comparison-page-template.md`
- FAQ page → `faq-template.md`

**Step 4: Write the content brief**
Document:
- Primary keyword
- Secondary keywords (3–5)
- Target word count
- Heading outline (H1, H2s, H3s)
- Key points to cover
- Internal links to include (minimum 3)
- The CTA (which service page or action to drive readers toward)
- Schema types required

---

### Stage 2: Writing

**Step 5: Write the first draft**
Follow the selected template. Apply all tone of voice and content quality standards from `02-SEO-Rules-Standards`.

Key writing rules:
- Write in Australian English
- No AI-sounding filler sentences
- Short paragraphs (2–3 sentences)
- Active voice
- Specific examples from the security industry
- Include at least one data point or evidence-based claim

**Step 6: Include the primary keyword naturally**
- H1 — primary keyword present
- First paragraph (within first 100 words) — primary keyword mentioned
- At least 2 H2s — include primary keyword or close variant
- Body content — primary keyword appears naturally at a density of roughly 1–2% (not forced)
- Meta title — primary keyword present
- Meta description — primary keyword present

---

### Stage 3: On-Page SEO Optimisation

**Step 7: Meta title**
Format: `[Primary Keyword] | SecurityBlogs`
- Length: 50–60 characters
- Keyword at start where possible
- Unique title (not used on any other page)

**Step 8: Meta description**
Format: `[Hook/keyword]. [Value prop or stat]. [CTA].`
- Length: 140–158 characters
- Include primary keyword naturally
- Include a soft call to action
- Unique description (not used on any other page)

**Step 9: URL slug**
Format: `/knowledge-hub/[category]/[keyword-rich-slug]`
- All lowercase
- Hyphens between words
- No dates
- Keyword-rich but short

**Step 10: Heading structure**
- One H1 (primary keyword present)
- H2s cover major sections (3–6 per post)
- H3s subdivide H2 sections
- No heading levels skipped

**Step 11: Images**
- All images have descriptive alt text (include keyword where natural)
- Images use WebP format (convert before upload)
- Images have width and height attributes set
- Image file names are descriptive (`cctv-installation-sydney.webp` not `IMG_1234.webp`)

**Step 12: Internal links**
- Minimum 3 internal links in the body content
- Descriptive anchor text (no "click here")
- Link to at least one service page
- Link to the cluster pillar page (if this is a supporting post)
- Check: Are there existing pages that should link TO this new post? Update them.

---

### Stage 4: Schema Markup

**Step 13: Apply correct schema types**

Every blog post:
- `BlogPosting` schema — include headline, author, publisher, datePublished, dateModified, image, url

If the post has a FAQ section:
- `FAQPage` schema — include all Q&A pairs

Every page:
- `BreadcrumbList` schema — reflects the page's URL path

**Step 14: Validate schema**
- Go to Google Rich Results Test (`search.google.com/test/rich-results`)
- Enter the page URL (after publishing) or paste the HTML/JSON-LD
- Confirm: No errors, no warnings on required fields

---

### Stage 5: Final Review

**Step 15: Pre-publication checklist**
Go through the complete checklist from `02-SEO-Rules-Standards/content-quality-standards.md`:

- [ ] Word count meets minimum for this content type
- [ ] Australian English throughout
- [ ] No filler sentences or generic openers
- [ ] H1 with primary keyword
- [ ] Meta title 50–60 characters
- [ ] Meta description 140–158 characters with CTA
- [ ] URL correct format
- [ ] Minimum 3 internal links with descriptive anchor text
- [ ] Author byline with bio link
- [ ] Publication date set
- [ ] Images: alt text, WebP format, descriptive file names
- [ ] BlogPosting schema applied
- [ ] FAQPage schema applied (if FAQ section)
- [ ] BreadcrumbList schema applied
- [ ] Schema validated (no errors)
- [ ] CTA to relevant service page present
- [ ] Added to XML sitemap (auto-generated via sitemap.ts)

---

### Stage 6: Post-Publication

**Step 16: Submit for indexation**
- Open Google Search Console
- Go to URL Inspection
- Enter the new page URL
- Click "Request Indexing"
- Record the date of indexation request

**Step 17: Update existing internal links**
Review 3–5 existing pages that cover related topics and add an internal link to the new post from each one.

**Step 18: Record in content tracker**
Update the content calendar / tracker with:
- URL
- Publication date
- Target keyword
- Current ranking (check 7 days after publishing)
- Traffic (check 30, 60, 90 days after publishing)

---

## ON-PAGE SEO QUALITY CHECKLIST (QUICK REFERENCE)

| Element | Rule | Check |
|---|---|---|
| Meta title | 50–60 chars, primary keyword | ☐ |
| Meta description | 140–158 chars, keyword + CTA | ☐ |
| H1 | One per page, primary keyword | ☐ |
| URL | Lowercase, hyphens, keyword-rich, no dates | ☐ |
| Internal links | Min 3, descriptive anchor text | ☐ |
| Images | Alt text, WebP, descriptive filename | ☐ |
| Schema | BlogPosting + BreadcrumbList; FAQPage if FAQ | ☐ |
| Author | Byline + bio link visible | ☐ |
| Content quality | Min word count, original, specific, accurate | ☐ |
| Australian English | Spelling, date format, currency | ☐ |
| CTA | Relevant service page linked | ☐ |
| GSC | URL submitted for indexation | ☐ |
