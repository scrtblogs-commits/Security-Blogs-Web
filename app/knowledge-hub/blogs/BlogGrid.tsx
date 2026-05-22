'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Post = { title: string; cat: string; date: string; read: string; excerpt: string }

const categories = ['All', 'SEO', 'AIO/AEO', 'GEO', 'Paid Ads', 'Industry']

const posts: Post[] = [
  { title: 'How ChatGPT decides which security vendor to name', cat: 'AIO/AEO', date: 'May 18, 2026', read: '8 min', excerpt: 'Inside the retrieval signals answer engines weigh when a buyer asks for the best monitoring provider.' },
  { title: 'Local SEO for alarm installers: the 2026 checklist', cat: 'SEO', date: 'May 12, 2026', read: '11 min', excerpt: 'NAP consistency, service-area pages and review velocity that actually move the local pack.' },
  { title: 'Building entity authority so AI trusts your brand', cat: 'GEO', date: 'May 9, 2026', read: '9 min', excerpt: 'Why knowledge-graph presence now outweighs raw backlinks when AI engines decide who to cite.' },
  { title: 'Google Ads for security buyers that convert', cat: 'Paid Ads', date: 'May 4, 2026', read: '7 min', excerpt: 'High-intent keyword themes, negative lists and landing pages tuned for B2B security demand.' },
  { title: 'Becoming the featured answer in AI Overviews', cat: 'AIO/AEO', date: 'Apr 28, 2026', read: '10 min', excerpt: 'Structuring content so Google AI Overviews and Perplexity quote you instead of a competitor.' },
  { title: 'Technical SEO audit for security websites', cat: 'SEO', date: 'Apr 21, 2026', read: '12 min', excerpt: 'Crawl health, Core Web Vitals and indexation issues that quietly cap your rankings.' },
  { title: 'Q2 access-control acquisitions and what they mean', cat: 'Industry', date: 'Apr 15, 2026', read: '6 min', excerpt: 'Consolidation continues as platform vendors absorb cloud-native access startups.' },
  { title: 'Bing Ads: capturing the 41% buyers miss', cat: 'Paid Ads', date: 'Apr 8, 2026', read: '6 min', excerpt: 'How to extend qualified security demand into the Microsoft ad network at lower CPCs.' },
  { title: 'GEO vs SEO: what changed in 2026', cat: 'GEO', date: 'Apr 1, 2026', read: '9 min', excerpt: 'Generative engine optimisation is now a discipline of its own. Here is the practical difference.' },
]

const catColor: Record<string, string> = {
  'SEO': 'var(--green)', 'AIO/AEO': 'var(--violet)', 'GEO': 'var(--red)', 'Paid Ads': 'var(--yellow)', 'Industry': 'var(--blue)',
}

export default function BlogGrid() {
  const [filter, setFilter] = useState('All')
  const shown = filter === 'All' ? posts : posts.filter((p) => p.cat === filter)

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
              key={p.title}
              href="#"
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="card"
              style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none' }}
            >
              <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
                <span className="chip" style={{ color: catColor[p.cat], borderColor: catColor[p.cat] }}>{p.cat}</span>
                <span className="text-dim" style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>{p.date}</span>
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
