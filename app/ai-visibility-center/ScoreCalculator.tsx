'use client'
import { useState } from 'react'
import GaugeRing, { tierFor } from '@/components/ui/GaugeRing'
import MagneticButton from '@/components/ui/MagneticButton'

const questions = [
  'Does your website use structured schema markup?',
  'Are you listed on 3+ industry directories?',
  'Have you published 10+ long-form guides?',
  'Does ChatGPT currently mention your brand?',
  'Do you have a Wikipedia or Wikidata entry?',
  'Have you published content in the last 30 days?',
]

const recoByTier: Record<string, string[]> = {
  Invisible: [
    'Add schema markup & build a verified entity profile so AI can identify you.',
    'Get listed across the top security directories to seed authority signals.',
    'Publish your first 5 authoritative, citable long-form guides.',
  ],
  Emerging: [
    'Strengthen entity signals — claim Wikidata and align your NAP everywhere.',
    'Expand to 10+ in-depth guides AI engines can quote directly.',
    'Establish a consistent weekly publishing cadence.',
  ],
  Visible: [
    'Target featured snippets and AI-answer formatting (FAQ, how-to schema).',
    'Earn authoritative backlinks from security publications.',
    'Monitor citations and defend your branded AI mentions.',
  ],
  Authority: [
    'Protect and scale your AI citations across every answer engine.',
    'Dominate adjacent keyword clusters before competitors do.',
    'Expand into new markets (US / UK / UAE / SG) with localised entities.',
  ],
}

export default function ScoreCalculator() {
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(questions.length).fill(null))
  const yesCount = answers.filter((a) => a === true).length
  const score = Math.round((yesCount / questions.length) * 100)
  const tier = tierFor(score)
  const allAnswered = answers.every((a) => a !== null)

  const set = (i: number, val: boolean) =>
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)))

  return (
    <div className="grid-2" style={{ gap: 36, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {questions.map((q, i) => (
          <div key={i} className="card flex justify-between items-center gap-3" style={{ padding: '14px 18px' }}>
            <span style={{ fontSize: 14.5 }}>{q}</span>
            <div className="flex gap-2">
              <button
                className={`pill ${answers[i] === true ? 'active' : ''}`}
                onClick={() => set(i, true)}
                aria-pressed={answers[i] === true}
              >
                Yes
              </button>
              <button
                className={`pill ${answers[i] === false ? 'active' : ''}`}
                onClick={() => set(i, false)}
                aria-pressed={answers[i] === false}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass center" style={{ padding: 34, position: 'sticky', top: 'calc(var(--nav-h) + 16px)' }}>
        <span className="eyebrow">Your AI Visibility Score</span>
        <div className="flex justify-center" style={{ margin: '18px 0' }}>
          <GaugeRing score={score} size={220} />
        </div>
        <p className="text-soft" style={{ fontSize: 14, marginBottom: 18 }}>
          {allAnswered
            ? <>You're in the <strong style={{ color: tier.color }}>{tier.label}</strong> tier. Here's how to climb:</>
            : <>Answer all {questions.length} questions to reveal your tier and recommendations.</>}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left', marginBottom: 24 }}>
          {recoByTier[tier.label].map((r, i) => (
            <div key={i} className="card flex items-start gap-2" style={{ padding: 13, opacity: allAnswered ? 1 : 0.45, transition: 'opacity .3s' }}>
              <span style={{ color: tier.color, fontSize: 16 }}>✓</span>
              <span style={{ fontSize: 13.5 }}>{r}</span>
            </div>
          ))}
        </div>
        <MagneticButton href="/contact/" className="btn btn-primary btn-lg">Get your full audit →</MagneticButton>
      </div>
    </div>
  )
}
