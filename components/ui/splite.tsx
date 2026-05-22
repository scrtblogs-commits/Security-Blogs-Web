'use client'

import React, { Suspense, lazy, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

function Fallback({ loading }: { loading?: boolean }) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 280, display: 'grid', placeItems: 'center' }}>
      {loading ? (
        <span className="sg-loader" />
      ) : (
        <div style={{ position: 'relative', width: 180, height: 180 }}>
          <div className="float" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #6f4dff, #1e5fe0 60%, transparent 72%)', filter: 'blur(2px)', opacity: 0.9 }} />
          <div style={{ position: 'absolute', inset: -18, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)' }} />
          <div style={{ position: 'absolute', inset: -38, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />
        </div>
      )}
    </div>
  )
}

class SplineErrorBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {}
  render() {
    if (this.state.failed) return <Fallback />
    return this.props.children
  }
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [failed, setFailed] = useState(false)
  if (failed) return <Fallback />
  return (
    <SplineErrorBoundary>
      <Suspense fallback={<Fallback loading />}>
        <Spline scene={scene} className={className} onError={() => setFailed(true)} />
      </Suspense>
    </SplineErrorBoundary>
  )
}
