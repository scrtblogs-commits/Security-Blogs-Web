'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const BLUE = '#1e5fe0'

const reachStats = [
  { icon: '👥', val: '38,000+', label: 'Monthly readers' },
  { icon: '🏢', val: '62%', label: 'B2B security decision-makers' },
  { icon: '🔗', val: 'DR 58', label: 'Domain rating' },
  { icon: '📈', val: '+180%', label: 'YoY traffic growth' },
]

const recentPosts = [
  { author: 'Jamie K.', role: 'Security Consultant', title: 'How AI is reshaping access control in 2026', views: '4.2K', time: '2d ago', avatar: 'JK' },
  { author: 'Sarah M.', role: 'CCTV Integrator', title: 'The 7 GBP mistakes costing installers leads', views: '3.8K', time: '5d ago', avatar: 'SM' },
  { author: 'Tom R.', role: 'Cyber Security Lead', title: 'Why your security website is invisible to AI', views: '6.1K', time: '1w ago', avatar: 'TR' },
]

const benefits = [
  { icon: '🔗', label: '2 dofollow backlinks', sub: 'To any relevant page on your site' },
  { icon: '✍️', label: 'Byline + author bio', sub: 'Credited on every article' },
  { icon: '📣', label: 'Social amplification', sub: 'Shared to our LinkedIn + newsletter' },
  { icon: '⚡', label: '3-day editorial review', sub: 'Fast turnaround, clear guidelines' },
]

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = 0
    const step = Math.ceil(target / 40)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setVal(target); clearInterval(timer) }
      else setVal(start)
    }, 30)
    return () => clearInterval(timer)
  }, [target])
  return <>{val.toLocaleString()}{suffix}</>
}

export default function GuestPostHeroVisual() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* ── Reach stat cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {reachStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
            style={{
              background: '#fff',
              borderRadius: 14,
              border: '1px solid #e8edf7',
              boxShadow: '0 2px 16px -4px rgba(18,42,86,0.08)',
              padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 12,
            }}
          >
            <span style={{ fontSize: 22, flexShrink: 0 }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: 17, fontWeight: 900, color: '#0f2244', fontFamily: 'var(--font-mono)', lineHeight: 1.1 }}>{s.val}</div>
              <div style={{ fontSize: 11, color: '#8896af', marginTop: 2 }}>{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Recent guest posts live feed ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{
          background: '#fff', borderRadius: 16,
          border: '1px solid #e8edf7',
          boxShadow: '0 2px 20px -6px rgba(18,42,86,0.09)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid #f0f4f8',
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#f8faff',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#0f2244', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
            LIVE · RECENT GUEST POSTS
          </span>
          <span style={{ marginLeft: 'auto', fontSize: 10, color: BLUE, fontWeight: 600 }}>securityblogs.com.au</span>
        </div>

        {recentPosts.map((post, i) => (
          <motion.div
            key={post.author}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.12 }}
            style={{
              padding: '12px 16px',
              borderBottom: i < recentPosts.length - 1 ? '1px solid #f0f4f8' : 'none',
              display: 'flex', alignItems: 'center', gap: 12,
            }}
          >
            {/* Avatar */}
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              background: `linear-gradient(135deg, ${BLUE}, #6f4dff)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 800, color: '#fff',
            }}>{post.avatar}</div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: '#0f2244', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 3 }}>
                {post.title}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11, color: '#46546e', fontWeight: 600 }}>{post.author}</span>
                <span style={{ fontSize: 10, color: '#b0baca' }}>·</span>
                <span style={{ fontSize: 10, color: '#8896af' }}>{post.role}</span>
              </div>
            </div>

            {/* Right side meta */}
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: BLUE, fontFamily: 'var(--font-mono)' }}>{post.views}</div>
              <div style={{ fontSize: 10, color: '#b0baca' }}>{post.time}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Benefits strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        style={{
          background: `linear-gradient(135deg, ${BLUE}0d 0%, #6f4dff0a 100%)`,
          borderRadius: 14,
          border: `1.5px solid ${BLUE}20`,
          padding: '16px 18px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
        }}
      >
        {benefits.map((b) => (
          <div key={b.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{b.icon}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#0f2244' }}>{b.label}</div>
              <div style={{ fontSize: 10.5, color: '#8896af', marginTop: 1 }}>{b.sub}</div>
            </div>
          </div>
        ))}
      </motion.div>

    </div>
  )
}
