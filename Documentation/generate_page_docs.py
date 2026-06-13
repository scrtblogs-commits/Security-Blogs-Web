"""
Generates per-page documentation files for the SecurityBlogs platform.
Each page gets a markdown file in Documentation/Markdown/PAGE_NN_<NAME>.md
covering all 15 required sections.
"""
from pathlib import Path
import textwrap

ROOT = Path(__file__).resolve().parent
MD = ROOT / 'Markdown'
MD.mkdir(parents=True, exist_ok=True)

# Per-page configuration. Each entry drives one PAGE_NN_<NAME>.md file.
# kind values: hub, detail, form, landing, legal, tool, listing
PAGES = [
    # ── Services ──────────────────────────────────────────────────────────
    {
        'n': 2, 'slug': 'services', 'url': '/services/',
        'title': 'Services Hub', 'kind': 'hub',
        'purpose': "Catalogue overview of all 7 service lines. Drives clicks into each service detail page and into /contact/.",
        'sections': ['Hero', 'Service Grid', 'Why us strip', 'CTA band', 'FAQs'],
        'key_collections': ['services', 'pages', 'settings'],
        'key_components': ['app/services/page.tsx', 'app/ServicesCardStack.tsx', 'components/modules/ModuleRenderer.tsx'],
        'forms': [],
        'notes': "Reads all 7 published services from CMS. Page itself is a CMS Page record with slug='services'.",
    },
    {
        'n': 3, 'slug': 'security-seo', 'url': '/services/security-seo/',
        'title': 'Security SEO', 'kind': 'detail',
        'purpose': "Service detail page for the Security SEO offering. Hero, capabilities (with previewVariants), process, stats, FAQs, benefits.",
        'sections': ['Hero', 'Capabilities grid', 'Process steps', 'Stat band', 'FAQs', 'Benefits + CTA band'],
        'key_collections': ['services', 'media', 'settings'],
        'key_components': ['app/services/security-seo/page.tsx', 'app/services/security-seo/*.tsx', 'components/modules/blocks/CapabilitiesBlock.tsx'],
        'forms': [],
        'notes': "Currently a legacy hand-built folder. Phase C.2 deletes it so the dynamic app/services/[slug]/ takes over.",
    },
    {
        'n': 4, 'slug': 'aio', 'url': '/services/aio/',
        'title': 'AIO (AI Optimisation)', 'kind': 'detail',
        'purpose': "Service detail page for AI Optimisation. Pipeline visual + capabilities specific to ChatGPT/Perplexity/Gemini citation.",
        'sections': ['Hero', 'AIO pipeline diagram', 'Capabilities (themed previews)', 'Process', 'Stats', 'FAQs', 'CTA band'],
        'key_collections': ['services', 'media', 'settings'],
        'key_components': ['app/services/aio/page.tsx', 'app/services/aio/*.tsx'],
        'forms': [],
        'notes': "Has the most elaborate per-capability themed previews (JSON-LD code, knowledge panels, signal meters).",
    },
    {
        'n': 5, 'slug': 'aeo', 'url': '/services/aeo/',
        'title': 'AEO (Answer Engine Optimisation)', 'kind': 'detail',
        'purpose': "Service detail for AEO — winning featured snippets, Q&A markup, voice search.",
        'sections': ['Hero', 'Capabilities', 'Process', 'Stats', 'FAQs', 'CTA band'],
        'key_collections': ['services', 'media', 'settings'],
        'key_components': ['app/services/aeo/page.tsx', 'app/services/aeo/*.tsx'],
        'forms': [],
        'notes': "previewVariants used: answer-box, featured-snippet, faq-schema, voice.",
    },
    {
        'n': 6, 'slug': 'geo', 'url': '/services/geo/',
        'title': 'GEO (Generative Engine Optimisation)', 'kind': 'detail',
        'purpose': "Service detail for GEO + Australia capital-city map widget showing pulsing pins.",
        'sections': ['Hero', 'Australia GEO map', 'Capabilities', 'Process', 'Stats', 'FAQs', 'CTA band'],
        'key_collections': ['services', 'media', 'settings'],
        'key_components': ['app/services/geo/page.tsx', 'app/services/geo/AustraliaMap.tsx (or similar)'],
        'forms': [],
        'notes': "Uses Mapbox token. Map renders 8-capital pulsing pins (Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, Hobart, Darwin).",
    },
    {
        'n': 7, 'slug': 'google-ads', 'url': '/services/google-ads/',
        'title': 'Google Ads for Security', 'kind': 'detail',
        'purpose': "Service detail for Google Ads. Live ad-metrics preview, conversion funnel, remarketing visuals.",
        'sections': ['Hero', 'Live ad metrics demo', 'Capabilities (funnel, remarketing)', 'Process', 'Stats', 'FAQs', 'CTA band'],
        'key_collections': ['services', 'media', 'settings'],
        'key_components': ['app/services/google-ads/page.tsx', 'app/services/google-ads/*.tsx'],
        'forms': [],
        'notes': "Live ad-metrics widget proposed to pull from Supermetrics MCP in Phase D; currently hardcoded.",
    },
    {
        'n': 8, 'slug': 'bing-ads', 'url': '/services/bing-ads/',
        'title': 'Bing Ads / Microsoft Ads', 'kind': 'detail',
        'purpose': "Service detail for Microsoft Bing Ads. CPC comparison, LinkedIn audience targeting (Microsoft owns LinkedIn).",
        'sections': ['Hero', 'CPC comparison', 'LinkedIn audience targeting', 'Capabilities', 'Process', 'Stats', 'FAQs', 'CTA band'],
        'key_collections': ['services', 'media', 'settings'],
        'key_components': ['app/services/bing-ads/page.tsx', 'app/services/bing-ads/*.tsx'],
        'forms': [],
        'notes': "previewVariants used: cpc, linkedin, b2b.",
    },
    {
        'n': 9, 'slug': 'web-design', 'url': '/services/web-design/',
        'title': 'Web Design', 'kind': 'detail',
        'purpose': "Service detail for Web Design. Browser mock, WP editor mock, Core Web Vitals, Clarity heatmap.",
        'sections': ['Hero', 'Browser mock', 'CWV preview', 'Capabilities', 'Process', 'Stats', 'FAQs', 'CTA band'],
        'key_collections': ['services', 'media', 'settings'],
        'key_components': ['app/services/web-design/page.tsx', 'app/services/web-design/*.tsx'],
        'forms': [],
        'notes': "previewVariants: browser, wp-editor, cwv, clarity.",
    },
    # ── Knowledge Hub ─────────────────────────────────────────────────────
    {
        'n': 10, 'slug': 'knowledge-hub', 'url': '/knowledge-hub/',
        'title': 'Knowledge Hub Index', 'kind': 'hub',
        'purpose': "Top-level index linking to the 6 category landings + definitions glossary.",
        'sections': ['Hero', 'Category grid', 'Recent posts strip', 'CTA band'],
        'key_collections': ['posts', 'pages', 'settings'],
        'key_components': ['app/knowledge-hub/page.tsx'],
        'forms': [],
        'notes': "Currently hardcoded categories. Phase C.2: reads recent posts via getPosts({limit: 12}).",
    },
    {
        'n': 11, 'slug': 'blog', 'url': '/knowledge-hub/blogs/',
        'title': 'Blog Listing', 'kind': 'listing',
        'purpose': "Lists all Posts with category='blog'.",
        'sections': ['Hero', 'Filter chips', 'Post grid', 'Pagination'],
        'key_collections': ['posts', 'media', 'users'],
        'key_components': ['app/knowledge-hub/blogs/page.tsx', 'app/knowledge-hub/blogs/BlogGrid.tsx'],
        'forms': [],
        'notes': "Posts read via getPosts({category: 'blog', limit: 50}). Detail pages live at /knowledge-hub/blog/[slug]/.",
    },
    {
        'n': 12, 'slug': 'definitions-glossary', 'url': '/knowledge-hub/definitions-glossary/',
        'title': 'Definitions & Glossary', 'kind': 'landing',
        'purpose': "A–Z glossary of security + SEO terms.",
        'sections': ['Hero', 'A-Z anchors', 'Term cards', 'CTA band'],
        'key_collections': ['posts', 'pages'],
        'key_components': ['app/knowledge-hub/definitions-glossary/page.tsx'],
        'forms': [],
        'notes': "Currently hardcoded glossary. Could migrate to Posts with category='definitions-glossary' or stay as a Page with rich-text blocks.",
    },
    {
        'n': 13, 'slug': 'industry-news', 'url': '/knowledge-hub/industry-news/',
        'title': 'Industry News', 'kind': 'listing',
        'purpose': "Curated security industry news, with tabbed view by source/type.",
        'sections': ['Hero', 'News tabs', 'News cards', 'CTA band'],
        'key_collections': ['posts', 'media', 'users'],
        'key_components': ['app/knowledge-hub/industry-news/page.tsx', 'app/knowledge-hub/industry-news/NewsTabs.tsx'],
        'forms': [],
        'notes': "Posts read via getPosts({category: 'industry-news'}).",
    },
    {
        'n': 14, 'slug': 'research-reports', 'url': '/knowledge-hub/research-reports/',
        'title': 'Research Reports', 'kind': 'listing',
        'purpose': "Long-form research deliverables, gated-download capable.",
        'sections': ['Hero', 'Report cards', 'Download CTAs', 'CTA band'],
        'key_collections': ['posts', 'media'],
        'key_components': ['app/knowledge-hub/research-reports/page.tsx'],
        'forms': ['Download form (email gate)'],
        'notes': "Gated-download form posts to /api/leads with source='research-download'.",
    },
    {
        'n': 15, 'slug': 'security-guides', 'url': '/knowledge-hub/security-guides/',
        'title': 'Security Guides', 'kind': 'listing',
        'purpose': "How-to guides for security industry professionals.",
        'sections': ['Hero', 'Guide grid', 'CTA band'],
        'key_collections': ['posts', 'media'],
        'key_components': ['app/knowledge-hub/security-guides/page.tsx'],
        'forms': [],
        'notes': "Posts read via getPosts({category: 'security-guides'}).",
    },
    {
        'n': 16, 'slug': 'security-industry-seo', 'url': '/knowledge-hub/security-industry-seo/',
        'title': 'Security Industry SEO (Pillar)', 'kind': 'landing',
        'purpose': "Pillar page linking together every security-industry SEO topic.",
        'sections': ['Hero', 'Topic clusters', 'Featured posts', 'CTA band'],
        'key_collections': ['posts', 'pages', 'services'],
        'key_components': ['app/knowledge-hub/security-industry-seo/page.tsx'],
        'forms': [],
        'notes': "SEO-critical pillar page. AI Visibility group heavily populated.",
    },
    {
        'n': 17, 'slug': 'security-trends-2026', 'url': '/knowledge-hub/security-trends-2026/',
        'title': 'Security Trends 2026', 'kind': 'landing',
        'purpose': "Year-in-review and forward-looking trends report.",
        'sections': ['Hero', 'Trend tabs', 'Trend cards', 'CTA band'],
        'key_collections': ['posts', 'pages'],
        'key_components': ['app/knowledge-hub/security-trends-2026/page.tsx', 'app/knowledge-hub/security-trends-2026/TrendTabs.tsx'],
        'forms': [],
        'notes': "Tabbed UX; each tab loads a sub-topic.",
    },
    # ── Publish With Us ───────────────────────────────────────────────────
    {
        'n': 18, 'slug': 'publish-with-us', 'url': '/publish-with-us/',
        'title': 'Publish With Us Hub', 'kind': 'hub',
        'purpose': "Hub linking to the 7 monetisation surfaces (guest posting, sponsored, advertise, press release, backlinks, product promo, pricing).",
        'sections': ['Hero', 'Tilt cards (7 options)', 'CTA band', 'FAQs'],
        'key_collections': ['pages', 'settings'],
        'key_components': ['app/publish-with-us/page.tsx', 'app/publish-with-us/TiltCard.tsx'],
        'forms': [],
        'notes': "Tilt cards link to each detail page.",
    },
    {
        'n': 19, 'slug': 'advertise', 'url': '/publish-with-us/advertise/',
        'title': 'Advertise With Us', 'kind': 'landing',
        'purpose': "Advertise on SecurityBlogs — display ads, sponsored sections, newsletter sponsorship.",
        'sections': ['Hero', 'Ad inventory', 'Pricing grid', 'CTA band'],
        'key_collections': ['pages', 'settings'],
        'key_components': ['app/publish-with-us/advertise/page.tsx'],
        'forms': ['Inquiry form'],
        'notes': "Inquiry form posts to /api/leads with source='advertise'.",
    },
    {
        'n': 20, 'slug': 'backlink-packages', 'url': '/publish-with-us/backlink-packages/',
        'title': 'Sponsored Editorial Placements', 'kind': 'landing',
        'purpose': "Sponsored editorial placements (was 'backlink packages' but renamed for compliance).",
        'sections': ['Hero', 'Package tiers', 'FAQ', 'CTA band'],
        'key_collections': ['pages', 'settings'],
        'key_components': ['app/publish-with-us/backlink-packages/page.tsx'],
        'forms': ['Inquiry form'],
        'notes': "Avoid using DA50+/DA60+/DA65+ phrasing per legal review.",
    },
    {
        'n': 21, 'slug': 'guest-posting', 'url': '/publish-with-us/guest-posting/',
        'title': 'Guest Posting', 'kind': 'form',
        'purpose': "Submit a guest post pitch. Form includes title, summary, author bio, target keyword, URL to author profile.",
        'sections': ['Hero', 'Editorial criteria', 'Submission form', 'FAQ'],
        'key_collections': ['leads', 'users', 'audit_log'],
        'key_components': ['app/publish-with-us/guest-posting/page.tsx', 'app/publish-with-us/guest-posting/GuestPostForm.tsx'],
        'forms': ['Guest post submission'],
        'notes': "Form posts to /api/leads with source='guest-post', meta includes author profile URL + target keyword.",
    },
    {
        'n': 22, 'slug': 'press-release', 'url': '/publish-with-us/press-release/',
        'title': 'Press Release Distribution', 'kind': 'landing',
        'purpose': "Press release distribution service for security industry brands.",
        'sections': ['Hero', 'How it works', 'Pricing', 'FAQ', 'CTA band'],
        'key_collections': ['pages', 'settings'],
        'key_components': ['app/publish-with-us/press-release/page.tsx'],
        'forms': ['Inquiry form'],
        'notes': "Inquiry form posts to /api/leads with source='press-release'.",
    },
    {
        'n': 23, 'slug': 'pricing-guidelines', 'url': '/publish-with-us/pricing-guidelines/',
        'title': 'Pricing & Guidelines', 'kind': 'landing',
        'purpose': "Master rate card. Lists every publish-with-us option with starting price + lead time.",
        'sections': ['Hero', 'Rate card table', 'Editorial guidelines', 'CTA band'],
        'key_collections': ['pages', 'settings'],
        'key_components': ['app/publish-with-us/pricing-guidelines/page.tsx'],
        'forms': [],
        'notes': "No DA-numeric phrasing anywhere. Stays compliant per legal review.",
    },
    {
        'n': 24, 'slug': 'product-promotion', 'url': '/publish-with-us/product-promotion/',
        'title': 'Product Promotion', 'kind': 'landing',
        'purpose': "Product promotion service (review articles, comparison pieces, feature mentions).",
        'sections': ['Hero', 'Promo formats', 'Pricing', 'Sample placements', 'CTA band'],
        'key_collections': ['pages', 'settings'],
        'key_components': ['app/publish-with-us/product-promotion/page.tsx'],
        'forms': ['Inquiry form'],
        'notes': "Inquiry form posts to /api/leads with source='product-promotion'.",
    },
    {
        'n': 25, 'slug': 'sponsored-posts', 'url': '/publish-with-us/sponsored-posts/',
        'title': 'Sponsored Posts', 'kind': 'landing',
        'purpose': "Sponsored post placement — branded content that maintains editorial quality bar.",
        'sections': ['Hero', 'Quality bar', 'Pricing', 'Sample posts', 'CTA band'],
        'key_collections': ['pages', 'settings'],
        'key_components': ['app/publish-with-us/sponsored-posts/page.tsx'],
        'forms': ['Inquiry form'],
        'notes': "Inquiry form posts to /api/leads with source='sponsored-post'.",
    },
    # ── Company / utility ─────────────────────────────────────────────────
    {
        'n': 26, 'slug': 'about-us', 'url': '/about-us/',
        'title': 'About Us', 'kind': 'landing',
        'purpose': "Brand story, mission, team, values.",
        'sections': ['Hero', 'Mission statement', 'Values grid', 'Team strip', 'CTA band'],
        'key_collections': ['pages', 'settings'],
        'key_components': ['app/about-us/page.tsx'],
        'forms': [],
        'notes': "Phase C.2: convert to CMS Page with values + cta-band blocks.",
    },
    {
        'n': 27, 'slug': 'contact', 'url': '/contact/',
        'title': 'Contact', 'kind': 'form',
        'purpose': "Primary contact + free-audit request form. Most-used form on the site.",
        'sections': ['Hero', 'Contact form', 'Direct contact info', 'Map (HQ)', 'Office hours'],
        'key_collections': ['leads', 'users', 'audit_log', 'settings'],
        'key_components': ['app/contact/page.tsx', 'components/ui/ContactForm.tsx'],
        'forms': ['Contact form'],
        'notes': "Form posts to /api/leads with source='contact-form'. Honeypot + Turnstile + rate limit applied.",
    },
    {
        'n': 28, 'slug': 'case-studies', 'url': '/case-studies/',
        'title': 'Case Studies Index', 'kind': 'listing',
        'purpose': "Grid of all published case studies. Each card links to /case-studies/<slug>/.",
        'sections': ['Hero', 'Case study grid', 'Filter chips', 'CTA band'],
        'key_collections': ['case_studies', 'partners', 'services', 'media'],
        'key_components': ['app/case-studies/page.tsx', 'app/case-studies/CaseGrid.tsx'],
        'forms': [],
        'notes': "Reads via getCaseStudies(). Detail pages at app/case-studies/[slug]/ already CMS-driven.",
    },
    {
        'n': 29, 'slug': 'security-directory', 'url': '/security-directory/',
        'title': 'Security Directory', 'kind': 'listing',
        'purpose': "Directory of partner / community / vendor brands in the security industry.",
        'sections': ['Hero', 'Filter sidebar', 'Partner cards', 'Featured strip'],
        'key_collections': ['partners', 'services'],
        'key_components': ['app/security-directory/page.tsx'],
        'forms': [],
        'notes': "Reads via getPartners() with type filter. AU-region partners surface first.",
    },
    {
        'n': 30, 'slug': 'ai-visibility-center', 'url': '/ai-visibility-center/',
        'title': 'AI Visibility Center', 'kind': 'tool',
        'purpose': "Flagship interactive: score calculator + orbital timeline of AI engine launches.",
        'sections': ['Hero', 'Score calculator widget', 'Orbital timeline', 'CTA band'],
        'key_collections': ['leads', 'ai_scores'],
        'key_components': ['app/ai-visibility-center/page.tsx', 'app/ai-visibility-center/ScoreCalculator.tsx', 'app/ai-visibility-center/OrbitalTimeline.tsx'],
        'forms': ['Score request form'],
        'notes': "Score widget currently hardcoded. Phase C.2/D: POST /api/ai-score wired to Ahrefs Brand Radar MCP.",
    },
    {
        'n': 31, 'slug': 'free-tools', 'url': '/free-tools/',
        'title': 'Free Tools Hub', 'kind': 'tool',
        'purpose': "Free tools collection: Visibility Checker (form), AI Visibility Checklist (download), Guides tabs.",
        'sections': ['Hero', 'Visibility Checker widget', 'Checklist download', 'Guides tabs', 'CTA band'],
        'key_collections': ['leads', 'media'],
        'key_components': ['app/free-tools/page.tsx', 'app/free-tools/VisibilityChecker.tsx', 'app/free-tools/Checklist.tsx', 'app/free-tools/GuidesTabs.tsx'],
        'forms': ['Visibility Checker', 'Checklist email gate'],
        'notes': "Visibility Checker posts to /api/leads with source='visibility-checker' and meta.domain + meta.score.",
    },
    {
        'n': 32, 'slug': 'career', 'url': '/career/',
        'title': 'Career', 'kind': 'form',
        'purpose': "Job openings + applicant submission with CV upload.",
        'sections': ['Hero', 'Open roles grid', 'Culture strip', 'Application form'],
        'key_collections': ['leads', 'media', 'users'],
        'key_components': ['app/career/page.tsx', 'app/career/ApplicationForm.tsx'],
        'forms': ['Job application'],
        'notes': "Application form posts to /api/leads with source='career'. CV upload requires multipart /api/leads/upload (Phase C.2). Currently stores filename string only.",
    },
    {
        'n': 33, 'slug': 'book-strategy-call', 'url': '/book-strategy-call/',
        'title': 'Book Strategy Call', 'kind': 'form',
        'purpose': "30-minute discovery call booking.",
        'sections': ['Hero', 'Time slot picker', 'Booking form', 'What you get strip'],
        'key_collections': ['leads', 'settings'],
        'key_components': ['app/book-strategy-call/page.tsx'],
        'forms': ['Booking form'],
        'notes': "Booking form posts to /api/leads with source='booking' and meta.slot. Time slots read from Settings.booking.bookingSlots.",
    },
    {
        'n': 34, 'slug': 'privacy-policy', 'url': '/privacy-policy/',
        'title': 'Privacy Policy', 'kind': 'legal',
        'purpose': "Privacy policy disclosure — GDPR + Australian Privacy Principles compliant.",
        'sections': ['Hero', 'Sections (rich-text)', 'Contact info', 'Last updated date'],
        'key_collections': ['pages', 'settings'],
        'key_components': ['app/privacy-policy/page.tsx'],
        'forms': [],
        'notes': "Long-form rich-text page. Phase C.2: migrate to CMS Page with rich-text blocks. Last-updated date auto-stamps on publish.",
    },
    {
        'n': 35, 'slug': 'terms-of-service', 'url': '/terms-of-service/',
        'title': 'Terms of Service', 'kind': 'legal',
        'purpose': "Terms of service / terms of use for the website + paid services.",
        'sections': ['Hero', 'Sections (rich-text)', 'Contact info', 'Last updated date'],
        'key_collections': ['pages', 'settings'],
        'key_components': ['app/terms-of-service/page.tsx (TBD if exists; verify before edit)'],
        'forms': [],
        'notes': "Long-form rich-text page. Same migration pattern as Privacy Policy.",
    },
    {
        'n': 36, 'slug': 'content-guidelines', 'url': '/content-guidelines/',
        'title': 'Content Guidelines', 'kind': 'legal',
        'purpose': "Editorial standards for guest posts + sponsored content.",
        'sections': ['Hero', 'Guidelines (rich-text)', 'Submission flow', 'Contact info'],
        'key_collections': ['pages', 'settings'],
        'key_components': ['app/content-guidelines/page.tsx'],
        'forms': [],
        'notes': "Referenced from /publish-with-us/* pages. Must stay in sync with editorial standards.",
    },
]


