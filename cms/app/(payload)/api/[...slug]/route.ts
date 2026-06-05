// Catch-all REST API route — Payload exposes its full REST surface here.
// GET/POST/PATCH/DELETE on /api/<collection>/* land in this handler.
//
// Public endpoints used by the marketing frontend (Phase C+):
//   POST /api/leads        — create a lead from a form submission
//   GET  /api/posts        — list published posts
//   GET  /api/posts/<id>   — fetch a single post
//
// Authenticated endpoints (require admin login):
//   everything else.

import config from '@payload-config'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'

export const GET     = REST_GET(config)
export const POST    = REST_POST(config)
export const PATCH   = REST_PATCH(config)
export const PUT     = REST_PUT(config)
export const DELETE  = REST_DELETE(config)
export const OPTIONS = REST_OPTIONS(config)
