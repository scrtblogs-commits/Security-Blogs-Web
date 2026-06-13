# BACKEND_AUDIT_REPORT

**Repository:** `Jonaid880/Security-Blogs`
**Branch audited:** `phase-c-frontend-rewire` (cumulative — Phase A + B + C.1)
**Commit:** `aff73053e4b45c9dfbbe1216b0bb05436fedf977`
**Date:** 2026-06-14
**Auditor:** Claude Opus 4.7 (1M context)

---

## Honesty disclosure (read first)

This audit is based on **static analysis of the repository** — file inventory, git log, code reading. **No code has been executed.** Specifically:

- The CMS has never been booted in this environment.
- `pnpm install`, `pnpm payload migrate`, `pnpm seed:all` have NOT been run.
- The marketing site was preview-served once today against a stopped CMS (the legacy hardcoded pages render fine; CMS fetches log `ECONNREFUSED` and the routes gracefully fall back).
- No unit, integration, or end-to-end tests exist in the repo.
- No production deploy of this branch has occurred. Production (`securityblogs.com.au`) still serves the last static build from the `phase-b-content-migration` branch tip.

Completeness percentages and hour estimates below are best-effort engineering judgements, not measured deliveries. They assume a single senior full-stack engineer familiar with Next.js + Payload working at normal pace.

---

## 1. Executive Summary

The repository contains a fully scaffolded Node.js backend (Payload CMS 3, PostgreSQL 16, Hostinger SMTP, Argon2id + JWT auth) and the connective plumbing on the marketing site to consume it (typed client, ISR, CMS-driven SEO files, redirect middleware, form-submission endpoint). The **infrastructure is complete and structurally sound**. What's missing is **per-page content migration** (every top-level marketing page still reads hardcoded constants instead of CMS data), **production deployment infrastructure** (the existing GitHub Actions deploy targets the now-broken static export), and **operational hardening** (no tests, no monitoring, no backup automation, no secrets management beyond `.env.example`).

In one sentence: **the backend exists and can theoretically serve the site, but nothing on the actual production frontend reads from it yet, and there is no production environment for it to live in.**

---

## 2. Required Component Table

