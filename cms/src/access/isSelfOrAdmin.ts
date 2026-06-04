import type { Access } from 'payload'
import { isAdminOrAbove } from './roles'

// Users collection: a user can read/update their own record;
// admins can read/update everyone.
export const isSelfOrAdmin: Access = ({ req: { user }, id }) => {
  if (!user) return false
  if (isAdminOrAbove(user)) return true
  // Editor: only their own record
  return user.id === id || { id: { equals: user.id } }
}
