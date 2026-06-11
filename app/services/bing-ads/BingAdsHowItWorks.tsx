'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ServiceWorkflowCards, { type WorkflowStep } from '@/components/ui/ServiceWorkflowCards'

const B = { blue:'#0078d4', li:'#0a66c2', green:'#107c10', purple:'#5c2d91', sky:'#00b4d8' }

/* ── Scene 1: Import & Audit ── */
function Scene1({ active }: { active: boolean; color: string }) {
  const checks = ['Keyword gaps', 'Bid strategy', 'Quality Scores', 'Audience gaps']
  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', gap:10, padding:'10px 4px' }}>
      <div style={{ fontSize:8, color:B.blue, fontWeight:800, letterSpacing:'0.12em', fontFamily:'var(--font-mono)' }}>CAMPAIGN MIGRATION</div>
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        {/* Google side */}
        <motion.div animate={{ opacity: active ? 0.65 : 0.3, scale: active ? 1 : 0.92 }} transition={{ duration:0.4 }}
          style={{ flex:1, background:'rgba(234,67,53,0.08)', border:'1.5px solid rgba(234,67,53,0.25)', borderRadius:12, padding:'10px', textAlign:'center' }}>
          <div style={{ fontSize:20, marginBottom:4 }}>🔴</div>
          <div style={{ fontSize:10.5, fontWeight:700, color:'rgba(15,34,68,0.7)' }}>Google Ads</div>
          {['12 campaigns','84 ad groups','340 keywords'].map(t => (
            <div key={t} style={{ fontSize:9, color:'rgba(15,34,68,0.45)', background:'rgba(15,34,68,0.05)', borderRadius:5, padding:'2px 6px', marginTop:4 }}>{t}</div>
          ))}
        </motion.div>
        {/* Arrow */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
          <motion.div animate={{ x: active ? [0,4,0] : 0 }} transition={{ duration:0.8, repeat:Infinity }} style={{ fontSize:18, color:B.blue }}>→</motion.div>
          <div style={{ fontSize:8, fontFamily:'var(--font-mono)', color: active ? B.blue : 'rgba(15,34,68,0.3)', fontWeight:700, transition:'color 0.4s', textAlign:'center' }}>IMPORT<br/>+ TUNE</div>
        </div>
        {/* Microsoft side */}
        <motion.div animate={{ opacity: active ? 1 : 0.4, scale: active ? 1 : 0.92, boxShadow: active ? `0 6px 24px ${B.blue}35` : 'none' }} transition={{ duration:0.4 }}
          style={{ flex:1, background:`${B.blue}12`, border:`1.5px solid ${B.blue}40`, borderRadius:12, padding:'10px', textAlign:'center', transition:'all 0.4s' }}>
          <div style={{ fontSize:20, marginBottom:4 }}>🔷</div>
          <div style={{ fontSize:10.5, fontWeight:700, color:B.blue }}>Microsoft Ads</div>
          {['12 campaigns ✓','84 ad groups ✓','+ LinkedIn layer'].map((t,i) => (
            <div key={t} style={{ fontSize:9, color: active ? B.blue : 'rgba(15,34,68,0.4)', background: active ? `${B.blue}15` : 'rgba(15,34,68,0.04)', borderRadius:5, padding:'2px 6px', marginTop:4, transition:'all 0.4s' }}>{t}</div>
          ))}
        </motion.div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
        {checks.map((item,i) => (
          <motion.div key={item}
            animate={{ opacity: active ? 1 : 0.35, x: active ? 0 : -6 }}
            transition={{ duration:0.3, delay:0.15+i*0.07 }}
            style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 8px', background:`${B.blue}10`, border:`1px solid ${B.blue}30`, borderRadius:8, fontSize:10, color:'rgba(15,34,68,0.7)' }}>
            <span style={{ width:15, height:15, borderRadius:'50%', background: active ? B.blue : 'rgba(15,34,68,0.12)', color:'#fff', fontSize:8, display:'grid', placeItems:'center', transition:'background 0.4s', flexShrink:0 }}>✓</span>
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Scene 2: LinkedIn Targeting ── */
function Scene2({ active }: { active: boolean; color: string }) {
  const rows = [
    { label:'Job title', value:'Security Manager, Facilities Dir', icon:'👔' },
    { label:'Industry',  value:'Physical Security · Logistics',   icon:'🏢' },
    { label:'Org size',  value:'50–500 employees',                icon:'📊' },
    { label:'Seniority', value:'Manager, Director, VP',           icon:'⭐' },
  ]
  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', gap:9, padding:'10px 4px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <div style={{ width:30, height:30, borderRadius:7, background:B.li, display:'grid', placeItems:'center', fontWeight:900, fontSize:13, color:'#fff', flexShrink:0 }}>in</div>
        <div>
          <div style={{ fontSize:12, fontWeight:800, color:'#0f2244' }}>LinkedIn Profile Targeting</div>
          <div style={{ fontSize:9.5, color:'rgba(15,34,68,0.45)', fontFamily:'var(--font-mono)' }}>Microsoft × LinkedIn data</div>
        </div>
        <motion.div animate={{ background: active ? `${B.li}22` : 'rgba(15,34,68,0.05)', color: active ? B.li : 'rgba(15,34,68,0.3)' }}
          transition={{ duration:0.4 }}
          style={{ marginLeft:'auto', padding:'3px 10px', borderRadius:999, border:`1px solid ${B.li}44`, fontSize:9.5, fontFamily:'var(--font-mono)', fontWeight:700 }}>LIVE</motion.div>
      </div>
      {rows.map((r,i) => (
        <motion.div key={r.label}
          animate={{ opacity: active ? 1 : 0.35, x: active ? 0 : -8, background: active ? `${B.li}10` : 'rgba(15,34,68,0.03)' }}
          transition={{ duration:0.35, delay:i*0.07 }}
          style={{ padding:'8px 12px', border:`1.5px solid ${active ? B.li+'30' : 'rgba(15,34,68,0.07)'}`, borderRadius:10, display:'flex', alignItems:'center', gap:10, transition:'border-color 0.35s' }}>
          <span style={{ fontSize:14 }}>{r.icon}</span>
          <span style={{ width:64, fontSize:9, fontFamily:'var(--font-mono)', color:'rgba(15,34,68,0.4)', textTransform:'uppercase', letterSpacing:0.5, flexShrink:0 }}>{r.label}</span>
          <span style={{ flex:1, fontSize:11, color: active ? 'rgba(15,34,68,0.85)' : 'rgba(15,34,68,0.4)', transition:'color 0.35s' }}>{r.value}</span>
        </motion.div>
      ))}
      <motion.div animate={{ opacity: active ? 1 : 0.35 }} transition={{ duration:0.4, delay:0.35 }}
        style={{ padding:'8px 12px', borderRadius:10, background:`${B.li}15`, border:`1.5px solid ${B.li}40`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:12.5, fontWeight:800, color:B.li }}>28,400</span>
        <span style={{ fontSize:10.5, color:'rgba(15,34,68,0.5)' }}>matched B2B buyers</span>
      </motion.div>
    </div>
  )
}

/* ── Scene 3: Launch & Track ── */
function Scene3({ active }: { active: boolean; color: string }) {
  const [convCount, setConvCount] = useState(0)
  useEffect(() => {
    if (!active) { setConvCount(0); return }
    const iv = setInterval(() => setConvCount(v => v < 184 ? v + 3 : v), 30)
    return () => clearInterval(iv)
  }, [active])

  const feed = [
    { label:'Form submitted', time:'2m ago', ltv:'$480 LTV',   c:B.green },
    { label:'Quote requested', time:'11m ago', ltv:'$1,200 LTV', c:B.blue  },
    { label:'Phone call 3:42', time:'28m ago', ltv:'$860 LTV',  c:B.purple },
    { label:'Demo booked',     time:'1h ago',  ltv:'$2,400 LTV', c:B.green },
  ]

  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', gap:8, padding:'10px 4px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontSize:8, color:B.green, fontWeight:800, letterSpacing:'0.12em', fontFamily:'var(--font-mono)' }}>LIVE CONVERSIONS</div>
        <motion.div animate={{ scale: active ? [1,1.2,1] : 1 }} transition={{ duration:1, repeat:Infinity }}
          style={{ display:'flex', gap:4, alignItems:'center' }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:B.green }} />
          <span style={{ fontSize:9, color:B.green, fontWeight:700, fontFamily:'var(--font-mono)' }}>LIVE</span>
        </motion.div>
      </div>
      {/* Total counter */}
      <motion.div animate={{ opacity: active ? 1 : 0.3, scale: active ? 1 : 0.9 }} transition={{ duration:0.4 }}
        style={{ padding:'8px 12px', background:`${B.green}15`, border:`1.5px solid ${B.green}45`, borderRadius:10, display:'flex', gap:12, alignItems:'center', boxShadow: active ? `0 3px 12px ${B.green}25` : 'none' }}>
        <span style={{ fontSize:26, fontWeight:900, color:B.green, fontFamily:'var(--font-mono)', lineHeight:1 }}>{convCount}</span>
        <div>
          <div style={{ fontSize:10, fontWeight:700, color:B.green }}>Conversions this month</div>
          <div style={{ fontSize:9, color:'rgba(15,34,68,0.45)' }}>+46 vs last month ↑</div>
        </div>
      </motion.div>
      {feed.map((c,i) => (
        <motion.div key={c.label}
          animate={{ opacity: active ? 1 : 0.3, x: active ? 0 : 10 }}
          transition={{ duration:0.3, delay:0.1+i*0.06 }}
          style={{ display:'flex', alignItems:'center', gap:10, padding:'6px 10px', background: i===0 && active ? `${c.c}14` : 'rgba(15,34,68,0.04)', border:`1px solid ${i===0 && active ? c.c+'35' : 'rgba(15,34,68,0.07)'}`, borderRadius:9, transition:'all 0.35s' }}>
          <motion.span animate={{ scale: i===0 && active ? [1,1.5,1] : 1 }} transition={{ duration:1.2, repeat:Infinity }}
            style={{ width:8, height:8, borderRadius:'50%', background: active ? c.c : 'rgba(15,34,68,0.15)', flexShrink:0 }} />
          <span style={{ flex:1, fontSize:11, color:'rgba(15,34,68,0.75)' }}>{c.label}</span>
          <span style={{ fontSize:9.5, color:'rgba(15,34,68,0.35)', fontFamily:'var(--font-mono)' }}>{c.time}</span>
          <span style={{ fontSize:10.5, fontWeight:800, color: active ? c.c : 'rgba(15,34,68,0.3)', fontFamily:'var(--font-mono)', transition:'color 0.4s' }}>{c.ltv}</span>
        </motion.div>
      ))}
    </div>
  )
}

