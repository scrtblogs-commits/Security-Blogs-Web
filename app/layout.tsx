import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import CustomCursor from '@/components/ui/CustomCursor'
import SmoothScrollProvider from '@/components/effects/SmoothScrollProvider'
import JsonLd from '@/components/JsonLd'
import { siteSchema } from '@/lib/schema'

export const metadata: Metadata = {
  metadataBase: new URL('https://securityblogs.com.au'),
  title: {
    default: 'SecurityBlogs — The AI Visibility Platform for Security Brands',
    template: '%s | SecurityBlogs',
  },
  description:
    'AI visibility, SEO and paid media built exclusively for the security industry. Rank #1 on Google and get cited by ChatGPT, Perplexity, Gemini and every AI answer engine.',
  keywords: [
    'security SEO',
    'AI visibility',
    'AIO',
    'AEO',
    'GEO',
    'security marketing',
    'Google Ads security',
  ],
  alternates: { canonical: '/' },
  verification: { google: '_aGSb1due9fnalv6S8xYnOXcislTQ3F95AZl2CXRwNw' },
  icons: { icon: '/compass-icon.gif', shortcut: '/compass-icon.gif' },
  openGraph: {
    title: 'SecurityBlogs — The AI Visibility Platform for Security Brands',
    description:
      'Be the answer AI gives. AI visibility, SEO and paid media for security brands.',
    url: '/',
    siteName: 'SecurityBlogs',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'SecurityBlogs — AI Visibility for Security Companies' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
}

// Google Tag Manager — container ID GTM-KS9SXB2K. The head snippet must
// be the FIRST script in <head> so any other script can rely on dataLayer
// being present. The noscript iframe must be the FIRST element in <body>
// so it fires for users who have JS disabled.
const gtmHead = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KS9SXB2K');`

const gtmNoscript = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KS9SXB2K" height="0" width="0" style="display:none;visibility:hidden"></iframe>`

// GA4 + Google Ads global site tag
const gtagHead = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-KDXV1ZB8F6');gtag('config','AW-17212338865');`

// Force light mode always — dark theme removed
const themeInit = `(function(){try{localStorage.removeItem('sg-theme');}catch(e){}document.documentElement.removeAttribute('data-theme');})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: gtmHead }} />
        {/* End Google Tag Manager */}
        {/* Google Analytics 4 + Google Ads */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-KDXV1ZB8F6" />
        <script dangerouslySetInnerHTML={{ __html: gtagHead }} />
        {/* End Google Analytics 4 + Google Ads */}
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <JsonLd data={siteSchema} />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript dangerouslySetInnerHTML={{ __html: gtmNoscript }} />
        {/* End Google Tag Manager (noscript) */}
        <SmoothScrollProvider>
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
