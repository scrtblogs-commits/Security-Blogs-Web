# 05 — Phases & Validation

The CMS is delivered in **four sequential phases**. Each phase has a
defined scope, an explicit validation checklist, and an explicit
sign-off before the next phase begins. You can pause indefinitely
between any two.

---

## Phase A — CMS Foundation **(this delivery)**

### Scope

- Payload CMS scaffolded at `cms/` (separate Next.js app, port 3001)
- PostgreSQL 16 (local docker-compose; managed Postgres on Hostinger VPS in Phase D)
- Authentication (Payload built-in: Argon2id passwords, JWT, lockout)
- 3 roles: Super Admin / Admin / Editor (`cms/src/access/`)
- Media library with image variants
- Posts collection (full blog management with AI Visibility field group)
- Leads collection (CRM-style: pipeline, assignment, timeline, closure tracking, email notification)
- Email transport (Hostinger SMTP via nodemailer; MailHog for dev)
- Seed script for first Super Admin
- This documentation set

### Files delivered in Phase A

```
cms/package.json
cms/next.config.mjs
cms/tsconfig.json
cms/.env.example
cms/.gitignore
cms/payload.config.ts
cms/src/access/roles.ts
cms/src/access/isLoggedIn.ts
cms/src/access/isAdmin.ts
cms/src/access/canPublish.ts
cms/src/access/isSelfOrAdmin.ts
cms/src/lib/aiVisibilityFields.ts
cms/src/collections/Users.ts
cms/src/collections/Media.ts
cms/src/collections/Posts.ts
cms/src/collections/Leads.ts
cms/src/email/transport.ts
cms/src/seed/admin.ts
cms/app/(payload)/layout.tsx
cms/app/(payload)/custom.css
cms/app/(payload)/admin/[[...segments]]/page.tsx
cms/app/(payload)/admin/[[...segments]]/not-found.tsx
cms/app/(payload)/admin/importMap.js
cms/app/(payload)/api/[...slug]/route.ts
cms/app/(payload)/api/graphql/route.ts
cms/app/(payload)/api/graphql-playground/route.ts
docker-compose.yml
docs/README.md
docs/01-architecture.md
docs/02-installation-local.md
docs/03-env-variables.md
docs/04-admin-portal-guide.md
docs/05-phases.md           ← this file
```

The existing marketing site (`app/`, `components/`, etc.) is untouched.
Production deploys continue to work as before. Nothing on the live site
has changed.

### Phase A validation checklist

Run through these in your local environment after following
`02-installation-local.md`:

- [ ] `docker compose up -d` brings up Postgres and MailHog
- [ ] `pnpm install` inside `cms/` succeeds
- [ ] `pnpm payload migrate` creates all 4 collections' tables
- [ ] `pnpm seed:admin` creates the first Super Admin
- [ ] `pnpm dev` boots the CMS on `localhost:3001`
- [ ] Admin login works at `localhost:3001/admin` with the seeded credentials
- [ ] Can change own password from "My Account"
- [ ] Can create a draft post, publish it, view in the listing
- [ ] Can upload an image and see thumbnail variants generated
- [ ] Can create a Lead manually
- [ ] Assigning a Lead to a user triggers an email (visible at `localhost:8025` in MailHog)
- [ ] Editor account can create their own posts but not delete others'
- [ ] Editor cannot delete media uploaded by an Admin
- [ ] Super Admin can demote / promote roles
- [ ] Locked-out account (5 failed logins) auto-unlocks after 10 minutes

When every checkbox passes — **Phase A is signed off**. Update this file
with the date below.

### Sign-off

- Validated locally on: ________________
- Validated by: ________________

---

## Phase B — Content Migration  *(current branch)*

### Scope (this delivery)

- Add **Services**, **CaseStudies**, **Partners**, **Pages**, **Redirects** collections
- Add **Settings** global (Payload Global, single-row sitewide config)
- Seed scripts that import current production content into each collection
- Updated `payload.config.ts` registering the new collections + global
- Updated `cms/package.json` with `seed:*` npm scripts per collection
- This documentation update

### Files delivered in Phase B

