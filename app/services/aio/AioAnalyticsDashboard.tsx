'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const ACCENT = '#6f4dff'

// ── Animated number counter ──
function Counter({ to, suffix = '', prefix = '', duration = 1.6, delay = 0, active }: {
  to: number; suffix?: string; prefix?: string; duration?: number; delay?: number; active: boolean
}) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) { setN(0); return }
    const t = setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / (duration * 1000))
        const ease = 1 - Math.pow(1 - p, 3)
        setN(Math.round(ease * to))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay * 1000)
    return () => clearTimeout(t)
  }, [active, to, duration, delay])
  return <>{prefix}{n.toLocaleString()}{suffix}</>
}

// ── Sparkline SVG ──
function Sparkline({ points, color, fill = true, h = 48, animated, delay = 0 }: {
  points: number[]; color: string; fill?: boolean; h?: number; animated?: boolean; delay?: number
}) {
  const W = 120
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const xs = points.map((_, i) => (i / (points.length - 1)) * W)
  const ys = points.map(v => h - ((v - min) / range) * (h - 4) - 2)
  const line = xs.map((x, i) => `${x},${ys[i]}`).join(' ')
  const area = `${xs[0]},${h} ${line} ${xs[xs.length-1]},${h}`

  return (
    <svg viewBox={`0 0 ${W} ${h}`} style={{ width: '100%', height: h, overflow: 'visible' }}>
      <defs>
        <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        {animated && (
          <clipPath id={`sp-clip-${color.replace('#','')}-${delay}`}>
            <motion.rect
              x="0" y="0" width={W} height={h}
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              style={{ transformOrigin: 'left' }}
              transition={{ duration: 1.0, delay, ease: [0.22, 0.8, 0.2, 1] }}
            />
          </clipPath>
        )}
      </defs>
      <g clipPath={animated ? `url(#sp-clip-${color.replace('#','')}-${delay})` : undefined}>
        {fill && <polygon points={area} fill={`url(#sg-${color.replace('#','')})`} />}
        <polyline points={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

// Traffic data (12 weeks)
const TRAFFIC    = [1200, 1450, 1380, 1700, 1920, 2100, 2350, 2180, 2600, 2850, 3100, 3420]
const SESSIONS   = [980, 1100, 1200, 1440, 1600, 1780, 1950, 1840, 2100, 2320, 2540, 2780]
const CONVERSIONS = [18, 22, 20, 28, 34, 39, 44, 41, 52, 58, 64, 71]

const CHANNELS = [
  { label: 'Organic Search', pct: 48, sessions: 1334, color: '#4285f4' },
  { label: 'AI Citations',   pct: 22, sessions: 612,  color: ACCENT    },
  { label: 'Direct',         pct: 15, sessions: 417,  color: '#1e9e75' },
  { label: 'Referral',       pct: 9,  sessions: 250,  color: '#f59e0b' },
  { label: 'Social',         pct: 6,  sessions: 167,  color: '#ef4444' },
]

const GEO_ROWS = [
  { city: 'Melbourne, AU',   users: 1240, pct: 36 },
  { city: 'Sydney, AU',      users: 870,  pct: 25 },
  { city: 'Brisbane, AU',    users: 490,  pct: 14 },
  { city: 'Perth, AU',       users: 310,  pct: 9  },
  { city: 'Auckland, NZ',    users: 220,  pct: 6  },
]

const TOP_PAGES = [
  { path: '/services/aio/',             views: 2410, bounce: '28%' },
  { path: '/',                          views: 1890, bounce: '31%' },
  { path: '/services/security-seo/',    views: 1340, bounce: '34%' },
  { path: '/contact/',                  views: 820,  bounce: '18%' },
  { path: '/services/web-design/',      views: 680,  bounce: '37%' },
]

const REALTIME_USERS = [4,7,5,9,6,8,11,9,13,10,14,12,15,14,18,16,19,17,21,18,23,20,24,22,26]

export default function AioAnalyticsDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [rtIdx, setRtIdx] = useState(0)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true) }, { threshold: 0.15 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  // Pulse realtime user count
  useEffect(() => {
    if (!active) return
    const iv = setInterval(() => setRtIdx((i: number) => (i + 1) % REALTIME_USERS.length), 1200)
    return () => clearInterval(iv)
  }, [active])

  const rtUsers = REALTIME_USERS[rtIdx]

  return (
    <div ref={ref} style={{ background: '#f6f8fd', borderRadius: 24, overflow: 'hidden', border: '1.5px solid rgba(18,42,86,0.08)', boxShadow: '0 16px 48px -16px rgba(18,42,86,0.12)' }}>

      {/* GA-style header bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(18,42,86,0.07)', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f4f6fb', borderRadius: 8, padding: '5px 12px', flex: 1, maxWidth: 320 }}>
          <span style={{ fontSize: 11 }}>📊</span>
          <span style={{ fontSize: 11, color: '#555', fontFamily: 'var(--font-mono)' }}>analytics.google.com › securityblogs.com.au</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: '#888', background: '#f4f6fb', padding: '4px 10px', borderRadius: 7 }}>Last 90 days ▾</div>
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
            style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#e8fdf4', borderRadius: 7, padding: '4px 10px' }}
          >
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#1e9e75' }} />
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#1e9e75', fontWeight: 700 }}>LIVE</span>
          </motion.div>
        </div>
      </div>

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* KPI metric cards row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { label: 'Total Users',    val: 3420, prev: '+31%', color: ACCENT,     suffix: '',   icon: '👥', points: TRAFFIC },
            { label: 'Sessions',       val: 2780, prev: '+28%', color: '#4285f4',  suffix: '',   icon: '📱', points: SESSIONS },
            { label: 'Conversions',    val: 71,   prev: '+61%', color: '#1e9e75',  suffix: '',   icon: '🎯', points: CONVERSIONS },
            { label: 'AI Citations',   val: 47,   prev: '+3.2×', color: '#f59e0b', suffix: '/mo', icon: '🤖', points: [8,10,12,15,18,21,24,22,28,33,39,47] },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              animate={active ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              style={{
                background: '#fff', borderRadius: 16, padding: '16px 16px 12px',
                border: `1.5px solid ${m.color}18`,
                boxShadow: `0 4px 16px -6px ${m.color}20`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: '#888', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{m.label}</div>
                <span style={{ fontSize: 14 }}>{m.icon}</span>
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, color: m.color, lineHeight: 1, marginBottom: 4 }}>
                <Counter to={m.val} suffix={m.suffix} active={active} delay={i * 0.1} duration={1.4} />
              </div>
              <div style={{ fontSize: 10, color: '#1e9e75', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 6 }}>↑ {m.prev} vs prev period</div>
              <Sparkline points={m.points} color={m.color} animated={active} delay={0.2 + i * 0.1} h={36} />
            </motion.div>
          ))}
        </div>

        {/* Main traffic chart + realtime */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 12 }}>
          {/* Traffic over time */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.45 }}
            style={{ background: '#fff', borderRadius: 16, padding: '18px 20px', border: '1.5px solid rgba(18,42,86,0.07)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e' }}>User Growth</div>
                <div style={{ fontSize: 10.5, color: '#888', marginTop: 1 }}>Weekly organic + AI traffic · 12 weeks</div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {[{ label: 'Users', color: ACCENT }, { label: 'Sessions', color: '#4285f4' }].map(l => (
                  <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 10, height: 3, borderRadius: 999, background: l.color }} />
                    <span style={{ fontSize: 10, color: '#888' }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', height: 110 }}>
              <svg viewBox="0 0 640 110" style={{ width: '100%', height: '100%', overflow: 'visible' }} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="tg-u" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={ACCENT} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="tg-s" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4285f4" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#4285f4" stopOpacity="0" />
                  </linearGradient>
                  <clipPath id="tc-clip">
                    <motion.rect x="0" y="0" width="640" height="110"
                      initial={{ scaleX: 0 }} animate={active ? { scaleX: 1 } : {}}
                      style={{ transformOrigin: 'left' }}
                      transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 0.8, 0.2, 1] }}
                    />
                  </clipPath>
                </defs>
                {[0, 1].map(idx => {
                  const data = idx === 0 ? TRAFFIC : SESSIONS
                  const color = idx === 0 ? ACCENT : '#4285f4'
                  const grad = idx === 0 ? 'tg-u' : 'tg-s'
                  const max = Math.max(...TRAFFIC)
                  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 640},${110 - (v / max) * 100}`)
                  return (
                    <g key={idx} clipPath="url(#tc-clip)">
                      <polygon points={`0,110 ${pts.join(' ')} 640,110`} fill={`url(#${grad})`} />
                      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  )
                })}
                {/* Week labels */}
                {TRAFFIC.map((_, i) => (
                  <text key={i} x={(i / (TRAFFIC.length - 1)) * 640} y={108} textAnchor="middle"
                    style={{ fontSize: 9, fill: '#bbb', fontFamily: 'var(--font-mono)' }}>
                    W{i + 1}
                  </text>
                ))}
              </svg>
            </div>
          </motion.div>

          {/* Realtime users */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.45 }}
            style={{ background: '#fff', borderRadius: 16, padding: '18px 16px', border: '1.5px solid rgba(18,42,86,0.07)', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ fontSize: 11, color: '#888', marginBottom: 4, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>ACTIVE RIGHT NOW</div>
            <motion.div
              key={rtUsers}
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: 52, fontWeight: 900, color: ACCENT, lineHeight: 1, marginBottom: 4 }}
            >{rtUsers}</motion.div>
            <div style={{ fontSize: 10.5, color: '#888', marginBottom: 14 }}>users on site</div>
            {/* Mini realtime sparkline */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ height: 54, position: 'relative' }}>
                <svg viewBox="0 0 200 54" style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="rt-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={ACCENT} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {(() => {
                    const slice = REALTIME_USERS.slice(0, rtIdx + 1)
                    const max = Math.max(...REALTIME_USERS)
                    const xs = slice.map((_, i) => (i / (REALTIME_USERS.length - 1)) * 200)
                    const ys = slice.map(v => 52 - (v / max) * 46)
                    const line = xs.map((x, i) => `${x},${ys[i]}`).join(' ')
                    if (slice.length < 2) return null
                    return <>
                      <polygon points={`${xs[0]},54 ${line} ${xs[xs.length-1]},54`} fill="url(#rt-grad)" />
                      <polyline points={line} fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
                    </>
                  })()}
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[{ label: 'Avg. engagement', val: '3m 42s', icon: '⏱' }, { label: 'Pages/session', val: '4.2', icon: '📄' }].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f9fd', borderRadius: 8, padding: '6px 10px' }}>
                    <span style={{ fontSize: 10.5, color: '#666' }}>{r.icon} {r.label}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#1a1a2e', fontFamily: 'var(--font-mono)' }}>{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom row: Acquisition channels + Geo + Top pages */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>

          {/* Acquisition channels */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.42, duration: 0.45 }}
            style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1.5px solid rgba(18,42,86,0.07)' }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a2e', marginBottom: 12 }}>Acquisition Channels</div>
            {/* Donut-style bar */}
            <div style={{ display: 'flex', height: 8, borderRadius: 999, overflow: 'hidden', gap: 1, marginBottom: 12 }}>
              {CHANNELS.map((c, i) => (
                <motion.div key={c.label}
                  initial={{ flex: 0 }} animate={active ? { flex: c.pct } : {}}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.7, ease: [0.22, 0.8, 0.2, 1] }}
                  style={{ background: c.color, minWidth: 0 }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {CHANNELS.map((c, i) => (
                <motion.div key={c.label}
                  initial={{ opacity: 0, x: -8 }} animate={active ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.3 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: c.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: '#444', flex: 1 }}>{c.label}</span>
                  <span style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: '#888' }}>{c.sessions.toLocaleString()}</span>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: c.color, fontFamily: 'var(--font-mono)', minWidth: 28, textAlign: 'right' }}>{c.pct}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Geography */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.48, duration: 0.45 }}
            style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1.5px solid rgba(18,42,86,0.07)' }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a2e', marginBottom: 12 }}>Top Locations</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {GEO_ROWS.map((g, i) => (
                <div key={g.city}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 11, color: '#444' }}>{g.city}</span>
                    <span style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: '#888' }}>{g.users.toLocaleString()}</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 999, background: '#f0f2f8', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={active ? { width: `${g.pct}%` } : {}}
                      transition={{ delay: 0.55 + i * 0.08, duration: 0.7, ease: [0.22, 0.8, 0.2, 1] }}
                      style={{ height: '100%', background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}88)`, borderRadius: 999 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top pages */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.54, duration: 0.45 }}
            style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1.5px solid rgba(18,42,86,0.07)' }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a2e', marginBottom: 12 }}>Top Pages</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {TOP_PAGES.map((p, i) => (
                <motion.div key={p.path}
                  initial={{ opacity: 0, x: 10 }} animate={active ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.55 + i * 0.07, duration: 0.3 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, background: i === 0 ? `${ACCENT}08` : '#f8f9fd', borderRadius: 9, padding: '7px 9px' }}
                >
                  <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: i === 0 ? ACCENT : '#888', fontWeight: 700 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ flex: 1, fontSize: 10.5, color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)' }}>{p.path}</span>
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#888', flexShrink: 0 }}>{p.views.toLocaleString()}</span>
                  <span style={{ fontSize: 9.5, color: '#1e9e75', fontFamily: 'var(--font-mono)', fontWeight: 700, flexShrink: 0 }}>{p.bounce}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
