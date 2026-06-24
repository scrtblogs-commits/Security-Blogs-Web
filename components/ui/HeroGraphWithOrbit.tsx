'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import HeroGraph from './HeroGraph'

const FLOATERS = [
  {
    id: 'rank1',
    side: 'left' as const,
    top: '8%',
    parallaxY: -55,
    parallaxX: 6,
    rotateInit: -3,
    delay: 0.05,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Search Rank</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#1267d5', lineHeight: 1 }}>#1</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#1e293b' }}>network security</span>
            <span style={{ fontSize: 10, color: '#64748b' }}>securityblogs.com.au</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: '#22c55e', fontWeight: 700 }}>↑ 14 positions</span>
          <span style={{ fontSize: 9, color: '#94a3b8' }}>this month</span>
        </div>
      </div>
    ),
    style: { minWidth: 168, padding: '10px 14px', borderRadius: 12 },
  },
  {
    id: 'kw1',
    side: 'left' as const,
    top: '38%',
    parallaxY: 38,
    parallaxX: -8,
    rotateInit: 2,
    delay: 0.12,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Tracked Keywords</span>
        {[
          { kw: 'zero-day detection', pos: 2 },
          { kw: 'endpoint protection', pos: 4 },
          { kw: 'SIEM monitoring', pos: 1 },
        ].map(({ kw, pos }) => (
          <div key={kw} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <span style={{ fontSize: 11, color: '#334155', fontWeight: 500 }}>{kw}</span>
            <span style={{
              fontSize: 11, fontWeight: 700,
              color: pos === 1 ? '#22c55e' : pos <= 3 ? '#1267d5' : '#f59e0b',
              minWidth: 18, textAlign: 'right',
            }}>#{pos}</span>
          </div>
        ))}
      </div>
    ),
    style: { minWidth: 186, padding: '10px 14px', borderRadius: 12 },
  },
  {
    id: 'ctr',
    side: 'left' as const,
    top: '68%',
    parallaxY: -28,
    parallaxX: 4,
    rotateInit: -1,
    delay: 0.18,
    content: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg,#4a2f8a,#6b2fa0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 13L7 8l3 4 3-5 3 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#1e293b', lineHeight: 1 }}>8.4%</div>
          <div style={{ fontSize: 10, color: '#64748b', fontWeight: 500 }}>Avg. CTR <span style={{ color: '#22c55e', fontWeight: 700 }}>↑ 2.1%</span></div>
        </div>
      </div>
    ),
    style: { padding: '10px 14px', borderRadius: 12 },
  },
  {
    id: 'ai-gpt',
    side: 'right' as const,
    top: '6%',
    parallaxY: -45,
    parallaxX: -5,
    rotateInit: 3,
    delay: 0.08,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 20, height: 20, borderRadius: 6,
            background: '#10a37f',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <circle cx="5.5" cy="5.5" r="4" stroke="white" strokeWidth="1.4"/>
              <path d="M5.5 2.5v6M2.5 5.5h6" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#1e293b' }}>ChatGPT</span>
          <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 20, background: '#d1fae5', color: '#065f46', fontWeight: 700 }}>CITED</span>
        </div>
        <div style={{ fontSize: 11, color: '#475569', lineHeight: 1.4, maxWidth: 170 }}>
          "…SecurityBlogs.com.au is one of the leading security research publishers in APAC…"
        </div>
      </div>
    ),
    style: { minWidth: 190, padding: '10px 14px', borderRadius: 12 },
  },
  {
    id: 'ai-gemini',
    side: 'right' as const,
    top: '34%',
    parallaxY: 42,
    parallaxX: 7,
    rotateInit: -2,
    delay: 0.14,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 20, height: 20, borderRadius: 6,
            background: 'linear-gradient(135deg,#4285f4,#ea4335)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M5.5 1C3 1 1 3 1 5.5S3 10 5.5 10 10 8 10 5.5 8 1 5.5 1Z" stroke="white" strokeWidth="1.2" fill="none"/>
              <path d="M5.5 1v9M1 5.5h9" stroke="white" strokeWidth="1.1" strokeLinecap="round" opacity="0.7"/>
            </svg>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#1e293b' }}>Gemini</span>
          <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 20, background: '#dbeafe', color: '#1e40af', fontWeight: 700 }}>AI CITED</span>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#1267d5' }}>24</div>
            <div style={{ fontSize: 9, color: '#64748b' }}>Mentions</div>
          </div>
          <div style={{ width: 1, background: '#e2e8f0' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#4a2f8a' }}>98%</div>
            <div style={{ fontSize: 9, color: '#64748b' }}>Accuracy</div>
          </div>
          <div style={{ width: 1, background: '#e2e8f0' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#22c55e' }}>↑ 6</div>
            <div style={{ fontSize: 9, color: '#64748b' }}>This wk</div>
          </div>
        </div>
      </div>
    ),
    style: { minWidth: 178, padding: '10px 14px', borderRadius: 12 },
  },
  {
    id: 'indexed',
    side: 'right' as const,
    top: '66%',
    parallaxY: -32,
    parallaxX: -6,
    rotateInit: 1,
    delay: 0.2,
    content: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg,#0ea5e9,#1267d5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="6.5" stroke="white" strokeWidth="1.5" fill="none"/>
            <path d="M9 5v4l3 2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#1e293b', lineHeight: 1 }}>94.2%</div>
          <div style={{ fontSize: 10, color: '#64748b', fontWeight: 500 }}>Pages Indexed</div>
        </div>
      </div>
    ),
    style: { padding: '10px 14px', borderRadius: 12 },
  },
]

