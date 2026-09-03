import Image from 'next/image'
import type { TeamT } from '@/lib/content'
import { SectionHeading } from './Section'
import { Reveal } from './Reveal'
import { BookButton } from './BookButton'

const WORDS = ['Une', 'Deux', 'Trois', 'Quatre', 'Cinq', 'Six']

export function Equipe({ team }: { team: TeamT[] }) {
  if (!team.length) return null
  const n = team.length
  return (
    <section id="equipe" className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading align="center" eyebrow="L’équipe" title={<>{n === 1 ? 'Une praticienne,' : `${WORDS[n - 1] ?? n} praticiennes,`} <em className="italic text-terra">une même exigence.</em></>} subtitle="Diplômées, formées chaque année, et surtout à l’écoute. Vous pouvez choisir votre praticienne à la réservation." />
        <div className={`grid gap-8 ${n >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
          {team.map((t, i) => (
            <Reveal key={t.id} delay={i * 100}>
              <div className="group text-center">
                <div className="arch relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden bg-sand-2">
                  <Image src={t.image} alt={`${t.name}, ${t.role}`} fill sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="mt-5 font-display text-3xl">{t.name}</h3>
                <p className="eyebrow mt-1 text-terra">{t.role}</p>
                <p className="mt-2 text-[15px] text-muted">{t.spec} · {t.years} ans d’expérience</p>
                <BookButton staff={t.name} className="mt-4 inline-flex rounded-full border hairline px-5 py-2 text-sm font-medium hover:border-forest hover:bg-forest hover:text-cream">
                  Réserver avec {t.name}
                </BookButton>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
