import { requireAdminAuth } from '@/lib/admin-auth'
import Link        from 'next/link'
import PostEditor  from '../PostEditor'

export default async function NewPostPage() {
  await requireAdminAuth()
  return (
    <div style={{ padding: '28px 32px', maxWidth: 900 }}>
      <Link href="/admin/blog" style={{ fontSize: 13, color: '#6b7280', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 20 }}>
        ← Back to Blog Posts
      </Link>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>New Blog Post</h1>
        <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>Create a new article for the knowledge hub.</p>
      </div>
      <PostEditor initial={{}} isNew={true} />
    </div>
  )
}
