'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState, useCallback } from 'react'

// Hero right panel: 3D "AI Visibility Engine" diagram
// Explains the product in one glance:
//   [Your Brand] ──► [AI Platforms] ──► [Cited & Ranked]
// Dramatic 3D entrance on load + mouse-tracking tilt

const OpenAILogo = () => (
  <svg viewBox="0 0 41 41" width="20" height="20" fill="currentColor">
    <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.215-2.972 10.079 10.079 0 0 0-10.402 4.713A9.963 9.963 0 0 0 3.533 13.67a10.078 10.078 0 0 0-1.678 11.03 9.964 9.964 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.215 2.972 10.079 10.079 0 0 0 10.402-4.713 9.965 9.965 0 0 0 5.671-8.07 10.079 10.079 0 0 0 1.678-11.029zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L7.044 23.86a7.504 7.504 0 0 1-2.747-10.24zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l8.048 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943 4.33-2.501 4.332 2.497v4.998l-4.331 2.5-4.331-2.5V18z"/>
  </svg>
)

const ClaudeLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-1.314-.097L1 12.529l.005-.739.449-.246 1.315.055 2.367.146 2.626.158.79.055h.281l-.059-.116-.14-.286-1.281-2.479-1.224-2.405-.831-1.668-.523-1.107.117-.44.401-.282.658.06.401.265.55 1.095.848 1.801 1.203 2.479 1.224 2.527.638 1.315h.117l.065-.065V12.4l.06-3.292.041-3.2.022-1.437-.022-.58-.06-.843.232-.635.55-.329.633.073.36.427.175.896.022 2.369-.015 3.449-.015 3.162h.14l.187-.384 1.261-2.72 1.036-2.19.77-1.511.524-.777.573-.311.499.146.35.378.073.683-.232.621-.662 1.169-1.329 2.832-.963 2.094-.35.79.064.006.19-.14 2.614-1.607 2.515-1.546 1.755-1.085.85-.503.44.024.401.294.11.634-.26.432-.926.547-2.288 1.41-2.118 1.28-.845.528.014.073.12.055 2.675.619 2.685.655 1.384.427.67.329-.06.622-.36.384-.72-.049-1.404-.329-2.784-.712-2.431-.601-.76-.158h-.11l-.014.11.314.73.843 1.946.99 2.235.678 1.656.165.9-.238.572-.547.268-.608-.196-.36-.512-.916-2.18-1.03-2.332-.899-2.094-.286-.669h-.128l-.046.128-.128 3.894-.128 3.79-.085 1.241-.232.676-.547.286-.547-.232-.35-.614.034-1.095.209-3.857.27-3.921v-.117h-.14l-.726 1.17-2.29 3.717-1.645 2.625-.839 1.107-.596.402-.62-.11-.303-.45.097-.718.443-.77 1.49-2.174 2.176-3.522 1.448-2.357.34-.621v-.104l-.104-.006z"/>
  </svg>
)

const platforms = [
  { label: 'ChatGPT',    bg: '#10a37f', logo: <OpenAILogo />, delay: 0.55 },
  { label: 'Claude AI',  bg: '#d97706', logo: <ClaudeLogo />, delay: 0.70 },
  { label: 'Gemini',     bg: '#4285f4', symbol: 'G✦',         delay: 0.85 },
  { label: 'Perplexity', bg: '#20b2aa', symbol: 'Px',         delay: 1.00 },
]

const results = [
  { label: 'Citation Rate', value: '87%',  color: '#1e9e75', delay: 1.15 },
  { label: 'AI Rank',       value: '#1',   color: '#1e5fe0', delay: 1.30 },
  { label: 'Platforms',     value: '10+',  color: '#6f4dff', delay: 1.45 },
  { label: 'Visibility',    value: '↑93%', color: '#e23744', delay: 1.60 },
]

// Animated SVG connector arrow
function Arrow({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 0.8, 0.2, 1] }}
      style={{
        display: 'flex', alignItems: 'center',
        flexDirection: 'column', gap: 4, flexShrink: 0,
      }}
    >
      {[0, 1, 2, 3].map(i => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: delay + i * 0.18, duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
          style={{
            width: 28, height: 2, borderRadius: 2,
            background: 'linear-gradient(90deg, rgba(30,95,224,0.6), rgba(111,77,255,0.6))',
          }}
        />
      ))}
      <motion.div
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: 16, color: 'rgba(111,77,255,0.7)', lineHeight: 1, marginTop: -2 }}
      >
        ›
      </motion.div>
    </motion.div>
  )
}

