'use client'
import { useState } from 'react'
import type { ServiceItem } from '@/lib/content-store'
import { Card, CardTitle, FIELD_STYLE, LABEL_STYLE, BTN_PRIMARY } from '../AdminShell'

export default function ServicesEditor({ initial }: { initial: ServiceItem[] }) {
  const [items,  setItems]  = useState<ServiceItem[]>(initial)
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)
  const [error,  setError]  = useState('')

  function update(idx: number, k: keyof ServiceItem, v: string) {
    setItems(s => s.map((x, i) => i === idx ? { ...x, [k]: v } : x))
    setSaved(false)
  }

  async function save() {
    setSaving(true); setError(''); setSaved(false)
    const res  = await fetch('/api/admin/content/services', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items),
    })
    const json = await res.json()
    setSaving(false)
    if (json.ok) setSaved(true)
    else setError(json.error ?? 'Save failed')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 16 }}>
        {items.map((svc, i) => (
          <Card key={svc.slug}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: svc.color + '22', border: `2px solid ${svc.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }}>
                {svc.icon}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>{svc.title}</div>
                <div style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'monospace' }}>/{svc.slug}/</div>
              </div>
              <div style={{
                marginLeft: 'auto', padding: '3px 8px', borderRadius: 6,
                background: '#f3f4f6', fontSize: 11, color: '#6b7280', fontWeight: 600,
              }}>
                Slug locked
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 14px' }}>
              <div>
                <label style={LABEL_STYLE}>Service Title</label>
                <input value={svc.title} onChange={e => update(i, 'title', e.target.value)} style={FIELD_STYLE} />
              </div>
              <div>
                <label style={LABEL_STYLE}>Icon (emoji)</label>
                <input value={svc.icon} onChange={e => update(i, 'icon', e.target.value)} style={FIELD_STYLE} maxLength={4} />
              </div>
              <div>
                <label style={LABEL_STYLE}>Accent Colour</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="color" value={svc.color} onChange={e => update(i, 'color', e.target.value)}
                    style={{ width: 40, height: 36, border: '1px solid #d1d5db', borderRadius: 6, padding: 2, cursor: 'pointer' }} />
                  <input value={svc.color} onChange={e => update(i, 'color', e.target.value)}
                    style={{ ...FIELD_STYLE, flex: 1 }} placeholder="#000000" />
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={LABEL_STYLE}>Short Description</label>
                <textarea value={svc.desc} onChange={e => update(i, 'desc', e.target.value)} rows={2} style={{ ...FIELD_STYLE, resize: 'vertical' }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {error && <div style={{ color: '#b91c1c', fontSize: 13 }}>{error}</div>}

      <div>
        <button onClick={save} disabled={saving} style={BTN_PRIMARY}>
          {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Services'}
        </button>
        {saved && <span style={{ marginLeft: 12, fontSize: 13, color: '#15803d', fontWeight: 500 }}>Changes saved.</span>}
      </div>
    </div>
  )
}
