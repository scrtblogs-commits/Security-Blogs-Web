# AIRTABLE_SCHEMA_MAP

**Repository:** `Jonaid880/Security-Blogs`
**Audited branch:** `phase-c-frontend-rewire` (commit `aff7305`)
**Airtable base:** `Securityblogs.com.au.` (id `app4m6OOzymaqPKHX`)
**Date:** 2026-06-14
**Status:** PROPOSAL ONLY — no Airtable changes, no code changes

---

## 0. Read this first — what changes when Airtable becomes the primary CMS

This map assumes you're replacing **Payload CMS** with **Airtable as the source of truth for content** while keeping the Next.js marketing site as the frontend. Before any work begins, you and the engineering side need to know the consequences.

### What Airtable CAN do well

- Editor-friendly UI out of the box. Non-technical team members already use it.
- Inline collaboration: comments, mentions, change history, automations.
- Linked records between tables (good for Posts↔Authors, Services↔Capabilities, Partners↔CaseStudies).
- File attachments per record (replaces Media collection adequately for small libraries).
- A reasonable REST API and SDK.
- Webhooks via Automations → external endpoint (good for ISR purge triggers).

### What Airtable CANNOT do (without compromise)

| Capability | Payload | Airtable |
|---|---|---|
| Password hashing + sessions | Built-in (Argon2id + JWT) | **Not supported** — auth must live in a separate system |
| Block-based page composition (`modules` field with 9 block types) | Native `blocks` field with typed schema per block | Requires either a child "Page Sections" table OR JSON in a long-text field. Loses type safety. |
| Lexical rich text (versioned, structured) | Native, validated JSON | Markdown / long text only. Loses inline embeds, custom node types, version diffing. |
| Draft / Scheduled / Published lifecycle with autosave every 2s | Native + versions table per doc | Manual via Status field. **No versioning of historic states.** Edits overwrite. |
| Field-level access control (e.g. "only super_admin can edit role") | Per-field `access.update` | **Not supported.** Workaround: hide fields from interfaces, but the API still allows updates if the PAT has write scope. |
| Row-level access (e.g. "editor sees only their own posts") | Per-record `access.read/update` evaluated against `req.user` | **Not enforceable at API level.** Views can filter, but API consumers see everything within the base scope. |
| `beforeChange` / `afterChange` hooks (e.g. auto-stamp `publishedAt`, send email on lead assignment) | Per-collection hooks in TS | Airtable Automations (cron + trigger-based scripts). Slower, less reliable, scripting environment is limited. |
| Unique constraints + indexes | Database-level | **Soft only** — you can format the primary field as a unique key but Airtable will not block duplicates at write time. App-level dedupe required. |
| Foreign-key cascade | Postgres FK constraints | Linked records are bidirectional but orphans are allowed. |
| Validation (email format, regex, min/max length, enums) | Per-field declarative + `beforeValidate` hooks | Limited (singleSelect for enums, fieldName-typed validation). Most validation must move to the Next.js data layer before write. |
| Rate limit | Tunable per route | **Fixed:** 5 requests/sec per base for free / paid plans; bumps to higher tiers at Enterprise. Read-heavy frontends MUST cache. |
| Cost at scale | Self-host on a VPS for ~$10/mo | Per-seat pricing — 5 editors at Pro tier ≈ $100/mo, more at Business. Plus API request quotas. |
| Self-hosting | Yes (Phase D plan) | No. Vendor-locked. |
| Compliance / audit log | Field-by-field history + custom audit tables | Record activity history per base (record-level, time-bounded by plan). |

### Recommended architecture

**Hybrid model — Airtable as content CMS, dedicated service for auth + write-heavy operations:**

```
                ┌─────────────────────────────────────┐
                │  Next.js Marketing Site (port 3000) │
                │                                       │
                │  • Reads content from Airtable cache  │
                │  • Writes leads via /api/leads        │
                │  • Renders ISR-cached pages           │
                └──────────────┬──────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌──────────┐     ┌──────────┐     ┌──────────┐
       │ Airtable │     │ NextAuth │     │ Postgres │
       │   (CMS)  │     │  / Clerk │     │ (Leads + │
       │          │     │  (Auth)  │     │  Audit + │
       │ Content, │     │          │     │  Forms)  │
       │ Pages,   │     │          │     │          │
       │ Services,│     │          │     │          │
       │ Studies, │     │          │     │          │
       │ Posts    │     │          │     │          │
       └──────────┘     └──────────┘     └──────────┘
```

**Why hybrid:** Airtable cannot hash passwords, cannot enforce row-level security, cannot handle the lead-submission write pattern (would burn the 5 req/sec budget instantly under load). Move only the **content** to Airtable. Keep auth and lead intake in code-controlled systems.

**If you insist on full Airtable (NOT recommended):** auth would have to be implemented via a third-party (Clerk, Auth0, Cognito) with users mapped to Airtable records, and lead submissions would have to buffer through a queue (Cloudflare Queues, AWS SQS) to stay under the rate limit.

---

## 1. Top-level mapping

10 Payload entities → 10 proposed Airtable tables. Plus 5 join tables for many-to-many relations.

| # | Payload entity | Type | Airtable table (proposed name) | Records (after seed) | Why this name |
|---|---|---|---|---|---|
| 1 | `users` | Collection | `SB · DATA · Users` | 1+ | Aligns with the existing `SB · NN · …` naming convention you used for page tables |
| 2 | `media` | Collection | `SB · DATA · Media` | 0+ | Attachment library |
| 3 | `pages` | Collection (blocks-based) | `SB · DATA · Pages` + `SB · DATA · Page Sections` | 10 pages + ~70 sections | Split into two tables — Pages owns the slug, Page Sections holds the block instances |
| 4 | `services` | Collection | `SB · DATA · Services` + `SB · DATA · Service Capabilities` + `SB · DATA · Service Process Steps` + `SB · DATA · Service Stats` + `SB · DATA · Service FAQs` + `SB · DATA · Service Benefits` | 7 services + ~80 children | Each tabbed array on Services becomes a child table linked to Services |
| 5 | `case-studies` | Collection | `SB · DATA · Case Studies` + `SB · DATA · Case Study Results` | 6 studies + ~30 results | Results array becomes child table |
| 6 | `partners` | Collection | `SB · DATA · Partners` | 6 | Direct mapping (services rel becomes linked-records on Partners) |
| 7 | `posts` | Collection | `SB · DATA · Posts` | 0+ | Direct mapping |
| 8 | `leads` | Collection | `SB · DATA · Leads` + `SB · DATA · Lead Timeline` | 0+ + ~5–10 events per lead | Timeline array becomes child table for chronological queries |
| 9 | `redirects` | Collection | `SB · DATA · Redirects` | ~40 | Direct mapping |
| 10 | `settings` | Global (singleton) | `SB · DATA · Settings` | 1 row | Same shape as Payload global; enforce singleton via formula |

Plus 5 helper tables that Payload represents as in-record arrays but Airtable needs as separate child tables:
- `SB · DATA · Page Sections` (Pages.modules)
- `SB · DATA · Service Capabilities` (Services.capabilities)
- `SB · DATA · Service Process Steps`
- `SB · DATA · Service Stats`
- `SB · DATA · Service FAQs`
- `SB · DATA · Service Benefits`
- `SB · DATA · Case Study Results`
- `SB · DATA · Lead Timeline`

