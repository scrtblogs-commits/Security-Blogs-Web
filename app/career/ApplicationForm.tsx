'use client'
import { useState } from 'react'

const roles = [
  'AI Content Strategist',
  'Security SEO Specialist',
  'Paid Media Manager',
  'Full-Stack Developer (Next.js)',
  'GEO & Entity Specialist',
  'Business Development Manager',
]

const availabilities = ['Immediately', '2 weeks notice', '1 month notice', 'Negotiable']

const MAX = 500

export default function ApplicationForm() {
  const [sent, setSent] = useState(false)
  const [why, setWhy] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('company_url')) return // honeypot
    console.log('career application', Object.fromEntries(fd.entries()))
    setSent(true)
  }

  if (sent) {
    return (
      <div className="card center" style={{ padding: 48 }}>
        <div style={{ fontSize: 46, marginBottom: 12 }}>✓</div>
        <h3 style={{ marginBottom: 8 }}>Application received!</h3>
        <p className="text-soft">✓ Application received! We review all applications within 5 business days.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div>
        <label className="label" htmlFor="name">Name *</label>
        <input id="name" name="name" type="text" required className="field" placeholder="Your full name" />
      </div>
      <div>
        <label className="label" htmlFor="email">Email *</label>
        <input id="email" name="email" type="email" required className="field" placeholder="you@email.com" />
      </div>
      <div>
        <label className="label" htmlFor="phone">Phone</label>
        <input id="phone" name="phone" type="text" className="field" placeholder="Optional" />
      </div>
      <div>
        <label className="label" htmlFor="role">Role applying for *</label>
        <select id="role" name="role" required className="field" defaultValue="">
          <option value="" disabled>Select a role…</option>
          {roles.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="linkedin">LinkedIn URL</label>
        <input id="linkedin" name="linkedin" type="text" className="field" placeholder="linkedin.com/in/…" />
      </div>
      <div>
        <label className="label" htmlFor="portfolio">Portfolio / website URL</label>
        <input id="portfolio" name="portfolio" type="text" className="field" placeholder="yoursite.com" />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label className="label" htmlFor="why">Why join SecurityGrowth?</label>
        <textarea
          id="why"
          name="why"
          className="field"
          rows={4}
          maxLength={MAX}
          value={why}
          onChange={(e) => setWhy(e.target.value)}
          placeholder="Tell us what excites you about working at the frontier of AI and security…"
        />
        <div className="text-dim center" style={{ fontSize: 12, fontFamily: 'var(--font-mono)', textAlign: 'right', marginTop: 6 }}>
          {why.length}/{MAX}
        </div>
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label className="label" htmlFor="availability">Availability</label>
        <select id="availability" name="availability" className="field" defaultValue="">
          <option value="" disabled>Select availability…</option>
          {availabilities.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>
      <input type="text" name="company_url" className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" className="btn btn-primary" style={{ gridColumn: '1 / -1' }}>Submit application →</button>
    </form>
  )
}
