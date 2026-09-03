'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight, Instagram } from 'lucide-react'
import type { GalleryItem } from '@prisma/client'
import type { Site } from '@/lib/settings'
import { SectionHeading } from './Section'
import { Reveal } from './Reveal'

export function Galerie({ items, site }: { items: GalleryItem[]; site: Site }) {
  const [idx, setIdx] = useState<number | null>(null)
  const close = useCallback(() => setIdx(null), [])
  const step = useCallback((d: number) => setIdx((i) => (i === null ? null : (i + d + items.length) % items.length)), [items.length])
  useEffect(() => {
    if (idx === null) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [idx, close, step])

  return (
    <section id="galerie" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="L’institut" title={<>Un lieu pensé pour <em className="italic text-terra">ralentir.</em></>} subtitle="Trois cabines, une cabine duo, une tisanerie. Lumière douce, linge chaud, silence." />
          <Reveal delay={100}>
            <a href={site.instagram} className="mb-12 inline-flex items-center gap-2 rounded-full border hairline px-5 py-2.5 text-sm font-medium hover:border-terra hover:text-terra"><Instagram size={16} /> {site.instagramHandle}</a>
          </Reveal>
        </div>

        <div className="columns-2 gap-3 md:columns-3 md:gap-4">
          {items.map((g, i) => (
            <Reveal key={g.id} delay={(i % 3) * 60} className="mb-3 break-inside-avoid md:mb-4">
              <button onClick={() => setIdx(i)} className={`group relative block w-full overflow-hidden ${i % 4 === 0 ? 'arch' : 'rounded-2xl'} bg-sand-2`} aria-label={g.alt}>
                <div className={`relative ${g.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                  <Image src={g.src} alt={g.alt} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {idx !== null && items[idx] && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm" onClick={close} role="dialog" aria-modal="true">
          <button onClick={close} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20" aria-label="Fermer"><X size={22} /></button>
          <button onClick={(e) => { e.stopPropagation(); step(-1) }} className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20 sm:grid" aria-label="Précédente"><ChevronLeft size={26} /></button>
          <button onClick={(e) => { e.stopPropagation(); step(1) }} className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20 sm:grid" aria-label="Suivante"><ChevronRight size={26} /></button>
          <figure className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink"><Image src={items[idx].src} alt={items[idx].alt} fill sizes="90vw" className="object-contain" /></div>
            <figcaption className="mt-3 flex justify-between text-sm text-cream/80"><span className="font-display text-lg">{items[idx].alt}</span><span>{idx + 1}/{items.length}</span></figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
