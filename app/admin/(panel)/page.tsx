import Link from 'next/link'
import { CalendarCheck, Gift, Mail, Star, Clock, ArrowRight, Scissors, Users, Sparkle, Smartphone, Euro } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { getSettings, toSite } from '@/lib/settings'
import { requireSession } from '@/lib/auth'
import { getStatus, parisNow } from '@/lib/hours'
import { Card, Badge } from '@/components/admin/ui'

export const dynamic = 'force-dynamic'

const toDate = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d) }

export default async function DashboardPage() {
  const { tenant } = await requireSession()
  const now = parisNow()
  const today = now.toISOString().slice(0, 10)
  const week = new Date(now); week.setDate(week.getDate() + 7)
  const weekStr = week.toISOString().slice(0, 10)
  const [settings, todays, upcomingWeek, newGifts, subscribers, soins, reviews, next] = await Promise.all([
    getSettings(tenant),
    prisma.booking.findMany({ where: { tenant,  status: 'confirmed', date: today } }),
    prisma.booking.findMany({ where: { tenant,  status: 'confirmed', date: { gte: today, lte: weekStr } } }),
    prisma.giftOrder.count({ where: { tenant,  status: 'new' } }),
    prisma.subscriber.count({ where: { tenant } }),
    prisma.soin.count({ where: { tenant,  visible: true } }),
    prisma.review.count({ where: { tenant,  visible: true } }),
    prisma.booking.findMany({ where: { tenant,  status: 'confirmed', date: { gte: today } }, orderBy: [{ date: 'asc' }, { time: 'asc' }], take: 6 }),
  ])
  const site = toSite(settings)
  const status = getStatus(site.hours, now)
  const revenueWeek = upcomingWeek.reduce((s, b) => s + b.price, 0)

  const kpis = [
    { label: 'Rendez-vous aujourd’hui', value: todays.length, sub: todays.length ? `prochain à ${todays.map((b) => b.time).sort()[0].replace(':', 'h')}` : 'journée libre', icon: CalendarCheck, href: '/admin/reservations', hot: todays.length > 0 },
    { label: 'Prévu sur 7 jours', value: `${revenueWeek.toLocaleString('fr-FR')} €`, sub: `${upcomingWeek.length} rendez-vous confirmés`, icon: Euro, href: '/admin/reservations' },
    { label: 'Cartes cadeaux à envoyer', value: newGifts, sub: `${subscribers} abonnés à la newsletter`, icon: Gift, href: '/admin/cadeaux', hot: newGifts > 0 },
    { label: 'En ce moment', value: status.open ? 'Ouvert' : 'Fermé', sub: status.label, icon: Clock, href: '/admin/horaires' },
  ]
  const quick = [
    { href: '/admin/carte', label: 'Changer un prix', text: 'La carte des soins, en ligne à la seconde.', icon: Scissors },
    { href: '/admin/rituels', label: 'Mettre en avant un rituel', text: 'Prix barré, composition, photo.', icon: Sparkle },
    { href: '/admin/equipe', label: 'Ajouter une praticienne', text: 'Elle devient réservable immédiatement.', icon: Users },
    { href: '/admin/horaires', label: 'Fermer un jour', text: 'Congés, jour férié : le site le dit.', icon: Clock },
  ]

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--a-deep)]">Bonjour Camille</p>
        <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-wide text-slate-900">Tableau de bord</h1>
        <p className="mt-1 text-[15px] text-slate-500">Votre site prend les rendez-vous pendant que vous êtes en cabine. Voici où vous en êtes.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon
          return (
            <Link key={k.label} href={k.href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">{k.label}</span>
                <span className={`grid h-9 w-9 place-items-center rounded-xl ${k.hot ? 'bg-[var(--a)] text-[var(--a-ink)]' : 'bg-slate-100 text-slate-600'}`}><Icon size={18} /></span>
              </div>
              <p className="mt-3 font-display text-4xl text-slate-900">{k.value}</p>
              <p className="mt-1 truncate text-xs text-slate-500">{k.sub}</p>
            </Link>
          )
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-slate-900">Prochains rendez-vous</h2>
            <Link href="/admin/reservations" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--a-deep)] hover:underline">Tout l’agenda <ArrowRight size={14} /></Link>
          </div>
          <ul className="mt-3 divide-y divide-slate-100">
            {next.map((b) => (
              <li key={b.id} className="flex items-center gap-4 py-3">
                <div className="w-24 shrink-0">
                  <p className="text-xs uppercase tracking-wider text-slate-500">{b.date === today ? 'Aujourd’hui' : toDate(b.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                  <p className="font-display text-xl text-slate-900">{b.time.replace(':', 'h')}</p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-800">{b.item}</p>
                  <p className="truncate text-xs text-slate-500">{b.name} · avec {b.staff}</p>
                </div>
                <Badge tone="green">{b.price.toLocaleString('fr-FR')} €</Badge>
              </li>
            ))}
            {next.length === 0 && <li className="py-6 text-center text-sm text-slate-500">Aucun rendez-vous à venir.</li>}
          </ul>
        </Card>

        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-slate-900">Actions rapides</h2>
            <ul className="mt-3 space-y-2">
              {quick.map((q) => {
                const Icon = q.icon
                return (
                  <li key={q.href}>
                    <Link href={q.href} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-3 transition-colors hover:border-[var(--a)] hover:bg-[var(--a)]/5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-700"><Icon size={17} /></span>
                      <span className="min-w-0 flex-1"><span className="block font-semibold text-slate-800">{q.label}</span><span className="block truncate text-xs text-slate-500">{q.text}</span></span>
                      <ArrowRight size={16} className="text-slate-400" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Card>
          <div className="rounded-2xl bg-[var(--dark)] p-5 text-white shadow-sm">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--a)]"><Smartphone size={14} /> Pensé pour le téléphone</p>
            <p className="mt-2 text-[15px] leading-relaxed text-white/85">Un rendez-vous annulé entre deux clientes, un prix ajusté le soir : tout se fait depuis le téléphone, sans appeler personne.</p>
            <p className="mt-3 text-sm text-white/60">{soins} soins réservables · {reviews} avis en ligne · <Star size={12} className="inline text-[var(--a)]" /> {site.rating.toLocaleString('fr-FR')} ({site.reviewsCount} avis)</p>
            <Link href="/admin/newsletter" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--a)] px-4 py-2 text-sm font-semibold text-[var(--a-ink)]"><Mail size={15} /> Voir les abonnés</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