function FloatCard({
  floater,
  scrollY,
}: {
  floater: (typeof FLOATERS)[0]
  scrollY: ReturnType<typeof useSpring>
}) {
  const yVal = useTransform(scrollY, (v) => v * floater.parallaxY * 0.001)
  const xVal = useTransform(scrollY, (v) => v * floater.parallaxX * 0.001)

  const isLeft = floater.side === 'left'
  const posStyle = isLeft
    ? { left: 0, transform: 'translateX(-100%)' }
    : { right: 0, transform: 'translateX(100%)' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: floater.delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        top: floater.top,
        ...posStyle,
        y: yVal,
        x: xVal,
        rotate: floater.rotateInit,
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          ...floater.style,
          background: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(12px) saturate(160%)',
          WebkitBackdropFilter: 'blur(12px) saturate(160%)',
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
          fontFamily: '"Nunito","Segoe UI",Arial,sans-serif',
        }}
      >
        {floater.content}
      </div>
    </motion.div>
  )
}

export default function HeroGraphWithOrbit() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(true)

  const { scrollY } = useScroll()
  const smoothScroll = useSpring(scrollY, { stiffness: 80, damping: 20 })

  const tiltX = useSpring(0, { stiffness: 120, damping: 25 })
  const tiltY = useSpring(0, { stiffness: 120, damping: 25 })

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1200px)')
    setIsMobile(!mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(!e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current || isMobile) return
    const rect = wrapperRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const nx = (e.clientX - cx) / (rect.width / 2)
    const ny = (e.clientY - cy) / (rect.height / 2)
    tiltY.set(nx * 4)
    tiltX.set(-ny * 3)
  }, [isMobile, tiltX, tiltY])

  const handleMouseLeave = useCallback(() => {
    tiltX.set(0)
    tiltY.set(0)
  }, [tiltX, tiltY])

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        padding: isMobile ? '0' : '0 220px',
      }}
    >
      <motion.div
        style={{
          rotateX: isMobile ? 0 : tiltX,
          rotateY: isMobile ? 0 : tiltY,
          perspective: 1200,
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        <HeroGraph />
        {!isMobile && FLOATERS.map((f) => (
          <FloatCard key={f.id} floater={f} scrollY={smoothScroll} />
        ))}
      </motion.div>
    </div>
  )
}
