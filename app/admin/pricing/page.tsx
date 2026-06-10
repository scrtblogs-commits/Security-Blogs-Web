import { requireAdminAuth } from '@/lib/admin-auth'
import { getPricing }       from '@/lib/content-store'
import PricingEditor        from './PricingEditor'

export default async function PricingAdminPage() {
  await requireAdminAuth()
  return (
    <div style={{ padding: '32px 36px', maxWidth: 1100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#dc2626,#ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: '0 4px 12px rgba(220,38,38,0.3)', flexShrink: 0 }}>💰</div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Pricing</h1>
          <p style={{ fontSize: 14, color: '#64748b', margin: '3px 0 0' }}>Edit all pricing plans, features, badges and CTA buttons across every section.</p>
        </div>
      </div>
      <PricingEditor initial={getPricing()} />
    </div>
  )
}
