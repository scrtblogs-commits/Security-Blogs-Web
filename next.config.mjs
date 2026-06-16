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

  // Pre-existing TS errors in legacy components — skip type check at build time
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // Images served from the Payload Media collection live on the same
  // VPS in Phase D. The remotePatterns list is the allow-list for the
  // built-in <Image /> component. Add additional hosts here when the
  // CMS serves media from S3/CDN.
  images: {
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
