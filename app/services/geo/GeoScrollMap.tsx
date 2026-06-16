'use client'
import { useEffect, useRef } from 'react'

// Scroll journey: Australia → Melbourne CBD → street level
const JOURNEY = [
  { zoom: 4,  tilt: 0,  heading: 0,   lat: -25.2744, lng: 133.7751 }, // All of Australia
  { zoom: 6,  tilt: 0,  heading: 0,   lat: -33.8688, lng: 151.2093 }, // Eastern Australia
  { zoom: 10, tilt: 30, heading: 10,  lat: -37.8136, lng: 144.9631 }, // Melbourne
  { zoom: 14, tilt: 45, heading: 20,  lat: -37.8136, lng: 144.9631 }, // Melbourne suburbs
  { zoom: 17, tilt: 60, heading: 340, lat: -37.8136, lng: 144.9631 }, // Melbourne CBD 3D
  { zoom: 19, tilt: 67, heading: 340, lat: -37.8136, lng: 144.9631 }, // Street level
]

const SECTIONS = [
  { prog: 0,    headline: 'Your security brand — everywhere AI looks.', sub: 'GEO builds the entity signals that make AI platforms trust and recommend you.' },
  { prog: 0.2,  headline: 'Australia\'s security market is searching for you.', sub: 'Buyers across AU, US, UK and UAE ask AI assistants for security recommendations every day.' },
  { prog: 0.4,  headline: 'AI platforms see your brand in every city.', sub: 'Entity authority built across Google, ChatGPT, Perplexity and 7 more AI platforms.' },
  { prog: 0.6,  headline: 'Street-level precision — suburb by suburb.', sub: 'Local entity signals push your brand into geo-targeted AI answers across every region you serve.' },
  { prog: 0.8,  headline: 'Every AI query. Your brand. By name.', sub: 'Once your entity is confirmed, AI consistently cites you — not your competitors.' },
  { prog: 1.0,  headline: 'Ready to own the AI map?', sub: 'Get your free GEO audit and see exactly which entity signals are missing.' },
]

declare global {
  interface Window {
    google: typeof google
    initGeoMap: () => void
  }
}

export default function GeoScrollMap() {
  const mapRef    = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<google.maps.Map | null>(null)
  const currentIdx  = useRef(0)

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GMAPS_KEY
    if (!apiKey) return
    if (typeof window === 'undefined') return

    const initMap = () => {
      if (!mapRef.current) return
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: JOURNEY[0].lat, lng: JOURNEY[0].lng },
        zoom: JOURNEY[0].zoom,
        mapTypeId: 'satellite',
        tilt: JOURNEY[0].tilt,
        heading: JOURNEY[0].heading,
        disableDefaultUI: true,
        gestureHandling: 'none',
        keyboardShortcuts: false,
      })
      mapInstance.current = map
    }

    // Load Maps JS API if not already loaded
    if (window.google?.maps) {
      initMap()
    } else {
      window.initGeoMap = initMap
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initGeoMap`
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }

    // Scroll handler
    let rafId: number
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const trigger = triggerRef.current
        const map = mapInstance.current
        if (!trigger || !map) return

        const rect  = trigger.getBoundingClientRect()
        const total = trigger.offsetHeight - window.innerHeight
        const prog  = Math.max(0, Math.min(1, -rect.top / total))

        // Find which two journey waypoints we're between
        const segCount = JOURNEY.length - 1
        const segIdx   = Math.min(Math.floor(prog * segCount), segCount - 1)
        const segProg  = (prog * segCount) - segIdx
        const from = JOURNEY[segIdx]
        const to   = JOURNEY[segIdx + 1]

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t

        map.moveCamera({
          center: {
            lat: lerp(from.lat, to.lat, segProg),
            lng: lerp(from.lng, to.lng, segProg),
          },
          zoom:    lerp(from.zoom, to.zoom, segProg),
          tilt:    lerp(from.tilt, to.tilt, segProg),
          heading: lerp(from.heading, to.heading, segProg),
        })

        // Update overlay text
        const overlay = overlayRef.current
        if (!overlay) return
        const active = [...SECTIONS].reverse().find(s => prog >= s.prog) ?? SECTIONS[0]
        const idx = SECTIONS.indexOf(active)
        if (idx !== currentIdx.current) {
          currentIdx.current = idx
          const h = overlay.querySelector('.geo-h') as HTMLElement
          const p = overlay.querySelector('.geo-p') as HTMLElement
          if (h) { h.style.opacity = '0'; h.style.transform = 'translateY(16px)'; setTimeout(() => { h.textContent = active.headline; h.style.opacity = '1'; h.style.transform = 'translateY(0)' }, 200) }
          if (p) { p.style.opacity = '0'; p.style.transform = 'translateY(16px)'; setTimeout(() => { p.textContent = active.sub; p.style.opacity = '1'; p.style.transform = 'translateY(0)' }, 280) }
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    const loop = () => { onScroll(); rafId = requestAnimationFrame(loop) }
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={triggerRef} style={{ height: `${JOURNEY.length * 100}vh`, position: 'relative' }}>
      {/* Sticky full-screen map */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%' }}>
        {/* Google Map fills entire screen */}
        <div ref={mapRef} style={{ position: 'absolute', inset: 0 }} />

        {/* Dark overlay for readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)', pointerEvents: 'none', zIndex: 2 }} />

        {/* Text overlay — bottom left */}
        <div ref={overlayRef} style={{ position: 'absolute', bottom: 80, left: 60, right: 60, zIndex: 3, maxWidth: 680 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', color: '#e23744', marginBottom: 14 }}>GEO — Generative Engine Optimisation</p>
          <h2 className="geo-h" style={{ fontSize: 'clamp(28px, 4vw, 58px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 16, transition: 'opacity .3s, transform .3s' }}>
            {SECTIONS[0].headline}
          </h2>
          <p className="geo-p" style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, maxWidth: 560, transition: 'opacity .3s, transform .3s' }}>
            {SECTIONS[0].sub}
          </p>
          {/* CTA on last section */}
          <a
            href="/contact/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              marginTop: 28, fontSize: 15, fontWeight: 800,
              color: '#fff', background: '#e23744',
              borderRadius: 50, padding: '14px 32px',
              textDecoration: 'none',
            }}
          >
            Get my GEO audit →
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 32, right: 60, zIndex: 3, display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>
          Scroll to zoom in ↓
        </div>
      </div>
    </div>
  )
}
