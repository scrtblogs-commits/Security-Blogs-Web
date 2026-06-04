import type { Access } from 'payload'
import { isAdminOrAbove, isSuperAdmin } from './roles'

// Permission predicates expressed as Payload Access functions.
// Use these directly on collection access policies.

export const onlySuperAdmin: Access = ({ req: { user } }) => isSuperAdmin(user)
export const adminOrAbove: Access = ({ req: { user } }) => isAdminOrAbove(user)