Plus 1 lookup table for the AI Visibility group (reusable on Posts, Services, CaseStudies, Partners, Pages):
- `SB · DATA · AI Visibility Profiles` (linked from any content row)

This brings the total **new** tables to **18**. Combined with your existing 38 (Pages Index + Template + 36 per-page tables), the base will have **56 tables**. Airtable supports up to 1,000 tables per base on Business / Enterprise plans, so this is well within bounds, but the workspace will be busy. Consider splitting `Securityblogs.com.au.` into two bases: one for content data (`SB · DATA · ...`) and one for planning/page-mapping (the existing `SB · NN · ...`).

---

## 2. Field type mapping

How Payload field types translate to Airtable:

| Payload type | Airtable field type | Notes |
|---|---|---|
| `text` | singleLineText | Required → mark as "must contain value" in field settings (Pro+) |
| `textarea` | multilineText | |
| `email` | email | Native validation |
| `number` | number | Set precision per use |
| `select` (single) | singleSelect | Pre-populate choices array |
| `select hasMany` | multipleSelects | |
| `checkbox` | checkbox | |
| `date` | date / dateTime | Use dateTime for `pickerAppearance: 'dayAndTime'` |
| `richText` (Lexical JSON) | richText (Airtable's markdown-based) | **Loses Lexical features** (custom nodes, embeds). Stores as markdown. Convert at read time. |
| `upload` (relationTo: media) | linkedRecord → `SB · DATA · Media` | Or use Airtable's native `multipleAttachments` if storing the file in Airtable |
| `relationship` (single) | linkedRecord (allow 1 record) | |
| `relationship hasMany` | linkedRecord (allow multiple) | |
| `array` (nested fields) | **Either**: (a) child table linked back to parent, (b) JSON in multilineText — child table preferred for editor UX |
| `blocks` (typed polymorphic blocks like `modules`) | child table with a `blockType` singleSelect + every possible field as a column | Schema becomes wide-and-sparse but editors get a typed dropdown |
| `json` | multilineText with the convention "must be valid JSON" | App-level validation. No native JSON field. |
| `tabs` (admin UI grouping) | Multiple grouped views or Interfaces | Not a data construct — just admin presentation |

---

## 3. Per-collection mapping

For every Payload collection: target Airtable table, all fields, relationships, API operations, permissions, validation.

### 3.1 Users → `SB · DATA · Users`

| Aspect | Detail |
|---|---|
| **Source schema** | `cms/src/collections/Users.ts` |
| **Records expected** | 1 super admin seeded + N invited users |
| **Auth note** | Airtable does NOT hash passwords. The auth layer must live elsewhere (NextAuth.js, Clerk, Auth0). This table stores the user PROFILE only — email, name, role — and a foreign reference to the auth provider's user id. |

**Fields**

| Airtable field | Type | Maps from Payload | Required | Notes |
|---|---|---|---|---|
| `Email` | email | `email` (auth) | Yes | Primary field. Unique enforced at app level. |
| `Name` | singleLineText | `name` | Yes | |
| `Role` | singleSelect | `role` | Yes | Choices: `Super Admin`, `Admin`, `Editor`. Default `Editor`. |
| `Avatar` | multipleAttachments | `avatar` (upload→media) | No | Or linkedRecord → Media if shared library |
| `Auth provider ID` | singleLineText | (new) | Yes | The user's id at NextAuth / Clerk / Auth0 — joins auth to profile |
| `Auth provider` | singleSelect | (new) | Yes | Choices: `NextAuth`, `Clerk`, `Auth0` |
| `Is Active` | checkbox | `isActive` | No | Default true. App-level enforcement: gate login on `isActive=true`. |
| `Last Login At` | dateTime | `lastLoginAt` | No | Stamped by NextAuth callback → Airtable PATCH |
| `Login Count` | number (integer) | `loginCount` | No | Incremented by NextAuth callback |
| `Created At` | createdTime | (Payload auto) | Auto | |
| `Last Modified` | lastModifiedTime | (Payload auto) | Auto | |

**Relationships**

| From | To | Type | Why |
|---|---|---|---|
| Users.id | Posts.author | linkedRecord (Posts can list author) | Author display on posts |
| Users.id | Leads.assignedTo | linkedRecord | Lead pipeline ownership |
| Users.id | Leads.timeline[].byUser | linkedRecord (on Lead Timeline child) | Audit of who logged each event |
| Users.id | Media.uploadedBy | linkedRecord | Upload audit |

**API Read operations**

| Use case | HTTP | URL |
|---|---|---|
| List all users | `GET` | `/v0/app4m6OOzymaqPKHX/SB%20%C2%B7%20DATA%20%C2%B7%20Users` |
| Find by email (login lookup) | `GET` | `?filterByFormula={Email}='user@example.com'&maxRecords=1` |
| Find by auth provider id | `GET` | `?filterByFormula={Auth provider ID}='abc123'&maxRecords=1` |

**API Write operations**

| Use case | HTTP | URL | Body |
|---|---|---|---|
| Create user (post-signup webhook from auth provider) | `POST` | `/v0/app…/SB%20%C2%B7%20DATA%20%C2%B7%20Users` | `{ fields: { Email, Name, Role: 'Editor', "Auth provider ID": ..., "Auth provider": "NextAuth" } }` |
| Update last login | `PATCH` | `/v0/app…/SB · DATA · Users/{recId}` | `{ fields: { "Last Login At": ISO8601, "Login Count": 42 } }` |
| Promote / demote role | `PATCH` | same | `{ fields: { Role: 'Admin' } }` — **gate at app layer: only super_admin tokens allowed** |
| Deactivate | `PATCH` | same | `{ fields: { "Is Active": false } }` |

**Permissions**

Airtable cannot enforce per-row or per-field access at the API level. Implementation:

| Concern | Mitigation |
|---|---|
| Only super_admin can change `Role` | Wrap all role changes in a Next.js API route `/api/admin/users/:id/role` that checks the caller's session role before forwarding to Airtable |
| Editors should not see other editors' records (or auth provider IDs) | Use Airtable Interfaces with filtered views; do NOT give editors a direct PAT for the base |
| Avatar attachments are public URLs once uploaded | Use signed URLs or proxy through `/api/avatar/:id` if avatars must be access-controlled |

**Validation rules**

Performed in Next.js (`lib/airtable/users.ts`) BEFORE writing to Airtable:

```
email                must match /^[^@\s]+@[^@\s]+\.[^@\s]+$/
                     must be unique (run a GET with filterByFormula first)
name                 1–120 chars
role                 must be one of ['super_admin','admin','editor']
authProviderId       1–255 chars, alphanumeric + dashes
```

---

### 3.2 Media → `SB · DATA · Media`

| Aspect | Detail |
|---|---|
| **Source schema** | `cms/src/collections/Media.ts` |
| **Approach** | Airtable's native `multipleAttachments` field hosts files on Airtable's CDN. Image variants (thumb/small/medium/large) **are NOT auto-generated** like Payload's Sharp pipeline does. Use Next.js `<Image>` with `remotePatterns` for `dl.airtable.com` and let Next.js resize. |

**Fields**

| Airtable field | Type | Maps from Payload | Required | Notes |
|---|---|---|---|---|
| `Filename` | singleLineText | `filename` | Yes | Primary field |
| `File` | multipleAttachments | uploaded file | Yes | Single-attachment is enforced at app level (Airtable allows multi) |
| `Alt Text` | singleLineText | `altText` | Yes | Accessibility requirement |
| `Caption` | singleLineText | `caption` | No | |
| `Credit` | singleLineText | `credit` | No | |
| `Uploaded By` | linkedRecord → Users | `uploadedBy` | No | Auto-stamped at app layer |
| `MIME Type` | formula | `mimeType` | Auto | Derived from `File.type` via formula |
| `Filesize` | formula | `filesize` | Auto | From `File.size` |
| `Width` | formula | (variant size) | Auto | From `File.width` |
| `Height` | formula | (variant size) | Auto | From `File.height` |
| `Created At` | createdTime | (auto) | Auto | |

**Relationships**

| From | To | Type |
|---|---|---|
| Media.id | Users.avatar | linkedRecord |
| Media.id | Pages.modules.image | linkedRecord |
| Media.id | Services.cover | linkedRecord |
| Media.id | CaseStudies.cover, .clientLogo | linkedRecord (two FKs) |
| Media.id | Partners.logo, .cover | linkedRecord (two FKs) |
| Media.id | Posts.cover | linkedRecord |
| Media.id | Settings.brand.logoHeader, .logoFooter, .logoSquare, .ogImageDefault, .footer.acknowledgementFlags | linkedRecord (multiple FKs) |

**API Read operations**

| Use case | HTTP | URL |
|---|---|---|
| Resolve attachment URL for one record | `GET` | `/v0/app…/SB · DATA · Media/{recId}` |
| List all media | `GET` | `/v0/app…/SB · DATA · Media?pageSize=100` |
| Find by filename | `GET` | `?filterByFormula={Filename}='hero.webp'` |

**API Write operations**

| Use case | HTTP | URL | Notes |
|---|---|---|---|
| Upload via admin UI | `POST` | `/v0/app…/SB · DATA · Media` | Airtable's REST API accepts public URLs in `attachments`; for direct upload, use the SDK or upload to Airtable Web UI then PATCH |
| Update alt text | `PATCH` | `/v0/app…/SB · DATA · Media/{recId}` | `{ fields: { "Alt Text": "..." } }` |
| Delete | `DELETE` | `/v0/app…/SB · DATA · Media/{recId}` | Orphan attachments are cleaned by Airtable automatically |

**Permissions**

| Concern | Mitigation |
|---|---|
| Public-facing image URLs (anyone with the link) | Acceptable for marketing imagery. Sensitive uploads (CV files from Career form) should NOT go through this table — use a separate private storage (S3 with signed URLs). |
| Storage quota | Airtable Pro: 20GB per base. If you ship 200 hero images at 1MB each, you've used 1% — fine. If you ship 50 case-study videos, you're hosed — use external CDN. |

**Validation rules** (app layer)

```
file extension       in ['jpg','jpeg','png','webp','gif','svg','pdf']
altText              required, 1–200 chars
filesize             < 10MB hard cap (Airtable allows up to 20MB but Next.js Image is slow above 5MB)
```

---

### 3.3 Pages → `SB · DATA · Pages` + `SB · DATA · Page Sections`

This is the biggest structural change vs Payload. Pages have a `modules` field that's a polymorphic block array (hero / capabilities / stats / faqs / cta-band / rich-text / image / process-steps / values). Airtable cannot represent polymorphic arrays inline.

**Two-table model:**

#### `SB · DATA · Pages`

| Airtable field | Type | Maps from Payload | Required | Notes |
|---|---|---|---|---|
| `Slug` | singleLineText | `slug` | Yes | Primary field. Unique enforced at app level. |
| `Title` | singleLineText | `title` | Yes | |
| `Status` | singleSelect | `status` | Yes | Choices: `Draft`, `Published`, `Archived` |
| `Published At` | dateTime | `publishedAt` | No | Auto-stamped on first publish via Airtable Automation |
| `AI Visibility` | linkedRecord → AI Visibility Profiles | `aiVisibility` group | No | Reusable group; see §3.10 |
| `Sections` | linkedRecord → Page Sections (multiple) | `modules` block array | No | Order by `Sort Order` on child |
| `Created At` | createdTime | (auto) | Auto | |
| `Last Modified` | lastModifiedTime | (auto) | Auto | |

#### `SB · DATA · Page Sections`

One row per block instance. Every Page can have N rows. `Block Type` decides which subset of columns is meaningful.

| Airtable field | Type | Used by block types | Notes |
|---|---|---|---|
| `Name` | formula | all | Primary field. Formula: `{Page} & ' · ' & {Block Type} & ' #' & {Sort Order}` |
| `Page` | linkedRecord → Pages | all | The owner |
| `Sort Order` | number | all | Determines render order |
| `Block Type` | singleSelect | all | Choices: `hero`, `capabilities`, `stats`, `faqs`, `cta-band`, `rich-text`, `image`, `process-steps`, `values` |
| `Eyebrow` | singleLineText | capabilities, stats, faqs, rich-text, process-steps, values | Small label above the section heading |
| `Title` | singleLineText | capabilities, stats, faqs, rich-text, cta-band, process-steps, values | Section heading |
| `Subtitle` | multilineText | hero, cta-band | |
| `H1` | singleLineText | hero only | Required for hero |
| `H1 Highlight` | singleLineText | hero only | Substring of H1 in accent colour |
| `Badge` | singleLineText | hero only | e.g. 'LIVE · AI VISIBILITY ENGINE' |
| `Image` | linkedRecord → Media | hero, image | Optional on hero |
| `Body (Lexical JSON)` | multilineText | rich-text | Lexical JSON state OR markdown |
| `CTAs (JSON)` | multilineText | hero | Array of `{label, href, style}` as JSON — see Gotchas |
| `Items (JSON)` | multilineText | capabilities, stats, faqs, process-steps, values | Array of items as JSON — see Gotchas |
| `CTA Label` | singleLineText | cta-band | |
| `CTA Href` | singleLineText | cta-band | |
| `Caption` | singleLineText | image | |
| `Size` | singleSelect | image | Choices: `narrow`, `wide`, `full` |

**Why JSON for nested items:** Each block type's `items` array (e.g. Stats' `[{num, label, sub}]`) could be its own child-table-per-block-type. That would mean 5–7 more child tables. To keep the schema tractable, store nested items as JSON in `Items (JSON)`. Validation happens at the Next.js read layer. Editors edit JSON in a multiline field. **This is a usability sacrifice — full Payload parity requires the per-block child tables.**

