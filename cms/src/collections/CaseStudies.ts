import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { aiVisibilityField } from '../lib/aiVisibilityFields'
import { isLoggedIn } from '../access/isLoggedIn'
import { adminOrAbove, onlySuperAdmin } from '../access/isAdmin'

// CaseStudies collection — narratives showing client outcomes.
// Drives /case-studies/ index + /case-studies/<slug>/ detail (Phase C).
//
// Linked to:
//   • Partners (the client this is about)
//   • Services (what we did)
export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Case Study', plural: 'Case Studies' },
  admin: {
    useAsTitle: 'headline',
    defaultColumns: ['headline', 'clientName', 'service', 'status', 'sortOrder'],
    group: 'Content',
    pagination: { defaultLimit: 25 },
    listSearchableFields: ['clientName', 'headline', 'summary'],
  },
  versions: {
    drafts: {
      autosave: { interval: 2000 },
      schedulePublish: true,
    },
    maxPerDoc: 30,
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'published' } }
    },
    create: isLoggedIn,
    update: adminOrAbove,
    delete: onlySuperAdmin,
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      admin: { description: 'Marketing-friendly title — e.g. "ShieldTech Security — Full Service".' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [({ value, data }) => {
          if (value && typeof value === 'string') return value
          if (data?.headline) {
            return data.headline
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
      name: 'clientName',
      type: 'text',
      required: true,
      admin: { description: 'Client name shown on the card.' },
    },
    {
      name: 'partner',
      type: 'relationship',
      relationTo: 'partners',
      admin: { description: 'Optional link to the Partner record for this client.' },
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      admin: { description: 'Which service line delivered this outcome.' },
    },
    {
      name: 'clientLogo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Hero image at the top of the case-study detail page.' },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 280,
      admin: { description: 'One-paragraph summary used on the /case-studies/ index card.' },
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor({}),
      admin: { description: 'Full case-study narrative — challenge, approach, outcome.' },
    },
    {
      name: 'results',
      type: 'array',
      labels: { singular: 'Result Metric', plural: 'Results' },
      admin: { description: 'Headline metrics shown as stat tiles on the case-study page.' },
      fields: [
        { name: 'metric', type: 'text', required: true, admin: { description: 'e.g. "Organic traffic".' } },
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g. "+340%".' } },
        { name: 'note', type: 'text', admin: { description: 'Optional sub-line context.' } },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      labels: { singular: 'Tag', plural: 'Tags' },
      admin: { position: 'sidebar' },
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft',     value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived',  value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 100,
      admin: { position: 'sidebar', description: 'Lower number = earlier in the case-studies grid.' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    aiVisibilityField,
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        if (data.status === 'published' && !data.publishedAt && !originalDoc?.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
}
