'use client'
import CapabilityGrid, { PREVIEW_SHELL, type Capability } from '@/components/ui/CapabilityCard'

const CAPS: Capability[] = [
  { title: 'Schema Markup', desc: 'Structured schema that tells AI systems exactly what your security brand does, serves and is trusted for.', preview: <SchemaPreview /> },
  { title: 'Semantic Content Mapping', desc: 'Content modelled around the topics, entities and questions AI engines associate with your niche.', preview: <SemanticPreview /> },
  { title: 'Structured Data', desc: 'Clean, machine-readable data layers so answer engines can parse and cite your information with confidence.', preview: <StructuredDataPreview /> },
  { title: 'Entity Signal Building', desc: 'Consistent signals across the web that establish your brand as a recognised, authoritative entity.', preview: <SignalMetersPreview /> },
  { title: 'Content Freshness', desc: 'Ongoing updates and new assets that keep your brand current in fast-moving AI indexes.', preview: <FreshnessPreview /> },
  { title: 'Citation Monitoring', desc: 'Track when and where ChatGPT, Perplexity and Gemini mention your brand — and grow the share.', preview: <CitationsPreview /> },
]
export default function AioCapabilities() { return <CapabilityGrid items={CAPS} /> }

function SchemaPreview() {
  return (
    <div style={{ ...PREVIEW_SHELL, fontFamily: 'var(--font-mono, monospace)', fontSize: 10.5, gap: 3 }}>
      <Row k='"@context"' v='"schema.org"' />
      <Row k='"@type"' v='"Organization"' />
      <Row k='"name"' v='"SecurityBlogs"' />
      <Row k='"url"' v='"securityblogs.com.au"' />
      <Row k='"areaServed"' v='["AU","US","UK"]' />
      <div style={{ marginTop: 2, fontFamily: 'system-ui, sans-serif', fontSize: 10, color: '#10a37f' }}>● Parses on every AI engine</div>
    </div>
  )
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: 'flex', gap: 5 }}>
      <span style={{ color: '#a061d2' }}>{k}</span>
      <span style={{ color: '#5f6368' }}>:</span>
      <span style={{ color: '#188038', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v}</span>
    </div>
  )
}

function SemanticPreview() {
  const nodes = [
    { x: 50, y: 50, label: 'SecurityBlogs', primary: true },
    { x: 18, y: 25, label: 'AI Visibility' },
    { x: 80, y: 25, label: 'SEO' },
    { x: 12, y: 75, label: 'CCTV' },
    { x: 85, y: 78, label: 'AEO' },
  ]
  return (
    <div style={{ ...PREVIEW_SHELL, padding: 0 }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        {nodes.slice(1).map((n, i) => (
          <line key={i} x1="50" y1="50" x2={n.x} y2={n.y} stroke="#1e5fe0" strokeWidth="0.3" opacity="0.6" />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.primary ? 5 : 3} fill={n.primary ? '#1e5fe0' : '#7eb6ff'} className={n.primary ? 'sb-card-rank' : ''} />
            <text x={n.x} y={n.y + (n.primary ? 10 : 8)} fontSize="3.5" fill="#202124" textAnchor="middle" fontFamily="system-ui">{n.label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function StructuredDataPreview() {
  const fields = [
    { k: 'breadcrumb', v: '✓' },
    { k: 'faqPage',    v: '✓' },
    { k: 'service',    v: '✓' },
    { k: 'aboutPage',  v: '✓' },
    { k: 'person',     v: '✓' },
  ]
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 11 }}>
      <div style={{ fontSize: 10, letterSpacing: 1.2, color: '#5f6368', fontWeight: 700, marginBottom: 4 }}>SCHEMA.ORG TYPES EMITTED</div>
      {fields.map((f, i) => (
        <div key={f.k} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: i < fields.length - 1 ? '1px solid #f3f4f7' : 'none' }}>
          <span style={{ color: '#1a0dab', fontFamily: 'var(--font-mono)' }}>{f.k}</span>
          <span style={{ color: '#10a37f', fontWeight: 700 }}>{f.v}</span>
        </div>
      ))}
    </div>
  )
}

function SignalMetersPreview() {
  const sources = [
    { name: 'Wikidata', pct: 100 },
    { name: 'Crunchbase', pct: 90 },
    { name: 'LinkedIn', pct: 85 },
    { name: 'Industry dirs', pct: 75 },
  ]
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5, gap: 6 }}>
      {sources.map((s) => (
        <div key={s.name}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <span style={{ color: '#202124' }}>{s.name}</span>
            <span style={{ color: '#1e5fe0', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{s.pct}%</span>
          </div>
          <div style={{ height: 4, background: '#ececf1', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: `${s.pct}%`, height: '100%', background: 'linear-gradient(90deg, #1e5fe0, #7eb6ff)' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function FreshnessPreview() {
  const dates = ['Today', 'Yesterday', '2d ago', '5d ago', '7d ago']
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5, gap: 5 }}>
      <div style={{ fontSize: 10, letterSpacing: 1, color: '#5f6368', fontWeight: 700 }}>PUBLISH CADENCE · LAST 7 DAYS</div>
      {dates.map((d, i) => (
        <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 50, fontSize: 10, color: '#5f6368' }}>{d}</span>
          <div style={{ flex: 1, height: 6, background: 'linear-gradient(90deg, #1e5fe0, #7eb6ff)', borderRadius: 3, opacity: 1 - i * 0.12 }} />
          <span style={{ fontSize: 9.5, color: '#10a37f', fontWeight: 700 }}>✓</span>
        </div>
      ))}
    </div>
  )
}

function CitationsPreview() {
  const items = [
    { p: 'ChatGPT',    bg: '#10a37f', count: 'tracked' },
    { p: 'Perplexity', bg: '#1FB8CD', count: 'tracked' },
    { p: 'Gemini',     bg: '#1a73e8', count: 'tracked' },
    { p: 'Claude',     bg: '#cc785c', count: 'tracked' },
  ]
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 11 }}>
      <div style={{ fontSize: 10, letterSpacing: 1, color: '#5f6368', fontWeight: 700, marginBottom: 5 }}>CITATION MONITORING · BY PLATFORM</div>
      {items.map((it, i) => (
        <div key={it.p} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 0', borderBottom: i < items.length - 1 ? '1px solid #f3f4f7' : 'none' }}>
          <span style={{ width: 14, height: 14, borderRadius: 4, background: it.bg, color: '#fff', fontSize: 8, fontWeight: 700, display: 'grid', placeItems: 'center' }}>{it.p[0]}</span>
          <span style={{ flex: 1, fontSize: 10.5 }}>{it.p}</span>
          <span style={{ color: '#1e5fe0', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{it.count}</span>
        </div>
      ))}
    </div>
  )
}
