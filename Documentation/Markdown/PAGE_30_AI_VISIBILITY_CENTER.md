# PAGE_30_AI_VISIBILITY_CENTER

**URL:** `https://securityblogs.com.au/ai-visibility-center/`
**Airtable table:** `SB · 30 · AI Visibility Center`
**Page kind:** tool
**Sections in spec:** 4

---

## Business Purpose

Flagship interactive: score calculator + orbital timeline of AI engine launches.

## Sections (top to bottom)

| # | Section | Block type |
|---|---|---|
| 1 | Hero | hero |
| 2 | Score calculator widget | client widget |
| 3 | Orbital timeline | rich-text |
| 4 | CTA band | cta-band |

## Airtable Tables

| Table | Use |
|---|---|
| `SB · 30 · AI Visibility Center` | Per-section spec for `/ai-visibility-center/` (one row per section) |
| `SB · 00 · Pages Index` | Master index entry |
| `SB · DOCS · Index` (proposed) | Links this MD/PDF to the Airtable page record |

## PostgreSQL Tables (used by this page)

| Table | Use |
|---|---|
| `leads` | Form submissions land here as new Lead records |
| `ai_scores` | Phase C.2/D — AI visibility computed score cache |

## API Endpoints

| Endpoint | Method | Cached | Purpose |
|---|---|---|---|
| `GET /api/globals/settings` | GET | ISR 600s | Brand + contact + footer |
| `GET /api/redirects?where[isActive][equals]=true` | GET (middleware) | 60s mem | Redirect rules |
| `POST /api/leads` | POST | dynamic | Form submission |
| `POST /api/ai-score` (proposed) | POST | dynamic | Compute + persist visibility score |

## Request Schemas

### `POST /api/leads`

```json
{
  "name": "string (1-120 chars, required)",
  "email": "string (valid format, required)",
  "phone": "string (optional)",
  "company": "string (optional)",
  "subject": "string (optional)",
  "message": "string (optional, max 2000 chars)",
  "source": "visibility-checker",
  "meta": { "domain": "example.com" },
  "cf-turnstile-response": "string (Cloudflare token, required in production)",
  "company_url": "string (honeypot — must be empty)"
}
```


## Response Schemas

### `POST /api/leads`

```json
// 200 OK
{ "ok": true, "id": "rec…" }

// 400 Bad Request
{ "ok": false, "error": "Email looks invalid" }

// 429 Too Many Requests
{ "ok": false, "error": "Too many submissions. Please wait 15 minutes and try again." }

// 502 Bad Gateway (CMS write rejected)
{ "ok": false, "error": "Could not save your enquiry. Please try again." }
```

## React Components

| Component | Purpose |
|---|---|
| `app/ai-visibility-center/page.tsx` | Server component — fetches CMS data, renders |
| `app/ai-visibility-center/ScoreCalculator.tsx` | Client widget — interactive scoring |
| `app/ai-visibility-center/OrbitalTimeline.tsx` | Component used on this page |
| `components/layout/Navbar.tsx` | Component used on this page |
| `components/layout/Footer.tsx` | Component used on this page |
| `components/layout/Navbar.tsx` | Shared header |
| `components/layout/Footer.tsx` | Shared footer |

## Node.js Services

| Service / module | Purpose |
|---|---|
| `lib/cms.ts` | Typed Payload REST client — all reads |
| `middleware.ts` | Edge middleware — CMS redirect rules |
| `lib/submitForm.ts` | Browser-side POST helper |
| `app/api/leads/route.ts` | Server endpoint — Turnstile + rate-limit + Lead create |
| `cms/src/collections/Leads.ts` | Lead schema + afterChange email hook |
| `cms/src/email/transport.ts` | Hostinger SMTP via nodemailer |
| `app/api/ai-score/route.ts` (Phase C.2/D) | Computes visibility score from Ahrefs Brand Radar MCP |

## Environment Variables

| Var | Required? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL |
| `CMS_URL` | Yes | Where lib/cms.ts fetches from |
| `PAYLOAD_API_KEY` | Yes (prod) | Server-side CMS write auth |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Yes (prod) | Cloudflare widget site key |
| `TURNSTILE_SECRET_KEY` | Yes (prod) | Server-side verify |
| `SENTRY_DSN` | Yes (prod) | Error tracking |

## Validation Rules

### `/api/leads` validation pipeline

1. **Honeypot:** `company_url` must be empty. If filled, return `{ ok: true }` silently (do NOT create lead).
2. **Shape:** `name` and `email` required. `email` must match `/^[^@\s]+@[^@\s]+\.[^@\s]+$/`.
3. **Rate limit:** Per-IP, 15 submissions per 15 minutes. Returns 429 over limit.
4. **Turnstile:** Server-side `siteverify` against Cloudflare. Skipped if `TURNSTILE_SECRET_KEY` unset (dev mode).
5. **Source:** Must be one of the SOURCE_OPTIONS values defined in `cms/src/collections/Leads.ts`.
6. **Forensic:** IP, user-agent, referer captured automatically.

Source-specific validation runs in the Next.js layer before the CMS write (zod schemas).


## Authentication Rules

- Public POST allowed for browser-side form submission.
- Bot protection: honeypot + Turnstile + per-IP rate limit (15/15min).
- Server-to-server CMS write uses `Authorization: users API-Key <PAYLOAD_API_KEY>`.
- No NextAuth session required from the visitor.

## Deployment Notes

- Server-rendered Next.js page (ISR). NOT compatible with `output: 'export'`.
- First deploy requires `pnpm payload migrate` + relevant `pnpm seed:*` before booting.
- Caddy reverse-proxies port 3000 (marketing) — see DEPLOYMENT_GUIDE §6.
- Cloudflare Turnstile site key + secret must be configured in production env.
- Hostinger SMTP credentials must be set in `cms/.env` for assignee notification emails.
- AI score / visibility checker endpoints rely on MCP tools (Ahrefs Brand Radar, DataForSEO) — credentials server-only.

## Testing Procedures

### Local smoke
1. `pnpm dev` (marketing site at `http://localhost:3000`)
2. Navigate to `/ai-visibility-center/`
3. Verify hero renders, navigation works, no console errors
4. Fill the form with valid data → expect 200 OK + lead in `/admin/collections/leads`
5. Fill the form with empty email → expect 400
6. Submit 16 times in 15 min from same IP → 16th returns 429
7. Open with JS disabled → confirm graceful no-JS fallback message
4. Verify widget mounts client-side
5. Trigger the widget action → expect cached or computed result

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
| Form submits but no Lead | `PAYLOAD_API_KEY` wrong | Regenerate in admin → Users → API Key |
| Form rejected with 400 captcha | Turnstile token bad | Verify production `TURNSTILE_SECRET_KEY` matches site key |
| Assignee not getting email | SMTP creds wrong | Test Hostinger SMTP from VPS shell |

## Change Impact Analysis

**If you change…**

- **Copy / hero text:** Low impact. Edit the CMS record (or `app/ai-visibility-center/page.tsx` if still hardcoded). Wait for ISR.
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


## Forms

- **Score request form** — posts to `/api/leads` (see Request/Response schemas)

---

*Notes:* Score widget currently hardcoded. Phase C.2/D: POST /api/ai-score wired to Ahrefs Brand Radar MCP.

*End of PAGE_30_AI_VISIBILITY_CENTER.md*
