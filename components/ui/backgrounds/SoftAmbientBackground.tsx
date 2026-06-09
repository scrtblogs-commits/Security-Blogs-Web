'use client'

// Ultra-minimal ambient background:
// Three large soft gradient orbs drifting very slowly.
// Pure CSS — no canvas, no JS animation loop, never covers content.
// Total opacity budget: ~5-8% so text always wins.

export default function SoftAmbientBackground() {
  return (
    <>
      <div aria-hidden className="amb-orb amb-1" />
      <div aria-hidden className="amb-orb amb-2" />
      <div aria-hidden className="amb-orb amb-3" />

      <style>{`
        .amb-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          will-change: transform;
        }
        .amb-1 {
          width: 80vw; height: 80vw;
          top: -20vw; left: -15vw;
          background: radial-gradient(circle, rgba(30,95,224,0.07) 0%, transparent 70%);
          animation: amb-drift-a 28s ease-in-out infinite;
        }
        .amb-2 {
          width: 65vw; height: 65vw;
          bottom: -10vw; right: -10vw;
          background: radial-gradient(circle, rgba(111,77,255,0.06) 0%, transparent 70%);
          animation: amb-drift-b 34s ease-in-out infinite;
        }
        .amb-3 {
          width: 50vw; height: 50vw;
          top: 40vh; left: 30vw;
          background: radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%);
          animation: amb-drift-c 22s ease-in-out infinite;
        }
        @keyframes amb-drift-a {
          0%,100% { transform: translate(0, 0); }
          50%     { transform: translate(6vw, 8vh); }
        }
        @keyframes amb-drift-b {
          0%,100% { transform: translate(0, 0); }
          50%     { transform: translate(-8vw, -6vh); }
        }
        @keyframes amb-drift-c {
          0%,100% { transform: translate(0, 0); }
          50%     { transform: translate(-5vw, 7vh); }
        }
        @media (prefers-reduced-motion: reduce) {
          .amb-orb { animation: none !important; }
        }
      `}</style>
    </>
  )
}
