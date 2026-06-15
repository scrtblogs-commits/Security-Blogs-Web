# Schema Markup Rules — SecurityBlogs Australia

**Document type:** SEO Rules & Standards  
**Applies to:** All pages published on SecurityBlogs  
**Last reviewed:** June 2026  
**Owner:** SEO Team / Web Development Team

---

## Overview

Schema markup (structured data) is machine-readable code added to a page's HTML that tells search engines precisely what the content on the page represents. It does not change the visible appearance of the page for users, but it enables Google to display **rich results** in SERPs — including star ratings, FAQs, breadcrumbs, article dates, organisation details, and more.

For SecurityBlogs, schema markup is a competitive advantage: most security industry websites in Australia do not use it. Correct implementation gives our pages a disproportionate SERP visibility advantage.

### Schema at SecurityBlogs serves three goals:

1. **Rich result eligibility** — Enable enhanced SERP features (FAQ dropdowns, breadcrumbs, article information, review stars)
2. **E-E-A-T reinforcement** — Confirm organisational identity, authorship, and expertise to Google's systems
3. **AEO and GEO support** — Structured data improves the likelihood that AI search tools (Google AI Overviews, Perplexity, ChatGPT) correctly attribute and cite SecurityBlogs content

---

## 1. Format: JSON-LD Only

**SecurityBlogs uses JSON-LD format exclusively for all schema markup.**

JSON-LD (JavaScript Object Notation for Linked Data) is:
- Recommended by Google over Microdata and RDFa
- Injected into the `<head>` or `<body>` without modifying the HTML content structure
- Easier to maintain, audit, and update
- Fully supported by all schema types

**Never use Microdata or RDFa** for new schema implementations. If legacy Microdata is found in existing templates, flag for migration to JSON-LD.

All schema must be placed within a `<script type="application/ld+json">` tag.

---

## 2. Schema by Page Type

### 2.1 Homepage

**Required schemas:**
- `Organization`
- `WebSite` (with SearchAction for sitelinks search box)

**Recommended:**
- `BreadcrumbList` (if site supports breadcrumb navigation from homepage)

---

### 2.2 Service Pages

**Required schemas:**
- `Service`
- `BreadcrumbList`
- `Organization` (nested within or alongside Service)

**Recommended:**
- `FAQPage` (if a FAQ section is present on the page)
- `Review` or `AggregateRating` (if genuine client reviews are displayed)

---

### 2.3 Blog Posts / Articles

**Required schemas:**
- `Article` (or `BlogPosting` — a subtype of Article)
- `BreadcrumbList`

**Recommended:**
- `FAQPage` (if the post includes a FAQ section)
- `Person` (for author identification — nested in Article as `author`)
- `ImageObject` (for the featured image)

---

### 2.4 Category / Archive Pages

**Required schemas:**
- `CollectionPage` (or `WebPage`)
- `BreadcrumbList`

**Recommended:**
- `ItemList` (listing the articles within the category)

---

### 2.5 FAQ Pages / Resource Pages

**Required schemas:**
- `FAQPage`
- `BreadcrumbList`
- `WebPage`

---

### 2.6 Author Pages

**Required schemas:**
- `Person`
- `BreadcrumbList`

**Recommended:**
- `ItemList` (listing articles authored by that person)

---

### 2.7 Guest Posting and Advertising Pages

**Required schemas:**
- `Service`
- `BreadcrumbList`
- `Organization`

**Recommended:**
- `FAQPage`
- `Offer` (nested within Service, if pricing is listed)

---

## 3. SecurityBlogs Organisation Values

Use these exact values for all `Organization` schema instances across the site. Consistency is critical — inconsistent NAP (Name, Address, Phone) data across schema undermines local SEO signals.

```json
{
  "@type": "Organization",
  "name": "SecurityBlogs",
  "url": "https://securityblogs.com.au",
  "logo": "https://securityblogs.com.au/wp-content/uploads/securityblogs-logo.png",
  "description": "Australia's dedicated security industry publication offering SEO, AEO, GEO, AI Visibility, web design, Google Ads, guest posting and advertising services for security businesses.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Melbourne",
    "addressRegion": "VIC",
    "addressCountry": "AU"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "hello@securityblogs.com.au",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://www.linkedin.com/company/securityblogs",
    "https://www.facebook.com/securityblogs",
    "https://twitter.com/securityblogs"
  ]
}
```

