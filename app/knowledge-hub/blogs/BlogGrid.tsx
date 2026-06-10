'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Post = {
  slug: string
  title: string
  cat: string
  date: string
  read: string
  excerpt: string
  featured?: boolean
}

const categories = ['All', 'SEO', 'AIO/AEO', 'GEO', 'Paid Ads', 'Industry']

const posts: Post[] = [
  {
    slug: 'how-chatgpt-decides-which-security-vendor-to-name',
    title: 'How ChatGPT decides which security vendor to name',
    cat: 'AIO/AEO',
    date: 'May 18, 2026',
    read: '8 min',
    excerpt: 'Inside the retrieval signals answer engines weigh when a buyer asks for the best monitoring provider.',
    featured: true,
  },
  {
    slug: 'local-seo-for-alarm-installers-the-2026-checklist',
    title: 'Local SEO for alarm installers: the 2026 checklist',
    cat: 'SEO',
    date: 'May 12, 2026',
    read: '11 min',
    excerpt: 'NAP consistency, service-area pages and review velocity that actually move the local pack.',
  },
  {
    slug: 'building-entity-authority-so-ai-trusts-your-brand',
    title: 'Building entity authority so AI trusts your brand',
    cat: 'GEO',
    date: 'May 9, 2026',
    read: '9 min',
    excerpt: 'Why knowledge-graph presence now outweighs raw backlinks when AI engines decide who to cite.',
  },
  {
    slug: 'google-ads-for-security-buyers-that-convert',
    title: 'Google Ads for security buyers that convert',
    cat: 'Paid Ads',
    date: 'May 4, 2026',
    read: '7 min',
    excerpt: 'High-intent keyword themes, negative lists and landing pages tuned for B2B security demand.',
  },
  {
    slug: 'becoming-the-featured-answer-in-ai-overviews',
    title: 'Becoming the featured answer in AI Overviews',
    cat: 'AIO/AEO',
    date: 'Apr 28, 2026',
    read: '10 min',
    excerpt: 'Structuring content so Google AI Overviews and Perplexity quote you instead of a competitor.',
  },
  {
    slug: 'technical-seo-audit-for-security-websites',
    title: 'Technical SEO audit for security websites',
    cat: 'SEO',
    date: 'Apr 21, 2026',
    read: '12 min',
    excerpt: 'Crawl health, Core Web Vitals and indexation issues that quietly cap your rankings.',
  },
  {
    slug: 'q2-access-control-acquisitions-and-what-they-mean',
    title: 'Q2 access-control acquisitions and what they mean',
    cat: 'Industry',
    date: 'Apr 15, 2026',
    read: '6 min',
    excerpt: 'Consolidation continues as platform vendors absorb cloud-native access startups.',
  },
  {
    slug: 'bing-ads-capturing-the-41-percent-buyers-miss',
    title: 'Bing Ads: capturing the 41% buyers miss',
    cat: 'Paid Ads',
    date: 'Apr 8, 2026',
    read: '6 min',
    excerpt: 'How to extend qualified security demand into the Microsoft ad network at lower CPCs.',
  },
  {
    slug: 'geo-vs-seo-what-changed-in-2026',
    title: 'GEO vs SEO: what changed in 2026',
    cat: 'GEO',
    date: 'Apr 1, 2026',
    read: '9 min',
    excerpt: 'Generative engine optimisation is now a discipline of its own. Here is the practical difference.',
  },
]

const CAT_META: Record<string, { color: string; bg: string; dot: string }> = {
  'SEO':     { color: '#1e9e75', bg: '#1e9e7512', dot: '#1e9e75' },
  'AIO/AEO': { color: '#6f4dff', bg: '#6f4dff12', dot: '#6f4dff' },
  'GEO':     { color: '#e23744', bg: '#e2374412', dot: '#e23744' },
  'Paid Ads':{ color: '#d4900a', bg: '#f6c71514', dot: '#f6c715' },
  'Industry':{ color: '#1e5fe0', bg: '#1e5fe012', dot: '#1e5fe0' },
}

function postHref(slug: string) {
  return `/knowledge-hub/blog/${slug}/`
}