def render_md(p: dict) -> str:
    sections = p.get('sections', [])
    cols = p.get('key_collections', [])
    comps = p.get('key_components', [])
    forms = p.get('forms', [])
    has_form = bool(forms)
    is_legal = p['kind'] == 'legal'
    is_form = p['kind'] == 'form' or has_form
    is_listing = p['kind'] == 'listing'
    is_detail = p['kind'] == 'detail'
    is_hub = p['kind'] == 'hub'
    is_landing = p['kind'] == 'landing'
    is_tool = p['kind'] == 'tool'

    # Build per-page parts
    section_rows = '\n'.join(
        f'| {i+1} | {s} | {get_default_type(s)} |' for i, s in enumerate(sections)
    )

    airtable_table = f"SB · {p['n']:02d} · {p['title']}"

    db_rows = '\n'.join(
        f'| `{c}` | {db_purpose(c, p)} |' for c in cols
    )

    api_rows = build_api_rows(p, has_form, is_detail, is_listing, is_hub, is_landing, is_tool)

    request_schemas = build_request_schemas(p, has_form, is_tool)
    response_schemas = build_response_schemas(p, is_detail, is_listing, has_form)

    react_rows = '\n'.join(
        f'| `{c}` | { react_purpose(c) } |' for c in comps + ([
            'components/layout/Navbar.tsx',
            'components/layout/Footer.tsx',
        ] if True else [])
    )

    node_rows = build_node_rows(p, has_form)
    env_rows = build_env_rows(p, has_form)
    validation_rows = build_validation_rows(p, has_form)
    auth_rows = build_auth_rows(p, has_form)
    deploy_notes = build_deploy_notes(p, has_form)
    testing = build_testing(p, has_form, is_tool)
    troubleshooting = build_troubleshooting(p, has_form)
    change_impact = build_change_impact(p)
    rollback = build_rollback(p)

    forms_section = ''
    if has_form:
        forms_section = '\n\n## Forms\n\n' + '\n'.join(
            f'- **{f}** — posts to `/api/leads` (see Request/Response schemas)' for f in forms
        )

    return f"""# PAGE_{p['n']:02d}_{p['slug'].upper().replace('-', '_')}

**URL:** `https://securityblogs.com.au{p['url']}`
**Airtable table:** `{airtable_table}`
**Page kind:** {p['kind']}
**Sections in spec:** {len(sections)}

---

## Business Purpose

{p['purpose']}

## Sections (top to bottom)

| # | Section | Block type |
|---|---|---|
{section_rows}

## Airtable Tables

| Table | Use |
|---|---|
| `{airtable_table}` | Per-section spec for `{p['url']}` (one row per section) |
| `SB · 00 · Pages Index` | Master index entry |
| `SB · DOCS · Index` (proposed) | Links this MD/PDF to the Airtable page record |

## PostgreSQL Tables (used by this page)

| Table | Use |
|---|---|
{db_rows}

## API Endpoints

| Endpoint | Method | Cached | Purpose |
|---|---|---|---|
{api_rows}

## Request Schemas

{request_schemas}

## Response Schemas

{response_schemas}

## React Components

| Component | Purpose |
|---|---|
{react_rows}
| `components/layout/Navbar.tsx` | Shared header |
| `components/layout/Footer.tsx` | Shared footer |

## Node.js Services

| Service / module | Purpose |
|---|---|
{node_rows}

## Environment Variables

| Var | Required? | Purpose |
|---|---|---|
{env_rows}

## Validation Rules

{validation_rows}

## Authentication Rules

{auth_rows}

## Deployment Notes

{deploy_notes}

## Testing Procedures

{testing}

## Troubleshooting

{troubleshooting}

## Change Impact Analysis

{change_impact}

## Rollback Procedures

{rollback}{forms_section}

---

*Notes:* {p.get('notes', '—')}

*End of PAGE_{p['n']:02d}_{p['slug'].upper().replace('-', '_')}.md*
"""