> **Note:** Update the `sameAs` URLs to match SecurityBlogs' verified social media profiles. Update `logo` path to the actual production image URL. Update `email` to the correct contact address.

---

## 4. Schema Examples by Type

### 4.1 Organization Schema (Homepage)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SecurityBlogs",
  "url": "https://securityblogs.com.au",
  "logo": "https://securityblogs.com.au/wp-content/uploads/securityblogs-logo.png",
  "description": "Australia's dedicated security industry publication offering SEO, web design, Google Ads and content marketing for security businesses.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Melbourne",
    "addressRegion": "VIC",
    "addressCountry": "AU"
  },
  "sameAs": [
    "https://www.linkedin.com/company/securityblogs",
    "https://www.facebook.com/securityblogs"
  ]
}
</script>
```

---

### 4.2 WebSite Schema with SearchAction (Homepage)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SecurityBlogs",
  "url": "https://securityblogs.com.au",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://securityblogs.com.au/?s={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>
```

---

### 4.3 Article / BlogPosting Schema (Blog Posts)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "10 Local SEO Tips for Security Companies in Australia",
  "description": "Discover ten practical local SEO strategies to help your Australian security company rank higher on Google and attract more clients.",
  "image": "https://securityblogs.com.au/wp-content/uploads/local-seo-security-companies.jpg",
  "author": {
    "@type": "Person",
    "name": "Jane Smith",
    "url": "https://securityblogs.com.au/author/jane-smith/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "SecurityBlogs",
    "logo": {
      "@type": "ImageObject",
      "url": "https://securityblogs.com.au/wp-content/uploads/securityblogs-logo.png"
    }
  },
  "datePublished": "2026-05-12",
  "dateModified": "2026-06-01",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://securityblogs.com.au/blog/local-seo-tips-security-companies/"
  }
}
</script>
```

**Required properties for Article/BlogPosting:**
- `headline` — matches the H1 of the post
- `author` — named Person with URL to author page
- `publisher` — SecurityBlogs Organization
- `datePublished` — ISO 8601 format (YYYY-MM-DD)
- `dateModified` — ISO 8601 format; update on every significant content refresh
- `image` — featured image URL; must be at least 1200 × 630px
- `mainEntityOfPage` — canonical URL of the post

---

### 4.4 Service Schema (Service Pages)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "SEO for Security Companies",
  "serviceType": "Search Engine Optimisation",
  "description": "Expert SEO services for Australian security companies. SecurityBlogs delivers keyword research, on-page optimisation, content strategy and technical SEO tailored to the security industry.",
  "provider": {
    "@type": "Organization",
    "name": "SecurityBlogs",
    "url": "https://securityblogs.com.au"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Australia"
  },
  "url": "https://securityblogs.com.au/services/seo/",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "AUD",
    "availability": "https://schema.org/InStock",
    "url": "https://securityblogs.com.au/services/seo/"
  }
}
</script>
```

---

### 4.5 FAQPage Schema

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does SEO take for a security company?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most security companies see meaningful improvement in organic rankings within 3 to 6 months of implementing a structured SEO strategy. Highly competitive markets such as Sydney or Melbourne may require 6 to 12 months for page-one placement on primary keywords."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a separate page for each city I serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Creating a dedicated location page for each city or region you serve allows you to target local search queries specifically. Each page must contain unique, relevant content about your services in that location — not duplicated text with only the city name swapped."
      }
    }
  ]
}
</script>
```

**Rules for FAQPage schema:**
- Only use `FAQPage` when the page genuinely contains a Q&A section
- Each `Question` must appear visibly on the page — do not mark up hidden questions
- Answers must be concise (under 300 words per answer)
- Do not mark up questions as FAQ schema if they are promotional content disguised as questions

---

### 4.6 BreadcrumbList Schema

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://securityblogs.com.au/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://securityblogs.com.au/services/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "SEO for Security Companies",
      "item": "https://securityblogs.com.au/services/seo/"
    }
  ]
}
</script>
```

