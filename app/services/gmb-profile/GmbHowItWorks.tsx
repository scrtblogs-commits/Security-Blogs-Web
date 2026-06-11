'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ServiceWorkflowCards, { type WorkflowStep } from '@/components/ui/ServiceWorkflowCards'

const G = { red:'#ea4335', blue:'#4285f4', green:'#34a853', yellow:'#fbbc04' }

/* ── Scene 1: Profile Setup ── */
function Scene1({ active }: { active: boolean; color: string }) {
  const fields = [
    { label:'Business name',    val:'SecureMax CCTV',           c:G.blue  },
    { label:'Primary category', val:'Security System Installer', c:G.red   },
    { label:'Service area',     val:'Sydney Metro · NSW',        c:G.green },
    { label:'Phone',            val:'(02) 9000 0000',            c:G.blue  },
    { label:'Hours',            val:'Open 24/7',                 c:G.green },
  ]
  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', gap:8, padding:'10px 4px' }}>
      <div style={{ display:'flex', gap:3, marginBottom:2 }}>
        {[G.blue,G.red,G.yellow,G.green].map(c => <div key={c} style={{ flex:1, height:4, borderRadius:2, background:c }} />)}
      </div>
      <div style={{ fontSize:8, fontWeight:800, letterSpacing:'0.12em', fontFamily:'var(--font-mono)', color:G.blue }}>GOOGLE BUSINESS PROFILE</div>
      <div style={{ display:'flex', flexDirection:'column', gap:6, flex:1 }}>
        {fields.map((f,i) => (
          <motion.div key={f.label}
            animate={{ opacity: active ? 1 : 0.3, x: active ? 0 : -8 }}
            transition={{ duration:0.3, delay: i*0.07 }}
            style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 10px', background:`${f.c}10`, borderRadius:8, border:`1.5px solid ${f.c}35`, boxShadow: active ? `0 2px 8px ${f.c}18` : 'none' }}>
            <span style={{ fontSize:9, color:'rgba(15,34,68,0.5)' }}>{f.label}</span>
            <span style={{ fontSize:10, fontWeight:800, color:f.c, fontFamily:'var(--font-mono)' }}>{f.val}</span>
          </motion.div>
        ))}
      </div>
      <motion.div animate={{ opacity: active ? 1 : 0.3 }} transition={{ duration:0.3, delay:0.4 }}
        style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 10px', background:`${G.yellow}18`, borderRadius:8, border:`1.5px solid ${G.yellow}50` }}>
        <motion.span animate={{ scale: active ? [1,1.3,1] : 1 }} transition={{ duration:0.8, repeat:Infinity, repeatDelay:0.5 }} style={{ width:8, height:8, borderRadius:'50%', background:G.yellow, display:'inline-block' }} />
        <span style={{ fontSize:9, color:'#92600a', fontWeight:700, fontFamily:'var(--font-mono)' }}>Pending verification · postcard sent</span>
      </motion.div>
    </div>
  )
}

