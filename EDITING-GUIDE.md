# SecurityGrowth — Editing Guide

Friendly, click-by-click instructions for editing your site **without any code tools installed** — everything is done in your web browser through github.com.

Every change you save here:
1. Triggers the **Deploy to GitHub Pages** action (Actions tab),
2. Rebuilds the static site, and
3. Republishes it automatically — or, if you upload manually to Hostinger, re-download the latest **`securitygrowth-hostinger.zip`** from the **Releases / Actions artifacts** and replace your `public_html` files.

> **Golden rule:** if anything ever breaks, you can undo it. Every edit on github.com creates a commit you can revert (see "Undoing a mistake" at the bottom).

---

## 1. The two things to know first

### 1a. The "easy edit" file
**`content/site.ts`** holds the copy that changes most often (hero text, footer tagline, contact details, social links, CTA band, etc.).

Open that file and look at the comments at the top — the rules are:
- Only change text **between the single quotes** `'like this'`.
- Keep the quotes and the commas.
- If your text contains an apostrophe, type `\'` instead — e.g. `'we\'re live'`.
- Hrefs (links) starting with `/` are pages on this site; keep the trailing slash, e.g. `'/contact/'`.

### 1b. Editing on github.com
1. Go to `https://github.com/Jonaid880/security-blogs`.
2. Click into any folder/file (e.g. `content` → `site.ts`).
3. Click the **pencil icon** (top-right of the file view) — "Edit this file."
4. Make your changes.
5. Scroll down → **Commit changes** (green button) → leave the message default → **Commit**.
6. Wait ~2 minutes — the **Actions** tab will show a green ✓ when your change is live.

---

## 2. Where to edit each element

Below is the quick map. Each row is one editable piece, the file to open, and what you're looking for inside it.

### Brand & global

| What | File | What to change |
|---|---|---|
| Site name shown in titles | `content/site.ts` | `brand.name` |
| Site tagline | `content/site.ts` | `brand.tagline` |
| Footer tagline | `content/site.ts` | `footer.tagline` |
| Social links (LinkedIn / Facebook / Instagram / YouTube) | `content/site.ts` | `socials.*` — paste full URL, leave `''` empty to hide an icon |
| Contact details (email, location, response time, etc.) | `content/site.ts` | `contact.*` |
| Default CTA band (the gradient block at the bottom of many pages) | `content/site.ts` | `ctaBand.*` |

### Homepage

| What | File | What to change |
|---|---|---|
| Live badge text ("LIVE · AI VISIBILITY ENGINE") | `content/site.ts` | `home.badge` |
| Hero subheading paragraph | `content/site.ts` | `home.lead` |
| "Get your free audit →" button | `content/site.ts` | `home.ctaPrimary.label` and `.href` |
| "Try the live score" button | `content/site.ts` | `home.ctaSecondary.label` and `.href` |
| Trust line ("Trusted across AU · US…") | `content/site.ts` | `home.trust` |
| "What we do" section heading | `content/site.ts` | `home.servicesEyebrow / servicesTitle / servicesSub` |
| "The results" section heading | `content/site.ts` | `home.statsEyebrow / statsTitle` |
| The **colored headline** "Be the *answer* AI gives." | `app/page.tsx` | Lines with `color: 'var(--blue)'` and `'var(--red)'` — change the words "answer", "AI", "gives." between the `>` and `<` |

### Navigation (header) & dropdowns

The header menu is built from `lib/site.ts`:

| What | File | What to change |
|---|---|---|
| Services list (and homepage card-stack + Services hub) | `lib/site.ts` | `services` array — each item has `title`, `slug`, `icon`, `color`, `desc` |
| Knowledge Hub sub-pages list | `lib/site.ts` | `knowledgeHub` array |
| Publish With Us sub-pages list | `lib/site.ts` | `publishWithUs` array |
| Company links (About, Case Studies, etc.) | `lib/site.ts` | `companyLinks` array |
| Stats numbers shown on homepage | `lib/site.ts` | `stats` array — `num` is the text shown, `label` is the caption |
| AI platforms shown in the marquee | `lib/site.ts` | `aiPlatforms` array |

> **To add a new service:** add a new item to `services` AND create a page file at `app/services/<your-slug>/page.tsx` (copy an existing one as a template). Ask me to do this and I'll wire it up.

### Header bar itself (logo, nav order, theme toggle)
`components/layout/Navbar.tsx` — change the `<span>` text next to the `S` for the logo wordmark, or the items inside `flat` array for the standalone links (Free Tools / Directory / AI Visibility / About). The "Free AI Audit" CTA href is on the `<Link href="/contact/" …>` line.

