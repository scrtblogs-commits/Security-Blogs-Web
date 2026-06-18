'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

const PANELS = [
  {
    num: '01',
    tag: 'Security SEO',
    color: '#1e5fe0',
    bg: '#ffffff',
    href: '/services/security-seo/',
    heading: 'Rank #1 for every keyword your buyers search.',
    body: 'Full-stack SEO built exclusively for physical security companies — CCTV, access control, alarms, guarding and SaaS. We own the search results your buyers see every day.',
    stats: [
      { num: 'Niche', label: 'Exclusively security-industry SEO' },
      { num: 'Local', label: 'Maps & service-area targeting' },
      { num: 'Schema', label: 'AI- and search-ready markup' },
    ],
  },
  {
    num: '02',
    tag: 'AIO · AEO · GEO',
    color: '#1e5fe0',
    bg: '#ffffff',
    href: '/services/aio/',
    heading: 'Be the answer ChatGPT and Gemini give.',
    body: 'When a security buyer asks an AI assistant for a recommendation, your brand should appear. We build the authority signals that make that happen across all 10 major AI platforms.',
    stats: [
      { num: 'AI', label: 'Optimised for ChatGPT, Gemini, Perplexity' },
      { num: '6+',  label: 'AI platforms monitored & optimised' },
      { num: 'Entity',  label: 'Knowledge-graph & citation signals' },
    ],
  },
  {
    num: '03',
    tag: 'Google Ads · Bing Ads',
    color: '#1e5fe0',
    bg: '#ffffff',
    href: '/services/',
    heading: 'Paid growth that converts security buyers.',
    body: 'Industry-specific PPC campaigns targeting security buyers at the exact moment they need you — combined with AI-ready websites that rank, convert and get cited.',
    stats: [
      { num: 'PPC', label: 'Google & Microsoft Ads campaigns' },
      { num: 'B2B',  label: 'LinkedIn-grade buyer targeting' },
      { num: 'Tracked',  label: 'Conversion tracking built in' },
    ],
  },
  {
    num: '04',
    tag: 'Web Design',
    color: '#1e5fe0',
    bg: '#ffffff',
    href: '/services/web-design/',
    heading: 'Websites built to rank, convert and get cited by AI.',
    body: 'Every site we build is engineered for SEO from day one — fast, accessible, schema-rich and optimised to appear in AI-generated answers across every major platform.',
    stats: [
      { num: 'Fast', label: 'Core Web Vitals focused' },
      { num: 'Schema',   label: 'AI-ready, structured markup' },
      { num: 'SEO', label: 'Built to rank from day one' },
    ],
  },
]

export default function HorizontalScrollServices() {
  const triggerRef = useRef<HTMLDivElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const barRef     = useRef<HTMLDivElement>(null)
  const dotsRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const trigger = triggerRef.current
    const track   = trackRef.current
    const bar     = barRef.current
    const dots    = dotsRef.current?.querySelectorAll<HTMLElement>('.hs-dot')
    if (!trigger || !track) return

    const update = () => {
      const rect  = trigger.getBoundingClientRect()
      const total = trigger.offsetHeight - window.innerHeight
      const prog  = Math.max(0, Math.min(1, -rect.top / total))

      track.style.transform = `translateX(-${prog * (PANELS.length - 1) * 100}vw)`
      if (bar) bar.style.width = `${prog * 100}%`

      if (dots) {
        const active = Math.round(prog * (PANELS.length - 1))
        dots.forEach((d, i) => d.classList.toggle('active', i === active))
      }
    }

    window.addEventListener('scroll', update, { passive: true })
    let rafId: number
    const loop = () => { update(); rafId = requestAnimationFrame(loop) }
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('scroll', update)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* ── PINNED HORIZONTAL (all screens) ─────────────── */}
      <div
        ref={triggerRef}
        className="hs-trigger"
        aria-label="Services overview"
        style={{ height: `${PANELS.length * 100}vh`, position: 'relative' }}
      >
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#fff' }}>

          {/* Progress bar */}
          <div ref={barRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--blue)', zIndex: 20, width: '0%', transition: 'width .04s linear' }} />

          {/* Dot indicators */}
          <div ref={dotsRef} style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10, zIndex: 20 }}>
            {PANELS.map((_, i) => (
              <span key={i} className="hs-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,0.15)', display: 'block', transition: 'all .3s' }} />
            ))}
          </div>

          {/* Sliding track */}
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              width: `${PANELS.length * 100}vw`,
              height: '100%',
              willChange: 'transform',
            }}
          >
            {PANELS.map((p) => (
              <div
                key={p.num}
                style={{
                  width: '100vw',
                  height: '100%',
                  flexShrink: 0,
                  background: p.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '80px 60px 80px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Content */}
                <div style={{ maxWidth: 1200, width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative', zIndex: 1 }}>

                  {/* Left */}
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: p.color, marginBottom: 20 }}>{p.tag}</div>
                    <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 68px)', fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.05, marginBottom: 24, color: '#11203a' }}>{p.heading}</h2>
                    <p style={{ fontSize: 18, color: '#485874', lineHeight: 1.7, marginBottom: 36, maxWidth: 500 }}>{p.body}</p>
                    <Link
                      href={p.href}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        fontSize: 15, fontWeight: 800, color: '#fff',
                        background: p.color, borderRadius: 50,
                        padding: '14px 32px', textDecoration: 'none',
                        transition: 'transform .2s, box-shadow .2s',
                      }}
                    >
                      Learn more →
                    </Link>
                  </div>

                  {/* Right — stats */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {p.stats.map((s, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '32px 0',
                          borderBottom: i < p.stats.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                        }}
                      >
                        <div style={{ fontSize: 'clamp(52px, 7vw, 96px)', fontWeight: 900, letterSpacing: '-.04em', color: p.color, lineHeight: 1 }}>{s.num}</div>
                        <div style={{ fontSize: 16, color: '#485874', fontWeight: 500, marginTop: 6 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hs-dot.active { background: #11203a !important; transform: scale(1.5); }
        @media (max-width: 768px) {
          .hs-trigger { display: none !important; }
          .hs-fallback { display: block !important; }
        }
      `}</style>

      {/* ── MOBILE FALLBACK ─────────────────────────── */}
      <section className="hs-fallback" style={{ display: 'none', padding: '60px 24px' }}>
        {PANELS.map((p) => (
          <div key={p.num} style={{ background: p.bg, borderRadius: 24, padding: 32, marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: p.color, marginBottom: 12 }}>{p.tag}</div>
            <h3 style={{ fontSize: 28, fontWeight: 900, marginBottom: 14, color: '#11203a' }}>{p.heading}</h3>
            <p style={{ fontSize: 15, color: '#485874', lineHeight: 1.7, marginBottom: 20 }}>{p.body}</p>
            {p.stats.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontSize: 32, fontWeight: 900, color: p.color }}>{s.num}</span>
                <span style={{ fontSize: 14, color: '#485874' }}>{s.label}</span>
              </div>
            ))}
            <Link href={p.href} style={{ display: 'inline-block', marginTop: 16, fontSize: 14, fontWeight: 700, color: p.color, textDecoration: 'none' }}>Learn more →</Link>
          </div>
        ))}
      </section>
    </>
  )
}
