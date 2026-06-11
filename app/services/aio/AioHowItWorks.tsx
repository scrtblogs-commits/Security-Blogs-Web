'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, type MotionValue } from 'framer-motion'
import type { WorkflowStep } from '@/components/ui/ServiceWorkflowCards'

const STEPS: WorkflowStep[] = [
  { step: '01', tag: 'DISCOVERY',  title: 'AI Visibility Audit',     color: '#7c3aed', glow: 'rgba(124,58,237,0.45)',  Scene: AuditScene   },
  { step: '02', tag: 'BUILD',      title: 'Schema & Structure',      color: '#2563eb', glow: 'rgba(37,99,235,0.45)',   Scene: SchemaScene  },
  { step: '03', tag: 'CREATE',     title: 'Citable Content Build',   color: '#0891b2', glow: 'rgba(8,145,178,0.45)',   Scene: ContentScene },
  { step: '04', tag: 'OPTIMISE',   title: 'Monitor & Optimise',      color: '#059669', glow: 'rgba(5,150,105,0.45)',   Scene: MonitorScene },
]

const CARD_W = 1060
const CARD_H = 520
const GAP    = 48
const TOTAL  = STEPS.length

// ── Floating icon cards (matching the cyan panels in the robot image) ─────────
const FLOAT_ICONS = [
  { icon: '👤', label: 'Profile',   x: '14%', y: '20%', flyX: -600, flyY: -500, floatAmp: 14, dur: 3.2, delay: 0,   size: 52 },
  { icon: '⭐', label: 'Rating',    x:  '8%', y: '50%', flyX: -700, flyY:  -80, floatAmp: 10, dur: 2.8, delay: 0.4, size: 48 },
  { icon: '🔒', label: 'Security',  x: '18%', y: '74%', flyX: -450, flyY:  600, floatAmp: 16, dur: 3.6, delay: 0.8, size: 44 },
  { icon: '📊', label: 'Analytics', x: '38%', y: '16%', flyX:  -80, flyY: -700, floatAmp: 12, dur: 3.0, delay: 0.2, size: 50 },
  { icon: '🛡️', label: 'Shield',    x: '52%', y: '28%', flyX:  600, flyY: -400, floatAmp: 18, dur: 2.6, delay: 0.6, size: 56 },
  { icon: '⚡', label: 'Speed',     x: '44%', y: '68%', flyX:  200, flyY:  700, floatAmp: 10, dur: 3.4, delay: 1.0, size: 46 },
]

