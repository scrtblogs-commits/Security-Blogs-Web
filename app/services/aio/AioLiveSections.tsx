'use client'
import { PREVIEW_SHELL } from '@/components/ui/CapabilityCard'

// Three live-preview sections used on /services/aio/:
//   <AioHeroDemo/>     — replaces NeuralNetworkCanvas in the hero right column
//   <AioJourney/>      — replaces generic ProcessSteps with a 4-step grid
//                         where each step carries its own themed live preview
//   <AioResults/>      — replaces StatsStrip with animated counter tiles
//
// All visuals are inline JSX + CSS, no extra deps. Animations reuse the
// sb-* keyframes already in app/globals.css.

// ────────────────────────────────────────────────────────────
// AioHeroDemo — 3-column flow showing the AIO pipeline:
//   Brand inputs  →  AI engines (real platform marks)  →  Verified citations
// Animated dashed lines flow left → right. Right column outputs are green
// to signal a successful "cited" outcome. No abstract neural-net look —
// every node represents something concrete in the AIO methodology.
// ────────────────────────────────────────────────────────────

const INPUTS = [
  { label: 'Schema markup',   tone: '#1e5fe0', icon: <SchemaIcon /> },
  { label: 'Citable content', tone: '#1e5fe0', icon: <DocIcon /> },
  { label: 'Entity signals',  tone: '#1e5fe0', icon: <GraphIcon /> },
]

const ENGINES = [
  { label: 'ChatGPT',    tone: '#10a37f', mono: 'AI' },
  { label: 'Perplexity', tone: '#1FB8CD', mono: 'P' },
  { label: 'Gemini',     tone: '#1a73e8', mono: 'G' },
  { label: 'Claude',     tone: '#cc785c', mono: 'C' },
]

export function AioHeroDemo() {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        background: '#fff',
        border: '1px solid var(--line)',
        boxShadow: '0 18px 50px -22px rgba(18,42,86,0.20)',
        padding: '20px 18px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: '#202124',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontSize: 11, letterSpacing: 1.4, color: '#1e5fe0', fontWeight: 700 }}>● HOW AIO WORKS · LIVE</div>
        <div style={{ fontSize: 10.5, color: '#10a37f', fontFamily: 'var(--font-mono)' }}>● 4 engines · citable</div>
      </div>

      <svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', minHeight: 280 }}>
        <defs>
          {/* dashed animated stroke for the connecting lines */}
          <linearGradient id="aio-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e5fe0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#10a37f" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Column headers */}
        <text x="80"  y="22" fontSize="11" fontWeight="700" fill="#5f6368" letterSpacing="1" textAnchor="middle">BRAND INPUTS</text>
        <text x="300" y="22" fontSize="11" fontWeight="700" fill="#5f6368" letterSpacing="1" textAnchor="middle">AI ENGINES</text>
        <text x="520" y="22" fontSize="11" fontWeight="700" fill="#10a37f" letterSpacing="1" textAnchor="middle">VERIFIED · CITED</text>

        {/* Flow lines (drawn first so they sit underneath the nodes) */}
        {INPUTS.flatMap((_, i) =>
          ENGINES.map((_, j) => (
            <line
              key={`l-in-${i}-${j}`}
              x1="120" y1={70 + i * 90}
              x2="260" y2={60 + j * 70}
              stroke="url(#aio-flow)" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.55"
              className="sb-flow-dash"
            />
          ))
        )}
        {ENGINES.map((_, j) => (
          <line
            key={`l-out-${j}`}
            x1="340" y1={60 + j * 70}
            x2="480" y2={60 + j * 70}
            stroke="#10a37f" strokeWidth="1.6" strokeDasharray="5 4"
            className="sb-flow-dash"
          />
        ))}

        {/* Column 1 — Brand inputs (blue) */}
        {INPUTS.map((it, i) => (
          <g key={it.label} transform={`translate(80 ${70 + i * 90})`}>
            <circle r="22" fill="#fff" stroke={it.tone} strokeWidth="2" />
            <foreignObject x="-14" y="-14" width="28" height="28">
              <div style={{ width: 28, height: 28, display: 'grid', placeItems: 'center', color: it.tone }}>{it.icon}</div>
            </foreignObject>
            <text y="42" fontSize="10.5" textAnchor="middle" fill="#202124" fontFamily="system-ui">{it.label}</text>
          </g>
        ))}

        {/* Column 2 — AI engines (real platform marks via colored chips) */}
        {ENGINES.map((e, j) => (
          <g key={e.label} transform={`translate(300 ${60 + j * 70})`}>
            <circle r="20" fill={e.tone} className="sb-card-rank" />
            <text y="4" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="#fff" fontFamily="system-ui">{e.mono}</text>
            <text y="38" fontSize="10" textAnchor="middle" fill="#202124" fontFamily="system-ui">{e.label}</text>
          </g>
        ))}

        {/* Column 3 — Verified citations (green checks) */}
        {ENGINES.map((e, j) => (
          <g key={`v-${e.label}`} transform={`translate(520 ${60 + j * 70})`}>
            <circle r="18" fill="#e6f4ea" stroke="#10a37f" strokeWidth="2" className="sb-pin" />
            <text y="5" fontSize="14" fontWeight="800" textAnchor="middle" fill="#10a37f">✓</text>
            <text y="36" fontSize="10" textAnchor="middle" fill="#10a37f" fontFamily="system-ui" fontWeight="700">CITED</text>
          </g>
        ))}
      </svg>

      <div style={{ marginTop: 10, padding: '10px 14px', background: 'linear-gradient(180deg, #f1f6ff 0%, #ffffff 100%)', border: '1.5px solid #1e5fe0', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="sb-card-rank">
        <span style={{ fontSize: 12.5, color: '#1a0dab', fontWeight: 700 }}>★ securityblogs.com.au</span>
        <span style={{ fontSize: 10.5, color: '#10a37f', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>every engine</span>
      </div>
    </div>
  )
}

// Inline SVG glyphs for the input column — render as foreignObject children
function SchemaIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="6" rx="1" />
      <rect x="3" y="14" width="10" height="6" rx="1" />
      <rect x="16" y="14" width="5" height="6" rx="1" />
    </svg>
  )
}
function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  )
}
function GraphIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <circle cx="4"  cy="6"  r="2" />
      <circle cx="4"  cy="18" r="2" />
      <circle cx="20" cy="6"  r="2" />
      <circle cx="20" cy="18" r="2" />
      <line x1="6"  y1="7"  x2="9.7" y2="10.5" />
      <line x1="6"  y1="17" x2="9.7" y2="13.5" />
      <line x1="18" y1="7"  x2="14.3" y2="10.5" />
      <line x1="18" y1="17" x2="14.3" y2="13.5" />
    </svg>
  )
}