| Component | Current Status | % Complete | Production Ready | Missing Work | Est. Hours |
|---|---|---|---|---|---|
| **Backend — Payload CMS app (`cms/`)** | Scaffolded, configured, 9 collections + 1 global registered, seeds written. Never booted. | 85% | No | Run `pnpm payload migrate` + `pnpm seed:all` to confirm schema migrations succeed against real Postgres. Fix any TypeScript/Payload version mismatches that surface. | 4–8 |
| **PostgreSQL 16 schema** | Auto-generated from Payload collections via `@payloadcms/db-postgres` adapter. Migration SQL not yet executed. | 80% | No | First `pnpm payload migrate` will materialize the schema. Validate FK constraints, unique indexes, JSON column types. Take an initial `pg_dump` as the baseline. | 2–3 |
| **Authentication (Argon2id + JWT)** | Configured on Users collection. 3 roles, 5-attempt lockout, 8h token expiry, secure cookies in prod. Seed script for first Super Admin written. Never executed. | 90% | No | Run `pnpm seed:admin`. Verify lockout actually triggers, JWT verification works, cookie flags correct in production NODE_ENV. Add password reset flow (currently `verify: false` — admin invites only). | 3–5 |
| **Admin panel (Payload built-in)** | Hosted at `cms/app/(payload)/admin/[[...segments]]/page.tsx` — Payload provides the full UI. Custom CSS tweaks present (`custom.css`). Brand-blue accent applied. | 95% | No | Boot the CMS to confirm UI renders without import errors. Verify sidebar order, tab labels, field rendering. Add custom dashboard widget (lead count / draft posts) — optional. | 1–3 |
| **9 Payload collections** | Users, Media, Posts, Leads, Services, CaseStudies, Partners, Pages (blocks-based), Redirects. All schemas + access policies + hooks written. | 100% (schema) / 0% (runtime-validated) | No | Migrate + seed locally. Verify every relationship resolves at `depth=2`. Check that draft autosave doesn't corrupt nested arrays. | 2–4 |
| **Settings global (singleton)** | Brand / Contact / Social / Footer / SEO / Analytics / Booking / Cookie / Maintenance tabs. Seed script populates from current production values (incl. GTM-KS9SXB2K). | 100% (schema) | No | Seed it, edit each tab once in admin to verify field rendering. | 1 |
| **Media library + image variants** | Local-disk adapter, 4 image sizes (thumb/small/medium/large), focal point, WebP transcoding at quality 82. | 90% | No | Verify Sharp can process upload server-side (Sharp install on Windows can be flaky). Move to S3 / object storage before production scale. | 4–6 (S3 swap) |
| **Email transport (Hostinger SMTP + MailHog)** | nodemailerAdapter configured with env-driven host/port/secure. MailHog catches mail in dev. | 85% | No | Test send a lead-assignment email. Confirm Hostinger SMTP auth from VPS IP (Hostinger sometimes blocks unverified senders). Set up SPF / DKIM / DMARC for info@securityblogs.com.au. | 3–5 |
| **Seed scripts (8 total)** | admin, settings, services (7 records), case-studies (6), partners (6), pages (10), redirects (parses public/.htaccess → ~40), and `all.ts` orchestrator. All idempotent (upsert by slug). | 100% | No | Run `pnpm seed:all`. Verify FK resolution between Services / CaseStudies / Partners actually creates linked records, not orphan IDs. | 2–4 |
| **Typed CMS client (`lib/cms.ts`)** | getSettings, getServices, getService, getCaseStudies, getCaseStudy, getPartners, getPartner, getPages, getPage, getPosts, getPost, getActiveRedirects, incrementRedirectHit, createLead. Per-call ISR. Fail-soft errors. | 100% (Phase C.1 scope) | Yes — for what it does | None within scope. Add a typed `revalidateTag()` helper for surgical purges in Phase C.2 hooks. | 0 |
| **Lead-submission endpoint (`/api/leads`)** | Honeypot + Turnstile verify + per-IP rate limit (15/15min) + manual validation + `createLead()` via CMS local API. | 95% | No | Add multipart variant for Career CV uploads (`/api/leads/upload`). Replace in-memory rate limit with Redis once horizontally scaled. | 4–6 (uploads) |
| **Redirect middleware (`middleware.ts`)** | Edge runtime, reads `/api/redirects?where[isActive]=true` cached 60s, literal + regex matching, fire-and-forget hit log POST. | 90% | No | The hit-counter endpoint `/api/redirects/:id/hit` is referenced but **not yet implemented on the CMS side** — middleware fires the POST but nothing receives it. Counts stay at 0. | 2 |
| **Dynamic routes (`/services/[slug]`, `/case-studies/[slug]`, `/knowledge-hub/[category]/[slug]`)** | Server components, generateStaticParams + generateMetadata + revalidate=60. Fetch from CMS via typed client. | 100% (Phase C.1 scope) | Yes — but shadowed by legacy folders | Existing static folders (`app/services/aio/`, etc.) win the route match. Phase C.2 deletes them one at a time so the dynamic route takes over. | 0 (covered by Phase C.2) |
| **ModuleRenderer + 9 block components + LexicalRenderer** | Dispatcher switches on `block.blockType`. Components: Hero, Capabilities, Stats, Faqs, CtaBand, RichText, Image, ProcessSteps, Values. Lexical → JSX walker (paragraph/heading/list/link/quote/format flags). | 100% | Yes — for what it does | Visual polish per block. Lexical walker doesn't handle exotic node types (collapsibles, callouts) — only the 9 stock node types. | 0 |
| **SEO files (`sitemap.xml`, `robots.txt`, `llms.txt`)** | All three generated from CMS with hand-built fallbacks. `robots.txt` reads `Settings.maintenance.enabled` to flip to `Disallow: /`. | 100% | Yes | None. | 0 |
| **`output: 'export'` → ISR config** | `next.config.mjs` no longer emits `output: 'export'`. ISR-capable server rendering enabled. Image `remotePatterns` allowlist defined. | 100% | Yes (for VPS) / No (for current static deploy) | Breaks the existing GitHub Actions deploy. Phase D builds new deploy pipeline. | 0 |
| **Cloudflare Turnstile widget** | Drop-in `<Turnstile />` component. Lazy-loads turnstile.js. Renders nothing when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` unset (graceful dev fallback). | 100% (widget) / 0% (wired into forms) | No | Insert `<Turnstile />` into 5 form components: ContactForm, ApplicationForm, GuestPostForm, AIVisibilityChallenge, VisibilityChecker. Provision a real Cloudflare site key. | 2–3 |
| **Marketing-site frontend — top-level pages** | All 11 top-level pages (home, about-us, contact, career, case-studies, free-tools, etc.) still read hardcoded constants from `lib/site.ts` or inline JSX. Render fine; ignore CMS. | 0% (CMS-rewired) / 100% (visually intact) | No | Phase C.2 — rewrite each page's `page.tsx` to `await getPage(slug)` + `<ModuleRenderer modules={page.modules} />`. Delete hardcoded JSX blocks. | 12–18 |
| **Marketing-site frontend — 7 service detail pages** | Static folders at `app/services/aio/`, `aeo/`, `geo/`, `security-seo/`, `google-ads/`, `bing-ads/`, `web-design/` still own the routes. Each is 200–600 lines of hardcoded JSX + per-page custom components. | 0% (deletion pending) | No | Phase C.2 — for each, validate CMS Service record has matching content, then `rm -rf` the folder. Dynamic `[slug]` route takes over. Add redirect rules if any deep links change. | 6–10 |
| **Marketing-site frontend — 8 knowledge-hub category pages** | `/knowledge-hub/blogs/`, `industry-news/`, `security-guides/`, `research-reports/`, `security-industry-seo/`, `security-trends-2026/`, `definitions-glossary/`, hub index. Each reads hardcoded post lists. | 0% (CMS-rewired) | No | Phase C.2 — rewrite each landing to `await getPosts({ category })` then map to listing cards. Need a CategoryListingBlock component. | 6–10 |
| **Lexical rich-text editor** | Default `lexicalEditor({})` from `@payloadcms/richtext-lexical`. No custom features, no callouts, no embeds. | 75% | Yes (for prose) | Add Image block, Callout, Embed (YouTube), Code block features if editors need them. | 6–10 (if needed) |
| **Docker Compose dev stack** | Postgres 16-alpine + MailHog. `pgdata` volume, healthcheck on db, ports 5432 / 1025 / 8025 exposed. Never started. | 100% (config) / 0% (verified) | No | Run `docker compose up -d` — confirm both containers come up healthy, ports are free. | 0.5 |
| **Documentation (`docs/`)** | 7 docs: README, architecture, installation-local, env-variables, admin-portal-guide, phases (A→D plan), frontend-data-flow. | 95% | Yes (for the team) | Add a Phase D ops runbook (provisioning, deploy steps, rollback). | 4–6 |
| **Tests** | **NONE.** No unit, integration, or end-to-end tests anywhere in the repo. | 0% | No | Minimum to be production-ready: contract tests on `lib/cms.ts` typed getters, smoke test on `/api/leads`, Playwright test that submitting a contact form lands in admin Leads. | 16–24 |
| **CI/CD pipeline** | Existing `.github/workflows/deploy.yml` targets GitHub Pages with `out/` static export. **This is BROKEN for the current branch** because `output: 'export'` was removed. Runs only on `main` (never triggered for this work). | 0% (for ISR) | No | Replace with a VPS deploy workflow: build frontend + CMS, rsync/tar to VPS, restart systemd units, run smoke check. | 8–12 |
| **Hostinger VPS infrastructure** | Not provisioned. No SSH access configured, no DNS prep, no firewall, no OS hardening, no TLS, no reverse proxy, no systemd units, no log shipping. | 0% | No | Phase D — full VPS spin-up. Caddy + Let's Encrypt, 3 systemd units (cms, web, postgres if not Docker), UFW firewall, fail2ban, automated security updates. | 12–20 |
| **Backup automation** | None. No `pg_dump` cron, no media archive cron, no off-site mirror. | 0% | No | nightly `pg_dump` → encrypted → push to a second region. Daily `tar` of `media-uploads/`. DR drill script + monthly fire test. | 6–10 |
| **Self-hosted Plausible analytics** | Not provisioned. The Settings global has fields for it but no infrastructure yet. | 0% | No | Phase D — `stats.securityblogs.com.au` subdomain, Plausible Docker compose, register the site, embed the script in `<head>`. | 4–6 |
| **Production observability / monitoring** | None. No log aggregation, no error tracking, no uptime monitoring. | 0% | No | Sentry SDK in both apps (CMS + frontend). UptimeRobot or BetterStack on `/api/health`. CloudWatch / Loki / Grafana for VPS logs. | 6–10 |
| **Secrets management** | `.env.example` templates exist. Actual secrets live in local `.env.local` (gitignored). No production vault, no rotation policy. | 30% | No | Decide: 1Password Connect / Doppler / SOPS / Hostinger env vars. Document rotation cadence for PAYLOAD_SECRET, SMTP creds, API keys. | 3–5 |
| **DNS cut-over plan** | Documented in `docs/05-phases.md` Phase D. Not executed. | 0% | No | Lower TTL 48h before cut. Snapshot of current static `out/`. Cut A record from shared host → VPS. 24h propagation window. Rollback A-record entry pinned in DNS provider. | 2–3 |
| **TOTAL** | | **~46% (weighted by hours)** | **No — for production** | | **~115–185 hours** |

---

## 3. Current Frontend Architecture

### Stack
- **Next.js 15.5.18** App Router
- **React 19**
- **TypeScript** end-to-end
- **Tailwind CSS 4** (utility-first styling)
- **Framer Motion 11** for animations
- **Mapbox GL 3.9** + **Google Maps JS** for GEO map widgets
- **Lucide React** for icons
- **Splinetool** for the 3D hero component

### Topology
- **Repo layout:** monorepo. Frontend at root (`app/`, `components/`, `lib/`, `public/`). Backend in `cms/` subfolder. Single `package.json` at root for the frontend, separate `cms/package.json` for backend.
- **Rendering mode:** `output: 'export'` (static) has been **removed** as of Phase C.1. The branch is now ISR-capable Next.js server rendering. **This means the existing static-export deploy pipeline is broken on this branch.**
- **Routes:** 71 `page.tsx` files. Most are hardcoded JSX. Phase C.1 added 3 dynamic routes that fetch from CMS (`/services/[slug]`, `/case-studies/[slug]`, `/knowledge-hub/[category]/[slug]`) and 1 dynamic category route (`/knowledge-hub/[category]`).
- **Middleware:** `middleware.ts` at root runs on edge, intercepts every request, fetches CMS redirect rules cached 60s, applies 301/302 with regex backref support.
- **Forms:** 5 forms (ContactForm, ApplicationForm, GuestPostForm, AIVisibilityChallenge, VisibilityChecker) all funnel through `lib/submitForm.ts` → `/api/leads`. Web3Forms integration removed in Phase C.1.

### What's CMS-driven vs hardcoded
| Surface | State |
|---|---|
| Sitemap, robots.txt, llms.txt | **CMS-driven** (Phase C.1) |
| Redirect rules | **CMS-driven** (Phase C.1) |
| Lead submission | **CMS-driven** (Phase C.1) |
| Home page content | **Hardcoded** — needs C.2 |
| Service detail pages (7 of them) | **Hardcoded** — needs C.2 |
| Knowledge-hub category landings (8 of them) | **Hardcoded** — needs C.2 |
| About / Contact / Career / etc. | **Hardcoded** — needs C.2 |
| Header / Footer (shared layout) | **Hardcoded** — needs C.2 |

### Frontend completeness vs CMS integration
- **Visual completeness:** ~100%. The site renders as it does in production. Phase C.1 didn't touch any existing visual surface.
- **CMS integration:** ~15% of routes actually pull from CMS (the 4 new dynamic ones + the SEO files). 85% still ignore the CMS.

---

## 4. Current Backend Architecture

### Stack
- **Payload CMS 3** (open-source, MIT, self-hosted)
- **PostgreSQL 16** via `@payloadcms/db-postgres` adapter
- **Node.js 22+** runtime (Next.js 15 requirement)
- **Argon2id** password hashing
- **JWT** auth, 8-hour expiry, secure cookies in prod
- **Nodemailer** + Hostinger SMTP (MailHog catches mail in dev)
- **Lexical** rich-text editor
- **Sharp** for image transcoding
- **@payloadcms/storage-local** for media (local disk, S3 swap planned)

### Topology
- CMS is a **separate Next.js app** at `cms/`, port 3001. Marketing site is at root, port 3000.
- Admin UI lives at `/admin` (`cms/app/(payload)/admin/[[...segments]]/page.tsx`).
- REST API at `/api/<collection>` and `/api/globals/<global>` (auto-generated by Payload).
- GraphQL at `/api/graphql` + playground at `/api/graphql-playground`.
- Connection to marketing site: `lib/cms.ts` on the marketing side calls Payload REST with a server-side `PAYLOAD_API_KEY`. Never called from the browser.

### What's wired

| Layer | Implemented | Validated at runtime |
|---|---|---|
| Database adapter (Postgres) | Yes | No |
| Schema migrations | Generated automatically | No (never run) |
| Auth (Argon2 + JWT) | Yes | No |
| 3-role RBAC | Yes (`cms/src/access/`) | No |
| 9 collections + 1 global | Yes | No |
| Hooks (afterLogin, beforeChange, afterChange) | Yes | No |
| Email transport | Yes | No |
| Media uploads | Yes (local disk) | No |
| Seed scripts | 8 idempotent scripts | No |
| Admin UI customisation | Brand-blue accent only | No |

---

## 5. Implemented Payload Collections

All 9 collections + 1 global are registered in `cms/payload.config.ts:61` and have full schemas with access policies + hooks. Listed in admin sidebar order:

| # | Collection | Slug | Records seeded | Purpose | Notable features |
|---|---|---|---|---|---|
| 1 | **Users** | `users` | 1 (seed:admin → first Super Admin) | Auth provider + role management | Argon2id, 8h JWT, 5-attempt lockout, lastLoginAt tracking, afterLogin hook updates loginCount |
| 2 | **Media** | `media` | 0 | Upload library | 4 image sizes (thumb 160 / small 480 / medium 960 / large 1600), focal point, WebP transcoding @ Q82, uploadedBy auto-stamped |
| 3 | **Pages** | `pages` | 10 (home, about-us, contact, etc.) | Block-based marketing pages | 9 block types: hero, capabilities, stats, faqs, cta-band, rich-text, image, process-steps, values. Versions: drafts + autosave 2s + schedulePublish. AI Visibility group included. |
| 4 | **Services** | `services` | 7 (security-seo, aio, aeo, geo, google-ads, bing-ads, web-design) | Service catalogue + detail pages | Tabbed editor (Overview / Capabilities / Process / Stats / FAQs / Benefits). Capabilities have `previewVariant` select with ~40 themed visual options. AI Visibility group. |
| 5 | **CaseStudies** | `case-studies` | 6 (shieldtech-security, armourguard-au, nexus-security-group, clearvault-cctv, bioentry-systems, accesspro-au) | Client outcome narratives | Slug, partner rel, service rel, results metrics array, Lexical body. AI Visibility group. |
| 6 | **Partners** | `partners` | 6 | Client / partner / integrator / vendor relationships | Type (client/partner/integrator/vendor/community), region (AU/US/GB/AE/SG/other), services hasMany rel, caseStudy rel, isFeatured flag, AI Visibility group. |
| 7 | **Posts** | `posts` | 0 (none in seed — created via admin) | Blog / knowledge-hub articles | 6 categories. Draft / Scheduled / Published / Archived lifecycle. Author rel auto-defaulted from current user. Reading time + view count. AI Visibility group. |
| 8 | **Leads** | `leads` | 0 (form submissions create these) | CRM-style lead management | 5 tabs (Contact, Pipeline, Timeline, Closure, Forensic). Status pipeline (new→contacted→qualified→proposal_sent→nurturing→won/lost/spam). Assignment with email notification via afterChange hook. Timeline auto-appends on status change + assignment. |
| 9 | **Redirects** | `redirects` | ~40 (parsed from `public/.htaccess`) | 301/302/307/308 rules consumed by middleware | Literal + regex (with $1/$2 backrefs). hitCount field exists but **not yet incremented** (CMS-side `/redirects/:id/hit` endpoint not built). |

### Global

| Global | Slug | Tabs |
|---|---|---|
| **Settings** | `settings` | Brand / Contact / Social / Footer / SEO Defaults / Analytics / Booking Slots / Cookie Banner / Maintenance. Read public; update super_admin only. |

### Reusable field groups

| Group | File | Used by |
|---|---|---|
| `aiVisibilityField` | `cms/src/lib/aiVisibilityFields.ts` | Posts, Services, CaseStudies, Partners, Pages (sidebar tab on each) |

---

## 6. Implemented API Endpoints

### Auto-generated by Payload (REST)

Every collection gets `GET / POST / PATCH / DELETE /api/<slug>` automatically. Listed by example URL:

| Endpoint | Auth | Notes |
|---|---|---|
| `GET /api/users/me` | Bearer | Current user |
| `POST /api/users/login` | None | Returns JWT + sets cookie |
| `POST /api/users/logout` | Bearer | |
| `POST /api/users/refresh-token` | Bearer | |
| `GET /api/users` | Logged in | Filtered by `isSelfOrAdmin` |
| `GET /api/media` | Public | Public read so frontend can resolve URLs |
| `POST /api/media` | Logged in | Multipart upload |
| `GET /api/pages?where[slug][equals]=home` | Public for published | Used by `lib/cms.ts → getPage()` |
| `GET /api/services?where[status][equals]=published` | Public for published | Used by `getServices()` |
| `GET /api/case-studies` | Public for published | Used by `getCaseStudies()` |
| `GET /api/partners` | Public for active | |
| `GET /api/posts?where[category][equals]=blog` | Public for published | |
| `POST /api/leads` | Server (API key) | Used by `/api/leads` route on marketing site |
| `GET /api/redirects?where[isActive][equals]=true` | Public | Used by `middleware.ts` (60s cache) |
| `GET /api/globals/settings` | Public | Used by `getSettings()` |
| `PATCH /api/globals/settings` | Super admin only | |

### GraphQL

| Endpoint | Auth |
|---|---|
| `POST /api/graphql` | Bearer (where access policies allow) |
| `GET /api/graphql-playground` | Dev-only interactive query UI |

### Custom (marketing site)

| Endpoint | File | Auth | Purpose |
|---|---|---|---|
| `POST /api/leads` | `app/api/leads/route.ts` | Public (Turnstile-verified) | Form submission → CMS Lead. Honeypot, rate limit (15/15min by IP), manual validation. |

### Missing custom endpoints (referenced but not implemented)

| Endpoint | Status | Where referenced |
|---|---|---|
| `POST /api/redirects/:id/hit` | **Not implemented** | `middleware.ts` fires fire-and-forget POST; nothing receives it. hitCount stays at 0. |
| `POST /api/leads/upload` (multipart) | **Not implemented** | Career CV upload — currently `submitForm` stores `[file: filename]` as a string in lead meta. |
| `POST /api/ai-score` | **Not implemented** | AI Visibility Score widget — speculative future endpoint. |
| `GET /api/ad-metrics` | **Not implemented** | Live ad metrics widget — speculative future endpoint. |

---

## 7. PostgreSQL Schema

### Database
- **Engine:** PostgreSQL 16-alpine
- **Connection:** `postgres://securityblogs:securityblogs@db:5432/securityblogs` (default in `docker-compose.yml`)
- **Volume:** `pgdata` (Docker named volume)
- **Healthcheck:** `pg_isready -U securityblogs` every 5s

