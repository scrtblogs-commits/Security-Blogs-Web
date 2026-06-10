'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { BlogPost } from '@/lib/content-store'
import { Card, CardTitle, FIELD_STYLE, LABEL_STYLE, BTN_PRIMARY, BTN_DANGER, BTN_GHOST } from '../AdminShell'

const CATEGORIES = ['SEO', 'AIO/AEO', 'GEO', 'Paid Ads', 'Industry']

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function PostEditor({ initial, isNew }: { initial: Partial<BlogPost>; isNew: boolean }) {
  const router = useRouter()
  const [post, setPost] = useState<Partial<BlogPost>>({
    slug: '', title: '', excerpt: '', content: '', cat: 'SEO',
    date: new Date().toISOString().slice(0, 10), read: '5 min',
    featured: false, published: false, author: 'SecurityBlogs',
    ...initial,
  })
  const [saving,         setSaving]         = useState(false)
  const [deleting,       setDeleting]       = useState(false)
  const [confirmDelete,  setConfirmDelete]  = useState(false)
  const [error,          setError]          = useState('')

  function set(k: keyof BlogPost, v: unknown) {
    setPost(p => ({ ...p, [k]: v }))
  }

  function handleTitleChange(v: string) {
    set('title', v)
    if (isNew) set('slug', slugify(v))
  }

  async function save(publish?: boolean) {
    setSaving(true); setError('')
    if (publish !== undefined) set('published', publish)
    const body = publish !== undefined ? { ...post, published: publish } : post
    const url    = isNew ? '/api/admin/blog' : `/api/admin/blog/${post.id}`
    const method = isNew ? 'POST'            : 'PUT'
    const res    = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const json   = await res.json()
    setSaving(false)
    if (json.ok) router.push('/admin/blog')
    else setError(json.error ?? 'Save failed')
  }

  async function doDelete() {
    setDeleting(true)
    await fetch(`/api/admin/blog/${post.id}`, { method: 'DELETE' })
    router.push('/admin/blog')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Meta */}
      <Card>
        <CardTitle>Post Details</CardTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={LABEL_STYLE}>Title</label>
            <input value={post.title ?? ''} onChange={e => handleTitleChange(e.target.value)} style={{ ...FIELD_STYLE, fontSize: 16 }} placeholder="Post title…" />
          </div>
          <div>
            <label style={LABEL_STYLE}>Slug (URL)</label>
            <input value={post.slug ?? ''} onChange={e => set('slug', e.target.value)} style={FIELD_STYLE} placeholder="post-slug" />
            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>/knowledge-hub/blogs/{post.slug || 'post-slug'}</div>
          </div>
          <div>
            <label style={LABEL_STYLE}>Category</label>
            <select value={post.cat ?? 'SEO'} onChange={e => set('cat', e.target.value)} style={FIELD_STYLE}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={LABEL_STYLE}>Publish Date</label>
            <input type="date" value={post.date ?? ''} onChange={e => set('date', e.target.value)} style={FIELD_STYLE} />
          </div>
          <div>
            <label style={LABEL_STYLE}>Read Time</label>
            <input value={post.read ?? ''} onChange={e => set('read', e.target.value)} style={FIELD_STYLE} placeholder="5 min" />
          </div>
          <div>
            <label style={LABEL_STYLE}>Author</label>
            <input value={post.author ?? ''} onChange={e => set('author', e.target.value)} style={FIELD_STYLE} />
          </div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', paddingTop: 8 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer', color: '#374151' }}>
              <input type="checkbox" checked={!!post.featured} onChange={e => set('featured', e.target.checked)} />
              Mark as Featured
            </label>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={LABEL_STYLE}>Cover Image URL (optional)</label>
            <input value={post.coverImage ?? ''} onChange={e => set('coverImage', e.target.value)} style={FIELD_STYLE} placeholder="https://…" />
          </div>
        </div>
      </Card>

      {/* Excerpt */}
      <Card>
        <CardTitle>Excerpt (shown in blog grid)</CardTitle>
        <textarea
          value={post.excerpt ?? ''}
          onChange={e => set('excerpt', e.target.value)}
          rows={3}
          style={{ ...FIELD_STYLE, resize: 'vertical' }}
          placeholder="A short 1–2 sentence summary of the post…"
        />
      </Card>

      {/* Content */}
      <Card>
        <CardTitle>Article Content (Markdown supported)</CardTitle>
        <textarea
          value={post.content ?? ''}
          onChange={e => set('content', e.target.value)}
          rows={20}
          style={{ ...FIELD_STYLE, resize: 'vertical', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6 }}
          placeholder="# Heading&#10;&#10;Write your article here…"
        />
        <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 8 }}>
          Markdown syntax supported. Use # for headings, **bold**, *italic*, - for lists.
        </div>
      </Card>

      {error && <div style={{ color: '#b91c1c', fontSize: 13, background: '#fef2f2', padding: '10px 14px', borderRadius: 8 }}>{error}</div>}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={() => save(false)} disabled={saving} style={BTN_GHOST}>
          {saving ? 'Saving…' : 'Save as Draft'}
        </button>
        <button onClick={() => save(true)} disabled={saving} style={BTN_PRIMARY}>
          {saving ? 'Publishing…' : post.published ? 'Update & Keep Published' : 'Publish Post'}
        </button>

        {!isNew && (
          <>
            {!confirmDelete ? (
              <button onClick={() => setConfirmDelete(true)} style={{ ...BTN_DANGER, marginLeft: 'auto' }}>Delete Post</button>
            ) : (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: 'auto' }}>
                <span style={{ fontSize: 13, color: '#b91c1c', fontWeight: 600 }}>Are you sure?</span>
                <button onClick={doDelete} disabled={deleting} style={{ padding: '8px 14px', borderRadius: 7, border: 'none', background: '#b91c1c', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                  {deleting ? 'Deleting…' : 'Yes, delete'}
                </button>
                <button onClick={() => setConfirmDelete(false)} style={BTN_GHOST}>Cancel</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
