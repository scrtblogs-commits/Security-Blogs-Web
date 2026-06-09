'use client'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// Hero right panel for Security SEO page
// Shows a branded Google SERP with SecurityBlogs at #1,
// surrounded by floating data cards (traffic, AI citations, keyword wins)
// with subtle continuous oscillation animations.

const SERP_ITEMS = [
  { domain: 'securityblogs.com.au', title: 'Security SEO Australia | AI Visibility for Security Brands', top: true },
  { domain: 'genericsecurity.com.au', title: 'Security Camera Installation Melbourne', top: false },
  { domain: 'safeguard-systems.com', title: 'CCTV & Access Control Systems', top: false },
  { domain: 'cctv-deals.com.au', title: 'Cheap Security Cameras Australia', top: false },
  { domain: 'lockit-access.com', title: 'Access Control Solutions', top: false },
]

function float(delay = 0, range = 8) {
  return {
    animate: { y: [0, -range, 0] },
    transition: { duration: 3.5 + delay * 0.4, repeat: Infinity, ease: 'easeInOut', delay },
  }
}

export default function SeoHeroVisual() {
  const [rank, setRank] = useState(5)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        let r = 5
        const iv = setInterval(() => {
          r -= 1; setRank(r)
          if (r <= 0) clearInterval(iv)
        }, 600)
        return () => clearInterval(iv)
      }
    }, { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  const list = [...SERP_ITEMS.slice(1)]
  list.splice(rank, 0, SERP_ITEMS[0])

  return (
    <div ref={ref} style={{ position: 'relative', minHeight: 480 }}>

      {/* ── Floating card: Traffic chart ── */}
      <motion.div {...float(0)} style={{
        position: 'absolute', top: -12, right: -10, zIndex: 10,
        background: '#fff', borderRadius: 14,
        border: '1.5px solid rgba(30,158,117,0.20)',
        boxShadow: '0 8px 28px -8px rgba(30,158,117,0.18)',
        padding: '10px 14px', minWidth: 140,
      }}>
        <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#aaa', letterSpacing: '0.08em', marginBottom: 4 }}>ORGANIC TRAFFIC</div>
        <svg viewBox="0 0 120 36" style={{ width: '100%', height: 36 }}>
          <defs>
            <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e9e75" stopOpacity="0.35"/>
              <stop offset="100%" stopColor="#1e9e75" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0 30 L15 26 L30 22 L45 16 L60 12 L75 8 L90 5 L105 3 L120 2 L120 36 L0 36Z" fill="url(#tg)"/>
          <path d="M0 30 L15 26 L30 22 L45 16 L60 12 L75 8 L90 5 L105 3 L120 2" fill="none" stroke="#1e9e75" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="120" cy="2" r="3" fill="#1e9e75"/>
        </svg>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#1e9e75', marginTop: 2 }}>+180% <span style={{ fontSize: 10, fontWeight: 500, color: '#888' }}>6 months</span></div>
      </motion.div>

      {/* ── Floating card: AI Citation ── */}
      <motion.div {...float(1.2, 6)} style={{
        position: 'absolute', bottom: 60, right: -14, zIndex: 10,
        background: '#fff', borderRadius: 14,
        border: '1.5px solid rgba(111,77,255,0.20)',
        boxShadow: '0 8px 28px -8px rgba(111,77,255,0.18)',
        padding: '10px 14px',
      }}>
        <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#aaa', letterSpacing: '0.08em', marginBottom: 6 }}>AI CITATION RATE</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'conic-gradient(#6f4dff 315deg, #f0f0ff 315deg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#6f4dff' }}>87%</div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6f4dff' }}>ChatGPT</div>
            <div style={{ fontSize: 9.5, color: '#aaa' }}>Cites your brand</div>
          </div>
        </div>
      </motion.div>

      {/* ── Floating badge: New #1 ── */}
      <motion.div {...float(0.6, 5)} style={{
        position: 'absolute', bottom: 16, left: -10, zIndex: 10,
        background: 'linear-gradient(135deg, #1e9e75, #1e5fe0)',
        borderRadius: 12, padding: '8px 14px',
        boxShadow: '0 6px 20px -4px rgba(30,158,117,0.40)',
      }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-mono)' }}>RANKING UPDATE</div>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginTop: 2 }}>Now #1 · security-seo.au</div>
      </motion.div>

      {/* ── Main SERP panel ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 0.8, 0.2, 1] }}
        style={{
          background: '#fff', borderRadius: 20,
          border: '1.5px solid rgba(18,42,86,0.10)',
          boxShadow: '0 20px 60px -16px rgba(18,42,86,0.16)',
          padding: 18, margin: '20px 4px',
        }}
      >
        {/* Google bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid #f0f0f0' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, letterSpacing: '-0.5px' }}>
            <span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>o</span>
            <span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span>
            <span style={{ color: '#34A853' }}>l</span><span style={{ color: '#EA4335' }}>e</span>
          </span>
          <div style={{
            flex: 1, background: '#f8f9fa', borderRadius: 24, border: '1px solid #e8eaed',
            padding: '6px 14px', fontSize: 12, color: '#666', display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ color: '#9aa0a6', fontSize: 13 }}>🔍</span>
            Security Camera Installation Melbourne
          </div>
        </div>

        {/* SERP results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {list.slice(0, 5).map((item, i) => {
            const isTop = item.domain === 'securityblogs.com.au'
            return (
              <motion.div
                key={item.domain} layout
                transition={{ type: 'spring', stiffness: 240, damping: 28 }}
                style={{
                  padding: '10px 12px', borderRadius: 10,
                  border: `1px solid ${isTop ? 'rgba(30,158,117,0.30)' : '#f0f0f0'}`,
                  background: isTop ? 'rgba(30,158,117,0.06)' : '#fafafa',
                  opacity: isTop ? 1 : 0.5 + (0.1 * (4 - i)),
                  position: 'relative',
                }}
              >
                {isTop && (
                  <div style={{
                    position: 'absolute', top: -8, right: 10,
                    background: '#1e9e75', color: '#fff',
                    fontSize: 8.5, fontWeight: 700, fontFamily: 'var(--font-mono)',
                    padding: '2px 8px', borderRadius: 999, letterSpacing: '0.06em',
                  }}>
                    #1 POSITION
                  </div>
                )}
                <div style={{ fontSize: 10, color: '#34a853', fontFamily: 'var(--font-mono)', marginBottom: 1 }}>
                  {item.domain} ›
                </div>
                <div style={{ fontSize: 12.5, fontWeight: isTop ? 700 : 500, color: isTop ? '#1a0dab' : '#70757a', lineHeight: 1.3 }}>
                  {item.title}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