/* ── Scene 2: Verification ── */
function Scene2({ active }: { active: boolean; color: string }) {
  const digits = ['4','8','2','7','1']
  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', gap:12, padding:'10px 4px', alignItems:'center', justifyContent:'center' }}>
      {/* Google logo strip */}
      <div style={{ display:'flex', gap:2, fontSize:20, fontWeight:900, letterSpacing:-1 }}>
        {'Google'.split('').map((l,i) => <span key={i} style={{ color:[G.blue,G.red,G.yellow,G.blue,G.green,G.red][i] }}>{l}</span>)}
      </div>
      <motion.div animate={{ scale: active ? 1 : 0.88, opacity: active ? 1 : 0.4 }} transition={{ duration:0.4 }}
        style={{ width:'100%', background:'#fff', borderRadius:14, border:`2px solid ${G.blue}35`, boxShadow:`0 8px 28px ${G.blue}20`, padding:'14px 16px' }}>
        <div style={{ fontSize:8, color:'rgba(15,34,68,0.4)', fontWeight:700, letterSpacing:'0.1em', fontFamily:'var(--font-mono)', marginBottom:10, textAlign:'center' }}>VERIFICATION CODE</div>
        <div style={{ display:'flex', gap:6, justifyContent:'center', marginBottom:10 }}>
          {digits.map((d,i) => (
            <motion.div key={i}
              animate={{ y: active ? 0 : 8, opacity: active ? 1 : 0, rotateX: active ? 0 : -45 }}
              transition={{ duration:0.35, delay:0.12+i*0.08, type:'spring', stiffness:200 }}
              style={{ width:30, height:38, borderRadius:9, background:`linear-gradient(135deg, ${[G.blue,G.red,G.yellow,G.green,G.blue][i]}25, ${[G.blue,G.red,G.yellow,G.green,G.blue][i]}10)`, border:`2px solid ${[G.blue,G.red,G.yellow,G.green,G.blue][i]}55`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, fontWeight:900, color:[G.blue,G.red,G.yellow,G.green,G.blue][i], fontFamily:'var(--font-mono)' }}>
              {d}
            </motion.div>
          ))}
        </div>
        <div style={{ fontSize:9, color:'rgba(15,34,68,0.45)', textAlign:'center' }}>Enter this code in your dashboard</div>
      </motion.div>
      <motion.div animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.8 }} transition={{ duration:0.4, delay:0.5 }}
        style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 14px', background:`${G.green}18`, borderRadius:999, border:`1.5px solid ${G.green}50` }}>
        <span style={{ fontSize:14 }}>✓</span>
        <span style={{ fontSize:10, color:G.green, fontWeight:800, fontFamily:'var(--font-mono)' }}>Verified · Google confirmed</span>
      </motion.div>
    </div>
  )
}

/* ── Scene 3: Optimisation ── */
function Scene3({ active }: { active: boolean; color: string }) {
  const items = [
    { label:'Primary category',  score:100, c:G.blue  },
    { label:'Service areas (12)', score:95,  c:G.blue  },
    { label:'Business hours',     score:100, c:G.green },
    { label:'Photos added (18)',  score:90,  c:G.red   },
    { label:'Services listed',    score:100, c:G.green },
    { label:'Q&A populated',      score:85,  c:G.yellow },
  ]
  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', gap:7, padding:'10px 4px' }}>
      <div style={{ fontSize:8, fontWeight:800, letterSpacing:'0.12em', fontFamily:'var(--font-mono)', color:G.green }}>PROFILE SCORE</div>
      {items.map((item,i) => (
        <div key={item.label} style={{ display:'flex', alignItems:'center', gap:7 }}>
          <span style={{ fontSize:9, color:'rgba(15,34,68,0.65)', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.label}</span>
          <div style={{ width:56, height:6, background:'rgba(15,34,68,0.08)', borderRadius:3, overflow:'hidden', flexShrink:0 }}>
            <motion.div animate={{ width: active ? `${item.score}%` : '8%' }} transition={{ duration:0.65, delay:i*0.07 }}
              style={{ height:'100%', background:`linear-gradient(90deg, ${item.c}, ${item.c}bb)`, borderRadius:3, boxShadow: active ? `0 0 6px ${item.c}60` : 'none' }} />
          </div>
          <motion.span animate={{ color: active ? item.c : 'rgba(15,34,68,0.3)' }} transition={{ duration:0.3, delay:i*0.07 }}
            style={{ fontSize:9.5, fontWeight:800, fontFamily:'var(--font-mono)', minWidth:26 }}>{item.score}%</motion.span>
        </div>
      ))}
      <motion.div animate={{ opacity: active ? 1 : 0.3, scale: active ? 1 : 0.95 }} transition={{ duration:0.4, delay:0.5 }}
        style={{ marginTop:2, padding:'7px 10px', background:`linear-gradient(135deg, ${G.green}15, ${G.blue}10)`, borderRadius:9, border:`1.5px solid ${G.green}45`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:9, color:G.green, fontWeight:700 }}>Overall score</span>
        <span style={{ fontSize:15, color:G.green, fontWeight:900, fontFamily:'var(--font-mono)' }}>95/100</span>
      </motion.div>
    </div>
  )
}

