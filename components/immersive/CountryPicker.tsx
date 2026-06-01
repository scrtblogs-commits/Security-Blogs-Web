'use client'
import { motion, MotionValue, useTransform } from 'framer-motion'

export type Country = {
  code: 'AU' | 'US' | 'GB' | 'AE' | 'SG'
  name: string
  lng: number
  lat: number
  zoom: number
}

export const COUNTRIES: Country[] = [
  { code: 'AU', name: 'Australia',          lng: 134.0, lat: -25.5, zoom: 3.4 },
  { code: 'US', name: 'United States',      lng: -97.0, lat: 39.0,  zoom: 3.2 },
  { code: 'GB', name: 'United Kingdom',     lng:  -2.0, lat: 54.5,  zoom: 4.5 },
  { code: 'AE', name: 'United Arab Emirates', lng: 54.0, lat: 24.5, zoom: 5.5 },
  { code: 'SG', name: 'Singapore',          lng: 103.8, lat:  1.35, zoom: 7.5 },
]

export default function CountryPicker({
  progress,
  selected,
  onSelect,
  onUseLocation,
}: {
  progress: MotionValue<number>
  selected: Country | null
  onSelect: (c: Country) => void
  onUseLocation: () => void
}) {
  // Visible 0.22 -> 0.38; fades out as we move into the next stage.
  const opacity = useTransform(progress, [0.18, 0.24, 0.38, 0.44], [0, 1, 1, 0])
  const y = useTransform(progress, [0.18, 0.24], [40, 0])
  const pointerEvents = useTransform(progress, (p) => (p > 0.18 && p < 0.42 ? 'auto' : 'none'))

  return (
    <motion.div
      style={{
        opacity, y, pointerEvents: pointerEvents as unknown as 'auto',
        position: 'absolute', top: '14%', left: '50%', transform: 'translateX(-50%)',
        textAlign: 'center', zIndex: 14,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 18,
        padding: '22px 26px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.22)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: '#0f2244',
        maxWidth: 'min(560px, 92vw)',
      }}
    >
      <div style={{ fontSize: 11.5, letterSpacing: 2, color: '#1e5fe0', fontWeight: 600, marginBottom: 6 }}>
        STAGE 1 / 4
      </div>
      <div style={{ fontSize: 'clamp(20px, 2.6vw, 28px)', fontWeight: 700, marginBottom: 14 }}>
        Where do you operate?
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
        {COUNTRIES.map((c) => (
          <button
            key={c.code}
            onClick={() => onSelect(c)}
            style={{
              padding: '9px 14px',
              borderRadius: 999,
              border: selected?.code === c.code ? '2px solid #1e5fe0' : '1px solid #d8e0ee',
              background: selected?.code === c.code ? 'rgba(30,95,224,0.10)' : '#fff',
              color: '#0f2244',
              fontSize: 13.5,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            <span style={{ marginRight: 6 }}>{flagEmoji(c.code)}</span>
            {c.name}
          </button>
        ))}
      </div>
      <button
        onClick={onUseLocation}
        style={{
          background: 'transparent',
          border: 0,
          color: '#1e5fe0',
          fontSize: 12.5,
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        Or use my current location
      </button>
    </motion.div>
  )
}

function flagEmoji(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
}