def get_default_type(name: str) -> str:
    n = name.lower()
    if 'hero' in n: return 'hero'
    if 'cta band' in n or 'cta-band' in n: return 'cta-band'
    if 'stat' in n: return 'stats'
    if 'faq' in n: return 'faqs'
    if 'capabilit' in n: return 'capabilities'
    if 'process' in n: return 'process-steps'
    if 'values' in n or 'values' in n: return 'values'
    if 'image' in n or 'logo' in n: return 'image'
    if 'form' in n: return 'form (client component)'
    if 'tool' in n or 'widget' in n or 'calculator' in n: return 'client widget'
    if 'tab' in n: return 'tabs (client)'
    if 'grid' in n or 'card' in n: return 'grid (server)'
    return 'rich-text'


def db_purpose(col: str, p: dict) -> str:
    is_detail_or_listing = p['kind'] in ('detail', 'listing')
    is_legal_or_landing = p['kind'] in ('legal', 'landing', 'hub')
    purposes = {
        'pages': 'Page record + module blocks (Phase C.2 migration target)',
        'services': 'Service catalogue + per-card data',
        'case_studies': 'Case study cards / detail content',
        'partners': 'Partner directory cards',
        'posts': 'Listing + post cards',
        'media': 'Image attachments (hero, covers, logos)',
        'settings': 'Brand, contact, footer, GTM injection',
        'leads': 'Form submissions land here as new Lead records',
        'users': 'Author of posts, assignee of leads',
        'redirects': 'Middleware-applied redirects',
        'audit_log': 'Phase E — change tracking',
        'ai_scores': 'Phase C.2/D — AI visibility computed score cache',
    }
    return purposes.get(col, col)


