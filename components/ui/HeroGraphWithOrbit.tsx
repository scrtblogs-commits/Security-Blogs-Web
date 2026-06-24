'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'
import HeroGraph from './HeroGraph'

export default function HeroGraphWithOrbit() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(true)

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
          rotateX: isMobile ? 0 : tiltX,
          rotateY: isMobile ? 0 : tiltY,
          perspective: 1200,
          transformStyle: 'preserve-3d',
          borderRadius: 16,
          boxShadow: '0 8px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        }}
        whileHover={isMobile ? {} : {
          boxShadow: '0 20px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)',
        }}
      >
        <HeroGraph />
      </motion.div>
    </div>
  )
}
