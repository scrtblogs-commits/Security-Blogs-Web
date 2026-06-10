import { requireAdminAuth } from '@/lib/admin-auth'
import { getTestimonials }  from '@/lib/content-store'
import TestimonialsEditor   from './TestimonialsEditor'

export default async function TestimonialsPage() {
  await requireAdminAuth()
  const testimonials = getTestimonials()
  return (
    <div style={{ padding: '28px 32px', maxWidth: 1000 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Testimonials</h1>
        <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
          Manage client testimonials displayed across the website. Add, edit or remove entries.
        </p>
      </div>
      <TestimonialsEditor initial={testimonials} />
    </div>
  )
}
