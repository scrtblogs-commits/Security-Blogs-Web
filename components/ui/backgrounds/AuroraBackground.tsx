export default function AuroraBackground() {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div className="sg-aurora sg-aurora-1" />
      <div className="sg-aurora sg-aurora-2" />
      <div className="sg-aurora sg-aurora-3" />
      <style>{`
        .sg-aurora {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.4;
          will-change: transform;
        }
        html[data-theme='dark'] .sg-aurora { opacity: 0.5; }
        .sg-aurora-1 {
          width: 55vw; height: 55vw; top: -12vw; left: -8vw;
          background: radial-gradient(circle, var(--blue), transparent 65%);
          animation: sg-aurora-a 22s ease-in-out infinite;
        }
        .sg-aurora-2 {
          width: 48vw; height: 48vw; top: 20vh; right: -10vw;
          background: radial-gradient(circle, var(--violet), transparent 65%);
          animation: sg-aurora-b 26s ease-in-out infinite;
        }
        .sg-aurora-3 {
          width: 42vw; height: 42vw; bottom: -14vw; left: 30vw;
          background: radial-gradient(circle, var(--red), transparent 68%);
          opacity: 0.28;
          animation: sg-aurora-c 30s ease-in-out infinite;
        }
        @keyframes sg-aurora-a { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(8vw,6vh) scale(1.15)} }
        @keyframes sg-aurora-b { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-7vw,8vh) scale(1.1)} }
        @keyframes sg-aurora-c { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(5vw,-6vh) scale(1.2)} }
        @media (prefers-reduced-motion: reduce) { .sg-aurora { animation: none !important; } }
      `}</style>
    </div>
  )
}
