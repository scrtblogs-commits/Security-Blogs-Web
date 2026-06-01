'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { MAPBOX_TOKEN } from '@/lib/env'
import type { Country } from './CountryPicker'

// Static fallback state lists for each country we serve. Covers the most
// common admin division — keeps the picker quick even if Mapbox geocoder
// is unavailable on first paint.
const STATES: Record<Country['code'], string[]> = {
  AU: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'ACT', 'Northern Territory'],
  US: ['California', 'New York', 'Texas', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'Washington'],
  GB: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  AE: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'],
  SG: ['Central', 'North', 'North-East', 'East', 'West'],
}

export type SuburbResult = {
  label: string
  lng: number
  lat: number
}

export default function StateSuburbForm({
  progress,
  country,
  state,
  setState,
  service,
  setService,
  suburb,
  setSuburb,
}: {
  progress: MotionValue<number>
  country: Country
  state: string
  setState: (v: string) => void
  service: string
  setService: (v: string) => void
  suburb: SuburbResult | null
  setSuburb: (s: SuburbResult | null) => void
}) {
  // Visible 0.40 -> 0.66. After that, fade out as we land on the suburb.
  const opacity = useTransform(progress, [0.40, 0.46, 0.66, 0.72], [0, 1, 1, 0])
  const y = useTransform(progress, [0.40, 0.46], [50, 0])
  const pointerEvents = useTransform(progress, (p) => (p > 0.40 && p < 0.70 ? 'auto' : 'none'))

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SuburbResult[]>([])
  const [open, setOpen] = useState(false)
  const debounceRef = useRef<number | null>(null)

  // Debounced Mapbox geocoder lookup. Restricts to selected country + locality
  // and postcode types so suggestions are appropriate.
  useEffect(() => {
    if (!query || query.length < 2 || !MAPBOX_TOKEN) {
      setResults([])
      return
    }
    if (debounceRef.current) window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(() => {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json` +
        `?access_token=${MAPBOX_TOKEN}` +
        `&country=${country.code.toLowerCase()}` +
        `&types=postcode,locality,place,neighborhood` +
        `&autocomplete=true&limit=6`
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          const list = (data?.features ?? []).map((f: { place_name: string; center: [number, number] }) => ({
            label: f.place_name,
            lng: f.center[0],
            lat: f.center[1],
          }))
          setResults(list)
          setOpen(true)
        })
        .catch(() => setResults([]))
    }, 200)
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current)
    }
  }, [query, country.code])

  const stateOptions = useMemo(() => STATES[country.code] ?? [], [country.code])

  return (
    <motion.div
      style={{
        opacity, y, pointerEvents: pointerEvents as unknown as 'auto',
        position: 'absolute', top: '14%', left: '50%', transform: 'translateX(-50%)',
        zIndex: 14,
        background: 'rgba(255,255,255,0.94)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 18,
        padding: '22px 24px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.22)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: '#0f2244',
        width: 'min(520px, 92vw)',
      }}
    >
      <div style={{ fontSize: 11.5, letterSpacing: 2, color: '#1e5fe0', fontWeight: 600, marginBottom: 4 }}>
        STAGE 2 / 4 · {country.name}
      </div>
      <div style={{ fontSize: 'clamp(18px, 2.4vw, 24px)', fontWeight: 700, marginBottom: 14 }}>
        Tell us where and what.
      </div>

      <label style={{ display: 'block', fontSize: 12, color: '#46546e', marginBottom: 4 }}>State / region</label>
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        style={{
          width: '100%', padding: '10px 12px', borderRadius: 10,
          border: '1px solid #d8e0ee', fontSize: 14, color: '#0f2244',
          background: '#fff', marginBottom: 12,
        }}
      >
        <option value="">Select a state…</option>
        {stateOptions.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>

      <label style={{ display: 'block', fontSize: 12, color: '#46546e', marginBottom: 4 }}>Your service</label>
      <input
        value={service}
        onChange={(e) => setService(e.target.value)}
        placeholder="e.g. CCTV installer, alarm monitoring"
        style={{
          width: '100%', padding: '10px 12px', borderRadius: 10,
          border: '1px solid #d8e0ee', fontSize: 14, color: '#0f2244',
          background: '#fff', marginBottom: 12,
        }}
      />

      <label style={{ display: 'block', fontSize: 12, color: '#46546e', marginBottom: 4 }}>Suburb / postcode</label>
      <div style={{ position: 'relative' }}>
        <input
          value={suburb?.label && !query ? suburb.label : query}
          onChange={(e) => { setQuery(e.target.value); setSuburb(null) }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Start typing a suburb…"
          style={{
            width: '100%', padding: '10px 12px', borderRadius: 10,
            border: '1px solid #d8e0ee', fontSize: 14, color: '#0f2244',
            background: '#fff',
          }}
        />
        {open && results.length > 0 && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
            background: '#fff', border: '1px solid #d8e0ee', borderRadius: 10,
            boxShadow: '0 12px 30px rgba(0,0,0,0.14)', maxHeight: 220, overflowY: 'auto',
            zIndex: 20,
          }}>
            {results.map((r, i) => (
              <button
                key={i}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { setSuburb(r); setQuery(''); setOpen(false) }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '9px 12px', background: 'transparent', border: 0,
                  borderBottom: i < results.length - 1 ? '1px solid #f3f4f7' : 'none',
                  cursor: 'pointer', fontSize: 13, color: '#0f2244',
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 14, fontSize: 12, color: '#5f6f8a' }}>
        Keep scrolling to fly there →
      </div>
    </motion.div>
  )
}
