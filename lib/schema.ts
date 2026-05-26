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
      logo: `${SITE_URL}/logo.svg`,
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

export function serviceSchema(opts: {
  name: string
  description: string
  slug: string
  serviceType?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/services/${opts.slug}/#service`,
    name: opts.name,
    description: opts.description,
    ...(opts.serviceType ? { serviceType: opts.serviceType } : {}),
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: ['AU', 'US', 'GB', 'AE', 'SG'],
    url: `${SITE_URL}/services/${opts.slug}/`,
  }
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
