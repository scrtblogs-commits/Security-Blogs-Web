'use client'
import { useState } from 'react'
import type { SiteSettings } from '@/lib/content-store'
import { Card, CardTitle, FIELD_STYLE, LABEL_STYLE, BTN_PRIMARY } from '../AdminShell'

export default function SiteSettingsEditor({ initial }: { initial: SiteSettings }) {
  const [data, setData] = useState<SiteSettings>(initial)
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)
  const [error,  setError]  = useState('')

  function set(key: keyof SiteSettings, val: string) {
    setData(d => ({ ...d, [key]: val }))
    setSaved(false)
  }

  async function save() {
    setSaving(true); setError(''); setSaved(false)
    const res = await fetch('/api/admin/content/site-settings', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    setSaving(false)
    if (json.ok) setSaved(true)
    else setError(json.error ?? 'Save failed')
  }

  const F = ({ label, k, placeholder }: { label: string; k: keyof SiteSettings; placeholder?: string }) => (
    <div>
      <label style={LABEL_STYLE}>{label}</label>
      <input
        value={data[k]}
        onChange={e => set(k, e.target.value)}
        placeholder={placeholder}
        style={FIELD_STYLE}
      />
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Card>
        <CardTitle>Brand Identity</CardTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px' }}>
          <F label="Company Name" k="name" />
          <F label="Tagline" k="tagline" />
        </div>
      </Card>

      <Card>
        <CardTitle>Contact Details</CardTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px' }}>
          <F label="Email Address" k="email" placeholder="info@example.com" />
          <F label="Phone Number" k="phone" placeholder="+61 400 000 000" />
          <F label="Phone Href" k="phoneHref" placeholder="tel:+61400000000" />
        </div>
      </Card>

      <Card>
        <CardTitle>Primary CTAs</CardTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px' }}>
          <F label="Primary Button Text" k="ctaPrimary" />
          <F label="Primary Button URL" k="ctaPrimaryHref" />
          <F label="Strategy Call Text" k="ctaStrategy" />
          <F label="Strategy Call URL" k="ctaStrategyHref" />
        </div>
      </Card>

      <Card>
        <CardTitle>Social Media Links</CardTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px' }}>
          <F label="Twitter / X URL" k="socialTwitter" placeholder="https://twitter.com/..." />
          <F label="LinkedIn URL" k="socialLinkedIn" placeholder="https://linkedin.com/company/..." />
          <F label="Facebook URL" k="socialFacebook" placeholder="https://facebook.com/..." />
        </div>
      </Card>

      {error && <div style={{ color: '#b91c1c', fontSize: 13 }}>{error}</div>}

      <div>
        <button onClick={save} disabled={saving} style={BTN_PRIMARY}>
          {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Settings'}
        </button>
        {saved && <span style={{ marginLeft: 12, fontSize: 13, color: '#15803d', fontWeight: 500 }}>Changes saved successfully.</span>}
      </div>
    </div>
  )
}
