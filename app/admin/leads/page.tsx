import { requireAdminAuth } from '@/lib/admin-auth'
import { queryLeads, getAllServices, type LeadStatus } from '@/lib/leads-store'
import Link from 'next/link'
import { StatusBadge } from '../page'

type SearchParams = { status?: string; service?: string; search?: string; page?: string }

export default async function LeadsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  await requireAdminAuth()
  const sp      = await searchParams
  const status  = (sp.status  ?? '') as LeadStatus | ''
  const service = sp.service  ?? ''
  const search  = sp.search   ?? ''
  const page    = parseInt(sp.page ?? '1', 10)

  const { leads, total, pages, stats } = queryLeads({
    status:  status  || undefined,
    service: service || undefined,
    search:  search  || undefined,
    page,
    limit: 30,
  })
  const services = getAllServices()

  function buildUrl(overrides: Record<string, string | number>) {
    const p = new URLSearchParams()
    if (status)  p.set('status',  status)
    if (service) p.set('service', service)
    if (search)  p.set('search',  search)
    p.set('page', String(page))
    for (const [k, v] of Object.entries(overrides)) {
      if (v === '') p.delete(k)
      else p.set(k, String(v))
    }
    return `/admin/leads?${p.toString()}`
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Form Submissions</h1>
        <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
          {stats.total} total · {stats.new} new · {stats.contacted} contacted · {stats.closed} closed
        </p>
      </div>

      {/* Filters */}
      <form method="GET" action="/admin/leads" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
        <input
          name="search"
          defaultValue={search}
          placeholder="Search name, email, company, message…"
          style={{ ...INPUT, flex: '1 1 240px' }}
        />
        <select name="status" defaultValue={status} style={{ ...INPUT, flex: '0 1 150px' }}>
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
        <select name="service" defaultValue={service} style={{ ...INPUT, flex: '0 1 200px' }}>
          <option value="">All services</option>
          {services.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input type="hidden" name="page" value="1" />
        <button type="submit" style={BTN_BLUE}>Search</button>
        {(status || service || search) && (
          <Link href="/admin/leads" style={{ ...BTN_GHOST, display: 'flex', alignItems: 'center' }}>Clear</Link>
        )}
      </form>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8ecf2', overflow: 'hidden' }}>
        {leads.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
            No submissions found. {(status || service || search) && <Link href="/admin/leads" style={{ color: '#1e5fe0' }}>Clear filters</Link>}
          </div>
        ) : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e8ecf2', background: '#f9fafb' }}>
                    {['Date & Time', 'Name', 'Email', 'Phone', 'Service', 'Source', 'Status', ''].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => (
                    <tr key={lead.id} style={{ borderBottom: '1px solid #f3f4f6', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                      <td style={{ padding: '11px 14px', color: '#6b7280', whiteSpace: 'nowrap', fontSize: 12 }}>
                        <div>{new Date(lead.createdAt).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                        <div style={{ color: '#9ca3af' }}>{new Date(lead.createdAt).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}</div>
                      </td>
                      <td style={{ padding: '11px 14px', fontWeight: 600, color: '#111827', whiteSpace: 'nowrap' }}>
                        {lead.name}
                        {lead.company && <div style={{ fontWeight: 400, fontSize: 11, color: '#9ca3af' }}>{lead.company}</div>}
                      </td>
                      <td style={{ padding: '11px 14px', color: '#374151' }}>
                        <a href={`mailto:${lead.email}`} style={{ color: '#1e5fe0', textDecoration: 'none' }}>{lead.email}</a>
                      </td>
                      <td style={{ padding: '11px 14px', color: '#374151', whiteSpace: 'nowrap' }}>
                        {lead.phone ? <a href={`tel:${lead.phone}`} style={{ color: '#374151', textDecoration: 'none' }}>{lead.phone}</a> : '—'}
                      </td>
                      <td style={{ padding: '11px 14px', color: '#374151', whiteSpace: 'nowrap' }}>{lead.service ?? '—'}</td>
                      <td style={{ padding: '11px 14px', color: '#6b7280', fontSize: 12 }}>{lead.source}</td>
                      <td style={{ padding: '11px 14px' }}><StatusBadge status={lead.status} /></td>
                      <td style={{ padding: '11px 14px', whiteSpace: 'nowrap' }}>
                        <Link href={`/admin/leads/${lead.id}`} style={{ fontSize: 12, color: '#1e5fe0', textDecoration: 'none', fontWeight: 600, padding: '4px 8px', background: '#eff4ff', borderRadius: 6 }}>
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <div style={{ padding: '14px 16px', borderTop: '1px solid #e8ecf2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: '#6b7280' }}>
                <span>Showing {(page - 1) * 30 + 1}–{Math.min(page * 30, total)} of {total}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {page > 1 && (
                    <Link href={buildUrl({ page: page - 1 })} style={PAGE_BTN}>← Prev</Link>
                  )}
                  {page < pages && (
                    <Link href={buildUrl({ page: page + 1 })} style={PAGE_BTN}>Next →</Link>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const INPUT: React.CSSProperties = {
  padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: 8,
  fontSize: 13, color: '#111827', background: '#fff', outline: 'none', minWidth: 0,
}
const BTN_BLUE: React.CSSProperties = {
  padding: '9px 18px', border: 'none', borderRadius: 8,
  background: '#1e5fe0', color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer',
}
const BTN_GHOST: React.CSSProperties = {
  padding: '9px 14px', border: '1px solid #d1d5db', borderRadius: 8,
  background: '#fff', color: '#374151', fontWeight: 500, fontSize: 13,
  cursor: 'pointer', textDecoration: 'none',
}
const PAGE_BTN: React.CSSProperties = {
  padding: '6px 12px', borderRadius: 6, border: '1px solid #d1d5db',
  background: '#fff', color: '#374151', textDecoration: 'none', fontSize: 12, fontWeight: 500,
}