// ── Featured card (full-width, top of list) ──────────────────────────────────
function FeaturedCard({ post }: { post: Post }) {
  const meta = CAT_META[post.cat] ?? CAT_META['Industry']
  return (
    <motion.a
      href={postHref(post.slug)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 0.8, 0.2, 1] }}
      whileHover={{ y: -4 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        borderRadius: 20,
        overflow: 'hidden',
        background: '#ffffff',
        boxShadow: '0 4px 32px -8px rgba(18,42,86,0.13), 0 0 0 1px rgba(18,42,86,0.07)',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease',
        marginBottom: 28,
      }}
    >
      {/* Left: content */}
      <div style={{ padding: '40px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <span style={{
            background: meta.bg, color: meta.color, border: `1px solid ${meta.color}30`,
            borderRadius: 999, padding: '4px 12px', fontSize: 11.5, fontWeight: 700, letterSpacing: '0.04em',
          }}>{post.cat}</span>
          <span style={{ fontSize: 12, color: '#8896af', fontFamily: 'var(--font-mono)' }}>{post.date}</span>
          <span style={{ fontSize: 12, color: '#8896af', fontFamily: 'var(--font-mono)' }}>· {post.read} read</span>
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f2244', lineHeight: 1.3, marginBottom: 14, letterSpacing: '-0.02em' }}>
          {post.title}
        </h2>
        <p style={{ fontSize: 14.5, color: '#46546e', lineHeight: 1.7, marginBottom: 24 }}>{post.excerpt}</p>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: meta.color, color: '#fff',
          fontWeight: 700, fontSize: 13, padding: '9px 20px', borderRadius: 10,
          alignSelf: 'flex-start', boxShadow: `0 4px 14px -4px ${meta.color}55`,
        }}>
          Read article →
        </span>
      </div>

      {/* Right: decorative panel */}
      <div style={{
        background: `linear-gradient(135deg, ${meta.bg} 0%, ${meta.color}08 100%)`,
        borderLeft: `1px solid ${meta.color}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden', minHeight: 260,
      }}>
        {/* Large decorative letter */}
        <div style={{
          fontSize: 160, fontWeight: 900, lineHeight: 1,
          color: `${meta.color}10`, userSelect: 'none',
          fontFamily: 'var(--font-display)',
          position: 'absolute',
        }}>
          {post.cat.charAt(0)}
        </div>
        {/* Stat pill */}
        <div style={{
          position: 'relative', zIndex: 1,
          background: '#fff', borderRadius: 16,
          padding: '20px 28px', textAlign: 'center',
          boxShadow: `0 8px 32px -8px ${meta.color}30`,
          border: `1px solid ${meta.color}20`,
        }}>
          <div style={{ fontSize: 11, color: meta.color, fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Latest post</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#0f2244', letterSpacing: '-0.03em' }}>{post.read}</div>
          <div style={{ fontSize: 12, color: '#8896af', marginTop: 2 }}>read time</div>
        </div>
      </div>
    </motion.a>
  )
}

// ── Regular card ──────────────────────────────────────────────────────────────
function PostCard({ post, index }: { post: Post; index: number }) {
  const meta = CAT_META[post.cat] ?? CAT_META['Industry']
  return (
    <motion.a
      href={postHref(post.slug)}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 0.8, 0.2, 1] }}
      whileHover={{ y: -5, boxShadow: `0 20px 48px -12px ${meta.color}28, 0 0 0 1.5px ${meta.color}22` }}
      style={{
        display: 'flex', flexDirection: 'column',
        background: '#ffffff',
        borderRadius: 18,
        overflow: 'hidden',
        textDecoration: 'none',
        boxShadow: '0 2px 20px -6px rgba(18,42,86,0.10), 0 0 0 1px rgba(18,42,86,0.06)',
        transition: 'box-shadow 0.3s ease',
        cursor: 'pointer',
      }}
    >
      {/* Accent top bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)` }} />

      <div style={{ padding: '24px 24px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{
            background: meta.bg, color: meta.color, border: `1px solid ${meta.color}28`,
            borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
          }}>{post.cat}</span>
          <span style={{ fontSize: 11.5, color: '#a0adc0', fontFamily: 'var(--font-mono)' }}>{post.date}</span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f2244', lineHeight: 1.4, marginBottom: 10, letterSpacing: '-0.01em' }}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p style={{ fontSize: 13.5, color: '#5e6e8a', lineHeight: 1.65, flex: 1, marginBottom: 20 }}>
          {post.excerpt}
        </p>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f0f2f7', paddingTop: 14 }}>
          <span style={{ fontSize: 12, color: '#a0adc0', fontFamily: 'var(--font-mono)' }}>{post.read} read</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: meta.color, display: 'flex', alignItems: 'center', gap: 4 }}>
            Read →
          </span>
        </div>
      </div>
    </motion.a>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function BlogGrid() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? posts : posts.filter((p) => p.cat === filter)
  const featured = filter === 'All' ? filtered.find((p) => p.featured) : null
  const grid = featured ? filtered.filter((p) => !p.featured) : filtered

  return (
    <div>
      {/* Category filter pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
        {categories.map((c) => {
          const active = filter === c
          const meta = CAT_META[c]
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                padding: '7px 18px',
                borderRadius: 999,
                border: active && meta ? `1.5px solid ${meta.color}` : '1.5px solid rgba(18,42,86,0.12)',
                background: active && meta ? meta.bg : '#fff',
                color: active && meta ? meta.color : active ? '#0f2244' : '#6b7a99',
                fontWeight: active ? 700 : 500,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.01em',
              }}
            >
              {c}
            </button>
          )
        })}
      </div>

      {/* Featured card */}
      {featured && <FeaturedCard post={featured} />}

      {/* Grid */}
      <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 22 }}>
        <AnimatePresence mode="popLayout">
          {grid.map((p, i) => (
            <PostCard key={p.slug} post={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
