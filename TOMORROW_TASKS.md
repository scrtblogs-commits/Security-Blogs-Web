# TOMORROW_TASKS

**Date prepared:** 2026-06-14 (end of session)
**Audience:** Whoever opens the repo next
**Ranking method:** `Score = Impact (1–10) × (1 / sqrt(Effort hours))`. Higher score = better return per hour.

---

## The 10 highest-priority implementation tasks

| Rank | Task | Impact | Effort (h) | Score | Priority |
|---:|---|---:|---:|---:|---|
| 1 | Fix `sharp` config + test image upload end-to-end | 7 | 0.5 | 9.90 | **Do first — closes Phase D §6 in 15 min** |
| 2 | Boot marketing site + verify the 3 CMS-driven dynamic routes against the running CMS | 9 | 1 | 9.00 | High |
| 3 | Add CMS-side `POST /api/redirects/:id/hit` endpoint + test middleware → counter flow | 7 | 2 | 4.95 | High |
| 4 | Wire `<Turnstile />` into the 5 existing forms (ContactForm, ApplicationForm, GuestPostForm, AIVisibilityChallenge, VisibilityChecker) and test one submission end-to-end | 9 | 4 | 4.50 | High |
| 5 | Rewire `app/page.tsx` to consume CMS (the home page — Phase C.2's most visible win) | 9 | 4 | 4.50 | High |
| 6 | Write `cms/src/seed/posts.ts` for 6 sample posts (one per category) so knowledge-hub landings have content | 6 | 2 | 4.24 | Medium |
| 7 | Replace the broken GitHub Actions workflow with a no-op placeholder (prevent main-branch merge from accidentally triggering a failing deploy) | 7 | 1.5 | 5.72 | High |
| 8 | Convert `app/layout.tsx` to async server component, wire Navbar + Footer to `getSettings()`. Unlocks Phase C.2 rewires for every other page. | 8 | 6 | 3.27 | Medium |
| 9 | Rewire `app/contact/page.tsx` + verify a real form submission lands in `/admin/collections/leads` | 8 | 3 | 4.62 | High |
| 10 | Add `app/api/leads/upload/route.ts` (multipart) for Career CV submissions, link the file to the Lead's `meta` | 6 | 4 | 3.00 | Medium |

---

## Per-task detail

### 1. Fix `sharp` config + test image upload (0.5h, impact 7)

**Why:** The only known issue in the backend pipeline. Quick win. Proves media variants (thumbnail / small / medium / large) work end-to-end.

**Steps:**
```
1. Edit cms/payload.config.ts: import sharp from 'sharp'; add `sharp` to buildConfig({ ... })
2. Restart `pnpm dev`
3. Confirm warning gone at boot
4. Log into /admin → Media → upload small JPG/PNG
5. Verify cms/media-uploads/ contains 4 variants
6. Verify `media` table has 1 row via cms/count-db.mjs
```

**Exit criteria:** Boot logs free of the sharp warning. `media` table has 1 row. Disk shows variants.

---

### 2. Boot marketing site + verify dynamic routes (1h, impact 9)

**Why:** The 3 Phase C.1 dynamic routes (`/services/[slug]`, `/case-studies/[slug]`, `/knowledge-hub/[category]/[slug]`) have NEVER been tested against a running CMS. This is the first proof Phase C.1 actually works.

**Steps:**
```
1. cd Security-Blogs (repo root)
2. pnpm install
3. Create .env.local with CMS_URL=http://localhost:3001, PAYLOAD_API_KEY=<from admin>, NEXT_PUBLIC_SITE_URL=http://localhost:3000
4. Generate a PAYLOAD_API_KEY: /admin → Users → yousif@... → enable API Key → copy
5. pnpm dev (port 3000)
6. curl http://localhost:3000/services/aio/  → should be SHADOWED by legacy folder, returns 200 with old hardcoded content
7. Manually rename app/services/aio/ → app/services/_aio_bak/ to unshadow
8. curl http://localhost:3000/services/aio/  → NOW serves the dynamic CMS-driven route with seeded content
9. Verify response includes "What's included" section with seeded capabilities array
10. Verify Lighthouse Performance ≥ 80
```

**Exit criteria:** A CMS-driven service detail page renders with seeded data + capability cards.

---

### 3. CMS-side `POST /api/redirects/:id/hit` endpoint (2h, impact 7)

**Why:** Middleware (`middleware.ts:113`) fires fire-and-forget POSTs to this URL on every redirect hit. Currently nothing receives them — `hit_count` and `last_hit_at` stay at 0/NULL.

**Steps:**
```
1. Edit cms/src/collections/Redirects.ts → add `endpoints` array:
   endpoints: [{
     path: '/:id/hit',
     method: 'post',
     handler: async (req) => { ... increment hitCount, set lastHitAt ... return Response.json({ ok: true }) },
   }]
2. Restart CMS
3. curl -X POST http://localhost:3001/api/redirects/1/hit
4. Verify row in `redirects` table: hit_count=1, last_hit_at=now
5. Boot marketing site, hit a known-redirect URL, verify the counter increments
```

**Exit criteria:** Redirects collection shows real hit counts in admin.

---

### 4. Wire `<Turnstile />` into the 5 forms (4h, impact 9)

**Why:** The form-submission endpoint (`/api/leads`) ALREADY verifies Turnstile tokens. The browser-side widget exists at `components/Turnstile.tsx`. But the 5 forms don't render it yet, so bot protection is honeypot-only. With a real Cloudflare site key, this becomes proper anti-bot.

**Steps:**
```
1. Add NEXT_PUBLIC_TURNSTILE_SITE_KEY + TURNSTILE_SECRET_KEY to .env.local (use Cloudflare dashboard, free tier)
2. For each of:
   - components/ui/ContactForm.tsx
   - app/career/ApplicationForm.tsx
   - app/publish-with-us/guest-posting/GuestPostForm.tsx
   - components/ui/AIVisibilityChallenge.tsx
   - app/free-tools/VisibilityChecker.tsx
   Add `<Turnstile />` inside the <form> element before the submit button.
3. Run one form locally, verify the widget renders.
4. Submit → CMS log should show "Turnstile verification succeeded" (or skipped if no secret).
5. Try submitting with browser's network blocked for cloudflare → 400 captcha error.
```

**Exit criteria:** Each form shows the Turnstile widget. Submitting without solving it returns 400.

---

### 5. Rewire `app/page.tsx` (home) to consume CMS (4h, impact 9)

**Why:** The home page is the #1 most visited page. CMS data exists (Pages.home is seeded with module blocks). Once rewired, editing the hero text in CMS will update the live home page after ISR.

**Steps:**
```
1. Edit app/page.tsx → convert to async server component
2. Replace the static hero JSX with:
   import { getPage } from '@/lib/cms'
   import ModuleRenderer from '@/components/modules/ModuleRenderer'
   export const revalidate = 60
   export default async function HomePage() {
     const page = await getPage('home')
     if (!page) notFound()
     return (
       <>
         <ParticleCanvas /> {/* keep as separate client component */}
         <ModuleRenderer modules={page.modules} />
       </>
     )
   }
3. Delete the hardcoded hero JSX from app/page.tsx
4. Boot marketing site, visit /, verify the hero shows the seeded h1/subtitle
5. Edit page in admin, change h1, wait 60s, refresh, verify update
6. ParticleCanvas animation continues to work
```

**Exit criteria:** Home page renders from CMS. Editing admin updates within 60s.

---

### 6. Seed sample posts (2h, impact 6)

**Why:** All 8 knowledge-hub category landings (`/knowledge-hub/blogs/`, `/industry-news/`, etc.) currently show "0 posts" because no `posts.ts` seed exists. Creating sample posts unblocks visual testing of category pages.

**Steps:**
```
1. Create cms/src/seed/posts.ts based on the pattern in cms/src/seed/case-studies.ts:
   - 6 posts (one per category)
   - Each with title, slug, excerpt, body (Lexical), author (user id 1), status='published', publishedAt=now
   - aiVisibility group filled in for at least one as example
2. Add `seed:posts` to cms/package.json scripts
3. Add it to cms/src/seed/all.ts ORDER array
4. Run: pnpm seed:posts
5. Verify count: SELECT count(*) FROM posts; → 6
6. curl http://localhost:3001/api/posts?where[category][equals]=blog → returns posts
```

**Exit criteria:** Posts table has 6 rows. REST API returns them.

---

### 7. Disable the broken GitHub Actions workflow (1.5h, impact 7)

**Why:** `.github/workflows/deploy.yml` triggers on push to `main`. It expects `out/` (static export). `next build` no longer produces `out/`. If anyone merges this branch to main, the workflow will fail loudly and block deploys.

**Steps:**
```
1. Decide: rewrite to deploy from a Phase D VPS, OR disable entirely
2. Simplest: rename .github/workflows/deploy.yml to .github/workflows/deploy.yml.disabled
3. Add a new minimal workflow that just runs `pnpm tsc --noEmit && cd cms && pnpm tsc --noEmit` on push (type-check guard)
4. Commit + push to phase-c-frontend-rewire
5. Open a draft PR to main to confirm Actions don't fail
```

**Exit criteria:** No failing Actions on push. Type-check still enforced.

---

### 8. Convert `app/layout.tsx` to async + Settings-driven Navbar/Footer (6h, impact 8)

**Why:** Header and footer appear on every page (36 of them). Once these read from Settings instead of `lib/site.ts`, ALL pages get CMS-driven brand/contact/social/footer-links automatically. This unblocks every subsequent page rewire.

**Steps:**
```
1. Edit app/layout.tsx:
   - Convert default export to async function
   - const settings = await getSettings()
   - Pass settings prop to <Navbar /> and <Footer />
2. Update components/layout/Navbar.tsx:
   - Accept settings prop typed as CmsSettings | null
   - Read brand.siteName, brand.logoHeader.url, contact.contactEmail
   - Keep fallback to lib/site.ts values if settings is null
3. Update components/layout/Footer.tsx:
   - Read footer.footerColumns, footer.copyrightText, contact.*, social[]
   - Render Acknowledgement of Country from footer.acknowledgement
   - Keep fallback to lib/site.ts values if null
4. Boot, verify nothing visually changed (settings seed matches current static values)
5. Edit Settings in admin, change phone to "+61 999 999 999", wait 600s, refresh, confirm update
```

**Exit criteria:** Layout fetches Settings; editing Settings in admin updates the visible site within 600s. No fallback values rendered when Settings IS populated.

---

### 9. Rewire `app/contact/page.tsx` + verify lead pipeline (3h, impact 8)

**Why:** Contact form is the primary conversion path. Currently posts to Web3Forms (3rd-party). After this rewire, leads land in the CMS Leads table and trigger the assignment email pipeline.

**Steps:**
```
1. Edit app/contact/page.tsx — rewire to CMS Page (Pages.contact already seeded). Use the §5 pattern.
2. In the form component (components/ui/ContactForm.tsx) — already calls lib/submitForm.ts which already POSTs to /api/leads. Should work without changes.
3. Boot CMS + marketing site
4. Visit /contact/, fill form with junk test data, submit
5. Expect HTTP 200, redirect to /thank-you/
6. Verify in admin: /admin/collections/leads should show 1 new row with status='new', source='contact-form'
7. Assign the lead to yousif@... → if MailHog up, email arrives at localhost:8025; if not, CMS log records send attempt
```

**Exit criteria:** Real form submission creates a Lead row. Status pipeline works.

---

### 10. Add multipart `/api/leads/upload` for Career CV (4h, impact 6)

**Why:** Career form has a CV upload field. Current `submitForm.ts` writes only the filename string to `lead.meta`. The actual file is discarded. This loses every applicant's CV.

**Steps:**
```
1. Create app/api/leads/upload/route.ts:
   - Accept multipart/form-data with `cv` file + other lead fields
   - Validate file: max 5MB, mimeType in ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
   - Upload to Payload Media collection via local API: req.payload.create({ collection: 'media', file })
   - Create Lead with meta.cvMediaId = newMediaId
2. Update app/career/ApplicationForm.tsx:
   - Switch from JSON to FormData
   - POST to /api/leads/upload instead of /api/leads
3. Test: submit Career form with a sample PDF
4. Verify: media row created, lead row created, lead.meta.cvMediaId = media row id
5. From admin → click the linked media on the lead → download succeeds
```

**Exit criteria:** Career submissions store the CV file in Media and link it to the Lead.

---

## Ranking explained

| Rank | Why ranked here |
|---|---|
| 1 | 30-min fix; closes the last warning from today's boot; proves Sharp pipeline |
| 2 | Tests the entire Phase C.1 plumbing (lib/cms + middleware + dynamic routes) for the first time against real data |
| 3 | Tiny code change; finishes the redirect telemetry loop; unblocks "real" redirect analytics in admin |
| 4 | Anti-bot is real spam mitigation; widget already built, just needs insertion |
| 5 | Home page rewire is the most-visible Phase C.2 milestone; one-page proof of pattern |
| 6 | Without posts, 8 category pages stay empty in dev — blocks visual QA |
| 7 | Safety: prevents the broken GHA workflow from creating noise on future PRs |
| 8 | Layout rewire is force-multiplier for all subsequent page rewires; bigger lift but unlocks 35+ pages |
| 9 | Validates the entire Lead pipeline end-to-end with a real submission |
| 10 | Important but not urgent (Career applications aren't daily traffic); deferred to last |

## Stretch goals (not in top 10)

Documented but de-prioritised:
- Add Sentry error tracking → Phase D
- Set up MailHog locally → 30 min, low-impact
- Write Playwright happy-path test for contact-form → 6h
- Phase D VPS provision → 40h
- Plausible self-host → 4h
- Replace `embedded-postgres` with a managed Postgres for staging → 6h

## Notes for the engineer picking this up

- The Postgres data persists in `C:\Users\jonaid\Downloads\embedded-pg-data` outside the repo. **Don't delete it** unless you want to re-seed. To resume Postgres: `cd C:\Users\jonaid\Downloads\embedded-pg-test && node start.mjs &`.
- The Super Admin password is in `cms/.env` (gitignored). Default is `ChangeMeOnFirstLogin2026!`. Change after first login.
- Production at `securityblogs.com.au` is still serving the Phase B static export. Nothing in Phase C is live yet. **Don't merge to `main` until Phase C.2 + D are signed off.**
- All 10 tasks together = ~28 hours = 4–5 focused days. Tasks 1–2 are 90 min combined and worth doing first regardless of how much else you take on.

---

*End of TOMORROW_TASKS.md*
