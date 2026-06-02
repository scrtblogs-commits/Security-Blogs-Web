// Centralised emoji -> Lucide icon mapping. Lets us strip every decorative
// emoji from body content with a single drop-in component: <Glyph icon="🤖" />.
//
// All icons come from one library (lucide-react, MIT) per the brief's
// "pick ONE library and stick to it" constraint. Brand-coloured marks
// (Bing 2x2 squares, Microsoft) are inline SVG below since lucide doesn't
// ship trademarked logos.
import {
  Search, Bot, MessageSquare, Globe, Megaphone, Palette, BarChart3, Shield,
  Zap, Infinity as InfinityIcon, Tag, Brain, FolderOpen, Link as LinkIcon,
  RefreshCw, Radio, Star, Briefcase, Rocket, Mail, Phone, Target, Map as MapIcon,
  FileText, Gift, Unlock, Check, TrendingUp, Sparkles,
} from 'lucide-react'

type IconCmp = React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>

const EMOJI_MAP: Record<string, IconCmp> = {
  '🔍': Search,
  '🤖': Bot,
  '💬': MessageSquare,
  '🌐': Globe,
  '📢': Megaphone,
  '🎨': Palette,
  '📊': BarChart3,
  '🛡️': Shield,
  '⚡': Zap,
  '♾️': InfinityIcon,
  '🏷️': Tag,
  '🧠': Brain,
  '🗂️': FolderOpen,
  '🔗': LinkIcon,
  '🔄': RefreshCw,
  '📡': Radio,
  '⭐': Star,
  '💼': Briefcase,
  '🚀': Rocket,
  '✉️': Mail,
  '📞': Phone,
  '🎯': Target,
  '🗺️': MapIcon,
  '📄': FileText,
  '🎁': Gift,
  '🔓': Unlock,
  '✓': Check,
  '📈': TrendingUp,
  '✨': Sparkles,
}

// Brand-coloured 2x2 Microsoft-style tile, used where 🔷 appears for Bing/MS.
const BingTile = ({ size = 22 }: { size?: number }) => (
  <span
    aria-hidden
    style={{
      display: 'inline-grid',
      gridTemplateColumns: '1fr 1fr',
      width: size, height: size, gap: Math.max(1, Math.round(size / 18)),
    }}
  >
    <span style={{ background: '#f25022', borderRadius: 1 }} />
    <span style={{ background: '#7fba00', borderRadius: 1 }} />
    <span style={{ background: '#00a4ef', borderRadius: 1 }} />
    <span style={{ background: '#ffb900', borderRadius: 1 }} />
  </span>
)

export default function Glyph({
  icon,
  size = 22,
  strokeWidth = 2,
  className,
  style,
}: {
  icon: string
  size?: number
  strokeWidth?: number
  className?: string
  style?: React.CSSProperties
}) {
  // Microsoft / Bing tile — custom branded mark
  if (icon === '🔷') {
    return (
      <span className={className} style={style}>
        <BingTile size={size} />
      </span>
    )
  }

  const Cmp = EMOJI_MAP[icon]
  if (!Cmp) {
    // Unknown emoji — fall back to the literal character so we don't
    // silently break content.
    return (
      <span className={className} aria-hidden style={style}>
        {icon}
      </span>
    )
  }
  return (
    <span
      className={className}
      aria-hidden
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style }}
    >
      <Cmp size={size} strokeWidth={strokeWidth} />
    </span>
  )
}
