'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const aiPlatforms = ['ChatGPT','Perplexity','Gemini','Google AI Overviews','Bing Copilot','Claude','SearchGPT','Meta AI','You.com','Brave Leo']

const services = [
  { title:'Security SEO', desc:'Rank #1 for every high-intent security keyword your buyers search.', icon:'🔍', href:'/services/security-seo/', color:'#1e5fe0' },
  { title:'AIO', desc:'Get cited by ChatGPT, Perplexity & every AI answer engine.', icon:'🤖', href:'/services/aio/', color:'#6f4dff' },
  { title:'AEO', desc:'Become the featured answer in AI-generated responses.', icon:'💬', href:'/services/aeo/', color:'#7f77dd' },
  { title:'GEO', desc:'Build entity authority so AI platforms trust your brand.', icon:'🌐', href:'/services/geo/', color:'#e23744' },
  { title:'Google Ads', desc:'High-converting PPC campaigns built for security buyers.', icon:'📢', href:'/services/google-ads/', color:'#f6c715' },
  { title:'Bing Ads', desc:'Capture 41% of B2B buyers searching on Microsoft Bing.', icon:'🔷', href:'/services/bing-ads/', color:'#0078d4' },
  { title:'Web Design', desc:'AI-ready websites that rank, convert and get cited.', icon:'🎨', href:'/services/web-design/', color:'#1e9e75' },
]

const stats = [
  { num:'+180%', label:'Average organic traffic growth' },
  { num:'3.2×', label:'Average ROAS on Google Ads' },
  { num:'87%', label:'AI citation rate achieved' },
  { num:'50+', label:'Security brands served' },
]

const scoreRows = [
  { label:'Content depth', key:'content' as const, color:'var(--blue)' },
  { label:'Entity authority', key:'entity' as const, color:'var(--purple)' },
  { label:'Schema coverage', key:'schema' as const, color:'var(--green)' },
  { label:'Citation rate', key:'citation' as const, color:'var(--red)' },
]

