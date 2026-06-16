# SOP: Off-Page SEO & Internal Linking — SecurityBlogs Standard

**Version:** 1.0  
**Applies to:** SecurityBlogs and all active security client campaigns

---

# PART A: OFF-PAGE SEO SOP

## PURPOSE

Off-page SEO builds the external authority signals that tell Google this website is trusted, relevant, and authoritative in the security industry. The primary mechanism is link building — earning links from other websites — combined with brand mention and entity signal building.

---

## OFF-PAGE SEO STRATEGY OVERVIEW

SecurityBlogs pursues three types of off-page authority signals:

1. **Editorial backlinks** — genuine links earned through content quality and outreach
2. **Industry directory listings** — structured citations from trusted security industry directories
3. **Brand entity signals** — mentions, citations, and relationships that build the knowledge graph entity

---

## LINK BUILDING PROCESS

### Phase 1: Link Profile Assessment

**Step 1: Baseline audit**
Using Ahrefs Site Explorer:
- Record: Domain Rating (DR), number of referring domains, total backlinks
- Export: All referring domains — filter out spam/toxic links
- Record: Top 10 linking domains by DR
- Compare: Link profile vs. top 3 competitors

**Step 2: Set link building targets**
Based on the gap between current DR and competitor DR:
- Aim for: X new referring domains per month (typically 5–15 for security SMEs)
- Target: Domains with DR 30+ in the security, technology, or marketing space
- Prioritise: .com.au and security industry domains for Australian clients

---

### Phase 2: Guest Posting Outreach

**Step 3: Identify guest posting targets**
Target publications that:
- Are relevant to the security industry OR the digital marketing space
- Have DR 30+ (use Ahrefs to check)
- Accept external contributions
- Are indexed by Google (not penalised)

**Australian security industry targets:**
- SecurityBlogs (for clients — securityblogs.com.au)
- SEN Magazine (sen.news)
- Security Insider (securityinsider.com.au)
- ASIAL publications and newsletter
- Physical security industry directories

**Digital marketing/SEO targets:**
- Marketing industry blogs (DR 40+)
- Tech publications with security sections
- Australian business publications that cover technology

