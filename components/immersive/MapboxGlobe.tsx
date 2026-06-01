'use client'
import { useEffect, useRef } from 'react'
import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { MAPBOX_TOKEN } from '@/lib/env'
import { COUNTRIES, type Country } from './CountryPicker'
import type { SuburbResult } from './StateSuburbForm'

// Three-stage Mapbox map:
//   Stage A (progress ~0.12 -> ~0.40): globe projection, world-level view.
//   Stage B (0.40 -> 0.55): fly to selected country (zoom 3-5).
//   Stage C (0.55 -> 0.70): fly to suburb (zoom 14, satellite).
//   Stage D (0.70+): hold suburb framing.
// Mapbox API uses easeTo / flyTo for smooth interpolation; we kick off a fresh
// flyTo whenever the target inputs change. Style swaps to satellite-streets
// once we cross zoom 8 so the imagery feels real at the destination.

type Props = {
  progress: MotionValue<number>
  country: Country | null
  suburb: SuburbResult | null
}

export default function MapboxGlobe({ progress, country, suburb }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<unknown>(null)
  const styleSatRef = useRef<boolean>(false)
  // Latest desired view — recomputed every scroll tick.
  const latestTargetRef = useRef<{ lng: number; lat: number; zoom: number; pitch: number; bearing: number; speed?: number } | null>(null)
  const lastAppliedRef = useRef<number>(0)

  // Initialise map once on mount.
  useEffect(() => {
    let cancelled = false
    let m: unknown = null
    ;(async () => {
      if (!containerRef.current || !MAPBOX_TOKEN) return
      const mapbox = (await import('mapbox-gl')).default
      // Load Mapbox CSS via injected <link> — avoids importing CSS in TS file.
      if (!document.querySelector('link[data-mapbox-css]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.4/mapbox-gl.css'
        link.setAttribute('data-mapbox-css', 'true')
        document.head.appendChild(link)
      }
      mapbox.accessToken = MAPBOX_TOKEN
      const map = new mapbox.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        projection: 'globe',
        center: [134, -25],
        zoom: 1.4,
        pitch: 0,
        bearing: 0,
        attributionControl: false,
        antialias: true,
      })
      m = map
      if (cancelled) {
        map.remove()
        return
      }
      mapRef.current = map

      map.on('style.load', () => {
        // Atmosphere for the globe view — soft blue halo.
        ;(map as { setFog: (f: unknown) => void }).setFog({
          color: 'rgb(220, 232, 255)',
          'high-color': 'rgb(150, 180, 235)',
          'horizon-blend': 0.04,
          'space-color': 'rgb(8, 16, 35)',
          'star-intensity': 0.15,
        })
      })

      // Drop pulsing markers on the 5 markets once the map is loaded.
      map.on('load', () => {
        COUNTRIES.forEach((c) => {
          const el = document.createElement('div')
          el.className = 'sb-globe-pin'
          el.style.cssText =
            'width:14px;height:14px;border-radius:50%;background:#1e5fe0;box-shadow:0 0 0 0 rgba(30,95,224,0.6);animation:sb-pulse 1.8s infinite;'
          // Mapbox marker
          new (mapbox as { Marker: new (o?: unknown) => { setLngLat: (c: [number, number]) => { addTo: (m: unknown) => void } } }).Marker({ element: el })
            .setLngLat([c.lng, c.lat])
            .addTo(map)
        })
      })

      // Continuous slow spin while in globe view (resets when we leave).
      let rafId = 0
      const spin = () => {
        const map2 = mapRef.current as { getZoom: () => number; setCenter: (c: [number, number]) => void; getCenter: () => { lng: number; lat: number } } | null
        if (!map2) return
        if (map2.getZoom() < 3.5) {
          const c = map2.getCenter()
          map2.setCenter([c.lng + 0.06, c.lat])
        }
        rafId = requestAnimationFrame(spin)
      }
      rafId = requestAnimationFrame(spin)

      return () => {
        cancelAnimationFrame(rafId)
      }
    })()
    return () => {
      cancelled = true
      if (m) (m as { remove: () => void }).remove()
      mapRef.current = null
    }
  }, [])

  // Recompute desired target every time scroll progress / inputs change.
  useMotionValueEvent(progress, 'change', (p) => {
    const target = computeTarget(p, country, suburb)
    latestTargetRef.current = target
    const map = mapRef.current as null | {
      easeTo: (o: unknown) => void
      getZoom: () => number
      setStyle: (s: string) => void
      jumpTo: (o: unknown) => void
    }
    if (!map || !target) return
    // Throttle easeTo calls to 8/sec to avoid jank on scrub.
    const now = performance.now()
    if (now - lastAppliedRef.current < 120) return
    lastAppliedRef.current = now
    map.easeTo({
      center: [target.lng, target.lat],
      zoom: target.zoom,
      pitch: target.pitch,
      bearing: target.bearing,
      duration: 800,
      essential: true,
    })
    // Swap to satellite-streets once we cross zoom 8.
    const wantSat = target.zoom >= 8
    if (wantSat && !styleSatRef.current) {
      styleSatRef.current = true
      map.setStyle('mapbox://styles/mapbox/satellite-streets-v12')
    } else if (!wantSat && styleSatRef.current) {
      styleSatRef.current = false
      map.setStyle('mapbox://styles/mapbox/light-v11')
    }
  })

  return (
    <>
      <div
        ref={containerRef}
        style={{
          position: 'absolute', inset: 0,
          zIndex: 3,
        }}
        aria-hidden
      />
      {/* Pulsing marker keyframes — injected as a single global style block. */}
      <style>{`
        @keyframes sb-pulse {
          0%   { box-shadow: 0 0 0 0   rgba(30,95,224,0.55); }
          70%  { box-shadow: 0 0 0 14px rgba(30,95,224,0);    }
          100% { box-shadow: 0 0 0 0   rgba(30,95,224,0);    }
        }
        .mapboxgl-control-container { display: none !important; }
      `}</style>
    </>
  )
}

