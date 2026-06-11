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
      <div aria-hidden className="amb-orb amb-4" />
      <div aria-hidden className="amb-orb amb-5" />

      <style>{`
        .amb-orb {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          will-change: transform, opacity;
          mix-blend-mode: multiply;
        }
        .amb-1 {
          width: 90vw; height: 90vw;
          top: -25vw; left: -20vw;
          background: radial-gradient(circle, rgba(30,95,224,0.09) 0%, transparent 65%);
          animation: amb-drift-a 22s ease-in-out infinite;
        }
        .amb-2 {
          width: 70vw; height: 70vw;
          bottom: -15vw; right: -15vw;
          background: radial-gradient(circle, rgba(111,77,255,0.08) 0%, transparent 65%);
          animation: amb-drift-b 28s ease-in-out infinite;
        }
        .amb-3 {
          width: 55vw; height: 55vw;
          top: 35vh; left: 25vw;
          background: radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 65%);
          animation: amb-drift-c 18s ease-in-out infinite;
        }
        .amb-4 {
          width: 45vw; height: 45vw;
          top: 60vh; right: 5vw;
          background: radial-gradient(circle, rgba(30,158,117,0.06) 0%, transparent 65%);
          animation: amb-drift-d 24s ease-in-out infinite reverse;
        }
        .amb-5 {
          width: 60vw; height: 60vw;
          top: 10vh; right: 20vw;
          background: radial-gradient(circle, rgba(30,95,224,0.05) 0%, transparent 65%);
          animation: amb-drift-e 32s ease-in-out infinite;
          animation-delay: -8s;
        }
        @keyframes amb-drift-a {
          0%   { transform: translate(0, 0) scale(1); }
          25%  { transform: translate(8vw, 6vh) scale(1.05); }
          50%  { transform: translate(5vw, 12vh) scale(0.97); }
          75%  { transform: translate(10vw, 4vh) scale(1.03); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes amb-drift-b {
          0%   { transform: translate(0, 0) scale(1); }
          30%  { transform: translate(-10vw, -8vh) scale(1.04); }
          60%  { transform: translate(-6vw, -12vh) scale(0.96); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes amb-drift-c {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(-7vw, 9vh) scale(1.06); }
          66%  { transform: translate(4vw, 5vh) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes amb-drift-d {
          0%   { transform: translate(0, 0) scale(1); }
          40%  { transform: translate(-9vw, -7vh) scale(1.04); }
          80%  { transform: translate(-4vw, -11vh) scale(0.98); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes amb-drift-e {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(-6vw, 8vh) scale(1.08); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .amb-orb { animation: none !important; }
        }
      `}</style>
    </>
  )
}
