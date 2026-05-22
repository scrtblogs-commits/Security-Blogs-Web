'use client'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import HeroBg from './HeroBg'
import MagneticButton from './MagneticButton'

export default function HeroSection9({
  badge, title, sub, ctaLabel = 'Explore', ctaHref = '#', previewTitle = 'Featured', previewItems = [],
}: { badge?: string; title: ReactNode; sub?: string; ctaLabel?: string; ctaHref?: string; previewTitle?: string; previewItems?: { title: string; tag?: string }[] }) {
  return (
    <HeroBg>
      <div className="grid-2" style={{ alignItems: 'center', gap: 56 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {badge && <span className="badge badge-blue" style={{ marginBottom: 20 }}>{badge}</span>}
          <h1 className="h1" style={{ marginBottom: 18 }}>{title}</h1>
          {sub && <p className="lead" style={{ maxWidth: 520, marginBottom: 28 }}>{sub}</p>}
          <MagneticButton href={ctaHref}>{ctaLabel} →</MagneticButton>
        </motion.div>
        <motion.div initial={{ opacity: 0, rotateY: 18, x: 40 }} animate={{ opacity: 1, rotateY: 0, x: 0 }} transition={{ duration: 0.8 }} style={{ perspective: 1000 }}>
          <div className="glass" style={{ padding: 22, borderRadius: 'var(--radius-lg)', transform: 'rotateY(-8deg) rotateX(4deg)' }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>{previewTitle}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(previewItems.length ? previewItems : [{ title: 'How AI ranks security brands', tag: 'Guide' }, { title: 'The 2026 AI visibility report', tag: 'Report' }, { title: 'Schema for security sites', tag: 'Tutorial' }]).map((p, i) => (
                <div key={i} className="card" style={{ padding: 16 }}>
                  {p.tag && <span className="chip" style={{ marginBottom: 8 }}>{p.tag}</span>}
                  <div style={{ fontWeight: 600, fontFamily: 'var(--font-display)' }}>{p.title}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </HeroBg>
  )
}
