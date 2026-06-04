import type { GlobalConfig } from 'payload'
import { isLoggedIn } from '../access/isLoggedIn'
import { onlySuperAdmin } from '../access/isAdmin'

// Settings global — sitewide configuration accessible at /api/globals/settings.
// One row only (Payload's Global concept). Edited from a single admin screen.
export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
    description: 'Sitewide configuration: brand, contact, social, SEO defaults, analytics, footer.',
  },
  access: {
    read: () => true,                       // public read so the frontend can hydrate
    update: onlySuperAdmin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            { name: 'siteName',   type: 'text',   defaultValue: 'SecurityBlogs', required: true },
            { name: 'tagline',    type: 'text',   defaultValue: "Australia's AI Visibility Platform for Security Brands." },
            { name: 'logoHeader', type: 'upload', relationTo: 'media' },
            { name: 'logoFooter', type: 'upload', relationTo: 'media' },
            { name: 'logoSquare', type: 'upload', relationTo: 'media', admin: { description: 'Favicon-sized square logo.' } },
            { name: 'ogImageDefault', type: 'upload', relationTo: 'media', admin: { description: 'Default OpenGraph image used when a page has no override.' } },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'contactEmail',   type: 'email', defaultValue: 'info@securityblogs.com.au', required: true },
            { name: 'contactPhone',   type: 'text',  defaultValue: '+61 411 212 418' },
            { name: 'businessHours',  type: 'text',  defaultValue: 'Mon to Fri, 9am–5pm AEST' },
            { name: 'addressCountry', type: 'text',  defaultValue: 'AU' },
            {
              name: 'areaServed',
              type: 'select',
              hasMany: true,
              defaultValue: ['AU', 'US', 'GB', 'AE', 'SG'],
              options: [
                { label: 'Australia',     value: 'AU' },
                { label: 'United States', value: 'US' },
                { label: 'United Kingdom', value: 'GB' },
                { label: 'United Arab Emirates', value: 'AE' },
                { label: 'Singapore',     value: 'SG' },
              ],
            },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'social',
              type: 'array',
              labels: { singular: 'Social Link', plural: 'Social Links' },
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'LinkedIn',  value: 'linkedin' },
                    { label: 'Facebook',  value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'YouTube',   value: 'youtube' },
                    { label: 'X',         value: 'x' },
                    { label: 'TikTok',    value: 'tiktok' },
                    { label: 'Other',     value: 'other' },
                  ],
                },
                { name: 'url',   type: 'text', required: true },
                { name: 'label', type: 'text', admin: { description: 'Optional display label.' } },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerColumns',
              type: 'array',
              labels: { singular: 'Column', plural: 'Columns' },
              maxRows: 6,
              fields: [
                { name: 'heading', type: 'text', required: true },
                {
                  name: 'links',
                  type: 'array',
                  labels: { singular: 'Link', plural: 'Links' },
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'href',  type: 'text', required: true },
                  ],
                },
              ],
            },
            {
              name: 'acknowledgement',
              type: 'textarea',
              label: 'Acknowledgement of Country',
              defaultValue:
                'Security Blogs proudly acknowledges the Traditional Custodians of the lands across Australia where our readers, contributors, and industry partners live and work. We honour Aboriginal and Torres Strait Islander peoples, their cultures, histories, and continuing connection to Country. We pay our respects to Elders past, present, and emerging and are committed to supporting a diverse, inclusive, and respectful security industry for all Australians.',
            },
            { name: 'acknowledgementFlags', type: 'upload', relationTo: 'media', admin: { description: 'Aboriginal + Torres Strait Islander flags composite image.' } },
            { name: 'copyrightText', type: 'text', defaultValue: '© {{year}} SecurityBlogs. All rights reserved.' },
          ],
        },
        {
          label: 'SEO Defaults',
          fields: [
            { name: 'defaultMetaTitle',       type: 'text', defaultValue: 'SecurityBlogs — The AI Visibility Platform for Security Brands' },
            { name: 'titleSuffix',            type: 'text', defaultValue: ' | SecurityBlogs', admin: { description: 'Appended to every page title.' } },
            { name: 'defaultMetaDescription', type: 'textarea' },
            { name: 'defaultOgImage',         type: 'upload', relationTo: 'media' },
            { name: 'twitterHandle',          type: 'text' },
            {
              name: 'languageLocale',
              type: 'text',
              defaultValue: 'en-AU',
              admin: { description: 'Used in <html lang=...> + JSON-LD inLanguage.' },
            },
          ],
        },
        {
          label: 'Analytics',
          fields: [
            { name: 'gtmId',      type: 'text', admin: { description: 'Google Tag Manager container ID. Leave blank to disable.' } },
            { name: 'plausibleUrl', type: 'text', admin: { description: 'URL of your self-hosted Plausible instance (e.g. https://stats.securityblogs.com.au). Leave blank to disable.' } },
            { name: 'plausibleDomain', type: 'text', defaultValue: 'securityblogs.com.au' },
          ],
        },
        {
          label: 'Booking Slots',
          fields: [
            {
              name: 'bookingSlots',
              type: 'array',
              labels: { singular: 'Slot', plural: 'Slots' },
              admin: { description: 'Time slots shown on /book-strategy-call/.' },
              fields: [{ name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Tue 10:00 AM".' } }],
              defaultValue: [
                { label: 'Tue 10:00 AM' },
                { label: 'Tue 2:30 PM'  },
                { label: 'Wed 11:00 AM' },
                { label: 'Thu 9:30 AM'  },
                { label: 'Fri 1:00 PM'  },
              ],
            },
          ],
        },
        {
          label: 'Cookie Banner',
          fields: [
            { name: 'cookieBannerEnabled', type: 'checkbox', defaultValue: true },
            { name: 'cookieBannerText',    type: 'textarea', defaultValue: 'We use cookies and embedded Google Maps / Mapbox tiles to power the live AI visibility experience. By continuing you accept this.' },
            { name: 'cookieBannerButton',  type: 'text', defaultValue: 'Got it' },
          ],
        },
        {
          label: 'Maintenance',
          fields: [
            { name: 'maintenanceMode', type: 'checkbox', defaultValue: false, admin: { description: 'Toggle ON to show a "be right back" page sitewide. Only Super Admins can flip this.' } },
            { name: 'maintenanceMessage', type: 'textarea', defaultValue: 'We\'ll be right back. Maintenance in progress.' },
          ],
        },
      ],
    },
  ],
}
