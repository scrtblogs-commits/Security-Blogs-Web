import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '../access/isLoggedIn'
import { adminOrAbove, onlySuperAdmin } from '../access/isAdmin'

// Redirects collection — editable 301/302 rules consumed by the Next.js
// middleware in Phase C. Replaces the bulk of the static .htaccess rules
// (the static-export Apache rules stay in place as a fallback until the
// VPS cut-over in Phase D).
export const Redirects: CollectionConfig = {
  slug: 'redirects',
  labels: { singular: 'Redirect', plural: 'Redirects' },
  admin: {
    useAsTitle: 'fromPath',
    defaultColumns: ['fromPath', 'toPath', 'statusCode', 'hitCount', 'isActive'],
    group: 'System',
    pagination: { defaultLimit: 50 },
    listSearchableFields: ['fromPath', 'toPath', 'note'],
  },
  access: {
    read: () => true,                       // public — needed by the runtime middleware
    create: adminOrAbove,
    update: adminOrAbove,
    delete: onlySuperAdmin,
  },
  fields: [
    {
      name: 'fromPath',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Path or regex to match (e.g. "/aio/" or "^/blog/(.+)$"). Must start with a slash.',
      },
    },
    {
      name: 'toPath',
      type: 'text',
      required: true,
      admin: {
        description: 'Destination path. Use $1 / $2 backreferences for regex captures.',
      },
    },
    {
      name: 'statusCode',
      type: 'select',
      required: true,
      defaultValue: '301',
      options: [
        { label: '301 — Moved Permanently', value: '301' },
        { label: '302 — Found',              value: '302' },
        { label: '307 — Temporary Redirect', value: '307' },
        { label: '308 — Permanent Redirect', value: '308' },
      ],
    },
    {
      name: 'isRegex',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Tick if `fromPath` is a regular expression rather than a literal path.' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'hitCount',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true, position: 'sidebar', description: 'Auto-incremented by the redirect middleware.' },
    },
    {
      name: 'lastHitAt',
      type: 'date',
      admin: { readOnly: true, position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'note',
      type: 'textarea',
      admin: { description: 'Why this redirect exists. Helps future-you remember.' },
    },
  ],
}
