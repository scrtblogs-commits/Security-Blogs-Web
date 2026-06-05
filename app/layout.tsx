import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import CustomCursor from '@/components/ui/CustomCursor'
import SiteBackground from '@/components/ui/SiteBackground'

export const metadata: Metadata = {
  metadataBase: new URL('https://securityblogs.com.au'),
  title: {
    default: 'SecurityGrowth — The AI Visibility Platform for Security Brands',
    template: '%s | SecurityGrowth',
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
  openGraph: {
    title: 'SecurityGrowth — The AI Visibility Platform for Security Brands',
    description:
      'Be the answer AI gives. AI visibility, SEO and paid media for security brands.',
    url: 'https://securityblogs.com.au',
    siteName: 'SecurityGrowth',
    type: 'website',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

const themeInit = `(function(){try{var t=localStorage.getItem('sg-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
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
