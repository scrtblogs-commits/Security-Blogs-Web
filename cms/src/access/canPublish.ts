import type { Access, FieldAccess } from 'payload'
import { isAdminOrAbove, isEditorOrAbove } from './roles'

// Used at the COLLECTION level for create/update — anyone editor+ can draft.
export const canDraft: Access = ({ req: { user } }) => isEditorOrAbove(user)

// Used at the FIELD level for `status` — only admin+ can flip to 'published'.
// Editors can save drafts but can't publish other people's work.
// Their own posts can still be published via the per-record Posts hook.
export const canSetPublishStatus: FieldAccess = ({ req: { user } }) =>
  isAdminOrAbove(user)
