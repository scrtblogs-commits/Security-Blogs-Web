# PAGE_01_HOME

**URL:** `https://securityblogs.com.au/`
**Airtable table:** `SB · 01 · Home` (id `tbl5zTGn7rIwPDTBj`)
**Sections:** 11 (see §2)
**Status:** Visually complete; CMS-driven content migration pending (Phase C.2)

---

## Purpose

The marketing site's home page is the highest-traffic surface and the primary conversion entry point. It must:
- Establish brand authority ("Be the answer AI gives.")
- Demo live capability (AI Visibility Score widget, Local SEO tool, Live ad metrics)
- Funnel to either `/contact/` (free audit) or the relevant service page

## Business Logic

| Behaviour | Implementation |
|---|---|
| First-time visitor sees particle-canvas hero with animated CTAs | Client-side canvas; no backend |
| AI visibility score auto-counts up on scroll | Currently hardcoded; Phase C.2/D wires to /api/ai-score |
| Local SEO tool reverse-geocodes the visitor's location | Browser Geolocation API + Google Maps Places API |
| Service carousel cards link to `/services/<slug>/` | Reads from CMS Services collection (Phase C.2) |
| "Free AI Audit" CTA → `/contact/` form → Lead record | POST /api/leads → Payload Leads |
| Newsletter signup (if added) | POST /api/leads with source: 'newsletter' |

## Airtable Tables

| Table | Use |
|---|---|
| `SB · 01 · Home` | Section-by-section spec + backend mapping (11 rows) |
| `SB · 00 · Pages Index` | Master index entry for `/` |
| `SB · DOCS · Index` (proposed) | Links this MD/PDF to the page |

## PostgreSQL Tables

| Table | Used by |
|---|---|
| `pages` | Home record (slug='home'), modules (JSONB blocks array) |
| `services` | Service carousel (7 published records) |
| `media` | Hero image, service card covers, footer flags |
| `settings` | Brand, contact, social, footer columns, GTM ID |
| `leads` | Form submissions (contact CTA, newsletter, score widget CTA) |
| `redirects` | Middleware lookup (no path-specific rules for home) |

## API Endpoints

| Endpoint | Method | Purpose | Public? |
|---|---|---|---|
| `GET /api/pages?where[slug][equals]=home&depth=2` | GET | Fetch home page record + modules | Yes (server-side) |
| `GET /api/services?where[status][equals]=published&sort=sortOrder` | GET | Service carousel data | Yes |
| `GET /api/globals/settings?depth=2` | GET | Brand / contact / social / footer | Yes |
| `POST /api/leads` | POST | Lead capture from hero CTA, local SEO tool, newsletter | Yes |
| `GET /api/redirects?where[isActive][equals]=true` | GET | Used by middleware on every request | Yes (middleware) |
| `POST /api/ai-score` (proposed) | POST | AI Visibility Score widget — not yet implemented | Public + Turnstile + rate limit |
| `GET /api/ad-metrics?provider=google&period=last7d` (proposed) | GET | Live ad metrics widget — not yet implemented | Cached 1h |

## Request Schemas

### POST /api/leads
```ts
{
  name: string,                                  // 1-120 chars, required
  email: string,                                 // valid format, required
  phone?: string,                                // optional
  company?: string,                              // optional
  service?: string,                              // optional, free text or enum
  message?: string,                              // optional, max 2000 chars
  source: 'contact-form' | 'newsletter'          // identifies the form
        | 'local-seo-tool' | 'visibility-checker'
        | 'visibility-challenge' | string,
  meta?: Record<string, unknown>,                // form-specific extras
  'cf-turnstile-response'?: string,              // Cloudflare token
  company_url?: string                           // honeypot — must be empty
}
```

### POST /api/ai-score (proposed)
```ts
{
  domain: string,                                // e.g. 'securityblogs.com.au'
  'cf-turnstile-response': string,               // required
  email?: string                                 // optional capture for lead
}
```

## Response Schemas

### POST /api/leads
```ts
// 200 OK
{ ok: true, id: 'rec123…' }

// 400 Bad Request
{ ok: false, error: 'Name is required' }

// 429 Too Many Requests
{ ok: false, error: 'Too many submissions. Please wait 15 minutes and try again.' }

// 502 Bad Gateway
{ ok: false, error: 'Could not save your enquiry. Please try again.' }
```

