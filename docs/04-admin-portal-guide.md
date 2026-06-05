# 04 — Admin Portal Guide

**Audience:** non-technical staff who manage content and leads.

The admin portal is your day-to-day workspace. No code required.

## Logging in

URL: **https://securityblogs.com.au/admin** (production)
or **http://localhost:3001/admin** (local dev).

Click "Log in", enter email + password. If you forget your password,
click "Forgot password" — Payload sends a reset link via email.

After 5 failed attempts the account is locked for 10 minutes.

## Three roles — what each can do

| Action | Super Admin | Admin | Editor |
|---|---|---|---|
| Create + edit blog posts | ✓ | ✓ | ✓ (own posts only) |
| Publish blog posts | ✓ | ✓ | ✓ (own posts only) |
| Delete posts | ✓ | ✓ | — |
| Upload media | ✓ | ✓ | ✓ |
| Delete media | ✓ | ✓ | — |
| Read leads | ✓ | ✓ | ✓ (read-only) |
| Update / assign leads | ✓ | ✓ | — |
| Delete leads | ✓ | — | — |
| Invite users + assign roles | ✓ | — | — |
| Deactivate users | ✓ | ✓ | — |
| Change own password | ✓ | ✓ | ✓ |

## Writing a blog post

1. Sidebar → **Content** → **Posts** → **Create New**.
2. Fill in:
   - **Title** — the H1 of the article
   - **Slug** — auto-suggested from the title; URL-friendly
   - **Category** — pick from `Blog`, `Industry News`, `Security Guides`,
     `Research Reports`, `Security Industry SEO`, `Security Trends 2026`
   - **Excerpt** — 1–2 sentence summary, max 280 chars (used on listing
     pages and by AI overviews)
   - **Cover image** — pick from the Media library, or upload a new one
     in-place
   - **Body** — the rich-text editor: headings, lists, links, images,
     callouts. Auto-saves every 2 seconds
3. Optional but recommended — open the **AI Visibility** tab in the
   sidebar and fill in:
   - Canonical Entity Name (usually "SecurityBlogs")
   - Primary Topic — one sentence
   - Keywords to Win — the search queries this post should win
   - Quoted Passages — the exact wording AI overviews should lift
4. Set **Status**:
   - `Draft` — saved but not visible publicly
   - `Scheduled` — set `Published At` to a future date; goes live then
   - `Published` — live immediately
   - `Archived` — hidden from public, kept for history
5. Click **Save**.

Posts you've created appear in the listing with their status badge.

### Editing later

Open the post → make changes → save. Every save creates a version
snapshot. Click **Versions** (top right) to roll back to any previous
state. Last 30 versions retained per post.

## Uploading media

1. Sidebar → **Library** → **Media** → **Create New**.
2. Drag-drop the file (JPG, PNG, WebP, GIF, SVG, PDF supported).
3. Fill in **Alt Text** — required for accessibility.
4. Optional: Caption, Credit.
5. Save. Variants (thumbnail, small, medium, large) generate automatically
   for images.

To use media inside an article, embed it from the rich-text editor's
image tool — pick from the library.

## Managing leads

Every form submission on the public website lands as a Lead. You manage
the pipeline here.

### Default view (Kanban)

Sidebar → **Lead Management** → **Leads**. Default columns:
`New` → `Contacted` → `Qualified` → `Proposal Sent` → `Won` / `Lost`.

Drag a lead between columns to change its status (auto-logged in the
timeline).

### Working an individual lead

Click any lead card to open it. Tabs:

- **Contact & Message** — name, email, phone, company, the message they sent
- **Pipeline** — status, lifecycle stage, priority, assigned to,
  estimated value (AUD), next action due date + note, tags
- **Timeline** — chronological feed of every interaction. Add a new
  entry whenever you log a call, send an email, or take a note
- **Closure** — when status = Won / Lost, record the value or reason
- **Forensic** — IP, user agent, referrer, anti-spam token, page URL
  (read-only — useful when sorting spam from real leads)

When you assign a lead to a user, that user gets an email
notification automatically.

### Bulk actions

In the list view, tick multiple leads → bulk:
- Change status
- Reassign
- Add tag
- Mark as spam

### Exporting leads

Bulk-select → **Export** → CSV. Includes every field for reporting.

## Inviting a new user

1. Sidebar → **Access** → **Users** → **Create New**.
2. Fill in:
   - Name
   - Email
   - Role — pick `Editor` for content creators, `Admin` for lead
     managers, `Super Admin` only for trusted operators
   - Active — leave ticked
   - **Password** — set a temporary one; tell them to change it on first
     login
3. Save. The user can now log in.

### Removing access

Open the user → uncheck **Active** → save. They can no longer log in
but their content/lead-assignment history is preserved. Delete the user
entirely only if required for privacy compliance.

## Daily workflow examples

### "I want to publish a new blog post about CCTV regulations"

Posts → Create New → fill in title, slug, category=Blog, excerpt, cover →
write the body in the rich-text editor → fill AI Visibility tab with the
keywords and quoted passage you want AI engines to pick up → Status =
Published → Save. Article is live within a minute.

### "A new lead came in. What do I do?"

Lead Management → Leads → click the new lead → read the message →
update **Status** to `Contacted` once you've reached out → add a
**Timeline** entry: type=Call, note=summary of the conversation → set
**Next action due** to your follow-up date → assign to yourself if
not already assigned → save.

### "Editor needs help — they say they can't publish their post"

That's by design. Editors can only publish posts where they are the
author. If they need help, an Admin can re-assign authorship to them
(set the `Author` field on the post to that editor), and they'll be able
to publish.

## Help

- **Lost in the UI:** the search bar (top of every list page) finds any
  record by title or email.
- **Need a teammate to help:** super admins can grant them admin access
  temporarily — Users → edit → role.
- **Real problem:** contact your dev manager. The codebase + this doc
  are everything they need to troubleshoot.
