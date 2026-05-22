'use client'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'

export default function TiltCard({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 18, x: 40 }}
      animate={{ opacity: 1, rotateY: 0, x: 0 }}
      transition={{ duration: 0.8 }}
      style={{ perspective: 1000 }}
    >
      <div className="glass glow-border" style={{ padding: 22, borderRadius: 'var(--radius-lg)', transform: 'rotateY(-8deg) rotateX(4deg)' }}>
        {children}
      </div>
    </motion.div>
  )
}