def build_api_rows(p: dict, has_form: bool, is_detail: bool, is_listing: bool, is_hub: bool, is_landing: bool, is_tool: bool) -> str:
    rows = []
    cols = p.get('key_collections', [])
    if 'pages' in cols:
        rows.append(f"| `GET /api/pages?where[slug][equals]={p['slug']}` | GET | ISR 60s | Page record + modules |")
    if 'services' in cols and is_detail:
        rows.append(f"| `GET /api/services?where[slug][equals]={p['slug']}` | GET | ISR 60s | Service record |")
    elif 'services' in cols:
        rows.append("| `GET /api/services?where[status][equals]=published` | GET | ISR 60s | Service list |")
    if 'case_studies' in cols and is_listing:
        rows.append("| `GET /api/case-studies?where[status][equals]=published` | GET | ISR 60s | Case study list |")
    if 'partners' in cols:
        rows.append("| `GET /api/partners?where[status][equals]=active` | GET | ISR 60s | Partner list |")
    if 'posts' in cols and is_listing:
        rows.append(f"| `GET /api/posts?where[category][equals]={p['slug']}` | GET | ISR 60s | Post list |")
    elif 'posts' in cols:
        rows.append("| `GET /api/posts?where[status][equals]=published&limit=12` | GET | ISR 60s | Recent posts strip |")
    rows.append("| `GET /api/globals/settings` | GET | ISR 600s | Brand + contact + footer |")
    rows.append("| `GET /api/redirects?where[isActive][equals]=true` | GET (middleware) | 60s mem | Redirect rules |")
    if has_form:
        rows.append("| `POST /api/leads` | POST | dynamic | Form submission |")
    if 'ai_scores' in cols:
        rows.append("| `POST /api/ai-score` (proposed) | POST | dynamic | Compute + persist visibility score |")
    return '\n'.join(rows)


