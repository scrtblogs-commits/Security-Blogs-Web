import { requireAdminAuth } from '@/lib/admin-auth'
import { queryLeads } from '@/lib/leads-store'
import Link from 'next/link'

export default async function AdminDashboard() {
  await requireAdminAuth()
  const { stats, leads: recent } = queryLeads({ limit: 8 })

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Dashboard</h1>
        <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>Overview of all form submissions</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
        <StatCard label="Total Submissions" value={stats.total}     color="#1e5fe0" bg="#eff4ff" icon="📨" />
        <StatCard label="New"               value={stats.new}       color="#15803d" bg="#f0fdf4" icon="🆕" />
        <StatCard label="Contacted"         value={stats.contacted} color="#b45309" bg="#fffbeb" icon="📞" />
        <StatCard label="Closed"            value={stats.closed}    color="#4b5563" bg="#f9fafb" icon="✅" />
      </div>

      {/* Recent submissions */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8ecf2', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e8ecf2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#111827', margin: 0 }}>Recent Submissions</h2>
          <Link href="/admin/leads" style={{ fontSize: 13, color: '#1e5fe0', textDecoration: 'none', fontWeight: 500 }}>
            View all →
          </Link>
        </div>

        {recent.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
            No submissions yet. They will appear here when forms are submitted.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e8ecf2' }}>
                  {['Date', 'Name', 'Email', 'Service', 'Source', 'Status'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                  <th style={{ padding: '10px 16px' }} />
                </tr>
              </thead>
              <tbody>
                {recent.map(lead => (
                  <tr key={lead.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '11px 16px', color: '#6b7280', whiteSpace: 'nowrap' }}>
                      {new Date(lead.createdAt).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: '2-digit' })}
                    </td>
                    <td style={{ padding: '11px 16px', fontWeight: 600, color: '#111827', whiteSpace: 'nowrap' }}>{lead.name}</td>
                    <td style={{ padding: '11px 16px', color: '#374151' }}>{lead.email}</td>
                    <td style={{ padding: '11px 16px', color: '#374151' }}>{lead.service ?? '—'}</td>
                    <td style={{ padding: '11px 16px', color: '#6b7280' }}>{lead.source}</td>
                    <td style={{ padding: '11px 16px' }}><StatusBadge status={lead.status} /></td>
                    <td style={{ padding: '11px 16px' }}>
                      <Link href={`/admin/leads/${lead.id}`} style={{ fontSize: 12, color: '#1e5fe0', textDecoration: 'none', fontWeight: 500 }}>View →</Link>
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

function StatCard({ label, value, color, bg, icon }: { label: string; value: number; color: string; bg: string; icon: string }) {
  return (
    <div style={{ background: bg, borderRadius: 12, padding: '18px 20px', border: `1px solid ${color}22` }}>
      <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4, fontWeight: 500 }}>{label}</div>
    </div>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const MAP: Record<string, { bg: string; color: string; label: string }> = {
    new:       { bg: '#dcfce7', color: '#15803d', label: 'New' },
    contacted: { bg: '#fef9c3', color: '#854d0e', label: 'Contacted' },
    closed:    { bg: '#f1f5f9', color: '#475569', label: 'Closed' },
  }
  const s = MAP[status] ?? MAP.new
  return (
    <span style={{
      display: 'inline-block', padding: '3px 9px', borderRadius: 99,
      background: s.bg, color: s.color,
      fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
    }}>
      {s.label}
    </span>
  )
}