export default function AioHowItWorks() {
  const outerRef = useRef<HTMLDivElement>(null)
  const [vw, setVw]         = useState(1280)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const up = () => setVw(window.innerWidth)
    up()
    window.addEventListener('resize', up)
    return () => window.removeEventListener('resize', up)
  }, [])

  const totalPhases = 1 + TOTAL
  const introEnd    = 1 / totalPhases  // 0.2

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] })

  // ── Robot image: zoom + 3D tilt ─────────────────────────────────────────────
  const imgScale  = useTransform(scrollYProgress, [0, introEnd], [1, 16])
  const rotateX   = useTransform(scrollYProgress, [0, introEnd * 0.35, introEnd * 0.7, introEnd], [0, -10, 6, 0])
  const rotateY   = useTransform(scrollYProgress, [0, introEnd * 0.4, introEnd], [0, 5, -3])
  const imgOp     = useTransform(scrollYProgress, [introEnd * 0.7, introEnd], [1, 0])

  // ── Overlays ─────────────────────────────────────────────────────────────────
  const darkOverlayOp = useTransform(scrollYProgress, [introEnd * 0.45, introEnd], [0, 1])
  const vignetteOp    = useTransform(scrollYProgress, [0, introEnd * 0.2], [0, 0.85])
  const flashOp       = useTransform(scrollYProgress, [introEnd * 0.82, introEnd * 0.94, introEnd], [0, 1, 0])
  const glowOp        = useTransform(scrollYProgress, [introEnd * 0.1, introEnd * 0.6], [0, 1])
  const scrollHintOp  = useTransform(scrollYProgress, [0, introEnd * 0.25], [1, 0])

  // ── Warp lines ───────────────────────────────────────────────────────────────
  const warpOp    = useTransform(scrollYProgress, [introEnd * 0.2, introEnd * 0.65, introEnd * 0.88], [0, 0.7, 0])
  const warpScale = useTransform(scrollYProgress, [introEnd * 0.2, introEnd], [0.3, 3])

  // ── Cards ────────────────────────────────────────────────────────────────────
  const rawCardP = useTransform(scrollYProgress, [introEnd, 1], [0, TOTAL - 1])
  const cardP    = useSpring(rawCardP, { stiffness: 80, damping: 24 })
  const startX   = vw / 2 - CARD_W / 2
  const endX     = startX - (TOTAL - 1) * (CARD_W + GAP)
  const cardX    = useTransform(cardP, [0, TOTAL - 1], [startX, endX])
  const cardsOp  = useTransform(scrollYProgress, [introEnd * 0.88, Math.min(introEnd * 1.08, 0.99)], [0, 1])

  useMotionValueEvent(cardP, 'change', v =>
    setActiveIdx(Math.round(Math.max(0, Math.min(TOTAL - 1, v))))
  )

  return (
    <div ref={outerRef} style={{ height: `${totalPhases * 100}vh`, position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#040b18' }}>

        {/* ── INTRO: Robot → zoom into laptop ───────────────────────────────── */}
        <motion.div style={{ position: 'absolute', inset: 0, opacity: imgOp }}>

          {/* Perspective wrapper for 3D tilt */}
          <div style={{ width: '100%', height: '100%', perspective: 1400, perspectiveOrigin: '35% 44%' }}>
            <motion.div
              style={{
                width: '100%', height: '100%',
                scale: imgScale,
                rotateX, rotateY,
                transformOrigin: '35% 44%',
                willChange: 'transform',
                position: 'relative',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/robot-aio.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />

              {/* Laptop screen cyan glow — pulses then brightens on zoom */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: '18%', top: '22%', width: '34%', height: '46%',
                  background: 'radial-gradient(ellipse, rgba(0,220,255,0.22) 0%, rgba(0,180,255,0.08) 50%, transparent 75%)',
                  opacity: glowOp,
                  borderRadius: '8%',
                  filter: 'blur(8px)',
                }}
                animate={{ opacity: [null, 0.6, 0.9, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>

          {/* ── Floating icon cards (fly toward viewer on scroll) ─────────── */}
          {FLOAT_ICONS.map((cfg, i) => (
            <FloatingIcon key={i} scrollYProgress={scrollYProgress} introEnd={introEnd} cfg={cfg} />
          ))}
        </motion.div>

        {/* ── Vignette (darkens edges as zoom starts) ───────────────────────── */}
        <motion.div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 35% 44%, transparent 20%, rgba(2,8,20,0.92) 80%)',
          opacity: vignetteOp,
        }} />

        {/* ── Warp speed lines from laptop screen ──────────────────────────── */}
        <motion.div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          opacity: warpOp, scale: warpScale,
          transformOrigin: '35% 44%',
        }}>
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i / 24) * 360
              const rad   = (angle * Math.PI) / 180
              const cx    = 35, cy = 44
              const len   = 120
              return (
                <line key={i}
                  x1={`${cx}%`} y1={`${cy}%`}
                  x2={`${cx + Math.cos(rad) * len}%`}
                  y2={`${cy + Math.sin(rad) * len}%`}
                  stroke="rgba(0,200,255,0.35)" strokeWidth="1.2"
                  strokeLinecap="round"
                />
              )
            })}
          </svg>
        </motion.div>

        {/* ── Chromatic flash on entry ──────────────────────────────────────── */}
        <motion.div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 35% 44%, rgba(0,220,255,0.9) 0%, rgba(255,255,255,0.6) 30%, transparent 70%)',
          opacity: flashOp,
        }} />

        {/* ── Dark overlay (transitions to laptop world) ────────────────────── */}
        <motion.div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 35% 44%, #0a1535 0%, #020810 100%)',
          opacity: darkOverlayOp,
        }} />

        {/* ── Scroll hint ───────────────────────────────────────────────────── */}
        <motion.div style={{
          position: 'absolute', bottom: 36, left: '50%', translateX: '-50%',
          opacity: scrollHintOp, pointerEvents: 'none',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(0,220,255,0.75)', letterSpacing: '0.2em', textShadow: '0 0 20px rgba(0,220,255,0.5)' }}>
            SCROLL TO ENTER
          </div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 24, height: 40, borderRadius: 12, border: '2px solid rgba(0,220,255,0.4)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 6 }}
          >
            <motion.div
              animate={{ y: [0, 14, 0], opacity: [1, 0.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 4, height: 8, borderRadius: 2, background: 'rgba(0,220,255,0.7)' }}
            />
          </motion.div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════════
            CARDS WORLD — inside the laptop
        ══════════════════════════════════════════════════════════════════════ */}
        <motion.div style={{ position: 'absolute', inset: 0, opacity: cardsOp, overflow: 'hidden' }}>

          {/* Tech grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,180,255,0.045) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,180,255,0.045) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />

          {/* Central ambient glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: 1000, height: 700,
            background: 'radial-gradient(ellipse, rgba(0,120,255,0.10) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Step dots + active tag */}
          <div style={{ position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 10, zIndex: 10 }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(0,200,255,0.5)', letterSpacing: '0.18em' }}>AIO WORKFLOW</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {STEPS.map((s, i) => (
                <div key={s.step} style={{
                  width: i === activeIdx ? 28 : 8, height: 8, borderRadius: 4,
                  background: i === activeIdx ? s.color : 'rgba(255,255,255,0.15)',
                  transition: 'width 0.35s ease, background 0.35s ease',
                }} />
              ))}
            </div>
          </div>
          <div style={{
            position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)',
            fontSize: 11, fontFamily: 'var(--font-mono)',
            color: STEPS[activeIdx]?.color ?? '#0af',
            letterSpacing: '0.14em', transition: 'color 0.35s ease', zIndex: 10,
          }}>
            STEP {STEPS[activeIdx]?.step} · {STEPS[activeIdx]?.tag}
          </div>

          {/* Horizontal card strip */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
            <motion.div style={{ display: 'flex', gap: GAP, x: cardX, willChange: 'transform' }}>
              {STEPS.map((step, i) => (
                <LaptopCard key={step.step} step={step} index={i} activeIdx={activeIdx} cardW={CARD_W} cardH={CARD_H} />
              ))}
            </motion.div>
          </div>

          {/* Scanline */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)',
          }} />
        </motion.div>

      </div>
    </div>
  )
}

