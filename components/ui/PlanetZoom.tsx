'use client'
import { useEffect, useRef, useState } from 'react'

export default function PlanetZoom() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight
      // progress 0 = section top at bottom of screen, 1 = section bottom at top of screen
      const total = rect.height + windowH
      const scrolled = windowH - rect.top
      const p = Math.min(1, Math.max(0, scrolled / total))
      setProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scale: starts small (0.55) zooms to full (1.6) as you scroll into section
  const scale = 0.55 + progress * 1.2
  // Rotate slightly as you zoom
  const rotate = (1 - progress) * 8
  // Brightness increases as you zoom in
  const brightness = 0.7 + progress * 0.4
  // Perspective depth: starts blurred slightly, sharpens
  const blur = Math.max(0, (1 - progress) * 3)

  return (
    <div
      ref={sectionRef}
      style={{
        height: '200vh',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0f1e',
      }}>
        {/* Glow ring behind planet */}
        <div style={{
          position: 'absolute',
          width: '70vmin',
          height: '70vmin',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30,95,224,0.18) 0%, rgba(110,77,255,0.08) 50%, transparent 75%)',
          transform: `scale(${scale * 1.3})`,
          transition: 'transform 0.05s linear',
          pointerEvents: 'none',
        }} />

        {/* Planet image */}
        <div style={{
          transform: `scale(${scale}) rotate(${rotate}deg)`,
          filter: `brightness(${brightness}) blur(${blur}px) drop-shadow(0 0 ${40 * progress}px rgba(30,95,224,0.5))`,
          transition: 'transform 0.05s linear, filter 0.05s linear',
          willChange: 'transform, filter',
          width: '65vmin',
          height: '65vmin',
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: `0 0 ${60 * progress}px rgba(30,95,224,0.3), 0 ${20 * (1 - progress)}px ${60}px rgba(0,0,0,0.6)`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/office-planet.jpg"
            alt="SecurityBlogs office — 360° view"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
          />
        </div>

        {/* Scroll hint text — fades out as you scroll */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: Math.max(0, 1 - progress * 4),
          color: 'rgba(255,255,255,0.4)',
          fontSize: 13,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.1em',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          pointerEvents: 'none',
        }}>
          <span>SCROLL TO ZOOM IN</span>
          <span style={{ fontSize: 18, animation: 'bounce-down 1.5s ease-in-out infinite' }}>↓</span>
        </div>

        {/* Caption — fades in as you zoom */}
        <div style={{
          position: 'absolute',
          top: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: Math.max(0, progress * 3 - 1.5),
          color: '#fff',
          textAlign: 'center',
          pointerEvents: 'none',
        }}>
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 6 }}>Our Space</p>
          <p style={{ fontSize: 22, fontWeight: 700 }}>Where ideas become security brands.</p>
        </div>
      </div>

      <style>{`
        @keyframes bounce-down {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </div>
  )
}
