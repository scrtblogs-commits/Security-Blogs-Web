'use client'
import { useRef, useState } from 'react'
import { useScroll } from 'framer-motion'
import CloudOpening from './CloudOpening'
import MapboxGlobe from './MapboxGlobe'
import CountryPicker, { COUNTRIES, type Country } from './CountryPicker'
import StateSuburbForm, { type SuburbResult } from './StateSuburbForm'
import LocalPackEmbed from './LocalPackEmbed'
import StreetViewEmbed from './StreetViewEmbed'
import RankingClimb from './RankingClimb'
import ChatGPTCard from './ChatGPTCard'
import AdsCounter from './AdsCounter'

// Top-level scroll-pinned hero. Owns selection state (country/state/suburb/
// service). All children read from `scrollYProgress` to animate.
//
// Total scroll height: 5 viewport-heights of pinned content. That gives the
// user enough room to fill the form inputs as the map flies into place. The
// `position: sticky` inner div keeps the scene full-screen the entire time.
export default function ImmersiveServices({ brand = 'Your Brand' }: { brand?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const [country, setCountry] = useState<Country>(COUNTRIES[0])
  const [state, setState] = useState<string>('New South Wales')
  const [service, setService] = useState<string>('security companies')
  const [suburb, setSuburb] = useState<SuburbResult | null>({
    label: 'Bondi NSW, Australia',
    lng: 151.2767,
    lat: -33.8915,
  })

  const onUseLocation = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // Pick the country whose centre is closest to user's coords. Cheap heuristic.
        const { latitude, longitude } = pos.coords
        let best = COUNTRIES[0]
        let bestDist = Infinity
        for (const c of COUNTRIES) {
          const d = (c.lat - latitude) ** 2 + (c.lng - longitude) ** 2
          if (d < bestDist) { bestDist = d; best = c }
        }
        setCountry(best)
        setSuburb({
          label: `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`,
          lng: longitude,
          lat: latitude,
        })
      },
      () => { /* user denied — no-op */ },
      { enableHighAccuracy: false, timeout: 6000, maximumAge: 60_000 },
    )
  }

  const query = `${service} in ${suburb?.label?.split(',')[0] ?? state} ${country.name}`

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        height: '500vh', // 5 viewport-heights of pinned scroll
        background: '#f0f7ff',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Layer 1 (back): Mapbox map — always mounted, animates with scroll */}
        <MapboxGlobe progress={scrollYProgress} country={country} suburb={suburb} />

        {/* Layer 2 (sky/clouds) — fades out as we descend */}
        <CloudOpening progress={scrollYProgress} />

        {/* Layer 3 (UI overlays) — different cards per stage */}
        <CountryPicker
          progress={scrollYProgress}
          selected={country}
          onSelect={setCountry}
          onUseLocation={onUseLocation}
        />
        <StateSuburbForm
          progress={scrollYProgress}
          country={country}
          state={state}
          setState={setState}
          service={service}
          setService={setService}
          suburb={suburb}
          setSuburb={setSuburb}
        />
        <LocalPackEmbed
          progress={scrollYProgress}
          service={service}
          suburb={suburb?.label?.split(',')[0] ?? ''}
          country={country.name}
        />
        <StreetViewEmbed
          progress={scrollYProgress}
          lng={suburb?.lng ?? null}
          lat={suburb?.lat ?? null}
        />
        <RankingClimb progress={scrollYProgress} brand={brand} query={query} />
        <ChatGPTCard progress={scrollYProgress} brand={brand} question={`Best ${service} in ${suburb?.label?.split(',')[0] ?? state}?`} />
        <AdsCounter progress={scrollYProgress} />

        {/* Final CTA — only visible at the climax */}
        <ClimaxCTA progress={scrollYProgress} />

        {/* Persistent scroll hint at bottom, fades out late */}
        <ScrollHint progress={scrollYProgress} />
      </div>
    </section>
  )
}

import { motion, MotionValue, useTransform } from 'framer-motion'

function ClimaxCTA({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.92, 0.98], [0, 1])
  const y = useTransform(progress, [0.92, 0.98], [30, 0])
  return (
    <motion.div
      style={{
        opacity, y,
        position: 'absolute', top: '46%', left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center', zIndex: 20,
        background: 'rgba(15, 20, 30, 0.86)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        borderRadius: 18,
        padding: '24px 28px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.32)',
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: 'min(520px, 92vw)',
      }}
    >
      <div style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 700, lineHeight: 1.2 }}>
        Your competitors own this map.<br />
        <span style={{ color: '#7eb6ff' }}>Let&apos;s flip it.</span>
      </div>
      <a
        href="/book-strategy-call/"
        style={{
          display: 'inline-block', marginTop: 16,
          background: '#1e5fe0', color: '#fff',
          padding: '12px 22px', borderRadius: 12,
          fontWeight: 700, fontSize: 15,
          textDecoration: 'none',
        }}
      >
        Get your free AI visibility audit →
      </a>
    </motion.div>
  )
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.05, 0.86, 0.92], [0, 1, 1, 0])
  return (
    <motion.div
      style={{
        opacity,
        position: 'absolute', bottom: 24, left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 11, color: '#1e5fe0',
        fontFamily: 'var(--font-mono, monospace)',
        letterSpacing: 1.5,
        zIndex: 30, pointerEvents: 'none',
      }}
    >
      ↓ KEEP SCROLLING
    </motion.div>
  )
}
