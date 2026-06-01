'use client'
import { motion, MotionValue, useTransform } from 'framer-motion'

// Mini Google Ads "dashboard" panel: impressions, clicks and CPC tick up as
// the user reaches the climax. Numbers are illustrative, not real account data.
export default function AdsCounter({
  progress,
}: {
  progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, [0.88, 0.93, 0.99, 1], [0, 1, 1, 1])
  const y = useTransform(progress, [0.88, 0.93], [40, 0])
  const impressions = useTransform(progress, [0.85, 1.0], [0, 18420])
  const clicks = useTransform(progress, [0.85, 1.0], [0, 947])
  const cpc = useTransform(progress, [0.85, 1.0], [12.4, 3.8])

  return (
    <motion.div
      style={{
        opacity, y,
        position: 'absolute', bottom: '8%', right: '4%',
        width: 'min(280px, 32vw)',
        background: 'rgba(15, 20, 30, 0.94)',
        color: '#e8efff',
        borderRadius: 14,
        padding: 16,
        boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        zIndex: 11,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg, #4285F4 0%, #34A853 50%, #FBBC04 75%, #EA4335 100%)' }} />
        <div style={{ fontSize: 12.5, fontWeight: 600 }}>Google Ads · Last 30 days</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        <Metric label="Impressions" value={impressions} suffix="" />
        <Metric label="Clicks" value={clicks} suffix="" />
        <Metric label="CPC" value={cpc} suffix="$" prefix decimals={2} />
      </div>
      <div style={{ marginTop: 10, fontSize: 10.5, color: '#7c87a3', fontStyle: 'italic' }}>
        Illustrative — your numbers may differ
      </div>
    </motion.div>
  )
}

function Metric({
  label, value, suffix, prefix = false, decimals = 0,
}: {
  label: string
  value: MotionValue<number>
  suffix?: string
  prefix?: boolean
  decimals?: number
}) {
  const display = useTransform(value, (v) => {
    const n = v.toLocaleString('en-AU', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    return prefix ? `${suffix}${n}` : `${n}${suffix}`
  })
  return (
    <div>
      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.4, color: '#7c87a3', marginBottom: 2 }}>{label}</div>
      <motion.div style={{ fontSize: 17, fontWeight: 700, color: '#7eb6ff' }}>{display}</motion.div>
    </div>
  )
}
