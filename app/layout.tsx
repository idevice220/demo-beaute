import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const display = Cormorant_Garamond({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})
const sans = Jost({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'L’Écrin — Institut de beauté au Raincy (93)',
  description:
    'Soins visage, épilation, manucure et massages dans un cocon de douceur au Raincy. Site de démonstration NEX-WEB.',
  metadataBase: new URL('https://demo-beaute.nex-web.fr'),
  openGraph: {
    title: 'L’Écrin — Institut de beauté au Raincy (93)',
    description:
      'Soins visage, épilation, manucure et massages dans un cocon de douceur. Site de démonstration NEX-WEB.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://demo-beaute.nex-web.fr',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: false, follow: false }, // démo : pas d'indexation
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
