'use client'

import { useRef } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Review } from '@prisma/client'
import type { Site } from '@/lib/settings'
import { SectionHeading } from './Section'

export function Avis({ reviews, site }: { reviews: Review[]; site: Site }) {
  const row = useRef<HTMLDivElement>(null)
  const scroll = (d: number) => row.current?.scrollBy({ left: d * row.current.clientWidth * 0.8, behavior: 'smooth' })
  return (
    <section id="avis" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Elles en parlent" title={<>Vos plus beaux <em className="italic text-terra">compliments.</em></>} />
          <div className="mb-12 flex items-center gap-4">
            <div className="text-right">
              <p className="font-display text-5xl leading-none">{site.rating.toLocaleString('fr-FR')}</p>
              <p className="text-xs text-muted">{site.reviewsCount} avis Google</p>
            </div>
            <span className="flex flex-col gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="fill-gold text-gold" />)}</span>
          </div>
        </div>
        <div ref={row} className="no-scrollbar snap-row flex gap-5 overflow-x-auto pb-2">
          {reviews.map((a) => (
            <article key={a.id} className="snap-item flex w-[85%] shrink-0 flex-col rounded-3xl border hairline bg-cream p-7 sm:w-[48%] lg:w-[32%]">
              <p className="font-display text-2xl leading-snug text-ink">« {a.text} »</p>
              <div className="mt-6 flex items-center justify-between border-t hairline pt-4">
                <div><p className="font-medium">{a.name}</p><p className="text-xs text-muted">{a.date} · {a.soin}</p></div>
                <span className="flex gap-0.5">{Array.from({ length: a.rating }).map((_, i) => <Star key={i} size={12} className="fill-gold text-gold" />)}</span>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={() => scroll(-1)} className="grid h-11 w-11 place-items-center rounded-full border hairline hover:border-terra hover:text-terra" aria-label="Avis précédents"><ChevronLeft size={20} /></button>
          <button onClick={() => scroll(1)} className="grid h-11 w-11 place-items-center rounded-full border hairline hover:border-terra hover:text-terra" aria-label="Avis suivants"><ChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  )
}
