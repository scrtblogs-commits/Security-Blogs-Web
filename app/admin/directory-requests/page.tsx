'use client'
import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

type Request = {
  id: string
  name: string
  email: string
  company: string
  purpose: string
  createdAt: string
  status: 'pending' | 'approved' | 'rejected'
  approvedAt?: string
  rejectedAt?: string
}

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  pending:  { bg: '#fef9c3', color: '#854d0e', label: 'Pending' },
  approved: { bg: '#dcfce7', color: '#166534', label: 'Approved' },
  rejected: { bg: '#fee2e2', color: '#991b1b', label: 'Rejected' },
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  } catch { return iso }
}

function AdminPanel({ adminKey }: { adminKey: string }) {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 4000)
  }

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/directory-access/requests?key=${encodeURIComponent(adminKey)}`)
      const data = await res.json()
      if (!data.ok) { setError(data.error || 'Failed to load'); return }
      setRequests(data.requests || [])
    } catch {
      setError('Network error. Check your connection.')
    } finally {
      setLoading(false)
    }
  }, [adminKey])

  useEffect(() => { load() }, [load])

  const act = async (id: string, action: 'approve' | 'reject') => {
    setActionLoading(id + action)
    try {
      const res = await fetch('/api/directory-access/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: adminKey, id, action }),
      })
      const data = await res.json()
      if (data.ok) {
        showToast(action === 'approve' ? 'Request approved — approval email sent.' : 'Request rejected — notification sent.', true)
        // Update local state immediately
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action === 'approve' ? 'approved' : 'rejected' } : r))
      } else {
        showToast(data.error || 'Action failed.', false)
      }
    } catch {
      showToast('Network error.', false)
    } finally {
      setActionLoading(null)
    }
  }

  const shown = requests.filter(r => filter === 'all' || r.status === filter)
  const counts = {
    all: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 24, right: 24, zIndex: 9999,
          background: toast.ok ? '#16a34a' : '#dc2626',
          color: '#fff', padding: '12px 20px', borderRadius: 12,
          fontSize: 14, fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          maxWidth: 360,
        }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ background: '#0f172a', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#60a5fa', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
            SecurityBlogs Admin
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}>
            Directory Access Requests
          </h1>
        </div>
        <button
          onClick={load}
          style={{ padding: '9px 18px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          ↺ Refresh
        </button>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {(['all', 'pending', 'approved', 'rejected'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                background: filter === s ? '#0f172a' : '#fff',
                color: filter === s ? '#fff' : '#0f172a',
                border: `1px solid ${filter === s ? '#0f172a' : '#e2e8f0'}`,
                borderRadius: 14, padding: '16px 20px',
                textAlign: 'left', cursor: 'pointer',
                boxShadow: filter === s ? '0 4px 16px rgba(0,0,0,0.12)' : '0 1px 4px rgba(0,0,0,0.04)',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 900, lineHeight: 1 }}>{counts[s]}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: filter === s ? 'rgba(255,255,255,0.7)' : '#64748b', marginTop: 4, textTransform: 'capitalize' }}>{s === 'all' ? 'Total Requests' : s}</div>
            </button>
          ))}
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b', fontSize: 16 }}>
            Loading requests...
          </div>
        )}

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '16px 20px', color: '#dc2626', marginBottom: 20 }}>
            {error}
          </div>
        )}

        {!loading && !error && shown.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
            <p style={{ fontSize: 16, fontWeight: 500 }}>{filter === 'all' ? 'No requests yet.' : `No ${filter} requests.`}</p>
          </div>
        )}

        {!loading && shown.length > 0 && (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden' }}>

            {/* Table header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '180px 200px 180px 1fr 140px 100px 200px',
              gap: 0, padding: '12px 20px',
              background: '#f8fafc', borderBottom: '1px solid #e2e8f0',
              fontSize: 11, fontWeight: 700, color: '#94a3b8',
              textTransform: 'uppercase', letterSpacing: '0.07em',
            }}>
              <div>Name</div>
              <div>Email</div>
              <div>Company</div>
              <div>Purpose</div>
              <div>Date</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            {/* Rows */}
            {shown.map((r, i) => {
              const s = STATUS_COLORS[r.status] || STATUS_COLORS.pending
              const isLast = i === shown.length - 1
              return (
                <div
                  key={r.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '180px 200px 180px 1fr 140px 100px 200px',
                    gap: 0, padding: '14px 20px',
                    borderBottom: isLast ? 'none' : '1px solid #f1f5f9',
                    alignItems: 'center',
                    background: r.status === 'pending' ? '#fffbeb' : '#fff',
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', paddingRight: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {r.name}
                  </div>
                  <div style={{ fontSize: 13, color: '#475569', paddingRight: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {r.email}
                  </div>
                  <div style={{ fontSize: 13, color: '#475569', paddingRight: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {r.company}
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', paddingRight: 12 }}>
                    {r.purpose}
                  </div>
                  <div style={{ fontSize: 12, color: '#94a3b8', paddingRight: 12, whiteSpace: 'nowrap' }}>
                    {formatDate(r.createdAt)}
                  </div>
                  <div>
                    <span style={{
                      display: 'inline-block', fontSize: 11, fontWeight: 700,
                      background: s.bg, color: s.color,
                      padding: '4px 10px', borderRadius: 20,
                    }}>
                      {s.label}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {r.status === 'pending' && (
                      <>
                        <button
                          onClick={() => act(r.id, 'approve')}
                          disabled={actionLoading === r.id + 'approve'}
                          style={{
                            padding: '7px 14px', background: '#16a34a', color: '#fff',
                            border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700,
                            cursor: 'pointer', opacity: actionLoading === r.id + 'approve' ? 0.6 : 1,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {actionLoading === r.id + 'approve' ? '...' : '✓ Approve'}
                        </button>
                        <button
                          onClick={() => act(r.id, 'reject')}
                          disabled={actionLoading === r.id + 'reject'}
                          style={{
                            padding: '7px 14px', background: '#fee2e2', color: '#dc2626',
                            border: '1px solid #fecaca', borderRadius: 8, fontSize: 12, fontWeight: 700,
                            cursor: 'pointer', opacity: actionLoading === r.id + 'reject' ? 0.6 : 1,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {actionLoading === r.id + 'reject' ? '...' : '✕ Reject'}
                        </button>
                      </>
                    )}
                    {r.status === 'approved' && (
                      <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>
                        ✓ Approved {r.approvedAt ? formatDate(r.approvedAt) : ''}
                      </span>
                    )}
                    {r.status === 'rejected' && (
                      <span style={{ fontSize: 12, color: '#dc2626', fontWeight: 600 }}>
                        ✕ Rejected
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function KeyGate() {
  const params = useSearchParams()
  const [key, setKey] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const k = params.get('key')
    if (k) setKey(k)
  }, [params])

  if (key !== null) return <AdminPanel adminKey={key} />

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: '48px 40px', maxWidth: 400, width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🔐</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Admin Access</h2>
        <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>Enter your admin key to continue.</p>
        <form onSubmit={e => { e.preventDefault(); if (input.trim()) setKey(input.trim()); else setError(true) }}
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="password" placeholder="Admin key" value={input}
            onChange={e => { setInput(e.target.value); setError(false) }}
            style={{ padding: '13px 16px', border: `1.5px solid ${error ? '#dc2626' : '#e2e8f0'}`, borderRadius: 10, fontSize: 15, outline: 'none' }}
          />
          {error && <div style={{ fontSize: 12, color: '#dc2626' }}>Key is required.</div>}
          <button type="submit" style={{ padding: '13px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}

export default function DirectoryRequestsPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ fontSize: 16, color: '#64748b' }}>Loading...</div>
      </div>
    }>
      <KeyGate />
    </Suspense>
  )
}
