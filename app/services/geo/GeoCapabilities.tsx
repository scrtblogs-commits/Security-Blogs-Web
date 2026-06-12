'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ACCENT = '#e23744'

const CARDS = [
  { icon: '🧩', title: 'Entity Building', desc: 'Establish your security brand as a defined, recognised entity AI systems can identify with confidence.', Preview: EntityPreview },
  { icon: '📋', title: 'Knowledge Panel Optimisation', desc: 'Shape the knowledge panels and brand cards that surface across Google and AI platforms.', Preview: KnowledgePanelPreview },
  { icon: '📡', title: 'Brand Signal Distribution', desc: 'Seed consistent, authoritative signals across the directories and sources AI engines learn from.', Preview: SignalDistributionPreview },
  { icon: '🔁', title: 'Cross-Platform Consistency', desc: 'Align how every AI platform describes your brand so the story is identical everywhere.', Preview: CrossPlatformPreview },
  { icon: '📍', title: 'NAP Consistency', desc: 'Lock in matching Name, Address and Phone data across the web to reinforce entity trust.', Preview: NAPPreview },
  { icon: '🤝', title: 'AI Platform Confirmation', desc: 'Verify and confirm your entity directly with the AI platforms that matter to your buyers.', Preview: ConfirmationPreview },
]

export default function GeoCapabilities() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
      {CARDS.map((card, index) => (
        <PremiumCard key={card.title} card={card} index={index} />
      ))}
    </div>
  )
}

function PremiumCard({ card, index }: { key?: React.Key; card: typeof CARDS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [inView, setInView] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 })
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { setInView(!!e.isIntersecting) }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  function handleMouseLeave() {
    setHovered(false)
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      style={{ perspective: 900 }}
    >
      <motion.div
        style={{
          rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d',
          borderRadius: 20, overflow: 'hidden',
          background: '#ffffff',
          border: `1px solid ${ACCENT}33`,
          boxShadow: hovered
            ? `0 0 40px -8px ${ACCENT}44, 0 0 0 1px ${ACCENT}44, 0 20px 40px -12px rgba(0,0,0,0.15)`
            : '0 2px 16px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.3s ease',
          cursor: 'default',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div style={{
          height: 2,
          background: `linear-gradient(90deg, transparent 5%, ${ACCENT} 50%, transparent 95%)`,
          opacity: hovered ? 1 : 0.3, transition: 'opacity 0.4s',
        }} />

        <div style={{ position: 'relative', height: 170, overflow: 'hidden' }}>
          <card.Preview hovered={hovered} inView={inView} accent={ACCENT} />
        </div>

        <div style={{ padding: '18px 20px 22px' }}>
          <motion.div
            animate={hovered ? { scale: 1.12, rotate: -6 } : { scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ display: 'inline-block', fontSize: 26, marginBottom: 10 }}
          >
            {card.icon}
          </motion.div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f2244', marginBottom: 8, lineHeight: 1.3 }}>{card.title}</h3>
          <p style={{ fontSize: 13.5, color: '#46546e', lineHeight: 1.6 }}>{card.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

const JSON_LINES = [
  { key: '@context', val: '"https://schema.org"', keyColor: '#d2a8ff', valColor: '#9ecbff' },
  { key: '@type', val: '"Organization"', keyColor: '#d2a8ff', valColor: '#f97583' },
  { key: 'name', val: '"SecurityBlogs"', keyColor: '#d2a8ff', valColor: '#9ecbff' },
  { key: 'url', val: '"securityblogs.com.au"', keyColor: '#d2a8ff', valColor: '#9ecbff' },
  { key: 'areaServed', val: '["AU","US","UK","UAE"]', keyColor: '#d2a8ff', valColor: '#9ecbff' },
  { key: 'sameAs', val: '[wikidata, crunchbase]', keyColor: '#d2a8ff', valColor: '#79c0ff' },
]

function EntityPreview({ hovered: _hovered, inView, accent: _accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [lineIdx, setLineIdx] = useState(0)
  const [showBadge, setShowBadge] = useState(false)

  useEffect(() => {
    if (!inView) { setLineIdx(0); setShowBadge(false); return }
    setLineIdx(0)
    setShowBadge(false)
    let idx = 0
    const id = setInterval(() => {
      idx++
      setLineIdx(idx)
      if (idx >= JSON_LINES.length) {
        clearInterval(id)
        setTimeout(() => setShowBadge(true), 300)
      }
    }, 260)
    return () => clearInterval(id)
  }, [inView])

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: '#0d1117',
      fontFamily: 'var(--font-mono, monospace)',
      padding: '14px 16px',
      display: 'flex', flexDirection: 'column', gap: 5,
      overflow: 'hidden',
    }}>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', fontWeight: 700, letterSpacing: 1.5, marginBottom: 2 }}>
        SCHEMA.ORG · ENTITY DEFINITION
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {JSON_LINES.map((line, i) => (
          <div
            key={line.key}
            style={{
              display: 'flex', gap: 6, fontSize: 10.5,
              opacity: i < lineIdx ? 1 : 0,
              transition: 'opacity 0.2s',
              position: 'relative',
            }}
          >
            <span style={{ color: line.keyColor }}>{line.key}</span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>:</span>
            <span style={{ color: line.valColor }}>{line.val}</span>
            {i === lineIdx - 1 && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
                style={{ display: 'inline-block', width: 7, height: 12, background: '#e23744', marginLeft: 2, verticalAlign: 'middle' }}
              />
            )}
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 6,
        display: 'inline-flex', alignItems: 'center', gap: 5,
        background: 'rgba(63,185,80,0.15)', border: '1px solid rgba(63,185,80,0.3)',
        borderRadius: 6, padding: '3px 9px', fontSize: 9.5, color: '#3fb950', fontWeight: 700,
        alignSelf: 'flex-start',
        opacity: showBadge ? 1 : 0, transition: 'opacity 0.4s',
      }}>
        <motion.span
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: '#3fb950' }}
        />
        Entity verified
      </div>
    </div>
  )
}