```
cms/src/collections/Partners.ts
cms/src/collections/Services.ts
cms/src/collections/CaseStudies.ts
cms/src/collections/Pages.ts
cms/src/collections/Redirects.ts
cms/src/globals/Settings.ts
cms/src/seed/settings.ts
cms/src/seed/services.ts
cms/src/seed/case-studies.ts
cms/src/seed/partners.ts
cms/src/seed/pages.ts
cms/src/seed/redirects.ts
cms/src/seed/all.ts
cms/payload.config.ts          ← modified
cms/package.json               ← modified
docs/05-phases.md              ← this file, updated
```

The existing marketing site (`app/`, `components/`, etc.) is untouched.
Production deploys continue to work as before.

### Phase B validation checklist

After Phase A's stack is running (`docker compose up -d` + `pnpm dev`):

1. Pull this branch + restart dev server (Payload picks up the new collections automatically).
2. Run migrations to add new tables:
   ```bash
   cd cms && pnpm payload migrate
   ```
3. Run the seed pipeline:
   ```bash
   pnpm seed:all
   ```
   Expected console output (idempotent — re-running shows "Updated" instead of "Created"):
   ```
   ✓ Settings seeded
   + Created service: security-seo
   + Created service: aio
   + Created service: aeo
   + Created service: geo
   + Created service: google-ads
   + Created service: bing-ads
   + Created service: web-design
   ✓ 7 services seeded.
   + Created case study: shieldtech-security
   ... (6 case studies)
   + Created partner: shieldtech-security
   ... (6 partners)
   + Created page: home
   ... (10 pages)
   Parsed 40 RedirectMatch rules from .htaccess
   ✓ Redirects: 40 created, 0 updated.
   ```
4. Open admin → walk the sidebar:
   - [ ] **Settings** (global) shows brand/contact/social/footer + GTM ID populated
   - [ ] **Services** lists 7 entries (Security SEO, AIO, AEO, GEO, Google Ads, Bing Ads, Web Design) all `published`
   - [ ] **Case Studies** lists 6 entries with `service` rel populated
   - [ ] **Partners** lists 6 entries with `caseStudy` + `services` rels populated
   - [ ] **Pages** lists at least 10 entries (home, about-us, contact, case-studies, free-tools, ai-visibility-center, book-strategy-call, career, security-directory, thank-you)
   - [ ] **Redirects** lists ~40 entries imported from `public/.htaccess`
5. Open a Service record (e.g. `security-seo`) and confirm:
   - Tabs: Overview, Capabilities, Process, Stats & Results, FAQs, Benefits
   - All arrays populated with current production data
   - **AI Visibility** sidebar tab is present (empty — fill from admin going forward)
6. Open a Page record (e.g. `home`):
   - `modules` shows ordered blocks: hero, stats, cta-band
   - Each block edits with correct field shape
7. Run `pnpm seed:all` a second time. Expected: every line shows `Updated` instead of `Created` (idempotency check).
8. Open a Redirect entry, change `isActive` to `false`, save. Reopen — change persisted.

When every checkbox passes — **Phase B is signed off**.

### Sign-off

- Validated locally on: ________________
- Validated by: ________________

---

## Phase C — Frontend Rewire **(this delivery — C.1 plumbing)**

### Scope (this delivery)

Phase C is split in two: **C.1 plumbing** (this branch) and **C.2
per-page migration** (a separate later branch). C.1 ships the
infrastructure that lets any page fetch from the CMS; C.2 walks through
each hand-built page and swaps its hard-coded content for a CMS read.

C.1 in detail:

- `next.config.mjs` flipped off `output: 'export'` → standard Next.js
  server rendering with ISR. **This breaks the static-export tar deploy
  pipeline**, so this branch is NOT deployable to the existing
  LiteSpeed shared host. Production keeps serving the last static
  build until Phase D's VPS cut-over.
- `lib/cms.ts` — typed Payload REST client. All page fetches go through
  here. Per-call ISR revalidate, fail-soft errors, cache tags per
  collection for surgical purges.
- `lib/cmsTypes.ts` — hand-maintained TS read-shape mirror of the
  collection schemas.
- `app/api/leads/route.ts` — Lead submission endpoint replacing
  Web3Forms. Validates, Turnstile-verifies, rate-limits, creates the
  Lead via the CMS local API.
- `lib/submitForm.ts` rewired from Web3Forms to `/api/leads`. Public
  signature unchanged so all 5 existing forms keep working.