// ─── FloatingIcon: each icon flies toward the viewer as you scroll ────────────
function FloatingIcon({
  scrollYProgress, introEnd, cfg,
}: {
  scrollYProgress: MotionValue<number>
  introEnd: number
  cfg: typeof FLOAT_ICONS[number]
}) {
  // Fly out toward viewer: starts at 30% of introEnd, gone by 88%
  const flyStart = introEnd * 0.28
  const flyEnd   = introEnd * 0.88

  const flyX  = useTransform(scrollYProgress, [flyStart, flyEnd], [0, cfg.flyX])
  const flyY  = useTransform(scrollYProgress, [flyStart, flyEnd], [0, cfg.flyY])
  const scale = useTransform(scrollYProgress, [flyStart, flyEnd], [1, 2.6])
  const op    = useTransform(scrollYProgress, [flyStart, flyEnd * 0.75, flyEnd], [1, 1, 0])

  return (
    <motion.div style={{
      position: 'absolute', left: cfg.x, top: cfg.y,
      x: flyX, y: flyY, scale, opacity: op,
      zIndex: 5,
    }}>
      {/* idle float animation — separate from scroll-driven transforms */}
      <motion.div
        animate={{
          y: [-cfg.floatAmp / 2, cfg.floatAmp / 2, -cfg.floatAmp / 2],
          rotate: [-3, 3, -3],
        }}
        transition={{ duration: cfg.dur, repeat: Infinity, ease: 'easeInOut', delay: cfg.delay }}
        style={{
          background: 'linear-gradient(135deg, rgba(0,40,80,0.9) 0%, rgba(0,20,50,0.95) 100%)',
          border: '1.5px solid rgba(0,220,255,0.45)',
          borderRadius: 16,
          padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: 9,
          boxShadow: '0 8px 32px rgba(0,180,255,0.25), 0 0 20px rgba(0,220,255,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          minWidth: 110,
          cursor: 'default',
        }}
      >
        {/* Cyan dot indicator */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: cfg.delay }}
          style={{
            position: 'absolute', top: 8, right: 8,
            width: 6, height: 6, borderRadius: '50%',
            background: '#00dcff',
            boxShadow: '0 0 8px rgba(0,220,255,0.8)',
          }}
        />
        {/* Icon bubble */}
        <div style={{
          width: cfg.size, height: cfg.size, borderRadius: 12,
          background: 'linear-gradient(135deg, rgba(0,180,255,0.25) 0%, rgba(0,100,255,0.15) 100%)',
          border: '1px solid rgba(0,220,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: cfg.size * 0.5, flexShrink: 0,
        }}>
          {cfg.icon}
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.9)', whiteSpace: 'nowrap' }}>{cfg.label}</div>
          <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(0,220,255,0.6)', marginTop: 2 }}>ACTIVE</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Card inside the laptop world ─────────────────────────────────────────────
