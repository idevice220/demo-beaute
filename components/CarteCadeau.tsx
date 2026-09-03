'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Gift, Mail, Package, Sparkles } from 'lucide-react'
import { GIFT_AMOUNTS } from '@/lib/data'
import { SectionHeading } from './Section'
import { Reveal } from './Reveal'

export function CarteCadeau() {
  const [amount, setAmount] = useState(80)
  const [custom, setCustom] = useState('')
  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')
  const [msg, setMsg] = useState('')
  const [mode, setMode] = useState<'email' | 'ecrin'>('email')
  const value = custom ? Math.max(20, Math.min(500, Number(custom) || 0)) : amount

  function order(e: React.FormEvent) {
    e.preventDefault()
    toast.success(`Carte cadeau de ${value} € pour ${to || 'votre proche'} prête à être envoyée. (démo : paiement non activé)`)
  }

  return (
    <section id="cadeau" className="overflow-hidden bg-terra-tint/50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Cartes cadeaux" title={<>Offrez un moment, <em className="italic text-terra">pas un objet.</em></>} subtitle="Choisissez le montant, personnalisez le message : la carte est envoyée par e-mail en 2 minutes, ou glissée dans un écrin à retirer à l’institut." />

        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* aperçu en direct */}
          <Reveal>
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-nude/60 blur-2xl" aria-hidden />
              <div className="relative aspect-[1.6] overflow-hidden rounded-3xl bg-forest p-7 text-cream shadow-lift">
                <span className="arch absolute -right-10 -top-16 h-56 w-40 bg-terra/80" aria-hidden />
                <span className="absolute bottom-6 right-7 h-16 w-16 rounded-full border border-cream/30" aria-hidden />
                <p className="eyebrow relative text-nude">L’Écrin · carte cadeau</p>
                <p className="relative mt-6 font-display text-6xl font-light leading-none">{value}&nbsp;€</p>
                <div className="relative mt-auto pt-8 text-sm">
                  <p className="text-cream/70">Pour <span className="font-display text-xl text-cream">{to || '…'}</span></p>
                  <p className="text-cream/70">De la part de <span className="font-display text-xl text-cream">{from || '…'}</span></p>
                </div>
                {msg && <p className="absolute bottom-6 left-7 right-24 truncate font-display text-base italic text-cream/85">« {msg} »</p>}
              </div>
              <p className="mt-4 text-center text-xs text-muted">Aperçu en direct · valable 12 mois sur tous les soins</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form onSubmit={order} className="space-y-5 rounded-3xl bg-cream p-6 shadow-soft sm:p-8">
              <div>
                <span className="eyebrow block text-muted">Montant</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {GIFT_AMOUNTS.map((a) => (
                    <button type="button" key={a} onClick={() => { setAmount(a); setCustom('') }} className={`rounded-full border px-4 py-2 text-sm font-medium ${!custom && amount === a ? 'border-forest bg-forest text-cream' : 'hairline hover:border-terra'}`}>{a} €</button>
                  ))}
                  <input value={custom} onChange={(e) => setCustom(e.target.value.replace(/\D/g, ''))} inputMode="numeric" placeholder="Autre" className="w-24 rounded-full border hairline bg-cream px-4 py-2 text-sm outline-none focus:border-terra" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="eyebrow block text-muted">Pour</span><input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Maman" className="mt-1.5 w-full rounded-xl border hairline bg-cream px-4 py-3 text-[15px] outline-none focus:border-terra" /></label>
                <label className="block"><span className="eyebrow block text-muted">De la part de</span><input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Julie" className="mt-1.5 w-full rounded-xl border hairline bg-cream px-4 py-3 text-[15px] outline-none focus:border-terra" /></label>
              </div>
              <label className="block"><span className="eyebrow block text-muted">Un petit mot</span><input value={msg} onChange={(e) => setMsg(e.target.value.slice(0, 60))} placeholder="Joyeux anniversaire, prends soin de toi" className="mt-1.5 w-full rounded-xl border hairline bg-cream px-4 py-3 text-[15px] outline-none focus:border-terra" /></label>
              <div className="grid grid-cols-2 gap-2">
                {[['email', Mail, 'Par e-mail, immédiat'], ['ecrin', Package, 'Dans un écrin, à retirer']].map(([v, I, l]) => {
                  const Icon = I as typeof Mail
                  return (
                    <button type="button" key={v as string} onClick={() => setMode(v as 'email' | 'ecrin')} className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm ${mode === v ? 'border-forest bg-terra-tint/60' : 'hairline hover:border-terra'}`}><Icon size={16} className="shrink-0 text-terra" /> {l as string}</button>
                  )
                })}
              </div>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-terra px-6 py-4 text-[15px] font-medium text-cream transition-colors hover:bg-forest"><Gift size={17} /> Offrir {value} € <Sparkles size={15} /></button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
