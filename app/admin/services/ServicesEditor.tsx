'use client'
import { useState } from 'react'
import type { ServiceItem } from '@/lib/content-store'
import { Card, FIELD_STYLE, LABEL_STYLE, BTN_PRIMARY, SavedBanner, ErrorBanner } from '../AdminShell'

export default function ServicesEditor({ initial }: { initial: ServiceItem[] }) {
  const [items,  setItems]  = useState(initial)
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)
  const [error,  setError]  = useState('')

  function update(idx: number, k: keyof ServiceItem, v: string) {
    setItems(s => s.map((x, i) => i === idx ? { ...x, [k]: v } : x)); setSaved(false)
  }

  async function save() {
    setSaving(true); setError(''); setSaved(false)
    const res  = await fetch('/api/admin/content/services', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items) })
    const json = await res.json()
    setSaving(false)
    if (json.ok) setSaved(true); else setError(json.error ?? 'Save failed')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 16 }}>
        {items.map((svc, i) => (
          <Card key={svc.slug}>
            {/* Service header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, paddingBottom: 16, borderBottom: '1px solid #f1f5f9' }}>
              <div style={{
                width: 46, height: 46, borderRadius: 12,
                background: svc.color + '18',
                border: `2px solid ${svc.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, flexShrink: 0,
              }}>
                {svc.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{svc.title}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace', marginTop: 2 }}>/services/{svc.slug}/</div>
              </div>
              <div style={{ padding: '4px 10px', borderRadius: 6, background: '#f1f5f9', fontSize: 11, color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>
                SLUG LOCKED
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px' }}>
              <div>
                <label style={LABEL_STYLE}>Title</label>
                <input value={svc.title} onChange={e => update(i, 'title', e.target.value)} style={FIELD_STYLE} />
              </div>
              <div>
                <label style={LABEL_STYLE}>Icon Emoji</label>
                <input value={svc.icon} onChange={e => update(i, 'icon', e.target.value)} style={{ ...FIELD_STYLE, fontSize: 20, textAlign: 'center' }} maxLength={4} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={LABEL_STYLE}>Accent Colour</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="color" value={svc.color} onChange={e => update(i, 'color', e.target.value)}
                    style={{ width: 44, height: 38, border: '1.5px solid #e2e8f0', borderRadius: 8, padding: 3, cursor: 'pointer', background: '#fff' }} />
                  <input value={svc.color} onChange={e => update(i, 'color', e.target.value)} style={{ ...FIELD_STYLE, flex: 1, fontFamily: 'monospace' }} placeholder="#000000" />
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: svc.color, flexShrink: 0, border: '1.5px solid rgba(0,0,0,0.1)' }} />
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

      <ErrorBanner msg={error} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={save} disabled={saving} style={{ ...BTN_PRIMARY, opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving…' : '💾 Save Services'}
        </button>
        <SavedBanner show={saved} />
      </div>
    </div>
  )
}