- `components/Turnstile.tsx` — drop-in Cloudflare Turnstile widget.
- `middleware.ts` — CMS-driven redirects (literal + regex), cached 60s,
  fires hit-counter to `/api/redirects/:id/hit`.
- `components/modules/ModuleRenderer.tsx` + 9 block components +
  `LexicalRenderer.tsx` — read-time renderers for every block type the
  Pages collection supports.
- Dynamic route shells:
  - `app/services/[slug]/page.tsx` — fetches CmsService, ISR 60s
  - `app/case-studies/[slug]/page.tsx` — fetches CmsCaseStudy, ISR 60s
  - `app/knowledge-hub/[category]/[slug]/page.tsx` — fetches CmsPost, ISR 60s
  - All three coexist with the legacy hand-built routes (static
    sub-segments shadow `[slug]` in the App Router); legacy routes are
    removed one at a time in Phase C.2.
- `app/sitemap.ts` — now generated from CMS + hand-built path list.
- `app/robots.ts` — reads `Settings.maintenance.enabled` from the CMS.
- `app/llms.txt/route.ts` — generated from CMS (services, studies,
  posts grouped by category, contact details).
- `public/llms.txt` removed (was the static-export version).
- `.env.example` updated with `CMS_URL`, `PAYLOAD_API_KEY`,
  `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`,
  `NEXT_PUBLIC_SITE_URL`.

### What is NOT in C.1 (deferred to C.2)

- The home page (`app/page.tsx`) and the 10 other top-level pages still
  read from `lib/site.ts` constants and hard-coded JSX. C.2 swaps each
  to render the CMS `Page` record + `ModuleRenderer`.
- The 7 hand-built service pages (`app/services/aio/`, etc.) still
  exist. C.2 deletes each one (folder by folder) so the dynamic
  `[slug]` route takes over.
- The 8 hand-built knowledge-hub category landings still exist. C.2
  rewires each to fetch its post list from the CMS.
- Multipart file uploads (CV uploads in `ApplicationForm`) — `/api/leads`
  currently records the filename as a string in the lead's meta. C.2
  adds a multipart `/api/upload` endpoint that stores the file in the
  Media collection and links it to the lead.
- Turnstile widget is *available* but not yet rendered inside the 5
  form components. C.2 adds `<Turnstile />` to each form.

### Files delivered in Phase C.1

```
next.config.mjs              ← modified (output:'export' removed)
.env.example                 ← modified (CMS_URL, TURNSTILE_*, PAYLOAD_API_KEY)
public/llms.txt              ← deleted
app/robots.ts                ← modified (reads Settings.maintenance)
app/sitemap.ts               ← modified (now reads CMS)
app/api/leads/route.ts       ← new (form submission endpoint)
app/llms.txt/route.ts        ← new (dynamic /llms.txt from CMS)
app/services/[slug]/page.tsx                    ← new
app/case-studies/[slug]/page.tsx                ← new
app/knowledge-hub/[category]/[slug]/page.tsx    ← new
middleware.ts                ← new (CMS-driven redirects)
lib/cms.ts                   ← new (typed CMS client)
lib/cmsTypes.ts              ← new (read-shape types)
lib/submitForm.ts            ← rewired (Web3Forms → /api/leads)
components/Turnstile.tsx     ← new
components/modules/ModuleRenderer.tsx           ← new
components/modules/LexicalRenderer.tsx          ← new
components/modules/blocks/HeroBlock.tsx         ← new
components/modules/blocks/CapabilitiesBlock.tsx ← new
components/modules/blocks/StatsBlock.tsx        ← new
components/modules/blocks/FaqsBlock.tsx         ← new
components/modules/blocks/CtaBandBlock.tsx      ← new
components/modules/blocks/RichTextBlock.tsx     ← new
components/modules/blocks/ImageBlock.tsx        ← new
components/modules/blocks/ProcessStepsBlock.tsx ← new
components/modules/blocks/ValuesBlock.tsx       ← new
docs/05-phases.md            ← this file, updated
docs/06-frontend-data-flow.md ← new (architecture reference)
```

Existing static service pages, knowledge-hub landings, and top-level
pages are untouched and keep rendering as before.

### Phase C.1 validation checklist

Pre-req: Phase A + B running locally (`docker compose up -d`, CMS at
`localhost:3001`, `pnpm seed:all` complete).