function KnowledgePanelPreview({ hovered: _hovered, inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [stars, setStars] = useState(0)
  const [reviews, setReviews] = useState(0)
  const [chipIdx, setChipIdx] = useState(0)

  useEffect(() => {
    if (!inView) { setStars(0); setReviews(0); setChipIdx(0); return }
    const steps = 50
    let step = 0
    const id = setInterval(() => {
      step++
      const p = Math.min(step / steps, 1)
      setStars(Math.min(5, Math.ceil(5 * p)))
      setReviews(Math.round(142 * p))
      if (step >= steps) clearInterval(id)
    }, 28)

    const chipTimer1 = setTimeout(() => setChipIdx(1), 600)
    const chipTimer2 = setTimeout(() => setChipIdx(2), 900)
    const chipTimer3 = setTimeout(() => setChipIdx(3), 1200)

    return () => {
      clearInterval(id)
      clearTimeout(chipTimer1)
      clearTimeout(chipTimer2)
      clearTimeout(chipTimer3)
    }
  }, [inView])

  const chips = [
    { label: 'Website', bg: 'rgba(96,165,250,0.15)', color: '#60a5fa' },
    { label: 'Contact', bg: 'rgba(52,211,153,0.15)', color: '#34d399' },
    { label: 'Services', bg: `${accent}20`, color: accent },
  ]

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, #0d111e, #111827)',
      padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 7,
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${accent}, #ff6b7a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: '#fff', flexShrink: 0 }}>S</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>SecurityBlogs</div>
          <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.4)' }}>AI Visibility Platform · Security</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 15 }}>
        {[1, 2, 3, 4, 5].map(n => (
          <span key={n} style={{ color: n <= stars ? '#fbbf24' : 'rgba(255,255,255,0.12)', transition: 'color 0.15s' }}>★</span>
        ))}
        <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10, marginLeft: 4 }}>
          5.0 · {reviews} reviews
        </span>
      </div>
      <div style={{ fontSize: 10.5, color: '#60a5fa' }}>securityblogs.com.au</div>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        {chips.map((ch, i) => (
          <span
            key={ch.label}
            style={{
              background: ch.bg, color: ch.color,
              padding: '3px 8px', borderRadius: 5, fontSize: 9.5, fontWeight: 600,
              opacity: i < chipIdx ? 1 : 0, transition: `opacity 0.3s ${i * 0.12}s`,
            }}
          >
            {ch.label}
          </span>
        ))}
      </div>
    </div>
  )
}

