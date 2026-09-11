import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://sahal-shihabudheen.vercel.app'),
  title: {
    default: 'Sahal Shihabudheen | AI Engineer & Developer Portfolio',
    template: '%s | Sahal Shihabudheen',
  },
  description:
    'Official portfolio of Sahal Shihabudheen, an AI Engineer, Innovator, and Developer from Kerala. Creator of SAI, NYRA Music, Movie Hub, Discord Bots, and IoT projects.',
  keywords: [
    'Sahal Shihabudheen',
    'Sahal',
    'AI Engineer Kerala',
    'Developer Portfolio',
    'NYRA Music',
    'SAI Smart Assistant',
    'Full Stack Developer',
    'IoT ESP32',
    'Python Developer',
  ],
  authors: [{ name: 'Sahal Shihabudheen', url: 'https://github.com/sahalshihabudheen-hash' }],
  creator: 'Sahal Shihabudheen',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sahal-shihabudheen.vercel.app',
    title: 'Sahal Shihabudheen | AI Engineer & Developer Portfolio',
    description:
      'Passionate developer & innovator turning ideas into real-world AI, Web, and IoT systems.',
    siteName: 'Sahal Shihabudheen Portfolio',
    images: [
      {
        url: '/images/main-pic.jpg',
        width: 800,
        height: 800,
        alt: 'Sahal Shihabudheen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sahal Shihabudheen | AI Engineer & Developer',
    description:
      'Passionate developer & innovator turning ideas into real-world AI, Web, and IoT systems.',
    images: ['/images/main-pic.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sahal Shihabudheen',
    jobTitle: 'AI Engineer & Software Developer',
    url: 'https://sahal-shihabudheen.vercel.app',
    image: 'https://sahal-shihabudheen.vercel.app/images/main-pic.jpg',
    sameAs: [
      'https://github.com/sahalshihabudheen-hash',
      'https://nyra-music-player.vercel.app',
      'https://jarvis-hub-eight.vercel.app/',
    ],
    knowsAbout: ['Artificial Intelligence', 'Web Development', 'IoT', 'Python', 'Next.js', 'Robotics'],
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="noise">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
