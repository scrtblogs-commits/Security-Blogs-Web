import type { Field } from 'payload'

// Reusable AI Visibility field group. Spread into any content collection
// to give editors a tab where they tune how a piece of content is
// engineered to be cited by AI engines.
//
// Lives under a single named group so the storage column stays one
// JSONB-friendly object, and the admin UI shows a single collapsible tab.
//
// Usage in a collection:
//   fields: [
//     ...otherFields,
//     aiVisibilityField,
//   ]

const ENGINE_OPTIONS = [
  { label: 'ChatGPT',        value: 'chatgpt' },
  { label: 'Perplexity',     value: 'perplexity' },
  { label: 'Gemini',         value: 'gemini' },
  { label: 'Claude',         value: 'claude' },
  { label: 'Bing Copilot',   value: 'bing_copilot' },
  { label: 'Google AI Overviews', value: 'google_ai' },
]

const QUERY_TYPE_OPTIONS = [
  { label: 'Informational', value: 'informational' },
  { label: 'Commercial',    value: 'commercial' },
  { label: 'Transactional', value: 'transactional' },
  { label: 'Comparison',    value: 'comparison' },
  { label: 'Navigational',  value: 'navigational' },
]

export const aiVisibilityField: Field = {
  name: 'aiVisibility',
  type: 'group',
  label: 'AI Visibility',
  dbName: 'aiv',
  admin: {
    description:
      'How this piece of content is engineered to be discovered and cited by AI answer engines.',
    position: 'sidebar',
  },
  fields: [
    {
      name: 'entityName',
      type: 'text',
      label: 'Canonical Entity Name',
      admin: { description: 'Brand/entity name AI should associate with this content (e.g. "SecurityBlogs").' },
    },
    {
      name: 'primaryTopic',
      type: 'text',
      label: 'Primary Topic',
      admin: { description: 'One-sentence topic AI uses to categorise the page.' },
    },
    {
      name: 'targetEngines',
      type: 'select',
      label: 'Target AI Engines',
      hasMany: true,
      options: ENGINE_OPTIONS,
      defaultValue: ['chatgpt', 'perplexity', 'gemini', 'claude'],
    },
    {
      name: 'targetQueryTypes',
      type: 'select',
      label: 'Target Query Types',
      hasMany: true,
      options: QUERY_TYPE_OPTIONS,
    },
    {
      name: 'keywordsToWin',
      type: 'array',
      label: 'Keywords to Win',
      labels: { singular: 'Keyword', plural: 'Keywords' },
      fields: [
        { name: 'keyword', type: 'text', required: true },
        {
          name: 'currentPosition',
          type: 'number',
          label: 'Current Position (if tracked)',
          admin: { description: 'Leave blank if unknown.' },
        },
      ],
    },
    {
      name: 'quotedPassages',
      type: 'array',
      label: 'Quoted Passages (engineered to be lifted by AI)',
      labels: { singular: 'Passage', plural: 'Passages' },
      fields: [
        { name: 'passage', type: 'textarea', required: true, admin: { description: 'The exact wording AI overviews should quote.' } },
        { name: 'anchorId', type: 'text', admin: { description: 'Optional id attribute on the matching DOM element so the passage is addressable.' } },
      ],
    },
    {
      name: 'entityRelationships',
      type: 'array',
      label: 'Entity Relationships',
      labels: { singular: 'Relationship', plural: 'Relationships' },
      dbName: 'ent_rels',
      fields: [
        { name: 'relatedEntity', type: 'text', required: true },
        {
          name: 'relationshipType',
          type: 'select',
          dbName: 'rel_type',
          options: [
            { label: 'Publishes',    value: 'publishes' },
            { label: 'Authored by',  value: 'authored_by' },
            { label: 'About',        value: 'about' },
            { label: 'Cites',        value: 'cites' },
            { label: 'Part of',      value: 'part_of' },
            { label: 'Same as',      value: 'same_as' },
          ],
        },
      ],
    },
    {
      name: 'competingUrls',
      type: 'array',
      label: 'Competing URLs',
      labels: { singular: 'URL', plural: 'URLs' },
      fields: [{ name: 'url', type: 'text', required: true }],
    },
    {
      name: 'lastAuditAt',
      type: 'date',
      label: 'Last AI Visibility Audit',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'auditResults',
      type: 'array',
      label: 'Audit Results',
      labels: { singular: 'Result', plural: 'Results' },
      dbName: 'audits',
      fields: [
        { name: 'platform', type: 'select', dbName: 'pf', options: ENGINE_OPTIONS, required: true },
        { name: 'cited', type: 'checkbox', defaultValue: false },
        { name: 'position', type: 'number', admin: { description: 'Position within the AI answer if cited (1 = primary citation).' } },
        { name: 'snapshotUrl', type: 'text', label: 'Snapshot URL', admin: { description: 'Archive.org or screenshot URL.' } },
        { name: 'checkedAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
      ],
    },
    // SEO overrides — included here so AI visibility and traditional SEO live
    // in one tab. The traditional SEO/og tags also remain on the parent
    // collection for backwards compatibility.
    {
      name: 'seoTitleOverride',
      type: 'text',
      label: 'SEO Title Override',
      admin: { description: 'Override <title>. Leave blank to use the document title.' },
    },
    {
      name: 'seoDescriptionOverride',
      type: 'textarea',
      label: 'SEO Description Override',
      admin: { description: 'Override <meta description>.' },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'OpenGraph Image Override',
    },
    {
      name: 'schemaOverrides',
      type: 'json',
      label: 'JSON-LD Schema Overrides',
      admin: { description: 'Advanced: arbitrary additions/overrides to the JSON-LD this page emits.' },
    },
  ],
}
