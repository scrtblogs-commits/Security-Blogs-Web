'use client'
import { useEffect, useState } from 'react'

const WORLD_CLIP = [
  "M14,18 L31,34 L62,46 L64,64 L78,85 L103,96 L107,107 L110,82 L117,67 L130,54 L141,49 L139,40 L129,27 L108,12 L78,6 L36,15 Z",
  "M112,106 L132,103 L162,124 L156,153 L152,154 L136,177 L124,202 L118,183 L110,135 L111,120 Z",
  "M190,64 L191,55 L196,48 L200,43 L210,34 L216,15 L228,15 L231,18 L231,33 L233,51 L231,63 L224,64 L217,63 L203,55 L198,54 Z",
  "M189,42 L191,37 L194,33 L197,33 L200,37 L201,43 L194,45 Z",
  "M143,30 L136,11 L156,5 L178,9 L180,23 L172,30 Z",
  "M193,67 L200,66 L212,64 L228,72 L238,73 L248,102 L257,103 L244,127 L239,150 L236,165 L220,172 L213,163 L211,127 L204,109 L198,112 L181,99 L181,78 Z",
  "M231,63 L240,63 L251,57 L270,36 L300,10 L378,15 L389,30 L378,42 L350,69 L343,67 L333,87 L321,102 L316,117 L289,108 L280,87 L264,87 L256,81 L241,76 Z",
  "M272,80 L280,87 L284,100 L280,112 L272,108 L268,95 Z",
  "M306,100 L316,117 L310,125 L302,112 Z",
  "M344,73 L352,66 L359,54 L361,56 L354,68 L348,75 Z",
  "M327,153 L346,138 L361,135 L370,160 L368,177 L355,178 L350,172 L327,171 Z",
  "M357,182 L362,181 L364,187 L358,188 Z",
  "M385,170 L389,163 L392,168 L388,174 Z",
]

const PINS = [
  { x: 69,  y: 69,  city: 'Los Angeles', country: 'USA',       addr: '123 Wilshire Blvd, CA 90010' },
  { x: 118, y: 58,  city: 'New York',    country: 'USA',       addr: '350 Fifth Ave, NY 10118' },
  { x: 148, y: 156, city: 'São Paulo',   country: 'Brazil',    addr: 'Av. Paulista 1578, SP' },
  { x: 200, y: 43,  city: 'London',      country: 'UK',        addr: '30 St Mary Axe, EC3A 8BF' },
  { x: 210, y: 45,  city: 'Frankfurt',   country: 'Germany',   addr: 'Bockenheimer Anlage 46' },
  { x: 241, y: 121, city: 'Nairobi',     country: 'Kenya',     addr: 'Upper Hill, Nairobi 00100' },
  { x: 261, y: 82,  city: 'Dubai',       country: 'UAE',       addr: 'Sheikh Zayed Rd, Dubai' },
  { x: 281, y: 91,  city: 'Mumbai',      country: 'India',     addr: 'Bandra Kurla Complex, MH' },
  { x: 316, y: 115, city: 'Singapore',   country: 'Singapore', addr: '1 Raffles Place, 048616' },
  { x: 356, y: 67,  city: 'Tokyo',       country: 'Japan',     addr: '1-1 Marunouchi, Chiyoda-ku' },
  { x: 361, y: 177, city: 'Melbourne',   country: 'Australia', addr: '100 Smith St, Collingwood VIC 3066', isMain: true },
  { x: 368, y: 169, city: 'Sydney',      country: 'Australia', addr: '1 Martin Place, NSW 2000' },
]

const HQ_LAT = -37.81, HQ_LON = 144.96
const HQ_X = 361, HQ_Y = 177

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371, r = Math.PI / 180
  const dLat = (lat2 - lat1) * r, dLon = (lon2 - lon1) * r
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(dLon / 2) ** 2
  return Math.round(R * 2 * Math.asin(Math.sqrt(a)))
}

