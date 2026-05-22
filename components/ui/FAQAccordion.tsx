'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="card" style={{ padding: '8px 28px' }}>
      {items.map((it, i) => (
        <div key={i} className="acc-item">
          <div className="acc-q" onClick={() => setOpen(open === i ? null : i)}>
            <span>{it.q}</span>
            <span className="accent" style={{ fontSize: 22, lineHeight: 1 }}>{open === i ? '−' : '+'}</span>
          </div>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                <p className="text-soft" style={{ paddingBottom: 20, fontSize: 15 }}>{it.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
