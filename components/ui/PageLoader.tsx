'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [done, setDone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 700)
    return () => clearTimeout(t)
  }, [])
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
          style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'var(--bg)', display: 'grid', placeItems: 'center' }}
        >
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22 }}>
            <span style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, var(--blue), var(--violet))', color: '#fff', display: 'grid', placeItems: 'center' }}>S</span>
            <span><span className="accent">Security</span>Growth</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
