'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ServiceWorkflowCards, { type WorkflowStep } from '@/components/ui/ServiceWorkflowCards'

const G = { blue:'#4285f4', red:'#ea4335', yellow:'#fbbc04', green:'#34a853' }

/* ── Scene 1: Audit & Keyword Research ── */
function Scene1({ active }: { active: boolean; color: string }) {
  const kws = [
    { kw:'commercial cctv installer sydney', vol:'4.4K', cmp:'HIGH', c:G.red   },
    { kw:'access control quote nsw',         vol:'2.1K', cmp:'MED',  c:G.yellow },
    { kw:'24/7 monitored alarm business',    vol:'1.8K', cmp:'HIGH', c:G.red   },
    { kw:'security camera installation',     vol:'3.2K', cmp:'MED',  c:G.blue  },
    { kw:'intercom system office',           vol:'1.1K', cmp:'LOW',  c:G.green },
  ]
  const stats = [{ l:'Keywords', v:'2,840', c:G.blue }, { l:'Buyer intent', v:'347', c:G.green }, { l:'Negative', v:'92', c:G.red }]

  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', gap:8, padding:'10px 4px' }}>
      <div style={{ display:'flex', gap:2, marginBottom:2 }}>
        {[G.blue,G.red,G.yellow,G.green].map(c => <div key={c} style={{ flex:1, height:3, borderRadius:2, background:c }} />)}
      </div>
      <div style={{ fontSize:8, fontWeight:800, letterSpacing:'0.12em', fontFamily:'var(--font-mono)', color:G.blue }}>KEYWORD RESEARCH · BUYER INTENT</div>
      <div style={{ display:'flex', flexDirection:'column', gap:5, flex:1 }}>
        {kws.map((k,i) => (
          <motion.div key={k.kw}
            animate={{ opacity: active ? 1 : 0.3, x: active ? 0 : -10 }}
            transition={{ duration:0.32, delay:i*0.06 }}
            style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 10px', borderRadius:9, background: i===0 ? `${k.c}15` : `${k.c}08`, border:`1.5px solid ${i===0 ? k.c+'50' : k.c+'25'}`, boxShadow: active && i===0 ? `0 3px 12px ${k.c}25` : 'none' }}>
            <span style={{ flex:1, fontSize:11, color: i===0 ? k.c : 'rgba(15,34,68,0.7)', fontFamily:'var(--font-mono)', fontWeight: i===0 ? 700 : 400 }}>{k.kw}</span>
            <span style={{ fontSize:10, color:'rgba(15,34,68,0.4)', fontFamily:'var(--font-mono)' }}>{k.vol}/mo</span>
            <span style={{ fontSize:9, fontWeight:800, padding:'2px 6px', borderRadius:4, background:k.c, color:'#fff' }}>{k.cmp}</span>
          </motion.div>
        ))}
      </div>
      <div style={{ display:'flex', gap:6 }}>
        {stats.map((m,i) => (
          <motion.div key={m.l}
            animate={{ opacity: active ? 1 : 0.3, scale: active ? 1 : 0.9 }}
            transition={{ duration:0.35, delay:0.3+i*0.07 }}
            style={{ flex:1, padding:'7px 6px', borderRadius:9, background:`${m.c}15`, border:`1.5px solid ${m.c}40`, textAlign:'center', boxShadow: active ? `0 3px 10px ${m.c}20` : 'none' }}>
            <div style={{ fontSize:15, fontWeight:900, color:m.c, fontFamily:'var(--font-mono)' }}>{m.v}</div>
            <div style={{ fontSize:8.5, color:'rgba(15,34,68,0.5)', marginTop:1 }}>{m.l}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Scene 2: Build & Launch ── */
function Scene2({ active }: { active: boolean; color: string }) {
  const adGroups = [
    { name:'CCTV Install',    ads:3, kws:18, c:G.blue  },
    { name:'Access Control',  ads:3, kws:14, c:G.red   },
    { name:'Monitoring',      ads:2, kws:11, c:G.green },
  ]
  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', gap:10, padding:'10px 4px' }}>
      <div style={{ fontSize:8, fontWeight:800, letterSpacing:'0.12em', fontFamily:'var(--font-mono)', color:G.red }}>CAMPAIGN STRUCTURE</div>
      <div style={{ borderRadius:12, border:`2px solid ${G.blue}35`, background:`${G.blue}08`, padding:'10px 12px' }}>
        <div style={{ fontSize:11.5, fontWeight:800, color:G.blue, marginBottom:8, fontFamily:'var(--font-mono)' }}>📢 Security Installers — Sydney</div>
        <div style={{ display:'flex', flexDirection:'column', gap:6, paddingLeft:10 }}>
          {adGroups.map((ag,i) => (
            <motion.div key={ag.name}
              animate={{ opacity: active ? 1 : 0.3, x: active ? 0 : -8 }}
              transition={{ duration:0.3, delay:i*0.09 }}
              style={{ display:'flex', alignItems:'center', gap:9, padding:'6px 10px', borderRadius:8, background:`${ag.c}12`, border:`1.5px solid ${ag.c}35`, boxShadow: active ? `0 2px 8px ${ag.c}20` : 'none' }}>
              <span style={{ flex:1, fontSize:11.5, color:'rgba(15,34,68,0.8)', fontWeight:600 }}>{ag.name}</span>
              <span style={{ fontSize:10, color:ag.c, fontFamily:'var(--font-mono)', fontWeight:700 }}>{ag.ads} ads</span>
              <span style={{ fontSize:10, color:'rgba(15,34,68,0.45)', fontFamily:'var(--font-mono)' }}>{ag.kws} kws</span>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Ad preview */}
      <motion.div animate={{ opacity: active ? 1 : 0.35 }} transition={{ duration:0.4, delay:0.25 }}
        style={{ padding:'10px 12px', borderRadius:12, background:'#fff', border:`1.5px solid ${G.blue}20`, boxShadow: active ? `0 4px 18px ${G.blue}14` : 'none' }}>
        <div style={{ fontSize:9, color:'rgba(15,34,68,0.35)', fontFamily:'var(--font-mono)', marginBottom:6 }}>AD PREVIEW</div>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
          <span style={{ fontSize:10.5, background:G.blue, color:'#fff', padding:'1px 6px', borderRadius:4, fontWeight:700 }}>Ad</span>
          <span style={{ fontSize:11, color:G.green, fontFamily:'var(--font-mono)' }}>securityblogs.com.au</span>
        </div>
        <div style={{ fontSize:13.5, color:'#1a0dab', fontWeight:700, marginBottom:4 }}>Commercial CCTV Sydney | Free Site Survey</div>
        <div style={{ fontSize:11.5, color:'rgba(15,34,68,0.55)', lineHeight:1.4 }}>AS2201 certified · 500+ businesses · 24/7 monitoring</div>
      </motion.div>
      <motion.div animate={{ opacity: active ? 1 : 0.3 }} transition={{ duration:0.3, delay:0.45 }}
        style={{ display:'flex', alignItems:'center', gap:6 }}>
        <motion.span animate={{ scale: active ? [1,1.4,1] : 1 }} transition={{ duration:1, repeat:Infinity }} style={{ width:7, height:7, borderRadius:'50%', background:G.green, display:'inline-block' }} />
        <span style={{ fontSize:10, color:G.green, fontFamily:'var(--font-mono)', fontWeight:700 }}>Campaign live · conversion tracking active</span>
      </motion.div>
    </div>
  )
}

/* ── Scene 3: Optimise & Scale ── */
function Scene3({ active }: { active: boolean; color: string }) {
  const [roas, setRoas] = useState(1.8)
  const [cpc, setCpc] = useState(18)
  useEffect(() => {
    if (!active) { setRoas(1.8); setCpc(18); return }
    const ir = setInterval(() => setRoas(v => v < 3.2 ? +(v + 0.05).toFixed(2) : v), 60)
    const ic = setInterval(() => setCpc(v => v > 10 ? v - 1 : v), 120)
    return () => { clearInterval(ir); clearInterval(ic) }
  }, [active])

  const weeks = [38,44,51,47,58,63,71,68,82,79,91,96]

  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', gap:8, padding:'10px 4px' }}>
      <div style={{ fontSize:8, fontWeight:800, letterSpacing:'0.12em', fontFamily:'var(--font-mono)', color:G.green }}>12-WEEK OPTIMISATION</div>
      {/* ROAS meter */}
      <div style={{ display:'flex', gap:10, alignItems:'center', padding:'8px 12px', background:`${G.green}12`, border:`1.5px solid ${G.green}40`, borderRadius:10, boxShadow: active ? `0 3px 14px ${G.green}22` : 'none' }}>
        <div>
          <div style={{ fontSize:9, color:'rgba(15,34,68,0.45)' }}>ROAS</div>
          <motion.div animate={{ color: roas >= 3 ? G.green : roas >= 2.5 ? G.yellow : G.red }}
            style={{ fontSize:28, fontWeight:900, fontFamily:'var(--font-mono)', lineHeight:1 }}>
            {roas.toFixed(1)}×
          </motion.div>
          <div style={{ fontSize:9, color:G.green, fontWeight:700 }}>↑ rising</div>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ display:'flex', alignItems:'flex-end', gap:3, height:50 }}>
            {weeks.map((w,i) => (
              <motion.div key={i}
                animate={{ height: active ? `${w}%` : '15%' }}
                transition={{ duration:0.55, delay:i*0.04 }}
                style={{ flex:1, borderRadius:'3px 3px 0 0', background:`linear-gradient(180deg, ${G.green}, ${G.green}66)`, boxShadow: active ? `0 0 5px ${G.green}35` : 'none' }} />
            ))}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:8, color:'rgba(15,34,68,0.3)', fontFamily:'var(--font-mono)', marginTop:3 }}>
            <span>W1 1.8×</span><span>W6 2.4×</span><span>W12 3.2×</span>
          </div>
        </div>
      </div>
      {/* CPC + Quality Score */}
      <div style={{ display:'flex', gap:7 }}>
        {[
          { l:'Avg CPC', v:`$${cpc}`, d:'↓ falling', c:G.blue },
          { l:'Quality Score', v:'9/10', d:'↑ excellent', c:G.yellow },
          { l:'Conv Rate', v:'6.8%', d:'↑ optimised', c:G.red },
        ].map((m,i) => (
          <motion.div key={m.l}
            animate={{ opacity: active ? 1 : 0.3, y: active ? 0 : 6 }}
            transition={{ duration:0.35, delay:0.2+i*0.08 }}
            style={{ flex:1, padding:'7px 6px', background:`${m.c}12`, border:`1.5px solid ${m.c}40`, borderRadius:9, textAlign:'center', boxShadow: active ? `0 3px 10px ${m.c}20` : 'none' }}>
            <div style={{ fontSize:9, color:'rgba(15,34,68,0.45)', marginBottom:2 }}>{m.l}</div>
            <div style={{ fontSize:14, fontWeight:900, color:m.c, fontFamily:'var(--font-mono)' }}>{m.v}</div>
            <div style={{ fontSize:8.5, color:m.c, fontWeight:700 }}>{m.d}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Scene 4: Report & Refine ── */
function Scene4({ active }: { active: boolean; color: string }) {
  const [conversions, setConversions] = useState(0)
  useEffect(() => {
    if (!active) { setConversions(0); return }
    const iv = setInterval(() => setConversions(v => v < 184 ? v + 3 : v), 30)
    return () => clearInterval(iv)
  }, [active])

  const metrics = [
    { l:'Conversions', v:conversions, suffix:'',    d:'+46 vs last', c:G.blue  },
    { l:'Cost/lead',   v:'$28',  suffix:'', d:'−$9 vs last',  c:G.green, s:true },
    { l:'ROAS',        v:'3.2×', suffix:'', d:'+0.8× vs last',c:G.yellow, s:true },
    { l:'Impr. share', v:'92%',  suffix:'', d:'+14pp vs last',c:G.red, s:true  },
  ]

  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', gap:8, padding:'10px 4px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontSize:8, fontWeight:800, letterSpacing:'0.12em', fontFamily:'var(--font-mono)', color:G.red }}>MONTHLY REPORT</div>
        <motion.div animate={{ background: active ? `${G.blue}18` : 'rgba(15,34,68,0.05)', color: active ? G.blue : 'rgba(15,34,68,0.35)' }} transition={{ duration:0.4 }}
          style={{ padding:'3px 8px', borderRadius:5, border:`1px solid ${G.blue}35`, fontSize:9, fontFamily:'var(--font-mono)', fontWeight:700 }}>PDF READY</motion.div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:7 }}>
        {metrics.map((m,i) => (
          <motion.div key={m.l}
            animate={{ opacity: active ? 1 : 0.3, scale: active ? 1 : 0.9 }}
            transition={{ duration:0.35, delay:i*0.08 }}
            style={{ padding:'10px 12px', borderRadius:12, background:`${m.c}12`, border:`1.5px solid ${m.c}40`, boxShadow: active ? `0 4px 14px ${m.c}20` : 'none' }}>
            <div style={{ fontSize:9, color:'rgba(15,34,68,0.45)', fontFamily:'var(--font-mono)', marginBottom:4 }}>{m.l}</div>
            <div style={{ fontSize:22, fontWeight:900, color:m.c, fontFamily:'var(--font-mono)', lineHeight:1 }}>{m.s ? m.v : m.v}</div>
            <div style={{ fontSize:9.5, color:G.green, fontWeight:700, marginTop:3 }}>▲ {m.d}</div>
          </motion.div>
        ))}
      </div>
      <motion.div animate={{ opacity: active ? 1 : 0.35 }} transition={{ duration:0.4, delay:0.35 }}
        style={{ padding:'10px 12px', borderRadius:11, background:`${G.yellow}12`, border:`1.5px solid ${G.yellow}45` }}>
        <div style={{ fontSize:10, color:G.yellow, fontWeight:800, fontFamily:'var(--font-mono)', marginBottom:4 }}>💡 INSIGHT THIS MONTH</div>
        <p style={{ fontSize:11, color:'rgba(15,34,68,0.65)', lineHeight:1.5, margin:0 }}>
          "Intruder alarm" +broad drove irrelevant clicks. Shifted to EXACT, reallocated $180 to CCTV. CPL expected ↓ further.
        </p>
      </motion.div>
    </div>
  )
}

