import { requireAdminAuth } from '@/lib/admin-auth'
import { getPricing }       from '@/lib/content-store'
import PricingEditor        from './PricingEditor'

export default async function PricingAdminPage() {
  await requireAdminAuth()
  const pricing = getPricing()
  return (
    <div style={{ padding: '28px 32px', maxWidth: 1100 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Pricing</h1>
        <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
          Edit all pricing plans, features, badges and CTA buttons across every pricing section.
        </p>
      </div>
      <PricingEditor initial={pricing} />
    </div>
  )
}
