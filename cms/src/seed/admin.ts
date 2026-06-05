// Seed the first Super Admin user.
//
// Idempotent: if any user already exists with status active, skip.
// Reads credentials from env (SEED_ADMIN_EMAIL / SEED_ADMIN_NAME / SEED_ADMIN_PASSWORD).
//
// Run after first `payload migrate`:
//     cd cms && pnpm seed:admin
//
// On first login, the seeded admin MUST change their password.

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../../payload.config'

async function main() {
  const payload = await getPayload({ config })

  const email = process.env.SEED_ADMIN_EMAIL
  const name = process.env.SEED_ADMIN_NAME
  const password = process.env.SEED_ADMIN_PASSWORD
  if (!email || !name || !password) {
    console.error('SEED_ADMIN_EMAIL / SEED_ADMIN_NAME / SEED_ADMIN_PASSWORD must be set in env.')
    process.exit(1)
  }

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (existing.totalDocs > 0) {
    console.log(`✓ Super Admin already exists: ${email}`)
    process.exit(0)
  }

  const user = await payload.create({
    collection: 'users',
    data: {
      email,
      name,
      password,
      role: 'super_admin',
      isActive: true,
    },
    overrideAccess: true,
  })

  console.log(`✓ Created Super Admin: ${user.email} (id ${user.id})`)
  console.log('  Log in at http://localhost:3001/admin and change the password immediately.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