**Relationships**

| From | To | Type |
|---|---|---|
| Page Sections.Page | Pages.id | linkedRecord (many-to-one) |
| Page Sections.Image | Media.id | linkedRecord |
| Pages.AI Visibility | AI Visibility Profiles.id | linkedRecord |

**API Read operations**

| Use case | HTTP | URL |
|---|---|---|
| Get page by slug | `GET` | `/v0/app…/SB · DATA · Pages?filterByFormula={Slug}='home'&maxRecords=1` |
| Get page sections (ordered) | `GET` | `/v0/app…/SB · DATA · Page Sections?filterByFormula={Page}='recXXX'&sort[0][field]=Sort Order&sort[0][direction]=asc` |
| Both in one trip | Not possible. Make two requests OR set up Airtable Lookup field on Pages that exposes `Page Sections.Sort Order` etc. — but lookups don't return full child records. **Two HTTP calls minimum per page render.** |

**API Write operations**

| Use case | HTTP | URL | Notes |
|---|---|---|---|
| Create page | `POST` | `/v0/app…/SB · DATA · Pages` | App-level: validate slug unique |
| Add a section | `POST` | `/v0/app…/SB · DATA · Page Sections` | `{ fields: { Page: ['recXXX'], "Block Type": "hero", H1: "...", "Sort Order": 1 } }` |
| Re-order sections | `PATCH` | `/v0/app…/SB · DATA · Page Sections/{recId}` | Update `Sort Order` on each row that moved — multi-record PATCH is supported (up to 10 per call) |
| Publish page | `PATCH` | `/v0/app…/SB · DATA · Pages/{recId}` | `{ fields: { Status: "Published", "Published At": ISO8601 } }` |
| Delete a section | `DELETE` | `/v0/app…/SB · DATA · Page Sections/{recId}` | |

