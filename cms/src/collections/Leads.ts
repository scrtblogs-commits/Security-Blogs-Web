import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '../access/isLoggedIn'
import { adminOrAbove } from '../access/isAdmin'
import { isAdminOrAbove } from '../access/roles'

// Leads collection — the CRM-style replacement for Web3Forms submissions.
// Every public form on the frontend (contact, career, guest-post,
// visibility-challenge, visibility-checker) POSTs to /api/submit, which
// inserts a row here.
//
// Editors can READ leads (read-only view). Admin+ can update/assign/close.
// Super Admin can delete.

const SOURCE_OPTIONS = [
  { label: 'Contact Form',           value: 'contact-form' },
  { label: 'Career Application',     value: 'career' },
  { label: 'Guest Post Submission',  value: 'guest-post' },
  { label: 'Visibility Challenge',   value: 'visibility-challenge' },
  { label: 'Visibility Checker',     value: 'visibility-checker' },
  { label: 'Manual Entry',           value: 'manual' },
  { label: 'Other',                  value: 'other' },
]

const STATUS_OPTIONS = [
  { label: 'New',            value: 'new' },
  { label: 'Contacted',      value: 'contacted' },
  { label: 'Qualified',      value: 'qualified' },
  { label: 'Proposal Sent',  value: 'proposal_sent' },
  { label: 'Nurturing',      value: 'nurturing' },
  { label: 'Won',            value: 'won' },
  { label: 'Lost',           value: 'lost' },
  { label: 'Spam',           value: 'spam' },
]

const LIFECYCLE_OPTIONS = [
  { label: 'Subscriber',           value: 'subscriber' },
  { label: 'Lead',                 value: 'lead' },
  { label: 'Marketing Qualified',  value: 'mql' },
  { label: 'Sales Qualified',      value: 'sql' },
  { label: 'Customer',             value: 'customer' },
  { label: 'Evangelist',           value: 'evangelist' },
]

const PRIORITY_OPTIONS = [
  { label: 'Low',     value: 'low' },
  { label: 'Normal',  value: 'normal' },
  { label: 'High',    value: 'high' },
  { label: 'Urgent',  value: 'urgent' },
]

