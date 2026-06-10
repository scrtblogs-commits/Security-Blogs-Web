'use client'
import { useState } from 'react'

const ICONS: Record<number, string> = {
  0: '✍️', 1: '🎯', 2: '📐', 3: '🔗', 4: '🔎', 5: '🚫', 6: '📄', 7: '✅',
}

export default function GuidelinesAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div
            key={i}
            style={{
              background: '#ffffff',
              border: `1.5px solid ${isOpen ? 'rgba(30,95,224,0.30)' : 'rgba(18,42,86,0.10)'}`,
              borderRadius: 14,
              overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: '100%', textAlign: 'left',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '17px 22px', gap: 16,
                background: isOpen ? 'rgba(30,95,224,0.03)' : 'transparent',
                border: 0, cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: isOpen ? '#eff4ff' : '#f3f4f6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 17, transition: 'background 0.2s',
                }}>
                  {ICONS[i] ?? '📌'}
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)', fontWeight: 600,
                  fontSize: 15.5, color: isOpen ? 'var(--blue)' : 'var(--text)',
                  lineHeight: 1.4, transition: 'color 0.2s',
                }}>
                  {item.q}
                </span>
              </div>
              <span style={{
                fontSize: 20, lineHeight: 1, flexShrink: 0,
                color: isOpen ? 'var(--blue)' : 'var(--text-dim)',
                transition: 'color 0.2s, transform 0.2s',
                transform: isOpen ? 'rotate(45deg)' : 'none',
                display: 'inline-block',
                fontWeight: 300,
              }}>
                +
              </span>
            </button>

            {/* Answer — CSS height transition, no Framer Motion needed */}
            <div style={{
              maxHeight: isOpen ? 400 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.3s cubic-bezier(0.22,0.8,0.2,1)',
            }}>
              <p style={{
                margin: 0, padding: '2px 22px 20px 70px',
                fontSize: 14.5, lineHeight: 1.75,
                color: 'var(--text-soft)',
              }}>
                {item.a}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
