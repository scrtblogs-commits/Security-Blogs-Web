// GraphQL endpoint (POST). The Phase C typed frontend client can use
// either REST or GraphQL — we ship both because Payload supports both
// for free.
import { GRAPHQL_POST } from '@payloadcms/next/routes'
import config from '@payload-config'

export const POST = GRAPHQL_POST(config)
