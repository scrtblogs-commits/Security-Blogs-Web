'use client'
import { useState } from 'react'
import type { SiteSettings } from '@/lib/content-store'
import { Card, CardTitle, FIELD_STYLE, LABEL_STYLE, BTN_PRIMARY, SavedBanner, ErrorBanner } from '../AdminShell'

export default function SiteSettingsEditor({ initial }: { initial: SiteSettings }) {
  const [data, setData] = useState<SiteSettings>(initial)
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)
  const [error,  setError]  = useState('')

  function set(key: keyof SiteSettings, val: string) {
    setData(d => ({ ...d, [key]: val })); setSaved(false)
  }

  async function save() {
    setSaving(true); setError(''); setSaved(false)
    const res = await fetch('/api/admin/content/site-settings', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
    })
    const json = await res.json()
    setSaving(false)
    if (json.ok) setSaved(true)
    else setError(json.error ?? 'Save failed')
  }

  const F = ({ label, k, placeholder, type }: { label: string; k: keyof SiteSettings; placeholder?: string; type?: string }) => (
    <div>
      <label style={LABEL_STYLE}>{label}</label>
      <input type={type ?? 'text'} value={data[k]} onChange={e => set(k, e.target.value)} placeholder={placeholder} style={FIELD_STYLE} />
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Card>
        <CardTitle>Brand Identity</CardTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 22px' }}>
          <F label="Company Name" k="name" />
          <F label="Tagline" k="tagline" placeholder="Be the answer AI gives." />
        </div>
      </Card>

      <Card>
        <CardTitle>Contact Details</CardTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 22px' }}>
          <F label="Email Address"  k="email"     type="email" placeholder="info@example.com" />
          <F label="Phone Number"   k="phone"     placeholder="+61 400 000 000" />
          <div style={{ gridColumn: '1 / -1' }}>
            <F label="Phone Href (for tel: links)" k="phoneHref" placeholder="tel:+61400000000" />
          </div>
        </div>
      </Card>

      <Card>
        <CardTitle>Primary CTAs</CardTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 22px' }}>
          <F label="Primary Button Text" k="ctaPrimary" />
          <F label="Primary Button URL"  k="ctaPrimaryHref" />
          <F label="Strategy Call Text"  k="ctaStrategy" />
          <F label="Strategy Call URL"   k="ctaStrategyHref" />
        </div>
      </Card>

      <Card>
        <CardTitle>Social Media</CardTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 22px' }}>
          <F label="Twitter / X"  k="socialTwitter"  placeholder="https://twitter.com/..." />
          <F label="LinkedIn"     k="socialLinkedIn"  placeholder="https://linkedin.com/company/..." />
          <F label="Facebook"     k="socialFacebook"  placeholder="https://facebook.com/..." />
        </div>
      </Card>

      <ErrorBanner msg={error} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={save} disabled={saving} style={{ ...BTN_PRIMARY, opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving…' : '💾 Save Settings'}
        </button>
        <SavedBanner show={saved} />
      </div>
    </div>
  )
}
