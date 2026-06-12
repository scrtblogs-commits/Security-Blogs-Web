'use client'
import { useEffect, useState } from 'react'

const PLATFORMS = [
  { name: 'ChatGPT',    color: '#10a37f', bg: '#f0fdf8', icon: '⬡' },
  { name: 'Gemini',     color: '#4285f4', bg: '#eff6ff', icon: '✦' },
  { name: 'Perplexity', color: '#20b2aa', bg: '#f0fdfa', icon: '⊕' },
  { name: 'Claude',     color: '#d97706', bg: '#fffbeb', icon: '◎' },
  { name: 'Copilot',    color: '#0078d4', bg: '#eff6ff', icon: '⬡' },
]

const CITATIONS = [
  { platform: 'ChatGPT',    brand: 'SecureGuard AU',   query: 'best CCTV installers Sydney',       time: '2s ago',  color: '#10a37f' },
  { platform: 'Gemini',     brand: 'ClearView Security', query: 'enterprise access control systems', time: '11s ago', color: '#4285f4' },
  { platform: 'Perplexity', brand: 'ShieldTech Group',  query: 'alarm monitoring companies Melbourne', time: '28s ago', color: '#20b2aa' },
  { platform: 'Claude',     brand: 'ProSafe Security',  query: 'security company near me',          time: '45s ago', color: '#d97706' },
  { platform: 'Copilot',    brand: 'SecureGuard AU',   query: 'CCTV installation Brisbane',        time: '1m ago',  color: '#0078d4' },
  { platform: 'ChatGPT',    brand: 'ShieldTech Group',  query: 'commercial security solutions',    time: '1m ago',  color: '#10a37f' },
]

const NAV = [
  { icon: '▣', label: 'Dashboard',   active: true  },
  { icon: '◈', label: 'AI Score',    active: false },
  { icon: '◉', label: 'Citations',   active: false },
  { icon: '◫', label: 'Reports',     active: false },
  { icon: '◌', label: 'Settings',    active: false },
]

const STATS = [
  { value: '87%',  label: 'Citation Rate', delta: '+12%', color: '#10a37f' },
  { value: '#1',   label: 'AI Rank',       delta: '↑2',   color: '#1e5fe0' },
  { value: '10+',  label: 'AI Platforms',  delta: 'Live',  color: '#6f4dff' },
  { value: '↑93%', label: 'Visibility',    delta: '+18%', color: '#e23744' },
]

