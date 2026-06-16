'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { services } from '@/lib/site'

/**
 * HorizontalScrollServices — pinned horizontal scroll section.
 *
 * Scroll sequence:
 *   Hero scrolls down normally →
 *   This section PINS (page "hangs") →
 *   Service panels slide left as user scrolls →
 *   Section unpins → rest of page scrolls normally.
 *
 * Accessibility / progressive enhancement:
 *   - prefers-reduced-motion: renders as normal vertical section
 *   - touch devices: renders as scrollable horizontal snap strip
 *   - All content stays in crawlable DOM — no canvas text
 *   - CLS = 0: height is declared before JS runs
 */

const PANELS = [
  {
    num: '01',
    tag: 'Security SEO',
    color: '#1e9e75',
    href: '/services/security-seo/',
    heading: 'Rank #1 for every keyword your buyers search.',
    body: 'Full-stack SEO built exclusively for physical security companies — CCTV, access control, alarms, guarding and SaaS. We own the search results your buyers see every day.',
    stats: [
      { num: '+180%', label: 'Average organic traffic growth' },
      { num: '#1',    label: 'Rankings for 40+ security keywords' },
      { num: '50+',   label: 'Security brands ranked globally' },
    ],
  },
  {
    num: '02',
    tag: 'AIO · AEO · GEO',
    color: '#7c3aed',
    href: '/services/aio/',
    heading: 'Be the answer ChatGPT and Gemini give.',
    body: 'When a security buyer asks an AI assistant for a recommendation, your brand should appear. We build the authority signals that make that happen across all 10 major AI platforms.',
    stats: [
      { num: '87%', label: 'AI citation rate achieved' },
      { num: '10',  label: 'AI platforms monitored & optimised' },
      { num: '3×',  label: 'Increase in branded AI mentions' },
    ],
  },
  {
    num: '03',
    tag: 'Google Ads · Bing Ads · Web Design',
    color: '#e23744',
    href: '/services/',
    heading: 'Paid growth and websites built to convert.',
    body: 'Industry-specific PPC campaigns targeting security buyers at the exact moment they need you — combined with AI-ready websites that rank, convert and get cited by AI assistants.',
    stats: [
      { num: '3.2×', label: 'Average ROAS on Google Ads' },
      { num: '41%',  label: 'B2B buyers on Microsoft Bing' },
      { num: '30d',  label: 'Average website delivery time' },
    ],
  },
]

