import { requireAdminAuth } from '@/lib/admin-auth'
import { getBlogPosts }     from '@/lib/content-store'
import Link from 'next/link'

const CATS = ['SEO', 'AIO/AEO', 'GEO', 'Paid Ads', 'Industry']

export default async function BlogAdminPage() {
  await requireAdminAuth()
  const posts = getBlogPosts()

  const stats = {
    total:     posts.length,
    published: posts.filter(p => p.published).length,
    drafts:    posts.filter(p => !p.published).length,
    featured:  posts.filter(p => p.featured).length,
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Blog Posts</h1>
          <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>Create, edit and publish blog articles.</p>
        </div>
        <Link href="/admin/blog/new" style={{
          padding: '10px 20px', background: '#1e5fe0', color: '#fff',
          borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14,
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          + New Post
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Total Posts',  value: stats.total,     color: '#1e5fe0', bg: '#eff4ff' },
          { label: 'Published',    value: stats.published, color: '#15803d', bg: '#f0fdf4' },
          { label: 'Drafts',       value: stats.drafts,    color: '#b45309', bg: '#fffbeb' },
          { label: 'Featured',     value: stats.featured,  color: '#7c3aed', bg: '#f5f3ff' },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: '16px 18px', border: `1px solid ${s.color}22` }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Posts table */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8ecf2', overflow: 'hidden' }}>
        {posts.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📝</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#374151', marginBottom: 6 }}>No blog posts yet</div>
            <div style={{ fontSize: 14, color: '#9ca3af', marginBottom: 20 }}>Create your first post to get started.</div>
            <Link href="/admin/blog/new" style={{
              padding: '10px 20px', background: '#1e5fe0', color: '#fff',
              borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14,
            }}>
              Create First Post
            </Link>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e8ecf2', background: '#f8f9fb' }}>
                  {['Title', 'Category', 'Date', 'Read', 'Status', ''].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px 16px', maxWidth: 340 }}>
                      <div style={{ fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 320 }}>
                        {post.featured && <span style={{ fontSize: 11, background: '#f5f3ff', color: '#7c3aed', padding: '2px 6px', borderRadius: 4, fontWeight: 700, marginRight: 6 }}>FEATURED</span>}
                        {post.title}
                      </div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2, fontFamily: 'monospace' }}>/{post.slug}</div>
                    </td>
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                      <span style={{ background: '#f3f4f6', color: '#6b7280', padding: '3px 8px', borderRadius: 5, fontSize: 11, fontWeight: 600 }}>{post.cat}</span>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#6b7280', whiteSpace: 'nowrap' }}>{post.date}</td>
                    <td style={{ padding: '12px 16px', color: '#9ca3af', whiteSpace: 'nowrap' }}>{post.read}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        display: 'inline-block', padding: '3px 9px', borderRadius: 99, fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
                        background: post.published ? '#dcfce7' : '#fef9c3',
                        color:      post.published ? '#15803d' : '#854d0e',
                      }}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                      <Link href={`/admin/blog/${post.id}`} style={{ fontSize: 12, color: '#1e5fe0', textDecoration: 'none', fontWeight: 600 }}>
                        Edit →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
