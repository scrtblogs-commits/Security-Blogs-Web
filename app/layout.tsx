import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import CustomCursor from '@/components/ui/CustomCursor'
import SiteBackground from '@/components/ui/SiteBackground'
import JsonLd from '@/components/JsonLd'
import { siteSchema } from '@/lib/schema'

export const metadata: Metadata = {
  metadataBase: new URL('https://securityblogs.com.au'),
  title: {
    default: 'Security Blogs Australia | SEO, AEO & AI Visibility for Security Companies',
    template: '%s | SecurityBlogs Australia',
  },
  description:
    'Security Blogs Australia helps security companies grow with SEO, AEO, GEO, AI Visibility, Guest Posting and Digital Marketing services.',
  keywords: [
    'Security Blogs',
    'Security Blogs Australia',
    'security SEO',
    'SEO for security companies',
    'AI visibility',
    'AIO',
    'AEO services',
    'GEO services',
    'security guest posting',
    'security digital marketing',
    'Google Ads security',
    'AI visibility for security brands',
  ],
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon.ico',    sizes: 'any',        type: 'image/x-icon' },
      { url: '/favicon-32.png', sizes: '32x32',      type: 'image/png' },
      { url: '/icon-192.png',   sizes: '192x192',    type: 'image/png' },
      { url: '/icon-512.png',   sizes: '512x512',    type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180',    type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Security Blogs Australia | SEO, AEO & AI Visibility for Security Companies',
    description:
      'Security Blogs Australia helps security companies grow with SEO, AEO, GEO, AI Visibility, Guest Posting and Digital Marketing services.',
    url: '/',
    siteName: 'SecurityBlogs Australia',
    type: 'website',
    locale: 'en_AU',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'SecurityBlogs Australia',
      },
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'SecurityBlogs Australia — AI Visibility & SEO for Security Companies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@securityblogs',
    creator: '@securityblogs',
    title: 'Security Blogs Australia | SEO, AEO & AI Visibility for Security Companies',
    description:
      'Security Blogs Australia helps security companies grow with SEO, AEO, GEO, AI Visibility, Guest Posting and Digital Marketing services.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    google: 'Raa890785NPKf-PneFnw5fMfDYIQWur4CLNb0q-wyvE',
  },
}

// Google Tag Manager — container ID GTM-KS9SXB2K.
const gtmHead = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KS9SXB2K');`

const gtmNoscript = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KS9SXB2K" height="0" width="0" style="display:none;visibility:hidden"></iframe>`

// Inline theme-init: reads localStorage/prefers-color-scheme synchronously before
// first paint. Inlined so no network round-trip is needed and FOUC is impossible.
const themeInit = `(function(){try{var t=localStorage.getItem('sg-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1e5fe0" />
        <JsonLd data={siteSchema} />
        {/*
          dangerouslySetInnerHTML on a <script> inside <head> is the only way to get
          a synchronous theme-init in React 19 App Router without the "Script tag"
          console warning. React 19 warns about <script> elements rendered by
          next/script (even with strategy="beforeInteractive") because it sees the
          component in the reconciler. A raw <script dangerouslySetInnerHTML> placed
          directly inside <head> JSX is treated as a head resource and does not warn.
        */}
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: gtmHead }} />
        <noscript dangerouslySetInnerHTML={{ __html: gtmNoscript }} />
        {/* End Google Tag Manager */}
        <SiteBackground />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