### Schema status
- **Materialised:** No. `pnpm payload migrate` has never been run.
- **Generated by:** `@payloadcms/db-postgres` adapter introspects collection schemas at boot. In dev (`push: true`), changes auto-migrate. In prod (`push: false`), explicit migrations required.
- **Tables (expected after first migrate):**
  - `users` (auth fields + name/role/avatar/isActive/lastLoginAt/loginCount)
  - `media` (filename, mimeType, filesize, sizes JSON, altText, caption, credit, uploadedBy)
  - `pages` (title, slug unique, modules JSON blocks array, aiVisibility JSON, status, publishedAt)
  - `pages_v` + `pages_v_blocks_*` (drafts/versions tables, auto-created by Payload)
  - `services` (title, slug unique, capabilities/processSteps/stats/faqs/benefits arrays as JSONB)
  - `case_studies` (slug unique, partner FK, service FK, body JSON Lexical, results JSON)
  - `partners` (slug unique, type, region, services rel table, caseStudy FK)
  - `posts` (slug unique, category, author FK, body JSON Lexical, tags JSON, readingMinutes)
  - `leads` (large table — name, email, status, lifecycleStage, priority, assignedTo FK, timeline JSON, extras JSON, plus all forensic fields)
  - `redirects` (fromPath unique, toPath, statusCode, isRegex, isActive, hitCount)
  - `settings` (singleton — global table)
  - Payload's internal `payload_preferences`, `payload_migrations`, `payload_locked_documents`
  - `_join_*` tables for many-to-many relations (Partners.services, etc.)
