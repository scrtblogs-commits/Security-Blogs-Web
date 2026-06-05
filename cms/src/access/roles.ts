// Role enum + role-check helpers. The roles live on `users.role`.
// Edit this file to add or rename a role; Payload picks it up via the
// Users collection's `role` field options.

export const ROLES = ['super_admin', 'admin', 'editor'] as const
export type Role = (typeof ROLES)[number]

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  editor: 'Editor',
}

export function hasRole(user: { role?: Role } | null | undefined, ...roles: Role[]): boolean {
  if (!user || !user.role) return false
  return roles.includes(user.role)
}

export const isSuperAdmin = (user: { role?: Role } | null | undefined) =>
  hasRole(user, 'super_admin')
export const isAdminOrAbove = (user: { role?: Role } | null | undefined) =>
  hasRole(user, 'super_admin', 'admin')
export const isEditorOrAbove = (user: { role?: Role } | null | undefined) =>
  hasRole(user, 'super_admin', 'admin', 'editor')
