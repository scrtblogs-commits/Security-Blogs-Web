'use client'
import { useState } from 'react'

const categories = [
  'CCTV', 'Access Control', 'Alarms & Monitoring', 'Cyber Security',
  'Security Consulting', 'Systems Integration', 'Physical Security',
  'Surveillance', 'Smart Home', 'Industry News', 'SEO & Marketing', 'Other',
]

const MIN_WORDS = 800
const MAX_LINKS = 2

function countWords(s: string) {
  const t = s.trim(); return t ? t.split(/\s+/).length : 0
}
function countLinks(s: string) {
  return (s.match(/https?:\/\/[^\s)]+/gi) ?? []).length
}

type Field = {
  name: string; email: string; website: string; backlinkUrl: string; bio: string
  title: string; category: string; tags: string
  body: string; metaTitle: string; metaDesc: string; slug: string
}

const EMPTY: Field = {
  name: '', email: '', website: '', backlinkUrl: '', bio: '',
  title: '', category: '', tags: '',
  body: '', metaTitle: '', metaDesc: '', slug: '',
}

/* ── Preview modal ──────────────────────────────────────────────────────── */
function PreviewModal({ data, onClose }: { data: Field; onClose: () => void }) {
  const words = countWords(data.body)
  const links = countLinks(data.body)
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(10,20,50,0.55)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 20, width: '100%', maxWidth: 680,
          maxHeight: '85vh', overflow: 'auto', boxShadow: '0 24px 80px rgba(10,20,50,0.25)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 28px', borderBottom: '1px solid #e8ecf2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Submission Preview</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#6b7280', lineHeight: 1 }}>×</button>
        </div>

        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Status chips */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <StatusChip ok={words >= MIN_WORDS} label={`${words} words ${words >= MIN_WORDS ? '✓' : `(need ${MIN_WORDS - words} more)`}`} />
            <StatusChip ok={links <= MAX_LINKS} label={`${links} link${links !== 1 ? 's' : ''} (max ${MAX_LINKS})`} />
            <StatusChip ok={!!data.name && !!data.email} label="Contact details" />
            <StatusChip ok={!!data.title} label="Title" />
          </div>

          <Row label="Author Name"  value={data.name} />
          <Row label="Email"        value={data.email} />
          {data.website     && <Row label="Website"      value={data.website} />}
          {data.backlinkUrl && <Row label="Backlink URL" value={data.backlinkUrl} />}
          {data.bio         && <Row label="Author Bio"   value={data.bio} />}
          <hr style={{ border: 'none', borderTop: '1px solid #f0f2f7', margin: 0 }} />
          <Row label="Article Title" value={data.title} />
          {data.category    && <Row label="Category"    value={data.category} />}
          {data.tags        && <Row label="Tags"         value={data.tags} />}
          {data.metaTitle   && <Row label="Meta Title"   value={data.metaTitle} />}
          {data.metaDesc    && <Row label="Meta Desc"    value={data.metaDesc} />}
          {data.slug        && <Row label="Slug"         value={data.slug} />}
          {data.body && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6 }}>Article Body (first 300 chars)</div>
              <div style={{ fontSize: 13.5, color: '#374151', lineHeight: 1.7, background: '#f8f9fb', padding: 14, borderRadius: 10, whiteSpace: 'pre-wrap' }}>
                {data.body.slice(0, 300)}{data.body.length > 300 ? '…' : ''}
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '16px 28px', borderTop: '1px solid #e8ecf2', textAlign: 'right' }}>
          <button onClick={onClose} style={{ padding: '10px 22px', borderRadius: 9, background: '#1e5fe0', color: '#fff', border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            Close Preview
          </button>
        </div>
      </div>
    </div>
  )
}

function StatusChip({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600,
      background: ok ? '#dcfce7' : '#fef9c3',
      color:      ok ? '#15803d' : '#854d0e',
    }}>
      {ok ? '✓' : '!'} {label}
    </span>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 14, color: '#111827' }}>{value}</div>
    </div>
  )
}

