'use client'
import { motion } from 'framer-motion'

const ACCENT = '#34a853'

/* A mock GBP dashboard showing profile completeness, insights, and reviews */
export default function GmbDashboardVisual() {
  const metrics = [
    { label: 'Profile views', val: '3,840', change: '+28%', icon: '👁️' },
    { label: 'Search appearances', val: '12.4K', change: '+61%', icon: '🔍' },
    { label: 'Map views', val: '2,190', change: '+44%', icon: '🗺️' },
    { label: 'Direction requests', val: '487', change: '+38%', icon: '🧭' },
    { label: 'Calls from GBP', val: '214', change: '+52%', icon: '📞' },
    { label: 'Website clicks', val: '1,628', change: '+46%', icon: '🌐' },
  ]

  const completeness = [
    { label: 'Business name', done: true },
    { label: 'Service categories', done: true },
    { label: 'Address & service area', done: true },
    { label: 'Phone & website', done: true },
    { label: 'Business hours', done: true },
    { label: 'Photos (12 added)', done: true },
    { label: 'Services listed', done: true },
    { label: 'Posts published', done: true },
  ]

  const weeks = [38, 44, 52, 48, 61, 67, 74, 71, 83, 88, 94, 100]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Profile completeness + chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* Completeness card */}
        <div style={{
          background: '#fff', borderRadius: 16, border: '1px solid #e8edf7',
          boxShadow: '0 2px 16px -4px rgba(18,42,86,0.07)', padding: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: 14 }}>📍</span>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#0f2244' }}>Profile Completeness</div>
              <div style={{ fontSize: 10, color: '#8896af' }}>Google Business Profile</div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <span style={{ fontSize: 18, fontWeight: 900, color: ACCENT, fontFamily: 'var(--font-mono)' }}>100%</span>
            </div>
          </div>
          <div style={{ height: 8, background: '#f0f4f8', borderRadius: 999, marginBottom: 16, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ height: '100%', background: `linear-gradient(90deg, ${ACCENT}, #1e9e75)`, borderRadius: 999 }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {completeness.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <span style={{ width: 16, height: 16, borderRadius: 999, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#fff', fontSize: 9, fontWeight: 900 }}>✓</span>
                </span>
                <span style={{ fontSize: 11.5, color: '#2d3a52' }}>{c.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Performance chart */}
        <div style={{
          background: '#fff', borderRadius: 16, border: '1px solid #e8edf7',
          boxShadow: '0 2px 16px -4px rgba(18,42,86,0.07)', padding: '20px',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0f2244', marginBottom: 4 }}>Map Ranking Growth</div>
          <div style={{ fontSize: 10, color: '#8896af', fontFamily: 'var(--font-mono)', marginBottom: 16 }}>12 WEEKS AFTER OPTIMISATION</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 80, marginBottom: 8 }}>
            {weeks.map((w, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${w}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                style={{
                  flex: 1, borderRadius: '4px 4px 2px 2px',
                  background: `linear-gradient(180deg, ${ACCENT}, ${ACCENT}55)`,
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#8896af', fontFamily: 'var(--font-mono)' }}>
            <span>W1</span><span>W6</span><span>W12</span>
          </div>
          {/* Review summary */}
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #f0f4f8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#0f2244', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>4.9</div>
                <div style={{ display: 'flex', gap: 1, margin: '3px 0' }}>
                  {'★★★★★'.split('').map((s, i) => <span key={i} style={{ fontSize: 12, color: '#fbbc04' }}>{s}</span>)}
                </div>
                <div style={{ fontSize: 10, color: '#8896af' }}>128 reviews</div>
              </div>
              <div style={{ flex: 1 }}>
                {[5, 4, 3].map((star, i) => (
                  <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 9.5, color: '#8896af', width: 16 }}>{star}★</span>
                    <div style={{ flex: 1, height: 6, background: '#f0f4f8', borderRadius: 3, overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: i === 0 ? '86%' : i === 1 ? '11%' : '3%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        style={{ height: '100%', background: '#fbbc04', borderRadius: 3 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            style={{
              background: '#fff', borderRadius: 12, border: '1px solid #e8edf7',
              boxShadow: '0 1px 8px -2px rgba(18,42,86,0.06)',
              padding: '14px 14px',
            }}
          >
            <div style={{ fontSize: 18, marginBottom: 6 }}>{m.icon}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#0f2244', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{m.val}</div>
            <div style={{ fontSize: 10, color: '#8896af', margin: '3px 0 4px' }}>{m.label}</div>
            <div style={{ fontSize: 10, color: ACCENT, fontWeight: 700 }}>▲ {m.change} this month</div>
          </motion.div>
        ))}
      </div>

    </div>
  )
}
