'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * useVelocity — single source of truth for lerped scroll + pointer velocity.
 * Returns a normalised 0–1 float; 0 = still, 1 = fast.
 * Driven by the shared rAF loop inside SmoothScrollProvider via a global
 * singleton so multiple consumers share one loop.
 */

type Subscriber = (v: number) => void
const subscribers = new Set<Subscriber>()
let globalVelocity = 0

export function _emitVelocity(v: number) {
  globalVelocity = v
  subscribers.forEach(fn => fn(v))
}

export function useVelocity() {
  const [velocity, setVelocity] = useState(0)

  useEffect(() => {
    const fn: Subscriber = v => setVelocity(v)
    subscribers.add(fn)
    setVelocity(globalVelocity)
    return () => { subscribers.delete(fn) }
  }, [])

  return velocity
}

/**
 * useVelocityRef — same as useVelocity but via a ref (no re-render).
 * Use inside animation loops where state updates would be expensive.
 */
export function useVelocityRef() {
  const ref = useRef(0)
  useEffect(() => {
    const fn: Subscriber = v => { ref.current = v }
    subscribers.add(fn)
    return () => { subscribers.delete(fn) }
  }, [])
  return ref
}