/* ── Scene 4: Ranking & Management ── */
function Scene4({ active }: { active: boolean; color: string }) {
  const [reviews, setReviews] = useState(218)
  useEffect(() => {
    if (!active) return
    const iv = setInterval(() => setReviews(v => v < 231 ? v + 1 : v), 150)
    return () => clearInterval(iv)
  }, [active])

  const weeks = [28,36,42,55,61,70,75,82,88,91,96,100]
  const ranks = [
    { kw:'CCTV installer Sydney CBD', pos:1, c:G.blue },
    { kw:'security alarm company Sydney', pos:1, c:G.green },
    { kw:'access control Sydney', pos:2, c:G.yellow },
  ]

  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', gap:8, padding:'10px 4px' }}>
      <div style={{ fontSize:8, fontWeight:800, letterSpacing:'0.12em', fontFamily:'var(--font-mono)', color:G.red }}>MAP PACK GROWTH</div>
      <div style={{ display:'flex', alignItems:'flex-end', gap:3, height:50, background:`${G.red}08`, borderRadius:8, padding:'6px', border:`1px solid ${G.red}20` }}>
        {weeks.map((w,i) => (
          <motion.div key={i}
            animate={{ height: active ? `${w}%` : '10%' }}
            transition={{ duration:0.55, delay:i*0.04 }}
            style={{ flex:1, background:`linear-gradient(180deg, ${G.red}, ${G.yellow})`, borderRadius:'3px 3px 0 0', boxShadow: active ? `0 0 6px ${G.red}40` : 'none' }} />
        ))}
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', fontSize:8, color:'rgba(15,34,68,0.4)', fontFamily:'var(--font-mono)' }}>
        <span>Month 1</span><span>Month 3</span>
      </div>
      <div style={{ display:'flex', gap:6 }}>
        {[
          { l:'Reviews', v:reviews, c:G.yellow },
          { l:'Avg Rating', v:'4.9 ★', c:G.yellow, s:true },
          { l:'Map Views', v:'+84%', c:G.green, s:true },
        ].map((m,i) => (
          <motion.div key={m.l}
            animate={{ opacity: active ? 1 : 0.3, scale: active ? 1 : 0.9 }}
            transition={{ duration:0.35, delay:0.2+i*0.07 }}
            style={{ flex:1, textAlign:'center', background:`${m.c}15`, border:`1.5px solid ${m.c}45`, borderRadius:9, padding:'6px 4px', boxShadow: active ? `0 3px 10px ${m.c}25` : 'none' }}>
            <div style={{ fontSize:14, fontWeight:900, color:m.c, fontFamily:'var(--font-mono)' }}>{m.s ? m.v : m.v}</div>
            <div style={{ fontSize:8, color:'rgba(15,34,68,0.5)' }}>{m.l}</div>
          </motion.div>
        ))}
      </div>
      {ranks.map((r,i) => (
        <motion.div key={r.kw}
          animate={{ opacity: active ? 1 : 0.3, x: active ? 0 : -8 }}
          transition={{ duration:0.3, delay:0.35+i*0.07 }}
          style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'4px 8px', background:`${r.c}10`, borderRadius:7, border:`1px solid ${r.c}30` }}>
          <span style={{ fontSize:9, color:'rgba(15,34,68,0.7)' }}>{r.kw}</span>
          <span style={{ fontSize:9.5, fontWeight:900, color:r.c, fontFamily:'var(--font-mono)', background:`${r.c}20`, padding:'1px 7px', borderRadius:4 }}>#{r.pos}</span>
        </motion.div>
      ))}
    </div>
  )
}