**BreadcrumbList rules:**
- Must be applied to every page except the homepage
- Position numbers must start at 1 and be sequential
- Each `item` URL must be a live, canonical URL
- `name` values must match the visible breadcrumb labels displayed on the page

---

### 4.7 Person Schema (Author Pages)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jane Smith",
  "url": "https://securityblogs.com.au/author/jane-smith/",
  "jobTitle": "Security Industry Writer",
  "worksFor": {
    "@type": "Organization",
    "name": "SecurityBlogs",
    "url": "https://securityblogs.com.au"
  },
  "description": "Jane Smith is a digital marketing writer covering SEO, AEO and content strategy for the Australian security industry.",
  "sameAs": [
    "https://www.linkedin.com/in/janesmith"
  ]
}
</script>
```

---

### 4.8 ItemList Schema (Category / Archive Pages)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "SEO Articles for Security Companies",
  "description": "A collection of SEO guides and articles for Australian security businesses, published by SecurityBlogs.",
  "url": "https://securityblogs.com.au/blog/seo/",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": "https://securityblogs.com.au/blog/local-seo-tips-security-companies/",
      "name": "10 Local SEO Tips for Security Companies"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "url": "https://securityblogs.com.au/blog/security-guard-seo-guide/",
      "name": "Security Guard SEO: A Complete Australian Guide"
    }
  ]
}
</script>
```

---

## 5. Required vs Recommended Properties Summary

| Schema Type | Required Properties | Recommended Properties |
|---|---|---|
| `Organization` | name, url | logo, address, contactPoint, sameAs, description |
| `WebSite` | name, url | potentialAction (SearchAction) |
| `Article` / `BlogPosting` | headline, author, publisher, datePublished, mainEntityOfPage | dateModified, image, description, wordCount |
| `Service` | name, provider | serviceType, description, areaServed, offers, url |
| `FAQPage` | mainEntity (Question + Answer) | — |
| `BreadcrumbList` | itemListElement (position, name, item) | — |
| `Person` | name | url, jobTitle, worksFor, sameAs, description |
| `ItemList` | itemListElement (position, url, name) | name, description, url |

---

## 6. Validation and Testing

All schema markup must be validated before publishing.

### Testing Tools

1. **Google Rich Results Test** — `https://search.google.com/test/rich-results`  
   Tests whether a page is eligible for rich results based on its schema.

2. **Schema.org Validator** — `https://validator.schema.org`  
   Validates schema syntax and structure against the official schema.org specification.

3. **Google Search Console → Enhancements**  
   Monitor for schema errors and warnings post-publication. Review monthly.

### Validation Rules

- All required properties must be present — no warnings permitted on required fields
- No critical errors on any schema block
- Test every new page type template when first set up
- Test individual pages when adding new schema types
- Check for broken `@id` references and non-canonical URLs within schema

---

## 7. Schema Quality Checklist

Before publishing any page, verify:

- [ ] JSON-LD format is used (not Microdata or RDFa)
- [ ] `<script type="application/ld+json">` tags are correctly structured
- [ ] Correct schema type(s) applied for this page type (see Section 2)
- [ ] All required properties are populated
- [ ] Organization name, URL, and address match SecurityBlogs standard values (Section 3)
- [ ] `datePublished` is in ISO 8601 format (YYYY-MM-DD)
- [ ] `dateModified` is updated when content is significantly revised
- [ ] All URLs within schema are canonical and return 200 status
- [ ] BreadcrumbList is present and sequential
- [ ] FAQPage schema only used when a visible Q&A section exists on the page
- [ ] Schema validated via Google Rich Results Test with no critical errors
- [ ] Author name in Article schema matches the credited author on the page

---

*Part of the SecurityBlogs SEO Knowledge Base — 02 SEO Rules & Standards*  
*Last updated: June 2026 | Owner: SecurityBlogs SEO Team / Web Development*
