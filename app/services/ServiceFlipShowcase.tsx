'use client'
import type React from 'react'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
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

// ---------------------------------------------------------------------------
// ProgressPill
// ---------------------------------------------------------------------------
function ProgressPill({
  index,
  floatIdx,
  color,
  label,
}: {
  index: number
  floatIdx: MotionValue<number>
  color: string
  label: string
}) {
  const [active, setActive] = useState(false)
  useEffect(() => {
    return floatIdx.on('change', (v) => setActive(v >= index + 0.5))
  }, [floatIdx, index])
  const short = label.split(' ')[0]
  return (
    <div
      style={{
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 9.5,
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        letterSpacing: '0.06em',
        transition: 'all 0.4s ease',
        background: active ? color : 'rgba(30,95,224,0.06)',
        color: active ? '#fff' : 'rgba(30,95,224,0.4)',
        border: `1px solid ${active ? color : 'rgba(30,95,224,0.12)'}`,
        whiteSpace: 'nowrap',
      }}
    >
      {short}
    </div>
  )
}

// ---------------------------------------------------------------------------
// FlipCard
// ---------------------------------------------------------------------------
function FlipCard({
  s,
  index,
  floatIdx,
}: {
  s: (typeof services)[0]
  index: number
  floatIdx: MotionValue<number>
}) {
  const [flipped, setFlipped] = useState(false)
  const color = ACCENT[s.slug] ?? '#1e5fe0'

  useEffect(() => {
    return floatIdx.on('change', (v) => setFlipped(v >= index + 0.5))
  }, [floatIdx, index])

  return (
    <div style={{ perspective: 1200, height: '100%', minHeight: 280 }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          filter: 'drop-shadow(0 8px 24px rgba(18,42,86,0.12))',
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: 20,
            overflow: 'hidden',
            background: '#ffffff',
            border: '1px solid rgba(30,95,224,0.10)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Top: ServiceFace visual */}
          <div style={{ height: '60%', overflow: 'hidden', flexShrink: 0 }}>
            <ServiceFace
              slug={s.slug}
              title={s.title}
              description={s.desc}
              href={`/services/${s.slug}/`}
            />
          </div>
          {/* Bottom: text strip */}
          <div style={{ padding: '14px 18px', flex: 1, background: '#fff' }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: '#0f2244',
                marginBottom: 4,
              }}
            >
              {s.title}
            </div>
            <div
              style={{
                fontSize: 12.5,
                color: '#6b7a99',
                lineHeight: 1.5,
                marginBottom: 8,
              }}
            >
              {s.desc}
            </div>
            <div
              style={{
                fontSize: 11,
                color: ACCENT[s.slug],
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: ACCENT[s.slug],
                  animation: 'pulse 1.5s ease-in-out infinite',
                  flexShrink: 0,
                }}
              />
              Scroll to reveal →
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
            borderRadius: 20,
            overflow: 'hidden',
            border: `2px solid ${color}25`,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 18px',
          }}
        >
          {/* Top accent line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            }}
          />

          {/* Icon + service name */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: `${color}15`,
                border: `1px solid ${color}30`,
                display: 'grid',
                placeItems: 'center',
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              {ICONS[s.slug]}
            </div>
            <div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#0f2244',
                }}
              >
                {s.title}
              </div>
              <div
                style={{
                  fontSize: 10.5,
                  color: color,
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.06em',
                }}
              >
                {statChip[s.slug]}
              </div>
            </div>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: 12.5,
              color: '#46546e',
              lineHeight: 1.6,
              marginBottom: 12,
            }}
          >
            {s.desc}
          </p>

          {/* Benefits */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              flex: 1,
            }}
          >
            {(benefits[s.slug] ?? []).map((b, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 7,
                  fontSize: 12.5,
                  color: '#46546e',
                }}
              >
                <span
                  style={{
                    color: color,
                    flexShrink: 0,
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  ✓
                </span>
                <span>{b}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={`/services/${s.slug}/`}
            style={{
              marginTop: 14,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: color,
              color: '#fff',
              fontWeight: 700,
              fontSize: 12.5,
              padding: '8px 16px',
              borderRadius: 10,
              textDecoration: 'none',
              boxShadow: `0 4px 14px -4px ${color}66`,
              alignSelf: 'flex-start',
            }}
          >
            Explore {s.title} →
          </a>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// ServiceFlipShowcase (main export)
// ---------------------------------------------------------------------------
export default function ServiceFlipShowcase() {
  const outerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  const floatIdx = useTransform(scrollYProgress, [0, 1], [0, 7])

  return (
    <div
      ref={outerRef}
      style={{
        height: '1100vh',
        position: 'relative',
      }}
    >
      {/* Sticky container */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background:
            'linear-gradient(160deg, #f8faff 0%, #eef2ff 50%, #f4f8fc 100%)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Grid lines overlay */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(30,95,224,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(30,95,224,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            paddingTop: 36,
            paddingBottom: 20,
            position: 'relative',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontSize: 10.5,
              color: 'rgba(30,95,224,0.6)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            What we do
          </span>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#0f2244',
              marginTop: 6,
            }}
          >
            Scroll to discover every service →
          </div>
          {/* Progress pills */}
          <div
            style={{
              display: 'flex',
              gap: 6,
              justifyContent: 'center',
              marginTop: 12,
              flexWrap: 'wrap',
              padding: '0 16px',
            }}
          >
            {services.map((s, i) => (
              <ProgressPill
                key={s.slug}
                index={i}
                floatIdx={floatIdx}
                color={ACCENT[s.slug] ?? '#1e5fe0'}
                label={s.title}
              />
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            padding: '0 40px',
            flex: 1,
            maxHeight: 'calc(100vh - 180px)',
            position: 'relative',
            zIndex: 2,
            alignContent: 'start',
          }}
        >
          {services.map((s, i) => (
            <FlipCard key={s.slug} s={s} index={i} floatIdx={floatIdx} />
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            bottom: 18,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 10.5,
            color: 'rgba(30,95,224,0.5)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.1em',
            zIndex: 3,
          }}
        >
          SCROLL TO FLIP CARDS ↓
        </motion.div>
      </div>
    </div>
  )
}
