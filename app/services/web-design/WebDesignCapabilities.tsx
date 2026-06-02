'use client'
import CapabilityGrid, { PREVIEW_SHELL, type Capability } from '@/components/ui/CapabilityCard'

const CAPS: Capability[] = [
  { title: 'Security Website Design', desc: 'Conversion-focused websites built specifically for security installers, monitoring firms and product brands — designed to turn visitors into qualified enquiries.', preview: <BrowserMockPreview /> },
  { title: 'WordPress Development', desc: 'Fast, secure, easy-to-edit WordPress builds with custom themes and blocks so your team can update content without touching code.', preview: <WPEditorPreview /> },
  { title: 'Core Web Vitals Optimisation', desc: 'Every site is engineered for green Core Web Vitals — fast loads, stable layouts and instant interactivity that Google and buyers reward.', preview: <CWVPreview /> },
  { title: 'Hosting & Maintenance', desc: 'Managed edge hosting, security patching, backups and uptime monitoring so your site stays fast, safe and online — hands-off for you.', preview: <UptimePreview /> },
  { title: 'AI Search Architecture', desc: 'Schema-rich, entity-mapped, answer-first architecture so AI engines like ChatGPT and Perplexity can understand and cite your brand.', preview: <SchemaGraphPreview /> },
  { title: 'Website Redesign', desc: 'Modernise an ageing security site without losing rankings — we migrate carefully, preserve equity and lift conversions and speed.', preview: <BeforeAfterPreview /> },
]
export default function WebDesignCapabilities() { return <CapabilityGrid items={CAPS} /> }

function BrowserMockPreview() {
  return (
    <div style={{ ...PREVIEW_SHELL, padding: 0, overflow: 'hidden' }}>
      <div style={{ background: '#f1f3f5', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, borderBottom: '1px solid #ececf1' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ marginLeft: 6, color: '#5f6368' }}>securityblogs.com.au</span>
      </div>
      <div style={{ padding: 10, flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#0f2244', marginBottom: 4 }}>Be the answer AI gives.</div>
        <div style={{ fontSize: 9.5, color: '#46546e', marginBottom: 6 }}>AI visibility, SEO and paid media for security brands.</div>
        <div style={{ display: 'flex', gap: 4 }}>
          <span style={{ background: '#1e5fe0', color: '#fff', padding: '2px 8px', borderRadius: 4, fontSize: 9, fontWeight: 700 }}>Free audit</span>
          <span style={{ background: '#fff', border: '1px solid #d8e0ee', color: '#1e5fe0', padding: '2px 8px', borderRadius: 4, fontSize: 9 }}>Live score</span>
        </div>
      </div>
    </div>
  )
}

function WPEditorPreview() {
  return (
    <div style={{ ...PREVIEW_SHELL, padding: 0, overflow: 'hidden' }}>
      <div style={{ background: '#1d2327', color: '#fff', padding: '5px 8px', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: 2, background: '#0073aa' }} />WordPress · Block Editor
      </div>
      <div style={{ padding: 10, flex: 1, fontSize: 10, color: '#202124', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ background: '#f6f7f7', padding: '4px 6px', border: '1px dashed #0073aa', borderRadius: 3, fontSize: 9, color: '#0073aa', fontWeight: 700 }}>+ Heading block</div>
        <div style={{ background: '#fff', border: '1px solid #ececf1', padding: '4px 6px', borderRadius: 3 }}>Security CCTV installers in Sydney</div>
        <div style={{ background: '#fff', border: '1px solid #ececf1', padding: '4px 6px', borderRadius: 3, fontSize: 9, color: '#4d5156' }}>Built on WP. Editable in 30 seconds.</div>
        <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
          <span style={{ background: '#0073aa', color: '#fff', padding: '1px 5px', borderRadius: 3, fontSize: 8, fontWeight: 700 }}>PUBLISH ✓</span>
          <span style={{ color: '#10a37f', fontSize: 9 }}>● Live</span>
        </div>
      </div>
    </div>
  )
}

function CWVPreview() {
  const metrics = [{ k: 'LCP', v: '1.2s', good: true }, { k: 'INP', v: '120ms', good: true }, { k: 'CLS', v: '0.04', good: true }]
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5, gap: 8 }}>
      <div style={{ fontSize: 9, color: '#5f6368', fontWeight: 700, letterSpacing: 1 }}>CORE WEB VITALS · MOBILE</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
        {metrics.map((m) => (
          <div key={m.k} style={{ textAlign: 'center', padding: '6px 4px', background: '#e6f4ea', border: '1px solid #34a853', borderRadius: 6 }}>
            <div style={{ fontSize: 9, color: '#188038', fontWeight: 700 }}>{m.k}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#188038', fontFamily: 'var(--font-mono)' }}>{m.v}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 9.5, color: '#188038', textAlign: 'center', fontWeight: 700 }}>● All metrics GREEN</div>
    </div>
  )
}

function UptimePreview() {
  const days = Array.from({ length: 30 })
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5, gap: 4 }}>
      <div style={{ fontSize: 9, color: '#5f6368', fontWeight: 700, letterSpacing: 1 }}>UPTIME · LAST 30 DAYS</div>
      <div style={{ display: 'flex', gap: 1.5, marginTop: 2 }}>
        {days.map((_, i) => <span key={i} style={{ flex: 1, height: 18, background: '#10a37f', borderRadius: 1 }} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginTop: 4 }}>
        <span style={{ color: '#5f6368' }}>0 incidents</span>
        <span style={{ color: '#10a37f', fontWeight: 700 }}>100.00%</span>
      </div>
      <div style={{ fontSize: 9.5, color: '#5f6368' }}>Backups · Patches · TLS auto-renewed</div>
    </div>
  )
}