- **Indexes (declared in schemas):** `slug` unique+index on every content collection; `fromPath` unique+index on Redirects.
- **JSON storage:** Lexical bodies, blocks arrays, AI visibility group, lead timeline — all stored as JSONB.
- **Foreign keys:** Author → Users on Posts; AssignedTo → Users on Leads; Partner → Partners on CaseStudies; Service → Services on CaseStudies; Services (hasMany) → Services on Partners.

### Validation needed
| Check | How |
|---|---|
| Schema actually compiles | `pnpm payload migrate` runs without errors |
| Unique constraints fire | Try to insert two services with same slug — should fail |
| FK constraints enforce | Try to delete a Service referenced by a CaseStudy |
| JSONB stores Lexical correctly | Create a post in admin, query the row, parse `body` |
| Auto-migrations work in dev push mode | Add a field to a collection, save, restart, confirm column added |

---

## 8. Authentication System

### Configuration
- **Hash:** Argon2id (Payload default — provided by `argon2` npm package)
- **Token:** JWT, signed with `PAYLOAD_SECRET` (HS256)
- **Token lifetime:** 8 hours (`tokenExpiration: 60 * 60 * 8`)
- **Cookies:** `secure: NODE_ENV === 'production'`, `sameSite: 'Lax'`
- **Lockout:** 5 failed login attempts → 10-minute lock
- **Email verification:** Disabled (`verify: false`) — admin invites only

