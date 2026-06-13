# AIRTABLE_ARCHITECTURE

**Base name:** `Securityblogs.com.au.`
**Base ID:** `app4m6OOzymaqPKHX`
**Role in hybrid architecture:** Operational documentation + lightweight content layer (NOT primary CMS)
**Primary CMS:** Payload + Postgres (see DATABASE_ARCHITECTURE)

---

## 1. Role boundary

Airtable is the **page-by-page operational reference** and the human-friendly documentation surface. It does NOT own transactional data, does NOT hold passwords, does NOT receive form submissions, does NOT serve the marketing site at request time.

| Owns | Does NOT own |
|---|---|
| Per-page implementation spec (sections, copy, backend wiring) | Authentication |
| Documentation index linking to MD/PDF files | Leads (form submissions) |
| Editorial planning / rate cards / content calendars (existing tables) | Audit log |
| Optional: low-traffic catalogue content (logo bands, FAQ libraries) | Pages, Services, Posts (Payload owns these) |
| Optional: per-page status (Designed / Built / Deployed) | Subscriptions, billing, customer data |

## 2. Current table inventory (38 tables, as of audit)

| # | Table | Purpose |
|---|---|---|
| 1 | `SB · 00 · Pages Index` | Master index of all 36 pages |
| 2 | `SB · TEMPLATE · Page` | Reusable template for new pages |
| 3 | `SB · 01 · Home` | Per-section spec for `/` |
| 4 | `SB · 02 · Services` | `/services/` hub |
| 5 | `SB · 03 · Security SEO` | `/services/security-seo/` |
| 6 | `SB · 04 · AIO` | `/services/aio/` |
| 7 | `SB · 05 · AEO` | `/services/aeo/` |
| 8 | `SB · 06 · GEO` | `/services/geo/` |
| 9 | `SB · 07 · Google Ads` | `/services/google-ads/` |
| 10 | `SB · 08 · Bing Ads` | `/services/bing-ads/` |
| 11 | `SB · 09 · Web Design` | `/services/web-design/` |
| 12 | `SB · 10 · Knowledge Hub` | `/knowledge-hub/` |
| 13 | `SB · 11 · Blog` | `/knowledge-hub/blogs/` |
| 14 | `SB · 12 · Definitions & Glossary` | `/knowledge-hub/definitions-glossary/` |
| 15 | `SB · 13 · Industry News` | `/knowledge-hub/industry-news/` |
| 16 | `SB · 14 · Research Reports` | `/knowledge-hub/research-reports/` |
| 17 | `SB · 15 · Security Guides` | `/knowledge-hub/security-guides/` |
| 18 | `SB · 16 · Security Industry SEO (Pillar)` | `/knowledge-hub/security-industry-seo/` |
| 19 | `SB · 17 · Security Trends 2026` | `/knowledge-hub/security-trends-2026/` |
| 20 | `SB · 18 · Publish With Us` | `/publish-with-us/` |
| 21 | `SB · 19 · Advertise` | `/publish-with-us/advertise/` |
| 22 | `SB · 20 · Backlink Packages` | `/publish-with-us/backlink-packages/` |
| 23 | `SB · 21 · Guest Posting` | `/publish-with-us/guest-posting/` |
| 24 | `SB · 22 · Press Release` | `/publish-with-us/press-release/` |
| 25 | `SB · 23 · Pricing & Guidelines` | `/publish-with-us/pricing-guidelines/` |
| 26 | `SB · 24 · Product Promotion` | `/publish-with-us/product-promotion/` |
| 27 | `SB · 25 · Sponsored Posts` | `/publish-with-us/sponsored-posts/` |
| 28 | `SB · 26 · About Us` | `/about-us/` |
| 29 | `SB · 27 · Contact` | `/contact/` |
| 30 | `SB · 28 · Case Studies` | `/case-studies/` |
| 31 | `SB · 29 · Security Directory` | `/security-directory/` |
| 32 | `SB · 30 · AI Visibility Center` | `/ai-visibility-center/` |
| 33 | `SB · 31 · Free Tools` | `/free-tools/` |
| 34 | `SB · 32 · Career` | `/career/` |
| 35 | `SB · 33 · Book Strategy Call` | `/book-strategy-call/` |
| 36 | `SB · 34 · Privacy Policy` | `/privacy-policy/` |
| 37 | `SB · 35 · Terms of Service` | `/terms-of-service/` |
| 38 | `SB · 36 · Content Guidelines` | `/content-guidelines/` |

## 3. Per-page table schema (existing — applies to all 36 page tables)

| Column | Type | Required | Purpose |
|---|---|---|---|
| `Section` | singleLineText (primary) | Yes | Name of the section within the page |
| `Order` | number | Yes | Top-to-bottom order on the page |
| `Type` | singleSelect | Yes | Block category (Hero / Tool/Calculator / Live demo / etc.) |
| `Frontend — Content / Copy` | multilineText | Yes | The visible text/copy in this section |
| `Frontend — UI / Behaviour` | multilineText | No | Animations, interactions, responsive behaviour |
| `Backend — Data / Logic / APIs` | multilineText | No | **Implementation-grade backend reference (this doc populates it)** |
| `Build notes` | multilineText | No | Editorial / build notes |
| `Status` | singleSelect | Yes | Built / Pending / In Progress / Designed |

## 4. Proposed new documentation columns

To meet the user's spec ("Component Name, Airtable Content Source, Postgres Tables, …"), add the following columns to each per-page table. These columns can be ADDED without touching the existing schema.

