'use client'
import type React from 'react'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'
import { services } from '@/lib/site'
import { ServiceFace } from '../service-card-faces'

const ACCENT: Record<string, string> = {
  'security-seo': '#1e9e75',
  'aio': '#6f4dff',
  'aeo': '#7f77dd',
  'geo': '#e23744',
  'google-ads': '#f6c715',
  'bing-ads': '#0078d4',
  'web-design': '#1e5fe0',
  'gmb-profile': '#34a853',
}

const ICONS: Record<string, string> = {
  'security-seo': '🔍',
  'aio': '🤖',
  'aeo': '🎯',
  'geo': '🌐',
  'google-ads': '📢',
  'bing-ads': '🔷',
  'web-design': '🎨',
  'gmb-profile': '📍',
}

const benefits: Record<string, string[]> = {
  'security-seo': [
    'Rank for high-intent buyer keywords',
    'Technical + on-page + content built for security',
    'Local & national domination',
  ],
  aio: [
    'Engineered to be cited by ChatGPT & Perplexity',
    'Entity & schema foundations',
    'Citable, authoritative content assets',
  ],
  aeo: [
    'Win featured answers & snippets',
    'Structured FAQ & Q&A optimisation',
    'Answer-first content architecture',
  ],
  geo: [
    'Build a verified knowledge-graph entity',
    'Cross-platform authority signals',
    'Wikidata & directory presence',
  ],
  'google-ads': [
    'Security-buyer keyword targeting',
    'Conversion-optimised landing pages',
    'Transparent ROAS reporting',
  ],
  'bing-ads': [
    'Reach 41% of B2B Microsoft searchers',
    'Lower CPCs, higher-intent clicks',
    'Cross-network retargeting',
  ],
  'web-design': [
    'AI-ready, schema-rich builds',
    'Fast, Core Web Vitals optimised',
    'Conversion-focused UX',
  ],
  'gmb-profile': [
    'Rank #1 in Google Maps local pack',
    'Full GBP setup & verification',
    'Review strategy & monthly management',
  ],
}

const statChip: Record<string, string> = {
  'security-seo': '+180% organic traffic',
  aio: '87% AI citation rate',
  aeo: '3.4× featured answers',
  geo: 'Verified entity in 90 days',
  'google-ads': '3.2× average ROAS',
  'bing-ads': '41% lower CPC',
  'web-design': '2.1× conversion lift',
  'gmb-profile': '#1 Map Pack in 90 days',
}

// ─────────────────────────────────────────────────────────────────────────────
// Single flip card — rotation driven by a shared MotionValue from scroll
// ─────────────────────────────────────────────────────────────────────────────
function FlipCard({
  s,
  rotateY,
}: {
  key?: React.Key
  s: (typeof services)[0]
  rotateY: MotionValue<number>
}) {
  const color = ACCENT[s.slug] ?? '#1e5fe0'

  return (
    <div style={{ perspective: '1000px', height: 320 }}>
      {/*
        The flipper: rotateY is driven directly by scroll progress.
        transformStyle preserve-3d keeps both faces in the same 3D space.
        backfaceVisibility hidden on each face means the browser automatically
        shows the correct face at each rotation angle — no JS toggle needed.
      */}
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          rotateY,
        }}
      >
        {/* ── FRONT ──────────────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 18,
            overflow: 'hidden',
            background: '#ffffff',
            border: '1px solid rgba(30,95,224,0.10)',
            boxShadow: '0 8px 28px -8px rgba(18,42,86,0.14)',
            display: 'flex',
            flexDirection: 'column',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          } as React.CSSProperties}
        >
          <div style={{ height: '62%', overflow: 'hidden', flexShrink: 0, pointerEvents: 'none' }}>
            <ServiceFace slug={s.slug} title={s.title} description={s.desc} href={`/services/${s.slug}/`} />
          </div>
          <div style={{ padding: '12px 16px', flex: 1, background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: '#0f2244', marginBottom: 3 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: '#6b7a99', lineHeight: 1.45 }}>{s.desc}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10.5, color, fontWeight: 600, marginTop: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, animation: 'svc-pulse 1.6s ease-in-out infinite' }} />
              Scroll to flip →
            </div>
          </div>
        </div>

        {/* ── BACK ───────────────────────────────────────────────────── */}
        {/*
          Pre-rotated 180°: faces away from viewer at the start.
          When flipper reaches 180°, this face is at 180+180=360°=0° → fully readable.
          backfaceVisibility hidden ensures it's invisible until the card is past 90°.
        */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 18,
            overflow: 'hidden',
            background: 'linear-gradient(145deg, #ffffff 0%, #f6f9ff 100%)',
            border: `1.5px solid ${color}30`,
            boxShadow: `0 12px 36px -10px ${color}30, 0 2px 8px rgba(18,42,86,0.08)`,
            display: 'flex',
            flexDirection: 'column',
            padding: '18px 16px 16px',
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          } as React.CSSProperties}
        >
          {/* Accent top line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

          {/* Icon + title + stat */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: `${color}12`, border: `1px solid ${color}28`, display: 'grid', placeItems: 'center', fontSize: 18, flexShrink: 0 }}>
              {ICONS[s.slug]}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f2244', lineHeight: 1.2 }}>{s.title}</div>
              <div style={{ fontSize: 10, color, fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', marginTop: 2 }}>{statChip[s.slug]}</div>
            </div>
          </div>

          <p style={{ fontSize: 11.5, color: '#46546e', lineHeight: 1.55, margin: '0 0 10px' }}>{s.desc}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
            {(benefits[s.slug] ?? []).map((b, bi) => (
              <div key={bi} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 12, color: '#46546e' }}>
                <span style={{ color, flexShrink: 0, fontWeight: 700, lineHeight: 1.5 }}>✓</span>
                <span style={{ lineHeight: 1.45 }}>{b}</span>
              </div>
            ))}
          </div>

          <a
            href={`/services/${s.slug}/`}
            style={{
              marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 5,
              background: color, color: '#fff', fontWeight: 700, fontSize: 12,
              padding: '7px 14px', borderRadius: 9, textDecoration: 'none',
              boxShadow: `0 3px 12px -3px ${color}55`, alignSelf: 'flex-start',
            }}
          >
            Explore →
          </a>
        </div>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Scroll progress indicator bar at the bottom