### Roles (`cms/src/access/roles.ts`)
- `super_admin` — full control. Only role that can edit Users.role field, delete records, edit Settings global.
- `admin` — content + leads management. Can create / update / delete published content (except Settings).
- `editor` — drafts only. Can create posts, edit their own, can't delete others'.

### Access patterns
- Per-collection `access` policies use `isLoggedIn`, `isSelfOrAdmin`, `adminOrAbove`, `onlySuperAdmin` from `cms/src/access/`.
- Field-level access on `users.role` (only super_admin can change roles, including their own — by design for handover).
- Posts access uses `{ author: { equals: user.id } }` constraint for editor-level updates.

### Hooks
- `afterLogin` updates `lastLoginAt` + increments `loginCount`.
- `beforeChange` on Users logs deactivations.

### Missing
- **Password reset flow** — none. If a user forgets their password, an admin has to reset via DB or admin UI override.
- **2FA / MFA** — not implemented.
- **Session management UI** — Payload provides "log out everywhere" via token rotation, but no user-facing UI.
- **Audit log** — no record of who logged in when, who changed what role, who deleted what. Lead timeline has per-record changelog but not site-wide audit.

### Production-ready?
**No.** Auth code is correct. But:
- `PAYLOAD_SECRET` in `.env.example` is `replace-me-with-48-random-bytes-in-hex` — must be replaced in real production env.
- No password reset = lockout = manual recovery.
- No audit log = can't satisfy compliance requirements.

