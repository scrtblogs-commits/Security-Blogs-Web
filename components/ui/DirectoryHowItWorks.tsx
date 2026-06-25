'use client'
import { useEffect, useRef, useState } from 'react'

const STEPS = [
  {
    n: '01',
    color: '#3b82f6',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    title: 'Browse the directory preview',
    body: 'Explore 200+ verified Australian security companies. See AI visibility scores, ratings and service categories — no sign-up required.',
    pill: 'Free to browse',
  },
  {
    n: '02',
    color: '#6366f1',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: 'Subscribe with your email',
    body: 'Enter your email to instantly unlock full access. No credit card. No commitment. Takes under 10 seconds.',
    pill: 'Free · instant access',
  },
  {
    n: '03',
    color: '#0ea5e9',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'Unlock complete company profiles',
    body: 'Access direct contact details, full service lists, office locations, certifications and AI visibility data for every listed company.',
    pill: 'Contacts · services · locations',
  },
  {
    n: '04',
    color: '#10b981',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
      </svg>
    ),
    title: 'Filter to find the right fit',
    body: 'Narrow by service type, city, speciality or AI score. Go from 200+ companies to the shortlist that matters to you in seconds.',
    pill: 'Service · location · speciality',
  },
  {
    n: '05',
    color: '#f59e0b',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: 'Connect with confidence',
    body: 'Every company is AI-verified and independently reviewed. Make informed decisions backed by real data, not guesswork.',
    pill: 'AI-verified · independently reviewed',
  },
]

function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true) }, { threshold: 0.15 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: '28px 24px',
        background: '#fff',
        borderRadius: 18,
        border: '1px solid #f1f5f9',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        opacity: on ? 1 : 0,
        transform: on ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s ease ${index * 0.1}s`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle colour accent stripe at top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: step.color, borderRadius: '18px 18px 0 0' }} />

      {/* Number + icon row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{
          fontSize: 11, fontWeight: 900, letterSpacing: '0.1em',
          color: step.color, fontFamily: 'var(--font-mono, monospace)',
        }}>
          {step.n}
        </span>
        <span style={{
          width: 40, height: 40, borderRadius: 12,
          background: `${step.color}14`,
          color: step.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {step.icon}
        </span>
      </div>

      {/* Title */}
      <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
        {step.title}
      </div>

      {/* Body */}
      <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, margin: 0, flex: 1 }}>
        {step.body}
      </p>

      {/* Pill */}
      <div style={{
        display: 'inline-flex', alignSelf: 'flex-start',
        fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
        color: step.color,
        background: `${step.color}12`,
        borderRadius: 20, padding: '4px 12px',
      }}>
        {step.pill}
      </div>
    </div>
  )
}

export default function DirectoryHowItWorks() {
  const ctaRef = useRef<HTMLDivElement>(null)
  const [ctaOn, setCtaOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCtaOn(true) }, { threshold: 0.2 })
    if (ctaRef.current) io.observe(ctaRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <section className="section" style={{ paddingTop: 0, background: '#f8fafc' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            display: 'inline-block', fontSize: 11, fontWeight: 800,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#3b82f6', marginBottom: 14,
          }}>
            How it works
          </span>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900,
            letterSpacing: '-0.03em', color: '#0f172a',
            lineHeight: 1.1, marginBottom: 16,
          }}>
            From browsing to connecting<br />
            <span style={{ color: '#3b82f6' }}>in five simple steps.</span>
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            The Security Directory is free to browse and free to unlock. Here's exactly what happens when you arrive.
          </p>
        </div>

        {/* Step cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
          marginBottom: 56,
        }}
        className="how-it-works-grid"
        >
          {STEPS.map((step, i) => (
            <StepCard key={step.n} step={step} index={i} />
          ))}
        </div>

        {/* Value summary bar */}
        <div
          ref={ctaRef}
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
            borderRadius: 20,
            padding: '36px 48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 32,
            flexWrap: 'wrap',
            opacity: ctaOn ? 1 : 0,
            transform: ctaOn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
          className="how-it-works-cta"
        >
          {/* Left: what you get */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', color: '#60a5fa', textTransform: 'uppercase', marginBottom: 10 }}>
              What you unlock — free
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px' }}>
              {[
                'Direct contact details',
                'Full service lists',
                'Office locations',
                'AI visibility score',
                'Smart filters',
                'Verified profiles',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#3b82f6" opacity="0.25"/>
                    <polyline points="8 12 11 15 16 9" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize: 13, color: '#cbd5e1', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10, flexShrink: 0 }}>
            <a
              href="#directory"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#3b82f6', color: '#fff', fontWeight: 800,
                fontSize: 15, borderRadius: 50, padding: '14px 28px',
                textDecoration: 'none', whiteSpace: 'nowrap',
                boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 28px rgba(59,130,246,0.5)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(59,130,246,0.4)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Unlock free access now
            </a>
            <span style={{ fontSize: 12, color: '#64748b' }}>No credit card · Takes 10 seconds</span>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .how-it-works-grid { grid-template-columns: 1fr 1fr !important; }
          .how-it-works-cta { padding: 28px 24px !important; }
        }
        @media (max-width: 480px) {
          .how-it-works-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
