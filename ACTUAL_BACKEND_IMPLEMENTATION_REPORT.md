# ACTUAL_BACKEND_IMPLEMENTATION_REPORT

**Date:** 2026-06-14
**Branch audited:** `phase-c-frontend-rewire` (commit `3b8a29c`)
**Method:** Direct filesystem scan + file reads. No claims sourced from documentation.

---

## Definitions used in this report

| Term | Strict meaning here |
|---|---|
| **Implemented Files** | A `.ts`/`.tsx` file exists on disk in the audited branch. The file may or may not have ever been executed. |
| **Database Tables** | Tables that would be created by `pnpm payload migrate` against an empty Postgres. **As of this audit no migration has ever been run** — these tables exist as schema declarations only. |
| **API Endpoints** | Routes Payload would expose at runtime if the CMS booted, OR explicit `route.ts` files on the marketing site. |
| **Authentication Status** | Auth code that exists in the repo. Has NOT been runtime-verified. |
| **Production Ready (Yes/No)** | YES only if (a) the code is on disk, (b) it has been migrated/seeded, (c) it has been executed at least once and verified, AND (d) it is deployed to a production environment. **For every area below, the answer is No.** Production currently serves the last static-export build from `phase-b-content-migration` — no Phase C code is in production. |
| **Missing Code** | Files/endpoints REFERENCED by existing code but not on disk. |
| **Estimated Hours Remaining** | Engineering hours to reach Production Ready = YES on this area, including local verification + Phase D infrastructure share. |

---

## 1. Users

### Implemented Files
1. [`cms/src/collections/Users.ts`](cms/src/collections/Users.ts) — 120 lines. Defines the Users CollectionConfig.
2. [`cms/src/seed/admin.ts`](cms/src/seed/admin.ts) — 41 lines. Idempotent seed for first super admin.
3. [`cms/src/access/roles.ts`](cms/src/access/roles.ts) — 25 lines. Role enum + 3 helper functions.
4. [`cms/src/access/isLoggedIn.ts`](cms/src/access/isLoggedIn.ts) — 5 lines.
5. [`cms/src/access/isAdmin.ts`](cms/src/access/isAdmin.ts) — 9 lines.
6. [`cms/src/access/isSelfOrAdmin.ts`](cms/src/access/isSelfOrAdmin.ts) — 12 lines.
7. [`cms/src/access/canPublish.ts`](cms/src/access/canPublish.ts) — 12 lines.

### Database Tables (declared in schema, NOT yet migrated)
- `users` — fields: `id`, `email` (unique), `hash`, `salt`, `name`, `role`, `avatar` (FK→media), `isActive`, `lastLoginAt`, `loginCount`, plus Payload's internal `loginAttempts`, `lockUntil`, `resetPasswordToken`, `resetPasswordExpiration`.

### API Endpoints (registered by Payload, NEVER hit)
- `POST /api/users/login`
- `POST /api/users/logout`
- `POST /api/users/refresh-token`
- `GET  /api/users/me`
- `POST /api/users/forgot-password`
- `POST /api/users/reset-password`
- `GET / POST / PATCH / DELETE /api/users` (filtered by access policies)

### Authentication Status
- Argon2id password hashing configured in `Users.ts:11–23` via Payload's `auth: { ... }` block.
- 8-hour JWT (`tokenExpiration: 60 * 60 * 8`).
- 5-attempt lockout, 10-minute window (`maxLoginAttempts: 5, lockTime: 1000 * 60 * 10`).
- Secure cookies in production (`cookies.secure: NODE_ENV === 'production'`).
- Email verification disabled (`verify: false`).
- `afterLogin` hook updates `lastLoginAt` + `loginCount` (`Users.ts:93–106`).

### Production Ready? **No**
- Schema has never been migrated. The `users` table does not exist in any Postgres instance.
- `seed:admin` has never been executed.
- No login has ever occurred.

### Missing Code
- None within the Users scope itself. (Password reset flow is wired but `verify: false` means admin-invite-only.)
- Audit log for role changes: not present.

### Estimated Hours Remaining: **3–5h**
- Migrate, seed admin, verify login + lockout behaviour locally, verify field-level access on `role` change.

---

## 2. Authentication

### Implemented Files
Same as §1. Payload's built-in auth IS the authentication system. There is no NextAuth, no Clerk, no custom JWT layer.

Confirmed: `grep -r 'next-auth' --include='*.json'` returns no matches. No end-user auth library is installed.

### Database Tables
- `users` (Argon2id hash + salt columns inside).

### API Endpoints
- See §1 above. All are Payload-auto-generated.