export default function HeroAIIcons() {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 80, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 80, damping: 20 })

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - r.left) / r.width - 0.5)
    mouseY.set((e.clientY - r.top) / r.height - 0.5)
  }, [mouseX, mouseY])

  const onLeave = useCallback(() => { mouseX.set(0); mouseY.set(0) }, [mouseX, mouseY])

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 1000, perspectiveOrigin: '50% 50%', width: '100%' }}
    >
      <motion.div
        initial={{ opacity: 0, rotateX: 28, rotateY: -35, scale: 0.72, y: 40 }}
        animate={{ opacity: 1, rotateX: 4, rotateY: -6, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{
          rotateX, rotateY,
          transformStyle: 'preserve-3d',
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(30,95,224,0.14)',
          borderRadius: 24,
          boxShadow: '0 32px 80px -16px rgba(18,42,86,0.18), 0 0 0 1px rgba(30,95,224,0.06)',
          padding: '28px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle top gradient shine */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(30,95,224,0.5), rgba(111,77,255,0.5), transparent)',
          borderRadius: '24px 24px 0 0',
        }} />

        {/* Header label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(30,95,224,0.07)',
            border: '1px solid rgba(30,95,224,0.15)',
            borderRadius: 999, padding: '4px 12px', marginBottom: 20,
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#1e5fe0', display: 'inline-block' }}
          />
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--blue)', fontWeight: 600, letterSpacing: '0.08em' }}>
            AI VISIBILITY ENGINE · LIVE
          </span>
        </motion.div>

        {/* Main 3-column flow diagram */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

          {/* ── Col 1: Your Brand ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 0.8, 0.2, 1] }}
            style={{ flex: '0 0 auto', textAlign: 'center' }}
          >
            <div style={{
              width: 72, height: 72, borderRadius: 20, margin: '0 auto 10px',
              background: 'linear-gradient(135deg, rgba(30,95,224,0.12), rgba(111,77,255,0.10))',
              border: '1.5px solid rgba(30,95,224,0.20)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              {/* Shield icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <motion.path
                  d="M12 2L3 6v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6L12 2z"
                  stroke="url(#sg)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  fill="rgba(30,95,224,0.08)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                />
                <motion.path
                  d="M9 12l2 2 4-4"
                  stroke="#1e5fe0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                />
                <defs>
                  <linearGradient id="sg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1e5fe0"/>
                    <stop offset="1" stopColor="#6f4dff"/>
                  </linearGradient>
                </defs>
              </svg>
              {/* Pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{
                  position: 'absolute', inset: -4, borderRadius: 24,
                  border: '1.5px solid rgba(30,95,224,0.3)', pointerEvents: 'none',
                }}
              />
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
              Your Brand
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
              securityblogs.com
            </div>
          </motion.div>

          {/* ── Arrow 1 ── */}
          <Arrow delay={0.5} />

          {/* ── Col 2: AI Platforms ── */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {platforms.map((p) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, scale: 0.6, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: p.delay, duration: 0.5, ease: [0.22, 0.8, 0.2, 1] }}
                style={{
                  background: p.bg + '14',
                  border: `1px solid ${p.bg}30`,
                  borderRadius: 12,
                  padding: '8px 10px',
                  display: 'flex', alignItems: 'center', gap: 7,
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: p.bg, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, flexShrink: 0,
                }}>
                  {p.logo ?? p.symbol}
                </div>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>
                  {p.label}
                </div>
                {/* Activity dot */}
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: p.delay }}
                  style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: p.bg, marginLeft: 'auto', flexShrink: 0,
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* ── Arrow 2 ── */}
          <Arrow delay={1.05} />

          {/* ── Col 3: Results ── */}
          <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {results.map((r) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: r.delay, duration: 0.5, ease: [0.22, 0.8, 0.2, 1] }}
                style={{
                  background: r.color + '0e',
                  border: `1px solid ${r.color}25`,
                  borderRadius: 10, padding: '6px 12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                  minWidth: 110,
                }}
              >
                <span style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  {r.label}
                </span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: r.delay + 0.2, type: 'spring', stiffness: 300 }}
                  style={{ fontSize: 13, fontWeight: 800, color: r.color, fontFamily: 'var(--font-display)' }}
                >
                  {r.value}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom footer bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.5 }}
          style={{
            marginTop: 20, paddingTop: 16,
            borderTop: '1px solid rgba(30,95,224,0.09)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            Last scan: just now · AU · US · UK · UAE · SG
          </span>
          <motion.div
            animate={{ background: ['rgba(30,95,224,0.10)', 'rgba(30,158,117,0.15)', 'rgba(30,95,224,0.10)'] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              borderRadius: 999, padding: '3px 10px',
              border: '1px solid rgba(30,95,224,0.15)',
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 5, height: 5, borderRadius: '50%', background: '#1e9e75', display: 'inline-block' }}
            />
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#1e9e75', fontWeight: 600 }}>
              ALL SYSTEMS ACTIVE
            </span>
          </motion.div>
        </motion.div>

        {/* 3D depth shadow layer */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 24, pointerEvents: 'none',
          background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
        }} />
      </motion.div>
    </div>
  )
}