**Permissions**

| Concern | Mitigation |
|---|---|
| Editors should be able to create drafts but not publish | Custom Interface that shows `Status` as read-only OR a Next.js admin UI that gates publish to admin+ |
| Concurrent edit conflicts | Airtable supports collaborative edit but has no optimistic locking. Last write wins. Add a `Locked By` field + Automation if needed. |

**Validation rules** (app layer)

```
slug                 lowercase, /^[a-z0-9-]+$/, 1–80 chars, unique
status               in ['Draft','Published','Archived']
blockType            in ['hero','capabilities','stats','faqs','cta-band','rich-text','image','process-steps','values']
hero.H1              required if blockType='hero'
cta-band.CTA Href    must start with '/' or 'https://'
Items (JSON)         must parse as JSON array; shape depends on blockType
```

---

### 3.4 Services → `SB · DATA · Services` + 5 child tables

Like Pages, Services have arrays (`capabilities`, `processSteps`, `stats`, `faqs`, `benefits`). Unlike Pages, all child rows share the same shape per array — so dedicated child tables are practical.

#### `SB · DATA · Services`

| Airtable field | Type | Maps from Payload | Required | Notes |
|---|---|---|---|---|
| `Title` | singleLineText | `title` | Yes | Primary field |
| `Slug` | singleLineText | `slug` | Yes | Unique at app level |
| `Short Desc` | singleLineText | `shortDesc` | Yes | Max 200 chars enforced at app level |
| `Intro` | multilineText | `intro` | No | Hero lead paragraph |
| `Hero Badge` | singleLineText | `heroBadge` | No | e.g. 'AI OPTIMISATION' |
| `Accent Color` | singleLineText | `accentColor` | No | Hex, default `#1e5fe0` |
| `Cover` | linkedRecord → Media | `cover` | No | |
| `Capabilities` | linkedRecord → Service Capabilities (multiple) | `capabilities` array | No | |
| `Process Steps` | linkedRecord → Service Process Steps (multiple) | `processSteps` array | No | |
| `Stats` | linkedRecord → Service Stats (multiple) | `stats` array | No | |
| `FAQs` | linkedRecord → Service FAQs (multiple) | `faqs` array | No | |
| `Benefits` | linkedRecord → Service Benefits (multiple) | `benefits` array | No | |
| `Stat Chip` | singleLineText | `statChip` | No | Catalogue-card chip |
| `Status` | singleSelect | `status` | Yes | `Published`, `Draft`, `Archived` |
| `Sort Order` | number | `sortOrder` | No | Default 100 |
| `AI Visibility` | linkedRecord → AI Visibility Profiles | `aiVisibility` | No | |
| `Created At` | createdTime | (auto) | Auto | |
| `Last Modified` | lastModifiedTime | (auto) | Auto | |

#### `SB · DATA · Service Capabilities`

| Airtable field | Type | Maps from | Notes |
|---|---|---|---|
| `Title` | singleLineText | `title` | Primary field |
| `Service` | linkedRecord → Services | (FK) | Required |
| `Description` | multilineText | `description` | Required |
| `Preview Variant` | singleSelect | `previewVariant` | ~40 enum choices — see `cms/src/collections/Services.ts` for the full list |
| `Sort Order` | number | (array index) | |

#### `SB · DATA · Service Process Steps`

| Airtable field | Type |
|---|---|
| `Title` | singleLineText (primary) |
| `Service` | linkedRecord → Services |
| `Description` | multilineText |
| `Preview Variant` | singleLineText |
| `Sort Order` | number |

#### `SB · DATA · Service Stats`

| Airtable field | Type |
|---|---|
| `Num` | singleLineText (primary) — e.g. `+180%` |
| `Service` | linkedRecord → Services |
| `Label` | singleLineText |
| `Sub` | singleLineText |
| `Trend` | singleSelect — `Up`/`Flat`/`Down` |
| `Sort Order` | number |

#### `SB · DATA · Service FAQs`

| Airtable field | Type |
|---|---|
| `Q` | singleLineText (primary) |
| `Service` | linkedRecord → Services |
| `A` | multilineText |
| `Sort Order` | number |

#### `SB · DATA · Service Benefits`

| Airtable field | Type |
|---|---|
| `Title` | singleLineText (primary) |
| `Service` | linkedRecord → Services |
| `Description` | multilineText |
| `Sort Order` | number |

**API Read operations**

```
GET /v0/app…/Services?filterByFormula={Slug}='security-seo'&maxRecords=1
GET /v0/app…/Service Capabilities?filterByFormula={Service}='recXXX'&sort[0][field]=Sort Order
GET /v0/app…/Service Process Steps?filterByFormula={Service}='recXXX'&sort[0][field]=Sort Order
GET /v0/app…/Service Stats?filterByFormula={Service}='recXXX'&sort[0][field]=Sort Order
GET /v0/app…/Service FAQs?filterByFormula={Service}='recXXX'&sort[0][field]=Sort Order
GET /v0/app…/Service Benefits?filterByFormula={Service}='recXXX'&sort[0][field]=Sort Order
```

**6 HTTP calls to render one service detail page.** Caveat: this will exceed the 5/sec rate limit if you don't cache. Options:
1. ISR cache `/services/[slug]` for 5+ minutes (recommended).
2. Use Airtable's "list all" pattern at boot, then filter in-memory.
3. Build a server-side aggregator that batches all 6 calls behind one `/api/cms/service/:slug` endpoint with its own cache.

**API Write operations**

Per child table:
- `POST .../Service Capabilities` — `{ fields: { Service: ['recXXX'], Title, Description, "Preview Variant", "Sort Order" } }`
- `PATCH .../Service Capabilities/{recId}` — update individual capability
- Multi-record `PATCH` (up to 10 records per call) supported for reordering

