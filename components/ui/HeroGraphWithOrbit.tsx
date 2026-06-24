'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import HeroGraph from './HeroGraph'

export default function HeroGraphWithOrbit() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(true)

  const { scrollY } = useScroll()
  // Subtle upward drift as page scrolls — creates depth/parallax feel
  const rawY = useTransform(scrollY, [0, 800], [0, -18])
  const y = useSpring(rawY, { stiffness: 60, damping: 20 })

  const tiltX = useSpring(0, { stiffness: 120, damping: 25 })
  const tiltY = useSpring(0, { stiffness: 120, damping: 25 })

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsMobile(!mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(!e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current || isMobile) return
    const rect = wrapperRef.current.getBoundingClientRect()
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    tiltY.set(nx * 3)
    tiltX.set(-ny * 2)
  }, [isMobile, tiltX, tiltY])

  const handleMouseLeave = useCallback(() => {
    tiltX.set(0)
    tiltY.set(0)
  }, [tiltX, tiltY])

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative' }}
    >
      <motion.div
        style={{
          y: isMobile ? 0 : y,
          rotateX: isMobile ? 0 : tiltX,
          rotateY: isMobile ? 0 : tiltY,
          perspective: 1200,
          transformStyle: 'preserve-3d',
          borderRadius: 16,
          boxShadow: '0 8px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        }}
        whileHover={isMobile ? {} : {
          boxShadow: '0 24px 72px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.07)',
          scale: 1.005,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      >
        <HeroGraph />
      </motion.div>
    </div>
  )
}
