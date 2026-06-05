'use client'
import { useEffect, useRef } from 'react'

// ─────────────────────────────────────────────────────────────────────
// Cloudflare Turnstile widget — drop-in spam protection for any form.
//
// Usage (inside any <form> element):
//   <Turnstile />
//
// The widget renders into a managed <div>, fetches the Turnstile JS
// once, and on solve writes the token into a hidden input named
// `cf-turnstile-response` so FormData picks it up.
//
// If NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset (local dev without a
// Cloudflare account configured), the widget renders nothing and the
// /api/leads endpoint skips verification — see TURNSTILE_SECRET_KEY
// note in app/api/leads/route.ts.
//
// We deliberately load turnstile.js as a one-time inert side effect
// (cached by the browser; subsequent forms reuse the same script tag)
// instead of via next/script, because next/script wants to live in a
// <Layout> rather than inside a form.
// ─────────────────────────────────────────────────────────────────────

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: {
        sitekey: string
        callback?: (token: string) => void
        'error-callback'?: () => void
        'expired-callback'?: () => void
        theme?: 'light' | 'dark' | 'auto'
        size?: 'normal' | 'compact'
      }) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
    }
    __turnstileLoaderPromise?: Promise<void>
  }
}

function loadTurnstile(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.turnstile) return Promise.resolve()
  if (window.__turnstileLoaderPromise) return window.__turnstileLoaderPromise
  window.__turnstileLoaderPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement('script')
    s.src = SCRIPT_SRC
    s.async = true
    s.defer = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Failed to load Turnstile'))
    document.head.appendChild(s)
  })
  return window.__turnstileLoaderPromise
}

type Props = {
  theme?: 'light' | 'dark' | 'auto'
  size?: 'normal' | 'compact'
}

export default function Turnstile({ theme = 'auto', size = 'normal' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (!SITE_KEY || !ref.current) return
    let cancelled = false
    loadTurnstile()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return
        widgetIdRef.current = window.turnstile.render(ref.current, {
          sitekey: SITE_KEY,
          theme,
          size,
          callback: () => { /* token is auto-written into the input below */ },
        })
      })
      .catch((err) => console.error('[Turnstile]', err))
    return () => {
      cancelled = true
      try {
        if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current)
      } catch {}
    }
  }, [theme, size])

  // No site key configured = local dev. Render nothing so the form
  // still submits (the server-side endpoint skips verification when its
  // secret is unset — see app/api/leads/route.ts).
  if (!SITE_KEY) return null

  return (
    <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-start' }}>
      <div ref={ref} />
    </div>
  )
}