**Permissions**

| Concern | Mitigation |
|---|---|
| Service authors shouldn't move other authors' services | App-level: filter by an "Owner" field added to Services |
| Capability previewVariant should map to a known frontend component | Validate at write time; warn but don't block (frontend already falls back to generic) |

**Validation rules**

```
title                1–80 chars
slug                 lowercase, [a-z0-9-]+, unique
shortDesc            max 200 chars
accentColor          /^#[0-9a-f]{6}$/i OR a valid CSS color name
heroBadge            max 40 chars
previewVariant       in [...40 enum values from cms/src/collections/Services.ts]
status               in ['Published','Draft','Archived']
```

---

### 3.5 Case Studies → `SB · DATA · Case Studies` + `SB · DATA · Case Study Results`

#### `SB · DATA · Case Studies`

| Airtable field | Type | Maps from | Notes |
|---|---|---|---|
| `Headline` | singleLineText | `headline` | Primary field, required |
| `Slug` | singleLineText | `slug` | Unique |
| `Client Name` | singleLineText | `clientName` | Required |
| `Partner` | linkedRecord → Partners | `partner` | Optional |
| `Service` | linkedRecord → Services | `service` | Which service delivered the outcome |
| `Client Logo` | linkedRecord → Media | `clientLogo` | |
| `Cover` | linkedRecord → Media | `cover` | |
| `Summary` | multilineText | `summary` | Required, max 280 chars |
| `Body` | richText | `body` (Lexical JSON) | Stored as markdown — loses Lexical features |
| `Results` | linkedRecord → Case Study Results (multiple) | `results` array | |
| `Tags` | multipleSelects | `tags` | |
| `Status` | singleSelect | `status` | `Draft`/`Published`/`Archived` |
| `Sort Order` | number | `sortOrder` | |
| `Published At` | dateTime | `publishedAt` | Auto-stamped on first publish |
| `AI Visibility` | linkedRecord → AI Visibility Profiles | | |

#### `SB · DATA · Case Study Results`

| Airtable field | Type | Notes |
|---|---|---|
| `Metric` | singleLineText (primary) | e.g. `Organic traffic` |
| `Case Study` | linkedRecord → Case Studies | FK |
| `Value` | singleLineText | e.g. `+340%` |
| `Note` | singleLineText | Optional context line |
| `Sort Order` | number | |

**API Read**

```
GET /v0/app…/Case Studies?filterByFormula={Slug}='shieldtech-security'&maxRecords=1
GET /v0/app…/Case Study Results?filterByFormula={Case Study}='recXXX'&sort[0][field]=Sort Order
```

**API Write**

```
POST /v0/app…/Case Studies   { fields: { Headline, Slug, "Client Name", Summary, Status: "Draft" } }
PATCH /v0/app…/Case Studies/{recId}   { fields: { Status: "Published", "Published At": ISO } }
POST /v0/app…/Case Study Results   { fields: { "Case Study": ["recXXX"], Metric, Value, "Sort Order": 1 } }
```

**Permissions / validation**

Same pattern as Services. Slug unique, summary ≤280 chars, status enum.

---

### 3.6 Partners → `SB · DATA · Partners`

| Airtable field | Type | Maps from | Notes |
|---|---|---|---|
| `Name` | singleLineText | `name` | Primary, required |
| `Slug` | singleLineText | `slug` | Unique |
| `Type` | singleSelect | `type` | `Client`/`Partner`/`Integrator`/`Vendor`/`Community` |
| `Region` | singleSelect | `region` | `AU`/`US`/`GB`/`AE`/`SG`/`Other` |
| `Summary` | multilineText | `summary` | Max 280 chars |
| `Body` | richText | `body` (Lexical) | Long-form description |
| `Logo` | linkedRecord → Media | `logo` | |
| `Cover` | linkedRecord → Media | `cover` | |
| `Website` | url | `website` | |
| `Contact Email` | email | `contactEmail` | Kept private — don't expose via Interface |
| `Services` | linkedRecord → Services (multiple) | `services` (hasMany) | |
| `Case Study` | linkedRecord → Case Studies | `caseStudy` | Single featured study |
| `Tags` | multipleSelects | `tags` | |
| `Is Featured` | checkbox | `isFeatured` | |
| `Sort Order` | number | `sortOrder` | |
| `Status` | singleSelect | `status` | `Active`/`Inactive`/`Archived` |
| `AI Visibility` | linkedRecord → AI Visibility Profiles | | |

**API Read**

```
GET /v0/app…/Partners?filterByFormula={Status}='Active'&sort[0][field]=Sort Order
GET /v0/app…/Partners?filterByFormula=AND({Status}='Active',{Is Featured}=TRUE())
```

**API Write**

Standard POST/PATCH/DELETE on the table.

**Permissions / validation**

| Field | Rule |
|---|---|
| `slug` | unique |
| `website` | must be valid URL (Airtable validates URL field type) |
| `contactEmail` | NEVER expose this in public API responses — strip at the Next.js read layer |
| `type`, `region`, `status` | enum-bound by singleSelect |

---

### 3.7 Posts → `SB · DATA · Posts`

| Airtable field | Type | Maps from | Notes |
|---|---|---|---|
| `Title` | singleLineText | `title` | Primary, max 160 chars |
| `Slug` | singleLineText | `slug` | Unique |
| `Category` | singleSelect | `category` | `Blog`/`Industry News`/`Security Guides`/`Research Reports`/`Security Industry SEO`/`Security Trends 2026` |
| `Excerpt` | multilineText | `excerpt` | Required, max 280 chars |
| `Cover` | linkedRecord → Media | `cover` | |
| `Body` | richText | `body` (Lexical) | Markdown loses Lexical features |
| `Author` | linkedRecord → Users | `author` | Required, auto-defaulted to current user at write time |
| `Tags` | multipleSelects | `tags` | |
| `Reading Minutes` | number | `readingMinutes` | Auto-calculated by Next.js write layer (word count / 200) before PATCH |
| `View Count` | number | `viewCount` | Incremented by `/api/post-view/{slug}` endpoint |
| `Status` | singleSelect | `status` | `Draft`/`Scheduled`/`Published`/`Archived` |
| `Published At` | dateTime | `publishedAt` | Auto-stamped on first publish via Automation |
| `AI Visibility` | linkedRecord → AI Visibility Profiles | | |

**API Read**

```
GET /v0/app…/Posts?filterByFormula=AND({Status}='Published',{Category}='Blog')&sort[0][field]=Published At&sort[0][direction]=desc
GET /v0/app…/Posts?filterByFormula={Slug}='my-post'&maxRecords=1
```

**API Write**

```
POST /v0/app…/Posts   { fields: { Title, Slug, Category, Excerpt, Body, Author: ['recUserId'], Status: 'Draft' } }
PATCH /v0/app…/Posts/{recId}   for publishing, view-count bump, status changes
```

**Permissions**

