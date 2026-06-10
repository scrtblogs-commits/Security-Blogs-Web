import { requireAdminAuth }  from '@/lib/admin-auth'
import { getHomepageContent, getStats } from '@/lib/content-store'
import HomepageEditor from './HomepageEditor'

export default async function HomepagePage() {
  await requireAdminAuth()
  return (
    <div style={{ padding: '32px 36px', maxWidth: 860 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#0891b2,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: '0 4px 12px rgba(8,145,178,0.3)', flexShrink: 0 }}>🏠</div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Homepage Content</h1>
          <p style={{ fontSize: 14, color: '#64748b', margin: '3px 0 0' }}>Edit the hero headline, badge text and the 4 stats shown on the homepage.</p>
        </div>
      </div>
      <HomepageEditor initialHero={getHomepageContent()} initialStats={getStats()} />
    </div>
  )
}