/* ── Scene 4: Optimise & Expand ── */
function Scene4({ active }: { active: boolean; color: string }) {
  const [cpl, setCpl] = useState(80)
  useEffect(() => {
    if (!active) { setCpl(80); return }
    const iv = setInterval(() => setCpl(v => v > 36 ? v - 1 : v), 50)
    return () => clearInterval(iv)
  }, [active])

  const placements = [
    { label:'Bing Search',     scale:100, icon:'🔍', c:B.blue   },
    { label:'MSN News Feed',   scale:72,  icon:'📰', c:B.purple },
    { label:'Outlook Sidebar', scale:60,  icon:'📧', c:B.blue   },
    { label:'Edge New Tab',    scale:54,  icon:'🌐', c:B.sky    },
    { label:'Partner Sites',   scale:42,  icon:'🤝', c:B.li     },
  ]

  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', gap:9, padding:'10px 4px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontSize:8, color:B.purple, fontWeight:800, letterSpacing:'0.12em', fontFamily:'var(--font-mono)' }}>AUDIENCE NETWORK</div>
        <motion.div animate={{ opacity: active ? 1 : 0.35, background: active ? `${B.green}20` : 'rgba(15,34,68,0.05)', color: active ? B.green : 'rgba(15,34,68,0.3)' }} transition={{ duration:0.4 }}
          style={{ padding:'3px 10px', borderRadius:999, border:`1px solid ${B.green}35`, fontSize:9, fontFamily:'var(--font-mono)', fontWeight:700 }}>EXPANDING</motion.div>
      </div>
      {placements.map((p,i) => (
        <div key={p.label} style={{ display:'flex', alignItems:'center', gap:9 }}>
          <span style={{ fontSize:13, flexShrink:0 }}>{p.icon}</span>
          <span style={{ width:108, fontSize:10.5, color:'rgba(15,34,68,0.65)', flexShrink:0 }}>{p.label}</span>
          <div style={{ flex:1, height:8, background:'rgba(15,34,68,0.07)', borderRadius:4, overflow:'hidden' }}>
            <motion.div animate={{ width: active ? `${p.scale}%` : '0%' }} transition={{ duration:0.65, delay:i*0.08 }}
              style={{ height:'100%', borderRadius:4, background:`linear-gradient(90deg, ${p.c}, ${p.c}99)`, boxShadow: active ? `0 0 8px ${p.c}50` : 'none' }} />
          </div>
          <span style={{ width:30, textAlign:'right', fontSize:10, fontFamily:'var(--font-mono)', color: active ? p.c : 'rgba(15,34,68,0.3)', transition:'color 0.5s', flexShrink:0 }}>{p.scale}%</span>
        </div>
      ))}
      <motion.div animate={{ opacity: active ? 1 : 0.35 }} transition={{ duration:0.4, delay:0.3 }}
        style={{ padding:'8px 12px', background:`${B.green}12`, border:`1.5px solid ${B.green}40`, borderRadius:10, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:10, color:'rgba(15,34,68,0.55)' }}>Cost Per B2B Lead</span>
        <div style={{ display:'flex', alignItems:'baseline', gap:4 }}>
          <span style={{ fontSize:22, fontWeight:900, color:B.green, fontFamily:'var(--font-mono)' }}>${cpl}</span>
          <span style={{ fontSize:10, color:B.green, fontWeight:700 }}>↓ falling</span>
        </div>
      </motion.div>
    </div>
  )
}

