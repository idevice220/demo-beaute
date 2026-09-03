import Image from 'next/image'
import { Check, Clock, Gift } from 'lucide-react'
import type { RituelT } from '@/lib/content'
import type { Site } from '@/lib/settings'
import { SectionHeading } from './Section'
import { Reveal } from './Reveal'
import { BookButton } from './BookButton'
import { Countdown } from './Countdown'

export function Rituels({ rituels, offer }: { rituels: RituelT[]; offer: Site['offer'] }) {
  if (!rituels.length) return null
  return (
    <section id="rituels" className="bg-forest py-20 text-cream lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading light eyebrow="Rituels signature" title={<>Nos moments <em className="italic text-nude">d’exception.</em></>} subtitle="Des parcours composés, à prix doux, pour s’offrir plus qu’un soin." />
          {offer.on && (
            <Reveal delay={100}>
              <div className="mb-12 rounded-3xl border border-cream/15 bg-cream/5 px-6 py-5">
                <p className="eyebrow text-nude">{offer.text}</p>
                <p className="mt-1 text-sm text-cream/70">Il reste</p>
                <Countdown className="text-cream" />
              </div>
            </Reveal>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {rituels.map((r, i) => (
            <Reveal key={r.id} delay={i * 90}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-cream text-ink shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={r.image} alt={r.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-terra-deep">{r.sub}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-3xl">{r.name}</h3>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted"><Clock size={12} /> {r.min} min</p>
                  <ul className="mt-4 space-y-1.5 text-[15px] text-ink/80">
                    {r.items.map((it) => (
                      <li key={it} className="flex items-center gap-2"><Check size={15} className="text-terra" /> {it}</li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-end justify-between pt-6">
                    <p>
                      {r.was && <span className="block text-xs text-muted line-through">{r.was.toLocaleString('fr-FR')} €</span>}
                      <span className="font-display text-4xl leading-none text-ink">{r.price.toLocaleString('fr-FR')}&nbsp;€</span>
                    </p>
                    <BookButton soinId={`r-${r.id}`} className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-terra">
                      Réserver
                    </BookButton>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150}>
          <p className="mt-8 inline-flex items-center gap-2 text-sm text-cream/70"><Gift size={16} className="text-nude" /> Tous les rituels existent en carte cadeau, envoyée en 2 minutes.</p>
        </Reveal>
      </div>
    </section>
  )
}
