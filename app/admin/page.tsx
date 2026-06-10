import { requireAdminAuth } from '@/lib/admin-auth'
import { queryLeads }       from '@/lib/leads-store'
import { getBlogPosts }     from '@/lib/content-store'
import Link from 'next/link'

export default async function AdminDashboard() {
  await requireAdminAuth()
  const { stats: ls, leads: recent } = queryLeads({ limit: 6 })
  const posts         = getBlogPosts()
  const publishedPosts = posts.filter(p => p.published).length

  const quickLinks = [
    { icon: '⚙️', label: 'Site Settings',  href: '/admin/site-settings',  desc: 'Name, contact & CTAs',     color: '#6366f1', bg: '#eef2ff' },
    { icon: '🏠', label: 'Homepage',        href: '/admin/homepage',        desc: 'Hero, stats & content',    color: '#0891b2', bg: '#ecfeff' },
    { icon: '🛠️', label: 'Services',        href: '/admin/services',        desc: '8 service descriptions',   color: '#059669', bg: '#ecfdf5' },
    { icon: '❓', label: 'FAQs',            href: '/admin/faqs',            desc: 'Questions & answers',      color: '#d97706', bg: '#fffbeb' },
    { icon: '⭐', label: 'Testimonials',    href: '/admin/testimonials',    desc: 'Client reviews',           color: '#7c3aed', bg: '#f5f3ff' },
    { icon: '💰', label: 'Pricing',         href: '/admin/pricing',         desc: 'All pricing tables',       color: '#dc2626', bg: '#fef2f2' },
    { icon: '📝', label: 'Blog Posts',      href: '/admin/blog',            desc: `${posts.length} articles`, color: '#0369a1', bg: '#f0f9ff' },
    { icon: '📨', label: 'Submissions',     href: '/admin/leads',           desc: `${ls.new} unread leads`,   color: '#1e5fe0', bg: '#eff4ff' },
  ]

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1060 }}>
      {/* Welcome header */}
      <div style={{
        background: 'linear-gradient(135deg,#1e3a6e 0%,#1e5fe0 60%,#3b82f6 100%)',
        borderRadius: 18, padding: '26px 30px', marginBottom: 28, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -50, right: 80, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
            SecurityBlogs Admin
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 6px', lineHeight: 1.2 }}>
            Good day 👋
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
            You have <strong style={{ color: '#fff' }}>{ls.new} new lead{ls.new !== 1 ? 's' : ''}</strong> waiting for follow-up.
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        <StatCard label="Total Leads"     value={ls.total}      icon="📨" color="#1e5fe0" bg="linear-gradient(135deg,#eff4ff,#dbeafe)" />
        <StatCard label="New Leads"       value={ls.new}        icon="🆕" color="#059669" bg="linear-gradient(135deg,#ecfdf5,#d1fae5)" />
        <StatCard label="In Progress"     value={ls.contacted}  icon="📞" color="#d97706" bg="linear-gradient(135deg,#fffbeb,#fef3c7)" />
        <StatCard label="Published Posts" value={publishedPosts} icon="📝" color="#7c3aed" bg="linear-gradient(135deg,#f5f3ff,#ede9fe)" />
      </div>

      {/* Quick access grid */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: 14 }}>
          Quick Access
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {quickLinks.map(q => (
            <Link key={q.href} href={q.href} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: '#fff', borderRadius: 14, border: '1.5px solid #e2e8f0',
              padding: '14px 16px', textDecoration: 'none',
              boxShadow: '0 1px 3px rgba(15,23,42,0.04)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: q.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
              }}>
                {q.icon}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.label}</div>
                <div style={{ fontSize: 11.5, color: '#94a3b8', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent submissions */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.09em', textTransform: 'uppercase' }}>
            Recent Submissions
          </div>
          <Link href="/admin/leads" style={{ fontSize: 13, color: '#1e5fe0', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            View all <span>→</span>
          </Link>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(15,23,42,0.04)' }}>
          {recent.length === 0 ? (
            <div style={{ padding: '48px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>📭</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#475569', marginBottom: 4 }}>No submissions yet</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>Form submissions will appear here.</div>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0' }}>
                  {['Name', 'Email', 'Service', 'Date', 'Status', ''].map(h => (
                    <th key={h} style={{ padding: '11px 18px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((lead, i) => (
                  <tr key={lead.id} style={{ borderBottom: i < recent.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '13px 18px', fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap' }}>{lead.name}</td>
                    <td style={{ padding: '13px 18px', color: '#475569' }}>{lead.email}</td>
                    <td style={{ padding: '13px 18px', color: '#64748b' }}>{lead.service ?? '—'}</td>
                    <td style={{ padding: '13px 18px', color: '#94a3b8', whiteSpace: 'nowrap', fontSize: 12 }}>
                      {new Date(lead.createdAt).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: '2-digit' })}
                    </td>
                    <td style={{ padding: '13px 18px' }}><StatusBadge status={lead.status} /></td>
                    <td style={{ padding: '13px 18px' }}>
                      <Link href={`/admin/leads/${lead.id}`} style={{
                        fontSize: 12, color: '#1e5fe0', textDecoration: 'none', fontWeight: 600,
                        padding: '5px 10px', background: '#eff4ff', borderRadius: 6,
                      }}>
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, color, bg }: { label: string; value: number; icon: string; color: string; bg: string }) {
  return (
    <div style={{
      background: bg, borderRadius: 14, padding: '20px 22px',
      border: `1.5px solid ${color}20`,
      boxShadow: '0 1px 4px rgba(15,23,42,0.04)',
    }}>
      <div style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: 32, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: '#64748b', marginTop: 6, fontWeight: 500 }}>{label}</div>
    </div>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const MAP: Record<string, { bg: string; color: string; dot: string; label: string }> = {
    new:       { bg: '#dcfce7', color: '#15803d', dot: '#22c55e', label: 'New' },
    contacted: { bg: '#fef9c3', color: '#854d0e', dot: '#eab308', label: 'Contacted' },
    closed:    { bg: '#f1f5f9', color: '#475569', dot: '#94a3b8', label: 'Closed' },
  }
  const s = MAP[status] ?? MAP.new
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 10px', borderRadius: 99,
      background: s.bg, color: s.color,
      fontSize: 11.5, fontWeight: 700, letterSpacing: '0.03em',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.dot, flexShrink: 0, display: 'inline-block' }} />
      {s.label}
    </span>
  )
}
