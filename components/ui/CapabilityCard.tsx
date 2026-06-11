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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
      {items.map((c) => (
        <div
          key={c.title}
          className="capability-card"
          style={{
            padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden',
            borderRadius: 18,
            border: '2px solid rgba(30,95,224,0.18)',
            background: '#fff',
            boxShadow: '0 4px 24px -6px rgba(30,95,224,0.10)',
            transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
          }}
        >
          <div style={{ position: 'relative', minHeight: 180, background: 'linear-gradient(135deg, #f0f6ff 0%, #f8faff 100%)', borderBottom: '2px solid rgba(30,95,224,0.10)' }}>
            {c.preview}
          </div>
          <div style={{ padding: 26, position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontSize: 19, marginBottom: 10, color: 'var(--text)', fontWeight: 700 }}>{c.title}</h3>
            <p className="text-soft" style={{ fontSize: 14.5, lineHeight: 1.6 }}>{c.desc}</p>
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
