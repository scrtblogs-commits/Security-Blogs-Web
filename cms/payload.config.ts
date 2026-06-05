import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { Users }       from './src/collections/Users'
import { Media }       from './src/collections/Media'
import { Posts }       from './src/collections/Posts'
import { Leads }       from './src/collections/Leads'
import { Services }    from './src/collections/Services'
import { CaseStudies } from './src/collections/CaseStudies'
import { Partners }    from './src/collections/Partners'
import { Pages }       from './src/collections/Pages'
import { Redirects }   from './src/collections/Redirects'

import { Settings }    from './src/globals/Settings'

import { emailAdapter } from './src/email/transport'

// ────────────────────────────────────────────────────────────────────
// SecurityBlogs CMS — central Payload configuration
//
// Single source of truth for:
//   • database connection
//   • authentication (Users collection)
//   • collections + globals
//   • admin UI configuration
//   • email transport
//   • rich-text editor defaults
//
// Phases registered so far:
//   PHASE A: Users, Media, Posts, Leads
//   PHASE B: Services, CaseStudies, Partners, Pages, Redirects + Settings global
// ────────────────────────────────────────────────────────────────────

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3001',
  secret: process.env.PAYLOAD_SECRET ?? 'replace-me-in-production',

  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' · SecurityBlogs CMS' },
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

  editor: lexicalEditor({}),

  // Order in this array == order in the admin sidebar.
  collections: [
    Users,
    Media,
    Pages,
    Services,
    CaseStudies,
    Partners,
    Posts,
    Leads,
    Redirects,
  ],

  globals: [
    Settings,
  ],

  email: emailAdapter,

  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },

  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'src/payload-schema.graphql'),
  },

  cors: [
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3001',
  ].filter(Boolean),

  csrf: [
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3001',
  ].filter(Boolean),

  ...(process.env.NODE_ENV !== 'production'
    ? { onInit: async (payload) => { payload.logger.info('CMS booted (dev) — admin at /admin') } }
    : {}),
})
