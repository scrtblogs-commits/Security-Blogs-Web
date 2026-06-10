import { requireAdminAuth } from '@/lib/admin-auth'
import { getBlogPosts }     from '@/lib/content-store'
import Link from 'next/link'

const CAT_COLORS: Record<string, { bg: string; color: string }> = {
  'SEO':      { bg: '#ecfdf5', color: '#059669' },
  'AIO/AEO':  { bg: '#f5f3ff', color: '#7c3aed' },
  'GEO':      { bg: '#fef3c7', color: '#d97706' },
  'Paid Ads': { bg: '#fef2f2', color: '#dc2626' },
  'Industry': { bg: '#eff4ff', color: '#1e5fe0' },
}

export default async function BlogAdminPage() {
  await requireAdminAuth()
  const posts = getBlogPosts()
  const total     = posts.length
  const published = posts.filter(p => p.published).length
  const drafts    = posts.filter(p => !p.published).length
  const featured  = posts.filter(p => p.featured).length

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#0369a1,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: '0 4px 12px rgba(3,105,161,0.3)', flexShrink: 0 }}>📝</div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Blog Posts</h1>
            <p style={{ fontSize: 14, color: '#64748b', margin: '3px 0 0' }}>Create, edit and publish articles for the knowledge hub.</p>
          </div>
        </div>
        <Link href="/admin/blog/new" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '10px 20px', background: 'linear-gradient(135deg,#1e5fe0,#2563eb)',
          color: '#fff', borderRadius: 10, textDecoration: 'none',
          fontWeight: 700, fontSize: 14, boxShadow: '0 2px 8px rgba(30,95,224,0.3)',
        }}>
          ＋ New Post
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Total Posts',  value: total,     color: '#0369a1', bg: 'linear-gradient(135deg,#f0f9ff,#e0f2fe)' },
          { label: 'Published',    value: published, color: '#059669', bg: 'linear-gradient(135deg,#ecfdf5,#d1fae5)' },
          { label: 'Drafts',       value: drafts,    color: '#d97706', bg: 'linear-gradient(135deg,#fffbeb,#fef3c7)' },
          { label: 'Featured',     value: featured,  color: '#7c3aed', bg: 'linear-gradient(135deg,#f5f3ff,#ede9fe)' },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 14, padding: '18px 20px', border: `1.5px solid ${s.color}20` }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#64748b', marginTop: 6, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Posts table */}
      <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(15,23,42,0.04)' }}>
        {posts.length === 0 ? (
          <div style={{ padding: '64px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>✍️</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#334155', marginBottom: 6 }}>No posts yet</div>
            <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 24 }}>Create your first blog post to get started.</div>
            <Link href="/admin/blog/new" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '10px 22px', background: 'linear-gradient(135deg,#1e5fe0,#2563eb)',
              color: '#fff', borderRadius: 10, textDecoration: 'none', fontWeight: 700,
            }}>
              Create first post
            </Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0' }}>
                {['Title', 'Category', 'Author', 'Date', 'Status', ''].map(h => (
                  <th key={h} style={{ padding: '12px 18px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => {
                const cc = CAT_COLORS[post.cat] ?? { bg: '#f1f5f9', color: '#64748b' }
                return (
                  <tr key={post.id} style={{ borderBottom: i < posts.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '14px 18px', maxWidth: 340 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {post.featured && (
                          <span style={{ fontSize: 10, background: '#f5f3ff', color: '#7c3aed', padding: '2px 7px', borderRadius: 4, fontWeight: 800, letterSpacing: '0.04em', flexShrink: 0 }}>
                            FEATURED
                          </span>
                        )}
                        <span style={{ fontWeight: 600, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 280 }}>
                          {post.title}
                        </span>
                      </div>
                      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3, fontFamily: 'monospace' }}>/{post.slug}</div>
                    </td>
                    <td style={{ padding: '14px 18px', whiteSpace: 'nowrap' }}>
                      <span style={{ background: cc.bg, color: cc.color, padding: '3px 9px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>{post.cat}</span>
                    </td>
                    <td style={{ padding: '14px 18px', color: '#64748b', whiteSpace: 'nowrap' }}>{post.author}</td>
                    <td style={{ padding: '14px 18px', color: '#94a3b8', whiteSpace: 'nowrap', fontSize: 12 }}>{post.date}</td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700,
                        background: post.published ? '#dcfce7' : '#fef9c3',
                        color:      post.published ? '#15803d'  : '#854d0e',
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: post.published ? '#22c55e' : '#eab308', flexShrink: 0, display: 'inline-block' }} />
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', whiteSpace: 'nowrap' }}>
                      <Link href={`/admin/blog/${post.id}`} style={{
                        fontSize: 12, color: '#1e5fe0', textDecoration: 'none', fontWeight: 700,
                        padding: '6px 12px', background: '#eff4ff', borderRadius: 7,
                      }}>
                        Edit →
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
