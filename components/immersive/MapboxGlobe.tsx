'use client'
import { useEffect, useRef, useState } from 'react'
import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { MAPBOX_TOKEN } from '@/lib/env'
import { COUNTRIES, type Country } from './CountryPicker'
import type { SuburbResult } from './StateSuburbForm'

// Scroll-driven Mapbox globe. Uses `jumpTo` (not `easeTo`) for instant
// 1:1 sync — animated transitions queue up and fight each other on
// every scroll tick, which makes the camera stutter. With jumpTo the map
// position is a pure function of scroll progress.
//
// Stage thresholds (matches ImmersiveServices scroll timing):
//   < 0.12              hidden behind clouds, hold default globe centre
//   0.12 -> 0.40        globe view, slow spin while idle
//   0.40 -> 0.55        fly to selected country
//   0.55 -> 0.70        fly to suburb (style swaps to satellite at z>=8)
//   0.70+               hold close on suburb at z=16, tilted

type Props = {
  progress: MotionValue<number>
  country: Country | null
  suburb: SuburbResult | null
}

type MapboxMap = {
  remove: () => void
  jumpTo: (o: unknown) => void
  setStyle: (s: string) => void
  setFog: (f: unknown) => void
  getZoom: () => number
  getCenter: () => { lng: number; lat: number }
  setCenter: (c: [number, number]) => void
  on: (event: string, fn: () => void) => void
}

export default function MapboxGlobe({ progress, country, suburb }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapboxMap | null>(null)
  const styleSatRef = useRef<boolean>(false)
  const styleLoadedRef = useRef<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Initialise map once on mount.
  useEffect(() => {
    if (!containerRef.current) return
    if (!MAPBOX_TOKEN) {
      setError('Map token missing. Set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local.')
      return
    }
    let map: MapboxMap | null = null
    let rafId = 0
    let cancelled = false

    ;(async () => {
      try {
        const mod = await import('mapbox-gl')
        const mapboxgl = mod.default
        if (cancelled || !containerRef.current) return
        mapboxgl.accessToken = MAPBOX_TOKEN

        map = new mapboxgl.Map({
          container: containerRef.current,
          style: 'mapbox://styles/mapbox/light-v11',
          projection: 'globe' as unknown as undefined,
          center: [30, 18],
          zoom: 1.4,
          pitch: 0,
          bearing: 0,
          attributionControl: false,
          antialias: true,
        }) as unknown as MapboxMap

        mapRef.current = map

        map.on('style.load', () => {
          styleLoadedRef.current = true
          try {
            map?.setFog({
              color: 'rgb(220, 232, 255)',
              'high-color': 'rgb(150, 180, 235)',
              'horizon-blend': 0.04,
              'space-color': 'rgb(8, 16, 35)',
              'star-intensity': 0.15,
            })
          } catch { /* fog not supported on this style */ }
        })

        map.on('load', () => {
          COUNTRIES.forEach((c) => {
            const el = document.createElement('div')
            el.className = 'sb-globe-pin'
            el.style.cssText =
              'width:14px;height:14px;border-radius:50%;background:#1e5fe0;box-shadow:0 0 0 0 rgba(30,95,224,0.6);animation:sb-pulse 1.8s infinite;'
            new (mapboxgl as unknown as {
              Marker: new (o?: unknown) => {
                setLngLat: (c: [number, number]) => { addTo: (m: unknown) => void }
              }
            }).Marker({ element: el })
              .setLngLat([c.lng, c.lat])
              .addTo(map)
          })
        })

        // Slow spin while idle in globe view (z < 3.5).
        const spin = () => {
          if (!map) return
          if (map.getZoom() < 3.5) {
            const c = map.getCenter()
            map.setCenter([c.lng + 0.04, c.lat])
          }
          rafId = requestAnimationFrame(spin)
        }
        rafId = requestAnimationFrame(spin)
      } catch (err) {
        console.error('[Mapbox] failed to initialise', err)
        setError('Could not load the map. Check your browser supports WebGL.')
      }
    })()

    return () => {
      cancelled = true
      if (rafId) cancelAnimationFrame(rafId)
      if (map) { try { map.remove() } catch {} }
      mapRef.current = null
    }
  }, [])

  // 1:1 scroll-to-camera sync. jumpTo is instant — no animation queue.
  useMotionValueEvent(progress, 'change', (p) => {
    const target = computeTarget(p, country, suburb)
    const map = mapRef.current
    if (!map || !target || !styleLoadedRef.current) return
    map.jumpTo({
      center: [target.lng, target.lat],
      zoom: target.zoom,
      pitch: target.pitch,
      bearing: target.bearing,
    })
    const wantSat = target.zoom >= 8
    if (wantSat && !styleSatRef.current) {
      styleSatRef.current = true
      styleLoadedRef.current = false // wait for new style to load
      map.setStyle('mapbox://styles/mapbox/satellite-streets-v12')
    } else if (!wantSat && styleSatRef.current) {
      styleSatRef.current = false
      styleLoadedRef.current = false
      map.setStyle('mapbox://styles/mapbox/light-v11')
    }
  })

  return (
    <>
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 3,
          background: '#0a1428', // dark navy fallback while map loads
        }}
        aria-hidden
      />
      {error && (
        <div
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255,255,255,0.95)', color: '#0f2244',
            padding: '14px 18px', borderRadius: 12,
            fontSize: 13, fontFamily: 'system-ui, sans-serif',
            boxShadow: '0 10px 30px rgba(0,0,0,0.25)', zIndex: 50,
            maxWidth: 360, textAlign: 'center',
          }}
        >
          {error}
        </div>
      )}
      <style>{`
        @keyframes sb-pulse {
          0%   { box-shadow: 0 0 0 0   rgba(30,95,224,0.55); }
          70%  { box-shadow: 0 0 0 14px rgba(30,95,224,0);    }
          100% { box-shadow: 0 0 0 0   rgba(30,95,224,0);    }
        }
        .mapboxgl-control-container { display: none !important; }
        .mapboxgl-canvas { outline: none; }
      `}</style>
    </>
  )
}

function computeTarget(
  progress: number,
  country: Country | null,
  suburb: SuburbResult | null,
): { lng: number; lat: number; zoom: number; pitch: number; bearing: number } | null {
  if (progress < 0.12) {
    return { lng: 30, lat: 18, zoom: 1.4, pitch: 0, bearing: 0 }
  }
  if (progress < 0.40) {
    // Slight zoom in toward 1.8 as we approach the country stage.
    const t = (progress - 0.12) / 0.28
    return { lng: 30, lat: 18, zoom: lerp(1.4, 1.8, t), pitch: 0, bearing: 0 }
  }
  if (progress < 0.55) {
    if (!country) return null
    const t = (progress - 0.40) / 0.15
    return {
      lng: lerp(30, country.lng, t),
      lat: lerp(18, country.lat, t),
      zoom: lerp(1.8, country.zoom, t),
      pitch: lerp(0, 25, t),
      bearing: 0,
    }
  }
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
