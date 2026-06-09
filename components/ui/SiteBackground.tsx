'use client'
import { useEffect, useState } from 'react'
import AuroraBackground from './backgrounds/AuroraBackground'
import MeshGradient from './backgrounds/MeshGradient'
import DotNoise from './backgrounds/DotNoise'
import ParticleField from './backgrounds/ParticleField'
import SkyAtmosphere from './backgrounds/SkyAtmosphere'
import GlowBackground from './backgrounds/GlowBackground'

type Variant = 'sky' | 'aurora' | 'mesh' | 'particles' | 'dots' | 'glow' | 'none'

// Order matters for the (unused for now) variant switcher: most prominent
// option first. 'sky' is the new sitewide default — daytime sky in light
// mode, starry night in dark mode, animated continuously.
const options: { key: Variant; label: string }[] = [
  { key: 'sky', label: 'Sky' },
  { key: 'aurora', label: 'Aurora' },
  { key: 'mesh', label: 'Mesh' },
  { key: 'particles', label: 'Particles' },
  { key: 'dots', label: 'Dots' },
  { key: 'none', label: 'None' },
]

export default function SiteBackground({ defaultVariant = 'glow' as Variant }: { defaultVariant?: Variant }) {
  const [variant, setVariant] = useState<Variant>(defaultVariant)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sg-bg') as Variant | null
      if (saved) setVariant(saved)
    } catch {}
    setReady(true)
  }, [])

  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
      {ready && variant === 'sky' && <SkyAtmosphere />}
      {ready && variant === 'aurora' && <AuroraBackground />}
      {ready && variant === 'mesh' && <MeshGradient />}
      {ready && variant === 'particles' && <ParticleField />}
      {ready && variant === 'dots' && <DotNoise />}
      {ready && variant === 'glow' && <GlowBackground />}
    </div>
  )
}