function LaptopCard({ step, index, activeIdx, cardW, cardH }: {
  step: WorkflowStep; index: number; activeIdx: number; cardW: number; cardH: number
}) {
  const dist  = Math.abs(index - activeIdx)
  const scale = dist === 0 ? 1 : dist === 1 ? 0.94 : 0.88
  const blur  = dist === 0 ? 0 : dist === 1 ? 1 : 3

  return (
    <motion.div
      animate={{ scale, filter: `blur(${blur}px)`, opacity: dist > 2 ? 0.3 : 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 28 }}
      style={{
        width: cardW, height: cardH, flexShrink: 0,
        borderRadius: 20, overflow: 'hidden',
        background: '#ffffff',
        border: `2px solid ${dist === 0 ? step.color : 'rgba(255,255,255,0.08)'}`,
        boxShadow: dist === 0
          ? `0 0 60px ${step.glow}, 0 20px 60px rgba(0,0,0,0.5)`
          : '0 8px 40px rgba(0,0,0,0.4)',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
      }}
    >
      <step.Scene active={index === activeIdx} color={step.color} />
    </motion.div>
  )
}

/* ══════════════════════════════════════════════
   SCENE 1 — AI Visibility Audit
══════════════════════════════════════════════ */
const AI_TESTS = [
  { platform: 'ChatGPT',    found: true,  score: 62, c: '#10a37f' },
  { platform: 'Perplexity', found: true,  score: 48, c: '#1FB8CD' },
  { platform: 'Gemini',     found: false, score: 31, c: '#4285f4' },
  { platform: 'Copilot',    found: false, score: 28, c: '#0078d4' },
  { platform: 'Claude',     found: false, score: 19, c: '#d97706' },
]

