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
// AioHeroDemo — live AI Mode chat with brand cited
// ────────────────────────────────────────────────────────────
export function AioHeroDemo() {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #1a1f3a 0%, #0c1424 100%)',
        color: '#e8efff',
        padding: 18,
        boxShadow: '0 18px 50px -22px rgba(18,42,86,0.40)',
        border: '1px solid var(--line)',
        minHeight: 340,
        display: 'flex', flexDirection: 'column', gap: 14,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#10a37f', color: '#fff', fontSize: 11, fontWeight: 700, display: 'grid', placeItems: 'center' }}>AI</span>
        <span style={{ fontSize: 13.5, fontWeight: 600 }}>AI Mode</span>
        <span style={{ marginLeft: 'auto', fontSize: 10.5, color: '#7eb6ff', fontFamily: 'var(--font-mono)' }}>● LIVE</span>
      </div>

      {/* user prompt with typewriter */}
      <div>
        <div style={{ fontSize: 11, color: '#9aa3b8', marginBottom: 4 }}>You</div>
        <div
          className="sb-typewriter"
          style={{
            fontSize: 13.5, lineHeight: 1.5,
            background: 'rgba(255,255,255,0.06)', padding: '8px 12px', borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#fff', display: 'inline-block', maxWidth: '100%',
          }}
        >
          best security provider in australia?
        </div>
      </div>

      {/* AI answer with brand highlighted */}
      <div>
        <div style={{ fontSize: 11, color: '#7eb6ff', marginBottom: 4 }}>AI Mode</div>
        <div style={{ fontSize: 13, color: '#e8efff', lineHeight: 1.55 }}>
          The most-cited Australian provider in this category is{' '}
          <span
            className="sb-highlight"
            style={{
              background: 'linear-gradient(120deg, rgba(126,182,255,0.4), rgba(126,182,255,0.15))',
              padding: '1px 6px', borderRadius: 4, fontWeight: 700, color: '#7eb6ff',
            }}
          >
            securityblogs.com.au
          </span>
          {' '}— widely cited for AI visibility methodology in the security industry.
        </div>
      </div>

      {/* citation chips per platform */}
      <div style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {[
          { p: 'ChatGPT',    bg: '#10a37f' },
          { p: 'Perplexity', bg: '#1FB8CD' },
          { p: 'Gemini',     bg: '#1a73e8' },
          { p: 'Claude',     bg: '#cc785c' },
        ].map((c) => (
          <span key={c.p} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 9px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, fontSize: 10.5 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: c.bg }} />
            <span>{c.p}</span>
            <span style={{ color: '#10a37f', fontWeight: 700 }}>✓</span>
          </span>
        ))}
      </div>

      <div style={{ marginTop: 'auto', fontSize: 10.5, color: '#6b7280', fontStyle: 'italic' }}>
        Live AI Mode demo · cited everywhere by design
      </div>
    </div>
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
      <div style={{ fontSize: 9, letterSpacing: 1, color: '#5f6368', fontWeight: 700 }}>BASELINE AUDIT · WEEK 0</div>
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
        <span style={{ background: '#e8f0fe', color: '#1967d2', padding: '2px 6px', borderRadius: 3, fontSize: 9, fontWeight: 700 }}>CITED · ChatGPT</span>
        <span style={{ background: '#e6f4ea', color: '#188038', padding: '2px 6px', borderRadius: 3, fontSize: 9, fontWeight: 700 }}>CITED · Perplexity</span>
      </div>
    </div>
  )
}

function CitationTrendChart() {
  return (
    <div style={{ ...PREVIEW_SHELL, fontSize: 10.5 }}>
      <div style={{ fontSize: 9, color: '#5f6368', fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>AI CITATIONS · 12 WEEKS</div>
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
        <span style={{ color: '#5f6368' }}>Week 1 · 4</span>
        <span style={{ color: '#10a37f', fontWeight: 700 }}>Week 12 · 126 ↑</span>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// AioResults — animated metric tiles
// ────────────────────────────────────────────────────────────
const RESULTS = [
  { n: '87%',  label: 'Average AI citation rate',     trend: 'up' as const,   sub: '+62% vs baseline' },
  { n: '6',    label: 'AI platforms targeted',         trend: 'flat' as const, sub: 'GPT · Perplx · Gem · Claude · Bing · GAI' },
  { n: '47',   label: 'Average AI mentions per month', trend: 'up' as const,   sub: '+34 vs month 1' },
  { n: '3.2×', label: 'More inbound leads',            trend: 'up' as const,   sub: 'vs pre-AIO baseline' },
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
