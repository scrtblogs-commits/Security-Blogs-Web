'use client'
import dynamic from 'next/dynamic'
import { siteConfig } from '@/lib/siteConfig'

const AIScoreWithVideo     = dynamic(() => import('./AIScoreWithVideo'),                           { ssr: false })
const ScrollStackSection   = dynamic(() => import('./ScrollStackSection'),                         { ssr: false })
const TestimonialsSection  = dynamic(() => import('./TestimonialsSection'),                        { ssr: false })
const LocalVisibilityCheck = dynamic(() => import('@/components/immersive/LocalVisibilityCheck'),  { ssr: false })

export function DynamicAIScore() {
  return <AIScoreWithVideo />
}

export function DynamicScrollStack() {
  return <ScrollStackSection />
}

export function DynamicTestimonials() {
  return <TestimonialsSection items={siteConfig.testimonials} />
}

export function DynamicLocalCheck() {
  return <LocalVisibilityCheck service="security companies" />
}