function latLonToSVG(lat: number, lon: number) {
  return {
    x: Math.max(6, Math.min(394, (lon + 180) / 360 * 400)),
    y: Math.max(6, Math.min(204, (80 - lat) / 140 * 210)),
  }
}

export default function GeoHeroVisual() {
  const [activePin, setActivePin] = useState(PINS.findIndex(p => p.isMain))
  const [pingR, setPingR]         = useState(0)
  const [userPingR, setUserPingR] = useState(0)
  const [showPopup, setShowPopup] = useState(true)
  const [geoStatus, setGeoStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle')
  const [userPin, setUserPin]     = useState<{ x: number; y: number; distKm: number } | null>(null)

  const geoRef = { current: 'idle' as typeof geoStatus }
  geoRef.current = geoStatus

  useEffect(() => {
    const pr = setInterval(() => setPingR(r => r > 38 ? 0 : r + 0.7), 28)
    const up = setInterval(() => setUserPingR(r => r > 26 ? 0 : r + 0.55), 30)
    const ac = setInterval(() => {
      if (geoRef.current !== 'granted') {
        setShowPopup(false)
        setTimeout(() => {
          setActivePin(i => (i + 1) % PINS.length)
          setShowPopup(true)
          setPingR(0)
        }, 300)
      }
    }, 2400)

    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      setGeoStatus('requesting')
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude: lat, longitude: lon } = pos.coords
          const { x, y } = latLonToSVG(lat, lon)
          const distKm = haversineKm(lat, lon, HQ_LAT, HQ_LON)
          setUserPin({ x, y, distKm })
          setGeoStatus('granted')
          setShowPopup(true)
        },
        () => setGeoStatus('denied'),
        { timeout: 8000, maximumAge: 120000, enableHighAccuracy: false },
      )
    }

    return () => { clearInterval(pr); clearInterval(up); clearInterval(ac) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cyclePin = PINS[activePin]
  const fmtDist = (km: number) => km < 1 ? 'Right here!' : `${km.toLocaleString()} km away`

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '400 / 260',
      background: '#f0f4fa',
      borderRadius: 20,
      overflow: 'hidden',
      boxShadow: '0 20px 60px -12px rgba(30,95,224,0.18), 0 0 0 1px rgba(30,95,224,0.08)',
    }}>

      {/* Requesting badge */}
      {geoStatus === 'requesting' && (
        <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', zIndex: 20, background: '#1e2433', borderRadius: 20, padding: '5px 14px', display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6' }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>Detecting your location…</span>
        </div>
      )}

      {/* Map SVG */}
      <svg viewBox="0 0 400 210" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="hero-geo-dots" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="1.4" fill="#c0cad8" />
          </pattern>
          <clipPath id="hero-geo-land">
            {WORLD_CLIP.map((d, i) => <path key={i} d={d} />)}
          </clipPath>
          <filter id="hero-pin-shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
          </filter>
        </defs>

        <rect width="400" height="210" fill="#f0f4fa" />
        <rect width="400" height="210" fill="url(#hero-geo-dots)" clipPath="url(#hero-geo-land)" />

        {/* Arc: user → Melbourne HQ */}
        {userPin && (() => {
          const mx = (userPin.x + HQ_X) / 2
          const my = (userPin.y + HQ_Y) / 2 - 28
          return <path d={`M${userPin.x},${userPin.y} Q${mx},${my} ${HQ_X},${HQ_Y}`} fill="none" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.55" />
        })()}

        {/* City pins (no live geo) */}
        {geoStatus !== 'granted' && PINS.map((wp, i) => {
          const isAct = activePin === i
          return (
            <g key={wp.city} filter={isAct ? 'url(#hero-pin-shadow)' : undefined}>
              {isAct && pingR > 0 && (
                <>
                  <circle cx={wp.x} cy={wp.y} r={pingR} fill="none" stroke="#2563eb" strokeWidth="1.1" opacity={Math.max(0, 1 - pingR / 38)} />
                  {pingR > 12 && <circle cx={wp.x} cy={wp.y} r={pingR * 0.55} fill="none" stroke="#2563eb" strokeWidth="0.7" opacity={Math.max(0, 0.5 - pingR / 50)} />}
                </>
              )}
              {isAct && <circle cx={wp.x} cy={wp.y} r="8" fill="#2563eb" opacity="0.12" />}
              <circle cx={wp.x} cy={wp.y} r={isAct ? 5.5 : 4} fill="#2563eb" stroke="white" strokeWidth={isAct ? 1.8 : 1.5} style={{ transition: 'all 0.35s' }} />
              {isAct && <circle cx={wp.x} cy={wp.y} r="2" fill="white" />}
            </g>
          )
        })}

        {/* All pins dimmed + HQ pin (live geo) */}
        {geoStatus === 'granted' && (
          <>
            {PINS.map(wp => <circle key={wp.city} cx={wp.x} cy={wp.y} r="3.5" fill="#2563eb" stroke="white" strokeWidth="1.2" opacity="0.4" />)}
            <g filter="url(#hero-pin-shadow)">
              <circle cx={HQ_X} cy={HQ_Y} r="7" fill="#2563eb" opacity="0.15" />
              <circle cx={HQ_X} cy={HQ_Y} r="5.5" fill="#2563eb" stroke="white" strokeWidth="1.8" />
              <circle cx={HQ_X} cy={HQ_Y} r="2" fill="white" />
              <text x={HQ_X} y={HQ_Y - 10} textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#1e2433">HQ</text>
            </g>
          </>
        )}

        {/* User "You Are Here" */}
        {userPin && (
          <g filter="url(#hero-pin-shadow)">
            <circle cx={userPin.x} cy={userPin.y} r={userPingR + 8} fill="#22c55e" opacity={Math.max(0, 0.12 - userPingR / 200)} />
            {userPingR > 0 && <circle cx={userPin.x} cy={userPin.y} r={userPingR + 4} fill="none" stroke="#22c55e" strokeWidth="1" opacity={Math.max(0, 0.7 - userPingR / 26)} />}
            <circle cx={userPin.x} cy={userPin.y} r="8" fill="white" />
            <circle cx={userPin.x} cy={userPin.y} r="6" fill="#22c55e" />
            <circle cx={userPin.x} cy={userPin.y} r="2.5" fill="white" />
            <text x={userPin.x} y={userPin.y - 12} textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#15803d">YOU</text>
          </g>
        )}
      </svg>

      {/* Popup card */}
      <div className="geo-popup" style={{
        position: 'absolute', bottom: 16, right: 16,
        background: '#1e2433', borderRadius: 10, padding: '11px 15px',
        minWidth: 170, maxWidth: 210,
        boxShadow: '0 8px 28px rgba(0,0,0,0.28)',
        opacity: showPopup ? 1 : 0,
        transform: showPopup ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.97)',
        transition: 'opacity 0.3s, transform 0.3s',
        zIndex: 10,
      }}>
        <div style={{ position: 'absolute', bottom: -7, right: 24, width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '7px solid #1e2433' }} />

        {geoStatus === 'granted' && userPin ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e', flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>You are here</span>
            </div>
            <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.55)', marginBottom: 6 }}>
              {fmtDist(userPin.distKm)} from SecurityBlogs
            </div>
            <div style={{ background: 'rgba(37,99,235,0.25)', borderRadius: 6, padding: '5px 9px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>Melbourne HQ</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#60a5fa', fontFamily: 'var(--font-mono)' }}>{userPin.distKm.toLocaleString()} km</span>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
              {cyclePin.city}, {cyclePin.country}
            </div>
            <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
              {cyclePin.addr}
            </div>
          </>
        )}
      </div>

      {/* LIVE badge */}
      <div style={{
        position: 'absolute', top: 12, left: 14,
        background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(6px)',
        borderRadius: 999, padding: '4px 11px',
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 11, fontWeight: 700, color: '#1e2433',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }} />
        LIVE · GLOBAL NETWORK
      </div>
    </div>
  )
}
