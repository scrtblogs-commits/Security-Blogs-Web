'use client'
import { useEffect, useMemo, useState } from 'react'

// Sitewide reactive sky background. Switches between a daytime sky (gradient
// + drifting clouds + sun glow) and a night sky (deep blue + ~180 twinkling
// stars + moon glow + occasional shooting star) based on the document's
// data-theme attribute. Reacts to live theme toggles via MutationObserver
// so the swap is instant.
//
// Designed to be cheap: all animation runs on CSS keyframes — no JS-driven
// requestAnimationFrame loops, no canvas. Star positions are generated once
// per mount via a deterministic seed so they don't shift on re-renders.

type Star = { x: number; y: number; size: number; delay: number; duration: number; bright: boolean }
type Cloud = { y: number; delay: number; duration: number; w: number; opacity: number; blur: number }

export default function SkyAtmosphere() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Generated once. We do NOT regenerate when the theme flips — same
  // sky, just different visibility for cloud vs star layers.
  const stars = useMemo(() => makeStars(180), [])
  const clouds = useMemo(() => makeClouds(7), [])

  useEffect(() => {
    setMounted(true)
    const detect = () => {
      const t = document.documentElement.getAttribute('data-theme')
      setTheme(t === 'dark' ? 'dark' : 'light')
    }
    detect()
    const obs = new MutationObserver(detect)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  const isDark = theme === 'dark'

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed', inset: 0, zIndex: -1,
        pointerEvents: 'none', overflow: 'hidden',
        transition: 'background 0.8s ease',
        background: isDark
          ? 'linear-gradient(180deg, #050818 0%, #0d1230 35%, #1a1738 70%, #20133a 100%)'
          : 'linear-gradient(180deg, #b8dbf2 0%, #d8e8f4 35%, #ecf2f7 70%, #fbf3e6 100%)',
      }}
    >
      {/* DAY LAYER — opacity controlled by theme */}
      <div
        style={{
          position: 'absolute', inset: 0,
          opacity: isDark ? 0 : 1,
          transition: 'opacity 0.8s ease',
        }}
      >
        {/* Sun glow */}
        <div
          style={{
            position: 'absolute', top: '7%', right: '11%',
            width: 320, height: 320, borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,236,170,0.65) 0%, rgba(255,225,140,0.22) 35%, transparent 70%)',
            filter: 'blur(8px)',
            animation: 'sb-sun-pulse 9s ease-in-out infinite',
          }}
        />

        {/* Drifting clouds */}
        {mounted && clouds.map((c, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${c.y}%`,
              left: 0,
              width: c.w,
              opacity: c.opacity,
              filter: `blur(${c.blur}px)`,
              animation: `sb-cloud-drift ${c.duration}s linear ${c.delay}s infinite`,
              willChange: 'transform',
            }}
          >
            <CloudShape w={c.w} />
          </div>
        ))}
      </div>

      {/* NIGHT LAYER — opacity controlled by theme */}
      <div
        style={{
          position: 'absolute', inset: 0,
          opacity: isDark ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        {/* Subtle Milky Way band */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background:
              'radial-gradient(ellipse 70% 35% at 60% 35%, rgba(125, 138, 220, 0.16) 0%, transparent 65%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Moon */}
        <div
          style={{
            position: 'absolute', top: '9%', right: '13%',
            width: 70, height: 70, borderRadius: '50%',
            background: 'radial-gradient(circle at 32% 28%, #fff8e0 0%, #f4ecc8 50%, #d3c79a 100%)',
            animation: 'sb-moon-glow 6s ease-in-out infinite',
          }}
        />

        {/* Stars */}
        {mounted && stars.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${s.y}%`,
              left: `${s.x}%`,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              background: s.bright ? '#fff' : '#e6efff',
              boxShadow: s.bright
                ? '0 0 6px 1px rgba(255,255,255,0.55)'
                : '0 0 3px rgba(230,239,255,0.4)',
              animation: `sb-star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
              willChange: 'opacity',
            }}
          />
        ))}

        {/* Occasional shooting star */}
        <div
          style={{
            position: 'absolute', top: '22%', left: '10%',
            width: 2, height: 2, borderRadius: '50%',
            background: '#fff',
            boxShadow:
              '0 0 4px 1px rgba(255,255,255,0.9), -40px -14px 60px 0 rgba(255,255,255,0.35)',
            animation: 'sb-shooting-star 18s ease-out infinite',
            animationDelay: '4s',
          }}
        />
      </div>
    </div>
  )
}

function CloudShape({ w }: { w: number }) {
  return (
    <svg viewBox="0 0 200 80" width={w}>
      <defs>
        <linearGradient id={`sb-c-${w}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#dceaf7" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <path
        d="M30 60 Q15 60 15 45 Q15 30 33 30 Q33 14 55 14 Q72 14 76 30 Q92 18 110 28 Q130 14 148 32 Q174 30 178 50 Q188 56 178 66 Q172 70 30 60 Z"
        fill={`url(#sb-c-${w})`}
      />
    </svg>
  )
}

// Deterministic pseudo-random — same positions every render. Seed-based
// LCG. Good enough for visual variety without React hydration mismatches.
function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

function makeStars(n: number): Star[] {
  const r = rng(7777)
  const arr: Star[] = []
  for (let i = 0; i < n; i++) {
    const bright = r() < 0.12
    arr.push({
      x: r() * 100,
      y: r() * 78, // keep stars in upper ~78% so they're visible above content
      size: bright ? 2.5 + r() * 1.5 : 1 + r() * 1.3,
      delay: r() * 6,
      duration: 3 + r() * 5,
      bright,
    })
  }
  return arr
}

function makeClouds(n: number): Cloud[] {
  const r = rng(1234)
  const arr: Cloud[] = []
  for (let i = 0; i < n; i++) {
    arr.push({
      y: 6 + r() * 60,
      w: 130 + r() * 180,
      delay: -r() * 120, // negative delays distribute starting positions across the screen
      duration: 70 + r() * 90,
      opacity: 0.65 + r() * 0.3,
      blur: 1.5 + r() * 2.5,
    })
  }
  return arr
}
