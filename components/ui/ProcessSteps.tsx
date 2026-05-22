import Reveal from './Reveal'

export default function ProcessSteps({ steps }: { steps: { title: string; desc?: string }[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 18 }} className="sg-process">
      {steps.map((s, i) => (
        <Reveal key={i} delay={i * 0.08}>
          <div className="card" style={{ height: '100%' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--blue)', marginBottom: 10 }}>STEP {String(i + 1).padStart(2, '0')}</div>
            <h4 style={{ fontSize: 16, marginBottom: 6 }}>{s.title}</h4>
            {s.desc && <p className="text-soft" style={{ fontSize: 13.5 }}>{s.desc}</p>}
          </div>
        </Reveal>
      ))}
      <style>{`@media (max-width: 860px){ .sg-process { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 520px){ .sg-process { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}
