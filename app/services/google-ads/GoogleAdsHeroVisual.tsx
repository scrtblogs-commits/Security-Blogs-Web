'use client'
import type React from 'react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ACCENT = '#f6c715'
const QUERIES = [
  'commercial cctv installer sydney',
  'access control systems melbourne',
  '24/7 security monitoring brisbane',
  'alarm system installation perth',
]

export default function GoogleAdsHeroVisual() {
  const [qIdx, setQIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [showAd, setShowAd] = useState(false)
  const [showMetrics, setShowMetrics] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const query = QUERIES[qIdx]

    setTyped('')
    setShowAd(false)
    setShowMetrics(false)

    let i = 0
    function typeNext() {
      i++
      setTyped(query.slice(0, i))
      if (i < query.length) {
        timeout = setTimeout(typeNext, 55)
      } else {
        timeout = setTimeout(() => {
          setShowAd(true)
          timeout = setTimeout(() => {
            setShowMetrics(true)
            timeout = setTimeout(() => {
              setQIdx((prev) => (prev + 1) % QUERIES.length)
            }, 3200)
          }, 400)
        }, 380)
      }
    }
    timeout = setTimeout(typeNext, 400)
    return () => clearTimeout(timeout)
  }, [qIdx])

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Floating metric badges */}
      <AnimatePresence>
        {showMetrics && (
          <>
            <MetricBadge
              label="ROAS" value="3.2×" color="#10b981"
              style={{ position: 'absolute', top: -18, right: -12, zIndex: 10 }}
              delay={0}
            />
            <MetricBadge
              label="CTR" value="7.1%" color="#6366f1"
              style={{ position: 'absolute', bottom: 60, right: -16, zIndex: 10 }}
              delay={0.12}
            />
            <MetricBadge
              label="CPC" value="$12" color={ACCENT}
              style={{ position: 'absolute', bottom: 20, left: -14, zIndex: 10 }}
              delay={0.22}
            />
          </>
        )}
      </AnimatePresence>

      {/* Browser chrome */}
      <div style={{
        borderRadius: 16, overflow: 'hidden',
        boxShadow: '0 24px 60px -12px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06)',
        background: '#fff',
      }}>
        {/* Browser top bar */}
        <div style={{ background: '#f1f3f4', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
              <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <div style={{ flex: 1, background: '#fff', borderRadius: 20, padding: '4px 12px', fontSize: 11, color: '#5f6368', border: '1px solid #dfe1e5', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 10 }}>🔒</span>
            <span>google.com/search</span>
          </div>
        </div>

        {/* Google SERP body */}
        <div style={{ padding: '14px 18px 20px', background: '#fff' }}>
          {/* Search bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            border: '1px solid #dfe1e5', borderRadius: 24,
            padding: '10px 16px', marginBottom: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            <span style={{ fontSize: 16 }}>🔍</span>
            <span style={{ fontSize: 13, color: '#202124', flex: 1, fontFamily: 'system-ui', minHeight: 18 }}>
              {typed}
              <span style={{
                display: 'inline-block', width: 1, height: 14,
                background: '#202124', verticalAlign: 'middle', marginLeft: 1,
                animation: 'blink 1s step-end infinite',
              }} />
            </span>
            <span style={{ fontSize: 11, color: '#5f6368' }}>🎤</span>
          </div>

          {/* Sponsored label */}
          <div style={{ fontSize: 10, color: '#70757a', marginBottom: 6, fontFamily: 'system-ui' }}>
            Sponsored
          </div>

          {/* Ad result */}
          <AnimatePresence mode="wait">
            {showAd && (
              <motion.div
                key={qIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AdResult />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Organic placeholder skeleton rows */}
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[1, 2].map((i) => (
              <OrganicSkeleton key={i} dim={i === 2} />
            ))}
          </div>
        </div>
      </div>

      {/* Live campaign status bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{
          background: '#fff', borderRadius: 12, padding: '10px 16px',
          display: 'flex', alignItems: 'center', gap: 14,
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: '1px solid #e8edf5',
        }}
      >
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontSize: 11, color: '#10b981', fontWeight: 700, fontFamily: 'var(--font-mono)',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%', background: '#10b981',
            boxShadow: '0 0 0 3px rgba(16,185,129,0.2)',
            animation: 'pulse 1.8s ease-in-out infinite',
          }} />
          LIVE CAMPAIGN
        </span>
        <div style={{ flex: 1, display: 'flex', gap: 18 }}>
          {[
            { k: 'Impressions today', v: '8,420' },
            { k: 'Clicks', v: '597' },
            { k: 'Leads', v: '42' },
          ].map((m) => (
            <div key={m.k}>
              <div style={{ fontSize: 9, color: '#9aa5b8', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.k}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0f2244', fontFamily: 'var(--font-display)' }}>{m.v}</div>
            </div>
          ))}
        </div>
        <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
      </motion.div>
    </div>
  )
}

function AdResult() {
  return (
    <div style={{
      border: '2px solid rgba(246,199,21,0.35)', borderRadius: 10, padding: '12px 14px',
      background: 'linear-gradient(135deg, #fffef0 0%, #fff 100%)',
      position: 'relative',
    }}>
      {/* Position #1 badge */}
      <span style={{
        position: 'absolute', top: -10, left: 12,
        background: ACCENT, color: '#0f2244', fontSize: 9, fontWeight: 800,
        padding: '2px 7px', borderRadius: 6, fontFamily: 'var(--font-mono)',
        letterSpacing: '0.06em',
      }}>
        #1 AD
      </span>

      {/* URL + favicon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <span style={{
          width: 16, height: 16, borderRadius: 4,
          background: 'linear-gradient(135deg, #1e5fe0, #0ea5e9)',
          display: 'grid', placeItems: 'center', fontSize: 9, color: '#fff', fontWeight: 800,
        }}>S</span>
        <span style={{ fontSize: 12, color: '#202124', fontFamily: 'system-ui' }}>securityblogs.com.au</span>
        <span style={{ fontSize: 10, color: '#70757a' }}>▼</span>
      </div>

      {/* Headline */}
      <div style={{ fontSize: 16, color: '#1a0dab', fontWeight: 600, fontFamily: 'system-ui', lineHeight: 1.3, marginBottom: 4 }}>
        SecurityBlogs — Security Experts | Free Site Survey Today
      </div>
      <div style={{ fontSize: 13, color: '#1a0dab', fontFamily: 'system-ui', lineHeight: 1.3, marginBottom: 6 }}>
        AS2201 Certified Installers · Fast Response · No Lock-in Contracts
      </div>

      {/* Description */}
      <div style={{ fontSize: 12.5, color: '#4d5156', fontFamily: 'system-ui', lineHeight: 1.5, marginBottom: 10 }}>
        Trusted by 500+ security businesses. CCTV, access control, alarms and monitoring — every
        dollar tracked to a real lead. Get your free site survey.
      </div>

      {/* Sitelinks */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {['Get Free Quote', 'View CCTV Systems', 'Access Control', 'Contact Us'].map((sl) => (
          <span key={sl} style={{
            fontSize: 11.5, color: '#1a0dab', borderBottom: '1px solid #1a0dab',
            paddingBottom: 1, cursor: 'default', fontFamily: 'system-ui',
          }}>{sl}</span>
        ))}
      </div>

      {/* Callouts */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 7 }}>
        {['24/7 Support', 'AS2201 Certified', 'Free Site Survey', 'No Lock-in Contracts'].map((c) => (
          <span key={c} style={{
            fontSize: 11, color: '#5f6368', fontFamily: 'system-ui',
          }}>· {c}</span>
        ))}
      </div>
    </div>
  )
}

function OrganicSkeleton({ dim }: { dim?: boolean }) {
  return (
    <div style={{ opacity: dim ? 0.45 : 0.7 }}>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
        <div style={{ width: 14, height: 14, borderRadius: 3, background: '#e8eaed' }} />
        <div style={{ width: 120, height: 10, borderRadius: 3, background: '#e8eaed' }} />
      </div>
      <div style={{ width: '75%', height: 13, borderRadius: 3, background: '#c8d0e0', marginBottom: 5 }} />
      <div style={{ width: '95%', height: 9, borderRadius: 3, background: '#e8eaed', marginBottom: 3 }} />
      <div style={{ width: '80%', height: 9, borderRadius: 3, background: '#e8eaed' }} />
    </div>
  )
}

function MetricBadge({
  label, value, color, style, delay,
}: {
  label: string; value: string; color: string; style?: React.CSSProperties; delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22, delay }}
      style={{
        background: '#fff', borderRadius: 10, padding: '7px 11px',
        boxShadow: `0 4px 20px rgba(0,0,0,0.12), 0 0 0 1.5px ${color}44`,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        minWidth: 54,
        ...style,
      }}
    >
      <span style={{ fontSize: 9, color: '#9aa5b8', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
      <span style={{ fontSize: 18, fontWeight: 800, color, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{value}</span>
    </motion.div>
  )
}