// ────────────────────────────────────────────────────────────
// AioJourney — 4-step process, each with themed live preview
// ────────────────────────────────────────────────────────────
type Step = { n: number; title: string; desc: string; preview: React.ReactElement }
const STEPS: Step[] = [
  { n: 1, title: 'AI Visibility Audit',  desc: 'We test how every major AI platform sees, describes and cites your security brand today.', preview: <AuditCard /> },
  { n: 2, title: 'Schema & Structure',   desc: 'Implement schema, structured data and entity markup that make your brand machine-readable.', preview: <SchemaConsole /> },
  { n: 3, title: 'Citable Content Build', desc: 'Create authoritative, well-sourced content assets engineered to be quoted by answer engines.', preview: <ContentCitedCard /> },
  { n: 4, title: 'Monitor & Optimise',   desc: 'Track AI citations across platforms and refine signals to expand your mention share over time.', preview: <CitationTrendChart /> },
]

export function AioJourney() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
      {STEPS.map((s) => (
        <div key={s.n} className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ position: 'relative', minHeight: 140, background: '#f4f8fc', borderBottom: '1px solid var(--line)' }}>
            {s.preview}
          </div>
          <div style={{ padding: 20, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#1e5fe0', color: '#fff', fontSize: 11, fontWeight: 700, display: 'grid', placeItems: 'center' }}>{s.n}</span>
              <h3 style={{ fontSize: 16, margin: 0, color: 'var(--text)' }}>{s.title}</h3>
            </div>
            <p className="text-soft" style={{ fontSize: 13.5, lineHeight: 1.55, margin: 0 }}>{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function AuditCard() {
  const rows = [
    { p: 'ChatGPT',    score: 12, max: 100, color: '#d93025' },
    { p: 'Perplexity', score: 18, max: 100, color: '#fbbc04' },
    { p: 'Gemini',     score: 24, max: 100, color: '#fbbc04' },
    { p: 'Claude',     score: 8,  max: 100, color: '#d93025' },
  ]
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5, gap: 4, padding: 12 }}>
      <div style={{ fontSize: 9, letterSpacing: 1, color: '#5f6368', fontWeight: 700 }}>EXAMPLE AUDIT · ILLUSTRATIVE</div>
      {rows.map((r) => (
        <div key={r.p}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
            <span>{r.p}</span>
            <span style={{ color: r.color, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{r.score}/100</span>
          </div>
          <div style={{ height: 4, background: '#ececf1', borderRadius: 2 }}>
            <div style={{ width: `${r.score}%`, height: '100%', background: r.color, borderRadius: 2 }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function SchemaConsole() {
  return (
    <div style={{ ...PREVIEW_SHELL, fontFamily: 'var(--font-mono)', fontSize: 10, background: '#1f1f2b', color: '#e8efff', border: 'none', gap: 3 }}>
      <span style={{ color: '#c46aff' }}>&lt;script type=<span style={{ color: '#9cd86a' }}>&quot;application/ld+json&quot;</span>&gt;</span>
      <span style={{ color: '#e8efff' }}>{'{ "@context": "schema.org",'}</span>
      <span style={{ color: '#e8efff' }}>{'  "@type": '}<span style={{ color: '#9cd86a' }}>&quot;Organization&quot;</span>,</span>
      <span style={{ color: '#e8efff' }}>{'  "name": '}<span style={{ color: '#9cd86a' }}>&quot;SecurityBlogs&quot;</span>,</span>
      <span style={{ color: '#e8efff' }}>{'  "url": '}<span style={{ color: '#9cd86a' }}>&quot;securityblogs.com.au&quot;</span> {'}'}</span>
      <span style={{ color: '#c46aff' }}>&lt;/script&gt;</span>
      <span style={{ marginTop: 3, color: '#10a37f', fontSize: 9.5, fontFamily: 'system-ui, sans-serif' }}>● Validated · 0 errors</span>
    </div>
  )
}

function ContentCitedCard() {
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 11, gap: 4 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#1a0dab' }}>The AI Visibility Playbook</div>
      <div style={{ fontSize: 9.5, color: '#5f6368' }}>securityblogs.com.au · 12 min read</div>
      <div style={{ fontSize: 10.5, color: '#4d5156', lineHeight: 1.4, marginTop: 2 }}>
        How security brands engineer themselves to be the answer AI gives — methodology + measurement.
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
        <span style={{ background: '#e8f0fe', color: '#1967d2', padding: '2px 6px', borderRadius: 3, fontSize: 9, fontWeight: 700 }}>TARGET · ChatGPT</span>
        <span style={{ background: '#e6f4ea', color: '#188038', padding: '2px 6px', borderRadius: 3, fontSize: 9, fontWeight: 700 }}>TARGET · Perplexity</span>
      </div>
    </div>
  )
}

function CitationTrendChart() {
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5 }}>
      <div style={{ fontSize: 9, color: '#5f6368', fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>AI CITATION GROWTH · ILLUSTRATIVE</div>
      <svg viewBox="0 0 100 40" style={{ width: '100%', height: 56 }}>
        <defs>
          <linearGradient id="aio-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e5fe0" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1e5fe0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 36 L12 33 L24 30 L36 25 L48 21 L60 16 L72 12 L84 8 L96 5 L100 4 L100 40 L0 40 Z" fill="url(#aio-fade)" />
        <path d="M0 36 L12 33 L24 30 L36 25 L48 21 L60 16 L72 12 L84 8 L96 5 L100 4" fill="none" stroke="#1e5fe0" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="96" cy="5" r="2.2" fill="#1e5fe0" className="sb-card-rank" />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5 }}>
        <span style={{ color: '#5f6368' }}>Start</span>
        <span style={{ color: '#10a37f', fontWeight: 700 }}>Over time ↑</span>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// AioResults — animated metric tiles
// ────────────────────────────────────────────────────────────
const RESULTS = [
  { n: 'Schema',  label: 'Structured data that makes you machine-readable', trend: 'flat' as const, sub: 'Organization · FAQ · Article' },
  { n: '6+',      label: 'AI platforms we optimise for',                     trend: 'flat' as const, sub: 'GPT · Perplx · Gem · Claude · Bing · GAI' },
  { n: 'Entity',  label: 'Consistent brand signals across the web',         trend: 'flat' as const, sub: 'NAP · profiles · citations' },
  { n: 'Tracked', label: 'Ongoing AI citation monitoring',                  trend: 'flat' as const, sub: 'reported monthly' },
]

export function AioResults() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
      {RESULTS.map((r) => (
        <div key={r.label} className="card" style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 6, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="sb-card-rank" style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--blue)', lineHeight: 1 }}>
              {r.n}
            </span>
            {r.trend === 'up' && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: '#10a37f', fontSize: 12, fontWeight: 700, padding: '2px 7px', background: 'rgba(16,163,127,0.10)', borderRadius: 999 }}>
                ↑ live
              </span>
            )}
          </div>
          <div className="text-soft" style={{ fontSize: 14, lineHeight: 1.35 }}>{r.label}</div>
          <div className="text-dim" style={{ fontSize: 11.5, fontFamily: 'var(--font-mono)' }}>{r.sub}</div>
          {/* mini sparkline at the bottom */}
          {r.trend === 'up' && (
            <svg viewBox="0 0 100 14" style={{ width: '100%', height: 18, marginTop: 4 }} aria-hidden>
              <path d="M0 12 L14 10 L28 11 L42 7 L56 5 L70 4 L84 2 L100 1" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}
