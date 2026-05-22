'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const competitors = [
  'genericsecurity.com.au', 'safeguard-systems.com', 'cctv-deals.com.au',
  'lockit-access.com', 'alarmworld.com.au', 'budget-cams.net',
]

export default function SerpAnimation({ brand = 'yoursecuritybrand.com.au' }: { brand?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [rank, setRank] = useState(6)
  useEffect(() => {
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        let r = 6
        const iv = setInterval(() => { r -= 1; setRank(r); if (r <= 0) clearInterval(iv) }, 700)
      }
    }, { threshold: 0.4 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  const list = [...competitors]
  list.splice(rank, 0, brand)

  return (
    <div ref={ref} className="card" style={{ padding: 18 }}>
      <div className="flex items-center gap-2" style={{ marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid var(--line)' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}><span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>o</span><span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span><span style={{ color: '#34A853' }}>l</span><span style={{ color: '#EA4335' }}>e</span></span>
        <span className="field" style={{ flex: 1, padding: '6px 12px', fontSize: 13 }}>security camera installation melbourne</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {list.slice(0, 7).map((item) => {
          const isBrand = item === brand
          return (
            <motion.div key={item} layout transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid', borderColor: isBrand ? 'var(--blue)' : 'var(--line)', background: isBrand ? 'rgba(30,95,224,0.07)' : 'var(--bg-card)', opacity: isBrand ? 1 : 0.55 }}>
              <div style={{ fontSize: 12, color: isBrand ? 'var(--blue)' : 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{item}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: isBrand ? 'var(--blue)' : 'var(--text-soft)' }}>{isBrand ? 'Your Security Brand — #1 CCTV & Access Control' : 'Security Services & Camera Installation'}</div>
            </motion.div>
          )
        })}
      </div>
      <div className="center" style={{ marginTop: 12, fontSize: 13 }}>
        <span className="badge badge-blue">Now ranking #{Math.max(rank + 1, 1)}</span>
      </div>
    </div>
  )
}
