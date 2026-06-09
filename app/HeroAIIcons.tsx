'use client'
import { motion } from 'framer-motion'

// Official SVG logos for ChatGPT (OpenAI) and Claude (Anthropic).
// All other platforms use accurate brand colours + abbreviations.

const OpenAILogo = () => (
  <svg viewBox="0 0 41 41" width="26" height="26" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.215-2.972 10.079 10.079 0 0 0-10.402 4.713A9.963 9.963 0 0 0 3.533 13.67a10.078 10.078 0 0 0-1.678 11.03 9.964 9.964 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.215 2.972 10.079 10.079 0 0 0 10.402-4.713 9.965 9.965 0 0 0 5.671-8.07 10.079 10.079 0 0 0 1.678-11.029zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L7.044 23.86a7.504 7.504 0 0 1-2.747-10.24zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l8.048 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943 4.33-2.501 4.332 2.497v4.998l-4.331 2.5-4.331-2.5V18z"/>
  </svg>
)

const ClaudeLogo = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-1.314-.097L1 12.529l.005-.739.449-.246 1.315.055 2.367.146 2.626.158.79.055h.281l-.059-.116-.14-.286-1.281-2.479-1.224-2.405-.831-1.668-.523-1.107.117-.44.401-.282.658.06.401.265.55 1.095.848 1.801 1.203 2.479 1.224 2.527.638 1.315h.117l.065-.065V12.4l.06-3.292.041-3.2.022-1.437-.022-.58-.06-.843.232-.635.55-.329.633.073.36.427.175.896.022 2.369-.015 3.449-.015 3.162h.14l.187-.384 1.261-2.72 1.036-2.19.77-1.511.524-.777.573-.311.499.146.35.378.073.683-.232.621-.662 1.169-1.329 2.832-.963 2.094-.35.79.064.006.19-.14 2.614-1.607 2.515-1.546 1.755-1.085.85-.503.44.024.401.294.11.634-.26.432-.926.547-2.288 1.41-2.118 1.28-.845.528.014.073.12.055 2.675.619 2.685.655 1.384.427.67.329-.06.622-.36.384-.72-.049-1.404-.329-2.784-.712-2.431-.601-.76-.158h-.11l-.014.11.314.73.843 1.946.99 2.235.678 1.656.165.9-.238.572-.547.268-.608-.196-.36-.512-.916-2.18-1.03-2.332-.899-2.094-.286-.669h-.128l-.046.128-.128 3.894-.128 3.79-.085 1.241-.232.676-.547.286-.547-.232-.35-.614.034-1.095.209-3.857.27-3.921v-.117h-.14l-.726 1.17-2.29 3.717-1.645 2.625-.839 1.107-.596.402-.62-.11-.303-.45.097-.718.443-.77 1.49-2.174 2.176-3.522 1.448-2.357.34-.621v-.104l-.104-.006z"/>
  </svg>
)

const platforms = [
  {
    label: 'ChatGPT',
    bg: '#10a37f',
    text: '#fff',
    logo: <OpenAILogo />,
    top: '4%',
    left: '64%',
    delay: 0,
  },
  {
    label: 'Claude',
    bg: '#d97706',
    text: '#fff',
    logo: <ClaudeLogo />,
    top: '20%',
    left: '4%',
    delay: 0.5,
  },
  {
    label: 'Gemini',
    bg: '#4285f4',
    text: '#fff',
    logo: null,
    symbol: 'G✦',
    top: '66%',
    left: '74%',
    delay: 0.9,
  },
  {
    label: 'Perplexity',
    bg: '#20b2aa',
    text: '#fff',
    logo: null,
    symbol: 'Px',
    top: '78%',
    left: '2%',
    delay: 1.3,
  },
  {
    label: 'Copilot',
    bg: '#0078d4',
    text: '#fff',
    logo: null,
    symbol: 'Co',
    top: '44%',
    left: '82%',
    delay: 0.7,
  },
  {
    label: 'Meta AI',
    bg: '#0866ff',
    text: '#fff',
    logo: null,
    symbol: 'M',
    top: '56%',
    left: '0%',
    delay: 1.1,
  },
]

export default function HeroAIIcons() {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: 400 }}>
      {/* Floating platform icons */}
      {platforms.map((p, i) => (
        <motion.div
          key={p.label}
          title={p.label}
          aria-label={p.label}
          style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            width: 54,
            height: 54,
            borderRadius: 16,
            background: p.bg,
            color: p.text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 13,
            boxShadow: '0 8px 28px rgba(0,0,0,0.18)',
            userSelect: 'none',
          }}
          initial={{ opacity: 0, scale: 0.6, y: 10 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
            rotate: [-2, 2, -2],
          }}
          transition={{
            opacity: { duration: 0.5, delay: p.delay },
            scale:   { duration: 0.5, delay: p.delay },
            y: {
              duration: 3.6 + i * 0.3,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: p.delay + 0.5,
            },
            rotate: {
              duration: 3.6 + i * 0.3,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: p.delay + 0.5,
            },
          }}
        >
          {p.logo ?? p.symbol}
        </motion.div>
      ))}

      {/* Central glowing pulse */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(30,95,224,0.20) 0%, rgba(111,77,255,0.10) 50%, transparent 72%)',
          filter: 'blur(28px)',
          pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 1, 0.5] }}
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
        whiteSpace: 'nowrap',
      }}>
        <div className="eyebrow" style={{ fontSize: 11, marginBottom: 6 }}>Visible on</div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 32,
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
