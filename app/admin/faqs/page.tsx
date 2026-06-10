import { requireAdminAuth } from '@/lib/admin-auth'
import { getFaqs }          from '@/lib/content-store'
import FaqsEditor           from './FaqsEditor'

export default async function FaqsPage() {
  await requireAdminAuth()
  const faqs = getFaqs()
  return (
    <div style={{ padding: '28px 32px', maxWidth: 860 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>FAQs</h1>
        <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
          Edit the FAQ questions and answers shown on the homepage. Add, remove or reorder them.
        </p>
      </div>
      <FaqsEditor initial={faqs} />
    </div>
  )
}
