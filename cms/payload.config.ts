import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { Users }    from './src/collections/Users'
import { Media }    from './src/collections/Media'
import { Posts }    from './src/collections/Posts'
import { Leads }    from './src/collections/Leads'

import { emailAdapter } from './src/email/transport'

// ────────────────────────────────────────────────────────────────────
// SecurityBlogs CMS — central Payload configuration
//
// This file is the single source of truth for:
//   • database connection
//   • authentication (Users collection)
//   • collections registered with Payload
//   • admin UI configuration
//   • email transport
//   • rich-text editor defaults
//
// PHASE A scope: Users, Media, Posts (blog), Leads (CRM).
// Later phases (B onward) will register Pages, Services, CaseStudies,
// Glossary, Jobs, Directory, LegalPages, Settings, Redirects, AuditLog.
// ────────────────────────────────────────────────────────────────────

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3001',
  secret: process.env.PAYLOAD_SECRET ?? 'replace-me-in-production',

  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' · SecurityBlogs CMS',
    },
    // Default landing screen when a user logs in.
    components: {
      // (Custom dashboard widgets land here in later phases.)
    },
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? 'postgres://securityblogs:securityblogs@localhost:5432/securityblogs',
    },
    push: process.env.NODE_ENV !== 'production',
  }),

  // Default rich-text editor for all `richText` fields unless overridden.
  editor: lexicalEditor({}),

  // Order in this array == order in the admin sidebar.
  collections: [
    Users,
    Media,
    Posts,
    Leads,
  ],

  email: emailAdapter,

  // TypeScript types output — regenerate with `pnpm generate:types`.
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },

  // GraphQL schema output (optional — used by the typed frontend client).
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'src/payload-schema.graphql'),
  },

  // CORS: restrict to the marketing frontend (Phase C) + local dev origins.
  cors: [
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3001',
  ].filter(Boolean),

  // CSRF protection — same origins as CORS.
  csrf: [
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3001',
  ].filter(Boolean),

  // Auto-run migrations on boot in dev only; production uses explicit
  // `pnpm payload migrate` invocations.
  ...(process.env.NODE_ENV !== 'production'
    ? { onInit: async (payload) => { payload.logger.info('CMS booted (dev) — admin at /admin') } }
    : {}),
})