1. Set marketing-site env vars in `.env.local` at repo root:
   ```
   CMS_URL=http://localhost:3001
   PAYLOAD_API_KEY=<paste from Payload admin → Users → API Key>
   TURNSTILE_SECRET_KEY=          # leave empty for local dev
   NEXT_PUBLIC_TURNSTILE_SITE_KEY= # leave empty for local dev
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
2. Pull this branch + start marketing site:
   ```bash
   git fetch && git checkout phase-c-frontend-rewire
   pnpm install
   pnpm dev                       # boots on :3000
   ```
3. Smoke-test existing pages still render:
   - [ ] `localhost:3000/` — home renders identical to current production
   - [ ] `localhost:3000/aio/` — legacy hand-built page renders
   - [ ] `localhost:3000/case-studies/` — index renders
4. New CMS-driven routes:
   - [ ] `localhost:3000/services/security-seo/` — renders from CMS
         (tabs: hero, capabilities, process, stats, faqs)
   - [ ] `localhost:3000/services/web-design/` — renders from CMS
   - [ ] `localhost:3000/case-studies/shieldtech-security/` — renders
         from CMS, including results metrics
   - [ ] `localhost:3000/knowledge-hub/blog/<slug-of-any-seeded-post>/`
         — renders Lexical body, metadata, author
5. SEO files come from CMS:
   - [ ] `curl localhost:3000/sitemap.xml` lists every service + study +
         post URL from the CMS
   - [ ] `curl localhost:3000/robots.txt` shows the normal allow rules
         (flip `Settings.maintenance.enabled = true` in admin → wait
         600s or run with `revalidate=0` → confirm it switches to
         `Disallow: /`)
   - [ ] `curl localhost:3000/llms.txt` shows brand header + sections
         per service / case-study / posts-by-category
6. Form submission:
   - [ ] Open `localhost:3000/contact/`, fill + submit
   - [ ] Admin → Leads — new entry appears within 2s
   - [ ] MailHog at `localhost:8025` — assigned-to notification email
         landed if the form picked an assignee
   - [ ] Resubmit 16 times within 15 minutes from the same IP — 16th
         attempt returns HTTP 429
7. Redirect middleware:
   - [ ] `curl -I localhost:3000/aio` (no trailing slash) — should 301
         per the seeded `.htaccess` rule
   - [ ] Admin → Redirects → open the rule that just fired → `hitCount`
         incremented by 1
   - [ ] Toggle `isActive = false` on a rule, wait 60s, confirm
         middleware stops serving it
8. ISR purge:
   - [ ] Edit a Service's `heroDescription` in admin, save
   - [ ] Wait 60s, refresh `/services/<slug>/` — new text appears
         without a redeploy

When every checkbox passes — **Phase C.1 is signed off**. Phase C.2
(per-page migration) begins on a new branch.

### Sign-off

- Validated locally on: ________________
- Validated by: ________________

---

## Phase D — Production Cut-over

### Scope

- Hostinger VPS Cloud provisioned and hardened
- Caddy reverse proxy + Let's Encrypt HTTPS
- systemd units for the CMS + Next.js processes
- Daily backup cron (pg_dump + media archive)
- Off-site mirror configured
- Self-hosted Plausible deployed at `stats.securityblogs.com.au`
- DNS swap from Hostinger shared → VPS (24-hour propagation window)
- Hostinger shared static deploy decommissioned after 30 days

### Phase D validation

- Production loads from the VPS
- HTTPS A+ on Qualys SSL Test
- Backup cron has run at least 3 nights successfully
- DR drill (`db/scripts/dr-drill.sh`) restores a fresh staging VM from
  yesterday's backup and passes a smoke test
- All operational documentation has been followed top-to-bottom by a
  reviewer on a fresh machine

---

## Rollback policy

At any phase boundary, the previous phase's deploy is still live and
functional. Rollback steps:

| If something breaks in | Rollback action |
|---|---|
| Phase A | Local only — nothing reaches production yet |
| Phase B | Staging only — nothing reaches production yet |
| Phase C | DNS still points to current Hostinger static; staging is the only impact |
| Phase D (cut-over) | Revert DNS A record to Hostinger shared IP (5-minute fix) |

Each phase produces a tagged git release (`v0.A.0`, `v0.B.0`, `v0.C.0`,
`v1.0.0`) so you can `git checkout` to any phase's exact state.
