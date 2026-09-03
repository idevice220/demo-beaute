'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Clock, ArrowRight } from 'lucide-react'
import { CATEGORIES, SOINS, type Category } from '@/lib/data'
import { SectionHeading } from './Section'
import { Reveal } from './Reveal'
import { openBooking } from './BookButton'

export function Carte() {
  const [cat, setCat] = useState<Category>('Visage')
  const current = CATEGORIES.find((c) => c.id === cat)!
  const list = SOINS.filter((s) => s.cat === cat)

  return (
    <section id="soins" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="La carte des soins" title={<>Des rituels pensés pour <em className="italic text-terra">votre</em> peau.</>} subtitle="Durées et prix affichés, réservation en deux clics. Chaque soin commence par un diagnostic et une tisane." />

        {/* onglets */}
        <Reveal>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)} className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${cat === c.id ? 'border-forest bg-forest text-cream' : 'hairline bg-cream text-ink hover:border-terra hover:text-terra'}`}>
                {c.id}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal key={cat} className="lg:sticky lg:top-28 lg:self-start">
            <div className="arch relative aspect-[4/5] overflow-hidden bg-sand-2">
              <Image src={current.image} alt={current.id} fill sizes="(max-width: 1024px) 100vw, 400px" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent p-6 pt-16 text-cream">
                <p className="font-display text-3xl">{current.id}</p>
                <p className="mt-1 text-sm text-cream/80">{current.blurb}</p>
              </div>
            </div>
          </Reveal>

          <div>
            <ul className="divide-y hairline border-y">
              {list.map((s, i) => (
                <Reveal key={s.id} delay={i * 50}>
                  <li className="group flex items-start gap-4 py-5 sm:items-center">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-2xl text-ink">{s.name}</h3>
                        {s.signature && <span className="rounded-full bg-terra-tint px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-terra-deep">Signature</span>}
                        {s.new && <span className="rounded-full bg-forest px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-cream">Nouveau</span>}
                      </div>
                      {s.desc && <p className="mt-1 text-[15px] font-light text-muted">{s.desc}</p>}
                      <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted"><Clock size={12} /> {s.min} min</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-5">
                      <span className="font-display text-2xl text-ink">{s.price}&nbsp;€</span>
                      <button onClick={() => openBooking({ soinId: s.id })} className="inline-flex items-center gap-1.5 rounded-full border hairline px-4 py-2 text-sm font-medium text-ink transition-all hover:border-forest hover:bg-forest hover:text-cream">
                        Réserver <ArrowRight size={14} />
                      </button>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">Une question sur un soin ? Appelez-nous, on vous conseille avec plaisir.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