---

## 9. Admin Panel Status

### Status
- **Built:** Yes — Payload provides the full admin UI.
- **Hosted at:** `cms/app/(payload)/admin/[[...segments]]/page.tsx`
- **URL:** `http://localhost:3001/admin` (dev), TBD for production
- **Boot status:** Never booted in this environment.

### Customisations
- `cms/app/(payload)/custom.css` — brand-blue accent tweak (tiny).
- `meta.titleSuffix: ' · SecurityBlogs CMS'` — browser tab title.
- Sidebar grouping: `Access`, `Library`, `Content`, `Lead Management`, `System`, `Settings`.
- Sidebar order: Users → Media → Pages → Services → CaseStudies → Partners → Posts → Leads → Redirects → Settings (global).
- `useAsTitle` set per collection (e.g. Leads uses computed `displayTitle` field).
- `defaultColumns` set per collection list view.
- `pagination.defaultLimit` 25–50 per collection.
- `listSearchableFields` set where relevant (Leads searchable by name/email/company/subject/message).

### Editor experience features
- Live preview / draft autosave: 2s interval on Posts, Pages, Services, CaseStudies
- Schedule publishing on all draftable collections
- Lexical rich-text editor (default config — no custom features added)
- Tabbed editors on Services + Leads
- Versions/history: `maxPerDoc: 30`

