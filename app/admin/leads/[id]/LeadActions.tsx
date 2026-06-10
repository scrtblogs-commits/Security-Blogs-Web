'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { LeadStatus } from '@/lib/leads-store'

export default function LeadActions({
  id, currentStatus, currentNotes,
}: {
  id: string
  currentStatus: LeadStatus
  currentNotes: string
}) {
  const router = useRouter()
  const [status, setStatus] = useState<LeadStatus>(currentStatus)
  const [notes,  setNotes]  = useState(currentNotes)
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState('')

  async function save() {
    setSaving(true); setSaved(false); setError('')
    const res  = await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes }),
    })
    const json = await res.json()
    setSaving(false)
    if (json.ok) { setSaved(true); router.refresh() }
    else setError(json.error ?? 'Save failed')
  }

  async function doDelete() {
    setDeleting(true)
    await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' })
    router.push('/admin/leads')
  }

  return (
    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8ecf2', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2 style={{ fontSize: 13, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Actions & Notes</h2>

      {/* Status */}
      <div>
        <label style={LBL}>Status</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['new', 'contacted', 'closed'] as LeadStatus[]).map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              style={{
                padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', border: '2px solid',
                borderColor: status === s ? STATUS_COLORS[s] : '#e5e7eb',
                background:   status === s ? STATUS_BG[s]    : '#fff',
                color:        status === s ? STATUS_COLORS[s] : '#6b7280',
                transition: 'all 0.12s',
                textTransform: 'capitalize',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label style={LBL}>Internal Notes (not visible to the user)</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={4}
          placeholder="Add private notes about this lead…"
          style={{ width: '100%', padding: '10px 13px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, color: '#111827', resize: 'vertical', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
        />
      </div>

      {error && <div style={{ color: '#b91c1c', fontSize: 13 }}>{error}</div>}

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          onClick={save}
          disabled={saving}
          style={{ padding: '10px 22px', borderRadius: 8, border: 'none', background: '#1e5fe0', color: '#fff', fontWeight: 700, fontSize: 14, cursor: saving ? 'default' : 'pointer' }}
        >
          {saving ? 'Saving…' : saved ? '✓ Saved' : 'Save Changes'}
        </button>

        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #fecaca', background: '#fef2f2', color: '#b91c1c', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
          >
            Delete Submission
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#b91c1c', fontWeight: 600 }}>Are you sure?</span>
            <button onClick={doDelete} disabled={deleting} style={{ padding: '8px 14px', borderRadius: 7, border: 'none', background: '#b91c1c', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
              {deleting ? 'Deleting…' : 'Yes, delete'}
            </button>
            <button onClick={() => setConfirmDelete(false)} style={{ padding: '8px 12px', borderRadius: 7, border: '1px solid #d1d5db', background: '#fff', color: '#374151', fontSize: 12, cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const LBL: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }
const STATUS_COLORS: Record<string, string> = { new: '#15803d', contacted: '#b45309', closed: '#475569' }
const STATUS_BG:     Record<string, string> = { new: '#dcfce7', contacted: '#fef9c3', closed: '#f1f5f9' }
