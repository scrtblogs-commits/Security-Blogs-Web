// Schema.org / JSON-LD generators. One source of truth — components and
// pages call these to emit structured data. All @id values resolve against
// SITE_URL so nodes can reference each other across pages.

export const SITE_URL = 'https://securityblogs.com.au'

// ============================================================================
// SITE-WIDE GRAPH — emitted once from app/layout.tsx
//
// Three nodes share one @graph block so search engines see them as a
// connected set: Organization, WebSite, Person (founder). Per-page schemas
// reference these by @id rather than redeclaring them.
// ============================================================================
export const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'SecurityBlogs',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.png`,
      founder: { '@id': `${SITE_URL}/#founder` },
      sameAs: [
        'https://www.linkedin.com/company/security-blogs/',
        'https://www.facebook.com/people/Security-Blogs/61576725136537/',
        'https://www.instagram.com/securityblogs/',
        'https://www.youtube.com/@SecurityBlogs',
      ],
      areaServed: ['AU', 'US', 'GB', 'AE', 'SG'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'SecurityBlogs',
      description:
        'AI visibility, SEO and paid media built exclusively for the security industry.',
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/?s={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#founder`,
      name: 'Yousif Jonaid',
      jobTitle: 'Founder & Director',
      worksFor: { '@id': `${SITE_URL}/#organization` },
      sameAs: [
        'https://www.linkedin.com/in/yousif-jonaid-55893b361',
      ],
    },
  ],
}

// ============================================================================
// PER-PAGE GENERATORS
// ============================================================================

export function breadcrumbSchema(items: { label: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  }
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }
}

// Service node. Defaults to /services/<slug>/ URL form for the main services
// pages, but accepts an explicit `path` for services published elsewhere
// (e.g. /publish-with-us/* sub-services). Accepts an optional offers array
// to emit hasOfferCatalog where structured pricing exists.
export type ServiceOffer = {
  name: string                    // tier name (e.g. "Starter")
  price: string                   // numeric string ("199") or "Free"
  priceCurrency?: string          // ISO 4217, defaults to AUD
  description?: string            // short blurb for the tier
  url?: string                    // CTA URL for that tier
}

export function serviceSchema(opts: {
  name: string
  description: string
  slug?: string                   // shorthand for /services/<slug>/
  path?: string                   // full route path, e.g. /publish-with-us/guest-posting/
  serviceType?: string
  offers?: ServiceOffer[]         // when present, emits hasOfferCatalog
  catalogName?: string            // display name for the OfferCatalog
}) {
  const path =
    opts.path ??
    (opts.slug ? `/services/${opts.slug}/` : `/services/`)
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${path}#service`,
    name: opts.name,
    description: opts.description,
    ...(opts.serviceType ? { serviceType: opts.serviceType } : {}),
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: ['AU', 'US', 'GB', 'AE', 'SG'],
    url: `${SITE_URL}${path}`,
  }
  if (opts.offers && opts.offers.length > 0) {
    node.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: opts.catalogName ?? `${opts.name} Packages`,
      itemListElement: opts.offers.map((o) => ({
        '@type': 'Offer',
        name: o.name,
        price: o.price,
        priceCurrency: o.priceCurrency ?? 'AUD',
        ...(o.description ? { description: o.description } : {}),
        ...(o.url ? { url: o.url.startsWith('http') ? o.url : `${SITE_URL}${o.url}` } : { url: `${SITE_URL}${path}` }),
        availability: 'https://schema.org/InStock',
      })),
    }
  }
  return node
}

export function definedTermSetSchema(opts: {
  name: string
  description?: string
  terms: { id: string; name: string; description: string }[]
}) {
  const setId = `${SITE_URL}/knowledge-hub/definitions-glossary/#termset`
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': setId,
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    hasDefinedTerm: opts.terms.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': `${SITE_URL}/knowledge-hub/definitions-glossary/#${t.id}`,
      name: t.name,
      description: t.description,
      inDefinedTermSet: setId,
    })),
  }
}

export function articleSchema(opts: {
  headline: string
  description?: string
  path: string
  datePublished?: string
  dateModified?: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}${opts.path}#article`,
    headline: opts.headline,
    ...(opts.description ? { description: opts.description } : {}),
    url: `${SITE_URL}${opts.path}`,
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    publisher: { '@id': `${SITE_URL}/#organization` },
    author: { '@id': `${SITE_URL}/#founder` },
    mainEntityOfPage: { '@id': `${SITE_URL}${opts.path}` },
  }
}

