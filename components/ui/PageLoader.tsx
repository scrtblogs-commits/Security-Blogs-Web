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
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ display: 'flex', alignItems: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.webp" alt="SecurityBlogs" style={{ height: 72, width: 'auto', display: 'block' }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