const STEPS: WorkflowStep[] = [
  { step:'01', tag:'RESEARCH', title:'Audit & Keyword Research', color:'#4285f4', glow:'rgba(66,133,244,0.5)',  Scene: Scene1 },
  { step:'02', tag:'LAUNCH',   title:'Build & Launch',          color:'#ea4335', glow:'rgba(234,67,53,0.5)',   Scene: Scene2 },
  { step:'03', tag:'OPTIMISE', title:'Optimise & Scale',        color:'#34a853', glow:'rgba(52,168,83,0.5)',   Scene: Scene3 },
  { step:'04', tag:'REPORT',   title:'Report & Refine',         color:'#fbbc04', glow:'rgba(251,188,4,0.5)',   Scene: Scene4 },
]

/* ── Intro Scene ── */
function GoogleAdsIntroScene() {
  const [clicks, setClicks] = useState(0)
  const [roas, setRoas] = useState(1.0)
  const [funnel, setFunnel] = useState(0)

  useEffect(() => {
    const ic = setInterval(() => setClicks(v => v + 1), 900)
    const ir = setInterval(() => setRoas(v => v < 3.2 ? +(v + 0.08).toFixed(1) : v), 150)
    const iff = setInterval(() => setFunnel(v => Math.min(v + 1, 3)), 600)
    return () => { clearInterval(ic); clearInterval(ir); clearInterval(iff) }
  }, [])

  const funnelSteps = [
    { l:'Impressions', v:'18,400', c:G.blue  },
    { l:'Clicks',      v:'842',   c:G.yellow },
    { l:'Leads',       v:'57',    c:G.green  },
  ]

  return (
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg, #f8f9ff 0%, #fafbff 100%)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', top:'35%', left:'40%', width:600, height:500, borderRadius:'50%', background:`radial-gradient(ellipse, ${G.blue}10 0%, transparent 65%)`, pointerEvents:'none' }} />

      {/* Google Ads search ad */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.5 }}
        style={{ position:'absolute', top:'8%', left:'50%', transform:'translateX(-50%)', width:520, background:'#fff', borderRadius:18, padding:'18px 22px', boxShadow:`0 8px 40px ${G.blue}14`, border:`2px solid ${G.blue}14` }}>
        {/* Color bar */}
        <div style={{ display:'flex', gap:2, marginBottom:10 }}>
          {[G.blue,G.red,G.yellow,G.green].map(c => <div key={c} style={{ flex:1, height:3, borderRadius:2, background:c }} />)}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
          <span style={{ fontSize:11, background:G.blue, color:'#fff', padding:'2px 7px', borderRadius:4, fontWeight:700 }}>Ad</span>
          <span style={{ fontSize:11.5, color:G.green, fontFamily:'var(--font-mono)' }}>securityblogs.com.au</span>
          <motion.span animate={{ x: clicks % 2 === 0 ? 0 : 2, y: clicks % 2 === 0 ? 0 : -1 }} style={{ marginLeft:'auto', fontSize:16 }}>👆</motion.span>
        </div>
        <div style={{ fontSize:17, fontWeight:700, color:'#1a0dab', marginBottom:6, lineHeight:1.3 }}>
          Commercial CCTV Sydney · 24/7 Security From $49/mo
        </div>
        <div style={{ fontSize:12.5, color:'rgba(15,34,68,0.6)', lineHeight:1.5 }}>
          AS2201 certified · 500+ businesses protected · Free site survey for NSW businesses
        </div>
        <div style={{ display:'flex', gap:8, marginTop:10, flexWrap:'wrap' }}>
          {['Get Free Quote','CCTV Systems','Access Control','Contact'].map((sl,i) => (
            <span key={sl} style={{ fontSize:11.5, color:G.blue, textDecoration:'underline', cursor:'default' }}>{sl}</span>
          ))}
        </div>
      </motion.div>

      {/* Funnel */}
      <div style={{ position:'absolute', top:'54%', left:'50%', transform:'translateX(-50%)', width:520, display:'flex', gap:10, alignItems:'stretch' }}>
        {funnelSteps.map((s,i) => (
          <motion.div key={s.l}
            initial={{ opacity:0, scale:0.8 }}
            animate={funnel > i ? { opacity:1, scale:1 } : {}}
            transition={{ duration:0.4, type:'spring', stiffness:180 }}
            style={{ flex:1, background:'#fff', border:`2px solid ${s.c}30`, borderRadius:14, padding:'12px 10px', textAlign:'center', boxShadow:`0 4px 18px ${s.c}14` }}>
            <div style={{ fontSize:10, color:'rgba(15,34,68,0.45)', marginBottom:4 }}>{s.l}</div>
            <div style={{ fontSize:20, fontWeight:900, color:s.c, fontFamily:'var(--font-mono)' }}>{s.v}</div>
            {i < 2 && <motion.div animate={{ x:[0,3,0] }} transition={{ duration:0.8, repeat:Infinity }} style={{ fontSize:14, color:s.c, marginTop:3 }}>→</motion.div>}
          </motion.div>
        ))}
      </div>

      {/* Live ROAS badge */}
      <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.6 }}
        style={{ position:'absolute', top:'18%', right:'4%', background:`linear-gradient(135deg, ${G.green}, #1e7e34)`, borderRadius:16, padding:'12px 18px', textAlign:'center', boxShadow:`0 8px 30px ${G.green}40` }}>
        <div style={{ fontSize:9.5, color:'rgba(255,255,255,0.8)', letterSpacing:'0.1em', marginBottom:3 }}>LIVE ROAS</div>
        <div style={{ fontSize:32, fontWeight:900, color:'#fff', fontFamily:'var(--font-mono)', lineHeight:1 }}>{roas}×</div>
        <div style={{ fontSize:9.5, color:'rgba(255,255,255,0.75)', marginTop:3 }}>return on ad spend</div>
      </motion.div>

      {/* Click counter */}
      <motion.div initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.5 }}
        style={{ position:'absolute', top:'30%', left:'4%', background:`linear-gradient(135deg, ${G.blue}, #1557b0)`, borderRadius:16, padding:'12px 18px', textAlign:'center', boxShadow:`0 8px 30px ${G.blue}40` }}>
        <div style={{ fontSize:9.5, color:'rgba(255,255,255,0.8)', letterSpacing:'0.1em', marginBottom:3 }}>CLICKS TODAY</div>
        <div style={{ fontSize:32, fontWeight:900, color:'#fff', fontFamily:'var(--font-mono)', lineHeight:1 }}>{clicks}</div>
        <div style={{ fontSize:9.5, color:'rgba(255,255,255,0.75)', marginTop:3 }}>live counter</div>
      </motion.div>

      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.2 }}
        style={{ textAlign:'center', zIndex:10, position:'relative', marginTop:340 }}>
        <div style={{ display:'flex', gap:3, justifyContent:'center', marginBottom:10 }}>
          {'Google'.split('').map((l,i) => <span key={i} style={{ fontSize:13, fontWeight:900, color:[G.blue,G.red,G.yellow,G.blue,G.green,G.red][i] }}>{l}</span>)}
          <span style={{ fontSize:13, fontWeight:900, color:'rgba(15,34,68,0.6)' }}>&nbsp;Ads</span>
        </div>
        <h2 style={{ fontSize:'clamp(24px,3.5vw,40px)', fontWeight:800, color:'#0f2244', lineHeight:1.2, marginBottom:12 }}>Turn Clicks into<br /><span style={{ color:G.blue }}>Security Contracts</span></h2>
        <motion.div animate={{ y:[0,7,0] }} transition={{ duration:1.8, repeat:Infinity }}
          style={{ marginTop:18, display:'flex', flexDirection:'column', alignItems:'center', gap:6, opacity:0.7 }}>
          <div style={{ width:24, height:38, borderRadius:12, border:`2px solid ${G.blue}55`, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:5 }}>
            <motion.div animate={{ y:[0,10,0] }} transition={{ duration:1.8, repeat:Infinity }} style={{ width:4, height:8, borderRadius:2, background:G.blue }} />
          </div>
          <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color:G.blue, letterSpacing:'0.14em' }}>SCROLL TO BEGIN</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function GoogleAdsHowItWorks() {
  return <ServiceWorkflowCards steps={STEPS} introNode={<GoogleAdsIntroScene />} cardW={1060} cardH={520} sideXOffset={9999} sectionBg="#f8f9ff" />
}
