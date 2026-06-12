# URL Structure Rules — SecurityBlogs Standard

## Purpose

URL structure affects SEO through keyword signals, user trust, and crawl efficiency. A clean, logical URL structure also makes internal linking and content management easier.

---

## Core URL Rules

### Rule 1: All Lowercase
URLs must be entirely lowercase. Mixed-case URLs create duplicate content issues.

`/services/Security-SEO` ❌  
`/services/security-seo` ✅

### Rule 2: Hyphens to Separate Words
Use hyphens (-) to separate words in URLs. Never use underscores (_), spaces (%20), or concatenated words.

`/security_seo` ❌  
`/securityseo` ❌  
`/security-seo` ✅

### Rule 3: Descriptive, Keyword-Rich Slugs
URLs should include the primary keyword for the page. Avoid generic slugs like `/page-1` or `/post-abc`.

`/knowledge-hub/blogs/post-001` ❌  
`/knowledge-hub/blogs/security-seo-for-cctv-companies` ✅

### Rule 4: Short and Clean
Shorter URLs rank better and are easier to share. Remove stop words (and, the, a, of, for, in) where they don't add meaning.

`/knowledge-hub/blogs/how-to-do-seo-for-the-security-industry-in-australia` ❌  
`/knowledge-hub/blogs/seo-for-security-industry-australia` ✅

### Rule 5: No Parameters or Query Strings in Canonical URLs
Canonical URLs should not contain query parameters (?page=2, ?ref=twitter). Use clean pagination URLs and canonical tags on filtered pages.

### Rule 6: No Dates in URLs
Do not include publication dates in blog post URLs. Dates make URLs look stale when content is updated.

`/knowledge-hub/blogs/2024/01/security-seo-guide` ❌  
`/knowledge-hub/blogs/security-seo-guide` ✅

### Rule 7: Consistent URL Structure Per Content Type
Every content type follows the same URL pattern without exception.

---

## URL Structure by Page Type

### Service Pages
`/services/[service-slug]`

Examples:
- `/services/security-seo`
- `/services/aio`
- `/services/aeo`
- `/services/geo`
- `/services/google-ads`
- `/services/bing-ads`
- `/services/web-design`

### Knowledge Hub Posts
`/knowledge-hub/[category-slug]/[post-slug]`

Examples:
- `/knowledge-hub/blogs/security-seo-for-cctv-companies`
- `/knowledge-hub/security-industry-seo/local-seo-for-security-installers`
- `/knowledge-hub/security-guides/how-to-set-up-google-business-profile`
- `/knowledge-hub/definitions-glossary/what-is-aeo`

### Case Studies
`/case-studies/[client-slug]`

Examples:
- `/case-studies/cctv-installer-sydney-180-percent-traffic-growth`
- `/case-studies/security-saas-vendor-ai-visibility`

### Publish With Us
`/publish-with-us/[service-slug]`

Examples:
- `/publish-with-us/guest-posting`
- `/publish-with-us/sponsored-posts`
- `/publish-with-us/press-release`
- `/publish-with-us/backlink-packages`

### Free Tools
`/free-tools/[tool-slug]`

Examples:
- `/free-tools/ai-visibility-score`
- `/free-tools/security-directory`

### About / Contact / Static Pages
`/about-us`  
`/contact`  
`/career`  
`/ai-visibility-center`  
`/ai-visibility-checklist`

---

## URL Length Guidelines

| Page Type | Ideal URL Length | Maximum |
|---|---|---|
| Homepage | N/A — root URL | — |
| Service pages | 20–40 characters | 60 |
| Blog posts | 30–60 characters | 75 |
| Location pages | 30–60 characters | 75 |
| Category pages | 20–40 characters | 60 |

---

## Redirects & URL Changes

If a URL must change:
1. Always implement a 301 permanent redirect from the old URL to the new URL
2. Update all internal links to point to the new URL
3. Update the XML sitemap
4. Monitor Google Search Console for crawl errors after the change
5. Never leave a URL returning a 404 — always redirect

SecurityBlogs uses the Redirects collection in Payload CMS to manage 301/302/307/308 redirects. Every redirect is logged with hit count for monitoring.

---

## URL Checklist

Before publishing any page, verify:
- [ ] URL is all lowercase
- [ ] Words are separated by hyphens
- [ ] URL includes the primary keyword
- [ ] URL is as short as possible without losing meaning
- [ ] No date in the URL
- [ ] No parameters or query strings
- [ ] URL matches the content type pattern (e.g., `/services/`, `/knowledge-hub/`)
- [ ] URL is unique — no duplicate URLs
- [ ] If the URL is a change from a previous URL, a 301 redirect is in place
