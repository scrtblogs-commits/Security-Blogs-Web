'use client'
import { useState } from 'react'
import type { PricingSection, PricingPlan } from '@/lib/content-store'
import { Card, FIELD_STYLE, LABEL_STYLE, BTN_PRIMARY, BTN_DANGER, BTN_GHOST, SavedBanner, ErrorBanner } from '../AdminShell'

export default function PricingEditor({ initial }: { initial: PricingSection[] }) {
  const [sections, setSections] = useState(initial)
  const [saving,   setSaving]   = useState(false)
  const [saved,    setSaved]    = useState(false)
  const [error,    setError]    = useState('')
  const [openSec,  setOpenSec]  = useState<string | null>(initial[0]?.id ?? null)

  function updatePlan(si: number, pi: number, k: keyof PricingPlan, v: unknown) {
    setSections(s => s.map((sec, i) => i !== si ? sec : {
      ...sec, plans: sec.plans.map((p, j) => j !== pi ? p : { ...p, [k]: v }),
    })); setSaved(false)
  }

  function updateFeature(si: number, pi: number, fi: number, v: string) {
    setSections(s => s.map((sec, i) => i !== si ? sec : {
      ...sec, plans: sec.plans.map((p, j) => j !== pi ? p : {
        ...p, features: p.features.map((f, k) => k !== fi ? f : v),
      }),
    })); setSaved(false)
  }

  function addFeature(si: number, pi: number) {
    setSections(s => s.map((sec, i) => i !== si ? sec : {
      ...sec, plans: sec.plans.map((p, j) => j !== pi ? p : { ...p, features: [...p.features, ''] }),
    })); setSaved(false)
  }

  function removeFeature(si: number, pi: number, fi: number) {
    setSections(s => s.map((sec, i) => i !== si ? sec : {
      ...sec, plans: sec.plans.map((p, j) => j !== pi ? p : {
        ...p, features: p.features.filter((_, k) => k !== fi),
      }),
    })); setSaved(false)
  }

  async function save() {
    setSaving(true); setError(''); setSaved(false)
    const res  = await fetch('/api/admin/content/pricing', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sections) })
    const json = await res.json()
    setSaving(false)
    if (json.ok) setSaved(true); else setError(json.error ?? 'Save failed')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {sections.map((sec, si) => {
        const open = openSec === sec.id
        return (
          <div key={sec.id} style={{ border: '1.5px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: '#fff', boxShadow: '0 1px 4px rgba(15,23,42,0.03)' }}>
            {/* Section accordion header */}
            <button
              onClick={() => setOpenSec(open ? null : sec.id)}
              style={{
                width: '100%', padding: '16px 22px', background: open ? '#f8fafc' : '#fff',
                border: 'none', cursor: 'pointer', textAlign: 'left',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: open ? '1.5px solid #e2e8f0' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: open ? '#1e5fe0' : '#cbd5e1' }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{sec.label}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 1 }}>{sec.plans.length} pricing plan{sec.plans.length !== 1 ? 's' : ''}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {open && <span style={{ fontSize: 11, fontWeight: 700, color: '#1e5fe0', background: '#eff4ff', padding: '3px 8px', borderRadius: 5 }}>EDITING</span>}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                  <polyline points={open ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
                </svg>
              </div>
            </button>

            {open && (
              <div style={{ padding: '20px 22px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {sec.plans.map((plan, pi) => (
                  <div key={pi} style={{
                    border: plan.featured ? '2px solid #1e5fe0' : '1.5px solid #e2e8f0',
                    borderRadius: 12, padding: '16px',
                    background: plan.featured ? '#f0f6ff' : '#fafafa',
                    position: 'relative',
                  }}>
                    {plan.featured && (
                      <div style={{ position: 'absolute', top: -11, left: 14, background: '#1e5fe0', color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 99, letterSpacing: '0.06em' }}>
                        FEATURED
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
                          <input value={plan.price} onChange={e => updatePlan(si, pi, 'price', e.target.value)} style={{ ...FIELD_STYLE, fontWeight: 700 }} />
                        </div>
                        <div>
                          <label style={LABEL_STYLE}>Period</label>
                          <input value={plan.period ?? ''} onChange={e => updatePlan(si, pi, 'period', e.target.value)} style={FIELD_STYLE} placeholder="/month" />
                        </div>
                        <div>
                          <label style={LABEL_STYLE}>Badge</label>
                          <input value={plan.badge ?? ''} onChange={e => updatePlan(si, pi, 'badge', e.target.value)} style={FIELD_STYLE} placeholder="⭐ Popular" />
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                          <label style={LABEL_STYLE}>CTA Button</label>
                          <input value={plan.cta} onChange={e => updatePlan(si, pi, 'cta', e.target.value)} style={FIELD_STYLE} />
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                          <label style={LABEL_STYLE}>CTA URL</label>
                          <input value={plan.ctaHref} onChange={e => updatePlan(si, pi, 'ctaHref', e.target.value)} style={{ ...FIELD_STYLE, fontFamily: 'monospace', fontSize: 12 }} />
                        </div>
                        <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 8 }}>
                          <input type="checkbox" id={`ft-${si}-${pi}`} checked={!!plan.featured} onChange={e => updatePlan(si, pi, 'featured', e.target.checked)} />
                          <label htmlFor={`ft-${si}-${pi}`} style={{ fontSize: 13, color: '#475569', fontWeight: 500, cursor: 'pointer' }}>Mark as featured</label>
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <label style={LABEL_STYLE}>Features List</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {plan.features.map((feat, fi) => (
                            <div key={fi} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                              <span style={{ color: '#10b981', fontSize: 14, flexShrink: 0 }}>✓</span>
                              <input value={feat} onChange={e => updateFeature(si, pi, fi, e.target.value)} style={{ ...FIELD_STYLE, flex: 1 }} />
                              <button onClick={() => removeFeature(si, pi, fi)} style={{ ...BTN_DANGER, padding: '7px 9px', flexShrink: 0, fontSize: 14 }}>×</button>
                            </div>
                          ))}
                          <button onClick={() => addFeature(si, pi)} style={{ ...BTN_GHOST, fontSize: 12, borderStyle: 'dashed', justifyContent: 'center' }}>
                            + Add feature
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}

      <ErrorBanner msg={error} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
        <button onClick={save} disabled={saving} style={{ ...BTN_PRIMARY, opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving…' : '💾 Save All Pricing'}
        </button>
        <SavedBanner show={saved} />
      </div>
    </div>
  )
}
