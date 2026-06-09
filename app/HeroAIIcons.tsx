'use client'
import { motion } from 'framer-motion'

const platforms = [
  { label: 'ChatGPT',    bg: '#10a37f', text: '#fff',     symbol: 'GPT',  top: '6%',  left: '62%' },
  { label: 'Claude',     bg: '#d97706', text: '#fff',     symbol: 'Cl',   top: '18%', left: '8%'  },
  { label: 'Gemini',     bg: '#4285f4', text: '#fff',     symbol: 'G',    top: '68%', left: '72%' },
  { label: 'Perplexity', bg: '#20b2aa', text: '#fff',     symbol: 'Px',   top: '76%', left: '4%'  },
  { label: 'Copilot',    bg: '#0078d4', text: '#fff',     symbol: 'Co',   top: '42%', left: '80%' },
  { label: 'Meta AI',    bg: '#0866ff', text: '#fff',     symbol: 'M',    top: '55%', left: '0%'  },
]

export default function HeroAIIcons() {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: 380 }}>
      {platforms.map((p, i) => (
        <motion.div
          key={p.label}
          title={p.label}
          style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            width: 52,
            height: 52,
            borderRadius: 16,
            background: p.bg,
            color: p.text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 13,
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            userSelect: 'none',
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 3.8 + i * 0.4,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: i * 0.35,
          }}
        >
          {p.symbol}
        </motion.div>
      ))}

      {/* Central glowing orb */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30,95,224,0.22) 0%, rgba(111,77,255,0.12) 50%, transparent 75%)',
          filter: 'blur(24px)',
          pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
      />

      {/* Central label */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        pointerEvents: 'none',
      }}>
        <div className="eyebrow" style={{ fontSize: 11, marginBottom: 6 }}>Visible on</div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 28,
          background: 'linear-gradient(135deg, var(--blue), var(--violet))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.1,
        }}>
          10+<br />Platforms
        </div>
      </div>
    </div>
  )
}
