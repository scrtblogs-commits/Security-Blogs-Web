'use client'
import { useState } from 'react'
import type { HomepageContent, StatItem } from '@/lib/content-store'
import { Card, CardTitle, FIELD_STYLE, LABEL_STYLE, BTN_PRIMARY } from '../AdminShell'

export default function HomepageEditor({
  initialHero, initialStats,
}: {
  initialHero:  HomepageContent
  initialStats: StatItem[]
}) {
  const [hero,   setHero]   = useState<HomepageContent>(initialHero)
  const [stats,  setStats]  = useState<StatItem[]>(initialStats)
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)
  const [error,  setError]  = useState('')

  function setHeroField(k: keyof HomepageContent, v: string) {
    setHero(h => ({ ...h, [k]: v })); setSaved(false)
  }

  function setStat(idx: number, k: keyof StatItem, v: string) {
    setStats(s => s.map((x, i) => i === idx ? { ...x, [k]: v } : x)); setSaved(false)
  }

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Card>
        <CardTitle>Hero Section</CardTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={LABEL_STYLE}>Badge Text</label>
            <input value={hero.heroBadge} onChange={e => setHeroField('heroBadge', e.target.value)} style={FIELD_STYLE} />
          </div>
          <div>
            <label style={LABEL_STYLE}>Main Headline</label>
            <input value={hero.heroHeadline} onChange={e => setHeroField('heroHeadline', e.target.value)} style={FIELD_STYLE} />
          </div>
          <div>
            <label style={LABEL_STYLE}>Subtitle / Description</label>
            <textarea
              value={hero.heroSubtitle}
              onChange={e => setHeroField('heroSubtitle', e.target.value)}
              rows={3}
              style={{ ...FIELD_STYLE, resize: 'vertical' }}
            />
          </div>
        </div>
      </Card>

      <Card>
        <CardTitle>Stats Bar (4 numbers)</CardTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: '#f8f9fb', borderRadius: 10, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <label style={LABEL_STYLE}>Number / Value</label>
                <input value={s.num} onChange={e => setStat(i, 'num', e.target.value)} style={FIELD_STYLE} placeholder="+180%" />
              </div>
              <div>
                <label style={LABEL_STYLE}>Label</label>
                <input value={s.label} onChange={e => setStat(i, 'label', e.target.value)} style={FIELD_STYLE} placeholder="Average organic traffic growth" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {error && <div style={{ color: '#b91c1c', fontSize: 13 }}>{error}</div>}

      <div>
        <button onClick={save} disabled={saving} style={BTN_PRIMARY}>
          {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Homepage Content'}
        </button>
        {saved && <span style={{ marginLeft: 12, fontSize: 13, color: '#15803d', fontWeight: 500 }}>Changes saved.</span>}
      </div>
    </div>
  )
}
