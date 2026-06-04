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

## Phase C — Frontend Rewire

### Scope

- Marketing site (`app/`) switched from `output: 'export'` to ISR
- Page TSX files refactored to fetch from CMS (typed Payload client)
- New dynamic routes: `/services/[slug]`, `/case-studies/[slug]`,
  `/knowledge-hub/[category]/[slug]`
- `lib/submitForm.ts` → `/api/leads` (own endpoint) instead of Web3Forms
- Cloudflare Turnstile wired into the 5 public forms
- Sitemap, robots.txt, llms.txt generated from CMS data
- Frontend tests pass at staging URL

### Phase C validation

- Every page on `staging.securityblogs.com.au` renders identical to
  `securityblogs.com.au` (text + layout + meta + JSON-LD)
- Submitting the contact form lands in the Leads collection within 2 seconds
- Career application form upload works end-to-end
- Newsletter / visibility-challenge / visibility-checker forms all reach the CMS

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
