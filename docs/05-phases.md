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

## Phase B — Content Migration

### Scope

- Add Pages, Services, CaseStudies, Glossary, Jobs, Directory,
  LegalPages, Settings, Redirects, AuditLog collections
- Seed scripts that import every page's hard-coded content from the
  existing TSX files into the CMS
- Visual-parity verification against production

### Phase B will deliver

| Collection | Purpose |
|---|---|
| `pages` | Home, About, Contact, Knowledge Hub index, Free Tools, AI Visibility Center, Book Strategy Call, Career index, Security Directory index, Thank You, Publish With Us + 7 sub-pages |
| `services` | The 7 service offerings (with capabilities, process steps, faqs, AI visibility) |
| `case_studies` | The 6 client case studies + per-case body content |
| `glossary` | Defined Terms entries |
| `jobs` | Open roles for /career/ |
| `directory_listings` | Security Directory entries |
| `legal_pages` | Privacy, Terms, Content Guidelines |
| `settings` | Sitewide config (logos, contact, footer, social, GTM, etc.) |
| `redirects` | The ~30 `.htaccess` 301s, editable from admin |
| `audit_log` | Append-only log of every admin action |

Plus 14 documentation guides updated.

### Phase B validation

- Every visible page on production has an equivalent CMS record
- Click-through audit: open production and staging side-by-side, verify
  word-for-word match on all 36 indexed URLs
- AI Visibility fields populated for the top 12 priority pages
- Audit log shows every change made during the migration

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
