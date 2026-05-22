'use client'
import { useState } from 'react'

type FieldDef = { name: string; label: string; type?: string; required?: boolean; options?: string[]; full?: boolean; placeholder?: string }

const defaultFields: FieldDef[] = [
  { name: 'name', label: 'Name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone' },
  { name: 'company', label: 'Company' },
  { name: 'service', label: 'Service needed', type: 'select', options: ['Security SEO', 'AIO', 'AEO', 'GEO', 'Google Ads', 'Bing Ads', 'Web Design', 'Full Service Package'], full: true },
  { name: 'message', label: 'Message', type: 'textarea', required: true, full: true },
]

export default function ContactForm({
  fields = defaultFields,
  submitLabel = 'Send Message →',
  successMsg = "✓ Message received! We'll be in touch within 24 hours.",
}: { fields?: FieldDef[]; submitLabel?: string; successMsg?: string }) {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('company_url')) return // honeypot
    console.log('form submit', Object.fromEntries(fd.entries()))
    setSent(true)
  }

  if (sent) {
    return (
      <div className="card center" style={{ padding: 48 }}>
        <div style={{ fontSize: 46, marginBottom: 12 }}>✓</div>
        <h3 style={{ marginBottom: 8 }}>Thank you!</h3>
        <p className="text-soft">{successMsg}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {fields.map((f) => (
        <div key={f.name} style={{ gridColumn: f.full || f.type === 'textarea' ? '1 / -1' : 'auto' }}>
          <label className="label" htmlFor={f.name}>{f.label}{f.required && ' *'}</label>
          {f.type === 'textarea' ? (
            <textarea id={f.name} name={f.name} required={f.required} className="field" rows={4} placeholder={f.placeholder} />
          ) : f.type === 'select' ? (
            <select id={f.name} name={f.name} required={f.required} className="field" defaultValue="">
              <option value="" disabled>Select…</option>
              {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : (
            <input id={f.name} name={f.name} type={f.type || 'text'} required={f.required} className="field" placeholder={f.placeholder} />
          )}
        </div>
      ))}
      <input type="text" name="company_url" className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" className="btn btn-primary" style={{ gridColumn: '1 / -1' }}>{submitLabel}</button>
    </form>
  )
}
