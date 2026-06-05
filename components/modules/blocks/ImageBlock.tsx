import type { CmsMedia } from '@/lib/cmsTypes'

type Props = {
  image: CmsMedia | string
  caption?: string
  size?: 'narrow' | 'wide' | 'full'
}

export default function ImageBlock({ image, caption, size = 'wide' }: Props) {
  const url = typeof image === 'string' ? image : image?.url
  const alt = typeof image === 'string' ? (caption ?? '') : (image?.alt ?? caption ?? '')
  if (!url) return null

  const maxWidth = size === 'narrow' ? 640 : size === 'wide' ? 'var(--container-width, 1200px)' : '100%'

  return (
    <figure className={`section image-block image-${size}`} style={{ margin: '32px auto', maxWidth, padding: size === 'full' ? 0 : '0 24px' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={alt} style={{ width: '100%', height: 'auto', borderRadius: size === 'full' ? 0 : 12 }} />
      {caption && (
        <figcaption style={{ marginTop: 8, fontSize: 13.5, color: 'var(--text-soft)', textAlign: 'center' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
