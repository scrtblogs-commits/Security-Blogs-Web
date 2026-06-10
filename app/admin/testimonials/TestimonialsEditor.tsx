'use client'
import { useState } from 'react'
import type { TestimonialItem } from '@/lib/content-store'
import { Card, CardTitle, FIELD_STYLE, LABEL_STYLE, BTN_PRIMARY, BTN_DANGER, BTN_GHOST } from '../AdminShell'

export default function TestimonialsEditor({ initial }: { initial: TestimonialItem[] }) {
  const [items,  setItems]  = useState<TestimonialItem[]>(initial)
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)
  const [error,  setError]  = useState('')

  function update(idx: number, k: keyof TestimonialItem, v: string | number) {
    setItems(s => s.map((x, i) => i === idx ? { ...x, [k]: v } : x))
    setSaved(false)
  }

  function remove(idx: number) {
    setItems(s => s.filter((_, i) => i !== idx)); setSaved(false)
  }

  function addNew() {
    setItems(s => [...s, { name: '', role: '', avatar: '', text: '', rating: 5 }]); setSaved(false)
  }

  async function save() {
    setSaving(true); setError(''); setSaved(false)
    const res  = await fetch('/api/admin/content/testimonials', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items),
    })
    const json = await res.json()
    setSaving(false)
    if (json.ok) setSaved(true)
    else setError(json.error ?? 'Save failed')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 16 }}>
        {items.map((item, i) => (
          <Card key={i}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', background: '#1e5fe0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 13, fontWeight: 700,
                }}>
                  {item.avatar || '?'}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{item.name || 'New Testimonial'}</span>
              </div>
              <button onClick={() => remove(i)} style={BTN_DANGER}>Remove</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 14px' }}>
              <div>
                <label style={LABEL_STYLE}>Name</label>
                <input value={item.name} onChange={e => update(i, 'name', e.target.value)} style={FIELD_STYLE} placeholder="James R." />
              </div>
              <div>
                <label style={LABEL_STYLE}>Role / Company</label>
                <input value={item.role} onChange={e => update(i, 'role', e.target.value)} style={FIELD_STYLE} placeholder="CEO, ExampleCo" />
              </div>
              <div>
                <label style={LABEL_STYLE}>Avatar Initials</label>
                <input value={item.avatar} onChange={e => update(i, 'avatar', e.target.value)} style={FIELD_STYLE} placeholder="JR" maxLength={3} />
              </div>
              <div>
                <label style={LABEL_STYLE}>Star Rating</label>
                <select value={item.rating} onChange={e => update(i, 'rating', Number(e.target.value))} style={FIELD_STYLE}>
                  {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} stars</option>)}
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={LABEL_STYLE}>Testimonial Text</label>
                <textarea value={item.text} onChange={e => update(i, 'text', e.target.value)} rows={3} style={{ ...FIELD_STYLE, resize: 'vertical' }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <button onClick={addNew} style={{ ...BTN_GHOST, alignSelf: 'flex-start', fontWeight: 600, borderStyle: 'dashed' }}>
        + Add Testimonial
      </button>

      {error && <div style={{ color: '#b91c1c', fontSize: 13 }}>{error}</div>}

      <div>
        <button onClick={save} disabled={saving} style={BTN_PRIMARY}>
          {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Testimonials'}
        </button>
        {saved && <span style={{ marginLeft: 12, fontSize: 13, color: '#15803d', fontWeight: 500 }}>Changes saved.</span>}
      </div>
    </div>
  )
}