const TIMELINE_TYPE_OPTIONS = [
  { label: 'Status changed', value: 'status_change' },
  { label: 'Note',           value: 'note' },
  { label: 'Email sent',     value: 'email_sent' },
  { label: 'Email received', value: 'email_received' },
  { label: 'Call logged',    value: 'call' },
  { label: 'Meeting',        value: 'meeting' },
  { label: 'Assignment',     value: 'assignment' },
]

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Lead', plural: 'Leads' },
  admin: {
    useAsTitle: 'displayTitle',
    defaultColumns: ['displayTitle', 'source', 'status', 'priority', 'assignedTo', 'createdAt'],
    group: 'Lead Management',
    pagination: { defaultLimit: 25 },
    listSearchableFields: ['name', 'email', 'company', 'subject', 'message'],
  },
  access: {
    read: isLoggedIn, // editors can see leads (read-only)
    create: isLoggedIn,
    update: adminOrAbove,
    delete: ({ req: { user } }) => user?.role === 'super_admin',
  },
  fields: [
    // ─── Top-level identifier (computed for admin list view) ─────────────
    {
      name: 'displayTitle',
      type: 'text',
      admin: { hidden: true },
      hooks: {
        beforeChange: [({ data }) => {
          const name = data.name || data.email || 'Unknown'
          const subject = data.subject || data.source || 'lead'
          return `${name} · ${subject}`
        }],
      },
    },

    // ─── Source + intake metadata ────────────────────────────────────────
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact & Message',
          fields: [
            { name: 'name',    type: 'text' },
            { name: 'email',   type: 'email' },
            { name: 'phone',   type: 'text' },
            { name: 'company', type: 'text' },
            { name: 'subject', type: 'text' },
            { name: 'message', type: 'textarea' },
            {
              name: 'extras',
              type: 'json',
              label: 'Extra Form Fields',
              admin: { description: 'Source-form-specific data — keep for audit.' },
            },
          ],
        },
        {
          label: 'Pipeline',
          fields: [
            {
              name: 'status',
              type: 'select',
              required: true,
              defaultValue: 'new',
              options: STATUS_OPTIONS,
            },
            {
              name: 'lifecycleStage',
              type: 'select',
              defaultValue: 'lead',
              options: LIFECYCLE_OPTIONS,
            },
            {
              name: 'priority',
              type: 'select',
              defaultValue: 'normal',
              options: PRIORITY_OPTIONS,
            },
            {
              name: 'assignedTo',
              type: 'relationship',
              relationTo: 'users',
              admin: { description: 'Who owns this lead. Email notification sent on assignment.' },
            },
            {
              name: 'valueEstimate',
              type: 'number',
              label: 'Estimated Value (AUD)',
              min: 0,
            },
            {
              name: 'nextActionAt',
              type: 'date',
              label: 'Follow-up Due',
              admin: { date: { pickerAppearance: 'dayAndTime' } },
            },
            {
              name: 'nextActionNote',
              type: 'text',
              label: 'Next Action',
            },
            {
              name: 'tags',
              type: 'array',
              labels: { singular: 'Tag', plural: 'Tags' },
              fields: [{ name: 'tag', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Timeline',
          fields: [
            {
              name: 'timeline',
              type: 'array',
              labels: { singular: 'Event', plural: 'Events' },
              admin: { description: 'Chronological log of every interaction with this lead.' },
              fields: [
                {
                  name: 'at',
                  type: 'date',
                  required: true,
                  defaultValue: () => new Date().toISOString(),
                  admin: { date: { pickerAppearance: 'dayAndTime' } },
                },
                {
                  name: 'byUser',
                  type: 'relationship',
                  relationTo: 'users',
                },
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  defaultValue: 'note',
                  options: TIMELINE_TYPE_OPTIONS,
                },
                { name: 'note', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Closure',
          fields: [
            { name: 'wonAt',      type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
            { name: 'wonValue',   type: 'number', label: 'Won Value (AUD)' },
            { name: 'lostAt',     type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
            { name: 'lostReason', type: 'select', options: [
              { label: 'No response',        value: 'no_response' },
              { label: 'Price',              value: 'price' },
              { label: 'Timing',             value: 'timing' },
              { label: 'Went with competitor', value: 'competitor' },
              { label: 'Out of scope',       value: 'out_of_scope' },
              { label: 'Not a fit',          value: 'not_a_fit' },
              { label: 'Other',              value: 'other' },
            ] },
            { name: 'lostNotes',  type: 'textarea' },
          ],
        },
        {
          label: 'Forensic',
          fields: [
            {
              name: 'source',
              type: 'select',
              required: true,
              defaultValue: 'contact-form',
              options: SOURCE_OPTIONS,
              admin: { readOnly: true },
            },
            { name: 'ip',             type: 'text', admin: { readOnly: true } },
            { name: 'userAgent',      type: 'text', admin: { readOnly: true } },
            { name: 'referrer',       type: 'text', admin: { readOnly: true } },
            { name: 'honeypot',       type: 'text', admin: { readOnly: true, description: 'If non-empty, this was likely a bot.' } },
            { name: 'turnstileToken', type: 'text', admin: { readOnly: true } },
            { name: 'pageUrl',        type: 'text', admin: { readOnly: true, description: 'Page the form was submitted from.' } },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, originalDoc, req, operation }) => {
        // Auto-stamp wonAt / lostAt on status flip.
        if (operation === 'update') {
          if (data.status === 'won' && !data.wonAt && originalDoc?.status !== 'won') {
            data.wonAt = new Date().toISOString()
          }
          if (data.status === 'lost' && !data.lostAt && originalDoc?.status !== 'lost') {
            data.lostAt = new Date().toISOString()
          }
          // Auto-add a timeline entry when status changes.
          if (originalDoc && data.status && data.status !== originalDoc.status) {
            data.timeline = [
              ...(data.timeline ?? originalDoc.timeline ?? []),
              {
                at: new Date().toISOString(),
                byUser: req.user?.id,
                type: 'status_change',
                note: `Status changed from ${originalDoc.status} → ${data.status}`,
              },
            ]
          }
          // Auto-add a timeline entry when assignedTo changes.
          if (
            originalDoc &&
            data.assignedTo !== undefined &&
            String(data.assignedTo) !== String(originalDoc.assignedTo)
          ) {
            data.timeline = [
              ...(data.timeline ?? originalDoc.timeline ?? []),
              {
                at: new Date().toISOString(),
                byUser: req.user?.id,
                type: 'assignment',
                note: `Assigned to user ${data.assignedTo}`,
              },
            ]
          }
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        // Notify assigned user when a lead is newly assigned to them.
        const assignedChanged =
          operation === 'update' &&
          previousDoc &&
          String(previousDoc.assignedTo) !== String(doc.assignedTo) &&
          doc.assignedTo
        const isNewAssignment = operation === 'create' && doc.assignedTo
        if ((assignedChanged || isNewAssignment) && doc.assignedTo) {
          try {
            const assignee = await req.payload.findByID({
              collection: 'users',
              id: doc.assignedTo as string,
              overrideAccess: true,
            })
            if (assignee?.email) {
              await req.payload.sendEmail({
                to: assignee.email,
                subject: `[SecurityBlogs] New lead assigned: ${doc.name ?? doc.email ?? 'unknown'}`,
                html: `
                  <p>You've been assigned a new lead.</p>
                  <ul>
                    <li><strong>From:</strong> ${doc.name ?? '—'} &lt;${doc.email ?? '—'}&gt;</li>
                    <li><strong>Source:</strong> ${doc.source}</li>
                    <li><strong>Subject:</strong> ${doc.subject ?? '—'}</li>
                  </ul>
                  <p>${(doc.message ?? '').slice(0, 500)}</p>
                  <p><a href="${process.env.NEXT_PUBLIC_SERVER_URL ?? ''}/admin/collections/leads/${doc.id}">Open lead in admin →</a></p>
                `,
              })
            }
          } catch (err) {
            req.payload.logger.error({ err }, 'Failed to send lead assignment email')
          }
        }
      },
    ],
  },
}
