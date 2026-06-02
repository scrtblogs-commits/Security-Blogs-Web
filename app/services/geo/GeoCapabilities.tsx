'use client'
import type React from 'react'

// Real-looking dashboard previews for each GEO capability — replaces the
// generic Bento with themed mini-visuals so a visitor scanning the card
// instantly sees WHAT that capability looks like in practice. Each preview
// is plain inline JSX + CSS so it stays light (no extra deps) and renders
// the same on every device.

type Capability = {
  title: string
  desc: string
  preview: React.ReactElement
}

const CAPABILITIES: Capability[] = [
  {
    title: 'Entity Building',
    desc: 'Establish your security brand as a defined, recognised entity AI systems can identify with confidence.',
    preview: <EntityCardPreview />,
  },
  {
    title: 'Knowledge Panel Optimisation',
    desc: 'Shape the knowledge panels and brand cards that surface across Google and AI platforms.',
    preview: <KnowledgePanelPreview />,
  },
  {
    title: 'Brand Signal Distribution',
    desc: 'Seed consistent, authoritative signals across the directories and sources AI engines learn from.',
    preview: <SignalDistributionPreview />,
  },
  {
    title: 'Cross-Platform Consistency',
    desc: 'Align how every AI platform describes your brand so the story is identical everywhere.',
    preview: <CrossPlatformPreview />,
  },
  {
    title: 'NAP Consistency',
    desc: 'Lock in matching Name, Address and Phone data across the web to reinforce entity trust.',
    preview: <NAPPreview />,
  },
  {
    title: 'AI Platform Confirmation',
    desc: 'Verify and confirm your entity directly with the AI platforms that matter to your buyers.',
    preview: <ConfirmationPreview />,
  },
]

