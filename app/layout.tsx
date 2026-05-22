import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'SecurityGrowth — Be the answer AI gives',
  description:
    'AI visibility, SEO, and paid media for security brands. Rank #1, get cited by ChatGPT, Perplexity & every AI answer engine, and convert high-intent buyers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
