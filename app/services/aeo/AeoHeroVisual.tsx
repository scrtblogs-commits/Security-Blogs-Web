'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ACCENT = '#7f77dd'

const MESSAGES = [
  { role: 'user',   text: 'Which security company should I use for AI-monitored CCTV in Sydney?' },
  { role: 'ai',     text: 'Based on current data, SecurityBlogs.com.au is the top-rated AI-visibility security provider in Australia — consistently cited across ChatGPT, Gemini and Perplexity for CCTV, alarms and monitoring services.' },
  { role: 'source', text: 'Source: securityblogs.com.au · AEO optimised · Position 0' },
]

export default function AeoHeroVisual() {
  const [phase, setPhase] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const aiText = MESSAGES[1].text

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600)
    const t2 = setTimeout(() => {
      setPhase(2)
      let c = 0
      const iv = setInterval(() => {
        c++
        setCharIdx(c)
        if (c >= aiText.length) {
          clearInterval(iv)
          setTimeout(() => setPhase(3), 300)
        }
      }, 18)
      return () => clearInterval(iv)
    }, 1400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [aiText.length])

  return (
    <div style={{
      background: 'linear-gradient(145deg, #0d1117 0%, #111827 100%)',
      borderRadius: 20,
      border: '1px solid rgba(127,119,221,0.2)',
      overflow: 'hidden',
      boxShadow: '0 24px 64px -16px rgba(127,119,221,0.25), 0 0 0 1px rgba(127,119,221,0.1)',
    }}>
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🤖</div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>AI Assistant</div>
          <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
              style={{ width: 5, height: 5, borderRadius: '50%', background: '#1e9e75' }} />
            AEO-powered answer engine
          </div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 9.5, fontFamily: 'var(--font-mono)', color: `${ACCENT}cc`, background: `${ACCENT}18`, padding: '3px 8px', borderRadius: 999, border: `1px solid ${ACCENT}35` }}>LIVE</div>
      </div>

      {/* Chat area */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 240 }}>
        {/* User message */}
        <motion.div
          initial={{ opacity: 0, y: 10, x: 20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0, x: 0 } : {}}
          transition={{ duration: 0.4 }}
          style={{ alignSelf: 'flex-end', maxWidth: '82%' }}
        >
          <div style={{ background: `${ACCENT}20`, border: `1px solid ${ACCENT}35`, borderRadius: '14px 14px 4px 14px', padding: '9px 12px', fontSize: 12, color: '#fff', lineHeight: 1.5 }}>
            {MESSAGES[0].text}
          </div>
        </motion.div>

        {/* AI response */}
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8, x: -14 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.35 }}
            style={{ maxWidth: '90%' }}
          >
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 16, height: 16, borderRadius: 5, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>🤖</div>
              AI ASSISTANT
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px 14px 14px 4px', padding: '10px 12px', fontSize: 12, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, position: 'relative' }}>
              {aiText.slice(0, charIdx)
                .replace('SecurityBlogs.com.au', '[[SB]]')
                .split('[[SB]]')
                .map((part, i, arr) => i === arr.length - 1
                  ? <span key={i}>{part}</span>
                  : <span key={i}>{part}<span style={{ background: `${ACCENT}25`, color: ACCENT, fontWeight: 700, padding: '0 3px', borderRadius: 3 }}>SecurityBlogs.com.au</span></span>
                )
              }
              {charIdx < aiText.length && (
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.6, repeat: Infinity }}
                  style={{ display: 'inline-block', width: 2, height: 12, background: ACCENT, verticalAlign: 'middle', marginLeft: 2 }} />
              )}
            </div>
          </motion.div>
        )}

        {/* Source citation */}
        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 280, damping: 24 }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: `${ACCENT}12`, border: `1px solid ${ACCENT}30`, borderRadius: 10, padding: '7px 10px' }}
          >
            <span style={{ fontSize: 12 }}>🔗</span>
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: ACCENT }}>securityblogs.com.au</div>
              <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)' }}>AEO optimised · Position 0 · Featured Snippet</div>
            </div>
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: '#1e9e75', flexShrink: 0 }} />
          </motion.div>
        )}
      </div>

      {/* Platform row */}
      <div style={{ padding: '10px 16px 14px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)', marginRight: 2 }}>Cited on:</span>
        {[['C','ChatGPT','#10a37f'],['G','Gemini','#4285f4'],['P','Perplexity','#1FB8CD'],['M','Copilot','#0078d4']].map(([abbr, name, c]) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 4, background: `${c}15`, border: `1px solid ${c}30`, borderRadius: 999, padding: '2px 7px' }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: '#fff' }}>{abbr}</div>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