const STEPS = [
  { step:'01', tag:'IMPORT', title:'Import & Audit',           color:'#0078d4', glow:'rgba(0,120,212,0.5)',  Scene: Scene1 },
  { step:'02', tag:'LAYER',  title:'Layer LinkedIn Targeting', color:'#0a66c2', glow:'rgba(10,102,194,0.5)', Scene: Scene2 },
  { step:'03', tag:'LAUNCH', title:'Launch & Track',           color:'#107c10', glow:'rgba(16,124,16,0.5)',  Scene: Scene3 },
  { step:'04', tag:'SCALE',  title:'Optimise & Expand',        color:'#5c2d91', glow:'rgba(92,45,145,0.5)',  Scene: Scene4 },
] satisfies WorkflowStep[]

/* ── Intro Scene ── */
const LI_TAGS = ['Security Manager','Facilities Director','Head of Operations','Commercial RE','50–500 employees']
const BING_METRICS = [
  { label:'CPC vs Google', value:'−52%', c:B.blue,   icon:'💲' },
  { label:'B2B Reach',     value:'+41%', c:B.green,  icon:'🎯' },
  { label:'Conv. Rate',    value:'6.4%', c:'#f29900', icon:'📈' },
  { label:'Monthly Leads', value:'142',  c:B.purple, icon:'🤝' },
]

