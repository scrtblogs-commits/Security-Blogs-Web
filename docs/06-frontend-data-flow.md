# 06 — Frontend Data Flow

How a request to the marketing site is served once Phase C.1 is in
place. Useful when debugging a stale page, a missing redirect, or a
broken form submission.

---

## Request lifecycle

```
Browser
  │
  ▼
┌──────────────────────────────────┐
│  middleware.ts (Edge)            │
│  ─ checks CMS-managed Redirects  │
│  ─ if match → 301/302 + hit log  │
│  ─ else → pass through           │
└──────────────────────────────────┘
  │
  ▼
┌──────────────────────────────────┐
│  Next.js App Router              │
│  ─ matches a /app/... route      │
└──────────────────────────────────┘
  │
  ▼
┌──────────────────────────────────┐
│  Page component (server)         │
│  ─ calls lib/cms.ts getters      │
│  ─ ISR cache, revalidate every   │
│    60s (configurable per call)   │
└──────────────────────────────────┘
  │           │
  │           ▼
  │      ┌────────────────────────┐
  │      │  Payload CMS           │
  │      │  /api/<collection>     │
  │      │  /api/globals/settings │
  │      └────────────────────────┘
  │
  ▼
HTML
```

Form submissions skip the ISR layer and post directly:

```
<form> → POST /api/leads → app/api/leads/route.ts
   │
   ├─ honeypot check
   ├─ Turnstile verify (Cloudflare)
   ├─ rate-limit per IP
   ├─ createLead() → CMS /api/leads
   └─ → MailHog (dev) or Hostinger SMTP (prod)
```

---

## ISR strategy

Each `lib/cms.ts` getter takes an optional `opts.revalidate` arg.
Defaults to **60 seconds**. Override per page when content changes
faster (set `revalidate: 0` for live preview) or slower (`revalidate: 600`
for the sitemap).

**Cache tags** are attached to every fetch (e.g. `service:aio`,
`posts:industry-news`). When you want a hard purge — e.g. an editor
just published a hotfix and can't wait 60 seconds — call
`revalidateTag('service:aio')` from a Payload `afterChange` hook
(wiring TBD in Phase C.2). For now the 60s window is fine for normal
editorial flow.

**Stale-while-revalidate** is automatic: the first reader after
expiry triggers a background fetch and gets the stale version; the
*next* reader gets the fresh one. There is never a user-visible spinner
caused by ISR.

---

## Module-based pages

Pages created in the CMS have a `modules` array — an ordered list of
blocks. The frontend renders them via `<ModuleRenderer>`:

```tsx
import { getPage } from '@/lib/cms'
import ModuleRenderer from '@/components/modules/ModuleRenderer'

export default async function Page() {
  const page = await getPage('home')
  if (!page) notFound()
  return <ModuleRenderer modules={page.modules} />
}
```

Available block types (as of Phase C.1):

| Slug              | Component             | Notes                                  |
|-------------------|------------------------|----------------------------------------|
| `hero`            | HeroBlock              | H1 with optional highlight + CTAs      |
| `capabilities`    | CapabilitiesBlock      | Cards with `previewVariant` token      |
| `stats`           | StatsBlock             | Numeric stat strip                     |
| `faqs`            | FaqsBlock              | Native `<details>` accordions          |
| `cta-band`        | CtaBandBlock           | Single-CTA conversion band             |
| `rich-text`       | RichTextBlock          | Lexical → JSX via LexicalRenderer      |
| `image`           | ImageBlock             | narrow / wide / full bleed             |
| `process-steps`   | ProcessStepsBlock      | Numbered steps with optional phase tag |
| `values`          | ValuesBlock            | Icon grid (uses `<Glyph>`)             |

Adding a new block is two-step:
1. Add the `Block` config to `cms/src/collections/Pages.ts`.
2. Add a component to `components/modules/blocks/<Name>Block.tsx` and
   the dispatch case to `ModuleRenderer.tsx`.

---

## Form submission

`lib/submitForm.ts` is the single chokepoint. Every existing form
(`ContactForm`, `AIVisibilityChallenge`, `VisibilityChecker`,
`ApplicationForm`, `GuestPostForm`) calls it with a `FormData` object.

The function:
1. Converts FormData to a plain object
2. POSTs to `/api/leads` (relative — same origin)
3. Returns `{ ok, error?, id? }`

`/api/leads` does the rest:
- Honeypot reject (silent OK)
- Turnstile verify (skipped if no secret configured — dev mode)
- Rate-limit: 15 per IP per 15 minutes
- Manual shape validation (name, email required)
- Create a Lead via the CMS REST API using `PAYLOAD_API_KEY`

`source` is recorded on every lead so the admin can filter:
`contact` / `challenge` / `checker` / `careers` / `guest-post` /
`unknown` for legacy callers.

---

## Redirects

`middleware.ts` runs on every request that isn't `/api/`, `/_next/`,
`/admin/` or a file with an extension. It:

1. Fetches `/api/redirects?where[isActive][equals]=true` (cached 60s
   at module scope)
2. Splits results into a literal-path Map and a regex list
3. Literal first, regex second; first hit wins
4. Returns `NextResponse.redirect(toPath, statusCode)` with `$1, $2`
   backreferences applied if regex
5. Fires `/api/redirects/:id/hit` without awaiting

The CMS write-back endpoint (`/api/redirects/:id/hit`) is added in
Phase C.2's CMS-side companion patch. Until then `hitCount` stays at 0
on every rule — the redirects themselves still work.

Cache TTL: 60 seconds. If you flip a rule's `isActive` toggle, expect
up to 60s before it takes effect. For a hard purge during testing,
restart `pnpm dev`.

---

## SEO files

| Path           | Source                              | ISR  |
|----------------|-------------------------------------|------|
| `/sitemap.xml` | CMS Services + Studies + Posts + hand-built fallbacks | 600s |
| `/robots.txt`  | CMS `Settings.maintenance.enabled`  | 600s |
| `/llms.txt`    | CMS — full content directory         | 600s |

`/llms.txt` follows the [llmstxt.org](https://llmstxt.org/) spec — a
markdown-formatted directory of canonical URLs that AI engines treat
as authoritative for citation.

---

## Environment variables (marketing site)

| Var                              | Where                | Notes                                |
|----------------------------------|----------------------|--------------------------------------|
| `CMS_URL`                        | server only          | Defaults to `http://localhost:3001`  |
| `PAYLOAD_API_KEY`                | server only          | Generate in Payload admin → Users    |
| `TURNSTILE_SECRET_KEY`           | server only          | Empty in dev = verification skipped  |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | bundled              | Empty in dev = widget renders nothing|
| `NEXT_PUBLIC_SITE_URL`           | bundled              | Absolute URLs in sitemap/llms.txt    |
| `NEXT_PUBLIC_MAPBOX_TOKEN`       | bundled              | URL-restricted in Mapbox console     |
| `NEXT_PUBLIC_GMAPS_KEY`          | bundled              | HTTP-referrer-restricted in GCP      |

Local dev works with `CMS_URL=http://localhost:3001` and everything
else blank — Turnstile + API auth gracefully degrade. Production
requires all secrets set.