export default function HeroDashboardCard() {
  const [tick, setTick] = useState(0)
  const [scores, setScores] = useState([72, 88, 65, 95, 81])
  const [topIdx, setTopIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setTick(n => n + 1)
      setScores(s => s.map(v => Math.min(100, Math.max(40, v + (Math.random() * 6 - 2.5)))))
      setTopIdx(i => (i + 1) % CITATIONS.length)
    }, 2200)
    return () => clearInterval(t)
  }, [])

  const shownCitations = [
    CITATIONS[topIdx % CITATIONS.length],
    CITATIONS[(topIdx + 1) % CITATIONS.length],
    CITATIONS[(topIdx + 2) % CITATIONS.length],
  ]

  const mainScore = Math.round(scores[0])
  const circumference = 2 * Math.PI * 44

  return (
    <div style={{
      background: '#fff',
      borderRadius: 20,
      boxShadow: '0 32px 80px -12px rgba(10,20,60,0.28), 0 0 0 1px rgba(30,95,224,0.08)',
      overflow: 'hidden',
      width: '100%',
      maxWidth: 1040,
      margin: '0 auto',
      fontFamily: 'var(--font-sans)',
      userSelect: 'none',
    }}>

      {/* ── Top bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '13px 20px',
        background: '#0f172a',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#1e5fe0,#6f4dff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff', fontWeight: 700 }}>S</div>
          <span style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 13.5 }}>SecurityBlogs</span>
          <span style={{ color: '#475569', fontSize: 12 }}>/ AI Visibility Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: 'rgba(16,163,127,0.15)', border: '1px solid rgba(16,163,127,0.3)',
            color: '#10a37f', borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 600,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10a37f', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
            LIVE
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#ef4444','#f59e0b','#22c55e'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Body: sidebar + main ── */}
      <div style={{ display: 'flex', minHeight: 380 }}>

        {/* Sidebar */}
        <div style={{
          width: 168, flexShrink: 0,
          background: '#f8fafc',
          borderRight: '1px solid #e2e8f0',
          padding: '16px 0',
        }}>
          <div style={{ padding: '0 14px 12px', fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em' }}>WORKSPACE</div>
          {NAV.map(n => (
            <div key={n.label} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 14px', margin: '1px 8px', borderRadius: 8,
              background: n.active ? 'rgba(30,95,224,0.08)' : 'transparent',
              color: n.active ? '#1e5fe0' : '#64748b',
              fontSize: 12.5, fontWeight: n.active ? 600 : 400, cursor: 'pointer',
            }}>
              <span style={{ fontSize: 13 }}>{n.icon}</span>{n.label}
            </div>
          ))}

          <div style={{ margin: '16px 0 8px', padding: '0 14px', fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em' }}>AI PLATFORMS</div>
          {PLATFORMS.map((p, i) => (
            <div key={p.name} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '6px 14px', fontSize: 11.5, color: '#475569',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: p.color }} />
                {p.name}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: p.color, fontWeight: 600 }}>
                {Math.round(scores[i] ?? 80)}%
              </span>
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex: 1, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 16, background: '#fff' }}>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
            {STATS.map(s => (
              <div key={s.label} style={{
                background: '#f8fafc', borderRadius: 10,
                border: '1px solid #e2e8f0',
                padding: '12px 14px',
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500, marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontSize: 10.5, color: '#22c55e', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{s.delta}</div>
              </div>
            ))}
          </div>

          {/* Bottom row: feed + score */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 14, flex: 1 }}>

            {/* Citation feed */}
            <div style={{ background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', padding: '14px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>Live AI Citations</span>
                <span style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>auto-refresh</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {shownCitations.map((c, i) => (
                  <div key={`${c.platform}-${tick}-${i}`} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    background: '#fff', borderRadius: 8, padding: '9px 11px',
                    border: '1px solid #e2e8f0',
                    opacity: i === 0 ? 1 : i === 1 ? 0.85 : 0.65,
                    transition: 'opacity 0.4s',
                  }}>
                    <div style={{ width: 26, height: 26, borderRadius: 6, background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>{c.platform.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11.5, fontWeight: 600, color: '#0f172a', marginBottom: 2 }}>{c.brand}</div>
                      <div style={{ fontSize: 10.5, color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        &ldquo;{c.query}&rdquo;
                      </div>
                    </div>
                    <span style={{ fontSize: 9.5, color: '#94a3b8', flexShrink: 0, marginTop: 2, fontFamily: 'var(--font-mono)' }}>{c.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Score gauge */}
            <div style={{ background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', padding: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', alignSelf: 'flex-start' }}>AI Score</span>
              <svg width="110" height="110" viewBox="0 0 110 110">
                <circle cx="55" cy="55" r="44" fill="none" stroke="#e2e8f0" strokeWidth="9" />
                <circle cx="55" cy="55" r="44" fill="none"
                  stroke="url(#scoreGrad)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - mainScore / 100)}
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '55px 55px', transition: 'stroke-dashoffset 0.8s ease' }}
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e5fe0" />
                    <stop offset="100%" stopColor="#6f4dff" />
                  </linearGradient>
                </defs>
                <text x="55" y="51" textAnchor="middle" fontSize="22" fontWeight="800" fill="#0f172a">{mainScore}</text>
                <text x="55" y="65" textAnchor="middle" fontSize="10" fill="#64748b">/100</text>
              </svg>
              <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 600, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 999, padding: '3px 10px' }}>
                Excellent visibility
              </div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {['Content', 'Schema', 'Entity', 'Authority'].map((lbl, i) => (
                  <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ fontSize: 10, color: '#64748b', width: 52 }}>{lbl}</span>
                    <div style={{ flex: 1, height: 5, background: '#e2e8f0', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${[88, 92, 75, 82][i]}%`, background: 'linear-gradient(90deg,#1e5fe0,#6f4dff)', borderRadius: 999 }} />
                    </div>
                    <span style={{ fontSize: 9.5, color: '#94a3b8', width: 22, textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{[88,92,75,82][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
