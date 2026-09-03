'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Clock, Phone, Mail, User, Check, X, RotateCcw, Trash2, MessageSquare } from 'lucide-react'
import { Badge, Button, Card, Confirm, Empty, PageHeader, cls, timeAgo } from './ui'

export type BookingRow = { id: number; item: string; staff: string; date: string; time: string; duration: number; price: number; name: string; email: string; phone: string; note: string | null; status: string; createdAt: string }

const TABS = [
  { id: 'upcoming', label: 'À venir' },
  { id: 'past', label: 'Passés' },
  { id: 'cancelled', label: 'Annulés' },
  { id: 'all', label: 'Tous' },
] as const

const toDate = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d) }
const dayLong = (s: string) => toDate(s).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const eur = (n: number) => `${n.toLocaleString('fr-FR')} €`
const endTime = (t: string, min: number) => { const [h, m] = t.split(':').map(Number); const e = h * 60 + m + min; return `${String(Math.floor(e / 60)).padStart(2, '0')}:${String(e % 60).padStart(2, '0')}` }

export function Agenda({ bookings, today }: { bookings: BookingRow[]; today: string }) {
  const router = useRouter()
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('upcoming')
  const [busy, setBusy] = useState<number | null>(null)
  const [del, setDel] = useState<BookingRow | null>(null)

  const filtered = useMemo(() => {
    const sorted = [...bookings].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    if (tab === 'upcoming') return sorted.filter((b) => b.status === 'confirmed' && b.date >= today)
    if (tab === 'past') return sorted.filter((b) => b.status === 'done' || (b.status === 'confirmed' && b.date < today)).reverse()
    if (tab === 'cancelled') return sorted.filter((b) => b.status === 'cancelled').reverse()
    return sorted
  }, [bookings, tab, today])

  const groups = useMemo(() => {
    const map = new Map<string, BookingRow[]>()
    for (const b of filtered) { if (!map.has(b.date)) map.set(b.date, []); map.get(b.date)!.push(b) }
    return Array.from(map.entries())
  }, [filtered])

  const todays = bookings.filter((b) => b.status === 'confirmed' && b.date === today)
  const revenueToday = todays.reduce((s, b) => s + b.price, 0)

  async function setStatus(b: BookingRow, status: 'confirmed' | 'done' | 'cancelled') {
    setBusy(b.id)
    try {
      const res = await fetch(`/api/admin/bookings/${b.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
      if (!res.ok) throw new Error()
      toast.success(status === 'done' ? 'Rendez-vous marqué honoré' : status === 'cancelled' ? 'Rendez-vous annulé — le créneau est libéré sur le site' : 'Rendez-vous rétabli')
      router.refresh()
    } catch {
      toast.error('Action impossible')
    } finally {
      setBusy(null)
    }
  }
  async function remove() {
    if (!del) return
    setBusy(del.id)
    try {
      const res = await fetch(`/api/admin/bookings/${del.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('Rendez-vous supprimé')
      setDel(null)
      router.refresh()
    } catch {
      toast.error('Suppression impossible')
    } finally {
      setBusy(null)
    }
  }

  return (
    <section>
      <PageHeader title="Réservations" description="Chaque rendez-vous pris en ligne arrive ici, avec la praticienne, le créneau et les coordonnées. Testez depuis le site : le créneau réservé disparaît aussitôt du module de réservation." />

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <Card className="p-4"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Aujourd’hui</p><p className="mt-1 font-display text-3xl text-slate-900">{todays.length} <span className="text-base text-slate-500">rendez-vous</span></p></Card>
        <Card className="p-4"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Chiffre d’affaires du jour</p><p className="mt-1 font-display text-3xl text-slate-900">{eur(revenueToday)}</p></Card>
        <Card className="p-4"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">À venir</p><p className="mt-1 font-display text-3xl text-slate-900">{bookings.filter((b) => b.status === 'confirmed' && b.date >= today).length} <span className="text-base text-slate-500">confirmés</span></p></Card>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={cls('rounded-full border px-4 py-2 text-sm font-semibold transition-colors', tab === t.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-600 hover:border-slate-500')}>{t.label}</button>
        ))}
      </div>

      {groups.length === 0 ? (
        <Empty title="Aucun rendez-vous ici" text="Réservez un soin depuis le site pour le voir apparaître." />
      ) : (
        <div className="space-y-6">
          {groups.map(([date, list]) => (
            <div key={date}>
              <h3 className={cls('mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]', date === today ? 'text-[var(--a-deep)]' : 'text-slate-500')}>
                {cap(dayLong(date))} {date === today && <Badge tone="accent">aujourd’hui</Badge>}
                <span className="font-normal normal-case tracking-normal text-slate-400">· {list.length} rendez-vous</span>
              </h3>
              <Card className="divide-y divide-slate-100">
                {list.map((b) => (
                  <div key={b.id} className={cls('grid gap-3 px-4 py-3 sm:grid-cols-[92px_1fr_auto] sm:items-center', busy === b.id && 'opacity-50', b.status === 'cancelled' && 'opacity-60')}>
                    <div>
                      <p className="font-display text-2xl text-slate-900">{b.time.replace(':', 'h')}</p>
                      <p className="text-xs text-slate-500">→ {endTime(b.time, b.duration).replace(':', 'h')} · {b.duration} min</p>
                    </div>
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-2">
                        <span className={cls('font-semibold text-slate-900', b.status === 'cancelled' && 'line-through')}>{b.item}</span>
                        <Badge tone={b.status === 'confirmed' ? 'green' : b.status === 'done' ? 'blue' : 'red'}>{b.status === 'confirmed' ? 'confirmé' : b.status === 'done' ? 'honoré' : 'annulé'}</Badge>
                        <span className="text-sm text-slate-500">{eur(b.price)}</span>
                      </p>
                      <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-1.5"><User size={14} className="text-[var(--a-deep)]" /> {b.name}</span>
                        <span className="inline-flex items-center gap-1.5"><Clock size={14} className="text-[var(--a-deep)]" /> {b.staff}</span>
                        <a href={`tel:${b.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 hover:underline"><Phone size={14} className="text-[var(--a-deep)]" /> {b.phone}</a>
                        <a href={`mailto:${b.email}`} className="inline-flex items-center gap-1.5 hover:underline"><Mail size={14} className="text-[var(--a-deep)]" /> {b.email}</a>
                      </p>
                      {b.note && <p className="mt-1.5 inline-flex items-start gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-sm text-slate-700"><MessageSquare size={14} className="mt-0.5 shrink-0 text-slate-400" /> {b.note}</p>}
                      <p className="mt-1 text-xs text-slate-400">réservé {timeAgo(b.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-1 sm:justify-end">
                      {b.status === 'confirmed' && (
                        <>
                          <Button size="sm" variant="primary" onClick={() => setStatus(b, 'done')} title="Marquer honoré"><Check size={15} /> Honoré</Button>
                          <Button size="sm" onClick={() => setStatus(b, 'cancelled')} title="Annuler"><X size={15} /></Button>
                        </>
                      )}
                      {b.status !== 'confirmed' && <Button size="sm" onClick={() => setStatus(b, 'confirmed')}><RotateCcw size={15} /> Rétablir</Button>}
                      <Button size="sm" variant="ghost" onClick={() => setDel(b)} aria-label="Supprimer"><Trash2 size={15} /></Button>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          ))}
        </div>
      )}
      <Confirm open={del !== null} title="Supprimer ce rendez-vous ?" text="Il disparaît définitivement de l’agenda." onConfirm={remove} onCancel={() => setDel(null)} loading={busy !== null} />
    </section>
  )
}