const STEPS: WorkflowStep[] = [
  { step:'01', tag:'SETUP',    title:'Profile Setup & Registration',  color:'#34a853', glow:'rgba(52,168,83,0.5)',  Scene: Scene1 },
  { step:'02', tag:'VERIFY',   title:'Verification & Confirmation',  color:'#4285f4', glow:'rgba(66,133,244,0.5)', Scene: Scene2 },
  { step:'03', tag:'OPTIMISE', title:'Full Profile Optimisation',    color:'#ea4335', glow:'rgba(234,67,53,0.5)',  Scene: Scene3 },
  { step:'04', tag:'RANK',     title:'Ranking & Monthly Management', color:'#fbbc04', glow:'rgba(251,188,4,0.5)',  Scene: Scene4 },
]

/* ── Intro Scene ── */
function GmbIntroScene() {
  const [stars, setStars] = useState(0)
  const [reviews, setReviews] = useState(0)
  const [position, setPosition] = useState(4)

  useEffect(() => {
    const t1 = setTimeout(() => setStars(5), 600)
    const iv = setInterval(() => setReviews(v => { if (v >= 218) { clearInterval(iv); return v } return v + 4 }), 18)
    const t2 = setTimeout(() => setPosition(3), 500)
    const t3 = setTimeout(() => setPosition(2), 900)
    const t4 = setTimeout(() => setPosition(1), 1400)
    return () => { clearTimeout(t1); clearInterval(iv); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  return (
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg, #fff8f6 0%, #fffcfa 100%)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {/* Map grid */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(66,133,244,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(66,133,244,0.06) 1px, transparent 1px)', backgroundSize:'52px 52px' }} />
      {/* Roads */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
        <line x1="0" y1="52%" x2="100%" y2="52%" stroke="rgba(66,133,244,0.1)" strokeWidth="10" />
        <line x1="36%" y1="0" x2="36%" y2="100%" stroke="rgba(66,133,244,0.08)" strokeWidth="14" />
        <line x1="70%" y1="0" x2="70%" y2="100%" stroke="rgba(66,133,244,0.06)" strokeWidth="7" />
        <line x1="0" y1="78%" x2="100%" y2="78%" stroke="rgba(66,133,244,0.05)" strokeWidth="5" />
      </svg>

      {/* Competitor pins (grey) */}
      {[{ t:'35%', l:'22%' }, { t:'38%', l:'62%' }].map((p,i) => (
        <motion.div key={i} initial={{ opacity:0, scale:0 }} animate={{ opacity:0.4, scale:0.7 }} transition={{ delay:0.3+i*0.2 }}
          style={{ position:'absolute', top:p.t, left:p.l }}>
          <div style={{ width:24, height:24, borderRadius:'50% 50% 50% 0', transform:'rotate(-45deg)', background:'#9ca3af', boxShadow:'0 3px 10px rgba(0,0,0,0.15)' }} />
        </motion.div>
      ))}

      {/* YOUR pin — big red bouncing */}
      <div style={{ position:'absolute', top:'18%', left:'50%', transform:'translateX(-50%)' }}>
        <motion.div animate={{ y:[0,-12,0] }} transition={{ duration:1.8, repeat:Infinity, ease:'easeInOut' }}
          style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
          <div style={{ width:56, height:56, borderRadius:'50% 50% 50% 0', transform:'rotate(-45deg)', background:`linear-gradient(135deg, ${G.red}, #c62828)`, boxShadow:`0 10px 30px ${G.red}55`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ transform:'rotate(45deg)', fontSize:24 }}>📍</span>
          </div>
          {[1,2,3].map(n => (
            <motion.div key={n} style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', borderRadius:'50%', border:`2px solid ${G.red}40`, width:n*38, height:n*38 }}
              animate={{ scale:[1,1.7,1], opacity:[0.6,0,0.6] }} transition={{ duration:2, repeat:Infinity, delay:n*0.5 }} />
          ))}
        </motion.div>
        {/* Map pack position badge */}
        <motion.div animate={{ scale:[1,1.06,1] }} transition={{ duration:1.5, repeat:Infinity, repeatDelay:0.5 }}
          style={{ position:'absolute', top:-12, right:-22, background:`linear-gradient(135deg, ${G.yellow}, #f59e0b)`, color:'#fff', borderRadius:999, padding:'3px 9px', fontSize:11, fontWeight:900, boxShadow:`0 4px 12px ${G.yellow}60`, whiteSpace:'nowrap' }}>
          #{position} Map Pack
        </motion.div>
      </div>

      {/* Business card */}
      <motion.div initial={{ opacity:0, y:24, scale:0.92 }} animate={{ opacity:1, y:0, scale:1 }} transition={{ delay:0.4, duration:0.5 }}
        style={{ position:'absolute', top:'50%', left:'50%', transform:'translateX(-50%)', background:'#fff', borderRadius:18, padding:'16px 20px', boxShadow:`0 12px 50px ${G.red}18`, border:`2px solid rgba(234,67,53,0.15)`, width:270 }}>
        {/* Google color bar */}
        <div style={{ display:'flex', gap:2, marginBottom:10 }}>
          {[G.blue,G.red,G.yellow,G.green].map(c => <div key={c} style={{ flex:1, height:3, borderRadius:2, background:c }} />)}
        </div>
        <div style={{ fontSize:14, fontWeight:800, color:'#0f2244', marginBottom:5 }}>SecureMax CCTV Sydney</div>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
          <div style={{ display:'flex', gap:1 }}>
            {Array.from({ length:5 }).map((_,i) => (
              <motion.span key={i} initial={{ opacity:0, scale:0, rotate:-30 }} animate={{ opacity: i < stars ? 1 : 0.25, scale:1, rotate:0 }}
                transition={{ delay:0.6+i*0.1, type:'spring', stiffness:300 }} style={{ fontSize:15, color:G.yellow }}>★</motion.span>
            ))}
          </div>
          <span style={{ fontSize:12, color:'#46546e', fontFamily:'var(--font-mono)', fontWeight:700 }}>{reviews}</span>
        </div>
        <div style={{ fontSize:11.5, color:'#46546e', marginBottom:10 }}>📍 Sydney CBD · Open 24/7 · AS2201 ✓</div>
        <div style={{ display:'flex', gap:7 }}>
          {['Directions','Website','Call'].map((btn,i) => (
            <div key={btn} style={{ flex:1, background:[`${G.blue}12`,`${G.green}12`,`${G.red}12`][i], border:`1.5px solid ${[G.blue,G.green,G.red][i]}35`, borderRadius:9, padding:'5px', textAlign:'center', fontSize:10.5, color:[G.blue,G.green,G.red][i], fontWeight:700 }}>{btn}</div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.2 }}
        style={{ textAlign:'center', zIndex:10, position:'relative', marginTop:320 }}>
        <div style={{ display:'flex', gap:3, justifyContent:'center', marginBottom:10 }}>
          {'Google'.split('').map((l,i) => <span key={i} style={{ fontSize:13, fontWeight:900, color:[G.blue,G.red,G.yellow,G.blue,G.green,G.red][i] }}>{l}</span>)}
          <span style={{ fontSize:13, fontWeight:900, color:'rgba(15,34,68,0.6)' }}>&nbsp;Business</span>
        </div>
        <h2 style={{ fontSize:'clamp(24px,3.5vw,40px)', fontWeight:800, color:'#0f2244', lineHeight:1.2, marginBottom:12 }}>Rank #1 on<br /><span style={{ color:G.red }}>Google Maps</span></h2>
        <motion.div animate={{ y:[0,7,0] }} transition={{ duration:1.8, repeat:Infinity }}
          style={{ marginTop:18, display:'flex', flexDirection:'column', alignItems:'center', gap:6, opacity:0.7 }}>
          <div style={{ width:24, height:38, borderRadius:12, border:`2px solid ${G.red}55`, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:5 }}>
            <motion.div animate={{ y:[0,10,0] }} transition={{ duration:1.8, repeat:Infinity }} style={{ width:4, height:8, borderRadius:2, background:G.red }} />
          </div>
          <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color:G.red, letterSpacing:'0.14em' }}>SCROLL TO BEGIN</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function GmbHowItWorks() {
  return <ServiceWorkflowCards steps={STEPS} introNode={<GmbIntroScene />} cardW={1060} cardH={520} sideXOffset={9999} sectionBg="#fff8f6" />
}
