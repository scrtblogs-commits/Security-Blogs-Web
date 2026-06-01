'use client'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { GMAPS_KEY } from '@/lib/env'

// Embeds the Google Maps "local pack" view for "<service> in <suburb>".
// This is the moment of truth — real Google Maps results showing whether
// the user's brand is visible to local searchers. Uses the free Embed API.
export default function LocalPackEmbed({
  progress,
  service,
  suburb,
  country,
}: {
  progress: MotionValue<number>
  service: string
  suburb: string
  country: string
}) {
  // Visible across the suburb-landing + climax stages. Positioned bottom-LEFT
  // so it doesn't overlap RankingClimb (top-right) or AdsCounter (bottom-right).
  const opacity = useTransform(progress, [0.66, 0.74, 0.99, 1], [0, 1, 1, 1])
  const x = useTransform(progress, [0.66, 0.74], [-120, 0])

  const query = encodeURIComponent(`${service} in ${suburb} ${country}`.trim())
  const src = GMAPS_KEY
    ? `https://www.google.com/maps/embed/v1/search?key=${GMAPS_KEY}&q=${query}&zoom=13`
    : ''

  return (
    <motion.div
      style={{
        opacity, x,
        position: 'absolute', bottom: '6%', left: '3%',
        width: 'min(360px, 36vw)', height: 'min(360px, 50vh)',
        background: '#fff',
        borderRadius: 16,
        padding: 8,
        boxShadow: '0 30px 80px rgba(0,0,0,0.22)',
        zIndex: 10,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px 8px' }}>
        <div style={{ width: 18, height: 18, borderRadius: 4, background: 'linear-gradient(135deg, #4285F4 0%, #34A853 50%, #FBBC04 75%, #EA4335 100%)' }} />
        <div style={{ fontSize: 12, color: '#202124', fontWeight: 600 }}>
          {service || 'security companies'} in {suburb || 'your suburb'}
        </div>
      </div>
      {src ? (
        <iframe
          title="Local pack"
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0, width: '100%', flex: 1, borderRadius: 10 }}
          allowFullScreen
        />
      ) : (
        <div style={{ flex: 1, display: 'grid', placeItems: 'center', color: '#5f6368', fontSize: 12, padding: 20, textAlign: 'center' }}>
          Map embed requires a Google Maps API key.
        </div>
      )}
    </motion.div>
  )
}
