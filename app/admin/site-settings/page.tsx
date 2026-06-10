import { requireAdminAuth } from '@/lib/admin-auth'
import { getSiteSettings }  from '@/lib/content-store'
import SiteSettingsEditor   from './SiteSettingsEditor'

export default async function SiteSettingsPage() {
  await requireAdminAuth()
  const settings = getSiteSettings()
  return (
    <div style={{ padding: '32px 36px', maxWidth: 860 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          boxShadow: '0 4px 12px rgba(99,102,241,0.3)', flexShrink: 0,
        }}>⚙️</div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Site Settings</h1>
          <p style={{ fontSize: 14, color: '#64748b', margin: '3px 0 0' }}>Global settings — company name, contact details and CTAs used across every page.</p>
        </div>
      </div>
      <SiteSettingsEditor initial={settings} />
    </div>
  )
}
