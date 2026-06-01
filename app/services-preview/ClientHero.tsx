'use client'
import dynamic from 'next/dynamic'

// Client-only wrapper. We can't ssr:false from a server component in Next 15,
// so we isolate the dynamic import in a `'use client'` boundary.
const ImmersiveServices = dynamic(
  () => import('@/components/immersive/ImmersiveServices'),
  { ssr: false, loading: () => <FallbackHero /> },
)

export default function ClientHero() {
  return <ImmersiveServices brand="Your Brand" />
}

function FallbackHero() {
  return (
    <div style={{
      height: '100vh',
      display: 'grid', placeItems: 'center',
      background: 'linear-gradient(180deg, #c9e4ff 0%, #e7f3ff 50%, #f0f7ff 100%)',
      color: '#0f2244',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 12.5, letterSpacing: 2, color: '#1e5fe0', marginBottom: 10 }}>LOADING</div>
        <div style={{ fontSize: 22, fontWeight: 700 }}>Booting the AI visibility engine…</div>
      </div>
    </div>
  )
}
