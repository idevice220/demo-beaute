import Image from 'next/image'
import { Star, ArrowDown, Sparkles } from 'lucide-react'
import { BUSINESS } from '@/lib/data'
import { BookButton } from './BookButton'
import { OpenStatus } from './Status'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-10 h-[480px] w-[480px] rounded-full bg-terra-tint blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-sand-2 blur-3xl" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-10 lg:grid-cols-[1fr_0.9fr] lg:pb-28 lg:pt-16">
        <div className="animate-fade-up">
          <p className="eyebrow text-terra">Institut de beauté · Le Raincy · depuis {BUSINESS.since}</p>
          <h1 className="mt-6 font-display text-[52px] font-light leading-[1.02] tracking-tight text-ink sm:text-7xl lg:text-[86px]">
            Prenez soin de vous, <em className="font-normal italic text-terra">vraiment.</em>
          </h1>
          <p className="mt-7 max-w-md text-lg font-light leading-relaxed text-muted">
            Un cocon au cœur du Raincy. Soins visage, massages, épilation, mains et regard, réalisés par trois praticiennes qui prennent le temps.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookButton className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-7 py-4 text-[15px] font-medium text-cream shadow-soft transition-all hover:bg-terra">
              <Sparkles size={17} /> Réserver en ligne
            </BookButton>
            <a href="#soins" className="inline-flex items-center justify-center gap-2 rounded-full border hairline px-7 py-4 text-[15px] font-medium text-ink transition-colors hover:border-terra hover:text-terra">
              Découvrir la carte <ArrowDown size={16} />
            </a>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="inline-flex items-center gap-2 text-sm text-ink/80">
              <span className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="fill-gold text-gold" />)}</span>
              <strong className="font-medium">{BUSINESS.rating.toLocaleString('fr-FR')}</strong> · {BUSINESS.reviews} avis
            </span>
            <OpenStatus />
          </div>
        </div>

        {/* visuel en arche */}
        <div className="relative mx-auto w-full max-w-[460px] animate-fade-up [animation-delay:150ms]">
          <div className="arch relative aspect-[4/5] overflow-hidden bg-sand-2 shadow-lift">
            <Image src="/images/hero.jpg" alt="Soin du visage à l’institut L’Écrin" fill priority sizes="(max-width: 1024px) 100vw, 460px" className="object-cover" />
          </div>
          {/* badge tournant */}
          <div className="absolute -left-6 top-8 h-32 w-32 sm:-left-12">
            <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
              <defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
              <circle cx="50" cy="50" r="49" fill="#FBF8F3" />
              <text fontSize="7.4" letterSpacing="1.1" fill="#2E3F36" fontWeight="500"><textPath href="#circ">RÉSERVATION EN LIGNE · CARTES CADEAUX · </textPath></text>
            </svg>
            <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-terra text-cream"><Sparkles size={16} /></span>
          </div>
          <div className="absolute -bottom-5 -right-2 rounded-2xl bg-cream/95 px-5 py-4 shadow-soft backdrop-blur sm:-right-8">
            <p className="font-display text-2xl leading-none text-ink">Cabine duo</p>
            <p className="mt-1 text-xs text-muted">et tisanerie pour prolonger</p>
          </div>
        </div>
      </div>
    </section>
  )
}