### Authentication Status
- Editorial auth: scaffolded (Argon2id + JWT in code, never run).
- End-user auth (for visitors / customers / SaaS tenants): **does not exist in the codebase**.
- 2FA / MFA: not implemented.
- Password reset UX: Payload provides forgot/reset endpoints but no email template is wired.

### Production Ready? **No**
- Editorial auth never runtime-verified.
- End-user auth not built at all.

### Missing Code
- `lib/auth.ts` or `app/api/auth/[...nextauth]/route.ts` — none.
- Forgot-password email template — none.
- Login UI for end-users (separate from `/admin`) — none.

### Estimated Hours Remaining: **3–5h** to verify editorial. **20–30h additional** if end-user auth (NextAuth + customer-facing login) is needed for Phase E SaaS.

---

## 3. Leads

### Implemented Files
1. [`cms/src/collections/Leads.ts`](cms/src/collections/Leads.ts) — 321 lines. Largest collection in the codebase. Tabbed editor (Contact / Pipeline / Timeline / Closure / Forensic). Status pipeline with 8 states. Lifecycle stage, priority, assignedTo, timeline array, forensic fields. `beforeChange` hook auto-stamps wonAt/lostAt and appends timeline rows on status / assignment changes. `afterChange` hook sends email to assignee on (re)assignment via `req.payload.sendEmail`.
2. [`app/api/leads/route.ts`](app/api/leads/route.ts) — 161 lines. POST handler with honeypot check, Cloudflare Turnstile verify, per-IP rate-limit (15/15min, in-memory `Map`), manual zod-style validation, calls `createLead()` from `lib/cms.ts`.
3. [`lib/submitForm.ts`](lib/submitForm.ts) — 74 lines. Browser helper. FormData → JSON, POSTs to `/api/leads`.
4. [`lib/cms.ts`](lib/cms.ts) — `createLead()` function (server-side wrapper that POSTs to Payload's `/api/leads` with `PAYLOAD_API_KEY`).
5. [`components/Turnstile.tsx`](components/Turnstile.tsx) — 103 lines. Cloudflare widget, lazy-loads turnstile.js.

### Database Tables
- `leads` — fields per `Leads.ts:62–235`: displayTitle (computed primary), name, email, phone, company, subject, message, extras (JSON), status, lifecycleStage, priority, assignedTo (FK→users), valueEstimate, nextActionAt, nextActionNote, tags (JSON), timeline (JSON array), wonAt, wonValue, lostAt, lostReason, lostNotes, ip, userAgent, referrer, honeypot, turnstileToken, pageUrl, source, plus Payload's createdAt/updatedAt.

### API Endpoints
- `POST /api/leads` (marketing site) — implemented at `app/api/leads/route.ts`. Has runtime code; never hit by a real user.
- `POST /api/leads` (CMS-side, Payload-auto) — would accept the server-to-server lead creation from `createLead()`.
- `GET/PATCH/DELETE /api/leads` on CMS — Payload-auto.

### Authentication Status
- `POST /api/leads` from browser: no session required. Protected by Turnstile + honeypot + IP rate-limit.
- Server-to-server CMS write: `Authorization: users API-Key <PAYLOAD_API_KEY>` (see `lib/cms.ts:32`).
- Read access on CMS Leads: `isLoggedIn` (`Leads.ts:69`). Update: `adminOrAbove`. Delete: `super_admin`.

### Production Ready? **No**
- Schema never migrated.
- `app/api/leads/route.ts` never hit by a real request (only the static export at `phase-b` is in production; that branch's submitForm.ts still POSTs to Web3Forms).
- `afterChange` email never sent.
- Forms on the marketing site still use the Phase B Web3Forms wiring.

### Missing Code
- `app/api/leads/upload/route.ts` — referenced in Career page docs as Phase C.2 work. **Does not exist on disk.** Verified by `find app/api/leads -type d` returning only the parent folder.
- CSV / dashboard export of leads — not built.

### Estimated Hours Remaining: **6–10h**
- 2h migrate + first manual submission.
- 4h wire `<Turnstile />` into 5 existing form components (ContactForm, ApplicationForm, GuestPostForm, AIVisibilityChallenge, VisibilityChecker) and verify each.
- 4h add `/api/leads/upload` for CV multipart.

---

## 4. Services

### Implemented Files
1. [`cms/src/collections/Services.ts`](cms/src/collections/Services.ts) — 247 lines. Tabbed editor: Overview / Capabilities / Process / Stats & Results / FAQs / Benefits. `previewVariant` select on capabilities with ~40 enum values mapping to themed visuals.
2. [`cms/src/seed/services.ts`](cms/src/seed/services.ts) — 22,481 bytes (largest seed). Seeds 7 services with full content.
3. [`app/services/[slug]/page.tsx`](app/services/[slug]/page.tsx) — Dynamic route. CMS-driven via `lib/cms.ts → getService(slug)`.
4. [`lib/cms.ts`](lib/cms.ts) — `getServices()`, `getService(slug)` functions.

### Database Tables
- `services` — fields per `Services.ts` tabs: title, slug (unique), shortDesc, intro, heroBadge, accentColor, cover (FK→media), capabilities (JSON array), processSteps (JSON), stats (JSON), faqs (JSON), benefits (JSON), statChip, status, sortOrder, aiVisibility (JSON), publishedAt.
- `services_v` — versioned snapshots (Payload draft feature).

### API Endpoints
- `GET /api/services?where[status][equals]=published` (Payload-auto, public)
- `GET /api/services/:id` (Payload-auto)
- `POST / PATCH / DELETE /api/services` (Payload-auto, access-controlled)

### Authentication Status
- Read: public for `status=published`, logged-in users see drafts (`Services.ts:32–37`).
- Create: `isLoggedIn`. Update: `adminOrAbove`. Delete: `onlySuperAdmin`.

### Production Ready? **No**
- Schema never migrated; 7 records never seeded.
- The dynamic route `/services/[slug]/page.tsx` exists but is **shadowed by legacy hardcoded folders**. Verified:
  - `app/services/aio/page.tsx` HARDCODED (does not import `@/lib/cms`)
  - `app/services/aeo/page.tsx` HARDCODED
  - `app/services/geo/page.tsx` HARDCODED
  - (same for security-seo, google-ads, bing-ads, web-design)
- So even after seeding, the dynamic route would not serve traffic for these slugs.

### Missing Code
- None within the Services backend itself.
- Frontend cleanup pending: deletion of 7 legacy folders so dynamic route activates.

### Estimated Hours Remaining: **8–12h**
- 2h migrate + seed.
- 6–10h delete 7 legacy folders one-by-one with visual diff verification + add redirects for any broken deep links.

---

## 5. Pages

### Implemented Files
1. [`cms/src/collections/Pages.ts`](cms/src/collections/Pages.ts) — 264 lines. Defines 9 block types as separate `Block` exports at the top of the file: `hero`, `capabilities`, `stats`, `faqs`, `cta-band`, `rich-text`, `image`, `process-steps`, `values`. `modules` field of type `blocks` holds them in an ordered array.
2. [`cms/src/seed/pages.ts`](cms/src/seed/pages.ts) — Seeds 10 marketing pages (home, about-us, contact, etc.) with module blocks.
3. [`components/modules/ModuleRenderer.tsx`](components/modules/ModuleRenderer.tsx) — 2,831 bytes. Dispatcher: `switch (block.blockType)` → renders the matching component.
4. [`components/modules/LexicalRenderer.tsx`](components/modules/LexicalRenderer.tsx) — 3,829 bytes. Hand-rolled Lexical JSON → JSX walker (handles paragraph, heading h2-h4, list, listitem, link, autolink, quote, linebreak, text + format flags for bold/italic/underline/strikethrough/code).
5. [`components/modules/blocks/HeroBlock.tsx`](components/modules/blocks/HeroBlock.tsx) — 2,225 bytes
6. [`components/modules/blocks/CapabilitiesBlock.tsx`](components/modules/blocks/CapabilitiesBlock.tsx) — 1,561 bytes
7. [`components/modules/blocks/StatsBlock.tsx`](components/modules/blocks/StatsBlock.tsx) — 1,133 bytes
8. [`components/modules/blocks/FaqsBlock.tsx`](components/modules/blocks/FaqsBlock.tsx) — 1,088 bytes
9. [`components/modules/blocks/CtaBandBlock.tsx`](components/modules/blocks/CtaBandBlock.tsx) — 638 bytes
10. [`components/modules/blocks/RichTextBlock.tsx`](components/modules/blocks/RichTextBlock.tsx) — 661 bytes
11. [`components/modules/blocks/ImageBlock.tsx`](components/modules/blocks/ImageBlock.tsx) — 1,046 bytes
12. [`components/modules/blocks/ProcessStepsBlock.tsx`](components/modules/blocks/ProcessStepsBlock.tsx) — 1,563 bytes
13. [`components/modules/blocks/ValuesBlock.tsx`](components/modules/blocks/ValuesBlock.tsx) — 1,438 bytes

### Database Tables
- `pages` — fields: title, slug (unique), modules (JSON blocks array), aiVisibility (JSON group), status, publishedAt.
- `pages_v` — version snapshots.

### API Endpoints
- `GET /api/pages?where[slug][equals]=<slug>` — Payload-auto.
- `lib/cms.ts` exposes `getPage(slug)` and `getPages()`.

### Authentication Status
- Public read for `status=published`. Logged-in users see drafts. Create=isLoggedIn. Update=adminOrAbove. Delete=onlySuperAdmin.

### Production Ready? **No**
- Schema never migrated. 10 page records never seeded.
- **CRITICAL:** No top-level marketing page actually consumes the CMS. Sampled 11 pages — `app/page.tsx`, `app/about-us/page.tsx`, `app/contact/page.tsx`, `app/case-studies/page.tsx`, `app/career/page.tsx`, `app/book-strategy-call/page.tsx`, `app/free-tools/page.tsx`, `app/ai-visibility-center/page.tsx`, plus the 7 service folders — every one is HARDCODED (does not import `@/lib/cms`).
- Only 3 files in `app/` import the CMS client: `app/case-studies/[slug]/page.tsx`, `app/services/[slug]/page.tsx`, `app/knowledge-hub/[category]/[slug]/page.tsx` (the new dynamic routes from Phase C.1).
- Plus SEO files: `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt/route.ts` are CMS-wired.

### Missing Code
- Per-page rewires (the Phase C.2 work). 11 top-level pages need `await getPage(slug)` + `<ModuleRenderer modules={page.modules} />`.

### Estimated Hours Remaining: **25–40h**
- 2h migrate + seed.
- 23–38h per-page rewire (11 top-level pages × ~2–3h each including verification).

---

## 6. Blog Posts

### Implemented Files
1. [`cms/src/collections/Posts.ts`](cms/src/collections/Posts.ts) — 189 lines. 6 categories enum: blog, industry-news, security-guides, research-reports, security-industry-seo, security-trends-2026. Lifecycle: draft / scheduled / published / archived. `beforeChange` hook auto-computes `readingMinutes` from word count, auto-stamps `publishedAt`.
2. [`app/knowledge-hub/[category]/[slug]/page.tsx`](app/knowledge-hub/[category]/[slug]/page.tsx) — Dynamic post detail page, CMS-wired.
3. [`app/knowledge-hub/[category]/page.tsx`](app/knowledge-hub/[category]/page.tsx) — Category landing exists at the dynamic level (also CMS-wired).
4. [`lib/cms.ts`](lib/cms.ts) — `getPost(slug)`, `getPosts({category, limit, page})`.
5. Lexical body field uses `@payloadcms/richtext-lexical` (verified via grep: `Posts.ts:3` imports + `Posts.ts:108` uses).

### Database Tables
- `posts` — fields: title, slug (unique), category, excerpt, cover (FK→media), body (JSONB Lexical), author (FK→users), tags (JSON), readingMinutes, viewCount, status, publishedAt, aiVisibility (JSON).
- `posts_v` — version snapshots.

### API Endpoints
- `GET /api/posts?where[category][equals]=<cat>&where[status][equals]=published` (Payload-auto)
- `GET /api/posts/:id`, plus CRUD on CMS.

### Authentication Status
- Public read for `status=published`. Editors can update their own posts (`Posts.ts:46–53`). Admin+ can update any. Delete=adminOrAbove.

### Production Ready? **No**
- Schema never migrated.
- **No posts are seeded.** Verified: `cms/src/seed/` has no `posts.ts` file. Listing: admin, all, case-studies, pages, partners, redirects, services, settings.
- Existing hand-built knowledge-hub category landings (8 of them: `app/knowledge-hub/blogs/`, `definitions-glossary/`, `industry-news/`, `research-reports/`, `security-guides/`, `security-industry-seo/`, `security-trends-2026/`, plus the hub index) are all HARDCODED. None call `getPosts()`.

### Missing Code
- `cms/src/seed/posts.ts` — not present. Without it, the system starts with zero posts; editors must create everything via admin.
- Category landings rewire to use `getPosts({category})`.

### Estimated Hours Remaining: **12–18h**
- 2h migrate.
- 2h write a minimal `cms/src/seed/posts.ts` (or document that posts get created via admin only).
- 8–14h rewire 8 category landing pages.

---

## 7. Case Studies

### Implemented Files
1. [`cms/src/collections/CaseStudies.ts`](cms/src/collections/CaseStudies.ts) — 164 lines. Headline, slug (unique), clientName, partner FK, service FK, summary, body (Lexical), results array, status. `beforeChange` auto-stamps publishedAt.
2. [`cms/src/seed/case-studies.ts`](cms/src/seed/case-studies.ts) — Seeds 6 case studies linked to services + partners.
3. [`app/case-studies/[slug]/page.tsx`](app/case-studies/[slug]/page.tsx) — Dynamic detail page, CMS-wired.
4. [`lib/cms.ts`](lib/cms.ts) — `getCaseStudy(slug)`, `getCaseStudies()`.

### Database Tables
- `case_studies` — headline, slug (unique), clientName, partner_id FK→partners, service_id FK→services, clientLogo (FK→media), cover (FK→media), summary, body (Lexical), results (JSON), tags (JSON), status, sortOrder, publishedAt, aiVisibility (JSON).
- `case_studies_v` — versions.

### API Endpoints
- `GET /api/case-studies?where[status][equals]=published` (Payload-auto).

### Authentication Status
- Public read for `status=published`. Create=isLoggedIn. Update=adminOrAbove. Delete=onlySuperAdmin.

### Production Ready? **No**
- Schema never migrated; 6 records never seeded.
- Index page `app/case-studies/page.tsx` is HARDCODED (verified: no `@/lib/cms` import).

### Missing Code
- None within Case Studies backend.
- Index page rewire pending.

### Estimated Hours Remaining: **5–7h**
- 2h migrate + seed.
- 3–5h rewire `app/case-studies/page.tsx` to consume CMS.

---

## 8. Media

### Implemented Files
1. [`cms/src/collections/Media.ts`](cms/src/collections/Media.ts) — 77 lines. Upload collection with:
   - mimeTypes: `image/jpeg`, `image/png`, `image/webp`, `image/gif`, `image/svg+xml`, `application/pdf`.
   - imageSizes: thumbnail (160×160), small (480w), medium (960w), large (1600w).
   - focalPoint: true.
   - formatOptions: WebP @ Q82.
   - Required `altText`.
2. `@payloadcms/storage-local` and `sharp` in `cms/package.json` dependencies.

### Database Tables
- `media` — filename, mimeType, filesize, url, sizes (JSONB: thumbnail/small/medium/large variants), altText, caption, credit, uploadedBy (FK→users), focalX, focalY, createdAt.

### API Endpoints
- `GET /api/media/:id` (Payload-auto, public read so frontend can resolve URLs).
- `POST /api/media` multipart upload (Payload-auto, requires login).

### Authentication Status
- Public read. Create+Update=isLoggedIn. Delete=adminOrAbove.

### Production Ready? **No**
- Schema never migrated.
- Sharp install on the target VPS not verified.
- No files have ever been uploaded.
- S3 / object-storage adapter NOT installed (only `@payloadcms/storage-local`). All uploads would land on local disk.

### Missing Code
- None within Media scope. S3 swap is optional Phase D consideration.

### Estimated Hours Remaining: **3–5h** (migrate + first upload + verify Sharp on target OS).

---

## 9. Settings

### Implemented Files
1. [`cms/src/globals/Settings.ts`](cms/src/globals/Settings.ts) — 176 lines. Single Global (not a collection). Tabs: Brand / Contact / Social / Footer / SEO Defaults / Analytics / Booking Slots / Cookie Banner / Maintenance.
2. [`cms/src/seed/settings.ts`](cms/src/seed/settings.ts) — Populates the singleton with current production values.
3. [`lib/cms.ts`](lib/cms.ts) — `getSettings()`.

### Database Tables
- `settings` (singleton row) — brand_*, contact_*, social (JSON), footer_columns (JSON), footer_copyright_text, footer_acknowledgement, seo_*, analytics_gtm_id, analytics_plausible_*, booking_slots (JSON), cookie_*, maintenance_mode (bool), maintenance_message.

### API Endpoints
- `GET /api/globals/settings` (Payload-auto, public read).
- `PATCH /api/globals/settings` (Payload-auto, super_admin only).

### Authentication Status
- Read: public.
- Update: `onlySuperAdmin` (`Settings.ts:13`).

### Production Ready? **No**
- Never migrated; singleton never seeded.
- The marketing site's `Navbar` and `Footer` components still read hardcoded constants from `lib/site.ts` — they do NOT call `getSettings()`. So even after seeding, the visible site would not reflect Settings changes.
- Only `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt/route.ts` consume Settings (for SEO defaults + maintenance flag).

### Missing Code
- Layout (`app/layout.tsx`) needs conversion to async server component with `await getSettings()`.
- `Navbar` and `Footer` need props plumbing.

### Estimated Hours Remaining: **6–10h**
- 1h migrate + seed.
- 5–9h convert `app/layout.tsx` + rewire `Navbar` + `Footer` to consume Settings.

---

## 10. Redirects

### Implemented Files
1. [`cms/src/collections/Redirects.ts`](cms/src/collections/Redirects.ts) — 85 lines. Fields: fromPath (unique), toPath, statusCode enum (301/302/307/308), isRegex, isActive, hitCount, lastHitAt, note.
2. [`cms/src/seed/redirects.ts`](cms/src/seed/redirects.ts) — Parses `public/.htaccess` for `RedirectMatch` rules and inserts ~40 records.
3. [`middleware.ts`](middleware.ts) (root) — 5,404 bytes. Edge middleware. Reads `/api/redirects?where[isActive][equals]=true` cached 60s at module scope. Literal match first, then regex with $1/$2 backreference support.
4. [`lib/cms.ts`](lib/cms.ts) — `getActiveRedirects()`, `incrementRedirectHit(id)`.

### Database Tables
- `redirects` — fromPath (unique), toPath, statusCode, isRegex, isActive, hitCount, lastHitAt, note, plus Payload's createdAt.

### API Endpoints
- `GET /api/redirects?where[isActive][equals]=true` (Payload-auto, public).
- `POST /api/redirects/:id/hit` — **REFERENCED but NOT IMPLEMENTED.** Confirmed: `find . -path "*redirects*hit*"` returns no results. The middleware fires a fire-and-forget POST to this URL (`middleware.ts:113`), but the CMS has no handler — every POST returns Payload's default 404. Counts stay at 0.

### Authentication Status
- Public read (required for middleware).
- Create+Update: `adminOrAbove`.
- Delete: `onlySuperAdmin`.

### Production Ready? **No**
- Schema never migrated; ~40 rules never seeded.
- Middleware never received a real request in production (Phase B's static deploy doesn't use this middleware — it relied on `.htaccess`).
- Hit-counter side will silently fail until the companion endpoint is built.

### Missing Code
- CMS-side `POST /api/redirects/:id/hit` handler. Options:
  - Add a custom endpoint in `cms/src/collections/Redirects.ts` via Payload `endpoints` config.
  - OR add an `afterRead` hook + a separate Next.js API route on the CMS app.

### Estimated Hours Remaining: **4–6h**
- 2h migrate + seed.
- 2–4h add the hit-counter endpoint + verify middleware → hit → admin row updated.

---

## 11. Airtable Integration

### Implemented Files
**Zero files in the marketing-site or CMS codebases.**

Verified:
- `grep -l "airtable" --include='*.ts' --include='*.tsx' -r app components lib` returns **no matches**.
- No `lib/airtable.ts` or similar.
- No env vars for `AIRTABLE_PAT`, `AIRTABLE_BASE_ID` in `.env.example` or `cms/.env.example`.

The only Airtable usage in this repo is **outside the application code**:
1. [`Documentation/build_airtable_records.py`](Documentation/build_airtable_records.py) — builds an Airtable payload from documentation metadata.
2. [`Documentation/attach_pdfs_to_airtable.py`](Documentation/attach_pdfs_to_airtable.py) — populates the docs table with PDF attachments.

Both scripts run outside the running app, are documentation-pipeline only, and never execute at request time.

### Database Tables
None. Airtable is not a data store the application reads from at runtime.

### API Endpoints
None.

### Authentication Status
N/A. No runtime PAT use.

### Production Ready? **No** — because no runtime integration exists. Documentation pipeline (`SB · DOCS · Index` in the base) IS functional but is not part of the application backend.

### Missing Code
If the goal is editorial content sync FROM Airtable TO the marketing site:
- `lib/airtable.ts` typed client.
- `/api/cms/airtable-pull` endpoint or scheduled sync.
- Env vars + PAT scopes.
- ISR cache + tag-purge wiring.

### Estimated Hours Remaining
- **0h** if Airtable stays as documentation only (current state).
- **8–14h** if you add a low-traffic editorial read path (e.g. pull "AI Engines" array from a new Airtable table at ISR 600s).

---

## 12. Email System

### Implemented Files
1. [`cms/src/email/transport.ts`](cms/src/email/transport.ts) — 29 lines. Uses `nodemailer.createTransport` with `host: SMTP_HOST` (default `smtp.hostinger.com`), `port: SMTP_PORT` (465 prod / 1025 dev), `secure: SMTP_SECURE`. Exports `emailAdapter` using `@payloadcms/email-nodemailer`'s `nodemailerAdapter`.
2. `cms/package.json` declares `nodemailer ^6.9.16` and `@payloadcms/email-nodemailer ^3.0.0`.
3. `docker-compose.yml` declares a `mail` service (MailHog) on ports 1025/8025 for dev capture.
4. Auto-wired to Leads `afterChange` hook (`Leads.ts:291` — `req.payload.sendEmail`).

### Database Tables
None (email transport is stateless).

### API Endpoints
None directly. Email sending is invoked from inside Payload hooks via `req.payload.sendEmail`.

### Authentication Status
SMTP credentials via env vars: `SMTP_USER`, `SMTP_PASSWORD`. Server-only.

### Production Ready? **No**
- Transport configured but never executed. Zero outbound emails sent.
- Hostinger SMTP from a VPS IP often blocks unverified senders — needs SPF/DKIM/DMARC for `info@securityblogs.com.au`.
- No email templates exist beyond the inline HTML in `Leads.ts:300–310` (lead assignment notification).

### Missing Code
- Template system (e.g. React Email or MJML). Currently inline `\`<html>...\`` strings.
- Welcome email for new admin users.
- Password reset email body (Payload provides the default but plain-text).

### Estimated Hours Remaining: **4–8h**
- 1h MailHog smoke test locally.
- 1h send a real email from VPS to verify Hostinger SMTP works.
- 2–6h add HTML email templates if branded mails are required.

---

## 13. Admin Workflows

### Implemented Files
1. [`cms/payload.config.ts`](cms/payload.config.ts) — 100 lines. Registers all 9 collections + Settings global. Sets sidebar order: Users → Media → Pages → Services → CaseStudies → Partners → Posts → Leads → Redirects → Settings.
2. [`cms/app/(payload)/admin/[[...segments]]/page.tsx`](cms/app/(payload)/admin/[[...segments]]/page.tsx) — Payload's admin UI mounted at `/admin`.
3. [`cms/app/(payload)/admin/[[...segments]]/not-found.tsx`](cms/app/(payload)/admin/[[...segments]]/not-found.tsx) — 404 handler.
4. [`cms/app/(payload)/admin/importMap.js`](cms/app/(payload)/admin/importMap.js) — Payload's auto-generated client-component map.
5. [`cms/app/(payload)/api/[...slug]/route.ts`](cms/app/(payload)/api/[...slug]/route.ts) — Payload's REST API catchall.
6. [`cms/app/(payload)/api/graphql/route.ts`](cms/app/(payload)/api/graphql/route.ts) — GraphQL endpoint.
7. [`cms/app/(payload)/api/graphql-playground/route.ts`](cms/app/(payload)/api/graphql-playground/route.ts) — Dev playground.
8. [`cms/app/(payload)/layout.tsx`](cms/app/(payload)/layout.tsx) — Payload's RootLayout.
9. [`cms/app/(payload)/custom.css`](cms/app/(payload)/custom.css) — Minor brand-blue accent override.

### Database Tables
- `payload_preferences` — per-user admin UI state.
- `payload_migrations` — migration log.
- `payload_locked_documents` — concurrent-edit lock tracking.

### API Endpoints
- All Payload REST and GraphQL via the catchall route.

### Authentication Status
- `/admin` requires login.
- Field-level access enforced per collection access policies.

### Production Ready? **No**
- CMS has never booted in any environment. `pnpm dev` has not been executed in this branch.
- No custom dashboard widget exists (the `admin.components` config has placeholder for it but nothing wired).
- Payload's default branding (logo, accent) only partially overridden.

### Missing Code
- Custom dashboard widget (lead count, draft posts, recent activity). The Payload config has the slot empty.
- Brand logo upload.

### Estimated Hours Remaining: **4–8h**
- 2h first boot + admin login + walk every collection.
- 2–6h optional custom dashboard if wanted.

---

## 14. Deployment

### Implemented Files
1. [`docker-compose.yml`](docker-compose.yml) — 1,455 bytes. Postgres 16-alpine + MailHog. Dev only. Volume: `pgdata`.
2. [`next.config.mjs`](next.config.mjs) — Phase C.1 changes: `output: 'export'` removed (verified via cat). Replaced with `reactStrictMode`, `trailingSlash`, `images.remotePatterns`, `env.NEXT_PUBLIC_SITE_URL`.
3. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) — 1,117 bytes. **This workflow is broken for the current branch.** Targets GitHub Pages, expects `out/` directory which `next build` no longer produces because `output: 'export'` was removed.

### Database Tables
N/A.

### API Endpoints
N/A.

### Authentication Status
N/A.

### Production Ready? **No** — and not even close.
- **No VPS** provisioned.
- **No SSH access** configured.
- **No systemd units** present anywhere in the repo.
- **No Caddy config** present.
- **No TLS automation** present.
- **No backup cron scripts** present (`/etc/cron.daily/*` referenced only in `Documentation/Markdown/DEPLOYMENT_GUIDE.md` — not in the repo).
- **No Sentry / monitoring** code.
- **No CI smoke tests.** Confirmed: `find . -name '*.test.ts' -o -name '*.spec.ts'` returns no files.
- **No production secrets vault** — only `.env.example` templates.
- Current production (securityblogs.com.au) serves the last static-export build from `phase-b-content-migration` commit `4b03641`. **None of the Phase C code is in production.**

### Missing Code
EVERYTHING for Phase D infrastructure:
- VPS provisioning scripts (Ansible / Terraform / manual).
- `ops/` folder with systemd unit files (`sb-cms.service`, `sb-web.service`).
- `ops/Caddyfile` reverse proxy config.
- `ops/backup-pg.sh`, `ops/backup-media.sh` cron scripts.
- `ops/dr-drill.sh` restore-test script.
- Replacement GitHub Actions workflow (build → rsync to VPS → systemctl restart → smoke).
- Sentry SDK initialization in both apps.
- Health endpoint `/api/health`.

### Estimated Hours Remaining: **40–60h**
Per Phase D plan referenced in `docs/05-phases.md`:
- 8h VPS provisioning + hardening.
- 6h Postgres setup + first migrate + seed in production.
- 4h Caddy + TLS.
- 4h systemd units + log paths.
- 8h backup automation + DR drill.
- 4h Plausible self-host.
- 4h Sentry + uptime monitoring.
- 4h secrets vault decision + integration.
- 4h DNS cut-over plan + execution.

---

## 15. Summary table

| Area | Files on disk | DB migrated? | Endpoints hit in prod? | Prod ready? | Hours remaining |
|---|---|---|---|---|---|
| Users | 7 | No | No | **No** | 3–5 |
| Authentication | 7 | No | No | **No** | 3–5 (editorial); +20–30 if end-user auth needed |
| Leads | 5 (+ 4 form components) | No | No | **No** | 6–10 |
| Services | 4 (+ 7 seeded slugs ready) | No | No | **No** | 8–12 |
| Pages | 13 | No | No | **No** | 25–40 |
| Blog Posts | 4 | No | No | **No** | 12–18 |
| Case Studies | 4 | No | No | **No** | 5–7 |
| Media | 2 | No | No | **No** | 3–5 |
| Settings | 3 | No | No | **No** | 6–10 |
| Redirects | 4 | No | No | **No** | 4–6 |
| Airtable Integration | **0 in app code** | N/A | N/A | **No** | 0 (or 8–14 if added) |
| Email System | 1 (+ deps + 1 hook usage) | N/A | No (never sent) | **No** | 4–8 |
| Admin Workflows | 9 | No | No (CMS never booted) | **No** | 4–8 |
| Deployment | 3 (one BROKEN) | N/A | N/A | **No** | 40–60 |
| **TOTAL** | | | | **0/14 areas production-ready** | **~123–203 hours** |

---

## 16. What IS production today

**The marketing site only.** Production at `securityblogs.com.au` is the static-export build from branch `phase-b-content-migration` commit `4b03641`, deployed to Hostinger LiteSpeed shared hosting via the broken-on-this-branch GitHub Actions workflow.

That production build:
- Has zero backend.
- Posts forms to Web3Forms (3rd-party), not `/api/leads`.
- Has no CMS-driven content (everything hardcoded in the Phase B code).
- Has no Redirects middleware (relies on `public/.htaccess`).

**No file produced in Phase C (this audit's branch) is currently serving production traffic.**

---

## 17. Methodology

| Claim | Evidence command |
|---|---|
| "9 collections on disk" | `ls -la cms/src/collections/` returned 9 .ts files |
| "Settings global on disk" | `ls -la cms/src/globals/` returned `Settings.ts` |
| "8 seed scripts" | `ls -la cms/src/seed/` returned 8 .ts files |
| "Only `/api/leads` on marketing site" | `find app/api -name route.ts` returned exactly one file |
| "Only 3 marketing pages CMS-wired" | `grep -rl "from '@/lib/cms'" app --include='*.tsx'` returned the 3 dynamic routes; sampling 11 top-level pages confirmed none import it |
| "No Airtable client code" | `grep -l "airtable" --include='*.ts' --include='*.tsx' -r app components lib` returned no matches |
| "No /api/redirects/:id/hit endpoint" | `find . -path "*redirects*hit*"` returned no files |
| "No /api/leads/upload" | `find app/api/leads -type d` returned only the parent directory |
| "No /api/ai-score" | `find app/api -path "*ai-score*"` returned no files |
| "No NextAuth" | `grep -rl "next-auth" --include='*.json' .` returned no matches |
| "No tests" | `find . -name '*.test.ts' -o -name '*.spec.ts'` returned no matches |
| "GitHub Pages deploy workflow exists but expects `out/`" | Read `.github/workflows/deploy.yml` lines 34–43: builds via `npm run build` and uploads `out/` |
| "next.config.mjs no longer has output:'export'" | Read full `next.config.mjs`: only the COMMENT mentions it; the actual config object does not contain `output:'export'` |

Every claim in this report links to a specific file on disk or names the exact verification command. No statement is sourced from documentation, plans, or roadmaps.

---

*End of ACTUAL_BACKEND_IMPLEMENTATION_REPORT.md*
