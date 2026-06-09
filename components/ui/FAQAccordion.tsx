'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import JsonLd from '@/components/JsonLd'
import { faqSchema } from '@/lib/schema'

export default function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <>
      <JsonLd data={faqSchema(items)} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              background: '#ffffff',
              border: `1.5px solid ${open === i ? 'rgba(30,95,224,0.30)' : 'rgba(18,42,86,0.10)'}`,
              borderRadius: 14,
              overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}
          >
            {/* Question row */}
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: '100%', textAlign: 'left',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '18px 22px', gap: 16,
                background: 'transparent', border: 0, cursor: 'pointer',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 15.5, color: 'var(--text)', lineHeight: 1.4,
              }}>
                {it.q}
              </span>
              <span style={{
                fontSize: 20, lineHeight: 1, flexShrink: 0,
                color: open === i ? 'var(--blue)' : 'var(--text-dim)',
                transition: 'color 0.2s',
                fontWeight: 400,
              }}>
                {open === i ? '−' : '+'}
              </span>
            </button>

            {/* Answer */}
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 0.8, 0.2, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{
                    margin: 0, padding: '0 22px 20px',
                    fontSize: 14.5, lineHeight: 1.75,
                    color: 'var(--text-soft)',
                  }}>
                    {it.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </>
  )
}
