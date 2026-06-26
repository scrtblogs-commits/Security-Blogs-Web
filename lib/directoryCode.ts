import { createHmac } from 'crypto'

export function generateCode(email: string): string {
  const secret = process.env.DIRECTORY_ACCESS_SECRET || 'sb-directory-2026'
  return createHmac('sha256', secret)
    .update(email.toLowerCase().trim())
    .digest('hex')
    .slice(0, 8)
    .toUpperCase()
}
