'use client'
import { useState } from 'react'
import type { HomepageContent, StatItem } from '@/lib/content-store'
import { Card, CardTitle, FIELD_STYLE, LABEL_STYLE, BTN_PRIMARY, SavedBanner, ErrorBanner } from '../AdminShell'

export default function HomepageEditor({
  initialHero, initialStats,
}: {
  initialHero:  HomepageContent
  initialStats: StatItem[]
}) {
  const [hero,   setHero]   = useState(initialHero)
  const [stats,  setStats]  = useState(initialStats)
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)
  const [error,  setError]  = useState('')

  async function save() {
    setSaving(true); setError(''); setSaved(false)
    const [r1, r2] = await Promise.all([
      fetch('/api/admin/content/homepage', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(hero) }),
      fetch('/api/admin/content/stats',    { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(stats) }),
    ])
    const [j1, j2] = await Promise.all([r1.json(), r2.json()])
    setSaving(false)
    if (j1.ok && j2.ok) setSaved(true)
    else setError('Save failed — please try again')
  }

  const STAT_COLORS = ['#1e5fe0', '#059669', '#d97706', '#7c3aed']
  const STAT_BG     = ['#eff4ff', '#ecfdf5', '#fffbeb', '#f5f3ff']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Card>
        <CardTitle>Hero Section</CardTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={LABEL_STYLE}>Badge Text</label>
            <input value={hero.heroBadge} onChange={e => { setHero(h => ({ ...h, heroBadge: e.target.value })); setSaved(false) }} style={FIELD_STYLE} placeholder="AI Visibility for Security Brands" />
          </div>
          <div>
            <label style={LABEL_STYLE}>Main Headline</label>
            <input value={hero.heroHeadline} onChange={e => { setHero(h => ({ ...h, heroHeadline: e.target.value })); setSaved(false) }} style={{ ...FIELD_STYLE, fontSize: 18, fontWeight: 600 }} placeholder="Be the Answer AI Gives." />
          </div>
          <div>
            <label style={LABEL_STYLE}>Subtitle</label>
            <textarea value={hero.heroSubtitle} onChange={e => { setHero(h => ({ ...h, heroSubtitle: e.target.value })); setSaved(false) }} rows={3} style={{ ...FIELD_STYLE, resize: 'vertical' }} />
          </div>
        </div>
      </Card>

      <Card>
        <CardTitle>Stats Bar</CardTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              border: `1.5px solid ${STAT_COLORS[i]}25`,
              borderRadius: 12, padding: '16px',
              background: STAT_BG[i],
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: STAT_COLORS[i], marginBottom: 12 }}>{s.num || '—'}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <label style={LABEL_STYLE}>Number / Value</label>
                  <input value={s.num} onChange={e => { setStats(arr => arr.map((x, j) => j === i ? { ...x, num: e.target.value } : x)); setSaved(false) }}
                    style={FIELD_STYLE} placeholder="+180%" />
                </div>
                <div>
                  <label style={LABEL_STYLE}>Label</label>
                  <input value={s.label} onChange={e => { setStats(arr => arr.map((x, j) => j === i ? { ...x, label: e.target.value } : x)); setSaved(false) }}
                    style={FIELD_STYLE} placeholder="Average organic growth" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <ErrorBanner msg={error} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={save} disabled={saving} style={{ ...BTN_PRIMARY, opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving…' : '💾 Save Homepage'}
        </button>
        <SavedBanner show={saved} />
      </div>
    </div>
  )
}
