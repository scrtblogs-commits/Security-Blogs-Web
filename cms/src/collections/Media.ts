import type { CollectionConfig } from 'payload'
import { adminOrAbove } from '../access/isAdmin'
import { isLoggedIn } from '../access/isLoggedIn'

// Media collection. All uploads land here.
// - Local-disk storage in Phase A (configured by storage-local plugin in payload.config.ts).
// - Image variants generated automatically via Payload's `imageSizes`.
// - Editors can upload + edit metadata; admins can delete.
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media', plural: 'Media' },
  upload: {
    staticDir: 'media-uploads', // resolved relative to cms/ (see env MEDIA_LOCAL_PATH)
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      'application/pdf',
    ],
    imageSizes: [
      { name: 'thumbnail', width: 160,  height: 160,  position: 'centre' },
      { name: 'small',     width: 480,                position: 'centre' },
      { name: 'medium',    width: 960,                position: 'centre' },
      { name: 'large',     width: 1600,               position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    formatOptions: { format: 'webp', options: { quality: 82 } },
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'altText', 'mimeType', 'filesize', 'createdAt'],
    group: 'Library',
  },
  access: {
    read: () => true, // public read so the frontend can resolve URLs
    create: isLoggedIn,
    update: isLoggedIn,
    delete: adminOrAbove,
  },
  fields: [
    {
      name: 'altText',
      type: 'text',
      required: true,
      admin: { description: 'Used as the image alt attribute. Required for accessibility.' },
    },
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Optional caption rendered below an image when used inside an article.' },
    },
    {
      name: 'credit',
      type: 'text',
      admin: { description: 'Photographer / source credit, if any.' },
    },
    {
      name: 'uploadedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true, position: 'sidebar' },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, data, operation }) => {
        if (operation === 'create' && req.user) {
          return { ...data, uploadedBy: req.user.id }
        }
        return data
      },
    ],
  },
}
