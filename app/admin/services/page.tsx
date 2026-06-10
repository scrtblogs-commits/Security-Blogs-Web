import { requireAdminAuth } from '@/lib/admin-auth'
import { getServices }      from '@/lib/content-store'
import ServicesEditor       from './ServicesEditor'

export default async function ServicesAdminPage() {
  await requireAdminAuth()
  return (
    <div style={{ padding: '32px 36px', maxWidth: 1060 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#059669,#10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: '0 4px 12px rgba(5,150,105,0.3)', flexShrink: 0 }}>🛠️</div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Services</h1>
          <p style={{ fontSize: 14, color: '#64748b', margin: '3px 0 0' }}>Edit service titles, descriptions, icons and accent colours. Slugs are locked to preserve URLs.</p>
        </div>
      </div>
      <ServicesEditor initial={getServices()} />
    </div>
  )
}
