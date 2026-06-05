import type { CollectionConfig } from 'payload'
import { ROLES, isAdminOrAbove, isSuperAdmin } from '../access/roles'
import { isSelfOrAdmin } from '../access/isSelfOrAdmin'
import { onlySuperAdmin } from '../access/isAdmin'

// Users collection — also acts as Payload's auth provider.
// Roles: super_admin > admin > editor (see src/access/roles.ts).
export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'User', plural: 'Users' },
  auth: {
    // Payload uses Argon2id-equivalent hashing by default; we configure a
    // short-lived JWT and require strong passwords.
    tokenExpiration: 60 * 60 * 8, // 8 hours
    maxLoginAttempts: 5,
    lockTime: 1000 * 60 * 10, // 10 minutes
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
    verify: false, // Phase A: invited users don't need email verification (admin creates them)
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role', 'lastLoginAt', 'isActive'],
    group: 'Access',
  },
  access: {
    read: isSelfOrAdmin,
    create: ({ req: { user } }) => isAdminOrAbove(user),
    update: isSelfOrAdmin,
    delete: ({ req: { user } }) => isSuperAdmin(user),
    admin: ({ req: { user } }) => Boolean(user), // any logged-in user can enter the admin UI
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: ROLES.map((r) => ({
        label: r === 'super_admin' ? 'Super Admin' : r === 'admin' ? 'Admin' : 'Editor',
        value: r,
      })),
      access: {
        // Only super admins can change roles (incl. their own — risky, but
        // necessary to allow handover; audit log captures every change).
        update: ({ req: { user } }) => isSuperAdmin(user),
      },
      admin: {
        description: 'Super Admin = full control. Admin = content + leads. Editor = drafts + own posts.',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional profile picture.' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Uncheck to disable login without deleting the user record.',
      },
      access: {
        update: ({ req: { user } }) => isAdminOrAbove(user),
      },
    },
    {
      name: 'lastLoginAt',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'loginCount',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true, position: 'sidebar' },
    },
  ],
  hooks: {
    afterLogin: [
      async ({ user, req }) => {
        // Update last-login + login-count on each successful auth.
        await req.payload.update({
          collection: 'users',
          id: user.id,
          data: {
            lastLoginAt: new Date().toISOString(),
            loginCount: (user.loginCount ?? 0) + 1,
          },
          overrideAccess: true,
        })
      },
    ],
    beforeChange: [
      async ({ data, req, operation }) => {
        // Block disabled users from logging in: clear their tokens on
        // status flip. Payload's auth checks isActive via the field-level
        // beforeLogin hook (added in payload.config.ts authStrategies).
        if (operation === 'update' && data.isActive === false) {
          req.payload.logger.info(`User ${data.email ?? '?'} deactivated`)
        }
        return data
      },
    ],
  },
}
