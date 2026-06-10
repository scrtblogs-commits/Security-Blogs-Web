'use client'
import { useState } from 'react'
import type { PricingSection, PricingPlan } from '@/lib/content-store'
import { Card, CardTitle, FIELD_STYLE, LABEL_STYLE, BTN_PRIMARY, BTN_DANGER, BTN_GHOST } from '../AdminShell'

export default function PricingEditor({ initial }: { initial: PricingSection[] }) {
  const [sections, setSections] = useState<PricingSection[]>(initial)
  const [saving,   setSaving]   = useState(false)
  const [saved,    setSaved]    = useState(false)
  const [error,    setError]    = useState('')
  const [openSec,  setOpenSec]  = useState<string | null>(sections[0]?.id ?? null)

  function updatePlan(secIdx: number, planIdx: number, k: keyof PricingPlan, v: unknown) {
    setSections(s => s.map((sec, si) => si !== secIdx ? sec : {
      ...sec,
      plans: sec.plans.map((p, pi) => pi !== planIdx ? p : { ...p, [k]: v }),
    }))
    setSaved(false)
  }

  function updateFeature(secIdx: number, planIdx: number, featIdx: number, v: string) {
    setSections(s => s.map((sec, si) => si !== secIdx ? sec : {
      ...sec,
      plans: sec.plans.map((p, pi) => pi !== planIdx ? p : {
        ...p,
        features: p.features.map((f, fi) => fi !== featIdx ? f : v),
      }),
    }))
    setSaved(false)
  }

  function addFeature(secIdx: number, planIdx: number) {
    setSections(s => s.map((sec, si) => si !== secIdx ? sec : {
      ...sec,
      plans: sec.plans.map((p, pi) => pi !== planIdx ? p : { ...p, features: [...p.features, ''] }),
    }))
    setSaved(false)
  }

  function removeFeature(secIdx: number, planIdx: number, featIdx: number) {
    setSections(s => s.map((sec, si) => si !== secIdx ? sec : {
      ...sec,
      plans: sec.plans.map((p, pi) => pi !== planIdx ? p : {
        ...p,
        features: p.features.filter((_, fi) => fi !== featIdx),
      }),
    }))
    setSaved(false)
  }

  async function save() {
    setSaving(true); setError(''); setSaved(false)
    const res  = await fetch('/api/admin/content/pricing', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sections),
    })
    const json = await res.json()
    setSaving(false)
    if (json.ok) setSaved(true)
    else setError(json.error ?? 'Save failed')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {sections.map((sec, si) => (
        <div key={sec.id} style={{ border: '1px solid #e8ecf2', borderRadius: 14, overflow: 'hidden', background: '#fff' }}>
          {/* Section header */}
          <button
            onClick={() => setOpenSec(openSec === sec.id ? null : sec.id)}
            style={{
              width: '100%', padding: '16px 22px', background: openSec === sec.id ? '#f8f9fb' : '#fff',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderBottom: openSec === sec.id ? '1px solid #e8ecf2' : 'none',
            }}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>{sec.label}</div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 1 }}>{sec.plans.length} plans</div>
            </div>
            <span style={{ color: '#6b7280', fontSize: 18 }}>{openSec === sec.id ? '▲' : '▼'}</span>
          </button>

          {openSec === sec.id && (
            <div style={{ padding: '18px 22px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {sec.plans.map((plan, pi) => (
                <div key={pi} style={{
                  border: plan.featured ? '2px solid #1e5fe0' : '1px solid #e8ecf2',
                  borderRadius: 12, padding: '16px',
                  background: plan.featured ? '#f8fbff' : '#fafafa',
                }}>
                  {plan.featured && (
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#1e5fe0', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      ★ Featured Plan
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <div>
                        <label style={LABEL_STYLE}>Plan Name</label>
                        <input value={plan.name} onChange={e => updatePlan(si, pi, 'name', e.target.value)} style={FIELD_STYLE} />
                      </div>
                      <div>
                        <label style={LABEL_STYLE}>Price</label>
                        <input value={plan.price} onChange={e => updatePlan(si, pi, 'price', e.target.value)} style={FIELD_STYLE} />
                      </div>
                      <div>
                        <label style={LABEL_STYLE}>Period (eg /month)</label>
                        <input value={plan.period ?? ''} onChange={e => updatePlan(si, pi, 'period', e.target.value)} style={FIELD_STYLE} placeholder="/month" />
                      </div>
                      <div>
                        <label style={LABEL_STYLE}>Badge Text</label>
                        <input value={plan.badge ?? ''} onChange={e => updatePlan(si, pi, 'badge', e.target.value)} style={FIELD_STYLE} placeholder="⭐ Most Popular" />
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={LABEL_STYLE}>CTA Button Text</label>
                        <input value={plan.cta} onChange={e => updatePlan(si, pi, 'cta', e.target.value)} style={FIELD_STYLE} />
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={LABEL_STYLE}>CTA URL</label>
                        <input value={plan.ctaHref} onChange={e => updatePlan(si, pi, 'ctaHref', e.target.value)} style={FIELD_STYLE} />
                      </div>
                      <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input
                          type="checkbox" id={`feat-${si}-${pi}`}
                          checked={!!plan.featured}
                          onChange={e => updatePlan(si, pi, 'featured', e.target.checked)}
                        />
                        <label htmlFor={`feat-${si}-${pi}`} style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Mark as featured plan</label>
                      </div>
                    </div>

                    <div>
                      <label style={LABEL_STYLE}>Features</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {plan.features.map((feat, fi) => (
                          <div key={fi} style={{ display: 'flex', gap: 6 }}>
                            <input value={feat} onChange={e => updateFeature(si, pi, fi, e.target.value)} style={{ ...FIELD_STYLE, flex: 1 }} />
                            <button onClick={() => removeFeature(si, pi, fi)} style={{ ...BTN_DANGER, padding: '8px 10px', flexShrink: 0 }}>×</button>
                          </div>
                        ))}
                        <button onClick={() => addFeature(si, pi)} style={{ ...BTN_GHOST, fontSize: 12, borderStyle: 'dashed' }}>+ Add feature</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {error && <div style={{ color: '#b91c1c', fontSize: 13 }}>{error}</div>}

      <div style={{ marginTop: 8 }}>
        <button onClick={save} disabled={saving} style={BTN_PRIMARY}>
          {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save All Pricing'}
        </button>
        {saved && <span style={{ marginLeft: 12, fontSize: 13, color: '#15803d', fontWeight: 500 }}>Changes saved.</span>}
      </div>
    </div>
  )
}