function BingIntroScene() {
  const [shown, setShown] = useState(0)
  const [cpc, setCpc] = useState(100)

  useEffect(() => {
    const iv = setInterval(() => setShown(v => Math.min(v+1, BING_METRICS.length)), 320)
    const sv = setInterval(() => setCpc(v => v > 48 ? v - 1 : v), 30)
    return () => { clearInterval(iv); clearInterval(sv) }
  }, [])

  return (
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg, #f0f6ff 0%, #f8fbff 100%)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', top:'35%', left:'40%', width:600, height:500, borderRadius:'50%', background:`radial-gradient(ellipse, ${B.blue}12 0%, transparent 65%)`, pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:'60%', left:'60%', width:300, height:300, borderRadius:'50%', background:`radial-gradient(ellipse, ${B.purple}10 0%, transparent 65%)`, pointerEvents:'none' }} />

      {/* Header bar */}
      <div style={{ position:'absolute', top:'8%', left:'50%', transform:'translateX(-50%)', width:500, background:'#fff', borderRadius:16, border:`2px solid ${B.blue}20`, padding:'12px 18px', display:'flex', alignItems:'center', gap:12, boxShadow:`0 6px 30px ${B.blue}12` }}>
        <div style={{ width:36, height:36, background:`linear-gradient(135deg, ${B.blue}, #00bcf2)`, borderRadius:10, display:'grid', placeItems:'center', flexShrink:0 }}>
          <span style={{ fontSize:18 }}>Ⓜ</span>
        </div>
        <div>
          <div style={{ fontSize:13, fontWeight:800, color:'#0f2244' }}>Microsoft Advertising</div>
          <div style={{ fontSize:10.5, color:'#46546e', fontFamily:'var(--font-mono)' }}>Security B2B · Sydney Metro</div>
        </div>
        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:6 }}>
          <motion.div animate={{ scale:[1,1.5,1] }} transition={{ duration:1.2, repeat:Infinity }} style={{ width:7, height:7, borderRadius:'50%', background:B.green }} />
          <span style={{ fontSize:11, color:B.green, fontWeight:800 }}>LIVE</span>
        </div>
      </div>

      {/* Big CPC saver */}
      <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.3, type:'spring', stiffness:180 }}
        style={{ position:'absolute', top:'23%', left:'8%', background:`linear-gradient(135deg, ${B.blue}, #005ba1)`, borderRadius:18, padding:'14px 20px', boxShadow:`0 10px 40px ${B.blue}45`, textAlign:'center' }}>
        <div style={{ fontSize:9, color:'rgba(255,255,255,0.7)', letterSpacing:'0.1em', marginBottom:4 }}>CPC vs Google</div>
        <div style={{ fontSize:36, fontWeight:900, color:'#fff', fontFamily:'var(--font-mono)', lineHeight:1 }}>−{100 - cpc}%</div>
        <div style={{ fontSize:9.5, color:'rgba(255,255,255,0.8)', marginTop:4 }}>lower cost per click</div>
      </motion.div>

      {/* Metric tiles */}
      <div style={{ position:'absolute', top:'24%', left:'50%', transform:'translateX(-50%)', width:380, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        {BING_METRICS.map((m,i) => (
          <motion.div key={m.label} initial={{ opacity:0, y:16 }} animate={i < shown ? { opacity:1, y:0 } : {}} transition={{ duration:0.35, type:'spring' }}
            style={{ background:'#fff', borderRadius:14, padding:'14px', border:`2px solid ${m.c}22`, boxShadow:`0 4px 18px ${m.c}12` }}>
            <div style={{ fontSize:11, color:'#46546e', marginBottom:4 }}>{m.icon} {m.label}</div>
            <div style={{ fontSize:24, fontWeight:900, color:m.c, fontFamily:'var(--font-mono)' }}>{m.value}</div>
          </motion.div>
        ))}
      </div>

      {/* LinkedIn targeting */}
      <div style={{ position:'absolute', top:'63%', left:'50%', transform:'translateX(-50%)', width:510 }}>
        <div style={{ fontSize:10, fontFamily:'var(--font-mono)', color:B.li, marginBottom:8, textAlign:'center', letterSpacing:'0.1em', fontWeight:700 }}>in LINKEDIN PROFILE TARGETING · EXCLUSIVE</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:7, justifyContent:'center' }}>
          {LI_TAGS.map((tag,i) => (
            <motion.div key={tag} initial={{ opacity:0, scale:0.75 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.9+i*0.12, type:'spring', stiffness:220 }}
              style={{ background:`linear-gradient(135deg, ${B.li}, #084c9e)`, color:'#fff', borderRadius:999, padding:'5px 14px', fontSize:11, fontWeight:700, boxShadow:`0 3px 10px ${B.li}40` }}>
              {tag}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.2 }}
        style={{ textAlign:'center', zIndex:10, position:'relative', marginTop:340 }}>
        <div style={{ fontSize:11, fontFamily:'var(--font-mono)', color:B.blue, letterSpacing:'0.18em', marginBottom:10 }}>HOW IT WORKS</div>
        <h2 style={{ fontSize:'clamp(24px,3.5vw,40px)', fontWeight:800, color:'#0f2244', lineHeight:1.2, marginBottom:12 }}>Capture B2B Buyers<br /><span style={{ color:B.blue }}>Google Can't Reach</span></h2>
        <motion.div animate={{ y:[0,7,0] }} transition={{ duration:1.8, repeat:Infinity }}
          style={{ marginTop:18, display:'flex', flexDirection:'column', alignItems:'center', gap:6, opacity:0.7 }}>
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
