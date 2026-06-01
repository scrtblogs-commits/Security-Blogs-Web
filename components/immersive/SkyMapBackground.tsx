'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MAPBOX_TOKEN } from '@/lib/env'

// Page-wide scroll-driven background. Sits fixed behind all content.
// Two layers cross-fade as the visitor scrolls the document:
//   - SKY (gradient + drifting SVG clouds) visible 0 -> ~55% of page scroll
//   - SATELLITE far view (Mapbox Static image of the AU region) fades in
//     from ~40% and holds until the bottom of the page
// We intentionally do NOT descend to street level here — the close-up only
// appears inside <LocalVisibilityCheck> above the footer.
export default function SkyMapBackground() {
  const { scrollYProgress } = useScroll()

  // Layer opacities
  const skyOpacity = useTransform(scrollYProgress, [0, 0.30, 0.55], [1, 0.95, 0])
  const satOpacity = useTransform(scrollYProgress, [0.35, 0.70], [0, 1])

  // Subtle "descent" feel: satellite layer starts slightly scaled-up and
  // settles to 1.0 as the visitor scrolls down.
  const satScale = useTransform(scrollYProgress, [0.35, 1], [1.35, 1])
  const satY = useTransform(scrollYProgress, [0.35, 1], [-60, 0])

  // Sun glow softly drifts left as we descend (parallax cue)
  const sunX = useTransform(scrollYProgress, [0, 1], [0, -120])
  const sunOpacity = useTransform(scrollYProgress, [0, 0.45], [0.55, 0])

  // Cloud parallax — left clouds slide further left, right clouds further right
  const leftCloudX = useTransform(scrollYProgress, [0, 0.55], [0, -300])
  const rightCloudX = useTransform(scrollYProgress, [0, 0.55], [0, 300])

  // Mapbox Static satellite image of the AU region at country zoom.
  // We could swap to the IP-detected country later — for now, AU is the
  // primary market so it's the right hero geography.
  const satUrl = MAPBOX_TOKEN
    ? `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/134,-25,3,0,0/1280x720@2x?access_token=${MAPBOX_TOKEN}`
    : ''

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* SKY LAYER */}
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          opacity: skyOpacity,
          background:
            'linear-gradient(180deg, #c9e4ff 0%, #e7f3ff 35%, #ffffff 70%, #f0f7ff 100%)',
        }}
      >
        {/* Sun glow */}
        <motion.div
          style={{
            position: 'absolute', top: '6%', left: '50%',
            translateX: '-50%',
            x: sunX,
            opacity: sunOpacity,
            width: 460, height: 460, borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,247,200,0.55) 0%, rgba(255,236,160,0.18) 40%, transparent 70%)',
            filter: 'blur(10px)',
          }}
        />

        {/* Left cloud group */}
        <motion.div
          style={{
            position: 'absolute', top: '12%', left: '-4%',
            display: 'flex', gap: 36,
            x: leftCloudX,
          }}
        >
          <Cloud w={240} blur={3} />
          <Cloud w={170} blur={2} />
        </motion.div>

        {/* Right cloud group */}
        <motion.div
          style={{
            position: 'absolute', top: '36%', right: '-4%',
            display: 'flex', gap: 36,
            x: rightCloudX,
          }}
        >
          <Cloud w={180} blur={2} />
          <Cloud w={260} blur={3.5} />
        </motion.div>

        {/* Centre wisp */}
        <div style={{ position: 'absolute', top: '60%', left: '30%' }}>
          <Cloud w={320} blur={5} />
        </div>
      </motion.div>

      {/* SATELLITE LAYER (far view, country-level — no street view) */}
      {satUrl ? (
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            opacity: satOpacity,
            y: satY,
            scale: satScale,
            backgroundImage: `url(${satUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // Slight dark overlay so foreground text stays readable
            boxShadow: 'inset 0 0 0 100vmax rgba(10, 20, 40, 0.28)',
          }}
        />
      ) : null}
    </div>
  )
}

function Cloud({ w, blur = 2 }: { w: number; blur?: number }) {
  return (
    <svg viewBox="0 0 200 80" width={w} style={{ filter: `blur(${blur}px)`, opacity: 0.95 }}>
      <defs>
        <linearGradient id={`cg-${w}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#e3edff" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <path
        d="M30 60 Q15 60 15 45 Q15 30 33 30 Q33 14 55 14 Q72 14 76 30 Q92 18 110 28 Q130 14 148 32 Q174 30 178 50 Q188 56 178 66 Q172 70 30 60 Z"
        fill={`url(#cg-${w})`}
      />
    </svg>
  )
}
