'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GaugeRing, { tierFor } from './GaugeRing'

const queries = ['best security company Sydney', 'CCTV installers Melbourne', 'access control systems', 'security monitoring services', 'alarm installation Brisbane', 'enterprise security solutions', 'security camera installation', '24/7 security monitoring']
const platforms = ['ChatGPT', 'Perplexity', 'Gemini', 'Google AI Overview', 'Bing Copilot']
const challenges = ['Not ranking on Google', 'Not cited by AI', 'Low quality leads', 'Poor ROAS', 'Website not converting', 'Starting from scratch']

const recoByTier: Record<string, string[]> = {
  Invisible: ['Build foundational schema markup & entity profile', 'Publish authority content AI can cite', 'Get listed across security directories'],
  Emerging: ['Strengthen entity signals across platforms', 'Expand long-form, citable guides', 'Add FAQ & structured data site-wide'],
  Visible: ['Target featured snippets & AI answers', 'Build authoritative backlinks', 'Monitor & defend existing citations'],
  Authority: ['Protect & scale your AI citations', 'Dominate adjacent keyword clusters', 'Expand into new markets (US/UK/UAE/SG)'],
}

export default function AIVisibilityChallenge({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const totalSteps = variant === 'compact' ? 3 : 5
  const [step, setStep] = useState(1)
  const [selQueries, setSelQueries] = useState<string[]>([])
  const [aiToggles, setAiToggles] = useState<Record<string, boolean>>({})
  const [slider, setSlider] = useState(40)
  const [challenge, setChallenge] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const computeScore = () => {
    const yesCount = Object.values(aiToggles).filter(Boolean).length
    const base = variant === 'compact' ? slider : (yesCount / platforms.length) * 60 + slider * 0.4
    return Math.max(4, Math.min(98, Math.round(base)))
  }

  const finish = () => {
    setResult(computeScore())
    console.log('challenge result', { selQueries, aiToggles, slider, challenge, name, email, timestamp: new Date().toISOString() })
  }

  if (result !== null) {
    const tier = tierFor(result)
    return (
      <div className="glass center" style={{ padding: 36 }}>
        <div className="flex justify-center" style={{ marginBottom: 16 }}><GaugeRing score={result} /></div>
        <h3 style={{ marginBottom: 6 }}>You're <span style={{ color: tier.color }}>{tier.label}</span> to AI</h3>
        <p className="text-soft" style={{ marginBottom: 20 }}>Here's how to climb to Authority tier:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left', maxWidth: 420, margin: '0 auto 24px' }}>
          {recoByTier[tier.label].map((r, i) => (
            <div key={i} className="card flex items-center gap-3" style={{ padding: 14 }}><span className="accent" style={{ fontSize: 18 }}>✓</span><span style={{ fontSize: 14 }}>{r}</span></div>
          ))}
        </div>
        <a href="/book-strategy-call/" className="btn btn-primary btn-lg" style={{ animation: 'pulse 2s infinite' }}>Book your free strategy call →</a>
      </div>
    )
  }

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])

  return (
    <div className="glass" style={{ padding: 30 }}>
      <div className="flex justify-between items-center" style={{ marginBottom: 18 }}>
        <span className="eyebrow">AI Visibility Challenge</span>
        <span className="chip">Step {step} of {totalSteps}</span>
      </div>
      <div className="meter" style={{ marginBottom: 24 }}><span style={{ width: `${(step / totalSteps) * 100}%`, background: 'var(--blue)', transition: 'width .3s' }} /></div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
          {step === 1 && (
            <>
              <h3 style={{ marginBottom: 16 }}>What do your buyers search for?</h3>
              <div className="flex flex-wrap gap-2">
                {queries.map((q) => <button key={q} className={`pill ${selQueries.includes(q) ? 'active' : ''}`} onClick={() => toggle(selQueries, setSelQueries, q)}>{q}</button>)}
              </div>
            </>
          )}
          {step === 2 && variant === 'full' && (
            <>
              <h3 style={{ marginBottom: 16 }}>Does your brand appear in AI answers?</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {platforms.map((p) => (
                  <div key={p} className="card flex justify-between items-center" style={{ padding: '12px 16px' }}>
                    <span>{p}</span>
                    <div className="flex gap-2">
                      <button className={`pill ${aiToggles[p] === true ? 'active' : ''}`} onClick={() => setAiToggles({ ...aiToggles, [p]: true })}>Yes</button>
                      <button className={`pill ${aiToggles[p] === false ? 'active' : ''}`} onClick={() => setAiToggles({ ...aiToggles, [p]: false })}>No</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {((step === 2 && variant === 'compact') || (step === 3 && variant === 'full')) && (
            <>
              <h3 style={{ marginBottom: 20 }}>Rate your current AI visibility</h3>
              <div className="center" style={{ marginBottom: 20 }}><GaugeRing score={slider} size={160} /></div>
              <input type="range" min={0} max={100} value={slider} onChange={(e) => setSlider(+e.target.value)} style={{ width: '100%', accentColor: 'var(--blue)' }} />
            </>
          )}
          {step === 4 && variant === 'full' && (
            <>
              <h3 style={{ marginBottom: 16 }}>Biggest challenge?</h3>
              <div className="flex flex-wrap gap-2">
                {challenges.map((c) => <button key={c} className={`pill ${challenge === c ? 'active' : ''}`} onClick={() => setChallenge(c)}>{c}</button>)}
              </div>
            </>
          )}
          {((step === 3 && variant === 'compact') || (step === 5 && variant === 'full')) && (
            <>
              <h3 style={{ marginBottom: 16 }}>Where should we send your results?</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input className="field" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="field" type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" className="honeypot" tabIndex={-1} aria-hidden="true" />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between" style={{ marginTop: 26 }}>
        <button className="btn btn-outline" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1} style={{ opacity: step === 1 ? 0.4 : 1 }}>← Back</button>
        {step < totalSteps
          ? <button className="btn btn-primary" onClick={() => setStep((s) => s + 1)}>Continue →</button>
          : <button className="btn btn-primary" onClick={finish} disabled={!name || !email} style={{ opacity: !name || !email ? 0.5 : 1 }}>Get My Free AI Score →</button>}
      </div>
    </div>
  )
}
