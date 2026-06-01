'use client'
import { useEffect, useState } from 'react'

// Minimal consent banner. Shows once, persists choice in localStorage. We don't
// gate scripts on this in v1 — it's a notice + dismissal. Upgrade to a full CMP
// (gating GTM, Mapbox, Google Maps) when EU/UK traffic justifies it.
export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    try {
      if (!localStorage.getItem('sb-consent')) setVisible(true)
    } catch {}
  }, [])
  if (!visible) return null
  const accept = () => {
    try { localStorage.setItem('sb-consent', 'accepted') } catch {}
    setVisible(false)
  }
  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      style={{
        position: 'fixed', bottom: 14, left: 14, right: 14, zIndex: 200,
        maxWidth: 760, marginInline: 'auto',
        background: 'rgba(15, 20, 30, 0.94)', color: '#e8efff',
        borderRadius: 14, padding: '14px 18px',
        display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
        boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        fontSize: 13.5, lineHeight: 1.5,
      }}
    >
      <span style={{ flex: 1, minWidth: 220 }}>
        We use cookies and embedded Google Maps / Mapbox tiles to power the
        live AI visibility experience. By continuing you accept this. See our{' '}
        <a href="/privacy-policy/" style={{ color: '#7eb6ff', textDecoration: 'underline' }}>privacy policy</a>.
      </span>
      <button
        onClick={accept}
        style={{
          background: '#1e5fe0', color: '#fff', border: 0,
          padding: '8px 16px', borderRadius: 10, cursor: 'pointer',
          fontWeight: 600, fontSize: 13.5,
        }}
      >
        Got it
      </button>
    </div>
  )
}
