'use client'
import React from 'react'
import { motion } from 'framer-motion'

const ACCENT = '#1e9e75'

/* ── Mini Search Console graph ── */
function SearchConsoleWidget() {
  const bars = [42, 55, 48, 63, 71, 68, 85, 79, 92, 88, 96, 100]
  const clicks = [18, 24, 21, 30, 35, 33, 44, 40, 51, 48, 55, 60]
  return (
    <div style={{
      background: '#fff', borderRadius: 14, border: '1px solid #e8edf7',
      boxShadow: '0 2px 16px -4px rgba(18,42,86,0.08)', padding: '18px 20px',
      minWidth: 0,
    }}>
      {/* Header bar mimicking GSC */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: '#4285f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 800 }}>G</span>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0f2244' }}>Search Console</div>
          <div style={{ fontSize: 10, color: '#8896af', fontFamily: 'var(--font-mono)' }}>securityblogs.com.au</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 10, color: '#34a853', fontWeight: 700, background: '#34a85314', border: '1px solid #34a85330', padding: '2px 8px', borderRadius: 999 }}>
          LIVE
        </div>
      </div>

      {/* Metric pills */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
        {[
          { label: 'Total clicks', val: '4,280', delta: '+38%', color: '#4285f4' },
          { label: 'Impressions', val: '42.1K', delta: '+61%', color: '#34a853' },
          { label: 'Avg. CTR', val: '8.4%', delta: '+2.1pp', color: ACCENT },
          { label: 'Avg. position', val: '3.2', delta: '↑ 4.8', color: '#fa7b17' },
        ].map((m) => (
          <div key={m.label} style={{ background: '#f8faff', borderRadius: 9, padding: '8px 10px' }}>
            <div style={{ fontSize: 9.5, color: '#8896af', marginBottom: 3 }}>{m.label}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#0f2244', fontFamily: 'var(--font-mono)' }}>{m.val}</div>
            <div style={{ fontSize: 9.5, color: '#34a853', fontWeight: 700 }}>{m.delta}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ fontSize: 9.5, color: '#8896af', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>CLICKS vs IMPRESSIONS · 12 weeks</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 52 }}>
        {bars.map((imp, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, height: '100%', justifyContent: 'flex-end' }}>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${imp}%` }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: 'easeOut' }}
              style={{ width: '100%', background: '#4285f420', borderRadius: '3px 3px 0 0' }}
            />
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${clicks[i]}%` }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.04, ease: 'easeOut' }}
              style={{ width: '100%', background: ACCENT, borderRadius: '3px 3px 0 0', marginTop: -4, position: 'relative' }}
            />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <span style={{ fontSize: 9, color: '#4285f4', display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, background: '#4285f420', borderRadius: 2, display: 'inline-block' }}/>Impressions</span>
        <span style={{ fontSize: 9, color: ACCENT, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, background: ACCENT, borderRadius: 2, display: 'inline-block' }}/>Clicks</span>
      </div>
    </div>
  )
}

