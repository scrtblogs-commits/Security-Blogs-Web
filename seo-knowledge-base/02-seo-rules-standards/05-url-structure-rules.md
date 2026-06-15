# URL Structure Rules — SecurityBlogs Australia

**Document type:** SEO Rules & Standards  
**Applies to:** All pages published on SecurityBlogs  
**Last reviewed:** June 2026  
**Owner:** SEO Team

---

## Overview

URLs are a foundational SEO element. A well-structured URL communicates the page's topic to both users and search engines, contributes to click-through rate in SERPs, and forms the basis of a logical site architecture. Poorly structured URLs — with dates, random strings, excessive depth, or no keywords — undermine site authority and create long-term technical debt.

All URLs on SecurityBlogs must be set deliberately and reviewed before publishing. Once a URL is live and indexed, changing it requires a 301 redirect — a process that carries risk and administrative overhead. Get it right the first time.

---

## 1. Core URL Formatting Rules

### 1.1 Lowercase Only

All URLs must be entirely lowercase.

**Correct:** `securityblogs.com.au/seo-for-security-companies`  
**Incorrect:** `securityblogs.com.au/SEO-for-Security-Companies`

**Why:** Uppercase URLs create duplicate content risks — some servers treat `/SEO` and `/seo` as different pages. Lowercase is universally consistent.

### 1.2 Hyphens, Not Underscores

Use hyphens ( - ) to separate words in URLs. Never use underscores ( _ ), spaces, or other characters.

**Correct:** `securityblogs.com.au/security-guard-seo`  
**Incorrect:** `securityblogs.com.au/security_guard_seo`  
**Incorrect:** `securityblogs.com.au/security%20guard%20seo`

**Why:** Google treats hyphens as word separators. Underscores join words into a single token — "security_guard" reads as one word to Google, not two.

### 1.3 Keywords Must Be Included

Every URL must include the primary keyword for the page. The URL should clearly communicate the page topic.

**Correct:** `securityblogs.com.au/seo-for-security-companies`  
**Incorrect:** `securityblogs.com.au/page-1` or `securityblogs.com.au/?p=847`

The URL keyword does not need to be an exact keyword match — it should be a clean, readable version of the page topic.

### 1.4 Remove Stop Words

Stop words (a, an, the, in, of, and, for, to, etc.) should be removed from URLs unless their removal makes the URL ambiguous or unreadable.

**Correct:** `securityblogs.com.au/security-company-seo-australia`  
**Acceptable:** `securityblogs.com.au/seo-for-security-companies` ("for" kept for readability)  
**Incorrect:** `securityblogs.com.au/the-best-seo-services-for-security-companies-in-australia`

### 1.5 Keep URLs Short

URLs should be as short as possible while remaining descriptive and keyword-relevant.

| URL Element | Guideline |
|---|---|
| **Target character count** | 50–75 characters (full URL) |
| **Maximum word count (slug only)** | 5–6 words |
| **Minimum keyword inclusion** | 1 primary keyword in the slug |

**Correct:** `securityblogs.com.au/services/web-design`  
**Incorrect:** `securityblogs.com.au/services/professional-web-design-services-for-security-companies-in-australia`

### 1.6 No Special Characters

URLs must not contain:
- Uppercase letters (covered above)
- Spaces (use hyphens instead)
- Underscores
- Punctuation marks: !, @, #, $, %, ^, &, *, (, ), +, =, [, ], {, }, |, \, ;, ', ", ,, <, >, ?
- Encoded characters (e.g., %20, %3A) except where technically unavoidable

---

## 2. Maximum Directory Depth

### Rule: Maximum 3 levels deep (not counting the domain)

| Level | Example |
|---|---|
| Level 1 | `securityblogs.com.au/services/` |
| Level 2 | `securityblogs.com.au/services/seo/` |
| Level 3 | `securityblogs.com.au/services/seo/local-seo/` |
| **Too deep (avoid)** | `securityblogs.com.au/services/seo/local-seo/google-business-profile/` |

**Why:** Deeper URLs are harder for Google to crawl efficiently, distribute less link equity to deep pages, and are less memorable and shareable for users.

**Exception:** Large resource libraries or extensive blog archives may have a 4th level if genuinely required by the content hierarchy — but this requires SEO team approval.

---

## 3. Trailing Slash Consistency

### Rule: Be consistent — pick one convention and apply it sitewide.

SecurityBlogs uses **trailing slashes on directory URLs** and **no trailing slash on file/post URLs**. WordPress handles this by default.

| Page Type | With Trailing Slash | Without Trailing Slash |
|---|---|---|
| Category/directory pages | ✔ Preferred | Redirect to slash version |
| Blog posts | ✔ Preferred (WordPress default) | Redirect to slash version |
| Sitewide rule | Always use trailing slash | Never mix conventions |

**Canonical rule:** If both versions are accessible (with and without trailing slash), one must 301 redirect to the other. The canonical tag must point to the preferred version. WordPress configured correctly handles this automatically.

**Check:** Verify that `securityblogs.com.au/services/seo` and `securityblogs.com.au/services/seo/` both resolve to the same canonical URL — they must not both return 200 OK.

---

## 4. No Dates in URLs for Evergreen Content

### Rule: Do not include dates in URLs for evergreen or recurring content.

Dates in URLs signal to users and search engines that content may be outdated. For security industry guides, service pages, and general blog content, evergreen URLs are preferred.

**Avoid:**  
`securityblogs.com.au/blog/2024/06/seo-tips-security-companies`

**Preferred:**  
`securityblogs.com.au/blog/seo-tips-security-companies`

**Exception — News and Time-Sensitive Content:**  
For genuine news posts where the date is part of the story (e.g., industry reports, regulatory updates, event coverage), dates in the URL structure may be acceptable. Even then, prefer category-based organisation:

