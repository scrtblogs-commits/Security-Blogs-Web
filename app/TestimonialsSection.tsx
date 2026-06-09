'use client'
import { motion } from 'framer-motion'
import SectionHead from '@/components/ui/SectionHead'

type Testimonial = {
  name: string
  role: string
  avatar: string
  text: string
  rating: number
}

export default function TestimonialsSection({ items }: { items: Testimonial[] }) {
  return (
    <section className="section" id="testimonials" style={{ background: '#f5f8ff' }}>
      <div className="container">
        <SectionHead
          eyebrow="Social proof"
          title="Here's what our users say"
          sub="Security brands across AU, US, UK, UAE and SG trust us to make them visible where it counts."
        />

        <div className="grid-3">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 0.8, 0.2, 1] }}
              whileHover={{ y: -5, boxShadow: '0 20px 50px -12px rgba(30,95,224,0.16)' }}
              style={{
                background: '#ffffff',
                border: '1.5px solid rgba(30,95,224,0.13)',
                borderRadius: 20,
                padding: '28px 24px',
                cursor: 'default',
                boxShadow: '0 2px 16px -4px rgba(30,95,224,0.07)',
              }}
            >
              {/* Quote mark */}
              <div style={{
                fontSize: 40, lineHeight: 1, color: 'rgba(30,95,224,0.12)',
                fontFamily: 'Georgia, serif', marginBottom: 8, marginTop: -4,
              }}>
                "
              </div>

              {/* Quote text */}
              <p style={{ fontSize: 14.5, lineHeight: 1.75, color: 'var(--text)', margin: '0 0 20px' }}>
                {t.text}
              </p>

              {/* Stars */}
              <div style={{ display: 'flex', gap: 3, marginBottom: 18 }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} style={{ color: '#f59e0b', fontSize: 13 }}>★</span>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(30,95,224,0.08)', marginBottom: 16 }} />

              {/* Avatar + name */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'rgba(30,95,224,0.07)',
                  border: '1.5px solid rgba(30,95,224,0.15)',
                  color: 'var(--blue)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 13,
                  fontFamily: 'var(--font-display)', flexShrink: 0,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 1 }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
