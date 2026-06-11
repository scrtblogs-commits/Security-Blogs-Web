'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ServiceWorkflowCards, { type WorkflowStep } from '@/components/ui/ServiceWorkflowCards'

const C = {
  sky:     '#38bdf8',
  blue:    '#0ea5e9',
  cyan:    '#06b6d4',
  teal:    '#14b8a6',
  emerald: '#10b981',
  navy:    '#0c1929',
  mid:     '#0e2a45',
  lite:    '#bae6fd',
}

/* ─────────────────────────────────────────────
   SCENE 1 – Discovery & UX Strategy
   Full-bleed animated sitemap + funnel
───────────────────────────────────────────── */
function Scene1({ active }: { active: boolean; color: string }) {
  const nodes = [
    { x:50, y:11, label:'Home',     main:true },
    { x:22, y:35, label:'Services' },
    { x:78, y:35, label:'About' },
    { x:10, y:60, label:'CCTV' },
    { x:35, y:60, label:'Alarms' },
    { x:65, y:60, label:'Blog' },
    { x:90, y:60, label:'Contact' },
  ]
  const edges:number[][] = [[50,11,22,35],[50,11,78,35],[22,35,10,60],[22,35,35,60],[78,35,65,60],[78,35,90,60]]
  const stages = [
    { l:'Awareness', pct:100 },
    { l:'Research',  pct:62 },
    { l:'Decision',  pct:34 },
    { l:'Convert',   pct:18 },
  ]
  const [pulse, setPulse] = useState(0)
  useEffect(() => {
    if (!active) return
    const iv = setInterval(() => setPulse(p => (p + 1) % edges.length), 500)
    return () => clearInterval(iv)
  }, [active])

  return (
    <div style={{ position:'absolute', inset:0, background:`linear-gradient(140deg, ${C.navy} 0%, #0a2540 50%, #082030 100%)`, overflow:'hidden', display:'flex', gap:0 }}>
      {/* Left: sitemap */}
      <div style={{ flex:'0 0 58%', position:'relative', padding:'18px 10px 18px 16px' }}>
        <div style={{ fontSize:7.5, color:C.sky, fontWeight:800, letterSpacing:'0.14em', fontFamily:'var(--font-mono)', marginBottom:8, opacity:0.9 }}>SITEMAP ARCHITECTURE</div>
        <svg viewBox="0 0 100 76" style={{ width:'100%', height:'calc(100% - 28px)' }}>
          <defs>
            <linearGradient id="eg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={C.blue} /><stop offset="100%" stopColor={C.cyan} /></linearGradient>
            <filter id="glow1"><feGaussianBlur stdDeviation="1.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          {edges.map(([x1,y1,x2,y2],i) => (
            <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={pulse === i ? C.sky : `${C.blue}50`} strokeWidth={pulse === i ? '1.2' : '0.6'}
              strokeDasharray={pulse === i ? 'none' : '2 1.5'}
              animate={{ opacity: active ? 1 : 0.15 }}
              transition={{ duration:0.3, delay:i*0.06 }}
              style={{ filter: pulse===i ? `drop-shadow(0 0 3px ${C.sky})` : 'none' }} />
          ))}
          {nodes.map((n,i) => (
            <g key={i} filter={n.main ? 'url(#glow1)' : undefined}>
              <motion.rect x={n.x-9} y={n.y-4.5} width="18" height="9" rx="2.5"
                fill={n.main ? C.blue : `${C.cyan}20`}
                stroke={n.main ? C.sky : `${C.blue}60`}
                strokeWidth={n.main ? '0' : '0.5'}
                animate={{ opacity: active ? 1 : 0.2, scale: active && n.main ? [1,1.07,1] : 1 }}
                transition={{ duration:0.4, delay:i*0.07, repeat: active && n.main ? Infinity : 0, repeatDelay:2 }} />
              <text x={n.x} y={n.y+1.8} fontSize="2.8" fill={n.main ? '#fff' : C.sky} textAnchor="middle" fontFamily="system-ui" fontWeight="700" opacity={0.9}>{n.label}</text>
            </g>
          ))}
        </svg>
      </div>
      {/* Right: funnel */}
      <div style={{ flex:'0 0 42%', padding:'18px 14px 18px 6px', display:'flex', flexDirection:'column', justifyContent:'flex-start', gap:6 }}>
        <div style={{ fontSize:7.5, color:C.cyan, fontWeight:800, letterSpacing:'0.14em', fontFamily:'var(--font-mono)', marginBottom:4, opacity:0.9 }}>BUYER JOURNEY</div>
        {stages.map((s,i) => (
          <div key={s.l} style={{ display:'flex', flexDirection:'column', gap:3 }}>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <span style={{ fontSize:8.5, color:C.lite, fontWeight:600 }}>{s.l}</span>
              <span style={{ fontSize:8.5, color:C.sky, fontWeight:800, fontFamily:'var(--font-mono)' }}>{s.pct}%</span>
            </div>
            <div style={{ height:10, background:`${C.blue}20`, borderRadius:5, overflow:'hidden', border:`1px solid ${C.blue}30` }}>
              <motion.div
                initial={{ width:0 }}
                animate={{ width: active ? `${s.pct}%` : '0%' }}
                transition={{ duration:0.7, delay: 0.15+i*0.12, ease:'easeOut' }}
                style={{ height:'100%', background:`linear-gradient(90deg, ${C.blue}, ${C.cyan})`, borderRadius:5, boxShadow:`0 0 8px ${C.cyan}60` }} />
            </div>
          </div>
        ))}
        <motion.div
          animate={{ opacity: active ? 1 : 0.3, y: active ? 0 : 6 }}
          transition={{ delay:0.6 }}
          style={{ marginTop:8, background:`${C.blue}18`, border:`1px solid ${C.cyan}40`, borderRadius:10, padding:'8px 10px' }}>
          <div style={{ fontSize:8, color:C.sky, fontWeight:800, marginBottom:4, letterSpacing:'0.1em' }}>PRIORITY KEYWORDS</div>
          {['cctv installer sydney', 'security cameras nsw', 'alarm monitoring'].map((kw,i) => (
            <motion.div key={kw}
              animate={{ opacity: active ? 1 : 0.2, x: active ? 0 : -6 }}
              transition={{ delay:0.55+i*0.08 }}
              style={{ fontSize:8.5, color:`${C.lite}90`, paddingBottom:3, borderBottom: i<2 ? `1px solid ${C.blue}20` : 'none', marginBottom: i<2 ? 3 : 0 }}>
              🔍 {kw}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SCENE 2 – Design & Brand System
   Full live browser build with color system
───────────────────────────────────────────── */
function Scene2({ active }: { active: boolean; color: string }) {
  const [blockIdx, setBlockIdx] = useState(-1)
  const [typeW, setTypeW] = useState(0)
  useEffect(() => {
    if (!active) { setBlockIdx(-1); setTypeW(0); return }
    let b = -1
    const biv = setInterval(() => { b++; setBlockIdx(b); if (b >= 5) clearInterval(biv) }, 280)
    const tiv = setInterval(() => setTypeW(w => w < 100 ? w + 3 : w), 28)
    return () => { clearInterval(biv); clearInterval(tiv) }
  }, [active])

  const palette = [
    { c:'#0ea5e9', n:'Primary' },
    { c:'#06b6d4', n:'Cyan' },
    { c:'#38bdf8', n:'Sky' },
    { c:'#14b8a6', n:'Teal' },
    { c:'#10b981', n:'Green' },
  ]

  return (
    <div style={{ position:'absolute', inset:0, background:`linear-gradient(140deg, ${C.navy} 0%, #061e35 100%)`, overflow:'hidden', display:'flex', gap:0 }}>
      {/* Left: browser frame */}
      <div style={{ flex:'0 0 56%', padding:'14px 8px 14px 14px', display:'flex', flexDirection:'column' }}>
        <div style={{ fontSize:7.5, color:C.blue, fontWeight:800, letterSpacing:'0.14em', fontFamily:'var(--font-mono)', marginBottom:8, opacity:0.9 }}>LIVE BROWSER PREVIEW</div>
        <div style={{ flex:1, background:'#fff', borderRadius:10, overflow:'hidden', border:`1.5px solid ${C.blue}40`, boxShadow:`0 4px 24px ${C.blue}25`, display:'flex', flexDirection:'column' }}>
          {/* Chrome bar */}
          <div style={{ background:`linear-gradient(90deg, #0f2244, #1a3a5c)`, padding:'5px 8px', display:'flex', alignItems:'center', gap:5 }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width:6,height:6,borderRadius:'50%',background:c }} />)}
            <div style={{ flex:1, background:'rgba(255,255,255,0.12)', borderRadius:10, padding:'2px 8px', fontSize:8, color:'rgba(255,255,255,0.6)', fontFamily:'var(--font-mono)' }}>
              securityblogs.com.au
            </div>
          </div>
          {/* Hero */}
          <div style={{ background:`linear-gradient(135deg, #0f2244, #0a1f3a)`, padding:'10px 12px', flex:1 }}>
            {blockIdx >= 0 && <motion.div initial={{ scaleX:0, originX:0 }} animate={{ scaleX:1 }} transition={{ duration:0.4 }} style={{ height:9, background:`linear-gradient(90deg, ${C.blue}, ${C.cyan})`, borderRadius:4, marginBottom:6, width:'70%', boxShadow:`0 0 10px ${C.blue}60` }} />}
            {blockIdx >= 1 && <motion.div initial={{ scaleX:0, originX:0 }} animate={{ scaleX:1 }} transition={{ duration:0.35 }} style={{ height:6, background:`${C.sky}50`, borderRadius:3, marginBottom:10, width:'48%' }} />}
            {blockIdx >= 2 && (
              <motion.div initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} style={{ display:'flex', gap:6, marginBottom:8 }}>
                <div style={{ background:`linear-gradient(90deg, ${C.blue}, ${C.cyan})`, borderRadius:5, padding:'4px 12px', fontSize:9, color:'#fff', fontWeight:800, boxShadow:`0 2px 10px ${C.blue}50` }}>Get Quote</div>
                <div style={{ background:'rgba(255,255,255,0.1)', borderRadius:5, padding:'4px 12px', fontSize:9, color:'rgba(255,255,255,0.8)', fontWeight:600, border:'1px solid rgba(255,255,255,0.18)' }}>Learn More</div>
              </motion.div>
            )}
            {blockIdx >= 3 && (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ display:'flex', gap:4 }}>
                {['CCTV','Access','Alarms','AI'].map(t => (
                  <div key={t} style={{ background:`${C.cyan}25`, borderRadius:99, padding:'2px 8px', fontSize:8, color:C.sky, fontWeight:600, border:`1px solid ${C.cyan}30` }}>{t}</div>
                ))}
              </motion.div>
            )}
            {blockIdx >= 4 && (
              <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }} style={{ marginTop:8, background:`${C.blue}18`, borderRadius:6, padding:'6px 8px' }}>
                <div style={{ height:5, background:`${C.blue}30`, borderRadius:3, marginBottom:4, width:'90%' }} />
                <div style={{ height:4, background:`${C.blue}20`, borderRadius:3, marginBottom:4, width:'80%' }} />
                <div style={{ height:4, background:`${C.blue}20`, borderRadius:3, width:'60%' }} />
              </motion.div>
            )}
            {blockIdx >= 5 && (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }}
                style={{ position:'absolute', bottom:30, right:12, background:'rgba(16,185,129,0.15)', border:'1px solid rgba(16,185,129,0.4)', borderRadius:8, padding:'4px 10px', display:'flex', alignItems:'center', gap:4 }}>
                <motion.div animate={{ scale:[1,1.3,1] }} transition={{ duration:1, repeat:Infinity }} style={{ width:6, height:6, borderRadius:'50%', background:C.emerald }} />
                <span style={{ fontSize:8.5, color:C.emerald, fontWeight:700 }}>PUBLISHED</span>
              </motion.div>
            )}
          </div>
          {/* Typing indicator */}
          <div style={{ background:'#f8fafc', padding:'5px 10px', borderTop:'1px solid #e2e8f0' }}>
            <div style={{ height:4, background:`${C.blue}20`, borderRadius:2, width:`${typeW}%`, transition:'width 0.03s linear', boxShadow:`0 0 6px ${C.blue}40` }} />
          </div>
        </div>
      </div>
      {/* Right: brand system */}
      <div style={{ flex:'0 0 44%', padding:'14px 14px 14px 6px', display:'flex', flexDirection:'column', gap:8 }}>
        <div style={{ fontSize:7.5, color:C.cyan, fontWeight:800, letterSpacing:'0.14em', fontFamily:'var(--font-mono)', opacity:0.9 }}>BRAND SYSTEM</div>
        {/* Palette */}
        <div style={{ display:'flex', gap:3 }}>
          {palette.map((p,i) => (
            <motion.div key={p.c}
              initial={{ scale:0, y:10 }} animate={active ? { scale:1, y:0 } : { scale:0.6, y:8 }}
              transition={{ delay:0.05+i*0.07, type:'spring', stiffness:220 }}
              style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
              <div style={{ width:'100%', height:26, borderRadius:7, background:p.c, boxShadow: active ? `0 3px 12px ${p.c}70` : 'none' }} />
              <span style={{ fontSize:6.5, color:p.c, fontWeight:700 }}>{p.n}</span>
            </motion.div>
          ))}
        </div>
        {/* Typography */}
        <div style={{ background:`${C.blue}12`, borderRadius:9, border:`1px solid ${C.blue}25`, padding:'8px 10px', flex:1 }}>
          <div style={{ fontSize:7, color:C.sky, fontWeight:700, letterSpacing:'0.1em', marginBottom:6 }}>TYPOGRAPHY</div>
          {[
            { w:800, s:15, t:'Security Heading', c:C.blue },
            { w:700, s:11, t:'Subheading Style', c:C.cyan },
            { w:400, s:9,  t:'Body paragraph text — clear, trustworthy.', c:`${C.lite}80` },
          ].map((ty,i) => (
            <motion.div key={i}
              animate={{ opacity: active ? 1 : 0.1, x: active ? 0 : -10 }}
              transition={{ duration:0.35, delay:0.15+i*0.09 }}
              style={{ fontWeight:ty.w, fontSize:ty.s, color:ty.c, lineHeight:1.45, marginBottom:4 }}>
              {ty.t}
            </motion.div>
          ))}
        </div>
        {/* Buttons */}
        <div style={{ display:'flex', gap:5 }}>
          {[
            { bg:`linear-gradient(90deg,${C.blue},${C.cyan})`, c:'#fff', t:'CTA', shadow:`0 3px 12px ${C.blue}50` },
            { bg:`${C.blue}18`, c:C.sky, t:'Ghost', border:`1.5px solid ${C.blue}40` },
          ].map((btn,i) => (
            <motion.div key={i}
              animate={{ opacity: active ? 1 : 0.3, scale: active ? 1 : 0.88 }}
              transition={{ duration:0.3, delay:0.3+i*0.09 }}
              style={{ flex:1, background:btn.bg, color:btn.c, border:(btn as { border?: string }).border||'none', borderRadius:7, padding:'6px 4px', fontSize:8.5, fontWeight:800, textAlign:'center', boxShadow:(btn as { shadow?: string }).shadow||'none' }}>
              {btn.t} →
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SCENE 3 – Development & Testing
   Full-bleed code editor with live CWV
───────────────────────────────────────────── */
const CODE_LINES = [
  { t:"export function HeroSection() {",      c:C.blue  },
  { t:"  const schema = buildSchema({",       c:C.cyan  },
  { t:"    '@type': 'LocalBusiness',",        c:C.sky   },
  { t:"    name: 'SecureMax CCTV',",          c:C.teal  },
  { t:"    areaServed: 'Sydney, NSW',",       c:C.teal  },
  { t:"    hasCredential: 'AS2201',",         c:C.sky   },
  { t:"  })",                                 c:C.cyan  },
  { t:"  return <Hero schema={schema} />",    c:C.emerald },
  { t:"}",                                    c:C.blue  },
]

function Scene3({ active }: { active: boolean; color: string }) {
  const [lineIdx, setLineIdx] = useState(-1)
  const [lcp, setLcp] = useState(42)
  const [inp, setInp] = useState(380)
  const [cls, setCls] = useState(24)
  useEffect(() => {
    if (!active) { setLineIdx(-1); setLcp(42); setInp(380); setCls(24); return }
    let i = -1
    const lv = setInterval(() => { i++; setLineIdx(i); if (i >= CODE_LINES.length-1) clearInterval(lv) }, 160)
    const cv = setInterval(() => {
      setLcp(v => v > 11 ? v - 1 : v)
      setInp(v => v > 98 ? v - 8 : v)
      setCls(v => v > 2 ? v - 1 : v)
    }, 55)
    return () => { clearInterval(lv); clearInterval(cv) }
  }, [active])

  const cwv = [
    { k:'LCP', raw:lcp, show:`${(lcp/10).toFixed(1)}s`, good: lcp <= 25, c:C.sky },
    { k:'INP', raw:inp, show:`${inp}ms`,                 good: inp <= 200, c:C.cyan },
    { k:'CLS', raw:cls, show:`0.${String(cls).padStart(2,'0')}`, good: cls <= 10, c:C.teal },
  ]

  return (
    <div style={{ position:'absolute', inset:0, background:'#070e1a', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      {/* Top CWV bar */}
      <div style={{ display:'flex', gap:0, borderBottom:`1px solid ${C.blue}25`, background:'#0a1525' }}>
        {cwv.map((m,i) => (
          <div key={m.k} style={{ flex:1, padding:'8px 0', textAlign:'center', borderRight: i<2 ? `1px solid ${C.blue}20` : 'none' }}>
            <div style={{ fontSize:7.5, color:`${C.sky}70`, fontWeight:700, fontFamily:'var(--font-mono)', letterSpacing:'0.12em' }}>{m.k}</div>
            <motion.div animate={{ color: m.good ? C.emerald : C.sky }} style={{ fontSize:15, fontWeight:900, fontFamily:'var(--font-mono)' }}>
              {m.show}
            </motion.div>
            <div style={{ height:3, background:`${C.blue}25`, borderRadius:2, margin:'3px 10px 0', overflow:'hidden' }}>
              <motion.div
                animate={{ width: active ? `${Math.max(5, 100 - m.raw)}%` : '10%', background: m.good ? C.emerald : C.sky }}
                transition={{ duration:0.08 }}
                style={{ height:'100%', borderRadius:2 }} />
            </div>
          </div>
        ))}
      </div>
      {/* File tabs */}
      <div style={{ display:'flex', background:'#090f1d', borderBottom:`1px solid ${C.blue}20`, padding:'0 10px' }}>
        {['hero-section.tsx','schema.ts','page.tsx'].map((f,i) => (
          <div key={f} style={{ padding:'5px 12px', fontSize:8.5, fontFamily:'var(--font-mono)', color: i===0 ? C.sky : `${C.sky}45`, borderBottom: i===0 ? `1.5px solid ${C.blue}` : 'none', marginTop:1 }}>{f}</div>
        ))}
      </div>
      {/* Code lines */}
      <div style={{ flex:1, overflowY:'auto', padding:'10px 14px 10px 0' }}>
        <div style={{ display:'flex' }}>
          {/* Line numbers */}
          <div style={{ width:28, textAlign:'right', paddingRight:10, userSelect:'none', flexShrink:0 }}>
            {CODE_LINES.map((_,i) => (
              <div key={i} style={{ fontSize:9, fontFamily:'var(--font-mono)', color:`${C.blue}35`, lineHeight:1.9 }}>{i+1}</div>
            ))}
          </div>
          {/* Code */}
          <div style={{ flex:1 }}>
            {CODE_LINES.map((l,i) => (
              <motion.div key={i}
                initial={{ opacity:0, x:-8 }}
                animate={lineIdx >= i ? { opacity:1, x:0 } : {}}
                transition={{ duration:0.14 }}
                style={{ fontFamily:'var(--font-mono)', fontSize:10, color:l.c, lineHeight:1.9, whiteSpace:'nowrap' }}>
                {l.t}{lineIdx === i && <span style={{ display:'inline-block', width:2, height:11, background:C.blue, marginLeft:1, verticalAlign:'middle', animation:'blink 0.65s infinite' }} />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Status bar */}
      <div style={{ background:'#0a1525', borderTop:`1px solid ${C.blue}20`, padding:'4px 14px', display:'flex', alignItems:'center', gap:14 }}>
        <motion.div animate={{ opacity: active ? 1 : 0.3 }} style={{ display:'flex', alignItems:'center', gap:4 }}>
          <motion.div animate={{ scale:[1,1.3,1] }} transition={{ duration:1.2, repeat:Infinity }} style={{ width:6, height:6, borderRadius:'50%', background:C.emerald }} />
          <span style={{ fontSize:8, color:C.emerald, fontWeight:700, fontFamily:'var(--font-mono)' }}>TypeScript · 0 errors</span>
        </motion.div>
        <span style={{ fontSize:8, color:`${C.sky}60`, fontFamily:'var(--font-mono)' }}>UTF-8 · LF · TSX</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SCENE 4 – Launch & Optimisation
   Full-bleed live dashboard: visitors, leads, rankings
───────────────────────────────────────────── */
function Scene4({ active }: { active: boolean; color: string }) {
  const [visitors, setVisitors] = useState(0)
  const [leads, setLeads]   = useState(0)
  const [rank, setRank]     = useState(6)
  const [barH, setBarH]     = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const BARS = [38,52,47,63,70,66,81,77,90,85,100,94]
  useEffect(() => {
    if (!active) { setVisitors(0); setLeads(0); setRank(6); setBarH([0,0,0,0,0,0,0,0,0,0,0,0]); return }
    const iv = setInterval(() => {
      setVisitors(v => v < 1240 ? v + 22 : v)
      setLeads(v =>    v < 34   ? v + 1  : v)
      setRank(r =>     r > 1    ? r - 1  : r)
    }, 40)
    let bi = 0
    const bv = setInterval(() => {
      if (bi >= BARS.length) { clearInterval(bv); return }
      const idx = bi
      setBarH(prev => { const n=[...prev]; n[idx]=BARS[idx]; return n })
      bi++
    }, 80)
    return () => { clearInterval(iv); clearInterval(bv) }
  }, [active])

  const keywords = [
    { kw:'cctv installer sydney', pos:rank },
    { kw:'security cameras nsw', pos: Math.max(1, rank-1) },
    { kw:'alarm monitoring',     pos: rank > 1 ? rank-1 : 1 },
  ]

  return (
    <div style={{ position:'absolute', inset:0, background:`linear-gradient(140deg, ${C.navy}, #071d30 60%, #051a28 100%)`, overflow:'hidden', display:'flex', gap:0 }}>
      {/* Left: metrics + chart */}
      <div style={{ flex:'0 0 58%', padding:'14px 8px 14px 14px', display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ fontSize:7.5, color:C.sky, fontWeight:800, letterSpacing:'0.14em', fontFamily:'var(--font-mono)', opacity:0.9 }}>LIVE PERFORMANCE</div>
        {/* Stat pills */}
        <div style={{ display:'flex', gap:8 }}>
          {[
            { l:'Visitors/mo', v:visitors.toLocaleString(), d:'+18%', c:C.blue },
            { l:'Leads/mo',    v:leads,                     d:'+41%', c:C.emerald },
          ].map((m,i) => (
            <motion.div key={m.l}
              animate={{ opacity: active ? 1 : 0.3, y: active ? 0 : 5 }}
              transition={{ delay:0.1+i*0.1 }}
              style={{ flex:1, background:`${m.c}15`, border:`1.5px solid ${m.c}40`, borderRadius:10, padding:'8px 10px', boxShadow: active ? `0 4px 18px ${m.c}25` : 'none' }}>
              <div style={{ fontSize:8, color:`${C.lite}60`, marginBottom:2 }}>{m.l}</div>
              <div style={{ fontSize:18, fontWeight:900, color:m.c, fontFamily:'var(--font-mono)', lineHeight:1 }}>{m.v}</div>
              <div style={{ fontSize:9, color:C.emerald, fontWeight:700, marginTop:3 }}>▲ {m.d}</div>
            </motion.div>
          ))}
        </div>
        {/* Bar chart */}
        <div style={{ flex:1, background:`${C.blue}0d`, border:`1px solid ${C.blue}22`, borderRadius:10, padding:'10px 10px 6px', display:'flex', flexDirection:'column' }}>
          <div style={{ fontSize:7.5, color:`${C.sky}80`, fontWeight:700, fontFamily:'var(--font-mono)', marginBottom:8 }}>MONTHLY TRAFFIC</div>
          <div style={{ flex:1, display:'flex', alignItems:'flex-end', gap:4 }}>
            {barH.map((h,i) => (
              <motion.div key={i}
                animate={{ height: active ? `${h}%` : '4%' }}
                transition={{ duration:0.5, delay:0.05+i*0.06, ease:'backOut' }}
                style={{ flex:1, borderRadius:'4px 4px 2px 2px', background:`linear-gradient(180deg, ${C.sky}, ${C.blue}80)`, boxShadow: h > 70 ? `0 0 8px ${C.sky}50` : 'none', minHeight:4 }} />
            ))}
          </div>
        </div>
      </div>
      {/* Right: rankings + CI pipeline */}
      <div style={{ flex:'0 0 42%', padding:'14px 14px 14px 6px', display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ fontSize:7.5, color:C.cyan, fontWeight:800, letterSpacing:'0.14em', fontFamily:'var(--font-mono)', opacity:0.9 }}>GOOGLE RANKINGS</div>
        <div style={{ background:`${C.blue}10`, border:`1px solid ${C.blue}25`, borderRadius:10, padding:'8px 10px' }}>
          {keywords.map((r,i) => (
            <motion.div key={r.kw}
              animate={{ opacity: active ? 1 : 0.2, x: active ? 0 : -8 }}
              transition={{ delay:0.2+i*0.09 }}
              style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'4px 0', borderBottom: i<keywords.length-1 ? `1px solid ${C.blue}20` : 'none' }}>
              <span style={{ fontSize:9, color:`${C.lite}80` }}>{r.kw}</span>
              <motion.span
                animate={{ color: r.pos === 1 ? C.emerald : C.sky, scale: r.pos===1 ? 1.1 : 1 }}
                style={{ fontSize:10, fontWeight:900, fontFamily:'var(--font-mono)', background:`${C.blue}25`, padding:'1px 7px', borderRadius:4, border:`1px solid ${C.blue}40` }}>
                #{r.pos}
              </motion.span>
            </motion.div>
          ))}
        </div>
        {/* CI Pipeline */}
        <div style={{ fontSize:7.5, color:`${C.sky}80`, fontWeight:700, letterSpacing:'0.12em', fontFamily:'var(--font-mono)' }}>CI / DEPLOY PIPELINE</div>
        {['Build','Test','Preview','Deploy ✓'].map((s,i) => (
          <motion.div key={s}
            animate={{ opacity: active ? 1 : 0.25, x: active ? 0 : 8 }}
            transition={{ delay:0.3+i*0.09 }}
            style={{ display:'flex', alignItems:'center', gap:7 }}>
            <motion.div
              animate={{ background: active ? (i<3 ? C.emerald : C.blue) : `${C.blue}20`, boxShadow: active ? `0 0 8px ${i<3?C.emerald:C.blue}60` : 'none', scale: active && i===3 ? [1,1.05,1] : 1 }}
              transition={{ duration:0.4, delay:0.3+i*0.1, repeat: active && i===3 ? Infinity : 0, repeatDelay:1.2 }}
              style={{ width:7, height:7, borderRadius:'50%' }} />
            <span style={{ fontSize:9, color:`${C.lite}75`, fontWeight:600 }}>{s}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const STEPS: WorkflowStep[] = [
  { step:'01', tag:'STRATEGY', title:'Discovery & UX Strategy',  color:'#0ea5e9', glow:'rgba(14,165,233,0.55)', Scene: Scene1 },
  { step:'02', tag:'DESIGN',   title:'Design & Brand System',    color:'#06b6d4', glow:'rgba(6,182,212,0.55)',  Scene: Scene2 },
  { step:'03', tag:'BUILD',    title:'Development & Testing',    color:'#38bdf8', glow:'rgba(56,189,248,0.55)', Scene: Scene3 },
  { step:'04', tag:'LAUNCH',   title:'Launch & Optimisation',    color:'#10b981', glow:'rgba(16,185,129,0.55)', Scene: Scene4 },
]

/* ── Intro Scene ── */
const INTRO_CODE = [
  { t:'<SecurityPage schema ai-ready />',     c:C.blue },
  { t:'  <Hero gradient cta="Get Quote" />',  c:C.cyan },
  { t:'  <Services schema localBusiness />',  c:C.sky  },
  { t:'  <ContactForm seo-optimised />',      c:C.teal },
]

function WebDesignIntroScene() {
  const [lineIdx, setLineIdx] = useState(-1)
  const [score,   setScore]   = useState(40)
  useEffect(() => {
    let i = -1
    const iv = setInterval(() => { i++; setLineIdx(i); if (i >= INTRO_CODE.length) clearInterval(iv) }, 220)
    const sv = setInterval(() => setScore(v => { if (v >= 98) { clearInterval(sv); return v } return v + 2 }), 32)
    return () => { clearInterval(iv); clearInterval(sv) }
  }, [])

  const badges = [
    { l:'Design',      icon:'🎨', c:C.blue,    delay:0.25 },
    { l:'Performance', icon:'⚡', c:C.cyan,    delay:0.5  },
    { l:'SEO-Ready',   icon:'📈', c:C.teal,    delay:0.75 },
    { l:'AI-Native',   icon:'🤖', c:C.sky,     delay:1.0  },
  ]

  return (
    <div style={{ position:'absolute', inset:0, background:`linear-gradient(140deg, #e0f2fe 0%, #bae6fd 40%, #cffafe 100%)`, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', top:'25%', left:'30%', width:520, height:420, borderRadius:'50%', background:`radial-gradient(ellipse, ${C.blue}20 0%, transparent 60%)`, pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:'45%', left:'55%', width:320, height:280, borderRadius:'50%', background:`radial-gradient(ellipse, ${C.cyan}15 0%, transparent 60%)`, pointerEvents:'none' }} />

      {/* Browser frame */}
      <div style={{ position:'absolute', top:'5%', left:'50%', transform:'translateX(-50%)', width:530, background:'#fff', borderRadius:16, overflow:'hidden', boxShadow:`0 14px 55px ${C.blue}25`, border:`2px solid ${C.blue}28` }}>
        <div style={{ background:`linear-gradient(90deg, #0f2244, #0a2a50)`, padding:'9px 14px', display:'flex', alignItems:'center', gap:8 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width:9,height:9,borderRadius:'50%',background:c }} />)}
          <div style={{ flex:1, background:'rgba(255,255,255,0.12)', borderRadius:20, padding:'4px 12px', fontSize:11, color:'rgba(255,255,255,0.65)', fontFamily:'var(--font-mono)', border:`1px solid ${C.blue}30` }}>
            securityblogs.com.au
          </div>
          <div style={{ fontSize:10, color:C.emerald, fontWeight:700, fontFamily:'var(--font-mono)' }}>● LIVE</div>
        </div>
        <div style={{ padding:'16px', background:`linear-gradient(135deg, #0f2244 0%, #0a1f3a 100%)`, minHeight:110 }}>
          <motion.div initial={{ width:0 }} animate={{ width:'72%' }} transition={{ duration:0.7, delay:0.3 }} style={{ height:11, background:`linear-gradient(90deg, ${C.blue}, ${C.cyan})`, borderRadius:6, marginBottom:8, boxShadow:`0 0 12px ${C.blue}60` }} />
          <motion.div initial={{ width:0 }} animate={{ width:'48%' }} transition={{ duration:0.6, delay:0.55 }} style={{ height:7, background:`${C.sky}80`, borderRadius:4, marginBottom:14 }} />
          <div style={{ display:'flex', gap:8 }}>
            <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.8, type:'spring' }} style={{ background:`linear-gradient(135deg, ${C.blue}, ${C.cyan})`, borderRadius:8, padding:'6px 16px', fontSize:11, color:'#fff', fontWeight:800, boxShadow:`0 4px 14px ${C.blue}55` }}>Get Quote</motion.div>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.0 }} style={{ background:'rgba(255,255,255,0.12)', borderRadius:8, padding:'6px 16px', fontSize:11, color:'rgba(255,255,255,0.8)', fontWeight:700, border:'1px solid rgba(255,255,255,0.2)' }}>Learn More</motion.div>
          </div>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }} style={{ marginTop:10, display:'flex', gap:6 }}>
            {['CCTV','Access','Alarms','AI-Ready'].map(t => (
              <div key={t} style={{ background:`${C.blue}30`, borderRadius:999, padding:'3px 10px', fontSize:10, color:C.sky, fontWeight:600, border:`1px solid ${C.cyan}35` }}>{t}</div>
            ))}
          </motion.div>
        </div>
        <div style={{ background:'#0d1117', padding:'10px 14px' }}>
          {INTRO_CODE.map((l,i) => (
            <motion.div key={i} initial={{ opacity:0, x:-8 }} animate={lineIdx >= i ? { opacity:1, x:0 } : {}} transition={{ duration:0.2 }}
              style={{ fontFamily:'var(--font-mono)', fontSize:10.5, color:l.c, lineHeight:1.75 }}>{l.t}</motion.div>
          ))}
        </div>
      </div>

      {/* Score meter */}
      <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.5 }}
        style={{ position:'absolute', top:'10%', right:'3%', background:'#fff', borderRadius:14, padding:'12px 16px', boxShadow:`0 8px 30px ${C.blue}20`, border:`1.5px solid ${C.blue}25`, minWidth:92, textAlign:'center' }}>
        <div style={{ fontSize:9, color:'rgba(15,34,68,0.4)', marginBottom:4 }}>PAGE SCORE</div>
        <div style={{ fontSize:34, fontWeight:900, color:score > 80 ? C.emerald : score > 60 ? C.cyan : '#ef4444', fontFamily:'var(--font-mono)', lineHeight:1 }}>{score}</div>
        <div style={{ fontSize:9, color:'rgba(15,34,68,0.35)', marginTop:3 }}>/100</div>
        <div style={{ marginTop:6, height:5, background:`${C.blue}15`, borderRadius:3, overflow:'hidden' }}>
          <motion.div animate={{ width:`${score}%` }} transition={{ duration:0.1 }} style={{ height:'100%', background:`linear-gradient(90deg, ${C.blue}, ${C.emerald})`, borderRadius:3, boxShadow:`0 0 6px ${C.cyan}60` }} />
        </div>
      </motion.div>

      {/* Badges */}
      <div style={{ position:'absolute', bottom:'20%', left:'50%', transform:'translateX(-50%)', display:'flex', gap:10 }}>
        {badges.map(b => (
          <motion.div key={b.l} initial={{ opacity:0, y:16, scale:0.8 }} animate={{ opacity:1, y:0, scale:1 }} transition={{ delay:b.delay, type:'spring', stiffness:200 }}
            style={{ background:'#fff', border:`2px solid ${b.c}35`, borderRadius:12, padding:'8px 12px', textAlign:'center', boxShadow:`0 4px 18px ${b.c}18` }}>
            <div style={{ fontSize:20, marginBottom:3 }}>{b.icon}</div>
            <div style={{ fontSize:10, fontWeight:800, color:b.c, whiteSpace:'nowrap' }}>{b.l}</div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.2 }}
        style={{ textAlign:'center', zIndex:10, position:'relative', marginTop:370 }}>
        <h2 style={{ fontSize:'clamp(24px,3.5vw,40px)', fontWeight:800, color:'#0f2244', lineHeight:1.2, marginBottom:12 }}>
          Websites That Rank,<br /><span style={{ color:C.blue }}>Convert &amp; Get Cited</span>
        </h2>
        <motion.div animate={{ y:[0,7,0] }} transition={{ duration:1.8, repeat:Infinity }}
          style={{ marginTop:16, display:'flex', flexDirection:'column', alignItems:'center', gap:5, opacity:0.65 }}>
          <div style={{ width:24, height:38, borderRadius:12, border:`2px solid ${C.blue}50`, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:5 }}>
            <motion.div animate={{ y:[0,10,0] }} transition={{ duration:1.8, repeat:Infinity }} style={{ width:4, height:8, borderRadius:2, background:C.blue }} />
          </div>
          <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color:C.blue, letterSpacing:'0.14em' }}>SCROLL TO BEGIN</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function WebDesignHowItWorks() {
  return <ServiceWorkflowCards steps={STEPS} introNode={<WebDesignIntroScene />} cardW={1060} cardH={520} sideXOffset={9999} sectionBg="#f0f9ff" />
}
