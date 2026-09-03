'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Send } from 'lucide-react'
import { Reveal } from './Reveal'

export function Newsletter() {
  const [email, setEmail] = useState('')
  return (
    <section className="pb-20">
      <Reveal className="mx-auto max-w-6xl px-4">
        <div className="arch relative overflow-hidden bg-forest px-6 pb-12 pt-16 text-center text-cream sm:px-12">
          <span className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-terra/40 blur-2xl" aria-hidden />
          <p className="eyebrow text-nude">La lettre de L’Écrin</p>
          <h2 className="mx-auto mt-3 max-w-lg font-display text-4xl font-light leading-tight">Une fois par mois, nos conseils beauté et nos offres en avant-première.</h2>
          <form onSubmit={(e) => { e.preventDefault(); toast.success('Inscription enregistrée. Bienvenue ! (démo)'); setEmail('') }} className="mx-auto mt-7 flex max-w-md flex-col gap-2 sm:flex-row">
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.fr" className="flex-1 rounded-full border border-cream/20 bg-cream/10 px-5 py-3.5 text-cream placeholder:text-cream/50 outline-none focus:border-nude" />
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-terra px-6 py-3.5 text-sm font-medium text-cream hover:bg-nude hover:text-forest"><Send size={15} /> Je m’inscris</button>
          </form>
          <p className="mt-3 text-xs text-cream/50">Zéro spam, désinscription en un clic.</p>
        </div>
      </Reveal>
    </section>
  )
}
