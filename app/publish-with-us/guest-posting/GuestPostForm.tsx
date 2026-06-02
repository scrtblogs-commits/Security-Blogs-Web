'use client'
import { useState } from 'react'
import { submitForm } from '../../../lib/submitForm'

const categories = [
  'CCTV',
  'Access Control',
  'Alarms & Monitoring',
  'Cyber Security',
  'Security Consulting',
  'Systems Integration',
  'Physical Security',
  'Surveillance',
  'Smart Home',
  'Industry News',
  'SEO & Marketing',
  'Other',
]

const MIN_WORDS = 800
const MAX_LINKS = 2

function countWords(s: string) {
  const t = s.trim()
  return t ? t.split(/\s+/).length : 0
}
function countLinks(s: string) {
  const m = s.match(/https?:\/\/[^\s)]+/gi)
  return m ? m.length : 0
}

export default function GuestPostForm() {
  const [bio, setBio] = useState('')
  const [body, setBody] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDesc, setMetaDesc] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const words = countWords(body)
  const links = countLinks(body)
  const wordsOk = words >= MIN_WORDS
  const linksOk = links <= MAX_LINKS

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('company_url')) return // honeypot
    setSubmitting(true)
    setError(null)
    const result = await submitForm({
      formData: fd,
      subject: 'New guest post submission',
      extras: { wordCount: words, linkCount: links },
    })
    setSubmitting(false)
    if (result.ok) {
      // Redirect to the dedicated thank-you page (per Phase 7 spec) so
      // every form on the site ends up at the same confirmation URL.
      window.location.href = '/thank-you/'
      return
    }
    setError(result.error || 'Submission failed.')
  }

  const onPreview = () => {
    console.log('guest post preview', { metaTitle, metaDesc, wordCount: words, linkCount: links, bioLength: bio.length })
  }

  if (sent) {
    return (
      <div className="card center" style={{ padding: 48 }}>
        <div style={{ fontSize: 46, marginBottom: 12 }}>✓</div>
        <h3 style={{ marginBottom: 8 }}>Submitted for review!</h3>
        <p className="text-soft">✓ Submitted for review! Our editors respond within 3 business days.</p>
      </div>
    )
  }

  const counter = (cur: number, max: number, over = false) => (
    <span
      className="text-dim"
      style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: over ? 'var(--red)' : undefined }}
    >
      {cur}/{max}
    </span>
  )

  return (
    <form onSubmit={onSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Author section */}
      <div>
        <div className="eyebrow" style={{ marginBottom: 16 }}>Author details</div>
        <div className="grid-2" style={{ gap: 16 }}>
          <div>
            <label className="label" htmlFor="authorName">Author Name *</label>
            <input id="authorName" name="authorName" className="field" required placeholder="Jane Doe" />
          </div>
          <div>
            <label className="label" htmlFor="authorEmail">Email *</label>
            <input id="authorEmail" name="authorEmail" type="email" className="field" required placeholder="jane@company.com" />
          </div>
          <div>
            <label className="label" htmlFor="website">Website</label>
            <input id="website" name="website" className="field" placeholder="https://company.com" />
          </div>
          <div>
            <label className="label" htmlFor="backlinkUrl">Backlink URL</label>
            <input id="backlinkUrl" name="backlinkUrl" className="field" placeholder="https://company.com/page" />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <div className="flex items-center justify-between">
              <label className="label" htmlFor="bio">Author Bio</label>
              {counter(bio.length, 1000, bio.length > 1000)}
            </div>
            <textarea
              id="bio"
              name="bio"
              className="field"
              rows={3}
              maxLength={1000}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A short bio that appears with your byline."
            />
          </div>
        </div>
      </div>

      {/* Article section */}
      <div>
        <div className="eyebrow" style={{ marginBottom: 16 }}>Article details</div>
        <div className="grid-2" style={{ gap: 16 }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label className="label" htmlFor="title">Article Title *</label>
            <input id="title" name="title" className="field" required placeholder="How AI is reshaping access control in 2026" />
          </div>
          <div>
            <label className="label" htmlFor="category">Category</label>
            <select id="category" name="category" className="field" defaultValue="">
              <option value="" disabled>Select…</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="tags">Tags</label>
            <input id="tags" name="tags" className="field" placeholder="cctv, ai, surveillance" />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label className="label" htmlFor="featuredImage">Featured Image</label>
            <input id="featuredImage" name="featuredImage" type="file" accept="image/*" className="field" style={{ paddingTop: 10 }} />
          </div>
        </div>
      </div>

      {/* Body section */}
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
          id="body"
          name="body"
          className="field"
          rows={12}
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Paste your full article here. Minimum 800 words, maximum 2 dofollow links, 100% original content."
        />
        {!wordsOk && body.length > 0 && (
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

      {/* SEO section */}
      <div>
        <div className="eyebrow" style={{ marginBottom: 16 }}>SEO metadata</div>
        <div className="grid-2" style={{ gap: 16 }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <div className="flex items-center justify-between">
              <label className="label" htmlFor="metaTitle">Meta Title</label>
              {counter(metaTitle.length, 160, metaTitle.length > 160)}
            </div>
            <input
              id="metaTitle"
              name="metaTitle"
              className="field"
              maxLength={160}
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="SEO title for search engines"
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <div className="flex items-center justify-between">
              <label className="label" htmlFor="metaDesc">Meta Description</label>
              {counter(metaDesc.length, 320, metaDesc.length > 320)}
            </div>
            <textarea
              id="metaDesc"
              name="metaDesc"
              className="field"
              rows={2}
              maxLength={320}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              placeholder="A concise summary shown in search results."
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label className="label" htmlFor="slug">URL Slug</label>
            <input id="slug" name="slug" className="field" placeholder="ai-access-control-2026" />
          </div>
        </div>
      </div>

      <input type="text" name="company_url" className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'var(--text-soft)', lineHeight: 1.5 }}>
        <input type="checkbox" name="consent" required style={{ marginTop: 3, flexShrink: 0 }} />
        <span>
          I confirm this article is 100% original and unpublished, and I consent to
          my information being handled in line with the{' '}
          <a href="/privacy-policy/" style={{ color: 'var(--blue)' }}>privacy policy</a>{' '}
          and the{' '}
          <a href="/content-guidelines/" style={{ color: 'var(--blue)' }}>content guidelines</a>. *
        </span>
      </label>

      {error && (
        <div style={{ color: 'var(--red)', fontSize: 13 }}>{error}</div>
      )}
      <div className="flex flex-wrap gap-3">
        <button type="button" className="btn btn-outline" onClick={onPreview}>Preview Article</button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit for Review'}
        </button>
      </div>
    </form>
  )
}
