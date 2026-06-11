'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

type CardProps = { title: string; description: string; href: string; active?: boolean }

const SHELL: React.CSSProperties = {
  position: 'relative', height: '100%', width: '100%', overflow: 'hidden',
}

function CardCTA({ title, description, href, active }: CardProps) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      padding: '20px 22px 22px',
      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.52) 28%, rgba(0,0,0,0.88) 100%)',
    }}>
      <h3 style={{ fontSize: 20, marginBottom: 5, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{title}</h3>
      <p style={{ fontSize: 13, lineHeight: 1.45, marginBottom: 10, color: 'rgba(255,255,255,0.9)', maxWidth: 380 }}>{description}</p>
      <Link
        href={href}
        style={active
          ? { display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff', color: '#1e5fe0', fontWeight: 700, fontSize: 12.5, padding: '7px 14px', borderRadius: 7, textDecoration: 'none' }
          : { display: 'inline-flex', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,0.92)', fontWeight: 600, fontSize: 12.5, textDecoration: 'underline', textUnderlineOffset: 4 }
        }
      >Learn more →</Link>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SEO — live rank tracker + AI Overview
───────────────────────────────────────────── */
export function SEOFace(p: CardProps) {
  const [rank, setRank] = useState(4)
  const [traffic, setTraffic] = useState(0)
  const [hlPulse, setHlPulse] = useState(false)

  useEffect(() => {
    // Rank drops 4→1, then resets
    const rv = setInterval(() => {
      setRank(r => r > 1 ? r - 1 : 4)
    }, 900)
    // Traffic ticker
    const tv = setInterval(() => setTraffic(v => v < 100 ? v + 2 : 0), 60)
    // Highlight pulse
    const hv = setInterval(() => setHlPulse(b => !b), 1400)
    return () => { clearInterval(rv); clearInterval(tv); clearInterval(hv) }
  }, [])

  const rankColors: Record<number, string> = { 1: '#34a853', 2: '#1e5fe0', 3: '#f29900', 4: '#ea4335' }
  const BARS = [18,28,22,38,48,55,62,72,80,88,92,95]

  return (
    <div style={{ ...SHELL, background: 'linear-gradient(160deg, #0a1628 0%, #071020 100%)' }}>
      {/* Top bar */}
      <div style={{ position:'absolute', top:0, left:0, right:0, background:'rgba(255,255,255,0.05)', padding:'6px 12px', display:'flex', alignItems:'center', gap:6, borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
        {['#ff5f57','#febc2e','#28c840'].map(c => <span key={c} style={{ width:7,height:7,borderRadius:'50%',background:c }} />)}
        <div style={{ flex:1, marginLeft:6, background:'rgba(255,255,255,0.08)', borderRadius:10, padding:'2px 10px', fontSize:9.5, color:'rgba(255,255,255,0.5)', fontFamily:'var(--font-mono)' }}>
          best security company australia
        </div>
      </div>
      {/* AI Overview */}
      <div style={{ position:'absolute', top:36, left:12, right:12, background:`linear-gradient(135deg, rgba(99,102,241,0.15), rgba(59,130,246,0.1))`, border:`1.5px solid rgba(99,102,241,${hlPulse ? '0.6' : '0.25'})`, borderRadius:10, padding:'7px 11px', transition:'border-color 0.5s' }}>
        <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:3 }}>
          <div style={{ width:13,height:13,borderRadius:3,background:'linear-gradient(135deg,#8b5cf6,#3b82f6)',display:'grid',placeItems:'center' }}><span style={{ color:'#fff',fontSize:7,fontWeight:800 }}>AI</span></div>
          <span style={{ fontSize:9.5,fontWeight:700,color:'#a78bfa',letterSpacing:'0.05em' }}>AI OVERVIEW</span>
        </div>
        <div style={{ fontSize:11,color:'rgba(255,255,255,0.85)',lineHeight:1.5 }}>
          Top-rated:{' '}
          <span style={{ background:`rgba(99,102,241,${hlPulse ? '0.35' : '0.15'})`, padding:'1px 5px', borderRadius:3, fontWeight:700, color:'#a78bfa', transition:'background 0.5s' }}>
            securityblogs.com.au
          </span>
        </div>
      </div>
      {/* Live traffic sparkline */}
      <div style={{ position:'absolute', top:110, left:12, right:12, background:'rgba(255,255,255,0.04)', borderRadius:9, padding:'8px 10px', border:'1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontSize:8.5,color:'rgba(255,255,255,0.4)',fontFamily:'var(--font-mono)',marginBottom:5 }}>ORGANIC TRAFFIC — LIVE</div>
        <div style={{ display:'flex', alignItems:'flex-end', gap:3, height:32 }}>
          {BARS.map((h,i) => (
            <div key={i} style={{ flex:1, height:`${h}%`, background:`linear-gradient(180deg, #1e5fe0, #1e5fe060)`, borderRadius:'2px 2px 0 0', opacity: i === Math.floor(traffic/9) % BARS.length ? 1 : 0.55, transition:'opacity 0.3s', boxShadow: i === Math.floor(traffic/9) % BARS.length ? '0 0 6px #1e5fe0' : 'none' }} />
          ))}
        </div>
      </div>
      {/* SERP rank pill */}
      <div style={{ position:'absolute', top:196, left:12, right:12, display:'flex', gap:8 }}>
        <div style={{ flex:1, background:'rgba(255,255,255,0.04)', borderRadius:9, padding:'8px 12px', border:`1.5px solid ${rankColors[rank]}44` }}>
          <div style={{ fontSize:8.5,color:'rgba(255,255,255,0.4)',fontFamily:'var(--font-mono)',marginBottom:3 }}>SERP POSITION</div>
          <div style={{ display:'flex',alignItems:'baseline',gap:4 }}>
            <span style={{ fontSize:28,fontWeight:900,color:rankColors[rank],fontFamily:'var(--font-mono)',lineHeight:1,transition:'color 0.4s' }}>#{rank}</span>
            <span style={{ fontSize:9.5,color:rank===1?'#34a853':'rgba(255,255,255,0.4)',fontWeight:700 }}>{rank===1?'↑ #1!':'dropping'}</span>
          </div>
        </div>
        <div style={{ flex:1, background:'rgba(255,255,255,0.04)', borderRadius:9, padding:'8px 12px', border:'1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ fontSize:8.5,color:'rgba(255,255,255,0.4)',fontFamily:'var(--font-mono)',marginBottom:3 }}>CITATIONS/MO</div>
          <div style={{ fontSize:22,fontWeight:900,color:'#10b981',fontFamily:'var(--font-mono)',lineHeight:1 }}>47+</div>
        </div>
      </div>
      <CardCTA {...p} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   AIO — AI citation bars filling on loop
───────────────────────────────────────────── */
export function AIOFace(p: CardProps) {
  const [pcts, setPcts] = useState([0,0,0,0])
  const [score, setScore] = useState(0)
  const platforms = [
    { name:'ChatGPT',    color:'#10a37f', target:94 },
    { name:'Gemini',     color:'#4285F4', target:88 },
    { name:'Perplexity', color:'#8b5cf6', target:97 },
    { name:'Copilot',    color:'#0078d4', target:82 },
  ]

  useEffect(() => {
    let up = true
    const iv = setInterval(() => {
      setPcts(prev => prev.map((v, i) => {
        const t = platforms[i].target
        if (up) return v < t ? Math.min(v + 2, t) : t
        return v > 0 ? Math.max(v - 2, 0) : 0
      }))
      setScore(v => up ? (v < 94 ? v + 2 : (up = false, 94)) : (v > 0 ? v - 2 : (up = true, 0)))
    }, 40)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{ ...SHELL, background: 'linear-gradient(160deg, #0a0f1e 0%, #0d1424 100%)' }}>
      <div style={{ position:'absolute', top:12, left:14, right:14, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:2 }}>
            <div style={{ width:6,height:6,borderRadius:'50%',background:'#10a37f',boxShadow:'0 0 8px #10a37f' }} />
            <span style={{ fontSize:9.5,letterSpacing:'0.14em',color:'rgba(255,255,255,0.45)',fontFamily:'var(--font-mono)' }}>AI VISIBILITY DASHBOARD</span>
          </div>
          <div style={{ fontSize:13,fontWeight:700,color:'#fff' }}>securityblogs.com.au</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontSize:24,fontWeight:800,color:'#7eb6ff',lineHeight:1,textShadow: score > 80 ? '0 0 16px rgba(126,182,255,0.6)' : 'none', transition:'text-shadow 0.3s' }}>
            {score}<span style={{ fontSize:12,color:'rgba(126,182,255,0.5)',fontWeight:400 }}>/100</span>
          </div>
          <div style={{ fontSize:9,color:'#10a37f',fontWeight:600,letterSpacing:'0.06em',marginTop:2 }}>LIVE SCORE</div>
        </div>
      </div>
      <div style={{ position:'absolute', top:72, left:14, right:14, display:'flex', flexDirection:'column', gap:10 }}>
        {platforms.map((pl,i) => (
          <div key={pl.name}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <div style={{ width:6,height:6,borderRadius:'50%',background:pl.color, boxShadow:`0 0 6px ${pl.color}`, flexShrink:0 }} />
                <span style={{ fontSize:10.5,color:'rgba(255,255,255,0.8)',fontWeight:500 }}>{pl.name}</span>
              </div>
              <span style={{ fontSize:10,color:pl.color,fontWeight:700 }}>{pcts[i]}%</span>
            </div>
            <div style={{ height:5,borderRadius:3,background:'rgba(255,255,255,0.08)',overflow:'hidden' }}>
              <div style={{ height:'100%',borderRadius:3,width:`${pcts[i]}%`,background:`linear-gradient(90deg, ${pl.color}, ${pl.color}bb)`,boxShadow:`0 0 8px ${pl.color}60`,transition:'width 0.04s linear' }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ position:'absolute', top:210, left:14, right:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
        {[
          { label:'AI CITATIONS/MO', value:'47+', color:'#7eb6ff' },
          { label:'BRAND MENTIONS',  value:'1.2k', color:'#10a37f' },
        ].map(s => (
          <div key={s.label} style={{ background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'8px 10px' }}>
            <div style={{ fontSize:9,letterSpacing:'0.1em',color:'rgba(255,255,255,0.4)',fontFamily:'var(--font-mono)',marginBottom:3 }}>{s.label}</div>
            <div style={{ fontSize:17,fontWeight:800,color:s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
      <CardCTA {...p} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   AEO — answer engine: typing answer + platforms
───────────────────────────────────────────── */
const AEO_ANSWER = 'Australia\'s #1 AI visibility platform — cited by every major answer engine.'
export function AEOFace(p: CardProps) {
  const [charIdx, setCharIdx] = useState(0)
  const [activePlatform, setActivePlatform] = useState(0)
  const platforms = [
    { name:'Perplexity', bg:'#8b5cf6' },
    { name:'Gemini',     bg:'#4285F4' },
    { name:'ChatGPT',    bg:'#10a37f' },
    { name:'Copilot',    bg:'#0078d4' },
  ]

  useEffect(() => {
    const cv = setInterval(() => setCharIdx(c => c < AEO_ANSWER.length ? c + 1 : 0), 55)
    const pv = setInterval(() => setActivePlatform(p => (p+1) % platforms.length), 1200)
    return () => { clearInterval(cv); clearInterval(pv) }
  }, [])

  return (
    <div style={{ ...SHELL, background: 'linear-gradient(160deg, #0d1424 0%, #0a0f1a 100%)' }}>
      <div style={{ position:'absolute', top:10, left:12, right:12, display:'flex', gap:5 }}>
        {platforms.map((pl,i) => (
          <div key={pl.name} style={{ background: activePlatform===i ? pl.bg : `${pl.bg}30`, color:'#fff', fontSize:9, fontWeight:700, padding:'2px 7px', borderRadius:4, transition:'background 0.35s', boxShadow: activePlatform===i ? `0 0 10px ${pl.bg}70` : 'none' }}>{pl.name}</div>
        ))}
      </div>
      <div style={{ position:'absolute', top:38, left:12, right:12, background:'rgba(255,255,255,0.05)', borderRadius:10, padding:'9px 13px', border:'1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontSize:9.5,color:'rgba(255,255,255,0.4)',letterSpacing:'0.08em',fontWeight:600,marginBottom:3 }}>ANSWER ENGINE QUERY</div>
        <div style={{ fontSize:12.5,fontWeight:600,color:'rgba(255,255,255,0.9)' }}>Best AI visibility service for security companies in Australia?</div>
      </div>
      <div style={{ position:'absolute', top:112, left:12, right:12, background:'linear-gradient(135deg, rgba(30,95,224,0.18), rgba(59,130,246,0.08))', border:'1.5px solid rgba(59,130,246,0.5)', borderRadius:10, padding:'10px 13px', boxShadow:'0 6px 24px rgba(59,130,246,0.2)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:5 }}>
          <span style={{ fontSize:9,letterSpacing:'0.12em',color:'#60a5fa',fontWeight:800,background:'rgba(37,99,235,0.25)',padding:'2px 6px',borderRadius:3 }}>POSITION 0 · FEATURED</span>
        </div>
        <div style={{ fontSize:13.5,fontWeight:700,color:'#60a5fa',marginBottom:4 }}>securityblogs.com.au</div>
        <div style={{ fontSize:11,color:'rgba(255,255,255,0.75)',lineHeight:1.5,minHeight:32 }}>
          {AEO_ANSWER.slice(0, charIdx)}
          <span style={{ display:'inline-block',width:2,height:12,background:'#60a5fa',marginLeft:1,verticalAlign:'middle',animation:'blink 0.7s infinite' }} />
        </div>
      </div>
      <div style={{ position:'absolute', top:214, left:12, right:12, display:'flex', gap:5 }}>
        {['linkedin.com','wikipedia.org','g2.com'].map((s,i) => (
          <div key={s} style={{ background:`rgba(255,255,255,${activePlatform===i?'0.12':'0.04'})`, border:`1px solid rgba(255,255,255,${activePlatform===i?'0.2':'0.07'})`, borderRadius:5, padding:'3px 8px', fontSize:9, color:'rgba(255,255,255,0.6)', transition:'all 0.4s' }}>{s}</div>
        ))}
      </div>
      <CardCTA {...p} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   GEO — Australia map: pulsing pins + scan ring
───────────────────────────────────────────── */
const AU_OUTLINE = `M 18,90 L 14,68 16,44 26,26 42,14 62,8 88,4 118,2 150,0 182,4 L 198,22 212,18 228,14 246,12 264,12 280,8 300,14 L 316,22 326,40 332,62 334,88 336,114 338,138 L 340,160 340,176 336,190 326,202 312,210 296,212 L 278,212 260,212 244,214 228,218 212,222 196,226 L 178,228 162,228 148,224 136,220 124,222 110,226 L 94,228 78,226 62,224 48,222 32,218 20,212 L 12,202 10,188 10,168 10,148 12,126 14,108 18,90 Z`
const AU_CAPITALS = [
  { name:'Darwin',    top:5.5,  left:54.2 },
  { name:'Brisbane',  top:56.7, left:91.4 },
  { name:'Perth',     top:67.5, left:10.6 },
  { name:'Sydney',    top:71.3, left:88.9 },
  { name:'Adelaide',  top:73.3, left:63.1 },
  { name:'Melbourne', top:82.1, left:76.4 },
]

export function GEOFace(p: CardProps) {
  const [pingScale, setPingScale] = useState(1)
  const [activePin, setActivePin] = useState(0)

  useEffect(() => {
    const pv = setInterval(() => setPingScale(s => s > 2.5 ? 1 : s + 0.06), 50)
    const av = setInterval(() => setActivePin(a => (a+1) % AU_CAPITALS.length), 700)
    return () => { clearInterval(pv); clearInterval(av) }
  }, [])

  const colors = ['#34a853','#1e5fe0','#ea4335','#f29900','#8b5cf6','#0078d4']

  return (
    <div style={{ ...SHELL, background: 'linear-gradient(160deg, #071829 0%, #051020 100%)' }}>
      <div style={{ position:'absolute', top:10, left:12, right:12, display:'flex', justifyContent:'space-between', alignItems:'center', zIndex:5 }}>
        <div style={{ background:'rgba(255,255,255,0.1)', padding:'4px 10px', borderRadius:99, fontSize:10, color:'rgba(255,255,255,0.85)', fontWeight:600, border:'1px solid rgba(255,255,255,0.15)', backdropFilter:'blur(4px)' }}>
          ● securityblogs.com.au · {AU_CAPITALS.length} capitals
        </div>
        <div style={{ background:'rgba(30,95,224,0.85)', padding:'4px 10px', borderRadius:99, fontSize:10, color:'#fff', fontWeight:700, boxShadow:'0 2px 12px rgba(30,95,224,0.5)' }}>100% national</div>
      </div>
      <div style={{ position:'absolute', top:42, left:8, right:8, bottom:90 }}>
        <svg viewBox="0 0 360 240" width="100%" height="100%" style={{ display:'block' }}>
          <defs>
            <radialGradient id="geo-land2" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#1a3a6e" />
              <stop offset="100%" stopColor="#0e2448" />
            </radialGradient>
          </defs>
          <rect width="360" height="240" fill="#071420" rx="4" />
          <path d={AU_OUTLINE} fill="url(#geo-land2)" stroke="#1e5fe080" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Scan ping from Sydney */}
          {(() => {
            const s = AU_CAPITALS.find(c => c.name === 'Sydney')!
            const cx = s.left/100*360, cy = s.top/100*240
            return <>
              <circle cx={cx} cy={cy} r={14*pingScale} fill="none" stroke="rgba(30,95,224,0.35)" strokeWidth="1" opacity={Math.max(0, 1 - pingScale/2.8)} />
              <circle cx={cx} cy={cy} r={22*pingScale} fill="none" stroke="rgba(30,95,224,0.15)" strokeWidth="1" opacity={Math.max(0, 0.7 - pingScale/3)} />
            </>
          })()}
          {AU_CAPITALS.map((c,i) => {
            const cx = c.left/100*360, cy = c.top/100*240
            const isActive = activePin === i
            return (
              <g key={c.name}>
                {isActive && <circle cx={cx} cy={cy} r="10" fill={`${colors[i]}30`} />}
                <circle cx={cx} cy={cy} r="5" fill={isActive ? colors[i] : `${colors[i]}80`} stroke="#fff" strokeWidth="1.5" style={{ transition:'fill 0.3s', filter: isActive ? `drop-shadow(0 0 4px ${colors[i]})` : 'none' }} />
              </g>
            )
          })}
        </svg>
      </div>
      <div style={{ position:'absolute', bottom:90, left:8, right:8, background:'rgba(255,255,255,0.06)', borderRadius:'0 0 8px 8px', padding:'6px 12px', display:'flex', justifyContent:'space-around', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
        {[['6','Cities'], ['500+','Clients'], ['94%','Visibility']].map(([v,l]) => (
          <div key={l} style={{ textAlign:'center' }}>
            <div style={{ fontSize:13,fontWeight:800,color:'#60a5fa' }}>{v}</div>
            <div style={{ fontSize:9,color:'rgba(255,255,255,0.45)',fontWeight:500 }}>{l}</div>
          </div>
        ))}
      </div>
      <CardCTA {...p} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Google Ads — live ROAS + bar chart
───────────────────────────────────────────── */
export function GoogleAdsFace(p: CardProps) {
  const [barH, setBarH] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const [roas, setRoas] = useState(1.0)
  const [cpc, setCpc] = useState(18)
  const BARS = [18,28,22,38,48,55,62,72,80,88,92,95]

  useEffect(() => {
    let bi = 0
    const bv = setInterval(() => {
      if (bi < BARS.length) { const idx=bi; setBarH(p => { const n=[...p]; n[idx]=BARS[idx]; return n }); bi++ }
      else { bi=0; setBarH([0,0,0,0,0,0,0,0,0,0,0,0]) }
    }, 120)
    const rv = setInterval(() => {
      setRoas(v => { if (v >= 3.2) return 1.0; return Math.round((v+0.05)*100)/100 })
      setCpc(v => v > 12 ? v-1 : 18)
    }, 80)
    return () => { clearInterval(bv); clearInterval(rv) }
  }, [])

  return (
    <div style={{ ...SHELL, background: 'linear-gradient(160deg, #061420 0%, #0a1828 100%)' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, background:'rgba(255,255,255,0.04)', padding:'7px 14px', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <div style={{ width:15,height:15,borderRadius:3,background:'linear-gradient(135deg,#4285F4 0%,#34A853 50%,#FBBC04 75%,#EA4335 100%)' }} />
          <span style={{ fontSize:10.5,fontWeight:600,color:'rgba(255,255,255,0.85)' }}>Google Ads · securityblogs</span>
        </div>
        <span style={{ fontSize:9.5,color:'#34a853',fontWeight:700,background:'rgba(52,168,83,0.15)',padding:'2px 7px',borderRadius:4 }}>3 Active</span>
      </div>
      <div style={{ position:'absolute', top:38, left:12, right:12, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:6 }}>
        {[
          { label:'ROAS',      value:`${roas.toFixed(1)}×`, color:'#34a853' },
          { label:'AVG CPC',   value:`$${cpc}`,             color:'#f6c715' },
          { label:'CONV RATE', value:'8.4%',                color:'#4285F4' },
        ].map(k => (
          <div key={k.label} style={{ background:'rgba(255,255,255,0.05)',borderRadius:8,padding:'8px 8px',border:'1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize:8,letterSpacing:'0.06em',color:'rgba(255,255,255,0.4)',fontWeight:600,marginBottom:3 }}>{k.label}</div>
            <div style={{ fontSize:14,fontWeight:800,color:k.color,lineHeight:1 }}>{k.value}</div>
          </div>
        ))}
      </div>
      <div style={{ position:'absolute', top:118, left:12, right:12 }}>
        <div style={{ fontSize:8.5,color:'rgba(255,255,255,0.35)',marginBottom:5,fontFamily:'var(--font-mono)' }}>CLICKS — LAST 12 WEEKS</div>
        <div style={{ display:'flex', alignItems:'flex-end', gap:3, height:42 }}>
          {barH.map((h,i) => (
            <div key={i} style={{ flex:1, height:`${h}%`, background:`linear-gradient(180deg, #4285F4, #1a73e880)`, borderRadius:'2px 2px 0 0', minHeight:2, boxShadow: h > 70 ? '0 0 8px #4285F480' : 'none', transition:'height 0.15s ease' }} />
          ))}
        </div>
      </div>
      <div style={{ position:'absolute', top:184, left:12, right:12, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, padding:'7px 12px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:10.5,color:'rgba(255,255,255,0.65)',fontWeight:600 }}>Quality Score</span>
        <div style={{ display:'flex', gap:2 }}>
          {[1,2,3,4,5,6,7,8,9,10].map(n => (
            <div key={n} style={{ width:13,height:5,borderRadius:2,background: n<=9 ? '#4285F4' : 'rgba(255,255,255,0.1)' }} />
          ))}
        </div>
        <span style={{ fontSize:11,fontWeight:800,color:'#4285F4' }}>9/10</span>
      </div>
      <CardCTA {...p} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Bing Ads — sparkline draws + CPC counter drops
───────────────────────────────────────────── */
export function BingAdsFace(p: CardProps) {
  const [cpc, setCpc] = useState(18.60)
  const [impr, setImpr] = useState(0)
  const [dashOffset, setDashOffset] = useState(320)

  useEffect(() => {
    const cv = setInterval(() => {
      setCpc(v => v > 5.80 ? Math.round((v-0.15)*100)/100 : 18.60)
    }, 55)
    const iv = setInterval(() => setImpr(v => v < 11300 ? v+180 : 0), 40)
    const dv = setInterval(() => setDashOffset(v => v > 0 ? v-4 : 320), 20)
    return () => { clearInterval(cv); clearInterval(iv); clearInterval(dv) }
  }, [])

  return (
    <div style={{ ...SHELL, background: 'linear-gradient(160deg, #071829 0%, #051220 100%)' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, background:'rgba(255,255,255,0.04)', padding:'7px 14px', borderBottom:'1px solid rgba(0,120,212,0.2)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', width:14, height:14, gap:1.5 }}>
            {['#f25022','#7fba00','#00a4ef','#ffb900'].map(c => <span key={c} style={{ background:c, borderRadius:1 }} />)}
          </div>
          <span style={{ fontSize:10.5,fontWeight:600,color:'rgba(255,255,255,0.85)' }}>Microsoft Advertising</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:4 }}>
          <div style={{ width:5,height:5,borderRadius:'50%',background:'#0078d4',boxShadow:'0 0 8px #0078d4' }} />
          <span style={{ fontSize:9.5,color:'#00bcf2',fontWeight:700 }}>Live</span>
        </div>
      </div>
      <div style={{ position:'absolute', top:38, left:12, right:12, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:6 }}>
        {[
          { label:'CPC',        value:`$${cpc.toFixed(2)}`, color:'#0078d4' },
          { label:'IMPRESSIONS',value:impr.toLocaleString(), color:'#00bcf2' },
          { label:'B2B REACH',  value:'+41%',               color:'#107c10' },
        ].map(k => (
          <div key={k.label} style={{ background:'rgba(255,255,255,0.05)',borderRadius:8,padding:'8px 8px',border:'1px solid rgba(0,120,212,0.2)' }}>
            <div style={{ fontSize:7.5,letterSpacing:'0.06em',color:'rgba(255,255,255,0.35)',fontWeight:600,marginBottom:3 }}>{k.label}</div>
            <div style={{ fontSize:13,fontWeight:800,color:k.color,lineHeight:1 }}>{k.value}</div>
          </div>
        ))}
      </div>
      <div style={{ position:'absolute', top:118, left:12, right:12 }}>
        <div style={{ fontSize:8.5,color:'rgba(255,255,255,0.35)',marginBottom:4,fontFamily:'var(--font-mono)' }}>CLICKS TREND — 12 WEEKS</div>
        <svg viewBox="0 0 280 40" style={{ width:'100%',height:36,overflow:'visible' }}>
          <defs>
            <linearGradient id="bing-fill2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0078d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0078d4" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d="M0 34 L24 30 L48 32 L72 26 L96 22 L120 18 L144 14 L168 16 L192 10 L216 8 L240 6 L264 4 L280 3 L280 40 L0 40 Z" fill="url(#bing-fill2)" />
          <path d="M0 34 L24 30 L48 32 L72 26 L96 22 L120 18 L144 14 L168 16 L192 10 L216 8 L240 6 L264 4 L280 3" fill="none" stroke="#0078d4" strokeWidth="2" strokeLinecap="round" strokeDasharray="320" strokeDashoffset={dashOffset} />
        </svg>
      </div>
      <div style={{ position:'absolute', top:178, left:12, right:12, background:`rgba(0,120,212,0.12)`, border:'1.5px solid rgba(0,120,212,0.4)', borderRadius:12, padding:'10px 14px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ fontSize:8.5,color:'rgba(255,255,255,0.45)',fontFamily:'var(--font-mono)',marginBottom:2 }}>COST vs GOOGLE</div>
          <div style={{ fontSize:11,color:'rgba(255,255,255,0.7)' }}>Microsoft Ads CPC</div>
        </div>
        <div style={{ fontSize:28,fontWeight:900,color:'#10b981',fontFamily:'var(--font-mono)',lineHeight:1 }}>−52%</div>
      </div>
      <CardCTA {...p} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Web Design — Lighthouse scores counting up
───────────────────────────────────────────── */
export function WebDesignFace(p: CardProps) {
  const [scores, setScores] = useState([0,0,0,0])
  const [lineIdx, setLineIdx] = useState(0)
  const targets = [98,100,96,100]
  const labels = ['Perf','SEO','A11y','Best']
  const codeLines = [
    { t:'<SecurityPage />', c:'#38bdf8' },
    { t:'  schema ai-ready', c:'#06b6d4' },
    { t:'  cwv optimised',   c:'#10b981' },
    { t:'  entity-mapped',   c:'#38bdf8' },
  ]

  useEffect(() => {
    const sv = setInterval(() => {
      setScores(prev => prev.map((v,i) => v < targets[i] ? v+2 : targets[i]))
    }, 30)
    const lv = setInterval(() => setLineIdx(i => (i+1) % codeLines.length), 800)
    return () => { clearInterval(sv); clearInterval(lv) }
  }, [])

  return (
    <div style={{ ...SHELL, background: 'linear-gradient(160deg, #071629 0%, #05101e 100%)' }}>
      {/* Browser mockup */}
      <div style={{ position:'absolute', top:12, left:12, right:12, borderRadius:10, overflow:'hidden', boxShadow:'0 8px 32px rgba(0,0,0,0.5)', border:'1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ background:'rgba(255,255,255,0.06)', padding:'5px 10px', display:'flex', alignItems:'center', gap:5 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => <span key={c} style={{ width:7,height:7,borderRadius:'50%',background:c }} />)}
          <span style={{ marginLeft:6, fontSize:9, color:'rgba(255,255,255,0.45)', fontFamily:'var(--font-mono)' }}>securityblogs.com.au</span>
          <span style={{ marginLeft:'auto', fontSize:8, color:'#28c840', fontWeight:600 }}>● LIVE</span>
        </div>
        <div style={{ background:'linear-gradient(135deg, #0f2244, #0a1f3a)', padding:'10px 12px', minHeight:74 }}>
          <div style={{ height:8,background:'linear-gradient(90deg,#0ea5e9,#06b6d4)',borderRadius:4,marginBottom:6,width:'70%',boxShadow:'0 0 10px #0ea5e960' }} />
          <div style={{ height:5,background:'rgba(14,165,233,0.4)',borderRadius:3,marginBottom:10,width:'45%' }} />
          <div style={{ display:'flex', gap:6 }}>
            <div style={{ background:'linear-gradient(90deg,#0ea5e9,#06b6d4)',borderRadius:5,padding:'4px 10px',fontSize:9,color:'#fff',fontWeight:800 }}>Get Quote</div>
            <div style={{ background:'rgba(255,255,255,0.1)',borderRadius:5,padding:'4px 10px',fontSize:9,color:'rgba(255,255,255,0.7)' }}>Learn More</div>
          </div>
        </div>
        <div style={{ background:'#0d1117', padding:'6px 10px' }}>
          {codeLines.map((l,i) => (
            <div key={i} style={{ fontFamily:'var(--font-mono)', fontSize:9, color: i <= lineIdx ? l.c : 'rgba(255,255,255,0.15)', lineHeight:1.6, transition:'color 0.3s' }}>
              {l.t}{i === lineIdx && <span style={{ display:'inline-block',width:2,height:9,background:l.c,marginLeft:1,verticalAlign:'middle',animation:'blink 0.7s infinite' }} />}
            </div>
          ))}
        </div>
      </div>
      {/* Lighthouse scores */}
      <div style={{ position:'absolute', bottom:90, left:12, right:12, display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:5 }}>
        {scores.map((s,i) => (
          <div key={labels[i]} style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:7, padding:'6px 5px', textAlign:'center', boxShadow: s >= targets[i] ? '0 0 12px rgba(12,206,107,0.3)' : 'none', transition:'box-shadow 0.5s' }}>
            <div style={{ fontSize:15,fontWeight:800,color:'#0cce6b' }}>{s}</div>
            <div style={{ fontSize:8,color:'rgba(255,255,255,0.4)',marginTop:1 }}>{labels[i]}</div>
          </div>
        ))}
      </div>
      <CardCTA {...p} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   GMB Profile — map pack + review counter
───────────────────────────────────────────── */
export function GmbProfileFace(p: CardProps) {
  const [mapPos, setMapPos] = useState(3)
  const [reviews, setReviews] = useState(120)
  const [pingIdx, setPingIdx] = useState(0)
  const pins = [
    { l:'35%', t:'28%', color:'#34a853' },
    { l:'55%', t:'52%', color:'#1a73e8' },
    { l:'72%', t:'38%', color:'#ea4335' },
  ]

  useEffect(() => {
    const rv = setInterval(() => setReviews(v => v < 142 ? v+1 : 120), 120)
    const mv = setInterval(() => setMapPos(p => p > 1 ? p-1 : 3), 900)
    const pv = setInterval(() => setPingIdx(i => (i+1) % pins.length), 600)
    return () => { clearInterval(rv); clearInterval(mv); clearInterval(pv) }
  }, [])

  return (
    <div style={{ ...SHELL, background: 'linear-gradient(160deg, #071a14 0%, #051510 100%)' }}>
      <div style={{ position:'absolute', top:10, left:12, right:12, padding:'6px 12px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:22, display:'flex', alignItems:'center', gap:7, fontSize:11, color:'rgba(255,255,255,0.8)', boxShadow:'0 2px 8px rgba(0,0,0,0.2)' }}>
        <span style={{ fontSize:12 }}>📍</span>
        <span style={{ flex:1 }}>security company near me</span>
        <div style={{ width:16,height:16,borderRadius:'50%',background:'linear-gradient(135deg,#4285F4 0%,#34A853 50%,#FBBC04 75%,#EA4335 100%)' }} />
      </div>
      {/* Map */}
      <div style={{ position:'absolute', top:48, left:0, right:0, height:80, overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg, #0a2e1a, #072010)' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.05) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(255,255,255,0.05) 1.5px, transparent 1.5px)', backgroundSize:'26px 26px' }} />
        <div style={{ position:'absolute', top:'30%', left:0, right:0, height:2, background:'rgba(255,255,255,0.15)', borderRadius:1 }} />
        <div style={{ position:'absolute', top:0, bottom:0, left:'38%', width:2, background:'rgba(255,255,255,0.15)', borderRadius:1 }} />
        {pins.map((pin,i) => (
          <div key={i} style={{ position:'absolute', left:pin.l, top:pin.t, transform:'translate(-50%,-50%)' }}>
            {pingIdx === i && <span style={{ position:'absolute', top:'50%', left:'50%', width:22, height:22, borderRadius:'50%', border:`2px solid ${pin.color}`, display:'block', animation:'sb-ping 1.5s ease-out infinite', marginTop:-11, marginLeft:-11 }} />}
            <div style={{ width:18,height:18,borderRadius:'50% 50% 50% 0',transform:'rotate(-45deg)',background:pin.color,border:'2px solid #fff',boxShadow:`0 2px 8px rgba(0,0,0,0.4), 0 0 ${pingIdx===i?'12px':'4px'} ${pin.color}`,position:'relative',zIndex:2, transition:'box-shadow 0.3s' }} />
          </div>
        ))}
      </div>
      {/* Listings */}
      <div style={{ position:'absolute', top:134, left:12, right:12, display:'flex', flexDirection:'column', gap:5 }}>
        {[
          { rank:1, name:'SecureGuard Pro',    rating:'4.9', reviews:String(reviews), color:'#34a853' },
          { rank:2, name:'SafeShield Security', rating:'4.6', reviews:'89',           color:'#1a73e8' },
          { rank:3, name:'TrustWatch Alarms',   rating:'4.3', reviews:'54',           color:'rgba(255,255,255,0.3)' },
        ].map(l => (
          <div key={l.rank} style={{ background: l.rank===1 ? `rgba(52,168,83,0.12)` : 'rgba(255,255,255,0.04)', border:`1.5px solid ${l.rank===1?'rgba(52,168,83,0.45)':'rgba(255,255,255,0.07)'}`, borderRadius:8, padding:'6px 10px', display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:16,height:16,borderRadius:'50%',background: l.rank===1?'#34a853':'rgba(255,255,255,0.12)',display:'grid',placeItems:'center',flexShrink:0 }}>
              <span style={{ fontSize:9,fontWeight:800,color: l.rank===1?'#fff':'rgba(255,255,255,0.5)' }}>{l.rank}</span>
            </div>
            <span style={{ flex:1, fontSize:11, fontWeight: l.rank===1?700:500, color: l.rank===1?'#86efac':'rgba(255,255,255,0.65)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{l.name}</span>
            <span style={{ fontSize:9.5,color:'#f9ab00',fontWeight:700,flexShrink:0 }}>★ {l.rating}</span>
            <span style={{ fontSize:9,color:'rgba(255,255,255,0.35)',flexShrink:0 }}>({l.reviews})</span>
          </div>
        ))}
      </div>
      <div style={{ position:'absolute', bottom:94, left:12, right:12, display:'flex', gap:6 }}>
        <div style={{ flex:1, background:'rgba(52,168,83,0.12)', border:'1px solid rgba(52,168,83,0.3)', borderRadius:8, padding:'6px 10px', textAlign:'center' }}>
          <div style={{ fontSize:8.5,color:'rgba(255,255,255,0.4)',fontFamily:'var(--font-mono)' }}>MAP PACK POS</div>
          <div style={{ fontSize:20,fontWeight:900,color:'#34a853',fontFamily:'var(--font-mono)',lineHeight:1 }}>#{mapPos}</div>
        </div>
        <div style={{ flex:1, background:'rgba(251,188,4,0.1)', border:'1px solid rgba(251,188,4,0.25)', borderRadius:8, padding:'6px 10px', textAlign:'center' }}>
          <div style={{ fontSize:8.5,color:'rgba(255,255,255,0.4)',fontFamily:'var(--font-mono)' }}>REVIEWS</div>
          <div style={{ fontSize:20,fontWeight:900,color:'#f9ab00',fontFamily:'var(--font-mono)',lineHeight:1 }}>{reviews}</div>
        </div>
      </div>
      <CardCTA {...p} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   ServiceFace dispatcher
───────────────────────────────────────────── */
export function ServiceFace({
  slug, title, description, href, active = true,
}: { slug: string; title: string; description: string; href: string; active?: boolean }) {
  const common = { title, description, href, active }
  switch (slug) {
    case 'security-seo': return <SEOFace {...common} />
    case 'aio':          return <AIOFace {...common} />
    case 'aeo':          return <AEOFace {...common} />
    case 'geo':          return <GEOFace {...common} />
    case 'google-ads':   return <GoogleAdsFace {...common} />
    case 'bing-ads':     return <BingAdsFace {...common} />
    case 'web-design':   return <WebDesignFace {...common} />
    case 'gmb-profile':  return <GmbProfileFace {...common} />
    default:             return null
  }
}
