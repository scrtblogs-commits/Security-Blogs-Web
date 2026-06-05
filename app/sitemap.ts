import type { MetadataRoute } from 'next'
import { getCaseStudies, getPages, getPosts, getServices } from '@/lib/cms'

// ─────────────────────────────────────────────────────────────────────
// /sitemap.xml — generated dynamically from the CMS.
//
// Replaces the previous hand-coded static sitemap. Sources merged:
//   1. A small list of hand-built routes (knowledge-hub category
//      landings, free-tools sub-pages, legal pages) that don't yet
//      have a CMS Page record. Each is removed as it migrates to the
//      CMS in Phase C.2.
//   2. Every published CMS Service.
//   3. Every published CMS Case Study.
//   4. Every published CMS Post (across all 6 categories).
//   5. Every published CMS Page whose slug isn't already in (1).
//
// 29 legacy redirect stubs (/aio/, /security-seo-service/, etc.) stay
// excluded — they're robots: { index: false, follow: true } and exist
// only to soft-301 to a target listed above.
//
// ISR revalidates every 600s (10min) so a freshly published post
// surfaces in a reasonable window without thrashing the CMS.
// ─────────────────────────────────────────────────────────────────────

export const revalidate = 600

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://securityblogs.com.au'

type ChangeFreq = MetadataRoute.Sitemap[number]['changeFrequency']
type Entry = { path: string; priority: number; changeFrequency: ChangeFreq }

// Pre-CMS routes still served by hand-built page.tsx files.
const HAND_BUILT: Entry[] = [
  { path: '/',                                       priority: 1.0, changeFrequency: 'weekly'  },
  { path: '/services/',                              priority: 0.9, changeFrequency: 'monthly' },
  { path: '/case-studies/',                          priority: 0.8, changeFrequency: 'weekly'  },
  { path: '/about-us/',                              priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact/',                               priority: 0.7, changeFrequency: 'monthly' },
  { path: '/career/',                                priority: 0.5, changeFrequency: 'monthly' },
  { path: '/ai-visibility-center/',                  priority: 0.8, changeFrequency: 'weekly'  },
  { path: '/book-strategy-call/',                    priority: 0.7, changeFrequency: 'monthly' },
  { path: '/free-tools/',                            priority: 0.7, changeFrequency: 'weekly'  },
  { path: '/security-directory/',                    priority: 0.7, changeFrequency: 'weekly'  },
  { path: '/privacy-policy/',                        priority: 0.3, changeFrequency: 'yearly'  },
  { path: '/content-guidelines/',                    priority: 0.3, changeFrequency: 'yearly'  },
  { path: '/knowledge-hub/',                         priority: 0.8, changeFrequency: 'weekly'  },
  { path: '/knowledge-hub/blogs/',                   priority: 0.8, changeFrequency: 'weekly'  },
  { path: '/knowledge-hub/industry-news/',           priority: 0.8, changeFrequency: 'weekly'  },
  { path: '/knowledge-hub/security-guides/',         priority: 0.8, changeFrequency: 'weekly'  },
  { path: '/knowledge-hub/security-industry-seo/',   priority: 0.8, changeFrequency: 'weekly'  },
  { path: '/knowledge-hub/security-trends-2026/',    priority: 0.8, changeFrequency: 'weekly'  },
  { path: '/knowledge-hub/research-reports/',        priority: 0.7, changeFrequency: 'monthly' },
  { path: '/knowledge-hub/definitions-glossary/',    priority: 0.6, changeFrequency: 'monthly' },
  { path: '/publish-with-us/',                       priority: 0.6, changeFrequency: 'monthly' },
  { path: '/publish-with-us/guest-posting/',         priority: 0.6, changeFrequency: 'monthly' },
  { path: '/publish-with-us/sponsored-posts/',       priority: 0.6, changeFrequency: 'monthly' },
  { path: '/publish-with-us/product-promotion/',     priority: 0.6, changeFrequency: 'monthly' },
  { path: '/publish-with-us/press-release/',         priority: 0.6, changeFrequency: 'monthly' },
  { path: '/publish-with-us/backlink-packages/',     priority: 0.6, changeFrequency: 'monthly' },
  { path: '/publish-with-us/pricing-guidelines/',    priority: 0.5, changeFrequency: 'monthly' },
  { path: '/publish-with-us/advertise/',             priority: 0.6, changeFrequency: 'monthly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const out: MetadataRoute.Sitemap = []

  // 1. Hand-built routes.
  for (const e of HAND_BUILT) {
    out.push({ url: `${SITE}${e.path}`, lastModified: now, changeFrequency: e.changeFrequency, priority: e.priority })
  }

  // 2. CMS Services.
  for (const s of await getServices()) {
    out.push({
      url: `${SITE}/services/${s.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    })
  }

  // 3. CMS Case Studies.
  for (const cs of await getCaseStudies()) {
    out.push({
      url: `${SITE}/case-studies/${cs.slug}/`,
      lastModified: cs.publishedAt ? new Date(cs.publishedAt) : now,
      changeFrequency: 'monthly',
      priority: 0.75,
    })
  }

  // 4. CMS Posts across all categories.
  for (const p of await getPosts({ limit: 500 })) {
    out.push({
      url: `${SITE}/knowledge-hub/${p.category}/${p.slug}/`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  // 5. CMS Pages whose slug isn't already in HAND_BUILT.
  const known = new Set(HAND_BUILT.map((p) => p.path.replace(/^\/|\/$/g, '')))
  for (const pg of await getPages()) {
    if (known.has(pg.slug)) continue
    out.push({
      url: `${SITE}/${pg.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  return out
}
