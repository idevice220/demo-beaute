import { Check, Heart, Users } from 'lucide-react'
import { Reveal } from './Reveal'

export function Fidelite() {
  const stamped = 6
  return (
    <section className="py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <p className="eyebrow text-terra">Fidélité</p>
          <h2 className="mt-3 font-display text-4xl font-light leading-tight sm:text-5xl">Le 10<sup>e</sup> soin est <em className="italic text-terra">offert.</em></h2>
          <p className="mt-4 max-w-md text-lg font-light text-muted">Votre carte se remplit toute seule à chaque rendez-vous, sans rien à présenter. Et quand vous parrainez une amie, vous recevez chacune 15 € sur le prochain soin.</p>
          <ul className="mt-5 space-y-2 text-[15px]">
            {[[Heart, 'Carte digitale, rattachée à votre numéro'], [Users, 'Parrainage : 15 € pour vous, 15 € pour elle'], [Check, 'Cumulable avec les cartes cadeaux']].map(([I, t]) => { const Icon = I as typeof Heart; return <li key={t as string} className="flex items-center gap-2"><Icon size={16} className="text-terra" /> {t as string}</li> })}
          </ul>
        </Reveal>
        <Reveal delay={100}>
          <div className="mx-auto max-w-md rounded-3xl border hairline bg-cream p-7 shadow-soft">
            <div className="flex items-center justify-between"><p className="font-display text-2xl">Carte fidélité</p><span className="text-sm text-muted">{stamped}/10</span></div>
            <div className="mt-5 grid grid-cols-5 gap-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className={`grid aspect-square place-items-center rounded-full border ${i < stamped ? 'border-terra bg-terra text-cream' : i === 9 ? 'border-dashed border-forest text-forest' : 'hairline text-muted/40'}`}>
                  {i < stamped ? <Check size={18} strokeWidth={2.5} /> : i === 9 ? <Heart size={18} /> : <span className="text-xs">{i + 1}</span>}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">Encore 4 soins avant votre soin offert (jusqu’à 79 €).</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