/* ── Tag Manager widget ── */
function TagManagerWidget() {
  const tags = [
    { name: 'GA4 — Page View', status: 'firing', color: '#34a853' },
    { name: 'Conversion — Lead Form', status: 'firing', color: '#34a853' },
    { name: 'GTM — Scroll Depth 75%', status: 'paused', color: '#fa7b17' },
    { name: 'Phone Click Tracking', status: 'firing', color: '#34a853' },
    { name: 'Chat Widget Trigger', status: 'firing', color: '#34a853' },
  ]
  return (
    <div style={{
      background: '#fff', borderRadius: 14, border: '1px solid #e8edf7',
      boxShadow: '0 2px 16px -4px rgba(18,42,86,0.08)', padding: '18px 20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: '#4285f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 11, fontWeight: 900 }}>GTM</span>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0f2244' }}>Tag Manager</div>
          <div style={{ fontSize: 10, color: '#8896af', fontFamily: 'var(--font-mono)' }}>Container: GTM-XXXXXXX</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 10, color: '#0f2244', fontFamily: 'var(--font-mono)', background: '#f0f4ff', border: '1px solid #dce4f5', padding: '2px 8px', borderRadius: 999 }}>
          v8 · Published
        </div>
      </div>
      <div style={{ fontSize: 9.5, color: '#8896af', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>ACTIVE TAGS</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {tags.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: '#f8faff', borderRadius: 8, padding: '7px 10px',
              border: '1px solid #edf0f7',
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: t.color, flexShrink: 0 }} />
            <span style={{ fontSize: 11.5, color: '#2d3a52', flex: 1 }}>{t.name}</span>
            <span style={{ fontSize: 9.5, color: t.color, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{t.status.toUpperCase()}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── GA4 conversion widget ── */
function AnalyticsWidget() {
  const events = [
    { name: 'form_submit', count: 184, change: '+46' },
    { name: 'phone_click', count: 97, change: '+22' },
    { name: 'chat_open', count: 312, change: '+88' },
    { name: 'cta_click', count: 541, change: '+134' },
  ]
  return (
    <div style={{
      background: '#fff', borderRadius: 14, border: '1px solid #e8edf7',
      boxShadow: '0 2px 16px -4px rgba(18,42,86,0.08)', padding: '18px 20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#fa7b17,#f4b400)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 11, fontWeight: 900 }}>GA4</span>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0f2244' }}>Analytics · Conversions</div>
          <div style={{ fontSize: 10, color: '#8896af', fontFamily: 'var(--font-mono)' }}>Last 30 days</div>
        </div>
      </div>
      <div style={{ fontSize: 9.5, color: '#8896af', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>KEY EVENTS</div>
      {events.map((e, i) => (
        <div key={e.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#46546e', flex: 1 }}>{e.name}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(e.count / 541) * 80}px` }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{ height: 6, background: ACCENT, borderRadius: 3, opacity: 0.7 }}
            />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#0f2244', fontFamily: 'var(--font-mono)', minWidth: 28 }}>{e.count}</span>
            <span style={{ fontSize: 10, color: '#34a853', fontWeight: 700 }}>+{e.change}</span>
          </div>
        </div>
      ))}
      {/* Funnel mini-chart */}
      <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #e8edf7' }}>
        <div style={{ fontSize: 9.5, color: '#8896af', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>CONVERSION FUNNEL</div>
        {[{ s: 'Organic visit', n: '4,280', w: 100 }, { s: 'Page engaged', n: '2,610', w: 61 }, { s: 'CTA clicked', n: '541', w: 26 }, { s: 'Lead converted', n: '184', w: 14 }].map((f) => (
          <div key={f.s} style={{ marginBottom: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <span style={{ fontSize: 10, color: '#46546e' }}>{f.s}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#0f2244', fontFamily: 'var(--font-mono)' }}>{f.n}</span>
            </div>
            <div style={{ height: 5, background: '#f0f4ff', borderRadius: 3, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${f.w}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ height: '100%', background: ACCENT, borderRadius: 3 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Keyword performance table ── */
function KeywordPerformanceWidget() {
  const kws = [
    { kw: 'CCTV installation Sydney', pos: 1, clicks: 312, imp: '8.1K' },
    { kw: 'commercial security cameras', pos: 2, clicks: 218, imp: '5.4K' },
    { kw: 'access control Melbourne', pos: 1, clicks: 184, imp: '4.2K' },
    { kw: 'security alarm monitoring', pos: 3, clicks: 142, imp: '6.8K' },
    { kw: 'CCTV installer Brisbane', pos: 2, clicks: 96, imp: '2.9K' },
  ]
  return (
    <div style={{
      background: '#fff', borderRadius: 14, border: '1px solid #e8edf7',
      boxShadow: '0 2px 16px -4px rgba(18,42,86,0.08)', padding: '18px 20px',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#0f2244', marginBottom: 4 }}>Keyword Performance</div>
      <div style={{ fontSize: 10, color: '#8896af', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>TOP TRACKED KEYWORDS · LIVE POSITIONS</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 50px 50px', gap: '6px 8px', alignItems: 'center' }}>
        <span style={{ fontSize: 9.5, color: '#8896af', fontFamily: 'var(--font-mono)' }}>KEYWORD</span>
        <span style={{ fontSize: 9.5, color: '#8896af', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>POS</span>
        <span style={{ fontSize: 9.5, color: '#8896af', fontFamily: 'var(--font-mono)', textAlign: 'right' }}>CLICKS</span>
        <span style={{ fontSize: 9.5, color: '#8896af', fontFamily: 'var(--font-mono)', textAlign: 'right' }}>IMP</span>
        {kws.map((k, i) => (
          <React.Fragment key={k.kw}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.07 }}
              style={{ fontSize: 11, color: '#2d3a52', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >{k.kw}</motion.span>
            <span style={{
              textAlign: 'center', fontSize: 11, fontWeight: 800,
              color: k.pos === 1 ? '#34a853' : k.pos === 2 ? ACCENT : '#fa7b17',
              fontFamily: 'var(--font-mono)',
              background: k.pos === 1 ? '#34a85314' : k.pos === 2 ? `${ACCENT}14` : '#fa7b1714',
              borderRadius: 5, padding: '2px 0',
            }}>#{k.pos}</span>
            <span style={{ textAlign: 'right', fontSize: 11, color: '#0f2244', fontFamily: 'var(--font-mono)' }}>{k.clicks}</span>
            <span style={{ textAlign: 'right', fontSize: 11, color: '#8896af', fontFamily: 'var(--font-mono)' }}>{k.imp}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

/* ── Main export ── */
export default function SeoTrackingDashboard() {
  const tools = [
    { icon: '📊', label: 'Search Console', desc: 'Track keywords, clicks and impressions' },
    { icon: '🏷️', label: 'Tag Manager', desc: 'Set up conversion and event tracking' },
    { icon: '📈', label: 'Google Analytics', desc: 'Monitor traffic, behaviour and goals' },
    { icon: '🎯', label: 'Conversion Tracking', desc: 'Measure leads, calls and form fills' },
  ]

  return (
    <section style={{ background: '#f8faff', padding: '72px 0' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: ACCENT, fontWeight: 700,
            display: 'block', marginBottom: 14,
          }}>Performance Tracking</span>
          <h2 style={{
            fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 900,
            color: '#0f2244', letterSpacing: '-0.025em', lineHeight: 1.25,
            marginBottom: 16, maxWidth: 680, margin: '0 auto 16px',
          }}>
            We set up, connect and monitor every Google tool — so you can see exactly what's working.
          </h2>
          <p style={{
            fontSize: 16, color: '#46546e', lineHeight: 1.7,
            maxWidth: 600, margin: '0 auto',
          }}>
            From Google Search Console to Tag Manager and GA4 — we handle the full tracking setup so your security business has clear data on traffic, keywords, conversions and ROI.
          </p>
        </div>

        {/* Tool capability pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 56 }}>
          {tools.map((t) => (
            <motion.div
              key={t.label}
              whileHover={{ y: -3 }}
              style={{
                background: '#fff', borderRadius: 12,
                border: '1px solid #e8edf7',
                boxShadow: '0 2px 12px -4px rgba(18,42,86,0.07)',
                padding: '14px 20px',
                display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <span style={{ fontSize: 22 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f2244' }}>{t.label}</div>
                <div style={{ fontSize: 11.5, color: '#8896af' }}>{t.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dashboard grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SearchConsoleWidget />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TagManagerWidget />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnalyticsWidget />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <KeywordPerformanceWidget />
          </motion.div>
        </div>

        {/* Bottom callout strip */}
        <div style={{
          marginTop: 40, padding: '24px 32px', borderRadius: 16,
          background: `linear-gradient(135deg, ${ACCENT}0d 0%, #1e5fe008 100%)`,
          border: `1.5px solid ${ACCENT}22`,
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#0f2244', marginBottom: 4 }}>
              Blind spots in your tracking? We'll fix them.
            </div>
            <div style={{ fontSize: 14, color: '#46546e', lineHeight: 1.6 }}>
              Most security websites are missing conversion events, have broken GA4 setups or have never connected Search Console. We audit, rebuild and verify every layer.
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {['GSC connected', 'GA4 configured', 'GTM firing', 'Conversions tracked'].map((b) => (
              <span key={b} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#2d3a52', fontWeight: 600 }}>
                <span style={{ color: ACCENT, fontWeight: 800 }}>✓</span> {b}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
