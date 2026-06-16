# Schema Markup Rules — SecurityBlogs Standard

## Purpose

Schema markup (JSON-LD structured data) serves two critical functions:
1. **Rich results in Google** — enables FAQ rich results, review stars, breadcrumbs, sitelinks, and more
2. **AI visibility** — structured data is consumed by LLMs (ChatGPT, Perplexity, Gemini) to understand entity relationships, improving citation likelihood

SecurityBlogs uses JSON-LD format exclusively (not Microdata or RDFa).

---

## Required Schema on Every Page

### 1. Organisation Schema (Site-Wide)
Applied once, in the root layout (`app/layout.tsx`).

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://securityblogs.com.au/#organization",
  "name": "SecurityBlogs",
  "url": "https://securityblogs.com.au",
  "logo": "https://securityblogs.com.au/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+61-411-212-418",
    "contactType": "customer service",
    "areaServed": ["AU", "US", "GB", "AE", "SG"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/securityblogs",
    "https://twitter.com/securityblogs"
  ]
}
```

### 2. WebSite Schema (Site-Wide)
Applied once, in the root layout. Enables Google Sitelinks search box.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://securityblogs.com.au/#website",
  "url": "https://securityblogs.com.au",
  "name": "SecurityBlogs",
  "publisher": {
    "@id": "https://securityblogs.com.au/#organization"
  }
}
```

### 3. BreadcrumbList Schema (Every Indexed Page Except Homepage)
Applied dynamically based on URL path.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://securityblogs.com.au"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://securityblogs.com.au/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Security SEO",
      "item": "https://securityblogs.com.au/services/security-seo"
    }
  ]
}
```

---

## Page-Type Specific Schema

### Service Pages — `ProfessionalService`
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Security SEO Services",
  "description": "Specialist SEO for security companies — CCTV installers, access control integrators, and security SaaS vendors.",
  "provider": {
    "@id": "https://securityblogs.com.au/#organization"
  },
  "serviceType": "Search Engine Optimisation",
  "areaServed": ["AU", "US", "GB"],
  "url": "https://securityblogs.com.au/services/security-seo"
}
```

### Blog Posts — `Article` or `BlogPosting`
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "How to Rank #1 for Security Camera Installation Keywords",
  "author": {
    "@type": "Person",
    "name": "Yousif Jonaid",
    "url": "https://securityblogs.com.au/about-us"
  },
  "publisher": {
    "@id": "https://securityblogs.com.au/#organization"
  },
  "datePublished": "2025-01-15",
  "dateModified": "2025-06-01",
  "image": "https://securityblogs.com.au/images/security-seo-guide.jpg",
  "url": "https://securityblogs.com.au/knowledge-hub/blogs/security-camera-installation-seo"
}
```

### FAQ Sections — `FAQPage`
Apply whenever a page contains a FAQ section. Each Q&A pair must be included.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does Security SEO take to show results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most SecurityBlogs clients see meaningful ranking improvements within 3–6 months, with significant organic traffic growth visible by month 9–12. Results depend on the starting baseline, competition level, and content production pace."
      }
    }
  ]
}
```

### Local Business (GEO / Location Pages) — `LocalBusiness`
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SecurityBlogs",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "AU"
  },
  "telephone": "+61-411-212-418",
  "url": "https://securityblogs.com.au",
  "areaServed": {
    "@type": "City",
    "name": "Sydney"
  }
}
```

### Case Studies — `Case Study` mapped to `Article`
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://securityblogs.com.au/case-studies/[slug]#article",
  "headline": "How We Grew Organic Traffic 180% for a Sydney CCTV Installer",
  "articleBody": "...",
  "publisher": {
    "@id": "https://securityblogs.com.au/#organization"
  }
}
```

---

## AI Visibility Schema Rules

For AI Visibility Optimisation (AIO), schema must:

1. **Clearly define the entity** — use `@id` with the canonical URL to establish a unique entity identifier
2. **Include `sameAs` links** — connect to Wikipedia, Wikidata, LinkedIn, and other authoritative sources where they exist
3. **Be factually accurate** — LLMs use schema data for training; inaccurate schema can create incorrect AI citations
4. **Cover service descriptions thoroughly** — LLMs extract service information from `description` and `serviceType` fields
5. **Include `knowsAbout` on Person schema** — list the topics of expertise for the author/founder

---

## Schema Implementation Rules

1. **JSON-LD only** — no Microdata or RDFa
2. **Inject in `<head>` via `<script type="application/ld+json">`**
3. **Validate every schema** using Google's Rich Results Test before deployment
4. **No duplicate schema types on the same page** — one FAQPage per page, one Article per page
5. **All `@id` values must resolve to real, canonical URLs** on the domain
6. **Use absolute URLs** in all schema — not relative paths
7. **Keep schema updated** — if page content changes, update the schema to match

---

## Schema Checklist

Before publishing any page, verify:
- [ ] Organisation schema is present (via site-wide layout)
- [ ] BreadcrumbList schema matches the actual page path
- [ ] Page-type specific schema is applied (BlogPosting, FAQPage, Service, etc.)
- [ ] All `@id` values use canonical URLs
- [ ] Validated with Google Rich Results Test
- [ ] FAQPage schema applied to any page with a FAQ section
- [ ] `dateModified` is updated when content is updated