`securityblogs.com.au/news/asial-conference-2026-highlights`

rather than:

`securityblogs.com.au/news/2026/06/asial-conference-highlights`

---

## 5. Canonical URL Rules

### 5.1 What Is a Canonical URL?

A canonical URL (`rel="canonical"`) tells Google which version of a URL is the "master" version. It prevents duplicate content penalties when the same or similar content is accessible at multiple URLs.

### 5.2 When to Set a Canonical Tag

- **Always** set a self-referencing canonical tag on every page (WordPress SEO plugins do this automatically)
- Set a canonical tag when paginated content exists (page 2, page 3 of a category) — point to the first page or use rel="next/prev"
- Set a canonical when a page is accessible via multiple URL parameters (e.g., `?ref=newsletter`, `?utm_source=email`)
- Set a canonical on any AMP (Accelerated Mobile Pages) version pointing to the standard page

### 5.3 Canonical vs 301 Redirect

| Situation | Use Canonical | Use 301 Redirect |
|---|---|---|
| Two very similar pages, one preferred | ✔ | |
| Old URL replaced by new URL permanently | | ✔ |
| www vs non-www versions | | ✔ (sitewide) |
| HTTP vs HTTPS | | ✔ (sitewide) |
| Syndicated content (published elsewhere) | ✔ (point to original) | |

---

## 6. URL Structures by Page Type

### 6.1 Homepage

```
https://securityblogs.com.au/
```

### 6.2 Primary Service Pages

```
https://securityblogs.com.au/services/seo/
https://securityblogs.com.au/services/aeo/
https://securityblogs.com.au/services/geo/
https://securityblogs.com.au/services/ai-visibility/
https://securityblogs.com.au/services/web-design/
https://securityblogs.com.au/services/google-ads/
```

### 6.3 Secondary / Supporting Service Pages

```
https://securityblogs.com.au/services/seo/local-seo/
https://securityblogs.com.au/services/seo/technical-seo/
https://securityblogs.com.au/services/web-design/wordpress/
```

### 6.4 Guest Posting and Advertising

```
https://securityblogs.com.au/guest-posting/
https://securityblogs.com.au/advertise/
```

### 6.5 Blog Posts

```
https://securityblogs.com.au/blog/seo-tips-security-companies/
https://securityblogs.com.au/blog/what-is-aeo/
https://securityblogs.com.au/blog/geo-vs-seo-security-firms/
https://securityblogs.com.au/blog/local-seo-security-guard-companies/
```

### 6.6 Blog Category Pages

```
https://securityblogs.com.au/blog/seo/
https://securityblogs.com.au/blog/aeo/
https://securityblogs.com.au/blog/web-design/
https://securityblogs.com.au/blog/google-ads/
https://securityblogs.com.au/blog/security-industry-news/
```

### 6.7 Location / Regional Pages

```
https://securityblogs.com.au/services/seo/melbourne/
https://securityblogs.com.au/services/seo/sydney/
https://securityblogs.com.au/services/seo/brisbane/
https://securityblogs.com.au/services/seo/perth/
```

### 6.8 Resource / FAQ Pages

```
https://securityblogs.com.au/resources/security-seo-faq/
https://securityblogs.com.au/resources/seo-glossary/
https://securityblogs.com.au/resources/security-industry-marketing-guide/
```

### 6.9 About and Legal Pages

```
https://securityblogs.com.au/about/
https://securityblogs.com.au/contact/
https://securityblogs.com.au/privacy-policy/
https://securityblogs.com.au/terms-of-service/
https://securityblogs.com.au/editorial-standards/
```

### 6.10 Author Pages

```
https://securityblogs.com.au/author/jane-smith/
https://securityblogs.com.au/author/michael-jones/
```

---

## 7. Redirects and URL Changes

### 7.1 When a URL Must Change

URL changes should be avoided wherever possible. However, if a URL must change (e.g., a slug has been set incorrectly, a service is renamed, site restructuring occurs):

1. Set up a **301 permanent redirect** from the old URL to the new URL before or simultaneously with the change
2. Update all internal links across the site pointing to the old URL
3. Update any external links you control (social profiles, directories, partner sites)
4. Notify the SEO team to update the sitemap
5. Monitor Google Search Console for crawl errors on the old URL for 30 days post-change

### 7.2 301 Redirect Rule

- Use 301 (permanent) redirects for all intentional URL changes
- Never use 302 (temporary) redirects for permanent changes — they do not pass full link equity
- Never delete a page without setting a 301 redirect to the most relevant live page

### 7.3 Redirect Chains

- A redirect chain occurs when URL A → URL B → URL C
- Redirect chains dilute PageRank passed through the chain
- **Rule:** All redirects must point directly to the final live URL — no chains allowed
- Audit redirects quarterly and collapse any chains found

---

## 8. URL Quality Checklist

Before publishing any page, verify:

- [ ] URL is entirely lowercase
- [ ] Words are separated by hyphens (not underscores or spaces)
- [ ] Primary keyword is included in the URL slug
- [ ] Stop words have been removed where possible without harming readability
- [ ] URL is no more than 3 directory levels deep
- [ ] URL contains no special characters or encoded characters
- [ ] No date included in URL (unless content is explicitly time-sensitive news)
- [ ] Trailing slash is consistent with sitewide convention
- [ ] Self-referencing canonical tag is set
- [ ] URL length is under 75 characters where possible
- [ ] URL slug is 5–6 words maximum
- [ ] URL matches the page type format shown in Section 6

---

*Part of the SecurityBlogs SEO Knowledge Base — 02 SEO Rules & Standards*  
*Last updated: June 2026 | Owner: SecurityBlogs SEO Team*
