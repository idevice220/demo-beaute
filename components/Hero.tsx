import Image from 'next/image'
import { Star, ArrowDown, Sparkles } from 'lucide-react'
import type { Site } from '@/lib/settings'
import { BookButton } from './BookButton'
import { OpenStatus } from './Status'

export function Hero({ site }: { site: Site }) {
  return (
    <section id="top" className="relative overflow-hidden pt-10 lg:pt-16">
      <div className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-terra-tint blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-40 top-40 h-[420px] w-[420px] rounded-full bg-sand-2 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <p className="eyebrow animate-fade-up text-terra">{site.tagline} · {site.city} · depuis {site.since}</p>
        <h1 className="mx-auto mt-5 max-w-4xl animate-fade-up text-balance font-display text-[54px] font-light leading-[1] tracking-tight text-ink sm:text-7xl lg:text-[104px]">
          {site.hero.title} <em className="font-normal italic text-terra">{site.hero.accent}</em>
        </h1>
        <p className="mx-auto mt-6 max-w-xl animate-fade-up text-lg font-light leading-relaxed text-muted [animation-delay:80ms]">{site.hero.text}</p>
        <div className="mt-8 flex animate-fade-up flex-col items-center justify-center gap-3 [animation-delay:140ms] sm:flex-row">
          <BookButton className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-7 py-4 text-[15px] font-medium text-cream shadow-soft transition-all hover:bg-terra">
            <Sparkles size={17} /> Réserver en ligne
          </BookButton>
          <a href="#soins" className="inline-flex items-center justify-center gap-2 rounded-full border hairline px-7 py-4 text-[15px] font-medium text-ink transition-colors hover:border-terra hover:text-terra">
            Découvrir la carte <ArrowDown size={16} />
          </a>
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-6xl px-4 pb-16 lg:mt-14 lg:pb-24">
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl bg-sand-2 shadow-lift sm:aspect-[16/9] sm:rounded-t-[220px] lg:aspect-[21/9] lg:rounded-t-[280px]">
          <Image src={site.hero.image} alt={`Ambiance douce de l’institut ${site.name}`} fill priority sizes="(max-width: 1152px) 100vw, 1152px" className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink/55 to-transparent" aria-hidden />

          <div className="absolute bottom-5 left-5 flex flex-wrap gap-2 sm:bottom-7 sm:left-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-cream/95 px-3.5 py-2 text-sm text-ink backdrop-blur">
              <span className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className="fill-gold text-gold" />)}</span>
              <strong className="font-medium">{site.rating.toLocaleString('fr-FR')}</strong> · {site.reviewsCount} avis
            </span>
            <span className="inline-flex items-center rounded-full bg-cream/95 px-3.5 py-2 backdrop-blur">
              <OpenStatus hours={site.hours} />
            </span>
          </div>

          {site.hero.cardTitle && (
            <div className="absolute bottom-5 right-5 hidden rounded-2xl bg-cream/95 px-5 py-4 shadow-soft backdrop-blur sm:block sm:bottom-7 sm:right-7">
              <p className="font-display text-2xl leading-none text-ink">{site.hero.cardTitle}</p>
              <p className="mt-1 text-xs text-muted">{site.hero.cardText}</p>
            </div>
          )}
        </div>

        <div className="absolute left-2 top-2 h-28 w-28 sm:-top-6 sm:left-6 lg:h-36 lg:w-36">
          <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
            <defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
            <circle cx="50" cy="50" r="49" fill="#2E3F36" />
            <text fontSize="7.4" letterSpacing="1.1" fill="#FBF8F3" fontWeight="500"><textPath href="#circ">{site.hero.badge}</textPath></text>
          </svg>
          <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-terra text-cream"><Sparkles size={16} /></span>
        </div>
      </div>
    </section>
  )
}
