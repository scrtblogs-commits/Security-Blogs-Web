import type { MetadataRoute } from 'next'

// Required so Next.js 15 emits this as a static file under output: 'export'.
// Without it the build errors with: "export const dynamic ... not configured".
export const dynamic = 'force-static'

// Generates /robots.txt at build time. Order matters: '*' rule first so it's
// the default; named bots after make their allow explicit (so a future
// tightening of '*' doesn't accidentally cut them off).
//
// We deliberately do NOT Disallow the 29 legacy redirect-stub paths
// (/aio/, /security-seo-service/, etc.). Each stub has metadata
// robots: { index: false, follow: true } and a <meta http-equiv="refresh"> to
// its new home — Googlebot must be allowed to CRAWL the stub in order to SEE
// the redirect signal and transfer equity to the canonical URL. Disallowing
// in robots.txt would block crawling, so the redirect would never be observed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },

      // AI / answer-engine crawlers — explicit allow.
      // Phase F (seo-final-2026-05) trimmed legacy Anthropic/Perplexity
      // identifiers (Claude-Web, anthropic-ai, Perplexity-User). The active
      // crawlers in 2026 are ClaudeBot and PerplexityBot respectively.
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
    sitemap: 'https://securityblogs.com.au/sitemap.xml',
    host: 'https://securityblogs.com.au',
  }
}
