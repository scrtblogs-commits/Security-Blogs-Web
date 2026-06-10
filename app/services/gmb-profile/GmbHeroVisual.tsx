'use client'
import { motion } from 'framer-motion'

const ACCENT = '#34a853'

/* Simulates a Google Maps local pack result with map pin + listing card */
export default function GmbHeroVisual() {
  const listings = [
    { name: 'SecureMax CCTV Sydney', rating: 4.9, reviews: 128, tag: 'Security System Installer', dist: '0.3 km', verified: true, rank: 1 },
    { name: 'ProShield Security', rating: 4.7, reviews: 84, tag: 'Security Company', dist: '1.1 km', verified: false, rank: 2 },
    { name: 'AlphaCam Installers', rating: 4.5, reviews: 61, tag: 'CCTV Installer', dist: '1.8 km', verified: false, rank: 3 },
  ]

  return (
    <div style={{
      position: 'relative', borderRadius: 20,
      background: '#fff',
      boxShadow: '0 8px 48px -12px rgba(18,42,86,0.18), 0 0 0 1px rgba(18,42,86,0.06)',
      overflow: 'hidden',
      maxWidth: 480,
    }}>
      {/* Map background */}
      <div style={{
        height: 140, background: 'linear-gradient(135deg, #e8f0fe 0%, #d2e3fc 50%, #ceead6 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Faux street grid */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 }} viewBox="0 0 400 140">
          <line x1="0" y1="50" x2="400" y2="50" stroke="#bcc9e0" strokeWidth="2"/>
          <line x1="0" y1="90" x2="400" y2="90" stroke="#bcc9e0" strokeWidth="1.5"/>
          <line x1="120" y1="0" x2="120" y2="140" stroke="#bcc9e0" strokeWidth="2"/>
          <line x1="260" y1="0" x2="260" y2="140" stroke="#bcc9e0" strokeWidth="1.5"/>
          <line x1="0" y1="115" x2="400" y2="115" stroke="#bcc9e0" strokeWidth="1"/>
          <rect x="130" y="55" width="60" height="30" rx="4" fill="#c5d4eb" opacity="0.6"/>
          <rect x="200" y="55" width="50" height="30" rx="4" fill="#c5d4eb" opacity="0.6"/>
          <rect x="130" y="20" width="80" height="25" rx="4" fill="#c5d4eb" opacity="0.5"/>
          <rect x="270" y="20" width="60" height="50" rx="4" fill="#c5d4eb" opacity="0.5"/>
        </svg>
        {/* Map pins */}
        {[{ x: '38%', y: '38%', scale: 1.4, color: ACCENT, label: '#1' },
          { x: '62%', y: '55%', scale: 1, color: '#4285f4', label: '#2' },
          { x: '72%', y: '28%', scale: 0.9, color: '#ea4335', label: '#3' }].map((pin, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: pin.scale, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 200 }}
            style={{
              position: 'absolute', left: pin.x, top: pin.y,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div style={{
              background: pin.color, width: 28, height: 28, borderRadius: '50% 50% 50% 0',
              transform: 'rotate(-45deg)',
              boxShadow: `0 4px 12px ${pin.color}55`,
              border: '2px solid #fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ transform: 'rotate(45deg)', color: '#fff', fontSize: 9, fontWeight: 900, fontFamily: 'var(--font-mono)' }}>{pin.label}</span>
            </div>
          </motion.div>
        ))}
        {/* Map label */}
        <div style={{ position: 'absolute', top: 10, left: 12, background: 'rgba(255,255,255,0.9)', borderRadius: 8, padding: '4px 10px', fontSize: 11, color: '#0f2244', fontWeight: 600, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          📍 Sydney CBD · Security Installers
        </div>
      </div>

      {/* Local pack listings */}
      <div style={{ padding: '0 0 4px' }}>
        {listings.map((biz, i) => (
          <motion.div
            key={biz.name}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            style={{
              padding: '12px 16px',
              borderBottom: i < listings.length - 1 ? '1px solid #f0f4f8' : 'none',
              background: i === 0 ? `${ACCENT}06` : '#fff',
              borderLeft: i === 0 ? `3px solid ${ACCENT}` : '3px solid transparent',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 800, color: i === 0 ? ACCENT : '#8896af',
                    fontFamily: 'var(--font-mono)', background: i === 0 ? `${ACCENT}18` : '#f0f4f8',
                    padding: '1px 6px', borderRadius: 4,
                  }}>#{biz.rank}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0f2244', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {biz.name}
                  </span>
                  {biz.verified && (
                    <span style={{ fontSize: 10, color: ACCENT, flexShrink: 0 }}>✓ Verified</span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <div style={{ display: 'flex', gap: 1 }}>
                    {'★★★★★'.split('').map((s, si) => (
                      <span key={si} style={{ fontSize: 11, color: si < Math.floor(biz.rating) ? '#fbbc04' : '#ddd' }}>{s}</span>
                    ))}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#0f2244' }}>{biz.rating}</span>
                  <span style={{ fontSize: 11, color: '#8896af' }}>({biz.reviews})</span>
                </div>
                <div style={{ fontSize: 11, color: '#8896af' }}>{biz.tag} · {biz.dist}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
                <span style={{
                  fontSize: 10, padding: '4px 10px', borderRadius: 7, fontWeight: 700,
                  background: i === 0 ? ACCENT : '#f0f4f8', color: i === 0 ? '#fff' : '#46546e',
                  textAlign: 'center',
                }}>Website</span>
                <span style={{
                  fontSize: 10, padding: '4px 10px', borderRadius: 7, fontWeight: 700,
                  background: '#f0f4f8', color: '#46546e', textAlign: 'center',
                }}>Directions</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Google branding strip */}
      <div style={{ padding: '8px 16px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 10, color: '#8896af' }}>Powered by</span>
        <span style={{ fontSize: 12, fontWeight: 800 }}>
          <span style={{ color: '#4285f4' }}>G</span><span style={{ color: '#ea4335' }}>o</span><span style={{ color: '#fbbc04' }}>o</span><span style={{ color: '#4285f4' }}>g</span><span style={{ color: '#34a853' }}>l</span><span style={{ color: '#ea4335' }}>e</span>
        </span>
        <span style={{ fontSize: 10, color: '#8896af' }}>Maps</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: ACCENT, fontWeight: 700 }}>↑ We rank you here</span>
      </div>
    </div>
  )
}
