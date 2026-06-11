/** @type {import('next').NextConfig} */
//
// Phase C — Frontend Rewire
//
// The static-export config (output: 'export') has been retired in favour
// of Next.js server rendering with ISR. This is required so the
// marketing site can fetch live content from the Payload CMS and serve
// the dynamic /services/[slug], /case-studies/[slug] and
// /knowledge-hub/[category]/[slug] routes.
//
// Until Phase D (production cut-over to the Hostinger VPS), this branch
// is NOT deployable to the existing LiteSpeed static host — the old
// tar-and-extract pipeline expects an `out/` directory which Next.js no
// longer produces. Production continues to serve the last static build
// committed before this branch was cut.
//
// The previous static-export config is preserved in git history at the
// tip of `phase-b-content-migration` for emergency rollback.
//
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: 'http',  hostname: 'localhost' },
      { protocol: 'https', hostname: 'cms.securityblogs.com.au' },
      { protocol: 'https', hostname: 'securityblogs.com.au' },
    ],
  },

  // Surface the canonical site URL to the bundle for absolute-link
  // generation (sitemap, llms.txt, og:url). Server-side fetches use the
  // unprefixed CMS_URL which can point at an internal Docker hostname.
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://securityblogs.com.au',
  },
}

export default nextConfig