const SIGNAL_NODES = [
  { name: 'Wikidata', angle: -60, dist: 80, status: 'synced' },
  { name: 'Crunchbase', angle: 30, dist: 80, status: 'synced' },
  { name: 'LinkedIn', angle: 150, dist: 80, status: 'syncing' },
  { name: 'Industry dirs', angle: 240, dist: 75, status: 'syncing' },
]

function SignalDistributionPreview({ hovered: _hovered, inView, accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [pathProgress, setPathProgress] = useState([0, 0, 0, 0])

  useEffect(() => {
    if (!inView) { setPathProgress([0, 0, 0, 0]); return }
    SIGNAL_NODES.forEach((_, i) => {
      setTimeout(() => {
        setPathProgress(prev => {
          const next = [...prev]
          next[i] = 1
          return next
        })
      }, i * 350)
    })
  }, [inView])

  const cx = 50
  const cy = 52

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #080d1a, #0f1726)', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle, ${accent}08 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }} />
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {SIGNAL_NODES.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180
          const nx = Math.round((cx + Math.cos(rad) * (node.dist * 0.38)) * 100) / 100
          const ny = Math.round((cy + Math.sin(rad) * (node.dist * 0.32)) * 100) / 100
          const color = node.status === 'synced' ? '#34d399' : '#60a5fa'
          return (
            <motion.line
              key={node.name}
              x1={`${cx}%`} y1={`${cy}%`}
              x2={`${nx}%`} y2={`${ny}%`}
              stroke={color}
              strokeWidth={1}
              strokeDasharray="4 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: pathProgress[i], opacity: pathProgress[i] > 0 ? 0.6 : 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          )
        })}
      </svg>
      <motion.div
        animate={{ boxShadow: [`0 0 0px ${accent}00`, `0 0 20px ${accent}55`, `0 0 0px ${accent}00`] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{
          position: 'absolute',
          left: `${cx}%`, top: `${cy}%`,
          transform: 'translate(-50%, -50%)',
          width: 36, height: 36, borderRadius: '50%',
          background: `linear-gradient(135deg, ${accent}, #ff6b7a)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 900, color: '#fff',
          zIndex: 2,
        }}
      >
        S
      </motion.div>
      {SIGNAL_NODES.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180
        const nx = Math.round((cx + Math.cos(rad) * (node.dist * 0.38)) * 100) / 100
        const ny = Math.round((cy + Math.sin(rad) * (node.dist * 0.32)) * 100) / 100
        const color = node.status === 'synced' ? '#34d399' : '#60a5fa'
        return (
          <div
            key={node.name}
            style={{
              position: 'absolute',
              left: `${nx}%`, top: `${ny}%`,
              transform: 'translate(-50%, -50%)',
              opacity: pathProgress[i] > 0 ? 1 : 0,
              transition: 'opacity 0.3s',
              zIndex: 2,
            }}
          >
            <div style={{
              background: 'rgba(13,17,23,0.9)', border: `1px solid ${color}44`,
              borderRadius: 6, padding: '3px 6px',
              display: 'flex', alignItems: 'center', gap: 4,
              whiteSpace: 'nowrap',
            }}>
              <span style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.7)', fontFamily: 'system-ui' }}>{node.name}</span>
              {node.status === 'synced' ? (
                <span style={{ fontSize: 8, color, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>SYNCED</span>
              ) : (
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.25 }}
                  style={{ fontSize: 8, color, fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                >
                  SYNCING
                </motion.span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const PLATFORMS_CROSS = [
  { name: 'ChatGPT', bg: '#10a37f', mono: 'AI', snippet: 'SecurityBlogs provides AI-driven…' },
  { name: 'Gemini', bg: '#4285f4', mono: 'G', snippet: 'SecurityBlogs.com.au is a leading…' },
  { name: 'Claude', bg: '#cc785c', mono: 'C', snippet: 'SecurityBlogs offers visibility…' },
  { name: 'Perplexity', bg: '#1FB8CD', mono: 'P', snippet: 'Founded in Australia, SecurityBlogs…' },
]

function CrossPlatformPreview({ hovered: _hovered, inView, accent: _accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [typeIdx, setTypeIdx] = useState(-1)
  const [doneIdx, setDoneIdx] = useState(-1)

  useEffect(() => {
    if (!inView) { setTypeIdx(-1); setDoneIdx(-1); return }
    let current = 0
    const advance = () => {
      if (current >= PLATFORMS_CROSS.length) return
      setTypeIdx(current)
      setTimeout(() => {
        setDoneIdx(current)
        current++
        setTimeout(advance, 300)
      }, 600)
    }
    const t = setTimeout(advance, 200)
    return () => clearTimeout(t)
  }, [inView])

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, #090e1c, #0d1525)',
      padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6,
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: 1.5, marginBottom: 2 }}>
        AI PLATFORMS · BRAND RECOGNITION
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {PLATFORMS_CROSS.map((p, i) => (
          <div
            key={p.name}
            style={{
              display: 'flex', flexDirection: 'column', gap: 4,
              padding: '7px 8px', background: 'rgba(255,255,255,0.04)',
              borderRadius: 8, border: `1px solid rgba(255,255,255,0.07)`,
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 18, height: 18, borderRadius: 5, background: p.bg, color: '#fff', fontSize: 9, fontWeight: 700, display: 'grid', placeItems: 'center', flexShrink: 0 }}>{p.mono}</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{p.name}</span>
              <span style={{
                marginLeft: 'auto', color: '#34d399', fontSize: 12, fontWeight: 700,
                opacity: doneIdx >= i ? 1 : 0, transition: 'opacity 0.3s',
              }}>✓</span>
            </div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', lineHeight: 1.4, minHeight: 24, overflow: 'hidden' }}>
              {typeIdx >= i ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {p.snippet}
                  {typeIdx === i && doneIdx < i && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      style={{ display: 'inline-block', width: 5, height: 9, background: 'rgba(255,255,255,0.4)', marginLeft: 1, verticalAlign: 'middle' }}
                    />
                  )}
                </motion.span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        fontSize: 9.5, color: 'rgba(255,255,255,0.3)', textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 5, marginTop: 2,
      }}>
        All 4 platforms cite <strong style={{ color: '#60a5fa' }}>securityblogs.com.au</strong>
      </div>
    </div>
  )
}

const NAP_FIELDS = [
  { k: 'Name', v: 'SecurityBlogs' },
  { k: 'Address', v: 'Australia (Remote-first)' },
  { k: 'Phone', v: '+61 411 212 418' },
  { k: 'Email', v: 'info@securityblogs.com.au' },
]

function NAPPreview({ hovered: _hovered, inView, accent: _accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [syncProgress, setSyncProgress] = useState([0, 0, 0, 0])
  const [syncDone, setSyncDone] = useState([false, false, false, false])
  const [dirCount, setDirCount] = useState(0)

  useEffect(() => {
    if (!inView) {
      setSyncProgress([0, 0, 0, 0])
      setSyncDone([false, false, false, false])
      setDirCount(0)
      return
    }
    NAP_FIELDS.forEach((_, i) => {
      const delay = i * 400
      const startAt = Date.now() + delay
      const duration = 800
      const interval = setInterval(() => {
        const elapsed = Date.now() - startAt
        if (elapsed < 0) return
        const p = Math.min(elapsed / duration, 1)
        setSyncProgress(prev => { const n = [...prev]; n[i] = p; return n })
        if (p >= 1) {
          clearInterval(interval)
          setSyncDone(prev => { const n = [...prev]; n[i] = true; return n })
        }
      }, 30)
    })
    const totalDuration = NAP_FIELDS.length * 400 + 800
    const countSteps = 40
    let step = 0
    const countId = setInterval(() => {
      step++
      setDirCount(Math.round(48 * Math.min(step / countSteps, 1)))
      if (step >= countSteps) clearInterval(countId)
    }, totalDuration / countSteps)
    return () => clearInterval(countId)
  }, [inView])

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, #08111f, #0d1828)',
      padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 7,
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: 1.5, marginBottom: 2 }}>
        NAP SYNC · DIRECTORIES
      </div>
      {NAP_FIELDS.map((f, i) => (
        <div key={f.k} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 44, fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: 'var(--font-mono)' }}>{f.k}</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 140 }}>{f.v}</span>
            </div>
            <span style={{
              width: 18, height: 18, borderRadius: '50%',
              background: syncDone[i] ? '#34d399' : 'rgba(255,255,255,0.07)',
              color: '#fff', fontSize: 9.5, fontWeight: 700,
              display: 'grid', placeItems: 'center', flexShrink: 0,
              transition: 'background 0.3s',
            }}>✓</span>
          </div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
            <motion.div
              style={{ height: '100%', background: '#34d399', borderRadius: 2 }}
              animate={{ width: `${syncProgress[i] * 100}%` }}
              transition={{ duration: 0.03, ease: 'linear' }}
            />
            {syncProgress[i] > 0 && syncProgress[i] < 1 && (
              <motion.div
                animate={{ left: [`${Math.max(0, syncProgress[i] * 100 - 20)}%`, `${syncProgress[i] * 100}%`] }}
                transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' }}
                style={{ position: 'absolute', top: 0, height: '100%', width: 20, background: 'rgba(255,255,255,0.3)', filter: 'blur(2px)' }}
              />
            )}
          </div>
        </div>
      ))}
      <div style={{
        marginTop: 2, fontSize: 9.5, color: '#34d399', fontWeight: 700,
        fontFamily: 'var(--font-mono)',
        opacity: dirCount > 0 ? 1 : 0, transition: 'opacity 0.3s',
      }}>
        100% consistent across {dirCount} directories
      </div>
    </div>
  )
}

const CONFIRM_PLATFORMS = [
  { name: 'ChatGPT', bg: '#10a37f', mono: 'AI' },
  { name: 'Gemini', bg: '#4285f4', mono: 'G' },
  { name: 'Perplexity', bg: '#1FB8CD', mono: 'P' },
  { name: 'Claude', bg: '#cc785c', mono: 'C' },
]

function ConfirmationPreview({ hovered: _hovered, inView, accent: _accent }: { hovered: boolean; inView: boolean; accent: string }) {
  const [verifiedCount, setVerifiedCount] = useState(0)
  const [flashing, setFlashing] = useState(-1)

  useEffect(() => {
    if (!inView) { setVerifiedCount(0); setFlashing(-1); return }
    let count = 0
    const flip = () => {
      if (count >= CONFIRM_PLATFORMS.length) return
      setFlashing(count)
      setTimeout(() => {
        setFlashing(-1)
        count++
        setVerifiedCount(count)
        setTimeout(flip, 400)
      }, 350)
    }
    const t = setTimeout(flip, 300)
    return () => clearTimeout(t)
  }, [inView])

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, #080d1c, #0b1220)',
      padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6,
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: 1.5, marginBottom: 2 }}>
        PLATFORM VERIFICATION
      </div>
      {CONFIRM_PLATFORMS.map((p, i) => {
        const verified = i < verifiedCount
        const isFlashing = flashing === i
        return (
          <div
            key={p.name}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '6px 10px',
              background: isFlashing ? 'rgba(52,211,153,0.15)' : verified ? 'rgba(52,211,153,0.07)' : 'rgba(255,255,255,0.03)',
              borderRadius: 8,
              border: `1px solid ${isFlashing ? 'rgba(52,211,153,0.5)' : verified ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.06)'}`,
              transition: 'background 0.2s, border-color 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 22, height: 22, borderRadius: 6, background: p.bg, color: '#fff', fontSize: 10, fontWeight: 700, display: 'grid', placeItems: 'center', flexShrink: 0 }}>{p.mono}</span>
              <span style={{ fontSize: 11, color: verified ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)', transition: 'color 0.3s' }}>{p.name}</span>
            </div>
            {verified ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 9.5, color: '#34d399', fontWeight: 700, background: 'rgba(52,211,153,0.12)', borderRadius: 5, padding: '2px 7px', border: '1px solid rgba(52,211,153,0.25)' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
                VERIFIED
              </span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 9.5, color: 'rgba(255,255,255,0.25)', fontWeight: 700, background: 'rgba(255,255,255,0.04)', borderRadius: 5, padding: '2px 7px', border: '1px solid rgba(255,255,255,0.08)' }}>
                PENDING
              </span>
            )}
          </div>
        )
      })}
      <div style={{
        marginTop: 2, fontSize: 9.5, color: '#34d399', fontWeight: 700,
        fontFamily: 'var(--font-mono)', textAlign: 'center',
        opacity: verifiedCount === CONFIRM_PLATFORMS.length ? 1 : 0,
        transition: 'opacity 0.4s',
      }}>
        {verifiedCount}/{CONFIRM_PLATFORMS.length} platforms confirmed
      </div>
    </div>
  )
}
