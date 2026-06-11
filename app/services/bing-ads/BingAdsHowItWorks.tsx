'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ServiceWorkflowCards, { type WorkflowStep } from '@/components/ui/ServiceWorkflowCards'

const B = {
  blue:   '#0078d4',
  li:     '#0a66c2',
  sky:    '#00bcf2',
  green:  '#107c10',
  teal:   '#00b4d8',
  navy:   '#071929',
  mid:    '#0a2540',
  lite:   '#bae6fd',
}

/* ─────────────────────────────────────────────
   SCENE 1 – Import & Audit
   Full-bleed: Google → Microsoft migration
───────────────────────────────────────────── */
function Scene1({ active }: { active: boolean; color: string }) {
  const [step, setStep] = useState(0)
  const checks = ['Keyword gaps', 'Bid strategy', 'Quality Scores', 'Audience gaps']
  const BARS_G = [65, 48, 71, 55, 80, 62]
  const BARS_M = [72, 58, 84, 68, 91, 76]

  useEffect(() => {
    if (!active) { setStep(0); return }
    const iv = setInterval(() => setStep(s => s < 3 ? s + 1 : s), 700)
    return () => clearInterval(iv)
  }, [active])

  return (
    <div style={{ position:'absolute', inset:0, background:`linear-gradient(140deg, ${B.navy}, #061d38 55%, #04162c 100%)`, overflow:'hidden', display:'flex', gap:0 }}>
      {/* Left: migration visual */}
      <div style={{ flex:'0 0 55%', padding:'16px 8px 16px 16px', display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ fontSize:7.5, color:B.sky, fontWeight:800, letterSpacing:'0.14em', fontFamily:'var(--font-mono)', opacity:0.9 }}>CAMPAIGN MIGRATION</div>

        <div style={{ flex:1, display:'flex', gap:8, alignItems:'stretch' }}>
          {/* Google side */}
          <motion.div animate={{ opacity: active ? 0.55 : 0.25 }}
            style={{ flex:1, background:'rgba(234,67,53,0.1)', border:'1.5px solid rgba(234,67,53,0.3)', borderRadius:12, padding:'10px', display:'flex', flexDirection:'column', gap:5 }}>
            <div style={{ fontSize:14, textAlign:'center' }}>🔴</div>
            <div style={{ fontSize:10, fontWeight:800, color:'rgba(234,67,53,0.8)', textAlign:'center', fontFamily:'var(--font-mono)' }}>Google Ads</div>
            <div style={{ flex:1, display:'flex', alignItems:'flex-end', gap:2 }}>
              {BARS_G.map((h,i) => (
                <motion.div key={i}
                  animate={{ height: active ? `${h}%` : '10%' }}
                  transition={{ duration:0.5, delay:i*0.06 }}
                  style={{ flex:1, background:'rgba(234,67,53,0.5)', borderRadius:'3px 3px 1px 1px' }} />
              ))}
            </div>
            {['12 campaigns','84 ad groups','340 keywords'].map(t => (
              <div key={t} style={{ fontSize:8, color:'rgba(234,67,53,0.6)', background:'rgba(234,67,53,0.08)', borderRadius:4, padding:'2px 5px', textAlign:'center' }}>{t}</div>
            ))}
          </motion.div>

          {/* Arrow */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4 }}>
            <motion.div animate={{ x: active ? [0,5,0] : 0 }} transition={{ duration:0.9, repeat:Infinity }} style={{ fontSize:20, color:B.sky }}>→</motion.div>
            <div style={{ fontSize:7.5, color:B.sky, fontFamily:'var(--font-mono)', fontWeight:800, textAlign:'center', letterSpacing:'0.06em' }}>IMPORT<br/>+TUNE</div>
          </div>

          {/* Microsoft side */}
          <motion.div animate={{ opacity: active ? 1 : 0.35, boxShadow: active ? `0 4px 20px ${B.blue}40` : 'none' }}
            style={{ flex:1, background:`${B.blue}18`, border:`1.5px solid ${B.blue}50`, borderRadius:12, padding:'10px', display:'flex', flexDirection:'column', gap:5 }}>
            <div style={{ fontSize:14, textAlign:'center' }}>🔷</div>
            <div style={{ fontSize:10, fontWeight:800, color:B.sky, textAlign:'center', fontFamily:'var(--font-mono)' }}>Microsoft Ads</div>
            <div style={{ flex:1, display:'flex', alignItems:'flex-end', gap:2 }}>
              {BARS_M.map((h,i) => (
                <motion.div key={i}
                  animate={{ height: active ? `${h}%` : '10%' }}
                  transition={{ duration:0.5, delay:0.3+i*0.06 }}
                  style={{ flex:1, background:`linear-gradient(180deg, ${B.sky}, ${B.blue}80)`, borderRadius:'3px 3px 1px 1px', boxShadow: active ? `0 0 6px ${B.sky}50` : 'none' }} />
              ))}
            </div>
            {['12 campaigns ✓','84 ad groups ✓','+ LinkedIn layer'].map((t,i) => (
              <motion.div key={t}
                animate={{ color: active ? (i===2 ? B.sky : `${B.lite}90`) : 'rgba(186,230,253,0.3)', background: active ? `${B.blue}20` : `${B.blue}08` }}
                transition={{ delay:i*0.07 }}
                style={{ fontSize:8, borderRadius:4, padding:'2px 5px', textAlign:'center', border:`1px solid ${B.blue}30` }}>
                {t}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right: audit checklist */}
      <div style={{ flex:'0 0 45%', padding:'16px 16px 16px 6px', display:'flex', flexDirection:'column', gap:8 }}>
        <div style={{ fontSize:7.5, color:B.blue, fontWeight:800, letterSpacing:'0.14em', fontFamily:'var(--font-mono)', opacity:0.9 }}>AUDIT CHECKLIST</div>
        {checks.map((item, i) => (
          <motion.div key={item}
            animate={{ opacity: active ? 1 : 0.2, x: active ? 0 : -8 }}
            transition={{ delay:0.1+i*0.1 }}
            style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 12px', background: step > i ? `${B.blue}22` : `${B.blue}0a`, border:`1.5px solid ${step > i ? B.blue+'55' : B.blue+'20'}`, borderRadius:10, transition:'all 0.4s' }}>
            <motion.div
              animate={{ background: step > i ? B.green : `${B.blue}30`, scale: step === i+1 ? [1,1.2,1] : 1 }}
              transition={{ duration:0.4, repeat: step===i+1 ? 2 : 0 }}
              style={{ width:16, height:16, borderRadius:'50%', display:'grid', placeItems:'center', fontSize:9, color:'#fff', flexShrink:0 }}>
              {step > i ? '✓' : '○'}
            </motion.div>
            <span style={{ fontSize:10.5, color: step > i ? B.lite : `${B.lite}55`, fontWeight: step > i ? 700 : 400 }}>{item}</span>
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: active ? 1 : 0.2 }}
          transition={{ delay:0.5 }}
          style={{ marginTop:4, background:`${B.green}18`, border:`1.5px solid ${B.green}45`, borderRadius:10, padding:'10px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:10, color:`${B.lite}80` }}>Cost savings vs Google</span>
          <span style={{ fontSize:20, fontWeight:900, color:B.green, fontFamily:'var(--font-mono)' }}>−52%</span>
        </motion.div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SCENE 2 – LinkedIn Targeting
   Full-bleed: LinkedIn profile layers + audience
───────────────────────────────────────────── */
function Scene2({ active }: { active: boolean; color: string }) {
  const [count, setCount] = useState(0)
  const rows = [
    { label:'Job title', value:'Security Mgr, Facilities Dir', icon:'👔' },
    { label:'Industry',  value:'Physical Security · Logistics',icon:'🏢' },
    { label:'Org size',  value:'50–500 employees',             icon:'📊' },
    { label:'Seniority', value:'Manager, Director, VP',        icon:'⭐' },
  ]
  const tags = ['Security Manager','Facilities Director','Head of Ops','Commercial RE','50–500 employees']

  useEffect(() => {
    if (!active) { setCount(0); return }
    const iv = setInterval(() => setCount(v => v < 28400 ? v + 470 : v), 30)
    return () => clearInterval(iv)
  }, [active])

  return (
    <div style={{ position:'absolute', inset:0, background:`linear-gradient(140deg, #05162a, #071e3a 50%, #040f20 100%)`, overflow:'hidden', display:'flex', gap:0 }}>
      {/* Left: LinkedIn targeting panel */}
      <div style={{ flex:'0 0 56%', padding:'16px 8px 16px 16px', display:'flex', flexDirection:'column', gap:8 }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:2 }}>
          <div style={{ width:28, height:28, borderRadius:6, background:B.li, display:'grid', placeItems:'center', fontWeight:900, fontSize:14, color:'#fff', flexShrink:0 }}>in</div>
          <div>
            <div style={{ fontSize:11, fontWeight:800, color:B.lite }}>LinkedIn Profile Targeting</div>
            <div style={{ fontSize:8, color:`${B.lite}50`, fontFamily:'var(--font-mono)' }}>Microsoft × LinkedIn data</div>
          </div>
          <motion.div animate={{ background: active ? `${B.green}22` : `${B.blue}10`, color: active ? B.green : `${B.lite}40` }}
            style={{ marginLeft:'auto', padding:'2px 8px', borderRadius:99, border:`1px solid ${B.green}40`, fontSize:8, fontFamily:'var(--font-mono)', fontWeight:800 }}>LIVE</motion.div>
        </div>
        {rows.map((r,i) => (
          <motion.div key={r.label}
            animate={{ opacity: active ? 1 : 0.2, x: active ? 0 : -8, background: active ? `${B.li}14` : `${B.li}06` }}
            transition={{ delay:0.05+i*0.08 }}
            style={{ padding:'7px 10px', border:`1.5px solid ${B.li}30`, borderRadius:10, display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:13 }}>{r.icon}</span>
            <span style={{ width:56, fontSize:8, fontFamily:'var(--font-mono)', color:`${B.lite}45`, textTransform:'uppercase', letterSpacing:0.4, flexShrink:0 }}>{r.label}</span>
            <span style={{ flex:1, fontSize:10, color:`${B.lite}80` }}>{r.value}</span>
          </motion.div>
        ))}
        {/* Matched buyers */}
        <motion.div animate={{ opacity: active ? 1 : 0.25 }} transition={{ delay:0.4 }}
          style={{ padding:'8px 12px', background:`${B.li}20`, border:`1.5px solid ${B.li}50`, borderRadius:10, display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow: active ? `0 3px 16px ${B.li}30` : 'none' }}>
          <span style={{ fontSize:10, color:`${B.lite}70` }}>Matched B2B buyers</span>
          <span style={{ fontSize:22, fontWeight:900, color:B.sky, fontFamily:'var(--font-mono)' }}>{count.toLocaleString()}</span>
        </motion.div>
      </div>

      {/* Right: audience tags flowing in */}
      <div style={{ flex:'0 0 44%', padding:'16px 16px 16px 6px', display:'flex', flexDirection:'column', gap:8 }}>
        <div style={{ fontSize:7.5, color:`${B.lite}70`, fontWeight:800, letterSpacing:'0.14em', fontFamily:'var(--font-mono)' }}>AUDIENCE SEGMENTS</div>
        <div style={{ flex:1, display:'flex', flexWrap:'wrap', gap:7, alignContent:'flex-start' }}>
          {tags.map((tag,i) => (
            <motion.div key={tag}
              initial={{ opacity:0, scale:0.7, y:8 }}
              animate={active ? { opacity:1, scale:1, y:0 } : { opacity:0.2, scale:0.85, y:4 }}
              transition={{ delay:0.1+i*0.1, type:'spring', stiffness:220 }}
              style={{ background:`linear-gradient(135deg, ${B.li}, #084c9e)`, color:'#fff', borderRadius:99, padding:'5px 12px', fontSize:10, fontWeight:700, boxShadow: active ? `0 3px 12px ${B.li}45` : 'none' }}>
              {tag}
            </motion.div>
          ))}
        </div>
        {/* CPC saving */}
        <motion.div animate={{ opacity: active ? 1 : 0.2 }} transition={{ delay:0.55 }}
          style={{ background:`linear-gradient(135deg, ${B.blue}30, ${B.teal}18)`, border:`1.5px solid ${B.sky}35`, borderRadius:12, padding:'10px 14px' }}>
          <div style={{ fontSize:8, color:`${B.lite}60`, fontFamily:'var(--font-mono)', marginBottom:4 }}>EXCLUSIVE B2B REACH</div>
          <div style={{ fontSize:13, fontWeight:800, color:B.lite }}>Only Microsoft Ads</div>
          <div style={{ fontSize:10, color:`${B.sky}`, marginTop:3 }}>reaches these LinkedIn profiles — Google can&apos;t.</div>
        </motion.div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SCENE 3 – Launch & Track
   Full-bleed: live conversion feed + bar chart
───────────────────────────────────────────── */
function Scene3({ active }: { active: boolean; color: string }) {
  const [convCount, setConvCount] = useState(0)
  const [barH, setBarH] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const BARS = [32,48,44,60,68,64,79,74,88,82,96,90]
  const feed = [
    { label:'Form submitted',  time:'2m ago',  ltv:'$480',   c:B.green },
    { label:'Quote requested', time:'11m ago', ltv:'$1,200', c:B.blue  },
    { label:'Phone call 3:42', time:'28m ago', ltv:'$860',   c:B.sky   },
    { label:'Demo booked',     time:'1h ago',  ltv:'$2,400', c:B.green },
  ]

  useEffect(() => {
    if (!active) { setConvCount(0); setBarH([0,0,0,0,0,0,0,0,0,0,0,0]); return }
    const cv = setInterval(() => setConvCount(v => v < 184 ? v + 3 : v), 28)
    let bi = 0
    const bv = setInterval(() => {
      if (bi >= BARS.length) { clearInterval(bv); return }
      const idx = bi; setBarH(prev => { const n=[...prev]; n[idx]=BARS[idx]; return n }); bi++
    }, 90)
    return () => { clearInterval(cv); clearInterval(bv) }
  }, [active])

  return (
    <div style={{ position:'absolute', inset:0, background:`linear-gradient(140deg, ${B.navy}, #051a2e 55%, #030f1e 100%)`, overflow:'hidden', display:'flex', gap:0 }}>
      {/* Left: bar chart + counter */}
      <div style={{ flex:'0 0 48%', padding:'16px 8px 16px 16px', display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontSize:7.5, color:B.green, fontWeight:800, letterSpacing:'0.14em', fontFamily:'var(--font-mono)' }}>LIVE CONVERSIONS</div>
          <motion.div animate={{ scale: active ? [1,1.3,1] : 1 }} transition={{ duration:1.1, repeat:Infinity }}
            style={{ display:'flex', gap:4, alignItems:'center' }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:B.green }} />
            <span style={{ fontSize:8, color:B.green, fontWeight:700 }}>LIVE</span>
          </motion.div>
        </div>
        {/* Counter */}
        <motion.div animate={{ opacity: active ? 1 : 0.3 }}
          style={{ background:`${B.green}18`, border:`1.5px solid ${B.green}45`, borderRadius:12, padding:'10px 14px', display:'flex', gap:12, alignItems:'center', boxShadow: active ? `0 4px 18px ${B.green}25` : 'none' }}>
          <span style={{ fontSize:32, fontWeight:900, color:B.green, fontFamily:'var(--font-mono)', lineHeight:1 }}>{convCount}</span>
          <div>
            <div style={{ fontSize:10, fontWeight:700, color:B.green }}>Conversions this month</div>
            <div style={{ fontSize:9, color:`${B.lite}50` }}>+46 vs last month ▲</div>
          </div>
        </motion.div>
        {/* Bar chart */}
        <div style={{ flex:1, background:`${B.blue}0d`, border:`1px solid ${B.blue}20`, borderRadius:10, padding:'10px 10px 6px', display:'flex', flexDirection:'column' }}>
          <div style={{ fontSize:7.5, color:`${B.lite}50`, fontFamily:'var(--font-mono)', marginBottom:8 }}>WEEKLY TREND</div>
          <div style={{ flex:1, display:'flex', alignItems:'flex-end', gap:3 }}>
            {barH.map((h,i) => (
              <motion.div key={i}
                animate={{ height: active ? `${h}%` : '4%' }}
                transition={{ duration:0.5, delay:0.05+i*0.07, ease:'backOut' }}
                style={{ flex:1, borderRadius:'4px 4px 2px 2px', background:`linear-gradient(180deg, ${B.sky}, ${B.blue}80)`, minHeight:4, boxShadow: h > 70 ? `0 0 8px ${B.sky}50` : 'none' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Right: conversion feed */}
      <div style={{ flex:'0 0 52%', padding:'16px 16px 16px 6px', display:'flex', flexDirection:'column', gap:7 }}>
        <div style={{ fontSize:7.5, color:`${B.lite}70`, fontWeight:800, letterSpacing:'0.14em', fontFamily:'var(--font-mono)' }}>LEAD FEED</div>
        {feed.map((c,i) => (
          <motion.div key={c.label}
            animate={{ opacity: active ? 1 : 0.2, x: active ? 0 : 10 }}
            transition={{ delay:0.1+i*0.08 }}
            style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 12px', background: i===0 && active ? `${c.c}14` : `${B.blue}0a`, border:`1.5px solid ${i===0 && active ? c.c+'35' : B.blue+'18'}`, borderRadius:10, transition:'all 0.35s' }}>
            <motion.div animate={{ scale: i===0 && active ? [1,1.5,1] : 1 }} transition={{ duration:1.2, repeat:Infinity }}
              style={{ width:8, height:8, borderRadius:'50%', background: active ? c.c : `${B.blue}40`, flexShrink:0 }} />
            <span style={{ flex:1, fontSize:11, color:`${B.lite}80` }}>{c.label}</span>
            <span style={{ fontSize:9, color:`${B.lite}35`, fontFamily:'var(--font-mono)' }}>{c.time}</span>
            <span style={{ fontSize:11, fontWeight:800, color: active ? c.c : `${B.lite}30`, fontFamily:'var(--font-mono)' }}>{c.ltv}</span>
          </motion.div>
        ))}
        {/* CPA metric */}
        <motion.div animate={{ opacity: active ? 1 : 0.2 }} transition={{ delay:0.5 }}
          style={{ marginTop:2, background:`${B.blue}18`, border:`1.5px solid ${B.sky}30`, borderRadius:10, padding:'8px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:10, color:`${B.lite}60` }}>Cost per B2B lead</span>
          <span style={{ fontSize:20, fontWeight:900, color:B.sky, fontFamily:'var(--font-mono)' }}>$36</span>
        </motion.div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SCENE 4 – Optimise & Expand
   Full-bleed: audience network + falling CPL
───────────────────────────────────────────── */
function Scene4({ active }: { active: boolean; color: string }) {
  const [cpl, setCpl] = useState(80)
  const placements = [
    { label:'Bing Search',     scale:100, icon:'🔍', c:B.blue  },
    { label:'MSN News Feed',   scale:72,  icon:'📰', c:B.sky   },
    { label:'Outlook Sidebar', scale:60,  icon:'📧', c:B.blue  },
    { label:'Edge New Tab',    scale:54,  icon:'🌐', c:B.teal  },
    { label:'LinkedIn Feed',   scale:48,  icon:'💼', c:B.li    },
    { label:'Partner Sites',   scale:38,  icon:'🤝', c:B.green },
  ]

  useEffect(() => {
    if (!active) { setCpl(80); return }
    const iv = setInterval(() => setCpl(v => v > 36 ? v - 1 : v), 50)
    return () => clearInterval(iv)
  }, [active])

  return (
    <div style={{ position:'absolute', inset:0, background:`linear-gradient(140deg, ${B.navy}, #071e38 55%, #040f1e 100%)`, overflow:'hidden', display:'flex', gap:0 }}>
      {/* Left: placement bars */}
      <div style={{ flex:'0 0 55%', padding:'16px 8px 16px 16px', display:'flex', flexDirection:'column', gap:8 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontSize:7.5, color:B.sky, fontWeight:800, letterSpacing:'0.14em', fontFamily:'var(--font-mono)' }}>AUDIENCE NETWORK</div>
          <motion.div animate={{ color: active ? B.green : `${B.lite}30`, background: active ? `${B.green}20` : `${B.blue}10` }}
            style={{ padding:'2px 8px', borderRadius:99, border:`1px solid ${B.green}35`, fontSize:8, fontFamily:'var(--font-mono)', fontWeight:800 }}>EXPANDING</motion.div>
        </div>
        {placements.map((p,i) => (
          <div key={p.label} style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:12, flexShrink:0 }}>{p.icon}</span>
            <span style={{ width:100, fontSize:10, color:`${B.lite}65`, flexShrink:0 }}>{p.label}</span>
            <div style={{ flex:1, height:8, background:`${B.blue}20`, borderRadius:4, overflow:'hidden' }}>
              <motion.div animate={{ width: active ? `${p.scale}%` : '0%' }} transition={{ duration:0.7, delay:i*0.08 }}
                style={{ height:'100%', borderRadius:4, background:`linear-gradient(90deg, ${p.c}, ${p.c}80)`, boxShadow: active ? `0 0 8px ${p.c}50` : 'none' }} />
            </div>
            <span style={{ width:28, textAlign:'right', fontSize:9.5, fontFamily:'var(--font-mono)', color: active ? p.c : `${B.lite}30`, flexShrink:0 }}>{p.scale}%</span>
          </div>
        ))}
      </div>

      {/* Right: falling CPL + roas */}
      <div style={{ flex:'0 0 45%', padding:'16px 16px 16px 6px', display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ fontSize:7.5, color:`${B.lite}70`, fontWeight:800, letterSpacing:'0.14em', fontFamily:'var(--font-mono)' }}>OPTIMISATION</div>
        {/* CPL falling */}
        <motion.div animate={{ opacity: active ? 1 : 0.2, boxShadow: active ? `0 6px 24px ${B.green}30` : 'none' }}
          style={{ background:`${B.green}18`, border:`1.5px solid ${B.green}45`, borderRadius:14, padding:'14px 16px' }}>
          <div style={{ fontSize:9, color:`${B.lite}60`, fontFamily:'var(--font-mono)', marginBottom:5 }}>COST PER B2B LEAD</div>
          <div style={{ display:'flex', alignItems:'baseline', gap:5 }}>
            <motion.span animate={{ color: cpl < 50 ? B.green : B.sky }} style={{ fontSize:38, fontWeight:900, fontFamily:'var(--font-mono)', lineHeight:1 }}>${cpl}</motion.span>
            <span style={{ fontSize:12, color:B.green, fontWeight:700 }}>↓ falling</span>
          </div>
          <div style={{ marginTop:8, height:6, background:`${B.blue}20`, borderRadius:3, overflow:'hidden' }}>
            <motion.div animate={{ width: active ? `${100 - ((cpl-36)/(80-36)*100)}%` : '0%' }} transition={{ duration:0.1 }}
              style={{ height:'100%', background:`linear-gradient(90deg, ${B.green}, ${B.teal})`, borderRadius:3, boxShadow:`0 0 8px ${B.green}50` }} />
          </div>
        </motion.div>
        {/* ROAS + impressions */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {[
            { l:'ROAS', v:'4.1×', c:B.sky },
            { l:'Imp. Share', v:'87%', c:B.blue },
          ].map((m,i) => (
            <motion.div key={m.l}
              animate={{ opacity: active ? 1 : 0.2, y: active ? 0 : 6 }}
              transition={{ delay:0.25+i*0.1 }}
              style={{ background:`${m.c}15`, border:`1.5px solid ${m.c}40`, borderRadius:10, padding:'8px 10px', textAlign:'center' }}>
              <div style={{ fontSize:8, color:`${B.lite}55`, fontFamily:'var(--font-mono)' }}>{m.l}</div>
              <div style={{ fontSize:22, fontWeight:900, color:m.c, fontFamily:'var(--font-mono)' }}>{m.v}</div>
            </motion.div>
          ))}
        </div>
        {/* LinkedIn reach badge */}
        <motion.div animate={{ opacity: active ? 1 : 0.2 }} transition={{ delay:0.4 }}
          style={{ background:`linear-gradient(135deg, ${B.li}25, ${B.blue}18)`, border:`1.5px solid ${B.li}40`, borderRadius:12, padding:'10px 12px', display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:24, height:24, borderRadius:5, background:B.li, display:'grid', placeItems:'center', fontSize:12, color:'#fff', fontWeight:900, flexShrink:0 }}>in</div>
          <div>
            <div style={{ fontSize:9, fontWeight:800, color:B.lite }}>LinkedIn B2B Reach</div>
            <div style={{ fontSize:8, color:`${B.lite}55` }}>unique to Microsoft Ads</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const STEPS = [
  { step:'01', tag:'IMPORT', title:'Import & Audit',           color:'#0078d4', glow:'rgba(0,120,212,0.55)',  Scene: Scene1 },
  { step:'02', tag:'LAYER',  title:'Layer LinkedIn Targeting', color:'#0a66c2', glow:'rgba(10,102,194,0.55)', Scene: Scene2 },
  { step:'03', tag:'LAUNCH', title:'Launch & Track',           color:'#107c10', glow:'rgba(16,124,16,0.55)',  Scene: Scene3 },
  { step:'04', tag:'SCALE',  title:'Optimise & Expand',        color:'#00b4d8', glow:'rgba(0,180,216,0.55)',  Scene: Scene4 },
] satisfies WorkflowStep[]

/* ─────────────────────────────────────────────
   INTRO SCENE — all elements position:absolute
   to prevent overlap issues
───────────────────────────────────────────── */
const LI_TAGS = ['Security Manager','Facilities Director','Head of Operations','Commercial RE','50–500 employees']
const BING_METRICS = [
  { label:'CPC vs Google', value:'−52%', c:B.blue,  icon:'💲' },
  { label:'B2B Reach',     value:'+41%', c:B.green, icon:'🎯' },
  { label:'Conv. Rate',    value:'6.4%', c:'#f29900',icon:'📈' },
  { label:'Monthly Leads', value:'142',  c:B.sky,   icon:'🤝' },
]

function BingIntroScene() {
  const [shown, setShown] = useState(0)
  const [cpc,   setCpc]   = useState(100)

  useEffect(() => {
    const iv = setInterval(() => setShown(v => Math.min(v+1, BING_METRICS.length)), 320)
    const sv = setInterval(() => setCpc(v => v > 48 ? v - 1 : v), 28)
    return () => { clearInterval(iv); clearInterval(sv) }
  }, [])

  return (
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg, #e8f4ff 0%, #f0f8ff 100%)', overflow:'hidden' }}>
      {/* Ambient glows */}
      <div style={{ position:'absolute', top:'20%', left:'35%', width:600, height:500, borderRadius:'50%', background:`radial-gradient(ellipse, ${B.blue}14 0%, transparent 65%)`, pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:'60%', left:'55%', width:340, height:340, borderRadius:'50%', background:`radial-gradient(ellipse, ${B.li}10 0%, transparent 65%)`, pointerEvents:'none' }} />

      {/* Header bar — top */}
      <div style={{ position:'absolute', top:20, left:'50%', transform:'translateX(-50%)', width:500, background:'#fff', borderRadius:16, border:`2px solid ${B.blue}22`, padding:'12px 18px', display:'flex', alignItems:'center', gap:12, boxShadow:`0 6px 30px ${B.blue}14` }}>
        <div style={{ width:36, height:36, background:`linear-gradient(135deg, ${B.blue}, #00bcf2)`, borderRadius:10, display:'grid', placeItems:'center', flexShrink:0, fontSize:18 }}>Ⓜ</div>
        <div>
          <div style={{ fontSize:13, fontWeight:800, color:'#0f2244' }}>Microsoft Advertising</div>
          <div style={{ fontSize:10.5, color:'#46546e', fontFamily:'var(--font-mono)' }}>Security B2B · Sydney Metro</div>
        </div>
        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:6 }}>
          <motion.div animate={{ scale:[1,1.5,1] }} transition={{ duration:1.2, repeat:Infinity }} style={{ width:7, height:7, borderRadius:'50%', background:B.green }} />
          <span style={{ fontSize:11, color:B.green, fontWeight:800 }}>LIVE</span>
        </div>
      </div>

      {/* CPC saver — left */}
      <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.3, type:'spring', stiffness:180 }}
        style={{ position:'absolute', top:'22%', left:'5%', background:`linear-gradient(135deg, ${B.blue}, #005ba1)`, borderRadius:18, padding:'14px 20px', boxShadow:`0 10px 40px ${B.blue}45`, textAlign:'center', minWidth:120 }}>
        <div style={{ fontSize:9, color:'rgba(255,255,255,0.7)', letterSpacing:'0.1em', marginBottom:4 }}>CPC vs Google</div>
        <div style={{ fontSize:36, fontWeight:900, color:'#fff', fontFamily:'var(--font-mono)', lineHeight:1 }}>−{100-cpc}%</div>
        <div style={{ fontSize:9.5, color:'rgba(255,255,255,0.8)', marginTop:4 }}>lower cost per click</div>
      </motion.div>

      {/* Metric tiles — center */}
      <div style={{ position:'absolute', top:'22%', left:'50%', transform:'translateX(-50%)', width:380, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        {BING_METRICS.map((m,i) => (
          <motion.div key={m.label} initial={{ opacity:0, y:16 }} animate={i < shown ? { opacity:1, y:0 } : {}} transition={{ duration:0.35, type:'spring' }}
            style={{ background:'#fff', borderRadius:14, padding:'14px', border:`2px solid ${m.c}25`, boxShadow:`0 4px 18px ${m.c}14` }}>
            <div style={{ fontSize:11, color:'#46546e', marginBottom:4 }}>{m.icon} {m.label}</div>
            <div style={{ fontSize:24, fontWeight:900, color:m.c, fontFamily:'var(--font-mono)' }}>{m.value}</div>
          </motion.div>
        ))}
      </div>

      {/* LinkedIn tags — bottom third */}
      <div style={{ position:'absolute', bottom:'28%', left:'50%', transform:'translateX(-50%)', width:530, textAlign:'center' }}>
        <div style={{ fontSize:10, fontFamily:'var(--font-mono)', color:B.li, marginBottom:10, letterSpacing:'0.1em', fontWeight:700 }}>in  LINKEDIN PROFILE TARGETING · EXCLUSIVE</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center' }}>
          {LI_TAGS.map((tag,i) => (
            <motion.div key={tag} initial={{ opacity:0, scale:0.75 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.9+i*0.12, type:'spring', stiffness:200 }}
              style={{ background:`linear-gradient(135deg, ${B.li}, #084c9e)`, color:'#fff', borderRadius:99, padding:'5px 14px', fontSize:11, fontWeight:700, boxShadow:`0 3px 12px ${B.li}40` }}>
              {tag}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll CTA — pinned to bottom */}
      <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
        style={{ position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)', textAlign:'center' }}>
        <h2 style={{ fontSize:'clamp(20px,2.8vw,34px)', fontWeight:800, color:'#0f2244', lineHeight:1.2, marginBottom:14, whiteSpace:'nowrap' }}>
          Capture B2B Buyers <span style={{ color:B.blue }}>Google Can&apos;t Reach</span>
        </h2>
        <motion.div animate={{ y:[0,7,0] }} transition={{ duration:1.8, repeat:Infinity }}
          style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5, opacity:0.65 }}>
          <div style={{ width:24, height:38, borderRadius:12, border:`2px solid ${B.blue}55`, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:5 }}>
            <motion.div animate={{ y:[0,10,0] }} transition={{ duration:1.8, repeat:Infinity }} style={{ width:4, height:8, borderRadius:2, background:B.blue }} />
          </div>
          <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color:B.blue, letterSpacing:'0.14em' }}>SCROLL TO BEGIN</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function BingAdsHowItWorks() {
  return <ServiceWorkflowCards steps={STEPS} introNode={<BingIntroScene />} cardW={1060} cardH={520} sideXOffset={9999} sectionBg="#f0f6ff" />
}
