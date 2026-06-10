import { requireAdminAuth }  from '@/lib/admin-auth'
import { getHomepageContent, getStats } from '@/lib/content-store'
import HomepageEditor from './HomepageEditor'

export default async function HomepagePage() {
  await requireAdminAuth()
  const hero  = getHomepageContent()
  const stats = getStats()
  return (
    <div style={{ padding: '28px 32px', maxWidth: 860 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Homepage Content</h1>
        <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
          Edit the hero headline, subtitle, badge text, and the 4 stats shown on the homepage.
        </p>
      </div>
      <HomepageEditor initialHero={hero} initialStats={stats} />
    </div>
  )
}
