'use client'
import { useState } from 'react'
import type { TestimonialItem } from '@/lib/content-store'
import { Card, FIELD_STYLE, LABEL_STYLE, BTN_PRIMARY, BTN_DANGER, BTN_GHOST, SavedBanner, ErrorBanner } from '../AdminShell'

const AVATAR_COLORS = ['#1e5fe0','#059669','#d97706','#7c3aed','#dc2626','#0891b2']

export default function TestimonialsEditor({ initial }: { initial: TestimonialItem[] }) {
  const [items,  setItems]  = useState(initial)
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)
  const [error,  setError]  = useState('')

  function update(idx: number, k: keyof TestimonialItem, v: string | number) {
    setItems(s => s.map((x, i) => i === idx ? { ...x, [k]: v } : x)); setSaved(false)
  }

  async function save() {
    setSaving(true); setError(''); setSaved(false)
    const res  = await fetch('/api/admin/content/testimonials', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items) })
    const json = await res.json()
    setSaving(false)
    if (json.ok) setSaved(true); else setError(json.error ?? 'Save failed')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 16 }}>
        {items.map((item, i) => (
          <Card key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%',
                background: AVATAR_COLORS[i % AVATAR_COLORS.length],
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 14, fontWeight: 700, flexShrink: 0,
              }}>
                {item.avatar || '?'}
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.name || 'New Testimonial'}
                </div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{item.role || 'Role, Company'}</div>
              </div>
              <button onClick={() => { setItems(s => s.filter((_, j) => j !== i)); setSaved(false) }} style={BTN_DANGER}>
                ✕
              </button>
            </div>

            {/* Star rating preview */}
            <div style={{ marginBottom: 14, display: 'flex', gap: 3 }}>
              {[1,2,3,4,5].map(n => (
                <span key={n} style={{ fontSize: 16, cursor: 'pointer', color: n <= item.rating ? '#f59e0b' : '#e2e8f0' }}
                  onClick={() => update(i, 'rating', n)}>
                  ★
                </span>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 14px' }}>
              <div>
                <label style={LABEL_STYLE}>Name</label>
                <input value={item.name} onChange={e => update(i, 'name', e.target.value)} style={FIELD_STYLE} placeholder="James R." />
              </div>
              <div>
                <label style={LABEL_STYLE}>Initials</label>
                <input value={item.avatar} onChange={e => update(i, 'avatar', e.target.value)} style={FIELD_STYLE} maxLength={3} placeholder="JR" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={LABEL_STYLE}>Role / Company</label>
                <input value={item.role} onChange={e => update(i, 'role', e.target.value)} style={FIELD_STYLE} placeholder="CEO, Example Co" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={LABEL_STYLE}>Testimonial Text</label>
                <textarea value={item.text} onChange={e => update(i, 'text', e.target.value)} rows={3} style={{ ...FIELD_STYLE, resize: 'vertical' }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <button onClick={() => { setItems(s => [...s, { name: '', role: '', avatar: '', text: '', rating: 5 }]); setSaved(false) }}
        style={{ ...BTN_GHOST, alignSelf: 'flex-start', borderStyle: 'dashed', fontWeight: 600 }}>
        + Add Testimonial
      </button>

      <ErrorBanner msg={error} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={save} disabled={saving} style={{ ...BTN_PRIMARY, opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving…' : '💾 Save Testimonials'}
        </button>
        <SavedBanner show={saved} />
      </div>
    </div>
  )
}
