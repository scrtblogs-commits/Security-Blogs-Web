'use client'

import * as React from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

export type CardStackItem = {
  id: string | number
  title: string
  description?: string
  imageSrc?: string
  href?: string
  ctaLabel?: string
  tag?: string
  color?: string
  icon?: string
}

export type CardStackProps<T extends CardStackItem> = {
  items: T[]
  initialIndex?: number
  maxVisible?: number
  cardWidth?: number
  cardHeight?: number
  overlap?: number
  spreadDeg?: number
  perspectivePx?: number
  depthPx?: number
  tiltXDeg?: number
  activeLiftPx?: number
  activeScale?: number
  inactiveScale?: number
  springStiffness?: number
  springDamping?: number
  loop?: boolean
  autoAdvance?: boolean
  intervalMs?: number
  pauseOnHover?: boolean
  showDots?: boolean
  className?: string
  onChangeIndex?: (index: number, item: T) => void
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode
}

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0
  return ((n % len) + len) % len
}

function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active
  if (!loop || len <= 1) return raw
  const alt = raw > 0 ? raw - len : raw + len
  return Math.abs(alt) < Math.abs(raw) ? alt : raw
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" /><path d="M7 7h10v10" />
    </svg>
  )
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 7,
  cardWidth = 520,
  cardHeight = 320,
  overlap = 0.48,
  spreadDeg = 48,
  perspectivePx = 1100,
  depthPx = 140,
  tiltXDeg = 12,
  activeLiftPx = 22,
  activeScale = 1.03,
  inactiveScale = 0.94,
  springStiffness = 280,
  springDamping = 28,
  loop = true,
  autoAdvance = false,
  intervalMs = 2800,
  pauseOnHover = true,
  showDots = true,
  className,
  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion()
  const len = items.length

  const [active, setActive] = React.useState(() => wrapIndex(initialIndex, len))
  const [hovering, setHovering] = React.useState(false)

  React.useEffect(() => { setActive((a) => wrapIndex(a, len)) }, [len])

  React.useEffect(() => {
    if (!len) return
    onChangeIndex?.(active, items[active]!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2))
  const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)))
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0

  const canGoPrev = loop || active > 0
  const canGoNext = loop || active < len - 1

  const prev = React.useCallback(() => {
    if (!len || !canGoPrev) return
    setActive((a) => wrapIndex(a - 1, len))
  }, [canGoPrev, len])

  const next = React.useCallback(() => {
    if (!len || !canGoNext) return
    setActive((a) => wrapIndex(a + 1, len))
  }, [canGoNext, len])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  React.useEffect(() => {
    if (!autoAdvance || reduceMotion || !len) return
    if (pauseOnHover && hovering) return
    const id = window.setInterval(() => {
      if (loop || active < len - 1) next()
    }, Math.max(700, intervalMs))
    return () => window.clearInterval(id)
  }, [autoAdvance, intervalMs, hovering, pauseOnHover, reduceMotion, len, loop, active, next])

  if (!len) return null
  const activeItem = items[active]!

  return (
    <div
      className={className}
      style={{ width: '100%' }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        style={{ position: 'relative', width: '100%', height: Math.max(380, cardHeight + 80), outline: 'none' }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div aria-hidden style={{ position: 'absolute', left: '50%', top: 24, transform: 'translateX(-50%)', height: 190, width: '70%', borderRadius: '50%', background: 'var(--glow)', filter: 'blur(70px)', pointerEvents: 'none' }} />
        <div aria-hidden style={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)', height: 150, width: '76%', borderRadius: '50%', background: 'rgba(18,42,86,0.12)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', perspective: `${perspectivePx}px` }}>
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop)
              const abs = Math.abs(off)
              if (abs > maxOffset) return null

              const rotateZ = off * stepDeg
              const x = off * cardSpacing
              const y = abs * 10
              const z = -abs * depthPx
              const isActive = off === 0
              const scale = isActive ? activeScale : inactiveScale
              const lift = isActive ? -activeLiftPx : 0
              const rotateX = isActive ? 0 : tiltXDeg
              const zIndex = 100 - abs

              const dragProps = isActive
                ? {
                    drag: 'x' as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.18,
                    onDragEnd: (_e: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
                      if (reduceMotion) return
                      const travel = info.offset.x
                      const v = info.velocity.x
                      const threshold = Math.min(160, cardWidth * 0.22)
                      if (travel > threshold || v > 650) prev()
                      else if (travel < -threshold || v < -650) next()
                    },
                  }
                : {}

              return (
                <motion.div
                  key={item.id}
                  style={{
                    position: 'absolute', bottom: 0, width: cardWidth, height: cardHeight,
                    borderRadius: 20, border: '4px solid var(--line)', overflow: 'hidden',
                    boxShadow: '0 30px 70px -30px rgba(18,42,86,0.45)', zIndex,
                    transformStyle: 'preserve-3d', userSelect: 'none',
                    cursor: isActive ? 'grab' : 'pointer', background: 'var(--bg-card)',
                  }}
                  initial={reduceMotion ? false : { opacity: 0, y: y + 40, x, rotateZ, rotateX, scale }}
                  animate={{ opacity: 1, x, y: y + lift, rotateZ, rotateX, scale }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: springStiffness, damping: springDamping }}
                  onClick={() => setActive(i)}
                  {...dragProps}
                >
                  <div style={{ height: '100%', width: '100%', transform: `translateZ(${z}px)`, transformStyle: 'preserve-3d' }}>
                    {renderCard ? renderCard(item, { active: isActive }) : <DefaultFanCard item={item} />}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {showDots ? (
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {items.map((it, idx) => {
              const on = idx === active
              return (
                <button
                  key={it.id}
                  onClick={() => setActive(idx)}
                  aria-label={`Go to ${it.title}`}
                  style={{ height: 8, width: on ? 22 : 8, borderRadius: 999, border: 'none', cursor: 'pointer', transition: 'all .25s', background: on ? 'var(--blue)' : 'var(--line)' }}
                />
              )
            })}
          </div>
          {activeItem.href ? (
            <Link
              href={activeItem.href}
              target={activeItem.href.startsWith('http') ? '_blank' : undefined}
              rel={activeItem.href.startsWith('http') ? 'noreferrer' : undefined}
              aria-label="Open link"
              className="text-dim"
              style={{ display: 'inline-flex' }}
            >
              <ArrowIcon />
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function DefaultFanCard({ item }: { item: CardStackItem }) {
  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        {item.imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imageSrc} alt={item.title} draggable={false} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ height: '100%', width: '100%', display: 'grid', placeItems: 'center', background: 'var(--bg-card-2)', color: 'var(--text-dim)', fontSize: 14 }}>No image</div>
        )}
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{item.title}</div>
        {item.description ? <div style={{ marginTop: 4, fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{item.description}</div> : null}
      </div>
    </div>
  )
}
