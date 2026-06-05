import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { aiVisibilityField } from '../lib/aiVisibilityFields'
import { isLoggedIn } from '../access/isLoggedIn'
import { adminOrAbove } from '../access/isAdmin'
import { onlySuperAdmin } from '../access/isAdmin'

// Partners collection — clients, partners, integrators, and vendor relationships.
// Drives /security-directory/ + appears as logos / case-study attributions
// on the marketing site once Phase C rewires the frontend.
//
// Distinct from Case Studies: a partner is a *relationship*; a case study is
// a *narrative outcome with that partner*. They can be linked via the
// `caseStudy` and `services` relations.

const TYPE_OPTIONS = [
  { label: 'Client',      value: 'client' },
  { label: 'Partner',     value: 'partner' },
  { label: 'Integrator',  value: 'integrator' },
  { label: 'Vendor',      value: 'vendor' },
  { label: 'Community',   value: 'community' },
]

const REGION_OPTIONS = [
  { label: 'Australia',  value: 'AU' },
  { label: 'USA',        value: 'US' },
  { label: 'UK',         value: 'GB' },
  { label: 'UAE',        value: 'AE' },
  { label: 'Singapore',  value: 'SG' },
  { label: 'Other',      value: 'other' },
]

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: { singular: 'Partner', plural: 'Partners' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'region', 'isFeatured', 'status', 'sortOrder'],
    group: 'Content',
    pagination: { defaultLimit: 50 },
    listSearchableFields: ['name', 'summary'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'active' } }
    },
    create: isLoggedIn,
    update: adminOrAbove,
    delete: onlySuperAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL-safe identifier. Lowercase + hyphens.' },
      hooks: {
        beforeValidate: [({ value, data }) => {
          if (value && typeof value === 'string') return value
          if (data?.name) {
            return data.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '')
              .slice(0, 80)
          }
          return value
        }],
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'client',
      options: TYPE_OPTIONS,
    },
    {
      name: 'region',
      type: 'select',
      defaultValue: 'AU',
      options: REGION_OPTIONS,
    },
    {
      name: 'summary',
      type: 'textarea',
      maxLength: 280,
      admin: { description: 'Short blurb shown on listings + the directory page.' },
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor({}),
      label: 'Long-form description',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Square logo, transparent background preferred.' },
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional cover image used on the partner detail page.' },
    },
    {
      name: 'website',
      type: 'text',
      admin: { description: 'Partner website URL.' },
    },
    {
      name: 'contactEmail',
      type: 'email',
      admin: { description: 'Optional primary contact email (kept private — not rendered publicly).' },
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: { description: 'Which of our service lines this partner uses (or delivers).' },
    },
    {
      name: 'caseStudy',
      type: 'relationship',
      relationTo: 'case-studies',
      admin: { description: 'Featured case study for this partner, if any.' },
    },
    {
      name: 'tags',
      type: 'array',
      labels: { singular: 'Tag', plural: 'Tags' },
      admin: { position: 'sidebar' },
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured partners surface on the homepage + directory hero.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 100,
      admin: { position: 'sidebar', description: 'Lower number = higher on the directory.' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active',    value: 'active' },
        { label: 'Inactive',  value: 'inactive' },
        { label: 'Archived',  value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
    aiVisibilityField,
  ],
}
