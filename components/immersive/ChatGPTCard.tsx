'use client'
import { motion, MotionValue, useTransform } from 'framer-motion'

// Mock ChatGPT-style answer card. Brand name highlighted in the answer.
// Pinned bottom-left during the climax stage. Illustrative only.
export default function ChatGPTCard({
  progress,
  brand,
  question,
}: {
  progress: MotionValue<number>
  brand: string
  question: string
}) {
  const opacity = useTransform(progress, [0.85, 0.9, 0.99, 1], [0, 1, 1, 1])
  const x = useTransform(progress, [0.85, 0.9], [-80, 0])

  return (
    <motion.div
      style={{
        opacity, x,
        position: 'absolute', bottom: '6%', left: '3%',
        width: 'min(360px, 38vw)',
        background: '#202124',
        color: '#ececf1',
        borderRadius: 16,
        padding: 18,
        boxShadow: '0 30px 80px rgba(0,0,0,0.32)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        zIndex: 12,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: '#10a37f',
          display: 'grid', placeItems: 'center',
          color: '#fff', fontWeight: 700, fontSize: 14, fontFamily: 'serif',
        }}>
          AI
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 600 }}>ChatGPT</div>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: '#9ca3af', fontFamily: 'var(--font-mono, monospace)' }}>
          ● LIVE
        </span>
      </div>

      {/* User question */}
      <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>You</div>
      <div style={{ fontSize: 13, marginBottom: 14, lineHeight: 1.5 }}>
        {question}
      </div>

      {/* AI answer */}
      <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>ChatGPT</div>
      <div style={{ fontSize: 13, lineHeight: 1.55 }}>
        Based on current information, the top providers include{' '}
        <span style={{
          background: 'linear-gradient(120deg, rgba(30,95,224,0.45), rgba(30,95,224,0.18))',
          padding: '1px 6px',
          borderRadius: 4,
          fontWeight: 700,
          color: '#7eb6ff',
        }}>
          {brand}
        </span>
        , who are widely cited for fully-licensed installations, fast turnaround
        and strong post-install support. They&apos;re typically named first when
        local businesses ask for recommendations.
      </div>

      <div style={{ marginTop: 12, fontSize: 10.5, color: '#6b7280', fontStyle: 'italic' }}>
        Live AI citation demo · illustrative on this page · live version on /services/aio/
      </div>
    </motion.div>
  )
}