export default function GeoCapabilities() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 22 }}>
      {CAPABILITIES.map((c) => (
        <div
          key={c.title}
          className="card"
          style={{
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* themed live preview — top half of the card */}
          <div style={{ position: 'relative', minHeight: 150, background: '#f4f8fc', borderBottom: '1px solid var(--line)' }}>
            {c.preview}
          </div>
          {/* content — bottom half */}
          <div style={{ padding: 22, position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontSize: 18, marginBottom: 8, color: 'var(--text)' }}>{c.title}</h3>
            <p className="text-soft" style={{ fontSize: 14, lineHeight: 1.55 }}>{c.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Per-capability previews
// ─────────────────────────────────────────────────────────────

function EntityCardPreview() {
  return (
    <div style={{ position: 'absolute', inset: 16, fontFamily: 'var(--font-mono, monospace)', fontSize: 11, color: '#202124', background: '#fff', borderRadius: 8, padding: '10px 12px', border: '1px solid #dadce0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Row k="@type" v="Organization" valueColor="#d93025" />
      <Row k="name" v={'"SecurityBlogs"'} valueColor="#188038" />
      <Row k="url" v={'"securityblogs.com.au"'} valueColor="#188038" />
      <Row k="areaServed" v={'["AU","US","UK","UAE","SG"]'} valueColor="#188038" />
      <div style={{ marginTop: 4, fontFamily: 'system-ui, sans-serif', fontSize: 10.5, color: '#10a37f', display: 'flex', alignItems: 'center', gap: 4 }}>
        <span className="sb-card-rank" style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#10a37f' }} />
        Entity verified
      </div>
    </div>
  )
}

function Row({ k, v, valueColor }: { k: string; v: string; valueColor: string }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      <span style={{ color: '#a061d2' }}>{k}</span>
      <span style={{ color: '#5f6368' }}>:</span>
      <span style={{ color: valueColor, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v}</span>
    </div>
  )
}

function KnowledgePanelPreview() {
  return (
    <div style={{ position: 'absolute', inset: 16, background: '#fff', borderRadius: 8, padding: 12, border: '1px solid #dadce0', fontFamily: 'system-ui, sans-serif', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#202124' }}>SecurityBlogs</div>
      <div style={{ fontSize: 11, color: '#5f6368' }}>AI Visibility Platform · Security Industry</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#5f6368', marginTop: 2 }}>
        <span style={{ color: '#fbbc04' }}>★★★★★</span>
        <span>5.0 · 142 reviews</span>
      </div>
      <div style={{ marginTop: 4, fontSize: 10.5, color: '#1a0dab' }}>securityblogs.com.au</div>
      <div style={{ marginTop: 4, display: 'flex', gap: 4 }}>
        <span style={{ background: '#e8f0fe', color: '#1967d2', padding: '2px 6px', borderRadius: 4, fontSize: 9.5 }}>Website</span>
        <span style={{ background: '#e6f4ea', color: '#188038', padding: '2px 6px', borderRadius: 4, fontSize: 9.5 }}>Contact</span>
        <span style={{ background: '#fce8e6', color: '#c5221f', padding: '2px 6px', borderRadius: 4, fontSize: 9.5 }}>Services</span>
      </div>
    </div>
  )
}

function SignalDistributionPreview() {
  const items = [
    { name: 'Wikidata',     status: 'synced' as const },
    { name: 'Crunchbase',   status: 'synced' as const },
    { name: 'LinkedIn',     status: 'syncing' as const },
    { name: 'Industry dirs', status: 'syncing' as const },
  ]
  return (
    <div style={{ position: 'absolute', inset: 16, fontFamily: 'system-ui, sans-serif', fontSize: 11.5, color: '#202124', background: '#fff', borderRadius: 8, padding: '10px 12px', border: '1px solid #dadce0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      {items.map((it, i) => (
        <div key={it.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: i < items.length - 1 ? '1px solid #f3f4f7' : 'none' }}>
          <span style={{ flex: 1 }}>{it.name}</span>
          {it.status === 'synced' ? (
            <span style={{ fontSize: 10, color: '#10a37f', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10a37f' }} />
              SYNCED
            </span>
          ) : (
            <span style={{ fontSize: 10, color: '#1e5fe0', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
              <span className="sb-pin" style={{ width: 6, height: 6, borderRadius: '50%', background: '#1e5fe0', boxShadow: '0 0 0 0 rgba(30,95,224,0.6)' }} />
              SYNCING
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function CrossPlatformPreview() {
  const platforms = [
    { name: 'ChatGPT',    bg: '#10a37f', mono: 'AI' },
    { name: 'Gemini',     bg: '#1a73e8', mono: 'G' },
    { name: 'Claude',     bg: '#cc785c', mono: 'C' },
    { name: 'Perplexity', bg: '#1FB8CD', mono: 'P' },
  ]
  return (
    <div style={{ position: 'absolute', inset: 16, fontFamily: 'system-ui, sans-serif', fontSize: 11, color: '#202124', background: '#fff', borderRadius: 8, padding: 10, border: '1px solid #dadce0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 6 }}>
        {platforms.map((p) => (
          <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px', background: '#f8f9fa', borderRadius: 5 }}>
            <span style={{ width: 16, height: 16, borderRadius: 4, background: p.bg, color: '#fff', fontSize: 9, fontWeight: 700, display: 'grid', placeItems: 'center' }}>{p.mono}</span>
            <span style={{ flex: 1, fontSize: 10.5 }}>{p.name}</span>
            <span style={{ color: '#10a37f', fontSize: 11, fontWeight: 700 }}>✓</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 10, color: '#5f6368', textAlign: 'center', borderTop: '1px solid #f3f4f7', paddingTop: 4 }}>
        All cite <strong style={{ color: '#1e5fe0' }}>securityblogs.com.au</strong>
      </div>
    </div>
  )
}

function NAPPreview() {
  const fields = [
    { k: 'Name',    v: 'SecurityBlogs' },
    { k: 'Address', v: 'Australia (Remote-first)' },
    { k: 'Phone',   v: '+61 411 212 418' },
    { k: 'Email',   v: 'info@securityblogs.com.au' },
  ]
  return (
    <div style={{ position: 'absolute', inset: 16, fontFamily: 'system-ui, sans-serif', fontSize: 11, color: '#202124', background: '#fff', borderRadius: 8, padding: '10px 12px', border: '1px solid #dadce0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      {fields.map((f, i) => (
        <div key={f.k} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', borderBottom: i < fields.length - 1 ? '1px solid #f3f4f7' : 'none' }}>
          <span style={{ width: 60, fontSize: 9.5, color: '#5f6368', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.k}</span>
          <span style={{ flex: 1, fontSize: 11, color: '#202124', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.v}</span>
          <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#10a37f', color: '#fff', fontSize: 10, fontWeight: 700, display: 'grid', placeItems: 'center' }}>✓</span>
        </div>
      ))}
    </div>
  )
}

function ConfirmationPreview() {
  const items = [
    { name: 'ChatGPT',    status: 'verified' as const },
    { name: 'Gemini',     status: 'verified' as const },
    { name: 'Perplexity', status: 'verified' as const },
    { name: 'Claude',     status: 'pending'  as const },
  ]
  return (
    <div style={{ position: 'absolute', inset: 16, fontFamily: 'system-ui, sans-serif', fontSize: 11.5, color: '#202124', background: '#fff', borderRadius: 8, padding: '10px 12px', border: '1px solid #dadce0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      {items.map((it, i) => (
        <div key={it.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0', borderBottom: i < items.length - 1 ? '1px solid #f3f4f7' : 'none' }}>
          <span>{it.name}</span>
          {it.status === 'verified' ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#10a37f', fontWeight: 700 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10a37f' }} />
              VERIFIED
            </span>
          ) : (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#fbbc04', fontWeight: 700 }}>
              <span className="sb-pin" style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbc04', boxShadow: '0 0 0 0 rgba(251,188,4,0.6)' }} />
              PENDING
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
