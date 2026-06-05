// ─────────────────────────────────────────────────────────────────────
// Lightweight, hand-maintained TypeScript types that mirror the shape
// returned by the Payload CMS REST API for the collections this
// marketing site consumes.
//
// These are intentionally NOT auto-generated from cms/src/payload-types.ts.
// Reasons:
//   • The auto-generated file pulls in all of Payload's internal types
//     and Payload's relationship type union (number | Document) which
//     forces a runtime narrow in every consumer.
//   • The marketing site only needs the read shape — write shape lives
//     in the cms/ workspace.
//   • Decoupling means changing a CMS field without immediately
//     propagating a change to the marketing site (e.g. add a sidebar-
//     only field — site doesn't care).
//
// When you add a public field to a CMS collection, mirror it here.
// The single source of truth for the *write* shape stays in
// cms/src/collections/*.ts.
// ─────────────────────────────────────────────────────────────────────

export type CmsMedia = {
  id: string
  url: string
  alt?: string
  width?: number
  height?: number
  sizes?: {
    thumb?:  { url: string; width: number; height: number }
    small?:  { url: string; width: number; height: number }
    medium?: { url: string; width: number; height: number }
    large?:  { url: string; width: number; height: number }
  }
}

// ── Settings global ─────────────────────────────────────────────────
export type CmsSettings = {
  brand: {
    name: string
    tagline?: string
    logo?: CmsMedia | string | null
  }
  contact: {
    email: string
    phone: string
    address?: {
      streetAddress?: string
      locality?: string
      region?: string
      postalCode?: string
      country?: string
    }
  }
  social: {
    twitter?: string
    linkedin?: string
    youtube?: string
    facebook?: string
    instagram?: string
  }
  footer: {
    copyright?: string
    columns?: Array<{ heading: string; links: Array<{ label: string; href: string }> }>
  }
  seo: {
    defaultTitle?: string
    defaultDescription?: string
    defaultOgImage?: CmsMedia | string | null
    keywords?: string[]
  }
  analytics: {
    gtmId?: string
    plausibleDomain?: string
  }
  booking?: { calendlyUrl?: string }
  cookie?: { bannerEnabled?: boolean; bannerText?: string }
  maintenance?: { enabled?: boolean; message?: string }
}

// ── Posts (blog) ────────────────────────────────────────────────────
export type CmsPostCategory =
  | 'blog'
  | 'industry-news'
  | 'security-guides'
  | 'research-reports'
  | 'security-industry-seo'
  | 'security-trends-2026'

export type CmsPost = {
  id: string
  slug: string
  title: string
  excerpt?: string
  category: CmsPostCategory
  status: 'draft' | 'scheduled' | 'published' | 'archived'
  publishedAt?: string
  featuredImage?: CmsMedia | null
  body?: unknown                     // Lexical JSON — feed to LexicalRenderer
  authors?: Array<{ id: string; name: string }>
  aiVisibility?: AiVisibility
  seo?: CmsSeoOverrides
}

// ── Services ────────────────────────────────────────────────────────
export type CmsServiceCapability = {
  title: string
  description: string
  icon?: string
  previewVariant?: string            // maps to a component in components/previews/
}

export type CmsService = {
  id: string
  slug: string
  title: string
  shortName?: string
  tagline: string
  heroDescription: string
  heroImage?: CmsMedia | null
  capabilities?: CmsServiceCapability[]
  processSteps?: Array<{ title: string; description: string }>
  stats?: Array<{ value: string; label: string }>
  faqs?: Array<{ question: string; answer: string }>
  benefits?: Array<{ title: string; description: string }>
  aiVisibility?: AiVisibility
  seo?: CmsSeoOverrides
}

// ── Case Studies ────────────────────────────────────────────────────
export type CmsCaseStudy = {
  id: string
  slug: string
  clientName: string
  partner?: { id: string; name: string; slug: string } | null
  service?: { id: string; title: string; slug: string } | null
  summary: string
  body?: unknown                     // Lexical JSON
  results?: Array<{ metric: string; value: string }>
  publishedAt?: string
  aiVisibility?: AiVisibility
  seo?: CmsSeoOverrides
}

// ── Partners ────────────────────────────────────────────────────────
export type CmsPartner = {
  id: string
  slug: string
  name: string
  type: 'client' | 'partner' | 'integrator' | 'vendor' | 'community'
  region?: string
  logo?: CmsMedia | null
  description?: string
  isFeatured?: boolean
  services?: Array<{ id: string; title: string; slug: string }>
  caseStudy?: { id: string; slug: string } | null
}

// ── Pages (block-based) ─────────────────────────────────────────────
export type CmsBlock = { blockType: string; [key: string]: unknown }

export type CmsPage = {
  id: string
  slug: string
  title: string
  modules?: CmsBlock[]
  aiVisibility?: AiVisibility
  seo?: CmsSeoOverrides
}

// ── Redirects ───────────────────────────────────────────────────────
export type CmsRedirect = {
  id: string
  fromPath: string
  toPath: string
  statusCode: '301' | '302' | '307' | '308'
  isRegex?: boolean
  isActive: boolean
}

// ── Shared bits ─────────────────────────────────────────────────────
export type AiVisibility = {
  entityName?: string
  primaryTopic?: string
  targetEngines?: string[]
  keywordsToWin?: string[]
  quotedPassages?: Array<{ text: string }>
  entityRelationships?: Array<{ entity: string; relationship: string }>
  competingUrls?: Array<{ url: string }>
}

export type CmsSeoOverrides = {
  title?: string
  description?: string
  ogImage?: CmsMedia | null
  canonical?: string
  noindex?: boolean
}
