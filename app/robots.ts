import type { MetadataRoute } from 'next'
import { getSettings } from '@/lib/cms'

// ─────────────────────────────────────────────────────────────────────
// /robots.txt — generated at request time so a sitewide maintenance-
// mode flag in the CMS can disallow indexing on demand.
//
// Order of rules matters:
//   1. '*' first — the default rule.
//   2. Named bots after — their allow stays explicit, so a future
//      tightening of '*' doesn't accidentally cut them off.
//
// We deliberately do NOT Disallow the 29 legacy redirect-stub paths
// (/aio/, /security-seo-service/, etc.) — each has
// robots: { index: false, follow: true } and a 301 to its canonical
// home. Googlebot must be allowed to CRAWL the stub to OBSERVE the
// redirect and transfer equity. Blocking in robots.txt would prevent
// the redirect signal from ever being seen.
// ─────────────────────────────────────────────────────────────────────

export const revalidate = 600

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://securityblogs.com.au'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings()
  const maintenance = settings?.maintenance?.enabled === true

  if (maintenance) {
    // Hard block everyone while maintenance mode is on.
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
      sitemap: `${SITE}/sitemap.xml`,
      host: SITE,
    }
  }

  return {
    rules: [
      { userAgent: '*', allow: '/' },

      // AI / answer-engine crawlers — explicit allow.
      { userAgent: 'GPTBot',              allow: '/' },
      { userAgent: 'ChatGPT-User',        allow: '/' },
      { userAgent: 'OAI-SearchBot',       allow: '/' },
      { userAgent: 'ClaudeBot',           allow: '/' },
      { userAgent: 'PerplexityBot',       allow: '/' },
      { userAgent: 'Google-Extended',     allow: '/' },
      { userAgent: 'Applebot-Extended',   allow: '/' },
      { userAgent: 'Amazonbot',           allow: '/' },
      { userAgent: 'Meta-ExternalAgent',  allow: '/' },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
