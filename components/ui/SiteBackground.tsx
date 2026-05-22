'use client'
import { useEffect, useState } from 'react'
import AuroraBackground from './backgrounds/AuroraBackground'
import MeshGradient from './backgrounds/MeshGradient'
import DotNoise from './backgrounds/DotNoise'
import ParticleField from './backgrounds/ParticleField'

type Variant = 'aurora' | 'mesh' | 'particles' | 'dots' | 'none'

const options: { key: Variant; label: string }[] = [
  { key: 'aurora', label: 'Aurora' },
  { key: 'mesh', label: 'Mesh' },
  { key: 'particles', label: 'Particles' },
  { key: 'dots', label: 'Dots' },
  { key: 'none', label: 'None' },
]

export default function SiteBackground({ defaultVariant = 'aurora' as Variant }: { defaultVariant?: Variant }) {
  const [variant, setVariant] = useState<Variant>(defaultVariant)
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sg-bg') as Variant | null
      if (saved) setVariant(saved)
    } catch {}
    setReady(true)
  }, [])

  const pick = (v: Variant) => {
    setVariant(v)
    try { localStorage.setItem('sg-bg', v) } catch {}
  }

  return (
    <>
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
        {ready && variant === 'aurora' && <AuroraBackground />}
        {ready && variant === 'mesh' && <MeshGradient />}
        {ready && variant === 'particles' && <ParticleField />}
        {ready && variant === 'dots' && <DotNoise />}
      </div>

      <div className="sg-bg-switch" style={{ position: 'fixed', left: 16, bottom: 16, zIndex: 150 }}>
        {open && (
          <div className="glass" style={{ padding: 8, borderRadius: 14, marginBottom: 8, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 140 }}>
            <div className="eyebrow" style={{ fontSize: 10, padding: '2px 8px' }}>Background</div>
            {options.map((o) => (
              <button key={o.key} onClick={() => pick(o.key)} className={`pill ${variant === o.key ? 'active' : ''}`} style={{ fontSize: 13, textAlign: 'left' }}>{o.label}</button>
            ))}
          </div>
        )}
        <button onClick={() => setOpen((o) => !o)} aria-label="Change background" className="btn btn-outline" style={{ padding: '10px 12px', borderRadius: 12, background: 'var(--bg-card)' }}>
          {open ? '✕' : '🎨'}
        </button>
      </div>
    </>
  )
}
