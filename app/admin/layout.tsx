import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Espace propriétaire — L’Écrin (démo)',
  robots: { index: false, follow: false },
}

/** Couleurs de l'espace propriétaire : terracotta sur vert forêt (charte du site). */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin min-h-screen" style={{ ['--a' as string]: '#C4715A', ['--a-hover' as string]: '#A65A46', ['--a-ink' as string]: '#FBF8F3', ['--a-deep' as string]: '#A65A46', ['--dark' as string]: '#2E3F36' }}>
      {children}
    </div>
  )
}
