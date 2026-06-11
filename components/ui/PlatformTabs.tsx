'use client'
import { ReactNode, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedSkeleton from './AnimatedSkeleton'

export default function PlatformTabs({ tabs }: { tabs: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0)
  const [loading, setLoading] = useState(false)

  const switchTo = (i: number) => {
    if (i === active) return
    setLoading(true)
    setActive(i)
    setTimeout(() => setLoading(false), 550)
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 platform-tabs-list" style={{ marginBottom: 22, justifyContent: 'center' }}>
        {tabs.map((t, i) => (
          <button key={t.label} className={`pill ${active === i ? 'active' : ''}`} onClick={() => switchTo(i)}>{t.label}</button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="sk" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><AnimatedSkeleton /></motion.div>
        ) : (
          <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {tabs[active].content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