export default function HomePage() {
  const [score] = useState({ total:87, content:87, entity:72, schema:91, citation:79 })
  const [chatStep, setChatStep] = useState(0)
  const [typed, setTyped] = useState('')
  const [replyTyped, setReplyTyped] = useState('')

  const chatMsg = 'Who are the top security companies in Australia for enterprise access control?'
  const chatReply = 'Based on my research, SecurityGrowth clients dominate AI citations across Australia...'

  useEffect(() => {
    const t = setTimeout(() => {
      if (chatStep === 0) {
        let i = 0
        const iv = setInterval(() => {
          setTyped(chatMsg.slice(0, ++i))
          if (i >= chatMsg.length) { clearInterval(iv); setChatStep(1) }
        }, 40)
      }
    }, 1000)
    return () => clearTimeout(t)
  }, [chatStep])

  useEffect(() => {
    if (chatStep !== 1) return
    const t = setTimeout(() => {
      let i = 0
      const iv = setInterval(() => {
        setReplyTyped(chatReply.slice(0, ++i))
        if (i >= chatReply.length) { clearInterval(iv); setChatStep(2) }
      }, 22)
    }, 600)
    return () => clearTimeout(t)
  }, [chatStep])

  return (
    <>
      {/* Hero */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden', paddingTop:72, background:'var(--bg)' }}>
        <div className="blob blob-blue" style={{ top:'-200px', left:'-200px' }} />
        <div className="blob blob-red" style={{ bottom:'-100px', right:'-100px' }} />
        <div className="blob blob-yellow" style={{ top:'30%', right:'20%' }} />
        {/* grid overlay */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)', backgroundSize:'48px 48px', opacity:0.4 }} />

        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="grid-2" style={{ alignItems:'center', gap:64 }}>
            {/* Left */}
            <div>
              <div className="badge badge-blue" style={{ marginBottom:24 }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:'#10b981', display:'inline-block' }} />
                LIVE · AI VISIBILITY ENGINE
              </div>
              <h1 style={{ fontSize:'clamp(40px,6vw,72px)', fontWeight:800, lineHeight:1.1, marginBottom:24 }}>
                Be the <span style={{ color:'var(--blue)', fontStyle:'italic' }}>answer</span>{' '}
                <span style={{ color:'var(--red)' }}>AI</span> gives.
              </h1>
              <p style={{ fontSize:20, lineHeight:1.6, color:'var(--muted)', maxWidth:520, marginBottom:32 }}>
                We make security brands the #1 result on Google <em>and</em> the cited source inside
                ChatGPT, Perplexity, Gemini and every AI answer engine your buyers now trust.
              </p>
              <div style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:36 }}>
                <Link href="/contact/" className="btn btn-primary">Get your free AI audit →</Link>
                <Link href="/#services" className="btn btn-ghost">Explore services</Link>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:16, color:'var(--muted)', fontSize:14 }}>
                <div style={{ display:'flex' }}>
                  {['#1e5fe0','#6f4dff','#e23744','#1e9e75'].map((c,i)=>(
                    <span key={i} style={{ width:34, height:34, borderRadius:'50%', background:c, border:'2px solid var(--surface)', marginLeft:i?-10:0, display:'inline-block' }} />
                  ))}
                </div>
                Trusted by <strong style={{ color:'var(--text)' }}>50+</strong> security brands worldwide
              </div>
            </div>

            {/* Right — AI chat demo + visibility score */}
            <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
              {/* Chat */}
              <div className="card" style={{ padding:0, overflow:'hidden' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, padding:'14px 18px', borderBottom:'1px solid var(--line)' }}>
                  <span style={{ width:10, height:10, borderRadius:'50%', background:'#ff5f57' }} />
                  <span style={{ width:10, height:10, borderRadius:'50%', background:'#febc2e' }} />
                  <span style={{ width:10, height:10, borderRadius:'50%', background:'#28c840' }} />
                  <span style={{ marginLeft:8, fontSize:13, fontWeight:600, color:'var(--muted)' }}>AI Answer Engine</span>
                </div>
                <div style={{ padding:18, display:'flex', flexDirection:'column', gap:14, minHeight:180 }}>
                  <div style={{ alignSelf:'flex-end', maxWidth:'85%', background:'var(--blue)', color:'#fff', padding:'10px 14px', borderRadius:'14px 14px 4px 14px', fontSize:14, lineHeight:1.5 }}>
                    {typed}
                    {chatStep === 0 && <span className="blink">▋</span>}
                  </div>
                  {chatStep >= 1 && (
                    <div style={{ alignSelf:'flex-start', maxWidth:'90%', background:'rgba(13,17,23,0.04)', padding:'10px 14px', borderRadius:'14px 14px 14px 4px', fontSize:14, lineHeight:1.5 }}>
                      <strong style={{ color:'var(--purple)' }}>🤖 </strong>
                      {replyTyped}
                      {chatStep === 1 && <span className="blink">▋</span>}
                    </div>
                  )}
                </div>
              </div>

              {/* Visibility score */}
              <div className="card">
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.08em' }}>AI Visibility Score</div>
                    <div style={{ fontSize:13, color:'var(--muted)' }}>Live snapshot</div>
                  </div>
                  <div style={{ fontSize:40, fontWeight:800, color:'var(--green)' }}>{score.total}<span style={{ fontSize:18, color:'var(--muted)' }}>/100</span></div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {scoreRows.map((row)=>(
                    <div key={row.key}>
                      <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:6 }}>
                        <span style={{ color:'var(--muted)' }}>{row.label}</span>
                        <strong>{score[row.key]}%</strong>
                      </div>
                      <div style={{ height:8, borderRadius:999, background:'rgba(13,17,23,0.06)', overflow:'hidden' }}>
                        <div style={{ width:`${score[row.key]}%`, height:'100%', borderRadius:999, background:row.color, transition:'width 0.8s ease' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI platforms strip */}
      <section style={{ borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', background:'var(--surface)', padding:'28px 0' }}>
        <div className="container">
          <p style={{ textAlign:'center', fontSize:13, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:18 }}>
            We get you cited across every AI answer engine
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'14px 28px' }}>
            {aiPlatforms.map((p)=>(
              <span key={p} style={{ fontSize:16, fontWeight:700, color:'var(--muted)', opacity:0.75 }}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <span className="eyebrow">What we do</span>
            <h2 style={{ fontSize:'clamp(30px,4vw,46px)', fontWeight:800, margin:'12px 0 16px' }}>
              One growth engine. Every channel that matters.
            </h2>
            <p style={{ color:'var(--muted)', fontSize:18, maxWidth:620, margin:'0 auto' }}>
              From classic search to AI answer engines, we own every surface where security buyers
              discover, compare and choose vendors.
            </p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:24 }}>
            {services.map((s)=>(
              <Link key={s.title} href={s.href} className="card" style={{ display:'block' }}>
                <div style={{ width:52, height:52, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, background:`${s.color}14`, marginBottom:18 }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize:20, fontWeight:700, marginBottom:8 }}>{s.title}</h3>
                <p style={{ color:'var(--muted)', fontSize:15, lineHeight:1.6, marginBottom:14 }}>{s.desc}</p>
                <span style={{ color:s.color, fontWeight:700, fontSize:14 }}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="section" style={{ background:'var(--text)', color:'#fff', position:'relative', overflow:'hidden' }}>
        <div className="blob blob-blue" style={{ top:'-150px', right:'-150px', opacity:0.25 }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <span style={{ color:'var(--yellow)', textTransform:'uppercase', letterSpacing:'0.12em', fontSize:13, fontWeight:700 }}>The results</span>
            <h2 style={{ fontSize:'clamp(30px,4vw,46px)', fontWeight:800, marginTop:12 }}>
              Numbers our clients brag about.
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:24 }}>
            {stats.map((s)=>(
              <div key={s.label} style={{ textAlign:'center', padding:'28px 16px', border:'1px solid rgba(255,255,255,0.1)', borderRadius:18, background:'rgba(255,255,255,0.03)' }}>
                <div style={{ fontSize:46, fontWeight:800, color:'var(--yellow)', lineHeight:1 }}>{s.num}</div>
                <div style={{ marginTop:10, color:'rgba(255,255,255,0.7)', fontSize:15 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div style={{ background:'linear-gradient(135deg, var(--blue), var(--purple))', borderRadius:28, padding:'64px 32px', textAlign:'center', color:'#fff', position:'relative', overflow:'hidden' }}>
            <h2 style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:800, marginBottom:16 }}>
              Ready to be the answer AI gives?
            </h2>
            <p style={{ fontSize:18, opacity:0.9, maxWidth:560, margin:'0 auto 28px' }}>
              Get a free AI visibility audit and see exactly where your security brand is winning —
              and where competitors are getting cited instead of you.
            </p>
            <Link href="/contact/" className="btn btn-ghost" style={{ background:'#fff', color:'var(--blue)' }}>
              Get your free AI audit →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
