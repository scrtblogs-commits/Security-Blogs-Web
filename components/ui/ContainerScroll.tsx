'use client'
import { ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ContainerScroll({ children, title }: { children: ReactNode; title?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 1])

  return (
    <div ref={ref} style={{ perspective: '1000px', padding: '20px 0' }}>
      {title && <div className="center" style={{ marginBottom: 28 }}>{title}</div>}
      <motion.div style={{ rotateX, scale, opacity, transformStyle: 'preserve-3d' }}>
        <div className="glass" style={{ padding: 14, borderRadius: 'var(--radius-lg)', boxShadow: '0 40px 90px -40px rgba(18,42,86,0.4)' }}>
          {children}
        </div>
      </motion.div>
    </div>
  )
}
