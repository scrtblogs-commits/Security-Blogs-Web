'use client'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { GMAPS_KEY } from '@/lib/env'

// Google Street View embed for the chosen suburb's centre point. Adds the
// "feet on the ground" feel after we've zoomed all the way from the globe.
export default function StreetViewEmbed({
  progress,
  lng,
  lat,
}: {
  progress: MotionValue<number>
  lng: number | null
  lat: number | null
}) {
  const opacity = useTransform(progress, [0.78, 0.86, 0.99, 1], [0, 1, 1, 1])
  const y = useTransform(progress, [0.78, 0.86], [80, 0])

  const src =
    GMAPS_KEY && lng != null && lat != null
      ? `https://www.google.com/maps/embed/v1/streetview?key=${GMAPS_KEY}&location=${lat},${lng}&heading=210&pitch=10&fov=80`
      : ''

  return (
    <motion.div
      style={{
        opacity, y,
        position: 'absolute', bottom: '4%', left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(560px, 56vw)', height: 'min(240px, 28vh)',
        background: '#000',
        borderRadius: 14,
        boxShadow: '0 30px 80px rgba(0,0,0,0.32)',
        overflow: 'hidden',
        zIndex: 9,
      }}
    >
      {src ? (
        <iframe
          title="Street View"
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0, width: '100%', height: '100%' }}
          allowFullScreen
        />
      ) : (
        <div style={{ height: '100%', display: 'grid', placeItems: 'center', color: '#9ca3af', fontSize: 12 }}>
          Street view loads once a suburb is selected
        </div>
      )}
    </motion.div>
  )
}
