import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { aiVisibilityField } from '../lib/aiVisibilityFields'
import { isLoggedIn } from '../access/isLoggedIn'
import { adminOrAbove, onlySuperAdmin } from '../access/isAdmin'

// Services collection — the 7 service offerings powering /services/* on the
// marketing site. Each row drives both the catalogue card on /services/ and
// the detail page at /services/<slug>/.
//
// The capabilities, processSteps, stats, and faqs arrays mirror the
// hard-coded TSX arrays that exist today (see app/services/<slug>/page.tsx
// and app/services/<slug>/<Slug>Capabilities.tsx). Phase B's seed script
// imports them 1:1.
export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'sortOrder'],
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
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'title',      type: 'text', required: true },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              admin: { description: 'URL slug — must match /services/<slug>/ on the marketing site.' },
            },
            {
              name: 'shortDesc',
              type: 'textarea',
              required: true,
              maxLength: 200,
              admin: { description: 'One-line catalogue description.' },
            },
            {
              name: 'intro',
              type: 'textarea',
              admin: { description: 'Hero lead paragraph on the service detail page.' },
            },
            {
              name: 'heroBadge',
              type: 'text',
              admin: { description: 'e.g. "AI OPTIMISATION" — the small chip above the H1.' },
            },
            {
              name: 'accentColor',
              type: 'text',
              defaultValue: '#1e5fe0',
              admin: { description: 'Hex colour for the brand chip + accent text. Default: brand blue.' },
            },
            {
              name: 'cover',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Hero image / og:image for the service.' },
            },
          ],
        },
        {
          label: 'Capabilities',
          fields: [
            {
              name: 'capabilities',
              type: 'array',
              label: 'Capabilities (live preview cards)',
              minRows: 1,
              labels: { singular: 'Capability', plural: 'Capabilities' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                {
                  name: 'previewVariant',
                  type: 'select',
                  admin: { description: 'Which themed live preview component renders on this card.' },
                  options: [
                    { label: 'Schema markup',         value: 'schema' },
                    { label: 'Semantic network',     value: 'semantic' },
                    { label: 'Structured data',      value: 'structured-data' },
                    { label: 'Signal strength',      value: 'signal-meters' },
                    { label: 'Publish cadence',      value: 'freshness' },
                    { label: 'Citations',            value: 'citations' },
                    { label: 'Answer box',           value: 'answer-box' },
                    { label: 'Featured snippet',     value: 'featured-snippet' },
                    { label: 'FAQ schema',           value: 'faq-schema' },
                    { label: 'Voice search',         value: 'voice' },
                    { label: 'AI overview',          value: 'ai-overview' },
                    { label: 'E-E-A-T signals',      value: 'eeat' },
                    { label: 'On-page SEO',          value: 'on-page' },
                    { label: 'Technical SEO',        value: 'technical-seo' },
                    { label: 'Local SEO',            value: 'local-seo' },
                    { label: 'Content cluster',     value: 'content-cluster' },
                    { label: 'Backlinks',            value: 'backlinks' },
                    { label: 'Rank tracking',        value: 'rank-tracking' },
                    { label: 'Keywords',             value: 'keywords' },
                    { label: 'Geo-targeting',        value: 'geo-target' },
                    { label: 'Budget allocation',    value: 'bid' },
                    { label: 'Conversion funnel',    value: 'funnel' },
                    { label: 'Remarketing',          value: 'remarketing' },
                    { label: 'Auction insights',     value: 'auction' },
                    { label: 'LinkedIn targeting',   value: 'linkedin' },
                    { label: 'CPC comparison',       value: 'cpc' },
                    { label: 'B2B audience donut',   value: 'b2b' },
                    { label: 'Clarity heatmap',      value: 'clarity' },
                    { label: 'Journey funnel',       value: 'journey' },
                    { label: 'Browser mock',         value: 'browser' },
                    { label: 'WP editor mock',       value: 'wp-editor' },
                    { label: 'Core Web Vitals',      value: 'cwv' },
                    { label: 'Uptime',               value: 'uptime' },
                    { label: 'Schema graph',         value: 'schema-graph' },
                    { label: 'Before/after',         value: 'before-after' },
                    { label: 'Entity card',          value: 'entity-card' },
                    { label: 'Knowledge panel',     value: 'knowledge-panel' },
                    { label: 'Signal distribution', value: 'signal-distribution' },
                    { label: 'Cross-platform',       value: 'cross-platform' },
                    { label: 'NAP consistency',      value: 'nap' },
                    { label: 'AI confirmation',      value: 'confirmation' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Process',
          fields: [
            {
              name: 'processSteps',
              type: 'array',
              label: 'How-it-works Steps',
              labels: { singular: 'Step', plural: 'Steps' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                { name: 'previewVariant', type: 'text', admin: { description: 'Optional themed visual for this step (see Capabilities for options).' } },
              ],
            },
          ],
        },
        {
          label: 'Stats & Results',
          fields: [
            {
              name: 'stats',
              type: 'array',
              labels: { singular: 'Stat', plural: 'Stats' },
              fields: [
                { name: 'num', type: 'text', required: true, admin: { description: 'Display value, e.g. "87%" or "3.2×".' } },
                { name: 'label', type: 'text', required: true },
                { name: 'sub', type: 'text', admin: { description: 'Optional sub-line, e.g. "+62% vs baseline".' } },
                {
                  name: 'trend',
                  type: 'select',
                  defaultValue: 'flat',
                  options: [
                    { label: 'Up',   value: 'up' },
                    { label: 'Flat', value: 'flat' },
                    { label: 'Down', value: 'down' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'FAQs',
          fields: [
            {
              name: 'faqs',
              type: 'array',
              labels: { singular: 'FAQ', plural: 'FAQs' },
              fields: [
                { name: 'q', type: 'text', required: true },
                { name: 'a', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Benefits',
          fields: [
            {
              name: 'benefits',
              type: 'array',
              labels: { singular: 'Benefit', plural: 'Benefits' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
            {
              name: 'statChip',
              type: 'text',
              admin: { description: 'Single chip shown on the /services/ catalogue card (e.g. "+180% organic traffic").' },
            },
          ],
        },
      ],
    },
    aiVisibilityField,
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'published',
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
      admin: { position: 'sidebar', description: 'Lower number = earlier in the catalogue.' },
    },
  ],
}
