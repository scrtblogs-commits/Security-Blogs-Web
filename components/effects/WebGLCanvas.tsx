'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { EffectComposer, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useRef, RefObject } from 'react'
import * as THREE from 'three'
import { useVelocityRef } from '@/hooks/useVelocity'

// ── Textured plane synced to DOM rect ──────────────────────────────────────
function ImagePlane({ src, accent }: { src: string; accent: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture  = useTexture(src)
  const { size, camera } = useThree()
  const velRef = useVelocityRef()

  useFrame(() => {
    if (!meshRef.current) return
    // Scale plane to fill the viewport
    const aspect = size.width / size.height
    meshRef.current.scale.set(aspect * 2, 2, 1)
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

// ── Post-processing pass — strength driven by velocity ────────────────────
function VelocityEffects() {
  const velRef = useVelocityRef()
  const offsetRef = useRef(new THREE.Vector2(0, 0))

  useFrame(() => {
    const v = velRef.current
    offsetRef.current.set(v * 0.008, v * 0.002)
  })

  return (
    <EffectComposer>
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={offsetRef.current}
        radialModulation={false}
        modulationOffset={0}
      />
    </EffectComposer>
  )
}

// ── Main canvas component (lazy-loaded) ───────────────────────────────────
export default function WebGLCanvas({
  src,
  accent,
  containerRef,
}: {
  src: string
  accent: string
  containerRef: RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        // 25% padding avoids fast-scroll clipping
        margin: '-12.5%', width: '125%', height: '125%',
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <ImagePlane src={src} accent={accent} />
          <VelocityEffects />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Need Suspense in scope
import { Suspense } from 'react'
