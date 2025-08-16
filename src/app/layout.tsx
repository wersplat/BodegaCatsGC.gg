import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { NavBar } from '@/components/nav-bar'
import { SiteFooter } from '@/components/site-footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bodega Cats Gaming Club',
  description: 'Street-smart gaming, bodega-style. Building something real in the NBA 2K Pro-Am ecosystem.',
  icons: {
    icon: '/favicon.png',
  },
  keywords: ['gaming', 'esports', 'competitive', 'bodega cats', 'gaming club'],
  authors: [{ name: 'Bodega Cats Gaming Club' }],
  openGraph: {
    title: 'Bodega Cats Gaming Club',
    description: 'Street-smart gaming, bodega-style.',
    url: 'https://bodegacatsgc.gg',
    siteName: 'Bodega Cats Gaming Club',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bodega Cats Gaming Club',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bodega Cats Gaming Club',
    description: 'Street-smart gaming, bodega-style.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
