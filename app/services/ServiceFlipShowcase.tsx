'use client'
import type React from 'react'
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
}

const ICONS: Record<string, string> = {
  'security-seo': '🔍',
  'aio': '🤖',
  'aeo': '🎯',
  'geo': '🌐',
  'google-ads': '📢',
  'bing-ads': '🔷',
  'web-design': '🎨',
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
}

const statChip: Record<string, string> = {
  'security-seo': '+180% organic traffic',
  aio: '87% AI citation rate',
  aeo: '3.4× featured answers',
  geo: 'Verified entity in 90 days',
  'google-ads': '3.2× average ROAS',
  'bing-ads': '41% lower CPC',
  'web-design': '2.1× conversion lift',
}

// ─────────────────────────────────────────────────────────────────────────────
// Individual flip card
// ─────────────────────────────────────────────────────────────────────────────
function FlipCard({
  s,
  flipped,
}: {
  key?: React.Key
  s: (typeof services)[0]
  flipped: boolean
}) {
  const color = ACCENT[s.slug] ?? '#1e5fe0'

  return (
    <>
      {/* Card wrapper — sets the perspective and fixed height */}
      <div
        style={{
          perspective: '1000px',
          perspectiveOrigin: 'center',
          height: 320,
          borderRadius: 20,
        }}
      >
        {/*
          Flipper — rotates in 3D.
          transform-style: preserve-3d lets both faces live in the same 3D space.
          When rotateY(0)   → front face toward viewer, back face away (hidden).
          When rotateY(180) → back face toward viewer,  front face away (hidden).
        */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)',
            borderRadius: 20,
          }}
        >
          {/* ── FRONT FACE ─────────────────────────────────────────────── */}
          {/*
            backface-visibility: hidden hides this face when it's rotated away.
            No additional transform needed — the front starts at rotateY(0).
          */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 20,
              overflow: 'hidden',
              background: '#ffffff',
              border: '1px solid rgba(30,95,224,0.10)',
              boxShadow: '0 8px 28px -8px rgba(18,42,86,0.14)',
              display: 'flex',
              flexDirection: 'column',
              /* The critical pair: */
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            } as React.CSSProperties}
          >
            {/* Service visual */}
            <div style={{ height: '62%', overflow: 'hidden', flexShrink: 0, pointerEvents: 'none' }}>
              <ServiceFace
                slug={s.slug}
                title={s.title}
                description={s.desc}
                href={`/services/${s.slug}/`}
              />
            </div>
            {/* Text strip */}
            <div style={{ padding: '12px 16px', flex: 1, background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: '#0f2244', marginBottom: 3 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: '#6b7a99', lineHeight: 1.45 }}>{s.desc}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10.5, color: color, fontWeight: 600, marginTop: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, animation: 'svc-pulse 1.6s ease-in-out infinite' }} />
                Flip to discover →
              </div>
            </div>
          </div>

          {/* ── BACK FACE ──────────────────────────────────────────────── */}
          {/*
            The back face is pre-rotated to rotateY(180deg) so it starts
            facing AWAY from the viewer. When the flipper reaches rotateY(180deg),
            the back face's total rotation is 180+180=360 = 0 → fully readable,
            no mirror effect.
          */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 20,
              overflow: 'hidden',
              background: 'linear-gradient(145deg, #ffffff 0%, #f6f9ff 100%)',
              border: `1.5px solid ${color}30`,
              boxShadow: `0 12px 36px -10px ${color}30, 0 2px 8px rgba(18,42,86,0.08)`,
              display: 'flex',
              flexDirection: 'column',
              padding: '18px 16px 16px',
              /* Pre-rotate the back face + hide when facing away: */
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            } as React.CSSProperties}
          >
            {/* Top accent line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

            {/* Icon + name + stat */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: `${color}12`, border: `1px solid ${color}28`, display: 'grid', placeItems: 'center', fontSize: 18, flexShrink: 0 }}>
                {ICONS[s.slug]}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f2244', lineHeight: 1.2 }}>{s.title}</div>
                <div style={{ fontSize: 10, color: color, fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', marginTop: 2 }}>{statChip[s.slug]}</div>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: 11.5, color: '#46546e', lineHeight: 1.55, marginBottom: 10, margin: '0 0 10px' }}>{s.desc}</p>

            {/* Benefits */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
              {(benefits[s.slug] ?? []).map((b, bi) => (
                <div key={bi} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 12, color: '#46546e' }}>
                  <span style={{ color: color, flexShrink: 0, fontWeight: 700, lineHeight: 1.5 }}>✓</span>
                  <span style={{ lineHeight: 1.45 }}>{b}</span>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <a
              href={`/services/${s.slug}/`}
              style={{
                marginTop: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                background: color,
                color: '#fff',
                fontWeight: 700,
                fontSize: 12,
                padding: '7px 14px',
                borderRadius: 9,
                textDecoration: 'none',
                boxShadow: `0 3px 12px -3px ${color}55`,
                alignSelf: 'flex-start',
                transition: 'opacity 0.2s',
              }}
            >
              Explore →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────
export default function ServiceFlipShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [flipped, setFlipped] = useState(false)

  /* Flip all cards when ≥30% of the section is in the viewport */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFlipped(true)
        else setFlipped(false)          // flip back when scrolled away
      },
      { threshold: 0.25 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={sectionRef} style={{ position: 'relative' }}>
      {/* Flip hint badge — visible before flip */}
      <motion.div
        animate={{ opacity: flipped ? 0 : 1, y: flipped ? -6 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          textAlign: 'center',
          marginBottom: 18,
          pointerEvents: 'none',
        }}
      >
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 11, color: 'rgba(30,95,224,0.55)',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          <motion.span animate={{ rotate: [0, 180, 360] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}>⟳</motion.span>
          Scroll to flip all cards
        </span>
      </motion.div>

      {/* Cards grid — same layout, cards flip simultaneously */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 22,
        }}
      >
        {services.map((s) => (
          <FlipCard key={s.slug} s={s} flipped={flipped} />
        ))}
      </div>

      {/* Pulse keyframe */}
      <style>{`
        @keyframes svc-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </div>
  )
}
