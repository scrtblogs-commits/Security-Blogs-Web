'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export type TimelineStep = { title: string; desc?: string; phase?: string }

export default function AnimatedSVGTimeline({
  steps, gradient = 'linear-gradient(180deg, var(--blue), var(--violet))',
}: { steps: TimelineStep[]; gradient?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.4'] })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} style={{ position: 'relative', maxWidth: 880, margin: '0 auto' }}>
      {/* centre line */}
      <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 3, transform: 'translateX(-50%)', background: 'var(--line)' }} className="sg-tl-line">
        <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, height, background: gradient, borderRadius: 3 }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
        {steps.map((s, i) => {
          const left = i % 2 === 0
          return (
            <motion.div key={i} initial={{ opacity: 0, x: left ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}
              className="sg-tl-row" style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', alignItems: 'center' }}>
              <div className="card" style={{ padding: 18, gridColumn: left ? 1 : 3, textAlign: left ? 'right' : 'left' }}>
                {s.phase && <span className="eyebrow" style={{ fontSize: 11 }}>{s.phase}</span>}
                <h4 style={{ fontSize: 16, margin: '4px 0' }}>{s.title}</h4>
                {s.desc && <p className="text-soft" style={{ fontSize: 13.5 }}>{s.desc}</p>}
              </div>
              <div style={{ gridColumn: 2, display: 'grid', placeItems: 'center' }}>
                <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--blue)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 14, border: '3px solid var(--bg)', zIndex: 1 }}>{i + 1}</span>
              </div>
            </motion.div>
          )
        })}
      </div>
      <style>{`@media (max-width: 720px){
        .sg-tl-line { left: 17px !important; }
        .sg-tl-row { grid-template-columns: 34px 1fr !important; gap: 14px; }
        .sg-tl-row > .card { grid-column: 2 !important; text-align: left !important; }
        .sg-tl-row > div:nth-child(2) { grid-column: 1 !important; }
      }`}</style>
    </div>
  )
}
