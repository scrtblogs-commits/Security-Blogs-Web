'use client'
import Link from 'next/link'

// Premium service card faces — bespoke "live" UI mockups per service.
// All animations are pure CSS (globals.css sb-* classes) — no JS loop.
// Every card intentionally has looping motion so the stack feels alive.

type CardProps = { title: string; description: string; href: string; active?: boolean }

const SHELL: React.CSSProperties = {
  position: 'relative', height: '100%', width: '100%', overflow: 'hidden',
}

function CardCTA({ title, description, href, active }: CardProps) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      padding: '20px 22px 22px',
      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.52) 28%, rgba(0,0,0,0.86) 100%)',
    }}>
      <h3 style={{ fontSize: 20, marginBottom: 5, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{title}</h3>
      <p style={{ fontSize: 13, lineHeight: 1.45, marginBottom: 10, color: 'rgba(255,255,255,0.9)', maxWidth: 380 }}>{description}</p>
      <Link
        href={href}
        style={active
          ? { display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff', color: '#1e5fe0', fontWeight: 700, fontSize: 12.5, padding: '7px 14px', borderRadius: 7, textDecoration: 'none' }
          : { display: 'inline-flex', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,0.92)', fontWeight: 600, fontSize: 12.5, textDecoration: 'underline', textUnderlineOffset: 4 }
        }
      >Learn more →</Link>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// SEO — live Google SERP: rank tracker chart slowly draws + glows
// ─────────────────────────────────────────────────────────────────
export function SEOFace(p: CardProps) {
  return (
    <div style={{ ...SHELL, background: 'linear-gradient(160deg, #f0f4fd 0%, #dce8f5 100%)' }}>
      {/* Browser chrome */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: '#f1f3f4', padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5, borderBottom: '1px solid #dde1e7' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28c840' }} />
        <div style={{ flex: 1, marginLeft: 8, background: '#fff', borderRadius: 10, padding: '3px 10px', fontSize: 9.5, color: '#5f6368', border: '1px solid #dadce0', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ color: '#4285F4', fontWeight: 700, fontSize: 10 }}>G</span>
          <span>best security company australia</span>
        </div>
      </div>

      {/* Live traffic sparkline — draws itself on loop */}
      <div style={{ position: 'absolute', top: 28, right: 12, width: 90, height: 36 }}>
        <div style={{ fontSize: 8, color: '#64748b', marginBottom: 2, textAlign: 'right', fontFamily: 'var(--font-mono)' }}>↑ organic traffic</div>
        <svg viewBox="0 0 90 26" width="90" height="26">
          <defs>
            <linearGradient id="seo-traf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e5fe0" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#1e5fe0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 22 L10 19 L20 20 L30 15 L40 12 L50 9 L60 10 L70 6 L80 3 L90 1 L90 26 L0 26 Z" fill="url(#seo-traf)" />
          <path className="sb-traffic" d="M0 22 L10 19 L20 20 L30 15 L40 12 L50 9 L60 10 L70 6 L80 3 L90 1" fill="none" stroke="#1e5fe0" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* AI Overview — highlight pulses */}
      <div style={{ position: 'absolute', top: 28, left: 12, right: 110, background: 'linear-gradient(135deg, #faf5ff 0%, #eff6ff 100%)', border: '1px solid #c4b5fd', borderRadius: 10, padding: '8px 11px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
          <div style={{ width: 14, height: 14, borderRadius: 3, background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', display: 'grid', placeItems: 'center' }}>
            <span style={{ color: '#fff', fontSize: 8, fontWeight: 800 }}>AI</span>
          </div>
          <span style={{ fontSize: 9.5, fontWeight: 700, color: '#5b21b6', letterSpacing: '0.05em' }}>AI OVERVIEW</span>
        </div>
        <div style={{ fontSize: 11, color: '#1e1b4b', lineHeight: 1.5 }}>
          Top-rated:{' '}
          <span className="sb-highlight" style={{ background: 'rgba(99,102,241,0.18)', padding: '1px 5px', borderRadius: 3, fontWeight: 700, color: '#4338ca' }}>
            securityblogs.com.au
          </span>
        </div>
      </div>

      {/* SERP results — top row cycles active state */}
      <div style={{ position: 'absolute', top: 110, left: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div className="sb-card-rank" style={{ background: '#fff', border: '1.5px solid rgba(30,95,224,0.5)', borderRadius: 8, padding: '7px 10px', boxShadow: '0 4px 16px rgba(30,95,224,0.14)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: 'linear-gradient(135deg,#1e5fe0,#3b82f6)', display: 'grid', placeItems: 'center' }}><span style={{ color: '#fff', fontSize: 7, fontWeight: 800 }}>S</span></div>
            <span style={{ fontSize: 9, color: '#3c4043' }}>securityblogs.com.au › services</span>
            <span style={{ marginLeft: 'auto', fontSize: 9, background: '#e8f0fe', color: '#1e5fe0', padding: '1px 5px', borderRadius: 3, fontWeight: 700 }}>#1</span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1a0dab' }}>Security SEO & AI Visibility — SecurityBlogs</div>
          <div style={{ fontSize: 10, color: '#4d5156', lineHeight: 1.4, marginTop: 1 }}>Rank #1 in AI searches. Trusted by 500+ security brands across Australia.</div>
        </div>
        {[
          { site: 'competitor-security.com.au', title: 'Security SEO Services Australia' },
          { site: 'rival-seo.com.au', title: 'SEO for Security Companies' },
        ].map((r, i) => (
          <div key={i} className="sb-row-active" style={{ background: '#fff', borderRadius: 7, padding: '6px 10px', border: '1px solid #e8eaed', animationDelay: `${i * 1.8}s` }}>
            <div style={{ fontSize: 9, color: '#3c4043', marginBottom: 1 }}>{r.site}</div>
            <div style={{ fontSize: 11.5, color: '#1a0dab' }}>{r.title}</div>
          </div>
        ))}
      </div>

      <CardCTA {...p} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// AIO — live AI citation dashboard: bars fill on loop, score pulses
// ─────────────────────────────────────────────────────────────────
export function AIOFace(p: CardProps) {
  const platforms = [
    { name: 'ChatGPT',    color: '#10a37f', pct: 94 },
    { name: 'Gemini',     color: '#4285F4', pct: 88 },
    { name: 'Perplexity', color: '#8b5cf6', pct: 97 },
    { name: 'Copilot',    color: '#0078d4', pct: 82 },
  ]
  return (
    <div style={{ ...SHELL, background: 'linear-gradient(160deg, #0a0f1e 0%, #0d1424 100%)' }}>
      {/* Header */}
      <div style={{ position: 'absolute', top: 12, left: 14, right: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
            <span className="sb-live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#10a37f', display: 'inline-block' }} />
            <span style={{ fontSize: 9.5, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-mono)' }}>AI VISIBILITY DASHBOARD</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>securityblogs.com.au</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="sb-score-pulse" style={{ fontSize: 24, fontWeight: 800, color: '#7eb6ff', lineHeight: 1 }}>
            94<span style={{ fontSize: 12, color: 'rgba(126,182,255,0.5)', fontWeight: 400 }}>/100</span>
          </div>
          <div style={{ fontSize: 9, color: '#10a37f', fontWeight: 600, letterSpacing: '0.06em', marginTop: 2 }}>LIVE SCORE</div>
        </div>
      </div>

      {/* Platform citation bars — infinite loop */}
      <div style={{ position: 'absolute', top: 72, left: 14, right: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {platforms.map((pl, i) => (
          <div key={pl.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: pl.color, flexShrink: 0 }} />
                <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{pl.name}</span>
              </div>
              <span style={{ fontSize: 10, color: pl.color, fontWeight: 700 }}>{pl.pct}%</span>
            </div>
            <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <div
                className="sb-bar-loop"
                style={{
                  height: '100%', borderRadius: 3, width: `${pl.pct}%`,
                  background: `linear-gradient(90deg, ${pl.color} 0%, ${pl.color}bb 100%)`,
                  animationDelay: `${i * 0.18}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Live stat chips */}
      <div style={{ position: 'absolute', top: 204, left: 14, right: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { label: 'AI CITATIONS/MO', value: '47+', color: '#7eb6ff' },
          { label: 'BRAND MENTIONS',  value: '1.2k', color: '#10a37f' },
        ].map(s => (
          <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 10px' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)', marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <CardCTA {...p} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// AEO — answer engine: platform badges pop in staggered + answer pulses
// ─────────────────────────────────────────────────────────────────
export function AEOFace(p: CardProps) {
  return (
    <div style={{ ...SHELL, background: 'linear-gradient(160deg, #f8fafc 0%, #e8eef8 100%)' }}>
      {/* Platform badges — staggered pop-in loop */}
      <div style={{ position: 'absolute', top: 10, left: 12, right: 12, display: 'flex', gap: 5 }}>
        {[
          { name: 'Perplexity', bg: '#8b5cf6', delay: '0s' },
          { name: 'Gemini',     bg: '#4285F4', delay: '0.5s' },
          { name: 'ChatGPT',    bg: '#10a37f', delay: '1.0s' },
          { name: 'Copilot',    bg: '#0078d4', delay: '1.5s' },
        ].map(pl => (
          <div
            key={pl.name}
            style={{
              background: pl.bg, color: '#fff',
              fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4,
              animation: 'sb-badge-pop 4s ease-in-out infinite',
              animationDelay: pl.delay,
            }}
          >
            {pl.name}
          </div>
        ))}
      </div>

      {/* Question card */}
      <div style={{ position: 'absolute', top: 38, left: 12, right: 12, background: '#fff', borderRadius: 10, padding: '9px 13px', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', border: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: 9.5, color: '#64748b', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 3 }}>ANSWER ENGINE QUERY</div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1e293b' }}>Best AI visibility service for security companies in Australia?</div>
      </div>

      {/* Featured answer — pulses */}
      <div className="sb-card-rank" style={{
        position: 'absolute', top: 112, left: 12, right: 12,
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)',
        border: '1.5px solid #3b82f6', borderRadius: 10, padding: '10px 13px',
        boxShadow: '0 6px 24px rgba(59,130,246,0.16)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
          <span style={{ fontSize: 9, letterSpacing: '0.12em', color: '#2563eb', fontWeight: 800, background: '#dbeafe', padding: '2px 6px', borderRadius: 3 }}>POSITION 0 · FEATURED</span>
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1d4ed8', marginBottom: 4 }}>securityblogs.com.au</div>
        <div style={{ fontSize: 11, color: '#334155', lineHeight: 1.5 }}>Australia&apos;s #1 AI visibility platform — cited by every major answer engine.</div>
      </div>

      {/* Source chips */}
      <div style={{ position: 'absolute', top: 212, left: 12, right: 12, display: 'flex', gap: 5 }}>
        {['linkedin.com', 'wikipedia.org', 'g2.com'].map((s, i) => (
          <div key={s} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 5, padding: '3px 8px', fontSize: 9, color: '#64748b', animation: 'sb-badge-pop 5s ease-in-out infinite', animationDelay: `${i * 0.6}s` }}>{s}</div>
        ))}
      </div>

      <CardCTA {...p} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// GEO — SVG Australia map: pins pulse + scan ring expands
// ─────────────────────────────────────────────────────────────────
const AU_OUTLINE = `M 18,90 L 14,68 16,44 26,26 42,14 62,8 88,4 118,2 150,0 182,4 L 198,22 212,18 228,14 246,12 264,12 280,8 300,14 L 316,22 326,40 332,62 334,88 336,114 338,138 L 340,160 340,176 336,190 326,202 312,210 296,212 L 278,212 260,212 244,214 228,218 212,222 196,226 L 178,228 162,228 148,224 136,220 124,222 110,226 L 94,228 78,226 62,224 48,222 32,218 20,212 L 12,202 10,188 10,168 10,148 12,126 14,108 18,90 Z`

const AU_CAPITALS = [
  { name: 'Darwin',    top: 5.5,  left: 54.2 },
  { name: 'Brisbane',  top: 56.7, left: 91.4 },
  { name: 'Perth',     top: 67.5, left: 10.6 },
  { name: 'Sydney',    top: 71.3, left: 88.9 },
  { name: 'Adelaide',  top: 73.3, left: 63.1 },
  { name: 'Canberra',  top: 74.2, left: 84.7 },
  { name: 'Melbourne', top: 82.1, left: 76.4 },
  { name: 'Hobart',    top: 93.3, left: 80.3 },
]

export function GEOFace(p: CardProps) {
  return (
    <div style={{ ...SHELL, background: 'linear-gradient(160deg, #e8f2ff 0%, #d0e4f8 100%)' }}>
      <div style={{ position: 'absolute', top: 12, left: 14, zIndex: 5, background: 'rgba(255,255,255,0.96)', padding: '4px 10px', borderRadius: 999, fontSize: 10, color: '#1a3661', fontWeight: 600, border: '1px solid rgba(30,95,224,0.25)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        ● securityblogs.com.au · 8 capitals
      </div>
      <div style={{ position: 'absolute', top: 12, right: 14, zIndex: 5, background: 'rgba(30,95,224,0.9)', padding: '4px 10px', borderRadius: 999, fontSize: 10, color: '#fff', fontWeight: 700 }}>100% national</div>

      {/* SVG map */}
      <div style={{ position: 'absolute', top: 38, left: 8, right: 8, bottom: 88 }}>
        <svg viewBox="0 0 360 240" width="100%" height="100%" style={{ display: 'block' }}>
          <defs>
            <radialGradient id="geo-land" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="100%" stopColor="#bfdbfe" />
            </radialGradient>
          </defs>
          <rect width="360" height="240" fill="#e0eeff" rx="4" />
          <path d={AU_OUTLINE} fill="url(#geo-land)" stroke="#93c5fd" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Scan ping from Sydney */}
          {(() => {
            const s = AU_CAPITALS.find(c => c.name === 'Sydney')!
            const cx = s.left / 100 * 360, cy = s.top / 100 * 240
            return <>
              <circle cx={cx} cy={cy} r="18" fill="none" stroke="rgba(30,95,224,0.25)" strokeWidth="1" className="sb-ping" />
              <circle cx={cx} cy={cy} r="28" fill="none" stroke="rgba(30,95,224,0.12)" strokeWidth="1" className="sb-ping" style={{ animationDelay: '0.5s' }} />
            </>
          })()}
          {/* Pins */}
          {AU_CAPITALS.map((c, i) => {
            const cx = c.left / 100 * 360, cy = c.top / 100 * 240
            return (
              <g key={c.name}>
                <circle cx={cx} cy={cy} r="8" fill="rgba(30,95,224,0.14)" className="sb-pin" style={{ animationDelay: `${i * 0.28}s` }} />
                <circle cx={cx} cy={cy} r="4" fill="#1e5fe0" stroke="#fff" strokeWidth="1.5" />
              </g>
            )
          })}
          <ellipse cx="318" cy="226" rx="10" ry="8" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Stats */}
      <div style={{ position: 'absolute', bottom: 88, left: 8, right: 8, background: 'rgba(255,255,255,0.9)', borderRadius: '0 0 8px 8px', padding: '6px 12px', display: 'flex', justifyContent: 'space-around', borderTop: '1px solid rgba(30,95,224,0.12)' }}>
        {[['8', 'Cities'], ['500+', 'Clients'], ['94%', 'Visibility']].map(([v, l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#1e5fe0' }}>{v}</div>
            <div style={{ fontSize: 9, color: '#64748b', fontWeight: 500 }}>{l}</div>
          </div>
        ))}
      </div>

      <CardCTA {...p} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// Google Ads — live campaign dashboard: bars loop, quality row sweeps
// ─────────────────────────────────────────────────────────────────
export function GoogleAdsFace(p: CardProps) {
  const bars = [18, 28, 22, 38, 48, 55, 62, 72, 80, 88, 92, 95]
  return (
    <div style={{ ...SHELL, background: 'linear-gradient(160deg, #f8fafc 0%, #e8f0fe 100%)' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: '#fff', padding: '8px 14px', borderBottom: '1px solid #e8eaed', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 16, height: 16, borderRadius: 3, background: 'linear-gradient(135deg, #4285F4 0%, #34A853 50%, #FBBC04 75%, #EA4335 100%)' }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: '#202124' }}>Google Ads · securityblogs.com.au</span>
        </div>
        <span style={{ fontSize: 9.5, color: '#34a853', fontWeight: 700, background: '#e6f4ea', padding: '2px 7px', borderRadius: 4 }}>3 Active</span>
      </div>

      <div style={{ position: 'absolute', top: 40, left: 12, right: 12, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {[
          { label: 'IMPRESSIONS', value: '24.6k', delta: '+68%', color: '#1a73e8' },
          { label: 'CLICKS',      value: '1.24k', delta: '+41%', color: '#188038' },
          { label: 'CONV. RATE',  value: '8.4%',  delta: '+22%', color: '#9c27b0' },
        ].map((k, i) => (
          <div key={k.label} className="sb-row-active" style={{ background: '#fff', borderRadius: 8, padding: '8px 10px', border: '1px solid #e8eaed', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', animationDelay: `${i * 1.2}s` }}>
            <div style={{ fontSize: 8.5, letterSpacing: '0.06em', color: '#5f6368', fontWeight: 600, marginBottom: 3 }}>{k.label}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: k.color, lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontSize: 9, color: '#188038', fontWeight: 600, marginTop: 2 }}>{k.delta} ↑</div>
          </div>
        ))}
      </div>

      {/* Bar chart — bars loop infinitely */}
      <div style={{ position: 'absolute', top: 128, left: 12, right: 12 }}>
        <div style={{ fontSize: 9, color: '#9aa3b5', marginBottom: 5, fontFamily: 'var(--font-mono)' }}>CLICKS — LAST 12 WEEKS</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 38 }}>
          {bars.map((h, i) => (
            <div key={i} className="sb-bar-loop" style={{ flex: 1, height: `${h}%`, background: `linear-gradient(180deg, #1a73e8 0%, #4285f4 100%)`, borderRadius: '2px 2px 0 0', animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>

      {/* Quality score */}
      <div style={{ position: 'absolute', top: 188, left: 12, right: 12, background: '#fff', border: '1px solid #e8eaed', borderRadius: 8, padding: '7px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 10.5, color: '#5f6368', fontWeight: 600 }}>Quality Score</span>
        <div style={{ display: 'flex', gap: 3 }}>
          {[1,2,3,4,5,6,7,8,9,10].map(n => (
            <div key={n} style={{ width: 14, height: 5, borderRadius: 2, background: n <= 9 ? '#1a73e8' : '#e8eaed' }} />
          ))}
        </div>
        <span style={{ fontSize: 11, fontWeight: 800, color: '#1a73e8' }}>9/10</span>
      </div>

      <CardCTA {...p} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// Bing Ads — sparkline draws itself on loop, impression bar fills
// ─────────────────────────────────────────────────────────────────
export function BingAdsFace(p: CardProps) {
  return (
    <div style={{ ...SHELL, background: 'linear-gradient(160deg, #f0f8ff 0%, #cce5f6 100%)' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: '#fff', padding: '8px 14px', borderBottom: '1px solid #dde4eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: 16, height: 16, gap: 1.5 }}>
            <span style={{ background: '#f25022', borderRadius: 1 }} />
            <span style={{ background: '#7fba00', borderRadius: 1 }} />
            <span style={{ background: '#00a4ef', borderRadius: 1 }} />
            <span style={{ background: '#ffb900', borderRadius: 1 }} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#0d4b78' }}>Microsoft Advertising</span>
        </div>
        <span style={{ fontSize: 9.5, color: '#0078d4', fontWeight: 700 }}>● Live</span>
      </div>

      <div style={{ position: 'absolute', top: 40, left: 12, right: 12, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {[
          { label: 'IMPRESSIONS', value: '11.3k', delta: '+48%', color: '#0078d4' },
          { label: 'CLICKS',      value: '596',   delta: '+33%', color: '#107c10' },
          { label: 'CPC',         value: '$1.94', delta: '-38%', color: '#107c10' },
        ].map((k, i) => (
          <div key={k.label} className="sb-row-active" style={{ background: '#fff', borderRadius: 8, padding: '8px 10px', border: '1px solid #deebf7', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', animationDelay: `${i * 1.2}s` }}>
            <div style={{ fontSize: 8.5, letterSpacing: '0.06em', color: '#6b7a85', fontWeight: 600, marginBottom: 3 }}>{k.label}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: k.color, lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontSize: 9, color: '#107c10', fontWeight: 600, marginTop: 2 }}>{k.delta}</div>
          </div>
        ))}
      </div>

      {/* Sparkline — draws itself in loop */}
      <div style={{ position: 'absolute', top: 128, left: 12, right: 12 }}>
        <div style={{ fontSize: 9, color: '#6b7a85', marginBottom: 4, fontFamily: 'var(--font-mono)' }}>CLICKS TREND — 12 WEEKS</div>
        <svg viewBox="0 0 280 40" style={{ width: '100%', height: 36, display: 'block', overflow: 'visible' }}>
          <defs>
            <linearGradient id="bing-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0078d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0078d4" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d="M0 34 L24 30 L48 32 L72 26 L96 22 L120 18 L144 14 L168 16 L192 10 L216 8 L240 6 L264 4 L280 3 L280 40 L0 40 Z" fill="url(#bing-fill)" />
          <path className="sb-sparkline" d="M0 34 L24 30 L48 32 L72 26 L96 22 L120 18 L144 14 L168 16 L192 10 L216 8 L240 6 L264 4 L280 3" fill="none" stroke="#0078d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Impression share — fills on loop */}
      <div style={{ position: 'absolute', top: 190, left: 12, right: 12, background: '#fff', border: '1px solid #deebf7', borderRadius: 8, padding: '7px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontSize: 10, color: '#0d4b78', fontWeight: 600 }}>Search Impression Share</span>
          <span style={{ fontSize: 11, color: '#0078d4', fontWeight: 800 }}>42%</span>
        </div>
        <div style={{ height: 5, background: '#e3f2fd', borderRadius: 3, overflow: 'hidden' }}>
          <div className="sb-bar-loop" style={{ height: '100%', width: '42%', background: 'linear-gradient(90deg, #0078d4, #00b4d8)', borderRadius: 3 }} />
        </div>
      </div>

      <CardCTA {...p} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// Web Design — browser scrolls live + Lighthouse scores
// ─────────────────────────────────────────────────────────────────
export function WebDesignFace(p: CardProps) {
  const scores = [
    { label: 'Performance', score: 98, color: '#0cce6b' },
    { label: 'SEO',         score: 100, color: '#0cce6b' },
    { label: 'Accessib.',   score: 96,  color: '#0cce6b' },
    { label: 'Best Pract.', score: 100, color: '#0cce6b' },
  ]
  return (
    <div style={{ ...SHELL, background: 'linear-gradient(160deg, #1a2035 0%, #0f172a 100%)' }}>
      {/* Browser frame */}
      <div style={{ position: 'absolute', top: 12, left: 12, right: 12, bottom: 92, borderRadius: 10, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.45)' }}>
        <div style={{ background: '#1e2436', padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
          <span style={{ marginLeft: 8, fontSize: 9, color: '#8892a4', fontFamily: 'var(--font-mono)' }}>securityblogs.com.au</span>
          <span style={{ marginLeft: 'auto', fontSize: 8, color: '#28c840', fontWeight: 600 }}>● Online</span>
        </div>
        <div style={{ height: 'calc(100% - 24px)', background: '#fff', overflow: 'hidden' }}>
          <div className="sb-scroll-loop">
            {[0, 1].map(d => (
              <div key={d} style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 7 }}>
                <div style={{ height: 3, background: 'linear-gradient(90deg, #1e5fe0, #6f4dff)', borderRadius: 2 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#0f172a' }}>Be the answer AI gives.</div>
                  <div style={{ width: 22, height: 22, borderRadius: 4, background: 'linear-gradient(135deg, #1e5fe0, #6f4dff)' }} />
                </div>
                <div style={{ height: 3, background: '#f1f5f9', borderRadius: 2, width: '80%' }} />
                <div style={{ height: 3, background: '#f1f5f9', borderRadius: 2, width: '65%' }} />
                <div style={{ display: 'flex', gap: 5, marginTop: 2 }}>
                  <div style={{ background: '#1e5fe0', color: '#fff', padding: '3px 8px', borderRadius: 4, fontSize: 8.5 }}>Get audit →</div>
                  <div style={{ background: '#f1f5f9', color: '#1e5fe0', padding: '3px 8px', borderRadius: 4, fontSize: 8.5 }}>Live score</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                  <div style={{ height: 18, background: '#f1f5f9', borderRadius: 4 }} />
                  <div style={{ height: 18, background: '#f1f5f9', borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lighthouse score row */}
      <div style={{ position: 'absolute', bottom: 90, left: 12, right: 12, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 5 }}>
        {scores.map((s, i) => (
          <div key={s.label} className="sb-row-active" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7, padding: '6px 5px', textAlign: 'center', animationDelay: `${i * 0.9}s` }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: s.color }}>{s.score}</div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <CardCTA {...p} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// GMB — local pack: pins pulse, listings cycle highlight
// ─────────────────────────────────────────────────────────────────
export function GmbProfileFace(p: CardProps) {
  return (
    <div style={{ ...SHELL, background: 'linear-gradient(160deg, #f0fdf4 0%, #dcfce7 100%)' }}>
      {/* Search bar */}
      <div style={{ position: 'absolute', top: 10, left: 12, right: 12, padding: '7px 12px', background: '#fff', border: '1px solid #dadce0', borderRadius: 22, display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, color: '#202124', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <span style={{ fontSize: 13 }}>📍</span>
        <span style={{ flex: 1 }}>security company near me</span>
        <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'linear-gradient(135deg, #4285F4 0%, #34A853 50%, #FBBC04 75%, #EA4335 100%)' }} />
      </div>

      {/* Map with road grid and pulsing pins */}
      <div style={{ position: 'absolute', top: 48, left: 0, right: 0, height: 78, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #e8f5e9 0%, #c8e6c9 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(255,255,255,0.5) 1.5px, transparent 1.5px)', backgroundSize: '26px 26px' }} />
        <div style={{ position: 'absolute', top: '30%', left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.7)', borderRadius: 2 }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '38%', width: 3, background: 'rgba(255,255,255,0.7)', borderRadius: 2 }} />
        {/* Pulsing pins */}
        {[
          { l: '35%', t: '28%', color: '#34a853' },
          { l: '55%', t: '52%', color: '#1a73e8' },
          { l: '72%', t: '38%', color: '#ea4335' },
        ].map((pin, i) => (
          <div key={i} style={{ position: 'absolute', left: pin.l, top: pin.t, transform: 'translate(-50%,-50%)' }}>
            {/* Pulse ring */}
            <span className="sb-ping" style={{ position: 'absolute', top: '50%', left: '50%', width: 20, height: 20, borderRadius: '50%', border: `2px solid ${pin.color}`, display: 'block', animationDelay: `${i * 0.7}s` }} />
            <div style={{ width: 20, height: 20, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: pin.color, border: '2.5px solid #fff', boxShadow: '0 3px 8px rgba(0,0,0,0.25)', position: 'relative', zIndex: 2 }} />
          </div>
        ))}
      </div>

      {/* Listings — cycle highlight */}
      <div style={{ position: 'absolute', top: 132, left: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 5 }}>
        {[
          { rank: 1, name: 'SecureGuard Pro',    rating: '4.9', reviews: '142', tag: 'Verified ✓', tagColor: '#34a853', delay: '0s' },
          { rank: 2, name: 'SafeShield Security', rating: '4.6', reviews: '89',  tag: 'Open now',  tagColor: '#1a73e8', delay: '1.2s' },
          { rank: 3, name: 'TrustWatch Alarms',   rating: '4.3', reviews: '54',  tag: null, delay: '2.4s' },
        ].map(l => (
          <div
            key={l.rank}
            className={l.rank === 1 ? 'sb-card-rank' : 'sb-row-active'}
            style={{
              background: l.rank === 1 ? 'rgba(52,168,83,0.08)' : '#fff',
              border: l.rank === 1 ? '1.5px solid rgba(52,168,83,0.5)' : '1px solid #e0e4e8',
              borderRadius: 8, padding: '6px 10px',
              display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: l.rank === 1 ? '0 4px 12px rgba(52,168,83,0.12)' : '0 1px 4px rgba(0,0,0,0.04)',
              animationDelay: l.delay,
            }}
          >
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: l.rank === 1 ? '#34a853' : '#e0e4e8', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: l.rank === 1 ? '#fff' : '#6b7280' }}>{l.rank}</span>
            </div>
            <span style={{ flex: 1, fontSize: 11, fontWeight: l.rank === 1 ? 700 : 500, color: l.rank === 1 ? '#14532d' : '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.name}</span>
            {l.tag && <span style={{ fontSize: 8.5, background: l.tagColor + '18', color: l.tagColor, padding: '1px 5px', borderRadius: 3, fontWeight: 600, flexShrink: 0 }}>{l.tag}</span>}
            <span style={{ fontSize: 9.5, color: '#f9ab00', fontWeight: 700, flexShrink: 0 }}>★ {l.rating}</span>
            <span style={{ fontSize: 9, color: '#9ca3af', flexShrink: 0 }}>({l.reviews})</span>
          </div>
        ))}
      </div>

      <CardCTA {...p} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// ServiceFace — slug dispatcher used by homepage + services grid
// ─────────────────────────────────────────────────────────────────
export function ServiceFace({
  slug, title, description, href, active = true,
}: { slug: string; title: string; description: string; href: string; active?: boolean }) {
  const common = { title, description, href, active }
  switch (slug) {
    case 'security-seo': return <SEOFace {...common} />
    case 'aio':          return <AIOFace {...common} />
    case 'aeo':          return <AEOFace {...common} />
    case 'geo':          return <GEOFace {...common} />
    case 'google-ads':   return <GoogleAdsFace {...common} />
    case 'bing-ads':     return <BingAdsFace {...common} />
    case 'web-design':   return <WebDesignFace {...common} />
    case 'gmb-profile':  return <GmbProfileFace {...common} />
    default:             return null
  }
}
