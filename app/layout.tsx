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
  openGraph: {
    title: 'SecurityBlogs — The AI Visibility Platform for Security Brands',
    description:
      'Be the answer AI gives. AI visibility, SEO and paid media for security brands.',
    url: '/',
    siteName: 'SecurityBlogs',
    type: 'website',
  },
  verification: {
    google: 'Raa890785NPKf-PneFnw5fMfDYIQWur4CLNb0q-wyvE',
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


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <head>
        <JsonLd data={siteSchema} />
      </head>
      <body>
        {/* Theme init — external src avoids React 19 inline-script warning */}
        <Script src="/theme-init.js" strategy="beforeInteractive" />
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
