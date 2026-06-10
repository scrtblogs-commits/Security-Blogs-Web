'use client'
import { useState } from 'react'
import type { FaqItem } from '@/lib/content-store'
import { Card, CardTitle, FIELD_STYLE, LABEL_STYLE, BTN_PRIMARY, BTN_DANGER, BTN_GHOST } from '../AdminShell'

export default function FaqsEditor({ initial }: { initial: FaqItem[] }) {
  const [items,  setItems]  = useState<FaqItem[]>(initial)
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)
  const [error,  setError]  = useState('')

  function update(idx: number, k: keyof FaqItem, v: string) {
    setItems(s => s.map((x, i) => i === idx ? { ...x, [k]: v } : x))
    setSaved(false)
  }

  function remove(idx: number) {
    setItems(s => s.filter((_, i) => i !== idx))
    setSaved(false)
  }

  function addNew() {
    setItems(s => [...s, { q: '', a: '' }])
    setSaved(false)
  }

  function move(idx: number, dir: -1 | 1) {
    const arr = [...items]
    const to  = idx + dir
    if (to < 0 || to >= arr.length) return;
    [arr[idx], arr[to]] = [arr[to], arr[idx]]
    setItems(arr); setSaved(false)
  }

  async function save() {
    setSaving(true); setError(''); setSaved(false)
    const res  = await fetch('/api/admin/content/faqs', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items),
    })
    const json = await res.json()
    setSaving(false)
    if (json.ok) setSaved(true)
    else setError(json.error ?? 'Save failed')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {items.map((item, i) => (
        <Card key={i}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <CardTitle>FAQ #{i + 1}</CardTitle>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => move(i, -1)} disabled={i === 0} style={{ ...BTN_GHOST, padding: '4px 10px', fontSize: 14 }}>↑</button>
              <button onClick={() => move(i, 1)} disabled={i === items.length - 1} style={{ ...BTN_GHOST, padding: '4px 10px', fontSize: 14 }}>↓</button>
              <button onClick={() => remove(i)} style={BTN_DANGER}>Remove</button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={LABEL_STYLE}>Question</label>
              <input value={item.q} onChange={e => update(i, 'q', e.target.value)} style={FIELD_STYLE} placeholder="What is…" />
            </div>
            <div>
              <label style={LABEL_STYLE}>Answer</label>
              <textarea value={item.a} onChange={e => update(i, 'a', e.target.value)} rows={3} style={{ ...FIELD_STYLE, resize: 'vertical' }} />
            </div>
          </div>
        </Card>
      ))}

      <button onClick={addNew} style={{ ...BTN_GHOST, alignSelf: 'flex-start', fontWeight: 600, borderStyle: 'dashed' }}>
        + Add FAQ
      </button>

      {error && <div style={{ color: '#b91c1c', fontSize: 13 }}>{error}</div>}

      <div>
        <button onClick={save} disabled={saving} style={BTN_PRIMARY}>
          {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save FAQs'}
        </button>
        {saved && <span style={{ marginLeft: 12, fontSize: 13, color: '#15803d', fontWeight: 500 }}>Changes saved.</span>}
      </div>
    </div>
  )
}
