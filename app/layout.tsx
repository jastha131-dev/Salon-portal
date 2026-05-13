import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Lumière Beauty Salon | Luxury Beauty & Wellness Dubai',
    template: '%s | Lumière Beauty Salon',
  },
  description:
    'Premium beauty salon in Dubai Marina. Expert hair, nails, makeup, spa treatments & home services. Where luxury meets artistry.',
  keywords: [
    'beauty salon Dubai',
    'luxury beauty',
    'hair salon Dubai Marina',
    'nail art Dubai',
    'makeup artist Dubai',
    'spa Dubai',
    'home beauty service Dubai',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: 'Lumière Beauty Salon',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-warm-white text-charcoal">
        {children}
      </body>
    </html>
  )
}
