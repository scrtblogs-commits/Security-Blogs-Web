export default function MeshGradient() {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div className="sg-mesh" />
      <style>{`
        .sg-mesh {
          position: absolute;
          inset: -20%;
          opacity: 0.5;
          background:
            radial-gradient(at 18% 22%, color-mix(in srgb, var(--blue) 55%, transparent), transparent 42%),
            radial-gradient(at 82% 18%, color-mix(in srgb, var(--violet) 55%, transparent), transparent 45%),
            radial-gradient(at 72% 78%, color-mix(in srgb, var(--red) 45%, transparent), transparent 45%),
            radial-gradient(at 25% 82%, color-mix(in srgb, var(--yellow) 45%, transparent), transparent 40%);
          filter: blur(70px) saturate(140%);
          will-change: transform;
          animation: sg-mesh-move 28s ease-in-out infinite;
        }
        html[data-theme='dark'] .sg-mesh { opacity: 0.55; }
        @keyframes sg-mesh-move {
          0%,100% { transform: scale(1) rotate(0deg); }
          33% { transform: scale(1.15) rotate(4deg); }
          66% { transform: scale(1.08) rotate(-4deg); }
        }
        @media (prefers-reduced-motion: reduce) { .sg-mesh { animation: none !important; } }
      `}</style>
    </div>
  )
}
