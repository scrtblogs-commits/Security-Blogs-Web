import { requireAdminAuth } from '@/lib/admin-auth'
import { getSiteSettings }  from '@/lib/content-store'
import SiteSettingsEditor   from './SiteSettingsEditor'

export default async function SiteSettingsPage() {
  await requireAdminAuth()
  const settings = getSiteSettings()
  return (
    <div style={{ padding: '28px 32px', maxWidth: 760 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Site Settings</h1>
        <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
          Global settings used across the entire website — company name, contact details, CTAs.
        </p>
      </div>
      <SiteSettingsEditor initial={settings} />
    </div>
  )
}
