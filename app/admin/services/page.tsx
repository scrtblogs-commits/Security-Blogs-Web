import { requireAdminAuth } from '@/lib/admin-auth'
import { getServices }      from '@/lib/content-store'
import ServicesEditor       from './ServicesEditor'

export default async function ServicesAdminPage() {
  await requireAdminAuth()
  const services = getServices()
  return (
    <div style={{ padding: '28px 32px', maxWidth: 1000 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Services</h1>
        <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
          Edit service titles, descriptions, icons and accent colours. Slugs are locked — changing them would break URLs.
        </p>
      </div>
      <ServicesEditor initial={services} />
    </div>
  )
}
