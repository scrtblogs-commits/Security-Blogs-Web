// GraphQL Playground UI at /api/graphql-playground (dev only — Payload
// gates it behind a config flag in production).
import { GRAPHQL_PLAYGROUND_GET } from '@payloadcms/next/routes'
import config from '@payload-config'

export const GET = GRAPHQL_PLAYGROUND_GET(config)
