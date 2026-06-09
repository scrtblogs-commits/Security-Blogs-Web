'use client'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'

// Gradient cycles through brand colours on a 10-second loop
const gradients = [
  'linear-gradient(135deg, #1e5fe0, #6f4dff)',
  'linear-gradient(135deg, #6f4dff, #e23744)',
  'linear-gradient(135deg, #e23744, #1e9e75)',
  'linear-gradient(135deg, #1e9e75, #1e5fe0)',
]

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
        <motion.div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(40px,6vw,72px) 32px',
            textAlign: 'center',
            color: '#fff',
          }}
          animate={{ background: gradients }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          {/* Decorative blobs */}
          <div className="blob blob-yellow" style={{ top: -60, right: -40, opacity: 0.22 }} />
          <div className="blob blob-blue"   style={{ bottom: -80, left: -60, opacity: 0.18 }} />

          <motion.h2
            className="z1"
            style={{ fontSize: 'clamp(26px,4vw,44px)', marginBottom: 16, position: 'relative' }}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="z1 mx-auto"
            style={{
              maxWidth: 560,
              opacity: 0.92,
              marginBottom: 30,
              fontSize: 17,
              position: 'relative',
            }}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="z1"
            style={{ position: 'relative' }}
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <MagneticButton href={ctaHref} className="btn btn-lg">
              <span
                style={{
                  background: '#fff',
                  color: 'var(--blue)',
                  padding: '15px 32px',
                  borderRadius: 12,
                  fontWeight: 600,
                }}
              >
                {ctaLabel}
              </span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
