export default function DotNoise() {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div className="sg-dotgrid" />
      <div className="sg-noise" />
      <div className="blob blob-blue" style={{ top: '-10%', left: '-6%', opacity: 0.18 }} />
      <div className="blob blob-violet" style={{ bottom: '-12%', right: '-6%', opacity: 0.16 }} />
      <style>{`
        .sg-dotgrid {
          position: absolute; inset: 0;
          background-image: radial-gradient(var(--line) 1.4px, transparent 1.4px);
          background-size: 26px 26px;
          opacity: 0.7;
          -webkit-mask-image: radial-gradient(ellipse at 50% 40%, #000 35%, transparent 80%);
          mask-image: radial-gradient(ellipse at 50% 40%, #000 35%, transparent 80%);
        }
        .sg-noise {
          position: absolute; inset: 0;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        html[data-theme='dark'] .sg-noise { opacity: 0.06; }
      `}</style>
    </div>
  )
}
