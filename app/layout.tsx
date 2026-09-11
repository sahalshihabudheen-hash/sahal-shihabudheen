import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sahal Shihabudheen — Developer & Innovator',
  description:
    'Passionate developer, innovator, and technology enthusiast who loves turning ideas into real-world AI, web, IoT, and automation projects.',
  keywords: ['Sahal Shihabudheen', 'developer', 'AI engineer', 'portfolio', 'NYRA', 'SAI'],
  authors: [{ name: 'Sahal Shihabudheen' }],
  openGraph: {
    title: 'Sahal Shihabudheen — Developer & Innovator',
    description: 'Building the future one project at a time.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="noise">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
