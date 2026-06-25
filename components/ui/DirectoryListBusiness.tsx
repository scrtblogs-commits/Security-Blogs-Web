'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const BENEFITS = [
  {
    color: '#3b82f6',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 14 14"/>
      </svg>
    ),
    title: 'Takes under 2 minutes',
    body: 'Submit your business details online. No paperwork, no phone calls — just a quick form and you're done.',
  },
  {
    color: '#10b981',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: 'Verified and trusted',
    body: 'We check your licence and reviews before your profile goes live. Buyers know every listing is real.',
  },
  {
    color: '#6366f1',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: 'Found by buyers searching now',
    body: 'Security buyers use this directory to find providers in their area. Your profile puts you directly in front of them.',
  },
  {
    color: '#f59e0b',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Ranked by AI visibility',
    body: 'See exactly how often ChatGPT, Google AI and other platforms recommend your brand — and how to improve.',
  },
]

const STEPS = [
  { n: '1', title: 'Submit your details', body: 'Fill in your business name, location and services. It takes less than 2 minutes.' },
  { n: '2', title: 'We verify your business', body: 'We check your licence and reviews to make sure the directory stays trustworthy for buyers.' },
  { n: '3', title: 'Your profile goes live', body: 'Your listing appears in the directory and starts showing up in buyer searches straight away.' },
  { n: '4', title: 'Buyers contact you', body: 'Subscribers can see your full contact details and reach out directly — no middleman.' },
]

function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true) }, { threshold: 0.1 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={{
      opacity: on ? 1 : 0,
      transform: on ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  )
}

export default function DirectoryListBusiness() {
  return (
    <section className="section" id="list-your-business" style={{ background: '#fff' }}>
      <div className="container">

        {/* Header */}
        <FadeIn>
          <div style={{ marginBottom: 52 }}>
            <span style={{
              display: 'inline-block', fontSize: 11, fontWeight: 800,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#3b82f6', marginBottom: 14,
            }}>
              For security businesses
            </span>
            <h2 style={{
              fontSize: 'clamp(26px, 3.2vw, 40px)', fontWeight: 900,
              letterSpacing: '-0.03em', color: '#0f172a',
              lineHeight: 1.15, marginBottom: 14, maxWidth: 600,
            }}>
              Is your security company<br />listed here?{' '}
              <span style={{ color: '#10b981' }}>It's free.</span>
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 540, lineHeight: 1.7, margin: 0 }}>
              Thousands of buyers use this directory to find and compare security companies across Australia.
              If you're not listed, you're invisible to them.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }} className="dlb-grid">

          {/* Left: benefits */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {BENEFITS.map((b, i) => (
              <FadeIn key={b.title} delay={i * 0.08}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: `${b.color}14`, color: b.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {b.icon}
                  </span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{b.title}</div>
                    <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{b.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Right: steps + CTA card */}
          <FadeIn delay={0.1}>
            <div style={{
              background: '#f8fafc', borderRadius: 20,
              padding: '32px 28px', border: '1px solid #e2e8f0',
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#0f172a', marginBottom: 24, letterSpacing: '-0.01em' }}>
                How to get listed
              </div>

              {/* Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {STEPS.map((s, i) => (
                  <div key={s.n} style={{ display: 'flex', gap: 16, position: 'relative' }}>
                    {/* Connector line */}
                    {i < STEPS.length - 1 && (
                      <div style={{
                        position: 'absolute', left: 16, top: 36, width: 2,
                        height: 'calc(100% - 8px)', background: '#e2e8f0',
                      }} />
                    )}
                    {/* Number circle */}
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                      background: '#fff', border: '2px solid #3b82f6',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 800, color: '#3b82f6',
                      position: 'relative', zIndex: 1,
                    }}>
                      {s.n}
                    </div>
                    {/* Content */}
                    <div style={{ paddingBottom: i < STEPS.length - 1 ? 24 : 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 3 }}>{s.title}</div>
                      <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, margin: 0 }}>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: '#e2e8f0', margin: '28px 0' }} />

              {/* Free badge */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 16, flexWrap: 'wrap',
              }}>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>Free</div>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 3 }}>No credit card. No commitment.</div>
                </div>
                <Link
                  href="/contact/"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#0f172a', color: '#fff',
                    fontSize: 14, fontWeight: 800, borderRadius: 50,
                    padding: '13px 24px', textDecoration: 'none', whiteSpace: 'nowrap',
                  }}
                >
                  List my business free →
                </Link>
              </div>

              {/* Trust row */}
              <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
                {['200+ listed companies', 'AU-wide coverage', 'AI-verified badges'].map(t => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#10b981">
                      <circle cx="12" cy="12" r="12"/>
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute' }}>
                      <polyline points="8 12 11 15 16 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ fontSize: 12, color: '#64748b' }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dlb-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