### Missing
- Custom dashboard widget (lead count, draft posts, recent activity) — placeholder exists in `payload.config.ts` but empty.
- Brand logo replacement (still showing default Payload logo).
- Custom field components — none.

---

## 10. Deployment Readiness

### Current production
- **Host:** Hostinger LiteSpeed shared hosting
- **Deploy method:** `npm run build` → tar `out/` → SCP/SSH upload
- **Serving:** Static HTML/CSS/JS only. No backend.
- **Last successful build:** From `phase-b-content-migration` branch tip (commit `4b03641`).
- **Status:** Live and serving normally. Untouched by Phase C work.

### Phase C.1 branch deployability
- **Static export:** NO. `output: 'export'` removed.
- **GitHub Actions workflow:** Existing `deploy.yml` targets GitHub Pages with `out/` artifact. **This will fail on this branch** because `out/` is no longer produced.
- **Manual deploy to a Node host:** Theoretically yes, but no Node host is provisioned.

### Phase D requirements (to actually ship)

| Requirement | Status |
|---|---|
| Hostinger VPS provisioned | ❌ Not done |
| SSH access + non-root deploy user | ❌ Not done |
| Hardened OS (firewall, fail2ban, automatic security updates) | ❌ Not done |
| Caddy reverse proxy + Let's Encrypt TLS | ❌ Not done |
| systemd unit for the CMS (port 3001 internal) | ❌ Not done |
| systemd unit for the marketing site (port 3000 internal) | ❌ Not done |
| Postgres on VPS (managed or self-hosted) | ❌ Not done |
| Production env vars in a secrets vault, NOT in `.env` files | ❌ Not done |
| Daily pg_dump cron + off-site mirror | ❌ Not done |
| Daily media-uploads tar + off-site mirror | ❌ Not done |
| Plausible self-host at `stats.securityblogs.com.au` | ❌ Not done |
| DNS A record cut-over plan | ❌ Documented, not executed |
| TTL lowered 48h before cut | ❌ Not done |
| Pinned rollback DNS entry | ❌ Not done |
| Smoke test script (`/api/health`) | ❌ Not implemented |
| Backup restore drill | ❌ Not done |
| Sentry / error tracking | ❌ Not done |
| Uptime monitoring | ❌ Not done |

