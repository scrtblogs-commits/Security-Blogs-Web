'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SERVICES = [
  {
    icon: '🔍',
    name: 'Security SEO',
    stat: '+180% organic traffic',
    tagline: 'Rank #1 for every security keyword',
    color: '#1e9e75',
  },
  {
    icon: '🤖',
    name: 'AIO',
    stat: '87% AI citation rate',
    tagline: 'Get cited by ChatGPT & Perplexity',
    color: '#6f4dff',
  },
  {
    icon: '🎯',
    name: 'AEO',
    stat: '3.4× featured answers',
    tagline: 'Win the answer box for security queries',
    color: '#7f77dd',
  },
  {
    icon: '🌐',
    name: 'GEO',
    stat: 'Entity in 90 days',
    tagline: 'Build your AI knowledge graph',
    color: '#e23744',
  },
  {
    icon: '📢',
    name: 'Google Ads',
    stat: '3.2× ROAS',
    tagline: 'Convert security buyers with paid search',
    color: '#f6c715',
  },
  {
    icon: '🔷',
    name: 'Bing Ads',
    stat: '41% lower CPC',
    tagline: 'Reach B2B decision-makers for less',
    color: '#0078d4',
  },
  {
    icon: '🎨',
    name: 'Web Design',
    stat: '2.1× conversion lift',
    tagline: 'AI-ready websites that rank & convert',
    color: '#1e5fe0',
  },
]

const METRIC_BADGES = [
  { label: '50+ brands', sub: 'security clients' },
  { label: '+180%', sub: 'avg organic growth' },
  { label: '87%', sub: 'AI citation rate' },
]

const FRAME_DURATION = 2500

export default function ServicesHeroVisual() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const startCycle = () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progRef.current) clearInterval(progRef.current)
      setProgress(0)

      const progStep = 100 / (FRAME_DURATION / 50)
      progRef.current = setInterval(() => {
        setProgress((p: number) => (p >= 100 ? 0 : p + progStep))
      }, 50)

      intervalRef.current = setInterval(() => {
        setActiveIndex((i: number) => (i + 1) % SERVICES.length)
        setProgress(0)
      }, FRAME_DURATION)
    }

    startCycle()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progRef.current) clearInterval(progRef.current)
    }
  }, [])

  const svc = SERVICES[activeIndex]

  return (
    <div style={{ width: '100%', maxWidth: 520, margin: '0 auto' }}>
      {/* Browser chrome */}
      <div style={{
        borderRadius: 18,
        overflow: 'hidden',
        background: '#09111f',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: `0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), 0 0 60px -20px ${svc.color}40`,
        transition: 'box-shadow 0.6s ease',
      }}>
        {/* Chrome bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 6, height: 20, marginLeft: 8, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
            <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)' }}>
              securityblogs.com.au
            </span>
          </div>
          <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', color: `${svc.color}cc`, marginLeft: 8, transition: 'color 0.4s ease' }}>
            ALL SERVICES
          </div>
        </div>

        {/* Content area */}
        <div style={{ position: 'relative', height: 260, background: 'linear-gradient(135deg, #060d1f 0%, #0b1530 60%, #080f22 100%)', overflow: 'hidden' }}>
          {/* Grid overlay */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
          {/* Glow orb */}
          <motion.div
            key={activeIndex}
            animate={{ opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
              width: 280, height: 280, borderRadius: '50%',
              background: svc.color, filter: 'blur(80px)',
              pointerEvents: 'none', transition: 'background 0.6s ease',
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: [0.22, 0.8, 0.2, 1] }}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 14, padding: '24px 32px',
              }}
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 260, damping: 20 }}
                style={{
                  width: 64, height: 64, borderRadius: 18,
                  background: `linear-gradient(135deg, ${svc.color}22, ${svc.color}11)`,
                  border: `1.5px solid ${svc.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28,
                  boxShadow: `0 0 24px ${svc.color}30`,
                }}
              >
                {svc.icon}
              </motion.div>

              {/* Name */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 4 }}>
                  {svc.name}
                </div>
                {/* Stat chip */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.35 }}
                  style={{
                    display: 'inline-block',
                    background: `${svc.color}22`,
                    border: `1px solid ${svc.color}50`,
                    borderRadius: 999,
                    padding: '3px 12px',
                    fontSize: 12, fontWeight: 700,
                    color: svc.color,
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {svc.stat}
                </motion.div>
              </div>

              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.35 }}
                style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textAlign: 'center', lineHeight: 1.4, maxWidth: 280 }}
              >
                {svc.tagline}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Service dots */}
          <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 4 }}>
            {SERVICES.map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: activeIndex === i ? 1 : 0.3, scale: activeIndex === i ? 1.3 : 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: activeIndex === i ? svc.color : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress bar — 7 segments */}
        <div style={{ padding: '8px 14px 10px', background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', gap: 3 }}>
            {SERVICES.map((s, i) => (
              <div
                key={i}
                style={{ flex: 1, height: 3, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setActiveIndex(i)}
              >
                <motion.div
                  style={{
                    height: '100%',
                    borderRadius: 999,
                    background: s.color,
                    width: i < activeIndex ? '100%' : i === activeIndex ? `${progress}%` : '0%',
                  }}
                  transition={{ duration: 0.05 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating metric badges */}
      <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'center' }}>
        {METRIC_BADGES.map((badge, i) => (
          <motion.div
            key={badge.label}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 12,
              padding: '8px 14px',
              textAlign: 'center',
              backdropFilter: 'blur(8px)',
              flex: 1,
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{badge.label}</div>
            <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.45)', marginTop: 3, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>{badge.sub}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
