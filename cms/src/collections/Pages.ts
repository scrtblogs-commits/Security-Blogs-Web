import type { CollectionConfig, Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { aiVisibilityField } from '../lib/aiVisibilityFields'
import { isLoggedIn } from '../access/isLoggedIn'
import { adminOrAbove, onlySuperAdmin } from '../access/isAdmin'

// Pages collection — every editable marketing page (home, about, contact,
// knowledge-hub index, free-tools, ai-visibility-center, book-strategy-call,
// career, security-directory, thank-you, publish-with-us + 7 sub-pages,
// knowledge-hub category landings).
//
// Pages are composed of a hero block + an ordered list of content modules
// (blocks). This lets editors rearrange sections, add new ones, or remove
// them without code edits.

const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'badge', type: 'text', admin: { description: 'Small label above the H1 (e.g. "LIVE · AI VISIBILITY ENGINE").' } },
    { name: 'h1', type: 'text', required: true },
    { name: 'h1Highlight', type: 'text', admin: { description: 'Portion of H1 to render in accent colour.' } },
    { name: 'subtitle', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'ctas',
      type: 'array',
      labels: { singular: 'CTA', plural: 'CTAs' },
      maxRows: 3,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary',  value: 'primary' },
            { label: 'Outline',  value: 'outline' },
            { label: 'Text',     value: 'text' },
          ],
        },
      ],
    },
  ],
}

const CapabilitiesBlock: Block = {
  slug: 'capabilities',
  labels: { singular: 'Capabilities Grid', plural: 'Capabilities Grids' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text', required: true },
    { name: 'sub', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'previewVariant', type: 'text' },
      ],
    },
  ],
}

const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Stats Strip', plural: 'Stats Strips' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        { name: 'num', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'sub', type: 'text' },
      ],
    },
  ],
}

const FaqsBlock: Block = {
  slug: 'faqs',
  labels: { singular: 'FAQ Section', plural: 'FAQ Sections' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text', required: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'q', type: 'text', required: true },
        { name: 'a', type: 'textarea', required: true },
      ],
    },
  ],
}

const CtaBandBlock: Block = {
  slug: 'cta-band',
  labels: { singular: 'CTA Band', plural: 'CTA Bands' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'textarea' },
    { name: 'ctaLabel', type: 'text', required: true },
    { name: 'ctaHref', type: 'text', required: true },
  ],
}

const RichTextBlock: Block = {
  slug: 'rich-text',
  labels: { singular: 'Rich Text', plural: 'Rich Text Blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'body', type: 'richText', editor: lexicalEditor({}), required: true },
  ],
}

const ImageBlock: Block = {
  slug: 'image',
  labels: { singular: 'Image', plural: 'Images' },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text' },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'wide',
      options: [
        { label: 'Narrow (640px)',  value: 'narrow' },
        { label: 'Wide (full content width)', value: 'wide' },
        { label: 'Full bleed (edge to edge)', value: 'full' },
      ],
    },
  ],
}

const ProcessStepsBlock: Block = {
  slug: 'process-steps',
  labels: { singular: 'Process Steps', plural: 'Process Steps' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text', required: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'phase', type: 'text', admin: { description: 'e.g. "Month 1".' } },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}

const ValuesBlock: Block = {
  slug: 'values',
  labels: { singular: 'Values Grid', plural: 'Values Grids' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text', required: true },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'iconToken', type: 'text', admin: { description: 'Emoji token (e.g. "🛡️") — maps to Lucide via <Glyph>.' } },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    group: 'Content',
    pagination: { defaultLimit: 50 },
    listSearchableFields: ['title', 'slug'],
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
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL path (e.g. "about-us", "publish-with-us/advertise"). No leading slash.' },
    },
    {
      name: 'modules',
      type: 'blocks',
      label: 'Page Sections',
      blocks: [
        HeroBlock,
        CapabilitiesBlock,
        StatsBlock,
        FaqsBlock,
        CtaBandBlock,
        RichTextBlock,
        ImageBlock,
        ProcessStepsBlock,
        ValuesBlock,
      ],
    },
    aiVisibilityField,
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
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
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