### Production-ready verdict
**No.** The repo can be developed locally end-to-end. Nothing has been validated at runtime. Production deployment requires Phase D infrastructure work that has not started.

---

## 11. What it would take to ship (high-level path)

In dependency order:

1. **Local validation of Phase A + B + C.1** (5 hours)
   - Boot Docker compose, run migrations, run all seeds, walk the admin sidebar, submit a contact form locally, verify a redirect fires, confirm CMS pages render via the dynamic routes when their legacy folders are temporarily renamed.
2. **Phase C.2 — per-page migration** (30–45 hours)
   - Home page CMS-rewire
   - 11 top-level pages CMS-rewire
   - Delete 7 legacy service folders (dynamic route takes over)
   - 8 knowledge-hub category landings rewire
   - Insert `<Turnstile />` into 5 form components
   - Build multipart `/api/leads/upload` for Career CVs
   - Build CMS-side `/api/redirects/:id/hit` companion endpoint
3. **Phase D — production infrastructure** (40–60 hours)
   - VPS provision + harden
   - Caddy + TLS
   - systemd units
   - Backup automation + DR drill
   - Plausible self-host
   - Sentry + uptime monitoring
   - Secrets vault
   - CI/CD workflow rewrite
4. **Tests** (16–24 hours)
   - Contract tests on `lib/cms.ts`
   - Smoke test on `/api/leads`
   - Playwright happy-path: visit home → click "Free AI Audit" → submit form → lead appears in admin
5. **Cut-over** (4–6 hours)
   - DNS TTL drop 48h prior
   - Snapshot static `out/` from current production
   - Deploy to VPS
   - DNS A record swap
   - 24h propagation watch
   - Decommission old static deploy after 30 days

**Total realistic remaining effort: 95–140 hours of focused engineering work.**

---

## 12. Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Payload version mismatch between auth + nodemailer adapters | Medium | Medium | Pin all `@payloadcms/*` to a single `^3.0.0` minor on first migrate; fix any peer warnings before they bite. |
| Hostinger SMTP from VPS IP blocked as spam | Medium | High | Set up SPF / DKIM / DMARC for `info@securityblogs.com.au`. Test send from VPS before cut. |
| Sharp install fails on production VPS (Linux/glibc mismatch) | Low | Medium | Use Sharp's official Linux x64 prebuilt binary. Verify on VPS during provisioning. |
| Postgres connection pool exhaustion under traffic | Low | High | Default pool size is conservative; benchmark + tune `pool.max` in `postgresAdapter` config. |
| Lost data on cut-over (production drift between static export and CMS seed) | Medium | High | Snapshot production HTML for every page before cut. Compare CMS-rendered output diff-by-diff. Don't decommission old host for 30 days. |
| Editors can't edit on first day because admin UX surprises | High | Low | Walk a non-technical editor through 5 common tasks before cut. Record loom video. |
| Redirect rules cached too aggressively after admin edit | Medium | Low | Add a `revalidateTag('redirects')` afterChange hook on Redirects collection to purge on every save. |
| ISR cache stampede on cold start | Low | Medium | Use `unstable_cache` with a longer fallback window for the layout-level `getSettings()` call. |

---

## 13. Files in scope of this audit

| Path | Files | Status |
|---|---|---|
| `cms/` | 39 files | Schema complete, runtime not validated |
| `lib/cms.ts` + `lib/cmsTypes.ts` | 2 files | Complete |
| `middleware.ts` | 1 file | Complete (companion CMS endpoint missing) |
| `app/api/leads/route.ts` | 1 file | Complete (no multipart variant) |
| `app/services/[slug]/page.tsx` | 1 file | Complete (shadowed by legacy) |
| `app/case-studies/[slug]/page.tsx` | 1 file | Complete |
| `app/knowledge-hub/[category]/[slug]/page.tsx` | 1 file | Complete |
| `components/Turnstile.tsx` | 1 file | Complete (not yet inserted into forms) |
| `components/modules/` (ModuleRenderer + 9 blocks + LexicalRenderer) | 11 files | Complete |
| `app/sitemap.ts` + `app/robots.ts` + `app/llms.txt/route.ts` | 3 files | Complete |
| `docker-compose.yml` | 1 file | Complete (never started) |
| `docs/` | 7 files | Complete (no Phase D ops runbook yet) |

---

*End of report. No code was modified. Report saved to repo root.*