function computeTarget(
  progress: number,
  country: Country | null,
  suburb: SuburbResult | null,
): { lng: number; lat: number; zoom: number; pitch: number; bearing: number } | null {
  // Map only becomes visible after the cloud opening. Before that, return null
  // (we still want the map mounted underneath so it's ready to animate).
  // Below progress 0.12 we just hold a default globe view.
  if (progress < 0.12) {
    return { lng: 0, lat: 20, zoom: 1.2, pitch: 0, bearing: 0 }
  }
  // Globe stage: 0.12 -> 0.40, hold at ~zoom 1.6, slight tilt.
  if (progress < 0.40) {
    return { lng: 30, lat: 18, zoom: 1.6, pitch: 0, bearing: 0 }
  }
  // Country fly-in: 0.40 -> 0.55, ease to country center at country.zoom.
  if (progress < 0.55) {
    if (!country) return null
    const t = (progress - 0.40) / 0.15
    return {
      lng: country.lng,
      lat: country.lat,
      zoom: lerp(1.6, country.zoom, t),
      pitch: lerp(0, 25, t),
      bearing: 0,
    }
  }
  // State+suburb fly-in: 0.55 -> 0.70.
  if (progress < 0.70) {
    if (!country) return null
    const t = (progress - 0.55) / 0.15
    const targetLng = suburb?.lng ?? country.lng
    const targetLat = suburb?.lat ?? country.lat
    return {
      lng: lerp(country.lng, targetLng, t),
      lat: lerp(country.lat, targetLat, t),
      zoom: lerp(country.zoom, suburb ? 15 : 8, t),
      pitch: lerp(25, suburb ? 55 : 35, t),
      bearing: lerp(0, suburb ? 25 : 0, t),
    }
  }
  // Climax: hold close on the suburb.
  if (!country) return null
  return {
    lng: suburb?.lng ?? country.lng,
    lat: suburb?.lat ?? country.lat,
    zoom: suburb ? 16 : 9,
    pitch: 60,
    bearing: 35,
  }
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t))
}