### GET /api/pages (Payload-standard envelope)
```ts
{
  docs: [
    {
      id: 'rec…',
      slug: 'home',
      title: 'Home',
      status: 'published',
      modules: [
        { blockType: 'hero', badge, h1, h1Highlight, subtitle, ctas: [...] },
        { blockType: 'stats', eyebrow, title, items: [...] },
        { blockType: 'cta-band', title, subtitle, ctaLabel, ctaHref },
        // … other blocks
      ],
      aiVisibility: { entityName, primaryTopic, targetEngines: [...], ... },
      publishedAt: '2026-06-01T00:00:00Z'
    }
  ],
  totalDocs: 1,
  limit: 1,
  page: 1,
  totalPages: 1
}
```

## Authentication

| Endpoint | Auth required |
|---|---|
| GET /api/pages (status=published) | None (public) |
| GET /api/services (status=published) | None |
| GET /api/globals/settings | None |
| GET /api/redirects | None (server-only key recommended in production) |
| POST /api/leads | None for the browser, but: Turnstile token required + honeypot empty + rate-limit per IP |
| POST /api/ai-score (proposed) | None for browser; Turnstile + rate limit |
| Server-to-server (PAYLOAD_API_KEY) | `Authorization: users API-Key <key>` — used by `lib/cms.ts` when calling cross-domain |

## React Components

| Component | Path | Purpose |
|---|---|---|
| `app/page.tsx` | `app/page.tsx` | The home route's server component |
| `Navbar` | `components/layout/Navbar.tsx` | Shared header on all pages |
| `Footer` | `components/layout/Footer.tsx` | Shared footer |
| `HeroBlock` | `components/modules/blocks/HeroBlock.tsx` | Renders the CMS hero block |
| `StatsBlock` | `components/modules/blocks/StatsBlock.tsx` | Stats band |
| `CtaBandBlock` | `components/modules/blocks/CtaBandBlock.tsx` | CTA band |
| `ModuleRenderer` | `components/modules/ModuleRenderer.tsx` | Dispatches block.blockType → block component |
| `ServicesCardStack` | `app/ServicesCardStack.tsx` | Swipeable service carousel |
| `ScoreCalculator` | `app/ai-visibility-center/ScoreCalculator.tsx` | AI visibility score widget |
| `AdMetricsPreview` | `components/previews/AdMetricsPreview.tsx` | Live ad metrics demo |
| `LocalVisibilityCheck` | `components/immersive/LocalVisibilityCheck.tsx` | Local SEO tool |
| `Turnstile` | `components/Turnstile.tsx` | Cloudflare anti-bot widget |
| `JsonLd` | `components/JsonLd.tsx` | Renders structured data (Organization, WebSite) |

## Node.js Services

| Service / module | Path | Purpose |
|---|---|---|
| Typed CMS client | `lib/cms.ts` | All CMS reads from this file |
| Form submission helper | `lib/submitForm.ts` | Browser-side POST to `/api/leads` |
| Lead API route | `app/api/leads/route.ts` | Validates + writes Lead via CMS local API |
| Edge middleware | `middleware.ts` | Reads CMS redirect rules + applies 301/302 |
| Sitemap generator | `app/sitemap.ts` | CMS-driven sitemap.xml |
| Robots generator | `app/robots.ts` | Reads Settings.maintenance.enabled |
| llms.txt generator | `app/llms.txt/route.ts` | CMS-driven llmstxt.org-spec doc |
| Email transport | `cms/src/email/transport.ts` | Sends afterChange notifications via SMTP |

## Environment Variables

| Var | Used by | Required? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | sitemap, robots, llms.txt, og tags | Yes |
| `CMS_URL` | lib/cms.ts (server-only) | Yes |
| `PAYLOAD_API_KEY` | lib/cms.ts for write operations | Yes (production) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | components/Turnstile.tsx (browser) | Yes (production) |
| `TURNSTILE_SECRET_KEY` | app/api/leads/route.ts (server) | Yes (production) |
| `NEXT_PUBLIC_GMAPS_KEY` | Local SEO tool widget | Yes |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | (other pages — not home) | No |
| `SENTRY_DSN` | Error tracking | Yes (production) |

## Cache Strategy

| Surface | Cache | Reason |
|---|---|---|
| Home page HTML | ISR `revalidate: 60` | Re-render at most once a minute on new content |
| `lib/cms.ts → getPage('home')` | tag `'page:home'` | Surgical purge on admin edit |
| `lib/cms.ts → getServices()` | tag `'services'` + 60s | Service carousel |
| `lib/cms.ts → getSettings()` | tag `'settings'` + 600s | Brand, footer rarely change |
| Middleware redirects fetch | module-scoped 60s cache | Avoid hammering CMS on every request |
| `/api/leads` | `dynamic: 'force-dynamic'` | Never cache writes |
| Static images (`public/`) | Long-cache via Caddy | Immutable per file hash |

