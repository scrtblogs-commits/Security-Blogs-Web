'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ServiceWorkflowCards, { type WorkflowStep } from '@/components/ui/ServiceWorkflowCards'

const C = { indigo: '#6366f1', violet: '#8b5cf6', sky: '#06b6d4', emerald: '#10b981', amber: '#f59e0b' }

/* ── Scene 1: Discovery & UX Strategy ── */
function Scene1({ active }: { active: boolean; color: string }) {
  const nodes = [
    { x: 50, y: 12, label: 'Home', main: true },
    { x: 22, y: 38, label: 'Services' },
    { x: 78, y: 38, label: 'About' },
    { x: 10, y: 65, label: 'CCTV' },
    { x: 34, y: 65, label: 'Alarms' },
    { x: 66, y: 65, label: 'Blog' },
    { x: 90, y: 65, label: 'Contact' },
  ]
  const edges = [[50,12,22,38],[50,12,78,38],[22,38,10,65],[22,38,34,65],[78,38,66,65],[78,38,90,65]]
  const stages = [{ l:'Awareness', c: C.indigo }, { l:'Research', c: C.violet }, { l:'Decision', c: C.emerald }]

  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', gap:10, padding:'10px 4px' }}>
      <div style={{ fontSize:8, color: C.indigo, fontWeight:800, letterSpacing:'0.12em', fontFamily:'var(--font-mono)' }}>SITEMAP & JOURNEY</div>
      <div style={{ flex:1, position:'relative', background:`linear-gradient(135deg, ${C.indigo}10, ${C.violet}08)`, borderRadius:10, border:`1px solid ${C.indigo}30`, overflow:'hidden' }}>
        <svg viewBox="0 0 100 80" style={{ width:'100%', height:'100%' }}>
          {edges.map(([x1,y1,x2,y2],i) => (
            <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={`url(#lg${i})`} strokeWidth="0.8"
              strokeDasharray="2 1"
              animate={{ opacity: active ? 1 : 0.2, pathLength: active ? 1 : 0 }}
              transition={{ duration:0.5, delay: i*0.07 }} />
          ))}
          <defs>
            {edges.map((_,i) => <linearGradient key={i} id={`lg${i}`}><stop offset="0%" stopColor={C.indigo} /><stop offset="100%" stopColor={C.violet} /></linearGradient>)}
          </defs>
          {nodes.map((n,i) => (
            <g key={i}>
              <motion.rect x={n.x-8} y={n.y-4} width="16" height="8" rx="2"
                fill={n.main ? C.indigo : `${C.violet}22`}
                stroke={n.main ? C.indigo : C.violet}
                strokeWidth={n.main ? '0' : '0.5'}
                animate={{ opacity: active ? 1 : 0.3, scale: active && n.main ? [1,1.08,1] : 1 }}
                transition={{ duration:0.4, delay:i*0.06, repeat: active && n.main ? Infinity : 0, repeatDelay:1.5 }}
              />
              <text x={n.x} y={n.y+1.8} fontSize="2.8" fill={n.main?'#fff':'rgba(80,40,200,0.8)'} textAnchor="middle" fontFamily="system-ui" fontWeight="700">{n.label}</text>
            </g>
          ))}
        </svg>
      </div>
      <div style={{ display:'flex', gap:5 }}>
        {stages.map((s,i) => (
          <motion.div key={s.l}
            animate={{ opacity: active ? 1 : 0.3, y: active ? 0 : 6, scale: active ? 1 : 0.9 }}
            transition={{ duration:0.35, delay:0.1+i*0.08 }}
            style={{ flex:1, background:`${s.c}18`, border:`1.5px solid ${s.c}50`, borderRadius:8, padding:'5px 4px', textAlign:'center' }}>
            <div style={{ fontSize:8, fontWeight:800, color:s.c }}>{s.l}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Scene 2: Design & Brand System ── */
function Scene2({ active }: { active: boolean; color: string }) {
  const palette = [
    { c:'#6366f1', name:'Primary' },
    { c:'#8b5cf6', name:'Accent' },
    { c:'#06b6d4', name:'Sky' },
    { c:'#10b981', name:'Green' },
    { c:'#f59e0b', name:'Warm' },
  ]

  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', gap:10, padding:'10px 4px' }}>
      <div style={{ fontSize:8, color:C.violet, fontWeight:800, letterSpacing:'0.12em', fontFamily:'var(--font-mono)' }}>BRAND SYSTEM</div>
      {/* Color palette */}
      <div style={{ display:'flex', gap:4 }}>
        {palette.map((p,i) => (
          <motion.div key={p.c}
            animate={{ scale: active ? 1 : 0.7, opacity: active ? 1 : 0.3, y: active ? 0 : 8 }}
            transition={{ duration:0.4, delay: i*0.07, type:'spring', stiffness:200 }}
            style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
            <div style={{ width:'100%', height:32, borderRadius:8, background:p.c, boxShadow: active ? `0 4px 14px ${p.c}55` : 'none' }} />
            <span style={{ fontSize:7, color:p.c, fontWeight:700 }}>{p.name}</span>
          </motion.div>
        ))}
      </div>
      {/* Typography */}
      <div style={{ background:`linear-gradient(135deg, ${C.indigo}10, ${C.violet}08)`, borderRadius:10, border:`1px solid ${C.indigo}25`, padding:'8px 10px' }}>
        <div style={{ fontSize:7, color:C.violet, fontWeight:700, letterSpacing:'0.1em', marginBottom:6 }}>TYPOGRAPHY</div>
        {[
          { w:800, s:18, t:'Heading One', c:C.indigo },
          { w:700, s:13, t:'Subheading Text', c:C.violet },
          { w:400, s:10, t:'Body paragraph text here', c:'rgba(15,34,68,0.65)' },
        ].map((ty,i) => (
          <motion.div key={i}
            animate={{ opacity: active ? 1 : 0.2, x: active ? 0 : -8 }}
            transition={{ duration:0.3, delay:0.1+i*0.08 }}
            style={{ fontWeight:ty.w, fontSize:ty.s, color:ty.c, lineHeight:1.4 }}>
            {ty.t}
          </motion.div>
        ))}
      </div>
      {/* Buttons */}
      <div style={{ display:'flex', gap:6 }}>
        {[
          { bg:C.indigo, c:'#fff', t:'Primary CTA' },
          { bg:`${C.indigo}18`, c:C.indigo, t:'Secondary', border:`1.5px solid ${C.indigo}55` },
          { bg:`${C.violet}18`, c:C.violet, t:'Ghost', border:`1.5px solid ${C.violet}40` },
        ].map((btn,i) => (
          <motion.div key={i}
            animate={{ opacity: active ? 1 : 0.35, scale: active ? 1 : 0.9 }}
            transition={{ duration:0.3, delay:0.25+i*0.07 }}
            style={{ flex:1, background:btn.bg, color:btn.c, border:btn.border||'none', borderRadius:7, padding:'5px 4px', fontSize:8.5, fontWeight:700, textAlign:'center', boxShadow: active ? `0 3px 10px ${C.indigo}22` : 'none' }}>
            {btn.t}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Scene 3: Development & Testing ── */
function Scene3({ active }: { active: boolean; color: string }) {
  const [lineIdx, setLineIdx] = useState(-1)
  useEffect(() => {
    if (!active) { setLineIdx(-1); return }
    let i = -1
    const iv = setInterval(() => { i++; setLineIdx(i); if (i >= 6) clearInterval(iv) }, 180)
    return () => clearInterval(iv)
  }, [active])

  const lines = [
    { t: 'export function HeroSection() {', c: C.indigo },
    { t: "  const schema = buildSchema({",  c: C.violet },
    { t: "    '@type': 'LocalBusiness',",   c: C.amber },
    { t: "    name: 'SecureMax CCTV',",     c: C.sky },
    { t: "    areaServed: 'Sydney',",       c: C.sky },
    { t: '  })',                            c: C.violet },
    { t: '  return <Hero schema={schema}/>', c: C.emerald },
  ]
  const cwv = [{ k:'LCP', v:'1.1s', c:C.emerald }, { k:'INP', v:'98ms', c:C.sky }, { k:'CLS', v:'0.02', c:C.indigo }]

  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', gap:8, padding:'10px 4px' }}>
      <div style={{ fontSize:8, color:C.sky, fontWeight:800, letterSpacing:'0.12em', fontFamily:'var(--font-mono)' }}>CODE & PERFORMANCE</div>
      <div style={{ background:'#0d1117', borderRadius:10, overflow:'hidden', border:`1.5px solid ${C.indigo}30`, flex:1 }}>
        <div style={{ display:'flex', gap:4, padding:'7px 10px 5px', borderBottom:`1px solid ${C.indigo}20`, alignItems:'center' }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width:7,height:7,borderRadius:'50%',background:c }} />)}
          <span style={{ fontSize:8, color:`${C.sky}80`, fontFamily:'var(--font-mono)', marginLeft:4 }}>hero-section.tsx</span>
        </div>
        <div style={{ padding:'8px 10px' }}>
          {lines.map((l,i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:-6 }}
              animate={lineIdx >= i ? { opacity:1, x:0 } : {}}
              transition={{ duration:0.18 }}
              style={{ fontFamily:'var(--font-mono)', fontSize:9, color:l.c, lineHeight:1.7 }}>
              {l.t}{lineIdx === i && <span style={{ display:'inline-block', width:2, height:11, background:C.indigo, marginLeft:1, verticalAlign:'middle', animation:'blink 0.7s infinite' }} />}
            </motion.div>
          ))}
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6 }}>
        {cwv.map((m,i) => (
          <motion.div key={m.k}
            animate={{ scale: active ? 1 : 0.85, opacity: active ? 1 : 0.3 }}
            transition={{ duration:0.35, delay:0.15+i*0.07 }}
            style={{ textAlign:'center', padding:'6px 4px', background:`${m.c}18`, border:`1.5px solid ${m.c}45`, borderRadius:8, boxShadow: active ? `0 2px 10px ${m.c}25` : 'none' }}>
            <div style={{ fontSize:8, color:m.c, fontWeight:800 }}>{m.k}</div>
            <div style={{ fontSize:12, fontWeight:900, color:m.c, fontFamily:'var(--font-mono)' }}>{m.v}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Scene 4: Launch & Optimisation ── */
function Scene4({ active }: { active: boolean; color: string }) {
  const [visitors, setVisitors] = useState(0)
  const [leads, setLeads] = useState(0)
  useEffect(() => {
    if (!active) { setVisitors(0); setLeads(0); return }
    const iv = setInterval(() => {
      setVisitors(v => v < 1240 ? v + 28 : v)
      setLeads(v => v < 34 ? v + 1 : v)
    }, 40)
    return () => clearInterval(iv)
  }, [active])

  const pipeline = [
    { l:'Build', c:'#10b981', done:true },
    { l:'Test', c:'#10b981', done:true },
    { l:'Preview', c:'#10b981', done:true },
    { l:'Deploy', c:C.indigo, done:false },
  ]
  const ranks = [{ kw:'cctv installer sydney',pos:1 }, { kw:'security cameras nsw',pos:1 }, { kw:'alarm monitoring',pos:2 }]

  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', gap:10, padding:'10px 4px' }}>
      <div style={{ fontSize:8, color:C.emerald, fontWeight:800, letterSpacing:'0.12em', fontFamily:'var(--font-mono)' }}>LAUNCH & GROWTH</div>
      {/* Pipeline */}
      <div style={{ display:'flex', gap:3, alignItems:'center' }}>
        {pipeline.map((s,i) => (
          <div key={s.l} style={{ display:'flex', alignItems:'center', gap:3, flex:1 }}>
            <motion.div
              animate={{ background: active ? (s.done ? s.c : C.indigo) : 'rgba(15,34,68,0.1)', scale: active && !s.done ? [1,1.05,1] : 1 }}
              transition={{ duration:0.4, delay:i*0.08, repeat: active && !s.done ? Infinity : 0, repeatDelay:1 }}
              style={{ borderRadius:6, padding:'4px 0', textAlign:'center', flex:1, fontSize:8.5, fontWeight:800, color:active ? '#fff' : 'rgba(15,34,68,0.4)', boxShadow: active && s.done ? `0 2px 8px ${s.c}50` : 'none' }}>
              {s.done && active ? '✓ ' : ''}{s.l}
            </motion.div>
            {i < pipeline.length-1 && <span style={{ fontSize:8, color:C.indigo, opacity:0.6 }}>→</span>}
          </div>
        ))}
      </div>
      {/* Live metrics */}
      <div style={{ display:'flex', gap:7 }}>
        {[{ l:'Visitors / mo', v:visitors.toLocaleString(), d:'+18%', c:C.indigo }, { l:'Leads / mo', v:leads, d:'+41%', c:C.emerald }].map((m,i) => (
          <motion.div key={m.l}
            animate={{ opacity: active ? 1 : 0.3, y: active ? 0 : 5 }}
            transition={{ duration:0.35, delay:0.2+i*0.1 }}
            style={{ flex:1, background:`${m.c}15`, border:`1.5px solid ${m.c}45`, borderRadius:9, padding:'7px 9px', boxShadow: active ? `0 4px 14px ${m.c}20` : 'none' }}>
            <div style={{ fontSize:8, color:`rgba(15,34,68,0.45)`, marginBottom:2 }}>{m.l}</div>
            <div style={{ fontSize:16, fontWeight:900, color:m.c, fontFamily:'var(--font-mono)' }}>{m.v}</div>
            <div style={{ fontSize:9, color:C.emerald, fontWeight:700 }}>{m.d} this week</div>
          </motion.div>
        ))}
      </div>
      {/* Rankings */}
      <div style={{ background:`${C.indigo}0d`, border:`1px solid ${C.indigo}25`, borderRadius:9, padding:'7px 10px' }}>
        <div style={{ fontSize:7.5, color:C.indigo, fontWeight:800, letterSpacing:'0.1em', marginBottom:5 }}>GOOGLE RANKINGS</div>
        {ranks.map((r,i) => (
          <motion.div key={r.kw}
            animate={{ opacity: active ? 1 : 0.3, x: active ? 0 : -8 }}
            transition={{ duration:0.3, delay:0.3+i*0.07 }}
            style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
            <span style={{ fontSize:9, color:'rgba(15,34,68,0.65)' }}>{r.kw}</span>
            <span style={{ fontSize:9.5, fontWeight:900, color:C.indigo, fontFamily:'var(--font-mono)', background:`${C.indigo}20`, padding:'1px 7px', borderRadius:4, border:`1px solid ${C.indigo}40` }}>#{r.pos}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const STEPS: WorkflowStep[] = [
  { step:'01', tag:'STRATEGY', title:'Discovery & UX Strategy',   color:'#6366f1', glow:'rgba(99,102,241,0.5)',  Scene: Scene1 },
  { step:'02', tag:'DESIGN',   title:'Design & Brand System',     color:'#8b5cf6', glow:'rgba(139,92,246,0.5)', Scene: Scene2 },
  { step:'03', tag:'BUILD',    title:'Development & Testing',     color:'#06b6d4', glow:'rgba(6,182,212,0.5)',  Scene: Scene3 },
  { step:'04', tag:'LAUNCH',   title:'Launch & Optimisation',     color:'#10b981', glow:'rgba(16,185,129,0.5)', Scene: Scene4 },
]

/* ── Intro Scene ── */
const CODE_LINES = [
  { t:'<SecurityPage />', c:C.indigo },
  { t:'  <Hero gradient cta="Get Quote" />', c:C.violet },
  { t:'  <Services schema ai-ready />', c:C.sky },
  { t:'  <ContactForm seo-optimised />', c:C.emerald },
]

function WebDesignIntroScene() {
  const [lineIdx, setLineIdx] = useState(-1)
  const [score, setScore] = useState(40)

  useEffect(() => {
    let i = -1
    const iv = setInterval(() => { i++; setLineIdx(i); if (i >= CODE_LINES.length) clearInterval(iv) }, 230)
    const sv = setInterval(() => setScore(v => { if (v >= 98) { clearInterval(sv); return v } return v + 2 }), 35)
    return () => { clearInterval(iv); clearInterval(sv) }
  }, [])

  const badges = [
    { l:'Design',      icon:'🎨', c:C.indigo,  delay:0.2 },
    { l:'Performance', icon:'⚡', c:C.sky,     delay:0.5 },
    { l:'SEO-Ready',   icon:'📈', c:C.emerald, delay:0.8 },
    { l:'AI-Native',   icon:'🤖', c:C.violet,  delay:1.1 },
  ]

  return (
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, #f5f0ff 0%, #ede9fe 40%, #e0f2fe 100%)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {/* Mesh glow */}
      <div style={{ position:'absolute', top:'30%', left:'35%', width:500, height:400, borderRadius:'50%', background:`radial-gradient(ellipse, ${C.indigo}18 0%, transparent 65%)`, pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:'50%', left:'60%', width:300, height:300, borderRadius:'50%', background:`radial-gradient(ellipse, ${C.sky}15 0%, transparent 65%)`, pointerEvents:'none' }} />

      {/* Browser frame */}
      <div style={{ position:'absolute', top:'6%', left:'50%', transform:'translateX(-50%)', width:520, background:'#fff', borderRadius:16, overflow:'hidden', boxShadow:`0 12px 50px ${C.indigo}20`, border:`2px solid ${C.indigo}22` }}>
        {/* Chrome */}
        <div style={{ background:`linear-gradient(90deg, ${C.indigo}15, ${C.violet}10)`, padding:'9px 14px', borderBottom:`1px solid ${C.indigo}15`, display:'flex', alignItems:'center', gap:8 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width:9,height:9,borderRadius:'50%',background:c }} />)}
          <div style={{ flex:1, background:'rgba(255,255,255,0.7)', borderRadius:20, padding:'4px 12px', fontSize:11, color:'#46546e', fontFamily:'var(--font-mono)', border:`1px solid ${C.indigo}18` }}>
            securityblogs.com.au
          </div>
          <div style={{ fontSize:10, color:C.emerald, fontWeight:700, fontFamily:'var(--font-mono)' }}>● LIVE</div>
        </div>
        {/* Hero section */}
        <div style={{ padding:'16px', background:`linear-gradient(135deg, #0f2244 0%, #1a1060 100%)`, minHeight:110 }}>
          <motion.div initial={{ width:0 }} animate={{ width:'75%' }} transition={{ duration:0.7, delay:0.3 }} style={{ height:11, background:`linear-gradient(90deg, ${C.indigo}, ${C.violet})`, borderRadius:6, marginBottom:8 }} />
          <motion.div initial={{ width:0 }} animate={{ width:'50%' }} transition={{ duration:0.6, delay:0.55 }} style={{ height:7, background:`${C.sky}90`, borderRadius:4, marginBottom:14 }} />
          <div style={{ display:'flex', gap:8 }}>
            <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.8, type:'spring' }} style={{ background:`linear-gradient(135deg, ${C.indigo}, ${C.violet})`, borderRadius:8, padding:'6px 16px', fontSize:11, color:'#fff', fontWeight:800, boxShadow:`0 4px 14px ${C.indigo}50` }}>Get Quote</motion.div>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.0 }} style={{ background:'rgba(255,255,255,0.12)', borderRadius:8, padding:'6px 16px', fontSize:11, color:'rgba(255,255,255,0.85)', fontWeight:700, border:'1px solid rgba(255,255,255,0.2)' }}>Learn More</motion.div>
          </div>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }} style={{ marginTop:10, display:'flex', gap:6 }}>
            {['CCTV','Access','Alarms','AI-Ready'].map(t => (
              <div key={t} style={{ background:`${C.indigo}30`, borderRadius:999, padding:'3px 10px', fontSize:10, color:`${C.sky}`, fontWeight:600, border:`1px solid ${C.sky}30` }}>{t}</div>
            ))}
          </motion.div>
        </div>
        {/* Code editor */}
        <div style={{ background:'#0d1117', padding:'10px 14px' }}>
          {CODE_LINES.map((l,i) => (
            <motion.div key={i} initial={{ opacity:0, x:-8 }} animate={lineIdx >= i ? { opacity:1, x:0 } : {}} transition={{ duration:0.2 }}
              style={{ fontFamily:'var(--font-mono)', fontSize:10.5, color:l.c, lineHeight:1.75 }}>
              {l.t}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Score meter */}
      <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.5 }}
        style={{ position:'absolute', top:'12%', right:'4%', background:'#fff', borderRadius:14, padding:'12px 16px', boxShadow:`0 8px 30px ${C.indigo}18`, border:`1.5px solid ${C.indigo}20`, minWidth:90, textAlign:'center' }}>
        <div style={{ fontSize:9, color:'rgba(15,34,68,0.45)', marginBottom:4 }}>PAGE SCORE</div>
        <div style={{ fontSize:32, fontWeight:900, color:score > 80 ? C.emerald : score > 60 ? C.amber : '#ef4444', fontFamily:'var(--font-mono)', lineHeight:1 }}>{score}</div>
        <div style={{ fontSize:9, color:'rgba(15,34,68,0.4)', marginTop:3 }}>/100</div>
        <div style={{ marginTop:6, height:5, background:'rgba(15,34,68,0.08)', borderRadius:3, overflow:'hidden' }}>
          <motion.div animate={{ width:`${score}%` }} transition={{ duration:0.1 }} style={{ height:'100%', background:`linear-gradient(90deg, ${C.indigo}, ${C.emerald})`, borderRadius:3 }} />
        </div>
      </motion.div>

      {/* Badges */}
      <div style={{ position:'absolute', bottom:'22%', left:'50%', transform:'translateX(-50%)', display:'flex', gap:10 }}>
        {badges.map(b => (
          <motion.div key={b.l} initial={{ opacity:0, y:16, scale:0.8 }} animate={{ opacity:1, y:0, scale:1 }} transition={{ delay:b.delay, type:'spring', stiffness:220 }}
            style={{ background:'#fff', border:`2px solid ${b.c}30`, borderRadius:12, padding:'8px 12px', textAlign:'center', boxShadow:`0 4px 16px ${b.c}15` }}>
            <div style={{ fontSize:20, marginBottom:3 }}>{b.icon}</div>
            <div style={{ fontSize:10, fontWeight:800, color:b.c, whiteSpace:'nowrap' }}>{b.l}</div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.2 }}
        style={{ textAlign:'center', zIndex:10, position:'relative', marginTop:370 }}>
        <div style={{ fontSize:11, fontFamily:'var(--font-mono)', color:C.indigo, letterSpacing:'0.18em', marginBottom:10 }}>HOW IT WORKS</div>
        <h2 style={{ fontSize:'clamp(24px,3.5vw,40px)', fontWeight:800, color:'#0f2244', lineHeight:1.2, marginBottom:12 }}>Websites That Rank,<br /><span style={{ color:C.indigo }}>Convert & Get Cited</span></h2>
        <motion.div animate={{ y:[0,7,0] }} transition={{ duration:1.8, repeat:Infinity }}
          style={{ marginTop:18, display:'flex', flexDirection:'column', alignItems:'center', gap:6, opacity:0.7 }}>
          <div style={{ width:24, height:38, borderRadius:12, border:`2px solid ${C.indigo}50`, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:5 }}>
            <motion.div animate={{ y:[0,10,0] }} transition={{ duration:1.8, repeat:Infinity }} style={{ width:4, height:8, borderRadius:2, background:C.indigo }} />
          </div>
          <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color:C.indigo, letterSpacing:'0.14em' }}>SCROLL TO BEGIN</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function WebDesignHowItWorks() {
  return <ServiceWorkflowCards steps={STEPS} introNode={<WebDesignIntroScene />} cardW={1060} cardH={520} sideXOffset={9999} sectionBg="#f5f0ff" />
}
