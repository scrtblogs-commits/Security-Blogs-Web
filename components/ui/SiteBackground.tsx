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
      {ready && variant === 'aurora' && <AuroraBackground />}
      {ready && variant === 'mesh' && <MeshGradient />}
      {ready && variant === 'particles' && <ParticleField />}
      {ready && variant === 'dots' && <DotNoise />}
    </div>
  )
}