| Concern | Mitigation |
|---|---|
| Editors should only update their own drafts | Filter at admin-UI layer; enforce at `/api/posts/:id` write endpoint by checking `Author === currentUser` |
| Drafts must not leak to the public | Filter all public reads with `Status='Published'`. If a PAT is leaked, anyone can read drafts — keep PATs server-side only. |
| View count incremented from public | Make a dedicated endpoint `/api/post-view/:slug` that rate-limits + PATCH-es Airtable. Don't let the client write directly. |

**Validation**

```
title                1–160 chars
slug                 unique, /^[a-z0-9-]+$/, 1–80 chars
excerpt              1–280 chars
category             in [...6 enum values]
status               in ['Draft','Scheduled','Published','Archived']
```

---

### 3.8 Leads → `SB · DATA · Leads` + `SB · DATA · Lead Timeline`

⚠️ **Operationally risky as Airtable-native.** Forms submit at unpredictable rates. Spikes can hit the 5 req/sec base limit instantly. Recommend keeping Leads in Postgres (or DynamoDB / Cloudflare D1) and using Airtable only for editorial review via a one-way sync.

If you proceed with Airtable-native Leads:

#### `SB · DATA · Leads`

| Airtable field | Type | Maps from | Notes |
|---|---|---|---|
| `Display Title` | formula | `displayTitle` | Primary, formula: `{Name} & ' · ' & ({Subject} OR {Source})` |
| `Name` | singleLineText | `name` | |
| `Email` | email | `email` | |
| `Phone` | phoneNumber | `phone` | |
| `Company` | singleLineText | `company` | |
| `Subject` | singleLineText | `subject` | |
| `Message` | multilineText | `message` | |
| `Extras` | multilineText | `extras` (JSON) | Source-form-specific data |
| `Source` | singleSelect | `source` | `contact-form`/`career`/`guest-post`/`visibility-challenge`/`visibility-checker`/`manual`/`other` |
| `Status` | singleSelect | `status` | `New`/`Contacted`/`Qualified`/`Proposal Sent`/`Nurturing`/`Won`/`Lost`/`Spam` |
| `Lifecycle Stage` | singleSelect | `lifecycleStage` | `Subscriber`/`Lead`/`MQL`/`SQL`/`Customer`/`Evangelist` |
| `Priority` | singleSelect | `priority` | `Low`/`Normal`/`High`/`Urgent` |
| `Assigned To` | linkedRecord → Users | `assignedTo` | |
| `Value Estimate (AUD)` | currency | `valueEstimate` | |
| `Next Action At` | dateTime | `nextActionAt` | |
| `Next Action Note` | singleLineText | `nextActionNote` | |
| `Tags` | multipleSelects | `tags` | |
| `Timeline` | linkedRecord → Lead Timeline (multiple) | `timeline` | |
| `Won At` | dateTime | `wonAt` | |
| `Won Value` | currency | `wonValue` | |
| `Lost At` | dateTime | `lostAt` | |
| `Lost Reason` | singleSelect | `lostReason` | `No response`/`Price`/`Timing`/`Competitor`/`Out of scope`/`Not a fit`/`Other` |
| `Lost Notes` | multilineText | `lostNotes` | |
| `IP` | singleLineText | `ip` | Forensic |
| `User Agent` | singleLineText | `userAgent` | Forensic |
| `Referrer` | url | `referrer` | Forensic |
| `Honeypot` | singleLineText | `honeypot` | Forensic |
| `Turnstile Token` | singleLineText | `turnstileToken` | Forensic |
| `Page URL` | url | `pageUrl` | |
| `Created At` | createdTime | | |

#### `SB · DATA · Lead Timeline`

| Airtable field | Type | Notes |
|---|---|---|
| `At` | dateTime (primary) | Auto-default to now |
| `Lead` | linkedRecord → Leads | FK |
| `By User` | linkedRecord → Users | Who logged the event |
| `Type` | singleSelect | `status_change`/`note`/`email_sent`/`email_received`/`call`/`meeting`/`assignment` |
| `Note` | multilineText | |

**API Read**

```
GET /v0/app…/Leads?filterByFormula={Status}='New'&sort[0][field]=Created At&sort[0][direction]=desc
GET /v0/app…/Lead Timeline?filterByFormula={Lead}='recXXX'&sort[0][field]=At
```

**API Write**

The lead-submission endpoint `/api/leads` on the marketing site does:

```
POST /v0/app…/Leads   { fields: { Name, Email, Phone, Company, Subject, Message, Source: 'contact-form', Status: 'New', IP, "User Agent", Referrer, "Page URL" } }
```

Then a Next.js post-write step adds a Timeline row:

```
POST /v0/app…/Lead Timeline   { fields: { Lead: ['recXXX'], Type: 'status_change', Note: 'Lead created from contact form' } }
```

Status-change automation (Airtable Automation):
- Trigger: when `Status` changes
- Action: create a `Lead Timeline` row with type `status_change`
- Action: if `Assigned To` set and changed, send email via Hostinger SMTP webhook

**Permissions**

| Concern | Mitigation |
|---|---|
| Editors should not see other editors' assigned leads | Filter at Interface level — but anyone with the PAT can see all. **Decommission this concern by not giving editors raw PATs.** |
| Lead form spamming the API and exhausting rate limit | Queue submissions in a small Cloudflare KV / Upstash Redis buffer, drain to Airtable at 4 req/sec |
| Forensic fields (IP, UA, Turnstile) leaking to non-admin | Hide via Interface; do NOT expose in any public read |

**Validation** (CRITICAL — runs server-side BEFORE writing to Airtable)

```
email                /^[^@\s]+@[^@\s]+\.[^@\s]+$/
name                 1–120 chars
honeypot             must be empty (else discard silently as bot)
turnstileToken       must verify against Cloudflare's siteverify
source               enum
ip                   max 50 chars
```

---

### 3.9 Redirects → `SB · DATA · Redirects`

| Airtable field | Type | Maps from | Notes |
|---|---|---|---|
| `From Path` | singleLineText | `fromPath` | Primary, unique |
| `To Path` | singleLineText | `toPath` | Required |
| `Status Code` | singleSelect | `statusCode` | `301`/`302`/`307`/`308`, default `301` |
| `Is Regex` | checkbox | `isRegex` | |
| `Is Active` | checkbox | `isActive` | Default true |
| `Hit Count` | number | `hitCount` | Incremented by middleware |
| `Last Hit At` | dateTime | `lastHitAt` | |
| `Note` | multilineText | `note` | Why this rule exists |
| `Created At` | createdTime | | |

**API Read**

The middleware running on every request needs this:

```
GET /v0/app…/Redirects?filterByFormula={Is Active}=TRUE()&pageSize=100
```

⚠️ **THIS IS THE BIGGEST RATE-LIMIT RISK.** Every request to the marketing site fires middleware. Without caching, you'd burn the 5 req/sec budget on the first second of traffic.

**Required caching strategy:**

1. Cache the full active-redirects list in memory at the edge (Cloudflare Workers KV / Vercel edge config / module-scoped Map) for 60s.
2. Airtable Automation: when any Redirect row is updated, POST to `/api/cms/purge?tag=redirects` on the marketing site to bust the cache.
3. Stale-while-revalidate: serve last known list if Airtable is slow.

**API Write**