/* ── Main form ──────────────────────────────────────────────────────────── */
export default function GuestPostForm() {
  const [fields,    setFields]    = useState<Field>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [submitting,setSubmitting]= useState(false)
  const [error,     setError]     = useState<string | null>(null)
  const [preview,   setPreview]   = useState(false)
  const [honeypot,  setHoneypot]  = useState('')

  const words   = countWords(fields.body)
  const links   = countLinks(fields.body)
  const wordsOk = words >= MIN_WORDS
  const linksOk = links <= MAX_LINKS

  function set(k: keyof Field, v: string) {
    setFields(f => ({ ...f, [k]: v }))
    setError(null)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (honeypot) return // bot trap

    if (!fields.name.trim())  { setError('Author name is required.'); return }
    if (!fields.email.trim()) { setError('Email address is required.'); return }
    if (!fields.title.trim()) { setError('Article title is required.'); return }
    if (!fields.body.trim())  { setError('Article body is required.'); return }
    if (!wordsOk) { setError(`Article must be at least ${MIN_WORDS} words (currently ${words}).`); return }
    if (!linksOk) { setError(`Too many links — maximum ${MAX_LINKS} dofollow links allowed.`); return }

    setSubmitting(true); setError(null)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:        fields.name,
          email:       fields.email,
          website:     fields.website,
          backlinkUrl: fields.backlinkUrl,
          bio:         fields.bio,
          title:       fields.title,
          category:    fields.category,
          tags:        fields.tags,
          metaTitle:   fields.metaTitle,
          metaDesc:    fields.metaDesc,
          slug:        fields.slug,
          message:     fields.body.slice(0, 500) + (fields.body.length > 500 ? '…' : ''),
          service:     'Guest Posting',
          source:      'guest-post',
          wordCount:   words,
          linkCount:   links,
        }),
      })
      const json = await res.json().catch(() => ({}))
      setSubmitting(false)
      if (res.ok && json.ok !== false) {
        setSubmitted(true)
      } else {
        setError(json.error || 'Submission failed. Please try again.')
      }
    } catch {
      setSubmitting(false)
      setError('Network error. Please try again or email us directly.')
    }
  }

  /* ── Success state ── */
  if (submitted) {
    return (
      <div className="card" style={{ padding: '52px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>✓</div>
        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, color: '#111827' }}>
          Submitted for review!
        </h3>
        <p style={{ fontSize: 15, color: 'var(--text-soft)', maxWidth: 480, margin: '0 auto 0' }}>
          Thank you. Your article has been submitted successfully. Our editorial team will review it and respond within <strong>3 business days</strong>.
        </p>
      </div>
    )
  }

  const counter = (cur: number, max: number, over = false) => (
    <span className="text-dim" style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: over ? 'var(--red)' : undefined }}>
      {cur}/{max}
    </span>
  )

  return (
    <>
      {preview && <PreviewModal data={fields} onClose={() => setPreview(false)} />}

      <form onSubmit={onSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

        {/* ── Author ── */}
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Author details</div>
          <div className="grid-2" style={{ gap: 16 }}>
            <div>
              <label className="label" htmlFor="gp-name">Author Name *</label>
              <input
                id="gp-name" className="field" required
                placeholder="Jane Doe"
                value={fields.name}
                onChange={e => set('name', e.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="gp-email">Email *</label>
              <input
                id="gp-email" type="email" className="field" required
                placeholder="jane@company.com"
                value={fields.email}
                onChange={e => set('email', e.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="gp-website">Website</label>
              <input
                id="gp-website" className="field"
                placeholder="https://company.com"
                value={fields.website}
                onChange={e => set('website', e.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="gp-backlink">Backlink URL</label>
              <input
                id="gp-backlink" className="field"
                placeholder="https://company.com/page"
                value={fields.backlinkUrl}
                onChange={e => set('backlinkUrl', e.target.value)}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <div className="flex items-center justify-between">
                <label className="label" htmlFor="gp-bio">Author Bio</label>
                {counter(fields.bio.length, 1000, fields.bio.length > 1000)}
              </div>
              <textarea
                id="gp-bio" className="field" rows={3} maxLength={1000}
                placeholder="A short bio that appears with your byline."
                value={fields.bio}
                onChange={e => set('bio', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ── Article details ── */}
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Article details</div>
          <div className="grid-2" style={{ gap: 16 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="label" htmlFor="gp-title">Article Title *</label>
              <input
                id="gp-title" className="field" required
                placeholder="How AI is reshaping access control in 2026"
                value={fields.title}
                onChange={e => set('title', e.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="gp-category">Category</label>
              <select id="gp-category" className="field" value={fields.category} onChange={e => set('category', e.target.value)}>
                <option value="">Select…</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="gp-tags">Tags</label>
              <input
                id="gp-tags" className="field"
                placeholder="cctv, ai, surveillance"
                value={fields.tags}
                onChange={e => set('tags', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ── Article body ── */}
        <div>
          <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
            <div className="eyebrow">Article body</div>
            <div className="flex items-center gap-3">
              <span className="chip" style={{ borderColor: wordsOk ? 'var(--green)' : undefined }}>
                {wordsOk ? '✓' : '•'} {words} words <span className="text-dim">(min {MIN_WORDS})</span>
              </span>
              <span className="chip" style={{ borderColor: linksOk ? 'var(--green)' : 'var(--red)' }}>
                Links {counter(links, MAX_LINKS, !linksOk)}
              </span>
            </div>
          </div>
          <textarea
            id="gp-body" className="field" rows={12} required
            placeholder="Paste your full article here. Minimum 800 words, maximum 2 dofollow links, 100% original content."
            value={fields.body}
            onChange={e => set('body', e.target.value)}
          />
          {!wordsOk && fields.body.length > 0 && (
            <p className="text-dim" style={{ fontSize: 12.5, marginTop: 6 }}>
              {MIN_WORDS - words} more words needed to reach the {MIN_WORDS}-word minimum.
            </p>
          )}
          {!linksOk && (
            <p style={{ fontSize: 12.5, marginTop: 6, color: 'var(--red)' }}>
              Too many links — please limit to {MAX_LINKS} dofollow links.
            </p>
          )}
        </div>

        {/* ── SEO metadata ── */}
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>SEO metadata (optional)</div>
          <div className="grid-2" style={{ gap: 16 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <div className="flex items-center justify-between">
                <label className="label" htmlFor="gp-metaTitle">Meta Title</label>
                {counter(fields.metaTitle.length, 160, fields.metaTitle.length > 160)}
              </div>
              <input
                id="gp-metaTitle" className="field" maxLength={160}
                placeholder="SEO title for search engines"
                value={fields.metaTitle}
                onChange={e => set('metaTitle', e.target.value)}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <div className="flex items-center justify-between">
                <label className="label" htmlFor="gp-metaDesc">Meta Description</label>
                {counter(fields.metaDesc.length, 320, fields.metaDesc.length > 320)}
              </div>
              <textarea
                id="gp-metaDesc" className="field" rows={2} maxLength={320}
                placeholder="A concise summary shown in search results."
                value={fields.metaDesc}
                onChange={e => set('metaDesc', e.target.value)}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="label" htmlFor="gp-slug">URL Slug</label>
              <input
                id="gp-slug" className="field"
                placeholder="ai-access-control-2026"
                value={fields.slug}
                onChange={e => set('slug', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Honeypot */}
        <input
          type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
          value={honeypot} onChange={e => setHoneypot(e.target.value)}
          style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
        />

        {/* Consent */}
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'var(--text-soft)', lineHeight: 1.5 }}>
          <input type="checkbox" required style={{ marginTop: 3, flexShrink: 0 }} />
          <span>
            I confirm this article is 100% original and unpublished, and I consent to my information being handled in line with the{' '}
            <a href="/privacy-policy/" style={{ color: 'var(--blue)' }}>privacy policy</a>{' '}
            and the{' '}
            <a href="/content-guidelines/" style={{ color: 'var(--blue)' }}>content guidelines</a>. *
          </span>
        </label>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '12px 16px', fontSize: 13.5, color: '#b91c1c' }}>
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="button" className="btn btn-outline"
            onClick={() => {
              if (!fields.name && !fields.email && !fields.title && !fields.body) {
                setError('Fill in at least your name, email, title and body before previewing.')
                return
              }
              setError(null)
              setPreview(true)
            }}
          >
            Preview Article
          </button>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit for Review →'}
          </button>
        </div>
      </form>
    </>
  )
}