def build_request_schemas(p: dict, has_form: bool, is_tool: bool) -> str:
    if not has_form and not is_tool:
        return 'No request body — this page only consumes GET endpoints.'

    form_slug = p['slug'].replace('-', '_')
    if 'ai-visibility' in p['slug']:
        source = 'visibility-checker'
        meta_example = '{ "domain": "example.com" }'
    elif 'free-tools' in p['slug']:
        source = 'visibility-checker'
        meta_example = '{ "domain": "example.com" }'
    elif 'career' in p['slug']:
        source = 'career'
        meta_example = '{ "position": "Senior Engineer", "cv_url": "[file: cv.pdf]" }'
    elif 'guest-posting' in p['slug']:
        source = 'guest-post'
        meta_example = '{ "title": "...", "summary": "...", "authorProfileUrl": "https://..." }'
    elif 'book-strategy' in p['slug']:
        source = 'booking'
        meta_example = '{ "slot": "Tue 10:00 AM" }'
    elif 'advertise' in p['slug']:
        source = 'advertise'
        meta_example = '{ "interestedIn": "display ads" }'
    elif 'sponsored' in p['slug']:
        source = 'sponsored-post'
        meta_example = '{ "topicIdea": "..." }'
    elif 'product-promotion' in p['slug']:
        source = 'product-promotion'
        meta_example = '{ "productUrl": "https://..." }'
    elif 'press-release' in p['slug']:
        source = 'press-release'
        meta_example = '{ "title": "...", "embargoDate": "..." }'
    elif 'backlink' in p['slug']:
        source = 'sponsored-editorial'
        meta_example = '{ "tier": "standard" }'
    elif 'research-reports' in p['slug']:
        source = 'research-download'
        meta_example = '{ "reportSlug": "..." }'
    else:
        source = 'contact-form'
        meta_example = '{ }'

    return f"""### `POST /api/leads`

```json
{{
  "name": "string (1-120 chars, required)",
  "email": "string (valid format, required)",
  "phone": "string (optional)",
  "company": "string (optional)",
  "subject": "string (optional)",
  "message": "string (optional, max 2000 chars)",
  "source": "{source}",
  "meta": {meta_example},
  "cf-turnstile-response": "string (Cloudflare token, required in production)",
  "company_url": "string (honeypot — must be empty)"
}}
```
"""


