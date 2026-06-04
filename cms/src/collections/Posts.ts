import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { aiVisibilityField } from '../lib/aiVisibilityFields'
import { isLoggedIn } from '../access/isLoggedIn'
import { adminOrAbove } from '../access/isAdmin'
import { isAdminOrAbove } from '../access/roles'

// Posts collection — backs the entire Knowledge Hub.
// Categories map to /knowledge-hub/<category>/ landing pages on the frontend (Phase C).
//
// Draft -> Scheduled -> Published lifecycle.
// Editor can publish their OWN posts; Admin can publish any. Super Admin too.

const CATEGORY_OPTIONS = [
  { label: 'Blog',                       value: 'blog' },
  { label: 'Industry News',              value: 'industry-news' },
  { label: 'Security Guides',            value: 'security-guides' },
  { label: 'Research Reports',           value: 'research-reports' },
  { label: 'Security Industry SEO',      value: 'security-industry-seo' },
  { label: 'Security Trends 2026',       value: 'security-trends-2026' },
]

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Posts' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'author', 'publishedAt'],
    group: 'Content',
    pagination: { defaultLimit: 25 },
  },
  versions: {
    drafts: {
      autosave: { interval: 2000 },
      schedulePublish: true,
    },
    maxPerDoc: 30,
  },
  access: {
    // Read is public for `status: published` records; drafts only visible to logged-in users.
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'published' } }
    },
    create: isLoggedIn,
    update: ({ req: { user }, id, data }) => {
      // Admin+ can update anything.
      if (isAdminOrAbove(user)) return true
      if (!user) return false
      // Editor can update their own drafts/posts.
      return { author: { equals: user.id } }
    },
    delete: adminOrAbove,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 160,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL slug. Lowercase, hyphens only. Auto-suggested from title.' },
      hooks: {
        beforeValidate: [({ value, data }) => {
          // If user didn't set a slug, derive from title.
          if (value && typeof value === 'string') return value
          if (data?.title) {
            return data.title
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
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'blog',
      options: CATEGORY_OPTIONS,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 280,
      admin: { description: 'Short summary used on listing pages + AI overviews.' },
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Hero image at the top of the article + listing thumbnails.' },
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor({}),
      required: true,
      label: 'Body',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: { position: 'sidebar' },
      defaultValue: ({ user }) => user?.id,
    },
    {
      name: 'tags',
      type: 'array',
      labels: { singular: 'Tag', plural: 'Tags' },
      admin: { position: 'sidebar' },
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'readingMinutes',
      type: 'number',
      admin: { position: 'sidebar', description: 'Estimated read time. Auto-calculated on save.' },
    },
    {
      name: 'viewCount',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft',     value: 'draft' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Published', value: 'published' },
        { label: 'Archived',  value: 'archived' },
      ],
      admin: { position: 'sidebar' },
      access: {
        update: ({ req: { user }, data }) => {
          // Editors can ONLY publish their own posts; admin+ can publish anything.
          if (isAdminOrAbove(user)) return true
          if (!user) return false
          // For 'published' status specifically, restrict to own posts via record check.
          // (Payload runs field-level access AFTER collection-level access,
          //  so we trust the collection-level update check above.)
          return true
        },
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Set in the future to schedule. Auto-filled on first publish.',
      },
    },
    aiVisibilityField,
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc, operation }) => {
        // Auto-calculate reading time from rich-text word count.
        if (data.body) {
          const text = JSON.stringify(data.body)
          const words = text.split(/\s+/).length
          data.readingMinutes = Math.max(1, Math.round(words / 200))
        }
        // Auto-fill publishedAt on first publish.
        if (data.status === 'published' && !data.publishedAt && !originalDoc?.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
}
