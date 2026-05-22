'use client'
import { Fingerprint, Code2, Network, Quote, BadgeCheck, Trophy } from 'lucide-react'
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline'

const timelineData = [
  { id: 1, title: 'Entity Created', date: 'Phase 1', category: 'Foundation', icon: Fingerprint, relatedIds: [2, 6], status: 'completed' as const, energy: 100, content: 'Your brand is established as a distinct, verifiable entity AI can recognise across the web.' },
  { id: 2, title: 'Schema Markup', date: 'Phase 2', category: 'Technical', icon: Code2, relatedIds: [1, 3], status: 'completed' as const, energy: 88, content: 'Structured data tells AI exactly what you do, where, and why you are trustworthy.' },
  { id: 3, title: 'Signal Network', date: 'Phase 3', category: 'Authority', icon: Network, relatedIds: [2, 4], status: 'in-progress' as const, energy: 64, content: 'Directories, citations and consistent NAP build the web of signals AI cross-checks.' },
  { id: 4, title: 'AI Citations', date: 'Phase 4', category: 'Visibility', icon: Quote, relatedIds: [3, 5], status: 'in-progress' as const, energy: 47, content: 'ChatGPT, Perplexity and Gemini begin naming your brand in answers to buyer questions.' },
  { id: 5, title: 'Knowledge Panel', date: 'Phase 5', category: 'Recognition', icon: BadgeCheck, relatedIds: [4, 6], status: 'pending' as const, energy: 28, content: 'Google confirms your entity with a knowledge panel — the strongest trust signal.' },
  { id: 6, title: 'Authority Tier', date: 'Phase 6', category: 'Dominance', icon: Trophy, relatedIds: [5, 1], status: 'pending' as const, energy: 12, content: 'You become the default recommendation across every AI platform in your market.' },
]

export default function OrbitalTimeline() {
  return <RadialOrbitalTimeline timelineData={timelineData} />
}