// ─────────────────────────────────────────────────────────────────────────────
function ScrollBar({ progress }: { progress: MotionValue<number> }) {
  const width = useTransform(progress, [0, 1], ['0%', '100%'])
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(30,95,224,0.08)', zIndex: 4 }}>
      <motion.div style={{ height: '100%', background: 'linear-gradient(90deg, #1e9e75, #6f4dff, #1e5fe0)', width }} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────
export default function ServiceFlipShowcase() {
  const outerRef = useRef<HTMLDivElement>(null)

  /*
    Track scroll within this element.
    offset 'start start' = when top of element hits top of viewport (pin begins).
    offset 'end end'     = when bottom of element hits bottom of viewport (pin ends).
    This gives us scrollYProgress 0→1 over exactly the scroll distance equal to
    the outer div's extra height beyond 100vh (i.e., 150vh worth of scrolling).
  */
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  /*
    Map 0→1 scroll progress to 0→180 degrees rotation.
    We start rotating only after the first 10% of scroll (gives a moment to "land"),
    and finish at 90% (leaves a moment at the end before unpinning).
  */
  const rawRotation = useTransform(scrollYProgress, [0.08, 0.92], [0, 180])

  /*
    Light spring for cinematic smoothness — stiffness/damping tuned so it
    follows the finger closely without feeling laggy.
  */
  const rotateY = useSpring(rawRotation, { stiffness: 80, damping: 22, mass: 0.6 })

  return (
    <>
      {/* keyframe for the pulsing dot on front face */}
      <style>{`@keyframes svc-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.8)}}`}</style>

      {/*
        Outer div is taller than 100vh — this extra height is the "scroll budget"
        for the sticky pin. 250vh = 100vh sticky frame + 150vh of scroll travel.
      */}
      <div ref={outerRef} style={{ height: '250vh', position: 'relative' }}>

        {/* Sticky frame — stays at top:0 while user scrolls through the outer div */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '32px 0 40px',
            background: 'transparent',
          }}
        >

          {/* Scroll hint — fades out as user starts rotating */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 0.12], [1, 0]) }}
            aria-hidden
          >
            <div style={{ textAlign: 'center', marginBottom: 16, position: 'relative', zIndex: 2 }}>
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, color: 'rgba(30,95,224,0.5)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                ↓ Scroll to flip the cards
              </motion.span>
            </div>
          </motion.div>

          {/* "Revealed" label — fades in once cards have flipped past 90° */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0.45, 0.6], [0, 1]), position: 'absolute', top: 18, left: 0, right: 0, textAlign: 'center', zIndex: 3 }}
            aria-hidden
          >
            <span style={{ fontSize: 10.5, color: 'rgba(30,95,224,0.55)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              ✦ Services revealed — explore each one
            </span>
          </motion.div>

          {/* Cards grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 22,
              padding: '0 32px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {services.map((s) => (
              <FlipCard key={s.slug} s={s} rotateY={rotateY} />
            ))}
          </div>

          {/* Scroll progress bar at bottom of pinned frame */}
          <ScrollBar progress={scrollYProgress} />
        </div>
      </div>
    </>
  )
}
