import { requireAdminAuth } from '@/lib/admin-auth'
import { getBlogPost }      from '@/lib/content-store'
import { notFound }         from 'next/navigation'
import Link        from 'next/link'
import PostEditor  from '../PostEditor'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminAuth()
  const { id } = await params
  const post   = getBlogPost(id)
  if (!post) notFound()

  return (
    <div style={{ padding: '28px 32px', maxWidth: 900 }}>
      <Link href="/admin/blog" style={{ fontSize: 13, color: '#6b7280', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 20 }}>
        ← Back to Blog Posts
      </Link>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Edit Post</h1>
          <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4, maxWidth: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title}</p>
        </div>
        <a href={`/knowledge-hub/blogs/${post.slug}`} target="_blank" rel="noreferrer"
          style={{ fontSize: 13, color: '#6b7280', textDecoration: 'none', padding: '8px 14px', border: '1px solid #e5e7eb', borderRadius: 7, fontWeight: 500 }}>
          View live ↗
        </a>
      </div>
      <PostEditor initial={post} isNew={false} />
    </div>
  )
}