function AuditScene({ active, color }: { active: boolean; color: string }) {
  const [idx, setIdx] = useState(-1)
  useEffect(() => {
    if (!active) { setIdx(-1); return }
    let i = -1
    const iv = setInterval(() => { i++; setIdx(i); if (i >= AI_TESTS.length) clearInterval(iv) }, 380)
    return () => clearInterval(iv)
  }, [active])

  return (
    <div style={{ padding: '28px 26px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color, letterSpacing: '0.12em', marginBottom: 6 }}>STEP 01</div>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#0f2244', lineHeight: 1.2 }}>AI Visibility<br />Audit</div>
      </div>
      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', marginBottom: 4, letterSpacing: '0.1em' }}>AI PLATFORM SCAN</div>
          {AI_TESTS.map((t, i) => (
            <motion.div key={t.platform}
              initial={{ opacity: 0, x: -14 }} animate={idx >= i ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3 }}
              style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(15,34,68,0.03)', borderRadius: 10, padding: '7px 10px', border: `1px solid ${t.c}18` }}>
              <div style={{ width: 22, height: 22, borderRadius: 7, background: t.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#0f2244', flexShrink: 0 }}>{t.platform[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#0f2244' }}>{t.platform}</div>
                <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)' }}>Visibility score: {t.score}/100</div>
              </div>
              <motion.div initial={{ scale: 0 }} animate={idx > i ? { scale: 1 } : {}} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', color: t.found ? '#1e9e75' : '#ef4444', background: t.found ? 'rgba(30,158,117,0.15)' : 'rgba(239,68,68,0.15)', border: `1px solid ${t.found ? 'rgba(30,158,117,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: 6, padding: '2px 7px' }}>
                {t.found ? 'CITED ✓' : 'GAP ✗'}
              </motion.div>
            </motion.div>
          ))}
        </div>
        <div style={{ width: 168, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'rgba(15,34,68,0.03)', borderRadius: 14, border: `1px solid ${color}25`, padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', marginBottom: 6, letterSpacing: '0.1em' }}>CURRENT SCORE</div>
            <div style={{ position: 'relative', width: 64, height: 64, margin: '0 auto 8px' }}>
              <svg viewBox="0 0 64 64" style={{ width: 64, height: 64, transform: 'rotate(-90deg)' }}>
                <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(15,34,68,0.07)" strokeWidth="6" />
                <motion.circle cx="32" cy="32" r="26" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 26}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                  animate={active ? { strokeDashoffset: 2 * Math.PI * 26 * 0.58 } : {}}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 0.8, 0.2, 1] }} />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: '#0f2244' }}>42</div>
            </div>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#ef4444' }}>BEFORE AIO</div>
          </div>
          <div style={{ background: `${color}12`, borderRadius: 14, border: `1px solid ${color}30`, padding: '12px', flex: 1 }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', marginBottom: 8, letterSpacing: '0.08em' }}>GAPS FOUND</div>
            {['No schema markup', 'Missing entities', 'Low citation rate', 'Thin content'].map((g, i) => (
              <motion.div key={g} initial={{ opacity: 0 }} animate={idx >= 3 ? { opacity: 1 } : {}} transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', gap: 7, alignItems: 'flex-start', marginBottom: 5, fontSize: 10, color: 'rgba(15,34,68,0.65)' }}>
                <span style={{ color: '#ef4444', flexShrink: 0 }}>✗</span>{g}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={idx >= AI_TESTS.length - 1 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}
        style={{ background: `${color}12`, borderRadius: 12, padding: '10px 14px', border: `1px solid ${color}30`, display: 'flex', gap: 10, alignItems: 'center' }}>
        <span style={{ fontSize: 16 }}>🔍</span>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0f2244' }}>Audit complete — 3 platforms not citing you</div>
          <div style={{ fontSize: 9.5, color: 'rgba(15,34,68,0.45)', fontFamily: 'var(--font-mono)' }}>Recommended fix: Schema + Entity signals + Citable content</div>
        </div>
        <div style={{ marginLeft: 'auto', background: color, color: '#0f2244', fontSize: 9.5, fontWeight: 700, fontFamily: 'var(--font-mono)', padding: '4px 10px', borderRadius: 999, flexShrink: 0 }}>START →</div>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   SCENE 2 — Schema & Structure
══════════════════════════════════════════════ */
const SCHEMA_LINES = [
  { t: '<script type="application/ld+json">', c: '#86efac' },
  { t: '{', c: '#fff' },
  { t: '  "@context": "https://schema.org",', c: '#7dd3fc' },
  { t: '  "@type": "LocalBusiness",', c: '#a5b4fc' },
  { t: '  "name": "SecurityBlogs.com.au",', c: '#fde68a' },
  { t: '  "areaServed": ["AU", "US", "UK"],', c: '#fde68a' },
  { t: '  "knowsAbout": ["AI SEO", "CCTV"]', c: '#fde68a' },
  { t: '}', c: '#fff' },
]
const SCHEMA_TYPES = [
  { name: 'LocalBusiness', validated: true,  delay: 0.5 },
  { name: 'FAQPage',       validated: true,  delay: 0.65 },
  { name: 'Service',       validated: true,  delay: 0.8 },
  { name: 'Person',        validated: true,  delay: 0.95 },
  { name: 'Article',       validated: false, delay: 1.1 },
]

function SchemaScene({ active, color }: { active: boolean; color: string }) {
  const [lineIdx, setLineIdx] = useState(-1)
  const [validIn, setValidIn] = useState(false)
  useEffect(() => {
    if (!active) { setLineIdx(-1); setValidIn(false); return }
    let i = -1
    const iv = setInterval(() => { i++; setLineIdx(i); if (i >= SCHEMA_LINES.length) clearInterval(iv) }, 200)
    const vt = setTimeout(() => setValidIn(true), 900)
    return () => { clearInterval(iv); clearTimeout(vt) }
  }, [active])

  return (
    <div style={{ padding: '28px 26px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color, letterSpacing: '0.12em', marginBottom: 6 }}>STEP 02</div>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#0f2244', lineHeight: 1.2 }}>Schema &<br />Structure</div>
      </div>
      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1, borderRadius: 14, overflow: 'hidden', background: '#0d1117', border: '1px solid rgba(15,34,68,0.08)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: 5, padding: '8px 12px', background: 'rgba(15,34,68,0.03)', borderBottom: '1px solid rgba(15,34,68,0.07)' }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
            <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.3)', marginLeft: 4 }}>schema.json</span>
          </div>
          <div style={{ padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {SCHEMA_LINES.map((l, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={lineIdx >= i ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.2 }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: l.c, lineHeight: 1.6 }}>
                {l.t}
                {lineIdx === i && (
                  <motion.span animate={{ opacity: [1,0,1] }} transition={{ duration: 0.7, repeat: 3 }}
                    style={{ display: 'inline-block', width: 2, height: 11, background: '#fff', marginLeft: 2, verticalAlign: 'middle' }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
        <div style={{ width: 178, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'rgba(15,34,68,0.03)', borderRadius: 14, border: `1px solid ${color}25`, padding: '12px', flex: 1 }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', marginBottom: 10, letterSpacing: '0.08em' }}>SCHEMA VALIDATOR</div>
            {SCHEMA_TYPES.map(t => (
              <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <motion.div initial={{ scale: 0 }} animate={validIn ? { scale: 1 } : {}} transition={{ delay: t.delay, type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0, background: t.validated ? '#1e9e75' : '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700 }}>
                  {t.validated ? '✓' : '✗'}
                </motion.div>
                <span style={{ fontSize: 10.5, color: '#0f2244', fontFamily: 'var(--font-mono)' }}>{t.name}</span>
              </div>
            ))}
          </div>
          <div style={{ background: `${color}12`, borderRadius: 14, border: `1px solid ${color}30`, padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', marginBottom: 6 }}>AI READINESS</div>
            <motion.div initial={{ opacity: 0 }} animate={validIn ? { opacity: 1 } : {}} transition={{ delay: 1.2 }}
              style={{ fontSize: 36, fontWeight: 900, color, lineHeight: 1 }}>96</motion.div>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: `${color}bb`, marginTop: 3 }}>/ 100</div>
          </div>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={validIn ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.3, duration: 0.4 }}
        style={{ display: 'flex', gap: 10, background: 'rgba(30,158,117,0.10)', borderRadius: 12, padding: '10px 14px', border: '1px solid rgba(30,158,117,0.25)' }}>
        <span style={{ fontSize: 14 }}>✅</span>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0f2244' }}>Schema deployed — 4 types active</div>
          <div style={{ fontSize: 9.5, color: 'rgba(15,34,68,0.45)', fontFamily: 'var(--font-mono)' }}>AI engines can now parse and trust your entity data</div>
        </div>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   SCENE 3 — Citable Content Build
══════════════════════════════════════════════ */
const AI_QUOTES = [
  { platform: 'ChatGPT',    quote: '"SecurityBlogs.com.au is the leading AI-optimised security brand in Australia."' },
  { platform: 'Perplexity', quote: '"According to SecurityBlogs, AIO increases citation rates by 3.2×."' },
]

function ContentScene({ active, color }: { active: boolean; color: string }) {
  const [artIn, setArtIn]       = useState(false)
  const [quoteIdx, setQuoteIdx] = useState(-1)
  useEffect(() => {
    if (!active) { setArtIn(false); setQuoteIdx(-1); return }
    setTimeout(() => setArtIn(true), 300)
    let q = -1
    const qi = setInterval(() => { q++; setQuoteIdx(q); if (q >= AI_QUOTES.length) clearInterval(qi) }, 600)
    return () => clearInterval(qi)
  }, [active])

  return (
    <div style={{ padding: '28px 26px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color, letterSpacing: '0.12em', marginBottom: 6 }}>STEP 03</div>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#0f2244', lineHeight: 1.2 }}>Citable Content<br />Build</div>
      </div>
      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1, background: 'rgba(15,34,68,0.02)', borderRadius: 14, border: '1px solid rgba(15,34,68,0.06)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: `${color}15`, borderBottom: `1px solid ${color}20`, padding: '7px 12px', fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.5)', letterSpacing: '0.08em' }}>ARTICLE BUILDER · AI-CITABLE</div>
          <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
            <motion.div initial={{ width: 0 }} animate={artIn ? { width: '100%' } : {}} transition={{ duration: 0.5, delay: 0.1 }} style={{ height: 10, background: `${color}88`, borderRadius: 5 }} />
            {[0.9, 1.0, 0.75].map((w, i) => (
              <motion.div key={i} initial={{ width: 0 }} animate={artIn ? { width: `${w * 100}%` } : {}} transition={{ duration: 0.4, delay: 0.25 + i * 0.09 }} style={{ height: 5, background: 'rgba(15,34,68,0.12)', borderRadius: 3 }} />
            ))}
            <motion.div initial={{ width: 0 }} animate={artIn ? { width: '65%' } : {}} transition={{ duration: 0.4, delay: 0.55 }} style={{ height: 8, background: `${color}55`, borderRadius: 4, marginTop: 2 }} />
            {[0.95, 0.82, 0.7, 0.88].map((w, i) => (
              <motion.div key={i} initial={{ width: 0 }} animate={artIn ? { width: `${w * 100}%` } : {}} transition={{ duration: 0.4, delay: 0.65 + i * 0.08 }} style={{ height: 5, background: 'rgba(15,34,68,0.09)', borderRadius: 3 }} />
            ))}
            <motion.div initial={{ opacity: 0, y: 5 }} animate={artIn ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.1 }} style={{ background: `${color}18`, borderRadius: 8, padding: '7px 10px', border: `1px solid ${color}30`, marginTop: 2 }}>
              <div style={{ fontSize: 10, color, fontWeight: 700 }}>📊 "AI citations increase 3.2× after AIO optimisation"</div>
            </motion.div>
          </div>
          <div style={{ padding: '8px 14px', borderTop: '1px solid rgba(15,34,68,0.05)', display: 'flex', gap: 5 }}>
            {['Experience','Expertise','Authority','Trust'].map((tag, i) => (
              <motion.div key={tag} initial={{ opacity: 0, scale: 0.7 }} animate={artIn ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1.0 + i * 0.08, duration: 0.3 }}
                style={{ fontSize: 8.5, fontFamily: 'var(--font-mono)', fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: `${color}18`, color, border: `1px solid ${color}35` }}>
                {tag} ✓
              </motion.div>
            ))}
          </div>
        </div>
        <div style={{ width: 184, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'rgba(15,34,68,0.03)', borderRadius: 14, border: `1px solid ${color}25`, padding: '12px', flex: 1 }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', marginBottom: 10, letterSpacing: '0.08em' }}>AI IS NOW CITING</div>
            {AI_QUOTES.map((q, i) => (
              <motion.div key={q.platform} initial={{ opacity: 0, y: 10 }} animate={quoteIdx >= i ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }}
                style={{ marginBottom: 10, background: 'rgba(15,34,68,0.04)', borderRadius: 10, padding: '8px 9px', border: `1px solid ${color}18` }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, color, marginBottom: 5, fontFamily: 'var(--font-mono)' }}>{q.platform}</div>
                <div style={{ fontSize: 9.5, color: 'rgba(15,34,68,0.6)', lineHeight: 1.5, fontStyle: 'italic' }}>{q.quote}</div>
              </motion.div>
            ))}
          </div>
          <div style={{ background: `${color}12`, borderRadius: 14, border: `1px solid ${color}30`, padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', marginBottom: 4 }}>CITATION DENSITY</div>
            <motion.div initial={{ opacity: 0 }} animate={quoteIdx >= 0 ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
              style={{ fontSize: 34, fontWeight: 900, color, lineHeight: 1 }}>87<span style={{ fontSize: 14 }}>%</span></motion.div>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: `${color}bb`, marginTop: 3 }}>per query · up from 28%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   SCENE 4 — Monitor & Optimise
══════════════════════════════════════════════ */
const MONITOR_PLATFORMS = [
  { name: 'ChatGPT',    curr: 94, prev: 62, c: '#10a37f' },
  { name: 'Gemini',     curr: 81, prev: 31, c: '#4285f4' },
  { name: 'Perplexity', curr: 88, prev: 48, c: '#1FB8CD' },
  { name: 'Copilot',    curr: 76, prev: 28, c: '#0078d4' },
  { name: 'Claude',     curr: 71, prev: 19, c: '#d97706' },
]
const ALERTS = [
  { icon: '🚀', text: 'Gemini citations +50% this week', time: '2h ago' },
  { icon: '📈', text: 'New keyword cluster indexed by ChatGPT', time: '1d ago' },
  { icon: '✅', text: 'Schema validated across all 5 platforms', time: '3d ago' },
]
const TREND_PTS = [28,32,38,44,51,58,66,72,78,84,89,94]

function MonitorScene({ active, color }: { active: boolean; color: string }) {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    if (!active) { setPhase(0); return }
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [active])

  const W = 240, H = 72
  const max = Math.max(...TREND_PTS)
  const pts = TREND_PTS.map((v, i) => `${(i / (TREND_PTS.length - 1)) * W},${H - (v / max) * (H - 4)}`)

  return (
    <div style={{ padding: '28px 26px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color, letterSpacing: '0.12em', marginBottom: 6 }}>STEP 04</div>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#0f2244', lineHeight: 1.2 }}>Monitor &<br />Optimise</div>
      </div>
      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', letterSpacing: '0.1em', marginBottom: 2 }}>CITATION RATES · AFTER AIO</div>
          {MONITOR_PLATFORMS.map((p, i) => (
            <div key={p.name}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <div style={{ width: 22, height: 22, borderRadius: 7, background: p.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#0f2244', flexShrink: 0 }}>{p.name[0]}</div>
                <span style={{ fontSize: 10.5, color: '#0f2244', flex: 1 }}>{p.name}</span>
                <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.4)' }}>{p.prev}%</span>
                <span style={{ fontSize: 10, color: '#1e9e75', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>→ {p.curr}%</span>
              </div>
              <div style={{ height: 5, background: 'rgba(15,34,68,0.06)', borderRadius: 999, overflow: 'hidden' }}>
                <motion.div initial={{ width: `${p.prev}%` }} animate={phase >= 1 ? { width: `${p.curr}%` } : {}}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 0.8, 0.2, 1] }}
                  style={{ height: '100%', background: p.c, borderRadius: 999 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ width: 192, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'rgba(15,34,68,0.03)', borderRadius: 14, border: `1px solid ${color}25`, padding: '12px' }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', marginBottom: 8, letterSpacing: '0.08em' }}>CITATION TREND · 12M</div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 56, overflow: 'visible' }}>
              <defs>
                <linearGradient id="mt-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
                <clipPath id="mt-clip">
                  <motion.rect x="0" y="0" width={W} height={H}
                    initial={{ scaleX: 0 }} animate={phase >= 1 ? { scaleX: 1 } : {}}
                    style={{ transformOrigin: 'left' }}
                    transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 0.8, 0.2, 1] }} />
                </clipPath>
              </defs>
              <g clipPath="url(#mt-clip)">
                <polygon points={`0,${H} ${pts.join(' ')} ${W},${H}`} fill="url(#mt-grad)" />
                <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </div>
          <div style={{ background: 'rgba(15,34,68,0.02)', borderRadius: 14, border: '1px solid rgba(15,34,68,0.06)', padding: '10px', flex: 1 }}>
            <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(15,34,68,0.35)', marginBottom: 8, letterSpacing: '0.08em' }}>ALERTS</div>
            {ALERTS.map((a, i) => (
              <motion.div key={a.text} initial={{ opacity: 0, x: 10 }} animate={phase >= 2 ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.15, duration: 0.3 }}
                style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: 8 }}>
                <span style={{ fontSize: 12, flexShrink: 0 }}>{a.icon}</span>
                <div>
                  <div style={{ fontSize: 9.5, color: 'rgba(15,34,68,0.75)', lineHeight: 1.4 }}>{a.text}</div>
                  <div style={{ fontSize: 8.5, color: 'rgba(15,34,68,0.3)', fontFamily: 'var(--font-mono)', marginTop: 1 }}>{a.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
