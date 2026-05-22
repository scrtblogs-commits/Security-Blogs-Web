'use client'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 3, transformOrigin: '0%',
        background: 'linear-gradient(90deg, var(--blue), var(--red))', zIndex: 200, scaleX,
      }}
    />
  )
}