export default function HorizontalScrollServices() {
  const triggerRef = useRef<HTMLDivElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const barRef     = useRef<HTMLDivElement>(null)
  const dotsRef    = useRef<HTMLDivElement>(null)
  const hintRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Disable on touch / reduced-motion — CSS handles fallback
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const trigger = triggerRef.current
    const track   = trackRef.current
    const bar     = barRef.current
    const dots    = dotsRef.current?.querySelectorAll<HTMLElement>('.hs-dot')
    const hint    = hintRef.current
    if (!trigger || !track) return

    let hintHidden = false

    const update = () => {
      const rect   = trigger.getBoundingClientRect()
      const total  = trigger.offsetHeight - window.innerHeight
      const prog   = Math.max(0, Math.min(1, -rect.top / total))

      // Slide panels left
      track.style.transform = `translateX(-${prog * (PANELS.length - 1) * 100}vw)`

      // Progress bar
      if (bar) bar.style.width = `${prog * 100}%`

      // Dots
      if (dots) {
        const active = Math.round(prog * (PANELS.length - 1))
        dots.forEach((d, i) => d.classList.toggle('active', i === active))
      }

      // Hide hint
      if (hint && prog > 0.02 && !hintHidden) {
        hintHidden = true
        hint.style.opacity = '0'
      }
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <>
      {/* ── PINNED HORIZONTAL (desktop) ────────────────────── */}
      {/* height: 300vh = 3 panels × 100vh scroll distance     */}
      <div
        ref={triggerRef}
        className="hs-trigger"
        aria-label="Services overview"
        style={{ height: `${PANELS.length * 100}vh`, position: 'relative' }}
      >
        <div
          style={{
            position: 'sticky', top: 0,
            height: '100vh', overflow: 'hidden',
            background: 'var(--bg)',
          }}
        >
          {/* Section eyebrow — fixed above panels */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '44px 52px 0', zIndex: 2, pointerEvents: 'none' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 8 }}>What we do</p>
            <h2 className="h2">Every channel. One engine.</h2>
          </div>

          {/* Progress bar */}
          <div ref={barRef} style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: 'var(--blue)', zIndex: 10, width: '0%', transition: 'width .04s linear' }} />

          {/* Panel dots */}
          <div ref={dotsRef} style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
            {PANELS.map((_, i) => (
              <span key={i} className="hs-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--line)', display: 'block', transition: 'background .3s, transform .3s' }} />
            ))}
          </div>

          {/* Scroll hint */}
          <div ref={hintRef} style={{ position: 'absolute', bottom: 52, right: 52, fontSize: 12, color: 'var(--text-soft)', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8, transition: 'opacity .4s', zIndex: 10 }}>
            Scroll to explore &nbsp;→
          </div>

          {/* Sliding track */}
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              width: `${PANELS.length * 100}vw`,
              height: '100%',
              willChange: 'transform',
              transition: 'transform .05s linear',
            }}
          >
            {PANELS.map((p) => (
              <div
                key={p.num}
                style={{ width: '100vw', height: '100%', flexShrink: 0, display: 'flex', alignItems: 'center', padding: '100px 52px 60px' }}
              >
                <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
                  {/* Left — text */}
                  <div>
                    <div style={{ fontSize: 100, fontWeight: 800, color: 'var(--line)', lineHeight: 1, marginBottom: -10 }}>{p.num}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: p.color, marginBottom: 14 }}>{p.tag}</div>
                    <h3 style={{ fontSize: 'clamp(28px,3vw,46px)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.1, marginBottom: 16 }}>{p.heading}</h3>
                    <p style={{ fontSize: 16, color: 'var(--text-soft)', lineHeight: 1.75, marginBottom: 24, maxWidth: 440 }}>{p.body}</p>
                    <Link href={p.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700, color: 'var(--text)', borderBottom: '2px solid var(--text)', paddingBottom: 2, textDecoration: 'none' }}>
                      Learn more →
                    </Link>
                  </div>
                  {/* Right — stats card */}
                  <div className="glass" style={{ borderRadius: 24, padding: 36, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {p.stats.map((s, i) => (
                      <div key={i}>
                        {i > 0 && <div style={{ height: 1, background: 'var(--line)', marginBottom: 20 }} />}
                        <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-.03em', color: p.color, lineHeight: 1 }}>{s.num}</div>
                        <div style={{ fontSize: 14, color: 'var(--text-soft)', fontWeight: 500, marginTop: 4 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ACTIVE DOT STYLE ─────────────────────────── */}
      <style>{`.hs-dot.active { background: var(--blue) !important; transform: scale(1.35); }`}</style>

      {/* ── MOBILE / REDUCED-MOTION FALLBACK ────────────
          Hidden on desktop (pointer:fine). Shows as a
          horizontal snap strip on touch devices.        */}
      <section className="section hs-fallback" id="services" style={{ display: 'none' }}>
        <div className="container">
          <div style={{ marginBottom: 48, textAlign: 'center' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 8 }}>What we do</p>
            <h2 className="h2">Every channel. One engine.</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {PANELS.map((p) => (
              <div key={p.num} className="glass" style={{ borderRadius: 20, padding: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: p.color, marginBottom: 12 }}>{p.tag}</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{p.heading}</h3>
                <p style={{ fontSize: 15, color: 'var(--text-soft)', lineHeight: 1.7, marginBottom: 16 }}>{p.body}</p>
                {p.stats.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline', marginBottom: 6 }}>
                    <span style={{ fontSize: 22, fontWeight: 800, color: p.color }}>{s.num}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-soft)' }}>{s.label}</span>
                  </div>
                ))}
                <Link href={p.href} style={{ display: 'inline-block', marginTop: 12, fontSize: 14, fontWeight: 700, color: 'var(--blue)', textDecoration: 'none' }}>
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Show fallback on touch / reduced-motion; hide pinned version */}
      <style>{`
        @media (pointer: coarse), (prefers-reduced-motion: reduce) {
          .hs-trigger { display: none !important; }
          .hs-fallback { display: block !important; }
        }
      `}</style>
    </>
  )
}