```
PATCH /v0/app…/Redirects/{recId}   { fields: { "Hit Count": 42, "Last Hit At": ISO } }
```

Same rate-limit concern. **Don't increment hit count per-request.** Buffer hits in memory + flush hourly via a cron.

**Permissions**

Read public is acceptable (redirects are public info). Write restricted to admin+.

**Validation**

```
fromPath             starts with '/' OR a valid regex
toPath               valid path or URL
statusCode           in [301, 302, 307, 308]
```

---

### 3.10 Settings (Payload Global) → `SB · DATA · Settings`

Payload's "Global" concept maps to a **single-row Airtable table**. Enforce singleton via a formula primary field that's always the same.

| Airtable field | Type | Maps from Payload | Notes |
|---|---|---|---|
| `Singleton` | formula → `'GLOBAL'` | (constant) | Primary field — always exactly `GLOBAL`. Prevents adding a second row at the data level. |
| `Site Name` | singleLineText | `brand.siteName` | Default `SecurityBlogs` |
| `Tagline` | singleLineText | `brand.tagline` | |
| `Logo Header` | linkedRecord → Media | `brand.logoHeader` | |
| `Logo Footer` | linkedRecord → Media | `brand.logoFooter` | |
| `Logo Square` | linkedRecord → Media | `brand.logoSquare` | Favicon |
| `OG Image Default` | linkedRecord → Media | `brand.ogImageDefault` | |
| `Contact Email` | email | `contact.contactEmail` | Default `info@securityblogs.com.au` |
| `Contact Phone` | phoneNumber | `contact.contactPhone` | Default `+61 411 212 418` |
| `Business Hours` | singleLineText | `contact.businessHours` | |
| `Address Country` | singleLineText | `contact.addressCountry` | |
| `Area Served` | multipleSelects | `contact.areaServed` | `AU`/`US`/`GB`/`AE`/`SG` |
| `Social Links (JSON)` | multilineText | `social[]` | Array of `{platform, url, label}` as JSON |
| `Footer Columns (JSON)` | multilineText | `footer.footerColumns[]` | Array of `{heading, links: [{label, href}]}` as JSON |
| `Acknowledgement` | multilineText | `footer.acknowledgement` | Acknowledgement of Country |
| `Acknowledgement Flags` | linkedRecord → Media | `footer.acknowledgementFlags` | |
| `Copyright Text` | singleLineText | `footer.copyrightText` | Default `© {{year}} SecurityBlogs.` |
| `Default Meta Title` | singleLineText | `seo.defaultMetaTitle` | |
| `Title Suffix` | singleLineText | `seo.titleSuffix` | Default ` | SecurityBlogs` |
| `Default Meta Description` | multilineText | `seo.defaultMetaDescription` | |
| `Default OG Image` | linkedRecord → Media | `seo.defaultOgImage` | |
| `Twitter Handle` | singleLineText | `seo.twitterHandle` | |
| `Language Locale` | singleLineText | `seo.languageLocale` | Default `en-AU` |
| `GTM ID` | singleLineText | `analytics.gtmId` | |
| `Plausible URL` | url | `analytics.plausibleUrl` | |
| `Plausible Domain` | singleLineText | `analytics.plausibleDomain` | Default `securityblogs.com.au` |
| `Booking Slots (JSON)` | multilineText | `booking.bookingSlots[]` | Array of `{label}` as JSON |
| `Cookie Banner Enabled` | checkbox | `cookie.bannerEnabled` | |
| `Cookie Banner Text` | multilineText | `cookie.bannerText` | |
| `Cookie Banner Button` | singleLineText | `cookie.bannerButton` | |
| `Maintenance Mode` | checkbox | `maintenance.enabled` | |
| `Maintenance Message` | multilineText | `maintenance.message` | |

**API Read**

Single record fetch (since the table only has one row):

```
GET /v0/app…/Settings?maxRecords=1
```

Cache for 600s (settings rarely change).

**API Write**

```
PATCH /v0/app…/Settings/{recId}   { fields: { "Site Name": "...", ... } }
```

**Permissions**

| Concern | Mitigation |
|---|---|
| Only super_admin can edit (matches Payload `onlySuperAdmin`) | Gate at `/api/admin/settings` route; check session role |
| Cache purge when settings change | Airtable Automation → POST `/api/cms/purge?tag=settings` |

**Validation**

```
contactEmail         valid email
gtmId                /^GTM-[A-Z0-9]+$/ if set
languageLocale       BCP-47 format (e.g. en-AU, en-US)
plausibleDomain      valid hostname
Singleton            must always equal 'GLOBAL' — enforce via formula primary field
```

---

### 3.11 AI Visibility Profiles → `SB · DATA · AI Visibility Profiles`

Reusable group, linked from Posts / Services / CaseStudies / Partners / Pages.

| Airtable field | Type | Maps from |
|---|---|---|
| `Owner Reference` | singleLineText (primary) | Composite: `services/security-seo`, `posts/abc-123`, etc. |
| `Entity Name` | singleLineText | `entityName` |
| `Primary Topic` | singleLineText | `primaryTopic` |
| `Target Engines` | multipleSelects | `targetEngines` |
| `Target Query Types` | multipleSelects | `targetQueryTypes` |
| `Keywords (JSON)` | multilineText | `keywordsToWin` |
| `Quoted Passages (JSON)` | multilineText | `quotedPassages` |
| `Entity Relationships (JSON)` | multilineText | `entityRelationships` |
| `Competing URLs (JSON)` | multilineText | `competingUrls` |
| `Last Audit At` | dateTime | `lastAuditAt` |
| `Audit Results (JSON)` | multilineText | `auditResults` |
| `SEO Title Override` | singleLineText | `seoTitleOverride` |
| `SEO Description Override` | multilineText | `seoDescriptionOverride` |
| `OG Image` | linkedRecord → Media | `ogImage` |
| `Schema Overrides (JSON)` | multilineText | `schemaOverrides` |

---

## 4. Auth strategy (since Airtable can't hash passwords)

Recommended: **NextAuth.js (Credentials provider) with sessions in Postgres or the encrypted JWT strategy.** User profile lives in Airtable Users table.

Flow:
1. User submits email + password to `/api/auth/callback/credentials`.
2. NextAuth validates against an `auth_users` table in Postgres (hashed passwords).
3. On success, NextAuth issues a session.
4. Look up the user's profile by `email` in Airtable Users (filterByFormula) — get `role`, `avatar`, `isActive`.
5. Cache the profile on the session.

| Auth concern | Implementation |
|---|---|
| Passwords | Hashed in Postgres `auth_users` table (Argon2id via `@node-rs/argon2`) |
| Sessions | NextAuth — JWT or DB session |
| MFA | Optional add via `next-auth/providers/email` magic link |
| Lockout | Custom: 5 failed attempts → 10-minute lock, recorded in Postgres |
| Audit log | Postgres `audit_log` table, writes on login/logout/role-change/critical mutations |
| Role check | `getServerSession(authOptions)` then look up role from Airtable Users via email |

Postgres tables required for auth:
- `auth_users` (email unique, password_hash, failed_attempts, locked_until)
- `audit_log` (event_type, actor_email, target, timestamp, metadata json)

