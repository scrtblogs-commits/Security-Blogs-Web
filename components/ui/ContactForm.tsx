'use client'
import { useState } from 'react'
import { submitForm } from '../../lib/submitForm'

type FieldDef = { name: string; label: string; type?: string; required?: boolean; options?: string[]; full?: boolean; placeholder?: string }

const defaultFields: FieldDef[] = [
  { name: 'name', label: 'Name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone' },
  { name: 'company', label: 'Company' },
  { name: 'service', label: 'Service needed', type: 'select', options: ['Security SEO', 'AIO', 'AEO', 'GEO', 'Google Ads', 'Bing Ads', 'Web Design', 'GMB Profile', 'Full Service Package'], full: true },
  { name: 'message', label: 'Message', type: 'textarea', required: true, full: true },
]

export default function ContactForm({
  fields = defaultFields,
  submitLabel = 'Send Message →',
  successMsg = 'Thanks! We\'ll be in touch within one business day.',
  subject = 'New contact form submission',
}: { fields?: FieldDef[]; submitLabel?: string; successMsg?: string; subject?: string }) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    if (fd.get('company_url')) return // honeypot
    setSubmitting(true)
    setError(null)
    const result = await submitForm({ formData: fd, subject })
    setSubmitting(false)
    if (result.ok) setSubmitted(true)
    else setError(result.error || 'Submission failed.')
  }

  if (submitted) {
    return (
      <div className="card" style={{ padding: '36px 28px', textAlign: 'center' }}>
        <div style={{ fontSize: 44, marginBottom: 16 }}>✅</div>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--heading)', marginBottom: 10 }}>Message Sent!</h3>
        <p style={{ fontSize: 15, color: 'var(--text-soft)', lineHeight: 1.6, maxWidth: 360, margin: '0 auto' }}>{successMsg}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="card contact-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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
      <label style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'var(--text-soft)', lineHeight: 1.5 }}>
        <input type="checkbox" name="consent" required style={{ marginTop: 3, flexShrink: 0 }} />
        <span>
          I agree to the{' '}
          <a href="/privacy-policy/" style={{ color: 'var(--blue)' }}>privacy policy</a>
          {' '}and to being contacted about my enquiry. *
        </span>
      </label>
      {error && (
        <div style={{ gridColumn: '1 / -1', color: 'var(--red)', fontSize: 13 }}>{error}</div>
      )}
      <button type="submit" className="btn btn-primary" style={{ gridColumn: '1 / -1' }} disabled={submitting}>
        {submitting ? 'Sending…' : submitted ? 'Submitted ✓' : submitLabel}
      </button>
    </form>
  )
}