def build_response_schemas(p: dict, is_detail: bool, is_listing: bool, has_form: bool) -> str:
    parts = []

    if is_detail and 'services' in p.get('key_collections', []):
        parts.append(f"""### `GET /api/services?where[slug][equals]={p['slug']}`

```json
{{
  "docs": [{{
    "id": "rec…",
    "slug": "{p['slug']}",
    "title": "{p['title']}",
    "shortDesc": "...",
    "intro": "...",
    "accentColor": "#1e5fe0",
    "capabilities": [{{ "title": "...", "description": "...", "previewVariant": "schema" }}],
    "processSteps": [...],
    "stats": [...],
    "faqs": [...],
    "benefits": [...],
    "status": "published"
  }}],
  "totalDocs": 1
}}
```""")

    if is_listing or 'pages' in p.get('key_collections', []):
        parts.append("""### `GET /api/pages?where[slug][equals]=…`

```json
{
  "docs": [{
    "id": "rec…",
    "slug": "%s",
    "title": "%s",
    "modules": [
      { "blockType": "hero", "h1": "...", "subtitle": "...", "ctas": [...] },
      { "blockType": "rich-text", "title": "...", "body": { /* Lexical JSON */ } }
    ],
    "status": "published"
  }],
  "totalDocs": 1
}
```""" % (p['slug'], p['title']))

    if has_form:
        parts.append("""### `POST /api/leads`

```json
// 200 OK
{ "ok": true, "id": "rec…" }

// 400 Bad Request
{ "ok": false, "error": "Email looks invalid" }

// 429 Too Many Requests
{ "ok": false, "error": "Too many submissions. Please wait 15 minutes and try again." }

// 502 Bad Gateway (CMS write rejected)
{ "ok": false, "error": "Could not save your enquiry. Please try again." }
```""")

    if not parts:
        return 'Standard Payload envelope: `{ docs, totalDocs, limit, page, totalPages }`'
    return '\n\n'.join(parts)


