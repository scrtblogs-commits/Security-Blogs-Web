import { requireAdminAuth } from '@/lib/admin-auth'
import { getFaqs }          from '@/lib/content-store'
import FaqsEditor           from './FaqsEditor'

export default async function FaqsPage() {
  await requireAdminAuth()
  return (
    <div style={{ padding: '32px 36px', maxWidth: 860 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#d97706,#f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: '0 4px 12px rgba(217,119,6,0.3)', flexShrink: 0 }}>❓</div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>FAQs</h1>
          <p style={{ fontSize: 14, color: '#64748b', margin: '3px 0 0' }}>Edit the FAQ section shown on the homepage. Add, remove or reorder questions.</p>
        </div>
      </div>
      <FaqsEditor initial={getFaqs()} />
    </div>
  )
}
