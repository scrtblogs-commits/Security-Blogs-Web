import type React from 'react'

// Shared wrapper used by every service page's per-capability grid.
// Renders a themed preview band on top + title/description underneath.
export type Capability = {
  title: string
  desc: string
  preview: React.ReactElement
}

export default function CapabilityGrid({ items }: { items: Capability[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 22 }}>
      {items.map((c) => (
        <div
          key={c.title}
          className="card"
          style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
        >
          <div style={{ position: 'relative', minHeight: 150, background: '#f4f8fc', borderBottom: '1px solid var(--line)' }}>
            {c.preview}
          </div>
          <div style={{ padding: 22, position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontSize: 18, marginBottom: 8, color: 'var(--text)' }}>{c.title}</h3>
            <p className="text-soft" style={{ fontSize: 14, lineHeight: 1.55 }}>{c.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// Pre-styled inner preview container — every preview uses this shell.
export const PREVIEW_SHELL: React.CSSProperties = {
  position: 'absolute', inset: 14, background: '#fff', borderRadius: 8,
  padding: 10, border: '1px solid #dadce0',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  fontFamily: 'system-ui, -apple-system, sans-serif', color: '#202124',
  display: 'flex', flexDirection: 'column', overflow: 'hidden',
}
