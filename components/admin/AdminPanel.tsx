'use client'
import { useState, useEffect, useMemo } from 'react'

type Lead = {
  id: string
  createdAt: string
  source: string
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message?: string
}

const SOURCE_COLORS: Record<string, string> = {
  contact:    '#3b82f6',
  directory:  '#10b981',
  challenge:  '#6366f1',
  checker:    '#f59e0b',
  'guest-post': '#e23744',
  careers:    '#8b5cf6',
  unknown:    '#94a3b8',
}

function SourceBadge({ source }: { source: string }) {
  const color = SOURCE_COLORS[source] ?? '#94a3b8'
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: color + '18', color, border: `1px solid ${color}40` }}>
      {source}
    </span>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '20px 24px', border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <div style={{ fontSize: 32, fontWeight: 900, color, letterSpacing: '-0.03em' }}>{value}</div>
      <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
    </div>
  )
}

// ── Password gate ─────────────────────────────────────────────────────
function PasswordGate({ onAuth }: { onAuth: (pw: string) => void }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/admin/leads?password=${encodeURIComponent(pw)}`)
    if (res.ok) { onAuth(pw) }
    else { setErr(true); setTimeout(() => setErr(false), 2000) }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fc' }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: '48px 40px', width: '100%', maxWidth: 380, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔐</div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', margin: 0 }}>Admin Panel</h1>
          <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 6 }}>SecurityBlogs · Internal</p>
        </div>
        <form onSubmit={submit}>
          <input
            type="password" placeholder="Enter admin password" value={pw}
            onChange={e => setPw(e.target.value)} required
            style={{ width: '100%', padding: '13px 16px', border: `2px solid ${err ? '#ef4444' : '#e2e8f0'}`, borderRadius: 12, fontSize: 15, marginBottom: 12, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
          />
          {err && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 10, textAlign: 'center' }}>Incorrect password</p>}
          <button type="submit" style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg, #1e5fe0, #6366f1)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            Sign In →
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Main dashboard ────────────────────────────────────────────────────
export default function AdminPanel() {
  const [password, setPassword] = useState<string | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [filterSource, setFilterSource] = useState('')
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('sg-admin-pw')
    if (saved) setPassword(saved)
  }, [])

  useEffect(() => {
    if (!password) return
    sessionStorage.setItem('sg-admin-pw', password)
    setLoading(true)
    fetch(`/api/admin/leads?password=${encodeURIComponent(password)}`)
      .then(r => r.json())
      .then(d => { if (d.ok) setLeads(d.leads) })
      .finally(() => setLoading(false))
  }, [password])

  const filtered = useMemo(() => {
    return leads.filter(l => {
      const matchSource = !filterSource || l.source === filterSource
      const q = search.toLowerCase()
      const matchSearch = !q || l.name?.toLowerCase().includes(q) || l.email?.toLowerCase().includes(q) || l.company?.toLowerCase().includes(q)
      return matchSource && matchSearch
    })
  }, [leads, filterSource, search])

  const sources = useMemo(() => [...new Set(leads.map(l => l.source))], [leads])

  const stats = useMemo(() => {
    const bySource: Record<string, number> = {}
    leads.forEach(l => { bySource[l.source] = (bySource[l.source] ?? 0) + 1 })
    const today = leads.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length
    return { total: leads.length, today, bySource }
  }, [leads])

  const exportCsv = () => {
    const rows = [['Date','Name','Email','Phone','Company','Service','Source','Message']]
    filtered.forEach(l => rows.push([
      new Date(l.createdAt).toLocaleString('en-AU'),
      l.name ?? '', l.email ?? '', l.phone ?? '', l.company ?? '',
      l.service ?? '', l.source ?? '', (l.message ?? '').replace(/\n/g, ' '),
    ]))
    const csv = rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n')
    const a = document.createElement('a')
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
    a.download = `securityblogs-leads-${new Date().toISOString().slice(0,10)}.csv`
    a.click()
  }

  if (!password) return <PasswordGate onAuth={setPassword} />

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fc', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #1e5fe0, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🛡️</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>SecurityBlogs Admin</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>Lead Management Dashboard</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => { setLoading(true); fetch(`/api/admin/leads?password=${encodeURIComponent(password)}`).then(r => r.json()).then(d => { if (d.ok) setLeads(d.leads) }).finally(() => setLoading(false)) }}
            style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#475569' }}>
            ↻ Refresh
          </button>
          <button onClick={exportCsv} style={{ padding: '8px 16px', background: '#1e5fe0', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            ↓ Export CSV
          </button>
          <button onClick={() => { sessionStorage.removeItem('sg-admin-pw'); setPassword(null) }}
            style={{ padding: '8px 16px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Sign Out
          </button>
        </div>
      </div>

      <div style={{ padding: '32px', maxWidth: 1280, margin: '0 auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#94a3b8', fontSize: 16 }}>Loading leads...</div>
        ) : (
          <>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
              <StatCard label="Total Leads" value={stats.total} color="#1e5fe0" />
              <StatCard label="Today" value={stats.today} color="#10b981" />
              {Object.entries(stats.bySource).map(([src, count]) => (
                <StatCard key={src} label={src} value={count} color={SOURCE_COLORS[src] ?? '#94a3b8'} />
              ))}
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>🔍</span>
                <input type="text" placeholder="Search name, email, company..." value={search} onChange={e => setSearch(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px 10px 34px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 13, background: '#fff', boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <select value={filterSource} onChange={e => setFilterSource(e.target.value)}
                style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 13, background: '#fff', cursor: 'pointer', minWidth: 140 }}>
                <option value="">All Sources</option>
                {sources.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {(filterSource || search) && (
                <button onClick={() => { setFilterSource(''); setSearch('') }}
                  style={{ padding: '10px 16px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  Clear
                </button>
              )}
              <span style={{ padding: '10px 0', fontSize: 13, color: '#94a3b8', alignSelf: 'center' }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
            </div>

            {/* Table */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px', color: '#94a3b8', background: '#fff', borderRadius: 16, border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
                <p style={{ fontSize: 16, fontWeight: 600 }}>{leads.length === 0 ? 'No leads yet' : 'No results for your filters'}</p>
              </div>
            ) : (
              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f1f5f9', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr 120px 100px 32px', gap: 16, padding: '12px 20px', background: '#f8f9fc', borderBottom: '1px solid #f1f5f9' }}>
                  {['Date','Name / Email','Company / Service','Source',''].map((h, i) => (
                    <div key={i} style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
                  ))}
                </div>

                {filtered.map((lead, i) => (
                  <div key={lead.id}>
                    <div
                      onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                      style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr 120px 100px 32px', gap: 16, padding: '14px 20px', borderBottom: i < filtered.length - 1 ? '1px solid #f8f9fc' : 'none', cursor: 'pointer', alignItems: 'center' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#fafbfc')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div style={{ fontSize: 12, color: '#64748b' }}>
                        <div>{new Date(lead.createdAt).toLocaleDateString('en-AU')}</div>
                        <div style={{ color: '#94a3b8' }}>{new Date(lead.createdAt).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{lead.name || '—'}</div>
                        <div style={{ fontSize: 12, color: '#3b82f6' }}>{lead.email}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 13, color: '#475569' }}>{lead.company || '—'}</div>
                        <div style={{ fontSize: 12, color: '#94a3b8' }}>{lead.service || '—'}</div>
                      </div>
                      <div><SourceBadge source={lead.source} /></div>
                      <div>
                        {lead.phone && <div style={{ fontSize: 12, color: '#64748b' }}>{lead.phone}</div>}
                      </div>
                      <div style={{ fontSize: 14, color: '#94a3b8', textAlign: 'center' }}>{expandedId === lead.id ? '▲' : '▼'}</div>
                    </div>

                    {/* Expanded message */}
                    {expandedId === lead.id && lead.message && (
                      <div style={{ padding: '0 20px 16px 196px', borderBottom: i < filtered.length - 1 ? '1px solid #f8f9fc' : 'none' }}>
                        <div style={{ background: '#f8f9fc', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#475569', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                          {lead.message}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
