import type { Access } from 'payload'

// Anyone with a valid session. Used as the most lenient guard.
export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user)
