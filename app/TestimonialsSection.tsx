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
    <section
      className="section"
      id="testimonials"
      style={{ background: 'var(--bg-soft)' }}
    >
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
              className="card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 0.8, 0.2, 1] }}
              whileHover={{ y: -6, boxShadow: '0 24px 56px -16px rgba(30,95,224,0.22)' }}
              style={{ cursor: 'default' }}
            >
              {/* Avatar + name */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--blue), var(--violet))',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 13,
                    fontFamily: 'var(--font-display)',
                    flexShrink: 0,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, fontFamily: 'var(--font-display)' }}>
                    {t.name}
                  </div>
                  <div className="text-dim" style={{ fontSize: 12.5 }}>{t.role}</div>
                </div>
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} style={{ color: 'var(--yellow)', fontSize: 15 }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-soft" style={{ fontSize: 14.5, lineHeight: 1.7 }}>
                &ldquo;{t.text}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