function SchemaGraphPreview() {
  const nodes = [
    { x: 50, y: 50, label: 'Org', primary: true },
    { x: 22, y: 22, label: 'Service' },
    { x: 78, y: 22, label: 'FAQ' },
    { x: 22, y: 78, label: 'Article' },
    { x: 78, y: 78, label: 'Person' },
  ]
  return (
    <div style={{ ...PREVIEW_SHELL, padding: 0 }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        {nodes.slice(1).map((n, i) => <line key={i} x1="50" y1="50" x2={n.x} y2={n.y} stroke="#1e5fe0" strokeWidth="0.4" opacity="0.5" />)}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.primary ? 8 : 5} fill={n.primary ? '#1e5fe0' : '#7eb6ff'} className={n.primary ? 'sb-card-rank' : ''} />
            <text x={n.x} y={n.y + 2} fontSize="3" fill="#fff" textAnchor="middle" fontFamily="system-ui" fontWeight="700">{n.label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function BeforeAfterPreview() {
  return (
    <div style={{ ...PREVIEW_SHELL, padding: 8, gap: 6, display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: 1, background: '#f1f3f5', borderRadius: 5, padding: 6 }}>
        <div style={{ fontSize: 8, color: '#5f6368', fontWeight: 700, letterSpacing: 1 }}>BEFORE</div>
        <div style={{ background: '#d1d5db', height: 6, borderRadius: 2, marginTop: 4 }} />
        <div style={{ background: '#d1d5db', height: 4, borderRadius: 2, marginTop: 3, width: '70%' }} />
        <div style={{ background: '#d1d5db', height: 4, borderRadius: 2, marginTop: 3, width: '85%' }} />
        <div style={{ fontSize: 8, color: '#d93025', fontWeight: 700, marginTop: 6 }}>LCP 4.2s · CLS 0.18</div>
      </div>
      <span style={{ alignSelf: 'center', fontSize: 12, color: '#1e5fe0', fontWeight: 700 }}>→</span>
      <div style={{ flex: 1, background: 'linear-gradient(180deg, #f1f6ff, #fff)', border: '1px solid #1e5fe0', borderRadius: 5, padding: 6 }}>
        <div style={{ fontSize: 8, color: '#1e5fe0', fontWeight: 700, letterSpacing: 1 }}>AFTER</div>
        <div style={{ background: '#1e5fe0', height: 6, borderRadius: 2, marginTop: 4 }} />
        <div style={{ background: '#7eb6ff', height: 4, borderRadius: 2, marginTop: 3, width: '70%' }} />
        <div style={{ background: '#7eb6ff', height: 4, borderRadius: 2, marginTop: 3, width: '85%' }} />
        <div style={{ fontSize: 8, color: '#188038', fontWeight: 700, marginTop: 6 }}>LCP 1.2s · CLS 0.04</div>
      </div>
    </div>
  )
}
