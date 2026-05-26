import type { Metadata } from 'next'
import RedirectClient from '@/components/RedirectClient'

const TARGET = '/services/geo/'

export const metadata: Metadata = {
  title: 'Redirecting…',
  alternates: { canonical: TARGET },
  robots: { index: false, follow: true },
}

export default function Page() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${TARGET}`} />
      <RedirectClient target={TARGET} />
      <main style={{ padding: '120px 20px', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <p style={{ fontSize: 18 }}>
          Redirecting to <a href={TARGET}>{TARGET}</a>…
        </p>
      </main>
    </>
  )
}