'use client'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'

export default function CTABand({
  title    = 'Ready to be the answer AI gives?',
  subtitle = 'Get a free AI visibility audit and see exactly where your security brand wins — and where competitors get cited instead of you.',
  ctaLabel = 'Get your free audit →',
  ctaHref  = '/book-strategy-call/',
}: {
  title?:    string
  subtitle?: string
  ctaLabel?: string
  ctaHref?:  string
}) {
  return (
    <section className="section">
      <div className="container">
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(40px,6vw,72px) 32px',
          textAlign: 'center',
          background: '#fff',
          border: '1.5px solid rgba(30,95,224,0.13)',
          boxShadow: '0 8px 40px -8px rgba(30,95,224,0.10)',
        }}>
          {/* Subtle blue accent line at top */}
          <div style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: 3,
            background: 'linear-gradient(90deg, transparent, #1e5fe0 40%, #6f4dff 60%, transparent)',
            borderRadius: '0 0 4px 4px',
          }} />

          {/* Soft ambient glow orbs */}
          <div style={{
            position: 'absolute', top: -80, right: -60, width: 320, height: 320, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(30,95,224,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: -60, left: -40, width: 260, height: 260, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(111,77,255,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <motion.h2
            style={{ fontSize: 'clamp(26px,4vw,44px)', marginBottom: 16, position: 'relative', color: 'var(--text)' }}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>

          <motion.p
            style={{
              maxWidth: 560, marginInline: 'auto',
              marginBottom: 30, fontSize: 17,
              position: 'relative', color: 'var(--text-dim)',
            }}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            style={{ position: 'relative' }}
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <MagneticButton href={ctaHref} className="btn btn-primary btn-lg">
              {ctaLabel}
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
