import { requireAdminAuth } from '@/lib/admin-auth'
import { getTestimonials }  from '@/lib/content-store'
import TestimonialsEditor   from './TestimonialsEditor'

export default async function TestimonialsPage() {
  await requireAdminAuth()
  return (
    <div style={{ padding: '32px 36px', maxWidth: 1060 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#7c3aed,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: '0 4px 12px rgba(124,58,237,0.3)', flexShrink: 0 }}>⭐</div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Testimonials</h1>
          <p style={{ fontSize: 14, color: '#64748b', margin: '3px 0 0' }}>Manage client testimonials. Add, edit or remove entries.</p>
        </div>
      </div>
      <TestimonialsEditor initial={getTestimonials()} />
    </div>
  )
}
