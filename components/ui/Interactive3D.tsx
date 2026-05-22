'use client'
import { ReactNode } from 'react'
import { SplineScene } from '@/components/ui/splite'

function Spotlight() {
  return (
    <svg
      className="sg-spotlight"
      style={{ position: 'absolute', top: -160, left: 0, height: '169%', width: '138%', zIndex: 1, pointerEvents: 'none' }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
      aria-hidden
    >
      <g filter="url(#sg-spot-filter)">
        <ellipse
          cx="1924.71" cy="273.501" rx="1924.71" ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill="white" fillOpacity="0.18"
        />
      </g>
      <defs>
        <filter id="sg-spot-filter" x="0.86" y="0.84" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" />
          <feBlend mode="normal" in="SourceGraphic" in2="bg" result="shape" />
          <feGaussianBlur stdDeviation="151" result="blur" />
        </filter>
      </defs>
    </svg>
  )
}

export default function Interactive3D({
  eyebrow = 'Interactive',
  title,
  description,
}: { eyebrow?: string; title?: ReactNode; description?: ReactNode }) {
  return (
    <div
      style={{
        position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-lg)',
        background: '#070d1c', border: '1px solid rgba(255,255,255,0.08)', minHeight: 480,
        boxShadow: '0 40px 90px -45px rgba(8,15,30,0.9)',
      }}
    >
      <Spotlight />
      <div className="sg-3d-grid" style={{ display: 'flex', height: '100%', minHeight: 480, position: 'relative', zIndex: 2 }}>
        <div style={{ flex: 1, padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span className="eyebrow" style={{ color: '#7fa8ff' }}>{eyebrow}</span>
          <h2 style={{ fontSize: 'clamp(30px,4vw,46px)', margin: '12px 0 14px', color: '#fff', lineHeight: 1.1 }}>
            {title ?? (
              <>See your brand the way <span style={{ background: 'linear-gradient(180deg,#fff,#9fb4d6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>AI sees it</span></>
            )}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.72)', maxWidth: 460, fontSize: 16, lineHeight: 1.6 }}>
            {description ?? 'Every answer engine builds a live model of your security brand — its entities, signals and authority. Explore the 3D model to understand exactly what AI knows about you.'}
          </p>
        </div>
        <div className="sg-3d-scene" style={{ flex: 1, position: 'relative', minHeight: 320 }}>
          <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="sg-spline" />
        </div>
      </div>
      <style>{`
        .sg-spline { width: 100%; height: 100%; }
        @media (max-width: 820px) {
          .sg-3d-grid { flex-direction: column; }
          .sg-3d-scene { min-height: 300px; }
        }
      `}</style>
    </div>
  )
}
