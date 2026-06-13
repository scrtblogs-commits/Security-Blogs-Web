# PAGE_05_AEO

**URL:** `https://securityblogs.com.au/services/aeo/`
**Airtable table:** `SB · 05 · AEO (Answer Engine Optimisation)`
**Page kind:** detail
**Sections in spec:** 6

---

## Business Purpose

Service detail for AEO — winning featured snippets, Q&A markup, voice search.

## Sections (top to bottom)

| # | Section | Block type |
|---|---|---|
| 1 | Hero | hero |
| 2 | Capabilities | capabilities |
| 3 | Process | process-steps |
| 4 | Stats | stats |
| 5 | FAQs | faqs |
| 6 | CTA band | cta-band |

## Airtable Tables

| Table | Use |
|---|---|
| `SB · 05 · AEO (Answer Engine Optimisation)` | Per-section spec for `/services/aeo/` (one row per section) |
| `SB · 00 · Pages Index` | Master index entry |
| `SB · DOCS · Index` (proposed) | Links this MD/PDF to the Airtable page record |

## PostgreSQL Tables (used by this page)

| Table | Use |
|---|---|
| `services` | Service catalogue + per-card data |
| `media` | Image attachments (hero, covers, logos) |
| `settings` | Brand, contact, footer, GTM injection |

## API Endpoints

| Endpoint | Method | Cached | Purpose |
|---|---|---|---|
| `GET /api/services?where[slug][equals]=aeo` | GET | ISR 60s | Service record |
| `GET /api/globals/settings` | GET | ISR 600s | Brand + contact + footer |
| `GET /api/redirects?where[isActive][equals]=true` | GET (middleware) | 60s mem | Redirect rules |

## Request Schemas

No request body — this page only consumes GET endpoints.

## Response Schemas

### `GET /api/services?where[slug][equals]=aeo`

```json
{
  "docs": [{
    "id": "rec…",
    "slug": "aeo",
    "title": "AEO (Answer Engine Optimisation)",
    "shortDesc": "...",
    "intro": "...",
    "accentColor": "#1e5fe0",
    "capabilities": [{ "title": "...", "description": "...", "previewVariant": "schema" }],
    "processSteps": [...],
    "stats": [...],
    "faqs": [...],
    "benefits": [...],
    "status": "published"
  }],
  "totalDocs": 1
}
```

## React Components

| Component | Purpose |
|---|---|
| `app/services/aeo/page.tsx` | Server component — fetches CMS data, renders |
| `app/services/aeo/*.tsx` | Component used on this page |
| `components/layout/Navbar.tsx` | Component used on this page |
| `components/layout/Footer.tsx` | Component used on this page |
| `components/layout/Navbar.tsx` | Shared header |
| `components/layout/Footer.tsx` | Shared footer |

## Node.js Services

| Service / module | Purpose |
|---|---|
| `lib/cms.ts` | Typed Payload REST client — all reads |
| `middleware.ts` | Edge middleware — CMS redirect rules |

## Environment Variables

| Var | Required? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL |
| `CMS_URL` | Yes | Where lib/cms.ts fetches from |
| `PAYLOAD_API_KEY` | Yes (prod) | Server-side CMS write auth |
| `SENTRY_DSN` | Yes (prod) | Error tracking |

## Validation Rules

No user input on this page. Read-only validation: ISR cache freshness, CMS reachability.

## Authentication Rules

- Public read of all page-driving CMS endpoints.
- No user session required.
- Middleware runs on every request but reads via server-only `PAYLOAD_API_KEY`.

## Deployment Notes

- Server-rendered Next.js page (ISR). NOT compatible with `output: 'export'`.
- First deploy requires `pnpm payload migrate` + relevant `pnpm seed:*` before booting.
- Caddy reverse-proxies port 3000 (marketing) — see DEPLOYMENT_GUIDE §6.

## Testing Procedures

### Local smoke
1. `pnpm dev` (marketing site at `http://localhost:3000`)
2. Navigate to `/services/aeo/`
3. Verify hero renders, navigation works, no console errors

### Production checks
- Lighthouse Performance ≥ 85 on landing pages
- Lighthouse Accessibility ≥ 95
- Lighthouse SEO = 100
- Sentry: no new error fingerprints after deploy
- Uptime monitor green

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Page returns 500 | CMS unreachable | Check CMS_URL + CMS service status |
| Content stale after admin edit | Cache not purged | `revalidateTag()` or wait for revalidate interval |
| Sitemap missing this page | CMS Pages record not published | Set `status=published` |
| Navbar/footer shows defaults | Settings global missing | Run `pnpm seed:settings` |

## Change Impact Analysis

**If you change…**

- **Copy / hero text:** Low impact. Edit the CMS record (or `app/services/aeo/page.tsx` if still hardcoded). Wait for ISR.
- **Sections order:** Medium impact. Re-order modules in admin. Renders instantly on next ISR.
- **Add a new module type:** High impact. Add block to `cms/src/collections/Pages.ts`, add component to `components/modules/blocks/`, add dispatch in `ModuleRenderer.tsx`.
- **Slug:** **CRITICAL — breaks every URL.** Add a `Redirects` record from old slug → new BEFORE updating. Notify SEO if any external links exist.
- **Authentication scope:** Edit `cms/src/access/*.ts`. Roles changes only by `super_admin`.
- **API endpoint shape:** Breaking change. Bump version, dual-route for 30 days, document migration.


## Rollback Procedures

1. **CMS content rollback:** Use Payload versions UI (`/admin/collections/pages/<id>` → Versions tab). Revert to a prior snapshot.
2. **Code rollback:** `git revert <bad-commit>` on `phase-c-frontend-rewire`, push, redeploy.
3. **Schema migration rollback:** Restore Postgres from nightly backup (see DEPLOYMENT_GUIDE §7).
4. **Deploy rollback:** `systemctl stop sb-web && git checkout <prev-commit> && pnpm build && systemctl start sb-web`. <5 min.
5. **DNS-level rollback (emergency only):** Revert A record to the last static-export Hostinger IP (5-minute propagation).


---

*Notes:* previewVariants used: answer-box, featured-snippet, faq-schema, voice.

*End of PAGE_05_AEO.md*
