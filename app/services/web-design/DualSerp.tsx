'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Result = { name: string; url: string; brand?: boolean }

const baseResults: Result[] = [
  { name: 'CitySafe Security Group', url: 'citysafe.com.au' },
  { name: 'Guardian Alarm Co', url: 'guardianalarm.com.au' },
  { name: 'Apex Surveillance', url: 'apexsurveillance.com.au' },
  { name: 'Metro Security Systems', url: 'metrosecurity.com.au' },
  { name: 'Sentinel Protective', url: 'sentinelprotective.com.au' },
  { name: 'Security Solutions', url: 'securitysolutions.com.au', brand: true },
]

function rankedList(rank: number) {
  const others = baseResults.filter((r) => !r.brand)
  const brand = baseResults.find((r) => r.brand)!
  const list = [...others]
  list.splice(rank - 1, 0, brand)
  return list.slice(0, 6)
}

function SerpColumn({ engine, color, icon, rank }: { engine: string; color: string; icon: string; rank: number }) {
  const list = rankedList(rank)
  return (
    <div className="card" style={{ padding: 18 }}>
      <div className="flex items-center gap-2" style={{ marginBottom: 14 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <strong style={{ fontFamily: 'var(--font-display)', fontSize: 15 }}>{engine}</strong>
        <span className="chip" style={{ marginLeft: 'auto', color, borderColor: color }}>You: #{rank}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {list.map((r, i) => {
          const isBrand = r.brand
          return (
            <motion.div
              layout
              key={r.url}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 11px',
                borderRadius: 10,
                border: `1px solid ${isBrand ? color : 'var(--line)'}`,
                background: isBrand ? `${color}12` : 'var(--bg-card-2)',
              }}
            >
              <span style={{ width: 22, height: 22, flexShrink: 0, borderRadius: 6, display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#fff', background: isBrand ? color : 'var(--text-dim)' }}>{i + 1}</span>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: 13.5, fontWeight: isBrand ? 700 : 500, color: isBrand ? color : 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
                <div className="text-dim" style={{ fontSize: 11.5, fontFamily: 'var(--font-mono)' }}>{r.url}</div>
              </div>
              {isBrand && <span style={{ marginLeft: 'auto', fontSize: 13 }}>⬆</span>}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const aiPlatforms = ['ChatGPT', 'Perplexity', 'Google AI', 'Gemini']

export default function DualSerp() {
  const [rank, setRank] = useState(6)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) setStarted(true) }, { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const iv = setInterval(() => {
      setRank((r) => {
        if (r <= 1) { clearInterval(iv); return 1 }
        return r - 1
      })
    }, 1100)
    return () => clearInterval(iv)
  }, [started])

  const atTop = rank === 1

  return (
    <div ref={ref}>
      <div className="grid-2" style={{ gap: 22 }}>
        <SerpColumn engine="Google" color="#1e5fe0" icon="🔵" rank={rank} />
        <SerpColumn engine="Bing" color="#0078d4" icon="🔷" rank={rank} />
      </div>

      <AnimatePresence>
        {atTop && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card center"
            style={{ marginTop: 22, padding: '22px 24px' }}
          >
            <div className="eyebrow" style={{ marginBottom: 14 }}>Also appearing in AI</div>
            <div className="flex flex-wrap gap-3 justify-center">
              {aiPlatforms.map((p, i) => (
                <motion.span
                  key={p}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.12 }}
                  className="chip"
                  style={{ fontSize: 14, padding: '8px 16px', color: 'var(--green)', borderColor: 'var(--green)', fontWeight: 600 }}
                >
                  {p} <span style={{ marginLeft: 4 }}>✓</span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
