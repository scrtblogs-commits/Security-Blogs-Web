'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { posts } from '@/lib/posts'

const categories = ['All', 'SEO', 'AIO/AEO', 'GEO', 'Paid Ads', 'Industry']

export default function BlogGrid() {
  const [filter, setFilter] = useState('All')
  const shown = filter === 'All' ? posts : posts.filter((p) => p.category === filter)

  return (
    <div>
      <div className="flex flex-wrap gap-2" style={{ marginBottom: 32 }}>
        {categories.map((c) => (
          <button key={c} className={`pill ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>
      <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.a
              key={p.slug}
              href={`/knowledge-hub/blogs/${p.slug}/`}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="card"
              style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none' }}
            >
              <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
                <span className="chip" style={{ color: 'var(--blue)', borderColor: 'var(--blue)' }}>{p.category}</span>
                <span className="text-dim" style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>
                  {new Date(p.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </div>
              <h3 style={{ fontSize: 18, marginBottom: 8 }}>{p.title}</h3>
              <p className="text-soft" style={{ fontSize: 14, marginBottom: 16, flex: 1 }}>{p.excerpt}</p>
              <div className="flex items-center gap-2" style={{ justifyContent: 'space-between' }}>
                <span className="text-dim" style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>{p.read} read</span>
                <span className="accent" style={{ fontWeight: 600, fontSize: 14 }}>Read →</span>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