### Footer columns
`components/layout/Footer.tsx` — the four columns are built by the `<FooterCol>` calls. To change a column title, edit the `title=` string. To change which links appear, edit the `links={...}` array.

The bottom row's links (Privacy / Terms / Content Guidelines / Advertise) are the four `<Link …>` lines just above the `</footer>` close.

### Each page's body text
Every page lives under `app/`. Folder name = URL. So:

| Page URL | File |
|---|---|
| `/contact/` | `app/contact/page.tsx` |
| `/about-us/` | `app/about-us/page.tsx` |
| `/services/security-seo/` | `app/services/security-seo/page.tsx` |
| `/knowledge-hub/blogs/` | `app/knowledge-hub/blogs/page.tsx` |
| `/publish-with-us/sponsored-posts/` | `app/publish-with-us/sponsored-posts/page.tsx` |
| `/privacy-policy/` | `app/privacy-policy/page.tsx` |
| …and so on | `app/<that-folder>/page.tsx` |

Inside each page, look for:
- `<h1 …>` — the big page title
- `<p className="lead">` — the subtitle paragraph
- Strings inside `title=`, `sub=`, `eyebrow=` on `<SectionHead>` — section headings
- Arrays of `{ q: '…', a: '…' }` near the top — the FAQ items
- Arrays of `{ title, desc, icon }` — the bento / feature grids
- `<MagneticButton href="…">Label</MagneticButton>` — buttons

Change only the strings inside the quotes. Don't touch the structure.

### Background effects (Aurora / Mesh / Particles / Dots)
Visitors can pick from the 🎨 button bottom-left. To **change the default** (or remove the switcher button), open `components/ui/SiteBackground.tsx`:
- Change the function signature `defaultVariant = 'aurora'` to one of `'mesh' | 'particles' | 'dots' | 'none'`.
- To hide the switcher chip, delete the entire `<div className="sg-bg-switch" …>` block.

### Robots & sitemap (SEO)
- `public/robots.txt`
- `public/sitemap.xml`

Edit these directly. If you add a new page, add a new `<url>` entry to `sitemap.xml` (copy the format of an existing one).

### Apache / Hostinger config
`public/.htaccess` — gzip, caching, custom 404, HTTPS redirect. Most people never need to touch this.

---

## 3. How a change goes live

You have two deploy paths configured. **Pick the one that matches your hosting:**

### Path A — Hostinger File Manager (manual upload)
After your commit lands on `main`:
1. Go to repo → **Actions** → click the latest "Deploy to GitHub Pages" run.
2. Scroll to **Artifacts** → download the artifact (or use my generated `securitygrowth-hostinger.zip`).
3. hPanel → **File Manager → public_html** → upload + extract over the old files.
4. Done.

### Path B — Automatic to GitHub Pages
If your DNS points the domain at GitHub Pages (the A records I gave earlier), nothing more to do — the green checkmark in the Actions tab means it's already live.

---

## 4. Adding a new image

Images live in `public/`. Anything in that folder is served from the site root.
1. On github.com, open the `public/` folder → **Add file → Upload files**.
2. Drag in your image, e.g. `team-photo.jpg`.
3. Commit.
4. Reference it in code as `/team-photo.jpg` (or `<img src="/team-photo.jpg" alt="…" />`).

---

## 5. Common mistakes & how to fix them

- **"I see a red 'x' on the Actions tab"** — the build broke. Click into the failed run, scroll for the error. Most often it's a missing quote in a string. Open the file, fix the quote, commit again.
- **"My change didn't show up"** — the deploy is still running. Give it 2–3 minutes and refresh the page (hard refresh: Ctrl+Shift+R / Cmd+Shift+R).
- **"I edited the wrong thing"** — see "Undoing a mistake" below.
- **"Apostrophes break the page"** — inside `'single quotes'`, write `\'` for a literal apostrophe. Or switch the wrapping quotes to `"double quotes"` if there's no double quote in the text.

---

## 6. Undoing a mistake

Every commit is reversible. To undo a single recent edit:
1. Repo → **Commits** (just below the green "Code" button) → find your bad commit.
2. Click the commit → top-right **"…" → Revert**.
3. That opens a new commit that undoes it — confirm and commit. The site rebuilds with the old text restored.

---

## 7. When you outgrow this

When editing in github.com starts to feel slow, the cleanest next step is a real CMS dashboard — recommend **Sanity** (free tier, no Hostinger change) or **Payload CMS** (full Next.js dashboard, needs a small VPS). Both can be added later without re-doing the design.

Until then, this guide + `content/site.ts` should cover 90% of day-to-day edits.
