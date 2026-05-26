import type { MetadataRoute } from 'next'

// Required so Next.js 15 emits this as a static file under output: 'export'.
export const dynamic = 'force-static'

// Generates /sitemap.xml at build time. Lists ONLY new canonical URLs —
// the 29 legacy redirect stubs (/aio/, /security-seo-service/, etc.) are
// intentionally excluded because their pages are robots: { index: false }
// and exist only to soft-301 to a target listed below.
//
// Priority is a hint Google largely ignores, but set honestly:
//   1.0  homepage
//   0.9  cornerstone service pages
//   0.7-0.8  hub / content pages
//   0.6  monetisation pages
//   0.2-0.4  legal / career

const SITE = 'https://securityblogs.com.au'

type Entry = {
  path: string
  priority: number
  changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}

const pages: Entry[] = [
  { path: '/', priority: 1.0, changeFreq: 'weekly' },

  // Services
  { path: '/services/',                priority: 0.9, changeFreq: 'monthly' },
  { path: '/services/security-seo/',   priority: 0.9, changeFreq: 'monthly' },
  { path: '/services/aio/',            priority: 0.9, changeFreq: 'monthly' },
  { path: '/services/aeo/',            priority: 0.9, changeFreq: 'monthly' },
  { path: '/services/geo/',            priority: 0.9, changeFreq: 'monthly' },
  { path: '/services/google-ads/',     priority: 0.9, changeFreq: 'monthly' },
  { path: '/services/bing-ads/',       priority: 0.9, changeFreq: 'monthly' },
  { path: '/services/web-design/',     priority: 0.9, changeFreq: 'monthly' },

  // Knowledge hub
  { path: '/knowledge-hub/',                          priority: 0.8, changeFreq: 'weekly'  },
  { path: '/knowledge-hub/blogs/',                    priority: 0.8, changeFreq: 'weekly'  },
  { path: '/knowledge-hub/definitions-glossary/',     priority: 0.7, changeFreq: 'monthly' },
  { path: '/knowledge-hub/industry-news/',            priority: 0.7, changeFreq: 'weekly'  },
  { path: '/knowledge-hub/research-reports/',         priority: 0.7, changeFreq: 'monthly' },
  { path: '/knowledge-hub/security-guides/',          priority: 0.7, changeFreq: 'monthly' },
  { path: '/knowledge-hub/security-industry-seo/',    priority: 0.7, changeFreq: 'monthly' },
  { path: '/knowledge-hub/security-trends-2026/',     priority: 0.7, changeFreq: 'monthly' },

  // Publish with us
  { path: '/publish-with-us/',                        priority: 0.7, changeFreq: 'monthly' },
  { path: '/publish-with-us/advertise/',              priority: 0.6, changeFreq: 'monthly' },
  { path: '/publish-with-us/backlink-packages/',      priority: 0.6, changeFreq: 'monthly' },
  { path: '/publish-with-us/guest-posting/',          priority: 0.6, changeFreq: 'monthly' },
  { path: '/publish-with-us/press-release/',          priority: 0.6, changeFreq: 'monthly' },
  { path: '/publish-with-us/pricing-guidelines/',     priority: 0.6, changeFreq: 'monthly' },
  { path: '/publish-with-us/product-promotion/',      priority: 0.6, changeFreq: 'monthly' },
  { path: '/publish-with-us/sponsored-posts/',        priority: 0.6, changeFreq: 'monthly' },

  // Company / utility
  { path: '/about-us/',              priority: 0.6, changeFreq: 'monthly' },
  { path: '/contact/',               priority: 0.7, changeFreq: 'monthly' },
  { path: '/case-studies/',          priority: 0.7, changeFreq: 'monthly' },
  { path: '/security-directory/',    priority: 0.7, changeFreq: 'weekly'  },
  { path: '/ai-visibility-center/',  priority: 0.7, changeFreq: 'monthly' },
  { path: '/free-tools/',            priority: 0.7, changeFreq: 'monthly' },
  { path: '/career/',                priority: 0.4, changeFreq: 'monthly' },
  { path: '/book-strategy-call/',    priority: 0.6, changeFreq: 'monthly' },

  // Legal
  { path: '/privacy-policy/',        priority: 0.2, changeFreq: 'yearly'  },
  { path: '/terms-of-service/',      priority: 0.2, changeFreq: 'yearly'  },
  { path: '/content-guidelines/',    priority: 0.3, changeFreq: 'yearly'  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return pages.map((p) => ({
    url: `${SITE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFreq,
    priority: p.priority,
  }))
}
