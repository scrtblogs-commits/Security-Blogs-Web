import { requireAdminAuth } from '@/lib/admin-auth'
import { getLead } from '@/lib/leads-store'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import LeadActions from './LeadActions'
import { StatusBadge } from '../../page'

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminAuth()
  const { id } = await params
  const lead   = getLead(id)
  if (!lead) notFound()

  const createdAt  = new Date(lead.createdAt)
  const updatedAt  = new Date(lead.updatedAt)

  return (
    <div style={{ padding: '28px 32px', maxWidth: 860 }}>
      {/* Back */}
      <Link href="/admin/leads" style={{ fontSize: 13, color: '#6b7280', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 20 }}>
        ← Back to Submissions
      </Link>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>{lead.name}</h1>
          <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
            Submitted {createdAt.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} at {createdAt.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Contact details */}
        <div style={{ gridColumn: '1 / -1', background: '#fff', borderRadius: 14, border: '1px solid #e8ecf2', padding: '20px 24px' }}>
          <h2 style={SECTION_HEAD}>Contact Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
            <Field label="Name"    value={lead.name} />
            <Field label="Email"   value={<a href={`mailto:${lead.email}`} style={{ color: '#1e5fe0', textDecoration: 'none' }}>{lead.email}</a>} />
            <Field label="Phone"   value={lead.phone   ? <a href={`tel:${lead.phone}`}   style={{ color: '#1e5fe0', textDecoration: 'none' }}>{lead.phone}</a>   : undefined} />
            <Field label="Company" value={lead.company} />
            <Field label="Service" value={lead.service} />
            <Field label="Source"  value={lead.source}  />
          </div>
        </div>

        {/* Message */}
        {lead.message && (
          <div style={{ gridColumn: '1 / -1', background: '#fff', borderRadius: 14, border: '1px solid #e8ecf2', padding: '20px 24px' }}>
            <h2 style={SECTION_HEAD}>Message</h2>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap' }}>{lead.message}</p>
          </div>
        )}

        {/* Actions (client component — status change + notes) */}
        <div style={{ gridColumn: '1 / -1' }}>
          <LeadActions id={lead.id} currentStatus={lead.status} currentNotes={lead.notes ?? ''} />
        </div>

        {/* Meta */}
        <div style={{ gridColumn: '1 / -1', background: '#f9fafb', borderRadius: 14, border: '1px solid #e8ecf2', padding: '16px 24px' }}>
          <h2 style={{ ...SECTION_HEAD, color: '#9ca3af' }}>Technical Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', fontSize: 12 }}>
            <MetaField label="Lead ID"      value={lead.id} />
            <MetaField label="IP Address"   value={lead.ip} />
            <MetaField label="Last updated" value={updatedAt.toLocaleString('en-AU')} />
            <MetaField label="User Agent"   value={lead.userAgent} truncate />
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 14, color: '#111827', fontWeight: 500 }}>{value ?? <span style={{ color: '#d1d5db' }}>—</span>}</div>
    </div>
  )
}

function MetaField({ label, value, truncate }: { label: string; value?: string; truncate?: boolean }) {
  return (
    <div>
      <span style={{ color: '#9ca3af', fontWeight: 600 }}>{label}: </span>
      <span style={{ color: '#6b7280', ...(truncate ? { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block', maxWidth: 300, verticalAlign: 'bottom' } : {}) }}>
        {value ?? '—'}
      </span>
    </div>
  )
}

const SECTION_HEAD: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14, marginTop: 0 }
