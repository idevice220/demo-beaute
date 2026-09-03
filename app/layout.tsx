import type { Metadata, Viewport } from 'next'
import { Fraunces, Jost } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const display = Fraunces({ weight: ['300', '400', '500', '600'], style: ['normal', 'italic'], subsets: ['latin'], variable: '--font-display', display: 'swap' })
const sans = Jost({ weight: ['300', '400', '500', '600'], subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const metadata: Metadata = {
  title: 'L’Écrin — Institut de beauté au Raincy (93) · Réservation en ligne',
  description:
    'Soins visage, massages, épilation, manucure et regard dans un cocon au Raincy. Réservez en ligne en 30 secondes, offrez une carte cadeau. Site de démonstration NEX-WEB.',
  metadataBase: new URL('https://demo-beaute.nex-web.fr'),
  openGraph: {
    title: 'L’Écrin — Institut de beauté au Raincy (93)',
    description: 'Soins visage, massages, épilation, manucure. Réservation en ligne, cartes cadeaux. Site de démonstration NEX-WEB.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://demo-beaute.nex-web.fr',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: false, follow: false }, // démo : pas d'indexation
}

export const viewport: Viewport = { themeColor: '#FBF8F3' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <div className="relative z-10">{children}</div>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: { background: '#2E3F36', color: '#FBF8F3', borderRadius: 14, fontSize: 14, maxWidth: 440 },
            success: { iconTheme: { primary: '#C4715A', secondary: '#FBF8F3' } },
          }}
        />
      </body>
    </html>
  )
}