// AboutPage for /about-us/. Lets Google understand the page's intent and
// surfaces the page in About-the-organization queries.
export function aboutPageSchema(opts: { path: string; description?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE_URL}${opts.path}#aboutpage`,
    url: `${SITE_URL}${opts.path}`,
    name: 'About SecurityBlogs',
    ...(opts.description ? { description: opts.description } : {}),
    mainEntity: { '@id': `${SITE_URL}/#organization` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
  }
}

// ContactPage for /contact/, with a ContactPoint so Google knows how to
// reach SecurityBlogs (used for sitelinks / knowledge-panel contact info).
export function contactPageSchema(opts: {
  path: string
  email?: string
  contactType?: string
  areaServed?: string[]
  availableLanguage?: string[]
}) {
  const cp: Record<string, unknown> = {
    '@type': 'ContactPoint',
    contactType: opts.contactType ?? 'customer support',
  }
  if (opts.email) cp.email = opts.email
  if (opts.areaServed) cp.areaServed = opts.areaServed
  if (opts.availableLanguage) cp.availableLanguage = opts.availableLanguage
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}${opts.path}#contactpage`,
    url: `${SITE_URL}${opts.path}`,
    name: 'Contact SecurityBlogs',
    mainEntity: {
      '@id': `${SITE_URL}/#organization`,
      contactPoint: cp,
    },
    isPartOf: { '@id': `${SITE_URL}/#website` },
  }
}

// Person node (lighter than the founder graph entry). Used for /about-us/
// team listings. memberOf links back to Organization.
export function personSchema(opts: {
  name: string
  jobTitle?: string
  knowsAbout?: string[]
  sameAs?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: opts.name,
    ...(opts.jobTitle ? { jobTitle: opts.jobTitle } : {}),
    ...(opts.knowsAbout ? { knowsAbout: opts.knowsAbout } : {}),
    ...(opts.sameAs ? { sameAs: opts.sameAs } : {}),
    worksFor: { '@id': `${SITE_URL}/#organization` },
  }
}

// JobPosting for /career/ role listings. Eligible for Google for Jobs.
// Dates default to today (datePosted) and 6 months out (validThrough) if
// not provided, since the role data on /career/ doesn't carry dates.
export function jobPostingSchema(opts: {
  title: string
  description: string
  employmentType?: string
  location?: string                // freeform city/region for AU-remote
  baseSalaryAmount?: { min: number; max?: number; currency?: string }
  datePosted?: string
  validThrough?: string
}) {
  const today = new Date().toISOString().slice(0, 10)
  const sixMonths = new Date()
  sixMonths.setMonth(sixMonths.getMonth() + 6)
  const validThrough = opts.validThrough ?? sixMonths.toISOString().slice(0, 10)
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: opts.title,
    description: opts.description,
    datePosted: opts.datePosted ?? today,
    validThrough,
    employmentType: opts.employmentType ?? 'FULL_TIME',
    hiringOrganization: { '@id': `${SITE_URL}/#organization` },
    directApply: false,
  }
  if (opts.location) {
    node.jobLocation = {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: opts.location, addressCountry: 'AU' },
    }
    node.applicantLocationRequirements = { '@type': 'Country', name: 'Australia' }
    node.jobLocationType = 'TELECOMMUTE'
  } else {
    node.jobLocationType = 'TELECOMMUTE'
    node.applicantLocationRequirements = { '@type': 'Country', name: 'Australia' }
  }
  if (opts.baseSalaryAmount) {
    node.baseSalary = {
      '@type': 'MonetaryAmount',
      currency: opts.baseSalaryAmount.currency ?? 'AUD',
      value: {
        '@type': 'QuantitativeValue',
        ...(opts.baseSalaryAmount.max
          ? { minValue: opts.baseSalaryAmount.min, maxValue: opts.baseSalaryAmount.max }
          : { value: opts.baseSalaryAmount.min }),
        unitText: 'YEAR',
      },
    }
  }
  return node
}

// Generic ItemList — used on overview/index pages (services, knowledge hub,
// publish-with-us, free-tools) to enumerate child items so search engines
// can model the section structure.
export function itemListSchema(opts: {
  name: string
  path: string
  items: { name: string; url: string; description?: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}${opts.path}#itemlist`,
    name: opts.name,
    url: `${SITE_URL}${opts.path}`,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: it.url.startsWith('http') ? it.url : `${SITE_URL}${it.url}`,
      ...(it.description ? { description: it.description } : {}),
    })),
  }
}