def react_purpose(path: str) -> str:
    name = path.split('/')[-1].split('.')[0]
    if name.lower().endswith('page'):
        return 'Server component — fetches CMS data, renders'
    if 'Form' in name:
        return 'Client component — handles submit, calls submitForm()'
    if 'Calculator' in name:
        return 'Client widget — interactive scoring'
    if 'Map' in name:
        return 'Client component — Mapbox/GMaps integration'
    if 'Card' in name or 'Grid' in name:
        return 'Server component — list rendering'
    if 'Tabs' in name:
        return 'Client component — interactive tabs'
    return 'Component used on this page'


def build_node_rows(p: dict, has_form: bool) -> str:
    rows = [
        '| `lib/cms.ts` | Typed Payload REST client — all reads |',
        '| `middleware.ts` | Edge middleware — CMS redirect rules |',
    ]
    if has_form:
        rows.append('| `lib/submitForm.ts` | Browser-side POST helper |')
        rows.append('| `app/api/leads/route.ts` | Server endpoint — Turnstile + rate-limit + Lead create |')
        rows.append('| `cms/src/collections/Leads.ts` | Lead schema + afterChange email hook |')
        rows.append('| `cms/src/email/transport.ts` | Hostinger SMTP via nodemailer |')
    if 'career' in p['slug']:
        rows.append('| `app/api/leads/upload/route.ts` (Phase C.2) | Multipart endpoint for CV uploads |')
    if 'ai-visibility' in p['slug']:
        rows.append('| `app/api/ai-score/route.ts` (Phase C.2/D) | Computes visibility score from Ahrefs Brand Radar MCP |')
    return '\n'.join(rows)


def build_env_rows(p: dict, has_form: bool) -> str:
    base = [
        '| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL |',
        '| `CMS_URL` | Yes | Where lib/cms.ts fetches from |',
        '| `PAYLOAD_API_KEY` | Yes (prod) | Server-side CMS write auth |',
    ]
    if has_form:
        base.append('| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Yes (prod) | Cloudflare widget site key |')
        base.append('| `TURNSTILE_SECRET_KEY` | Yes (prod) | Server-side verify |')
    if 'geo' in p['slug'] or 'contact' in p['slug']:
        base.append('| `NEXT_PUBLIC_MAPBOX_TOKEN` | Yes | Mapbox tiles |')
    if 'contact' in p['slug'] or 'home' in p['url']:
        base.append('| `NEXT_PUBLIC_GMAPS_KEY` | Yes | Google Maps embeds |')
    base.append('| `SENTRY_DSN` | Yes (prod) | Error tracking |')
    return '\n'.join(base)


def build_validation_rows(p: dict, has_form: bool) -> str:
    if not has_form:
        return 'No user input on this page. Read-only validation: ISR cache freshness, CMS reachability.'
    return """### `/api/leads` validation pipeline

1. **Honeypot:** `company_url` must be empty. If filled, return `{ ok: true }` silently (do NOT create lead).
2. **Shape:** `name` and `email` required. `email` must match `/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/`.
3. **Rate limit:** Per-IP, 15 submissions per 15 minutes. Returns 429 over limit.
4. **Turnstile:** Server-side `siteverify` against Cloudflare. Skipped if `TURNSTILE_SECRET_KEY` unset (dev mode).
5. **Source:** Must be one of the SOURCE_OPTIONS values defined in `cms/src/collections/Leads.ts`.
6. **Forensic:** IP, user-agent, referer captured automatically.

Source-specific validation runs in the Next.js layer before the CMS write (zod schemas).
"""


