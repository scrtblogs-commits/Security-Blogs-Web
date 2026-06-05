import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Payload uses React Server Components heavily in v3
    reactCompiler: false,
  },
  // The CMS only serves /admin and /api — there's no public frontend here.
  // The marketing site is a separate Next.js app at the repo root (Phase B
  // will wire it to fetch content from this CMS via the typed client).
  async redirects() {
    return [
      { source: '/', destination: '/admin', permanent: false },
    ]
  },
}

export default withPayload(nextConfig)
