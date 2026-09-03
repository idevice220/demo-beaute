import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ensureFresh, RESET_MINUTES } from '@/lib/demo'
import { AdminShell, type NavItem } from '@/components/admin/AdminShell'

export const dynamic = 'force-dynamic'

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/admin/login')
  const { lastReset } = await ensureFresh()
  const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' })).toISOString().slice(0, 10)
  const [upcoming, newGifts] = await Promise.all([
    prisma.booking.count({ where: { status: 'confirmed', date: { gte: today } } }),
    prisma.giftOrder.count({ where: { status: 'new' } }),
  ])

  const nav: NavItem[] = [
    { href: '/admin', label: 'Tableau de bord', icon: 'LayoutDashboard', exact: true },
    { href: '/admin/reservations', label: 'Réservations', icon: 'CalendarCheck', count: upcoming },
    { href: '/admin/cadeaux', label: 'Cartes cadeaux', icon: 'Gift', count: newGifts },
    { href: '/admin/newsletter', label: 'Newsletter', icon: 'Mail' },
    { href: '/admin/carte', label: 'La carte des soins', icon: 'Scissors', section: 'Contenu' },
    { href: '/admin/rituels', label: 'Rituels signature', icon: 'Sparkle', section: 'Contenu' },
    { href: '/admin/equipe', label: 'L’équipe', icon: 'Users', section: 'Contenu' },
    { href: '/admin/galerie', label: 'Galerie', icon: 'Images', section: 'Contenu' },
    { href: '/admin/avis', label: 'Avis clientes', icon: 'Star', section: 'Contenu' },
    { href: '/admin/faq', label: 'Questions fréquentes', icon: 'HelpCircle', section: 'Contenu' },
    { href: '/admin/horaires', label: 'Horaires', icon: 'Clock', section: 'Institut' },
    { href: '/admin/photos', label: 'Photos', icon: 'Image', section: 'Institut' },
    { href: '/admin/reglages', label: 'Réglages & textes', icon: 'Settings', section: 'Institut' },
  ]
  const resetAt = new Date(lastReset.getTime() + RESET_MINUTES * 60_000).toISOString()

  return (
    <AdminShell brand={{ name: 'L’Écrin', sub: 'Espace propriétaire', initial: 'É' }} nav={nav} email={session.email} resetAt={resetAt}>
      {children}
    </AdminShell>
  )
}