**Step 4: Qualify targets**
For each potential target, verify:
- Domain is indexed (search `site:[domain.com]` in Google)
- DR 30+ (Ahrefs)
- Traffic is real (SimilarWeb or Ahrefs — check traffic isn't zero)
- No spam signals (check Ahrefs spam score; Moz spam score)
- Published content is relevant (read 5–10 recent posts)

**Step 5: Pitch outreach**
Email template framework:
```
Subject: Guest Post Pitch — [Topic] for [Publication Name]

Hi [Editor/Contact Name],

I'm [Name] from SecurityBlogs. I've been reading [Publication Name] for some time — particularly enjoyed [specific recent article].

I'd like to contribute a guest article on [proposed topic]. Here's why it would resonate with your readers: [1–2 sentences on relevance + value].

Proposed title: [Title that includes a target keyword]
Outline: [3–4 bullet point outline]
Word count: [1,000–1,500 words]

I can provide original, expert-level content specifically for [publication's audience]. I'll include relevant data and practical guidance — no fluff.

Would this be a fit for [Publication Name]?

Best,
[Name]
SecurityBlogs | securityblogs.com.au
```

**Step 6: Track outreach**
Record in a link building tracker:
- Target domain
- Contact name + email
- Date pitched
- Date followed up (follow up once after 7 days)
- Status (pitched / accepted / rejected / published)
- Published URL + anchor text

---

### Phase 3: Security Industry Directory Citations

**Step 7: Build security industry citations**
For Australian security clients, submit to:

| Directory | URL | Priority | Notes |
|---|---|---|---|
| Google Business Profile | business.google.com | Critical | Set up or claim; fully optimise |
| Bing Places | bingplaces.com | High | Import from GBP |
| Apple Maps Connect | mapsconnect.apple.com | High | Important for Apple users |
| ASIAL Member Directory | asial.com.au | High | Must be ASIAL member |
| Yellow Pages AU | yellowpages.com.au | High | Standard NAP listing |
| White Pages AU | whitepages.com.au | Medium | Standard NAP listing |
| True Local | truelocal.com.au | Medium | Consumer review platform |
| hipages | hipages.com.au | Medium | Trade contractor marketplace |
| Oneflare | oneflare.com.au | Medium | Trade contractor marketplace |
| Local Search | localsearch.com.au | Medium | Australian business directory |
| Hotfrog | hotfrog.com.au | Low | Supplementary citation |
| Cylectro | cylectro.com | Medium | Security industry specific |

**NAP consistency rule:**
Every listing must use identical Name, Address, Phone (NAP):
- Business name: Exactly as it appears on the website and ABN registration
- Address: If service-area business (no physical office), use service area — do NOT list a residential address
- Phone: Use the same number format on every listing (+61 411 212 418 or 0411 212 418 — choose one and be consistent)

**Step 8: Maintain citation accuracy**
- Review all citation listings annually
- Update immediately if business name, address, or phone changes
- Respond to all Google Business Profile reviews (good and bad) within 72 hours

---

### Phase 4: Digital PR & Brand Mentions

**Step 9: Identify brand mention opportunities**
- Google Alerts: Set alerts for "SecurityBlogs" and key team member names
- Ahrefs Alerts: Monitor for new unlinked brand mentions
- When an unlinked mention is found: contact the publisher and request a link be added

**Step 10: Earn PR coverage**
- Submit press releases for major announcements through `/publish-with-us/press-release`
- Target: Security industry media (SEN, Security Insider, ASIAL)
- Target: Technology media (ITWire, CRN Australia, ARN)
- Target: Business media when results are notable (SmartCompany, Dynamic Business)

---

## OFF-PAGE SEO MONTHLY TRACKER

Record monthly:
- New referring domains acquired: [X]
- New links acquired: [X]
- Current DR: [X]
- Domain gap vs. top competitor: [X DR points]
- Active outreach campaigns: [X]
- Guest posts published this month: [X]
- Citations updated/added: [X]

---

# PART B: INTERNAL LINKING SOP

## PURPOSE

Internal linking distributes PageRank from high-authority pages to priority commercial pages and helps Google understand the site's content architecture.

---

## MONTHLY INTERNAL LINK REVIEW PROCESS

### Step 1: Identify orphan pages
Using Screaming Frog:
1. Crawl the site
2. Export: All URLs
3. Cross-reference with inbound internal links report
4. Identify: Any page with zero internal links pointing to it
5. Action: Add links from 2–3 related pages to each orphan page

### Step 2: Identify priority pages needing more internal links
Priority pages are the 7 service pages + contact + AI visibility center + free tools.

For each priority page:
1. Check how many internal links currently point to it (Screaming Frog → Inlinks report)
2. Target: Service pages should have 10+ internal links pointing to them
3. Action: Find blog posts and other pages that cover related topics and add internal links

### Step 3: Review recently published content
For each new page published in the last 30 days:
1. Does it link to at least 3 internal pages? (Check outlinks)
2. Is it linked to from at least 2 existing pages? (Check inlinks)
3. Does it link to its cluster pillar page?
4. Does it link to a relevant service page?

### Step 4: Fix generic anchor text
In Screaming Frog, filter anchor text for: "click here", "read more", "here", "this page", "learn more"
- Each occurrence: Update the anchor text to be descriptive of the destination page
- Priority: Fix all generic anchors on service pages and pillar posts first

---

## INTERNAL LINKING DECISION FRAMEWORK

When writing new content, ask:

**Outbound links (this page → other pages):**
1. What service page is most relevant to link to? → Add it
2. What is the pillar page for this topic cluster? → Link to it
3. What 2–3 other posts are closely related? → Link to them with descriptive anchors

**Inbound links (other pages → this page):**
1. What are 3–5 existing pages that should reference this new content?
2. Go to each and add a contextual link with appropriate anchor text
3. Prioritise: High-traffic existing pages linking to new pages creates faster authority transfer
