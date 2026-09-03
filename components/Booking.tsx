'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { X, ArrowLeft, ArrowRight, Check, CalendarPlus, Clock, Sparkles, User } from 'lucide-react'
import { CATEGORIES, SOINS, RITUELS, TEAM, BUSINESS, type Category } from '@/lib/data'
import { bookableDays, slotsFor, dayLabel, dayLong } from '@/lib/hours'
import type { BookingDetail } from './BookButton'

type Item = { id: string; name: string; min: number; price: number; cat: Category | 'Rituels'; desc?: string }
const ALL: Item[] = [...SOINS.map((s) => ({ ...s })), ...RITUELS.map((r) => ({ id: r.id, name: r.name, min: r.min, price: r.price, cat: 'Rituels' as const, desc: r.items.join(' · ') }))]
const TABS: (Category | 'Rituels')[] = [...CATEGORIES.map((c) => c.id), 'Rituels']
const STEPS = ['Soin', 'Praticienne', 'Créneau', 'Coordonnées']
const NONE = 'Sans préférence'

const fmtH = (h: number) => `${Math.floor(h)}h${Math.round((h % 1) * 60) ? String(Math.round((h % 1) * 60)).padStart(2, '0') : ''}`
const pad = (n: number) => String(n).padStart(2, '0')

function icsLink(day: Date, h: number, item: Item) {
  const start = new Date(day)
  start.setHours(Math.floor(h), Math.round((h % 1) * 60), 0, 0)
  const end = new Date(start.getTime() + item.min * 60_000)
  const f = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`
  const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//L’Écrin//FR', 'BEGIN:VEVENT', `UID:${start.getTime()}@lecrin`, `DTSTAMP:${f(new Date())}`, `DTSTART:${f(start)}`, `DTEND:${f(end)}`, `SUMMARY:L’Écrin — ${item.name}`, `LOCATION:${BUSINESS.address}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n')
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(body)
}