## Revalidation Rules

| Event | Action |
|---|---|
| Editor publishes home page in CMS admin | Payload `afterChange` hook POSTs `/api/cms/purge?tag=page:home` (Phase C.2) |
| Service marked published/unpublished | Purge tag `services` |
| Settings edited | Purge tag `settings` |
| Redirect toggled active/inactive | Purge tag `redirects` + restart edge cache |
| Site-wide deploy | All ISR caches start fresh |

## Deployment Notes

| Concern | Detail |
|---|---|
| Static-export config | NOT compatible — `output: 'export'` removed in Phase C.1 |
| First-deploy DB state | Run `pnpm payload migrate` + `pnpm seed:all` BEFORE booting marketing site |
| First-render warmup | First request triggers ISR generation — set ISR revalidate to a sane number (60s) |
| GTM tag (KS9SXB2K) | Set in Settings.analytics.gtmId; injected by layout.tsx |
| Mapbox + GMAPS tokens | Browser-safe IF referrer-restricted in respective consoles |
| Turnstile keys | Must be real production keys in prod; dev keys cause widget to show "always pass" |

## Testing Process

### Local smoke
1. `pnpm dev` (marketing site)
2. Open `http://localhost:3000/`
3. Verify particle canvas renders, hero CTAs visible.
4. Click "Get your free audit →" → lands on `/contact/`.
5. Submit contact form with junk data → verify Lead created in `/admin/collections/leads`.
6. Click "Try the live score" → ScoreCalculator widget renders.
7. Scroll: verify stat counters animate, service carousel slides.

### Cross-browser
- Chrome desktop (primary)
- Safari macOS + iOS (verify Geolocation prompt UX)
- Firefox desktop
- Edge

### Lighthouse
- Run on a production-like build (`pnpm build && pnpm start`)
- Target: Performance ≥ 85, Accessibility ≥ 95, SEO = 100

### Form spam stress
- Submit 16 leads in 15 min from same IP → 16th returns 429.
- Submit with `company_url` filled (honeypot) → silent OK (no Lead created).
- Submit without Turnstile token in production env → 400 captcha error.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Particle canvas missing | JS bundle error | Check browser console; redeploy if SSR mismatch |
| Service carousel empty | CMS fetch failed | Tail marketing logs for `[cms]` errors; confirm CMS reachable |
| Form submits but no Lead in admin | PAYLOAD_API_KEY wrong | Regenerate in CMS admin → Users → API Key |
| Form returns 429 | Rate limit hit | Wait 15 min OR clear in-memory bucket (restart server) |
| Form returns 400 "Captcha verification failed" | TURNSTILE_SECRET_KEY mismatch with site key | Verify pair in Cloudflare dashboard |
| Particle canvas + score widget render but slow | JS bundle size | Check `next build` output; consider dynamic import |
| Sitemap missing service URLs | CMS unreachable when sitemap generated | Stale fallback served; verify CMS health |
| Mapbox / GMaps watermark visible | Tokens missing or wrong | Check `lib/env.ts` + browser console for 403 |

## Change Procedures

### Update hero copy
1. `/admin/collections/pages/<home-id>` → Modules → Hero block.
2. Edit `H1`, `H1 Highlight`, `Subtitle`, `Badge`.
3. Save (autosave fires every 2s).
4. Publish.
5. Within 60s the marketing site picks up the change.

### Add a new service to the carousel
1. `/admin/collections/services` → Create new.
2. Fill: title, slug, shortDesc, accentColor, statChip, cover.
3. Set status = `Published`, sortOrder.
4. Save.
5. Within 60s the home page shows the new card.

### Add a new section to the home page
1. `/admin/collections/pages/<home-id>` → Modules → Add Block.
2. Pick a block type (e.g. `capabilities`, `image`, `rich-text`).
3. Fill block fields.
4. Drag-reorder to desired position.
5. Save + Publish.
6. Renders automatically via `<ModuleRenderer>`.

### Change the GTM container ID
1. `/admin/globals/settings` → Analytics tab.
2. Update `GTM ID`.
3. Save.
4. Within 600s the head injects the new container.

### Migrate from hardcoded to CMS (Phase C.2)
1. Open `app/page.tsx`.
2. Convert to async server component (see HERO row backend doc).
3. `const page = await getPage('home')` and render `<ModuleRenderer modules={page.modules} />`.
4. Delete the hardcoded JSX blocks.
5. Verify the rendered home page matches the previous version side-by-side.
6. Commit.

---

*End of PAGE_01_HOME.md. Template for the 35 remaining per-page docs.*