def build_auth_rows(p: dict, has_form: bool) -> str:
    if not has_form:
        return """- Public read of all page-driving CMS endpoints.
- No user session required.
- Middleware runs on every request but reads via server-only `PAYLOAD_API_KEY`."""
    return """- Public POST allowed for browser-side form submission.
- Bot protection: honeypot + Turnstile + per-IP rate limit (15/15min).
- Server-to-server CMS write uses `Authorization: users API-Key <PAYLOAD_API_KEY>`.
- No NextAuth session required from the visitor."""


def build_deploy_notes(p: dict, has_form: bool) -> str:
    notes = [
        '- Server-rendered Next.js page (ISR). NOT compatible with `output: \'export\'`.',
        '- First deploy requires `pnpm payload migrate` + relevant `pnpm seed:*` before booting.',
        '- Caddy reverse-proxies port 3000 (marketing) — see DEPLOYMENT_GUIDE §6.',
    ]
    if has_form:
        notes.append('- Cloudflare Turnstile site key + secret must be configured in production env.')
        notes.append('- Hostinger SMTP credentials must be set in `cms/.env` for assignee notification emails.')
    if 'ai-visibility' in p['slug'] or 'free-tools' in p['slug']:
        notes.append('- AI score / visibility checker endpoints rely on MCP tools (Ahrefs Brand Radar, DataForSEO) — credentials server-only.')
    if 'geo' in p['slug']:
        notes.append('- Mapbox token must be URL-restricted in Mapbox dashboard.')
    return '\n'.join(notes)


def build_testing(p: dict, has_form: bool, is_tool: bool) -> str:
    parts = [
        '### Local smoke',
        f'1. `pnpm dev` (marketing site at `http://localhost:3000`)',
        f'2. Navigate to `{p["url"]}`',
        '3. Verify hero renders, navigation works, no console errors',
    ]
    if has_form:
        parts.extend([
            '4. Fill the form with valid data → expect 200 OK + lead in `/admin/collections/leads`',
            '5. Fill the form with empty email → expect 400',
            '6. Submit 16 times in 15 min from same IP → 16th returns 429',
            '7. Open with JS disabled → confirm graceful no-JS fallback message',
        ])
    if is_tool:
        parts.extend([
            '4. Verify widget mounts client-side',
            '5. Trigger the widget action → expect cached or computed result',
        ])
    parts.append('')
    parts.append('### Production checks')
    parts.extend([
        '- Lighthouse Performance ≥ 85 on landing pages',
        '- Lighthouse Accessibility ≥ 95',
        '- Lighthouse SEO = 100',
        '- Sentry: no new error fingerprints after deploy',
        '- Uptime monitor green',
    ])
    return '\n'.join(parts)


def build_troubleshooting(p: dict, has_form: bool) -> str:
    rows = [
        '| Symptom | Likely cause | Fix |',
        '|---|---|---|',
        '| Page returns 500 | CMS unreachable | Check CMS_URL + CMS service status |',
        '| Content stale after admin edit | Cache not purged | `revalidateTag()` or wait for revalidate interval |',
        '| Sitemap missing this page | CMS Pages record not published | Set `status=published` |',
        '| Navbar/footer shows defaults | Settings global missing | Run `pnpm seed:settings` |',
    ]
    if has_form:
        rows.extend([
            '| Form submits but no Lead | `PAYLOAD_API_KEY` wrong | Regenerate in admin → Users → API Key |',
            '| Form rejected with 400 captcha | Turnstile token bad | Verify production `TURNSTILE_SECRET_KEY` matches site key |',
            '| Assignee not getting email | SMTP creds wrong | Test Hostinger SMTP from VPS shell |',
        ])
    if 'geo' in p['slug']:
        rows.append('| Map tiles missing | Mapbox token invalid or URL not allowlisted | Check Mapbox dashboard referrer rules |')
    return '\n'.join(rows)


def build_change_impact(p: dict) -> str:
    return f"""**If you change…**

- **Copy / hero text:** Low impact. Edit the CMS record (or `app{p['url']}page.tsx` if still hardcoded). Wait for ISR.
- **Sections order:** Medium impact. Re-order modules in admin. Renders instantly on next ISR.
- **Add a new module type:** High impact. Add block to `cms/src/collections/Pages.ts`, add component to `components/modules/blocks/`, add dispatch in `ModuleRenderer.tsx`.
- **Slug:** **CRITICAL — breaks every URL.** Add a `Redirects` record from old slug → new BEFORE updating. Notify SEO if any external links exist.
- **Authentication scope:** Edit `cms/src/access/*.ts`. Roles changes only by `super_admin`.
- **API endpoint shape:** Breaking change. Bump version, dual-route for 30 days, document migration.
"""


def build_rollback(p: dict) -> str:
    return f"""1. **CMS content rollback:** Use Payload versions UI (`/admin/collections/pages/<id>` → Versions tab). Revert to a prior snapshot.
2. **Code rollback:** `git revert <bad-commit>` on `phase-c-frontend-rewire`, push, redeploy.
3. **Schema migration rollback:** Restore Postgres from nightly backup (see DEPLOYMENT_GUIDE §7).
4. **Deploy rollback:** `systemctl stop sb-web && git checkout <prev-commit> && pnpm build && systemctl start sb-web`. <5 min.
5. **DNS-level rollback (emergency only):** Revert A record to the last static-export Hostinger IP (5-minute propagation).
"""


def main():
    for p in PAGES:
        slug_part = p['slug'].upper().replace('-', '_')
        out = MD / f"PAGE_{p['n']:02d}_{slug_part}.md"
        content = render_md(p)
        out.write_text(content, encoding='utf-8')
        print(f"  WROTE {out.name}")


if __name__ == '__main__':
    main()