| Column | Type | Notes |
|---|---|---|
| `Component Name` | singleLineText | React component or page component this section maps to |
| `Airtable Content Source` | linkedRecord → (an optional content table) OR singleLineText | If the section's content lives in another Airtable table, link it here |
| `Postgres Tables` | multipleSelects | Choose from: `users`, `media`, `pages`, `services`, `case_studies`, `partners`, `posts`, `leads`, `redirects`, `settings`, `audit_log`, `ai_scores`, `ad_metrics_snapshot` |
| `API Endpoint` | singleLineText | e.g. `GET /api/pages?where[slug][equals]=home` |
| `Request Schema` | multilineText | JSON or zod schema |
| `Response Schema` | multilineText | TypeScript shape or example JSON |
| `Validation Rules` | multilineText | Field rules + server-side checks |
| `Authentication` | singleSelect | `Public` / `Bearer JWT` / `API Key (server)` / `Super Admin` / `Editor+` |
| `Env Vars Required` | multilineText | List with one per line |
| `Backend Service File` | singleLineText | e.g. `app/api/leads/route.ts:42` |
| `Frontend Component File` | singleLineText | e.g. `components/modules/blocks/HeroBlock.tsx` |
| `Related React Components` | multilineText | Comma-separated paths |
| `Cache Strategy` | singleSelect | `No cache` / `ISR 60s` / `ISR 600s` / `Edge cache 60s` / `Static at build` |
| `Revalidation Rules` | multilineText | When the cache is purged (tag-based, webhook, etc.) |
| `Deployment Notes` | multilineText | Anything special at deploy time (env, migrations, secrets) |
| `Testing Steps` | multilineText | How to verify the section works |
| `Troubleshooting` | multilineText | Common failure modes + fixes |
| `Change Procedures` | multilineText | How to safely modify this section |
| `Documentation MD` | singleLineText | Relative path to `Documentation/Markdown/PAGE_NAME.md` |
| `Documentation PDF` | url | Link to the generated PDF |

## 5. Documentation Index table (new — proposed)

For Airtable-discoverable documentation, create a NEW table:

**Table:** `SB · DOCS · Index`

| Column | Type | Purpose |
|---|---|---|
| `Title` | singleLineText (primary) | Document name |
| `System Name` | singleSelect | `Frontend` / `Backend` / `Database` / `Airtable` / `Deployment` / `Per-Page` / `Operations` |
| `Documentation Type` | singleSelect | `Architecture` / `Page Spec` / `Handbook` / `Guide` / `Reference` / `Runbook` |
| `Markdown Path` | singleLineText | Repo-relative path |
| `PDF Path` | singleLineText | Repo-relative path |
| `PDF Attachment` | multipleAttachments | Optional — upload the PDF for in-base viewing |
| `Last Updated` | dateTime | Auto-stamped on import |
| `Owner` | singleLineText | Engineer responsible |
| `Linked Pages` | linkedRecord → all per-page tables | Optional cross-reference |

## 6. Sync model

Airtable is updated FROM the repo, never the other way around for transactional data.

| Source of truth | Direction | Frequency |
|---|---|---|
| Markdown files in `Documentation/Markdown/` | git → Airtable (PDF attached) | On every commit to main (via GitHub Action) |
| Page-section implementation backend column | Engineer edits Airtable directly | Manual |
| Optional editorial content (low-traffic, e.g. AI engine list) | Airtable → Postgres (cached in `lib/airtable.ts`) | ISR 600s |
| Form submissions | NEVER touch Airtable | — |
| Auth | NEVER touch Airtable | — |

## 7. API access

| Token type | Where used | Scopes |
|---|---|---|
| Personal Access Token (PAT), server-side only | Marketing site `lib/airtable.ts` for read-only documentation lookups | `data.records:read` on this base only |
| PAT, GitHub Actions | Documentation auto-update workflow | `data.records:read+write` on this base only |
| No PAT given to browser | — | — |

Rate limit: 5 req/sec per base. Cache every read in Next.js ISR with `revalidate: 600`.

## 8. Webhooks + Automations (Airtable)

| Trigger | Action | Purpose |
|---|---|---|
| Record created in `SB · DOCS · Index` | Send webhook to `/api/cms/purge?tag=docs` | Marketing site re-fetches doc list |
| `Status` field on any per-page table changes to `Built` | Send webhook to GitHub Actions to regenerate PDFs | Keep docs current |
| New lead reported (if syncing leads READ-only from Postgres for editorial visibility) | Notify editorial in Slack | Optional |

## 9. Risk register

| Risk | Mitigation |
|---|---|
| Editor accidentally writes to Airtable expecting it to flow to production | Documentation clearly labels Airtable as docs-only; key tables read-only via Interface |
| Schema drift between Airtable and Postgres canonical types | Generated TS from Airtable Meta API daily; CI fails if mismatch |
| PAT leaked in browser | NEVER include PAT in client bundle; all reads via server route |
| Hitting 5 req/sec under traffic spike | Cache 600s on every read; per-IP rate limit on the read route |

## 10. Decision log

| Decision | Date | Why |
|---|---|---|
| Airtable used for docs, NOT primary CMS | 2026-06-14 | Hybrid architecture recommended in AIRTABLE_SCHEMA_MAP §10; preserves auth + leads in Postgres |
| Existing 36 per-page tables retained | 2026-06-13 | They're the natural unit of operational reference |
| New columns added vs. new tables | 2026-06-14 | Per-page tables are the natural reading unit; one row = one section = one place to look |
| PDF generation in repo, not Airtable Automation | 2026-06-14 | Deterministic; runs in CI; doesn't depend on Airtable script env |

---

*End of AIRTABLE_ARCHITECTURE.md*