export function Booking() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [cat, setCat] = useState<Category | 'Rituels'>('Visage')
  const [item, setItem] = useState<Item | null>(null)
  const [staff, setStaff] = useState(NONE)
  const [day, setDay] = useState<Date | null>(null)
  const [slot, setSlot] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', note: '' })
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)
  const [days, setDays] = useState<Date[]>([])

  const reset = useCallback(() => {
    setStep(0); setItem(null); setStaff(NONE); setDay(null); setSlot(null); setDone(false); setSending(false)
    setForm({ name: '', email: '', phone: '', note: '' })
  }, [])

  useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent<BookingDetail>).detail || {}
      reset()
      setDays(bookableDays())
      if (d.soinId) {
        const it = ALL.find((x) => x.id === d.soinId)
        if (it) { setItem(it); setCat(it.cat); setStep(1) }
      }
      if (d.staff) setStaff(d.staff)
      setOpen(true)
    }
    window.addEventListener('open-booking', onOpen)
    if (window.location.hash === '#reserver') { setDays(bookableDays()); setOpen(true) }
    return () => window.removeEventListener('open-booking', onOpen)
  }, [reset])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  const list = ALL.filter((x) => x.cat === cat)
  const slots = useMemo(() => (day && item ? slotsFor(day, item.min) : []), [day, item])
  const emailOk = /\S+@\S+\.\S+/.test(form.email)
  const canNext = step === 0 ? !!item : step === 1 ? true : step === 2 ? day !== null && slot !== null : form.name.trim().length > 1 && emailOk && form.phone.replace(/\D/g, '').length >= 9

  async function confirm() {
    setSending(true)
    await new Promise((r) => setTimeout(r, 900))
    setSending(false)
    setDone(true)
    toast.success('Rendez-vous confirmé, e-mail récapitulatif envoyé. (démo : aucune réservation réelle)')
  }

  if (!open) return null
  const firstName = form.name.trim().split(' ')[0]

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-4" onClick={() => setOpen(false)}>
      <div role="dialog" aria-modal="true" aria-label="Réserver un soin" onClick={(e) => e.stopPropagation()} className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-cream shadow-lift sm:rounded-3xl">
        {/* en-tête */}
        <div className="flex items-center justify-between gap-4 border-b hairline px-5 py-4 sm:px-7">
          <div>
            <p className="eyebrow text-terra">Réservation en ligne</p>
            <p className="font-display text-2xl text-ink">{done ? 'C’est noté !' : STEPS[step]}</p>
          </div>
          {!done && (
            <ol className="hidden items-center gap-2 sm:flex" aria-label="Étapes">
              {STEPS.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-medium ${i < step ? 'bg-sage text-cream' : i === step ? 'bg-forest text-cream' : 'bg-sand-2 text-muted'}`}>{i < step ? <Check size={14} /> : i + 1}</span>
                  {i < STEPS.length - 1 && <span className="h-px w-5 bg-sand-2" />}
                </li>
              ))}
            </ol>
          )}
          <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border hairline hover:border-terra hover:text-terra" aria-label="Fermer"><X size={18} /></button>
        </div>

        {/* corps */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
          {done && item && day && slot !== null ? (
            <div className="flex flex-col items-center py-6 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-sage text-cream"><Check size={30} strokeWidth={2.5} /></span>
              <h3 className="mt-5 font-display text-4xl text-ink">À bientôt{firstName ? `, ${firstName}` : ''}.</h3>
              <p className="mt-2 max-w-sm text-muted">Votre rendez-vous est confirmé. Un e-mail récapitulatif et un rappel la veille vous sont envoyés.</p>
              <div className="mt-6 w-full max-w-sm rounded-2xl border hairline bg-sand p-5 text-left">
                <p className="font-display text-2xl">{item.name}</p>
                <p className="mt-1 text-sm text-muted">{staff === NONE ? 'Praticienne au choix de l’institut' : `avec ${staff}`}</p>
                <p className="mt-3 flex items-center gap-2 text-sm"><Clock size={14} className="text-terra" /> {dayLong(day)} à {fmtH(slot)} · {item.min} min</p>
                <p className="mt-1 text-sm">{BUSINESS.address}</p>
                <p className="mt-3 font-display text-2xl">{item.price}&nbsp;€ <span className="text-sm text-muted">réglés sur place</span></p>
              </div>
              <a href={icsLink(day, slot, item)} download="rendez-vous-lecrin.ics" className="mt-5 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-medium text-cream hover:bg-terra"><CalendarPlus size={16} /> Ajouter à mon agenda</a>
              <button onClick={() => setOpen(false)} className="mt-3 text-sm text-muted underline-offset-4 hover:underline">Fermer</button>
            </div>
          ) : step === 0 ? (
            <>
              <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-3">
                {TABS.map((t) => (
                  <button key={t} onClick={() => setCat(t)} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium ${cat === t ? 'border-forest bg-forest text-cream' : 'hairline text-ink hover:border-terra'}`}>{t}</button>
                ))}
              </div>
              <ul className="divide-y hairline">
                {list.map((s) => {
                  const on = item?.id === s.id
                  return (
                    <li key={s.id}>
                      <button onClick={() => setItem(s)} className={`flex w-full items-center gap-4 px-2 py-3.5 text-left transition-colors ${on ? 'bg-terra-tint/60' : 'hover:bg-sand'}`}>
                        <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${on ? 'border-forest bg-forest text-cream' : 'border-sand-2'}`}>{on && <Check size={13} strokeWidth={3} />}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-xl text-ink">{s.name}</span>
                          {s.desc && <span className="block truncate text-sm text-muted">{s.desc}</span>}
                        </span>
                        <span className="shrink-0 text-right">
                          <span className="block font-display text-xl">{s.price}&nbsp;€</span>
                          <span className="block text-xs text-muted">{s.min} min</span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </>
          ) : step === 1 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <button onClick={() => setStaff(NONE)} className={`flex items-center gap-4 rounded-2xl border p-4 text-left ${staff === NONE ? 'border-forest bg-terra-tint/50' : 'hairline hover:border-terra'}`}>
                <span className="grid h-14 w-14 place-items-center rounded-full bg-sand-2 text-muted"><User size={22} /></span>
                <span><span className="block font-display text-xl">Sans préférence</span><span className="block text-sm text-muted">Le premier créneau disponible</span></span>
              </button>
              {TEAM.map((t) => (
                <button key={t.name} onClick={() => setStaff(t.name)} className={`flex items-center gap-4 rounded-2xl border p-4 text-left ${staff === t.name ? 'border-forest bg-terra-tint/50' : 'hairline hover:border-terra'}`}>
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-sand-2"><Image src={t.image} alt="" fill sizes="56px" className="object-cover" /></span>
                  <span><span className="block font-display text-xl">{t.name}</span><span className="block text-sm text-muted">{t.spec}</span></span>
                </button>
              ))}
            </div>
          ) : step === 2 ? (
            <>
              <p className="eyebrow text-muted">Choisissez un jour</p>
              <div className="no-scrollbar -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-3">
                {days.map((d) => {
                  const on = day?.getTime() === d.getTime()
                  return (
                    <button key={d.toISOString()} onClick={() => { setDay(d); setSlot(null) }} className={`shrink-0 rounded-2xl border px-4 py-2.5 text-center ${on ? 'border-forest bg-forest text-cream' : 'hairline hover:border-terra'}`}>
                      <span className="block text-[11px] uppercase tracking-wider opacity-70">{d.toLocaleDateString('fr-FR', { weekday: 'short' })}</span>
                      <span className="block font-display text-2xl leading-none">{d.getDate()}</span>
                      <span className="block text-[11px] opacity-70">{d.toLocaleDateString('fr-FR', { month: 'short' })}</span>
                    </button>
                  )
                })}
              </div>
              {day ? (
                <>
                  <p className="eyebrow mt-4 text-muted">{dayLong(day)} · {item?.min} min</p>
                  <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
                    {slots.map((s) => (
                      <button key={s.h} disabled={s.taken} onClick={() => setSlot(s.h)} className={`rounded-xl border py-2.5 text-sm font-medium transition-colors ${slot === s.h ? 'border-forest bg-forest text-cream' : s.taken ? 'cursor-not-allowed border-transparent bg-sand-2 text-muted/50 line-through' : 'hairline hover:border-terra'}`}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                  {slot !== null && item && <p className="mt-3 text-sm text-muted">Fin prévue vers {fmtH(slot + item.min / 60)}. Merci d’arriver 5 minutes avant.</p>}
                </>
              ) : (
                <p className="mt-6 text-sm text-muted">Sélectionnez un jour pour voir les créneaux disponibles.</p>
              )}
            </>
          ) : (
            <div className="grid gap-6 sm:grid-cols-[1fr_0.8fr]">
              <div className="space-y-3">
                {[['name', 'Prénom et nom', 'Marie Dupont', 'text'], ['email', 'E-mail', 'marie@exemple.fr', 'email'], ['phone', 'Téléphone', '06 12 34 56 78', 'tel']].map(([k, l, ph, type]) => (
                  <label key={k} className="block">
                    <span className="eyebrow block text-muted">{l}</span>
                    <input type={type} value={form[k as 'name' | 'email' | 'phone']} onChange={(e) => setForm({ ...form, [k]: e.target.value })} placeholder={ph} className="mt-1.5 w-full rounded-xl border hairline bg-cream px-4 py-3 text-[15px] outline-none focus:border-terra focus:ring-2 focus:ring-terra/20" />
                  </label>
                ))}
                <label className="block">
                  <span className="eyebrow block text-muted">Une précision ? (optionnel)</span>
                  <textarea rows={2} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Peau sensible, femme enceinte, cadeau…" className="mt-1.5 w-full rounded-xl border hairline bg-cream px-4 py-3 text-[15px] outline-none focus:border-terra focus:ring-2 focus:ring-terra/20" />
                </label>
              </div>
              <div className="h-fit rounded-2xl bg-sand p-5">
                <p className="eyebrow text-terra">Récapitulatif</p>
                <p className="mt-2 font-display text-2xl">{item?.name}</p>
                <p className="text-sm text-muted">{staff === NONE ? 'Praticienne au choix' : `avec ${staff}`}</p>
                {day && slot !== null && <p className="mt-3 flex items-center gap-2 text-sm"><Clock size={14} className="text-terra" /> {dayLabel(day)} · {fmtH(slot)}</p>}
                <p className="mt-3 border-t hairline pt-3 font-display text-3xl">{item?.price}&nbsp;€</p>
                <p className="text-xs text-muted">Réglé sur place · annulation gratuite jusqu’à 24 h avant</p>
              </div>
            </div>
          )}
        </div>

        {/* pied */}
        {!done && (
          <div className="flex items-center justify-between gap-3 border-t hairline bg-cream px-5 py-4 sm:px-7">
            <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-ink disabled:opacity-30"><ArrowLeft size={16} /> Retour</button>
            <div className="hidden text-sm text-muted sm:block">{item ? `${item.name} · ${item.min} min · ${item.price} €` : 'Choisissez un soin'}</div>
            {step < 3 ? (
              <button onClick={() => setStep((s) => s + 1)} disabled={!canNext} className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-terra disabled:opacity-40">Continuer <ArrowRight size={16} /></button>
            ) : (
              <button onClick={confirm} disabled={!canNext || sending} className="inline-flex items-center gap-2 rounded-full bg-terra px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-forest disabled:opacity-40"><Sparkles size={16} /> {sending ? 'Confirmation…' : 'Confirmer le rendez-vous'}</button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
