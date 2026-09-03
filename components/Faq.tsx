'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { FAQ } from '@/lib/data'
import { SectionHeading } from './Section'
import { Reveal } from './Reveal'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow="Questions" title={<>Tout ce qu’on nous <em className="italic text-terra">demande.</em></>} />
        <Reveal className="divide-y hairline border-y">
          {FAQ.map((f, i) => {
            const on = open === i
            return (
              <div key={f.q}>
                <button onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="flex w-full items-center justify-between gap-4 py-5 text-left">
                  <span className="font-display text-2xl">{f.q}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all ${on ? 'rotate-45 border-terra bg-terra text-cream' : 'hairline'}`}><Plus size={16} /></span>
                </button>
                <div className="grid transition-[grid-template-rows] duration-300" style={{ gridTemplateRows: on ? '1fr' : '0fr' }}>
                  <div className="overflow-hidden"><p className="pb-5 font-light leading-relaxed text-muted">{f.a}</p></div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
