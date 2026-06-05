// Payload writes an importMap at build time mapping every custom field
// component path to its actual import. We keep it empty here because
// Phase A uses only built-in field types. If you add custom field
// components later, run `pnpm payload generate:importmap` to regenerate.
export const importMap = {}