---

## 5. Public API endpoints on the marketing site (after the swap)

| Endpoint | Method | What it does | Why this layer exists |
|---|---|---|---|
| `/api/cms/page/[slug]` | GET | Aggregates Page + Page Sections + nested media | Avoid 6 round trips from the client; cache result for 5min |
| `/api/cms/service/[slug]` | GET | Aggregates Service + 5 child tables + media | Same |
| `/api/cms/services` | GET | List published services for the home catalogue | Cached 5min |
| `/api/cms/case-study/[slug]` | GET | Aggregates Case Study + Results + media | |
| `/api/cms/case-studies` | GET | List published case studies | |
| `/api/cms/post/[slug]` | GET | Single post | |
| `/api/cms/posts` | GET | List by category | |
| `/api/cms/settings` | GET | Settings global | Cached 10min |
| `/api/cms/redirects` | GET | Active redirects | Cached 1min, used by middleware |
| `/api/cms/purge` | POST | Purges a specific ISR tag | Hit by Airtable Automation on record change |
| `/api/leads` | POST | Form submission → Airtable Leads OR Postgres queue | Existing; rewire write target |
| `/api/admin/users` | GET/POST/PATCH | Wrap Users CRUD with session-role gating | App-level enforcement of Payload-equivalent access rules |
| `/api/admin/posts` | POST/PATCH | Wrap Posts CRUD with author-check | |
| `/api/admin/settings` | PATCH | Super-admin-only Settings edit | |

---

## 6. Permissions matrix (cross-table)

Since Airtable cannot enforce row-level or field-level access at the API layer, **every PAT must be treated as a server-only secret.** Clients never get one directly. All access flows through the marketing site's `/api/admin/*` and `/api/cms/*` endpoints, which check NextAuth session role.

| Role | Read | Write | Delete |
|---|---|---|---|
| `super_admin` | All tables | All tables incl. Settings, Users.role | All tables |
| `admin` | All tables | All content tables (Pages, Services, Posts, Case Studies, Partners, Redirects, Leads). NOT Settings.role, NOT Users.role | Content rows |
| `editor` | All tables (filtered to own author in admin UI) | Posts they authored. Pages drafts. NOT Services / Case Studies / Partners by default | Their own Posts (drafts) |
| Anonymous (public) | `/api/cms/*` endpoints only — server-strips private fields (Partners.contactEmail, Leads.*, Users.authProviderId) | `/api/leads` only | None |

Implementation: every `/api/admin/*` and `/api/cms/*` route calls `getServerSession()` and inspects `session.user.role`. Public-facing reads use a stripped projection (a hand-written allow-list of fields per response).

---

## 7. Validation strategy (since Airtable can't do most of it)

Three layers:

1. **Field-type validation** in Airtable — email, URL, number, date, singleSelect bounded. Use these where possible.
2. **Application-layer validation** in `lib/airtable/<entity>.ts` write functions — uses `zod` schemas mirrored from the Payload field definitions. Runs BEFORE every Airtable write.
3. **Automation guards** — Airtable Automations that fire on record change can re-validate and either fix or flag invalid rows (e.g. status went `Published` without `Published At` → automation sets `Published At` to now).

Sample zod schema for Pages:

```ts
const PageSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/).min(1).max(80),
  title: z.string().min(1).max(200),
  status: z.enum(['Draft', 'Published', 'Archived']),
  publishedAt: z.string().datetime().optional(),
  aiVisibilityId: z.string().regex(/^rec[A-Za-z0-9]{14}$/).optional(),
})
```

---

## 8. Migration plan (out of scope of this doc but referenced)

Sequenced steps to move from Payload-only to Airtable-primary, once approved:

1. **Build the 18 new Airtable tables** in `Securityblogs.com.au.` base per the field specs above.
2. **Write `cms/src/seed/airtable-export.ts`** — reads from Payload, writes to Airtable. Idempotent (skip if exists).
3. **Build `lib/airtable.ts`** typed client (mirror of `lib/cms.ts` shape: getPage, getServices, getSettings, etc.).
4. **Build the `/api/cms/*` aggregator endpoints** with ISR caching.
5. **Wire NextAuth.js** + auth_users in Postgres.
6. **Rewire `/api/leads`** to write to Airtable Leads + Lead Timeline.
7. **Rewire middleware** to read from Airtable Redirects (with 60s cache).
8. **Update `lib/cms.ts`** to read from `lib/airtable.ts` instead of Payload REST.
9. **Side-by-side run** for 2 weeks — both Payload and Airtable write paths active. Compare data drift daily.
10. **Cutover** — switch read path fully to Airtable. Decommission Payload after 30 days.

Estimated effort: **80–120 hours** of engineering work. Plus ongoing operations cost (Airtable seats, rate-limit handling, caching infrastructure).

---

## 9. Risk register specific to Airtable migration

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| 5 req/sec rate limit exhausted during traffic spikes | High | High | Aggressive ISR caching; queue writes; consider Airtable Enterprise tier (higher limits) |
| Concurrent editor writes overwriting each other (no optimistic locking) | Medium | Medium | Add `Locked By` + `Locked At` fields; Automation releases lock after 15min idle |
| Schema drift between Airtable and the typed read client | High | Medium | Generate types from Airtable Meta API daily; CI fails if mismatch |
| Lexical → markdown lossy conversion | High | Medium | Document which Lexical features are NOT supported. Phase out their use BEFORE migration. |
| Loss of versioning (no diff history) | Medium | Medium | Add a `Page History` table that snapshots on every change via Automation |
| Vendor lock-in | Medium | Long-term | Daily export of full Airtable base to S3 as JSON backup |
| Cost growth (per-seat, per-record above 50k limit on Pro) | High | Medium | Monitor row counts; plan for tier upgrade or split bases |
| Airtable Automations are limited (50 runs/day on free, 25k on Business) | Medium | Medium | Move heavy logic (e.g. publishedAt stamping) to Next.js API routes, not Automations |
| Public attachment URLs (anyone with link can access uploaded files) | Medium | Variable | Sensitive files go to S3 with signed URLs; only public marketing assets in Airtable Media |
| Migration cutover bug breaks site | Medium | High | Side-by-side run for 2 weeks; feature flag for read source; instant rollback by flipping the flag |

---

## 10. Recommendation

| Question | Answer |
|---|---|
| **Should you migrate to Airtable-primary?** | Only if editorial velocity + non-technical content updates are the #1 priority and you accept the trade-offs above. |
| **Is the existing Payload work wasted?** | No. The schemas and content seeds map 1:1. Migration is mechanical. |
| **What's the lowest-risk path?** | **Hybrid:** Airtable for Posts + Pages + Case Studies + Settings (content). Postgres for Auth + Leads + Audit. Keeps the write-heavy parts off Airtable's rate limit. |
| **What's the lowest-cost path?** | Stay with Payload. Self-hosted, ~$10/mo VPS. Airtable for 5+ editors will be $100+/mo. |
| **What's the lowest-effort path right now?** | Finish Phase C.2 + D with Payload as designed. Revisit Airtable in 3 months if editor friction is a real bottleneck. |

---

*End of document. No code or Airtable changes made.*
