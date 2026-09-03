import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

export function SectionHeading({ eyebrow, title, subtitle, align = 'left', light = false }: { eyebrow: string; title: ReactNode; subtitle?: ReactNode; align?: 'left' | 'center'; light?: boolean }) {
  const c = align === 'center'
  return (
    <Reveal className={`mb-12 max-w-2xl ${c ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow ${light ? 'text-nude' : 'text-terra'}`}>{eyebrow}</p>
      <h2 className={`mt-4 font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-[56px] ${light ? 'text-cream' : 'text-ink'}`}>{title}</h2>
      {subtitle && <p className={`mt-5 text-lg font-light leading-relaxed ${light ? 'text-cream/75' : 'text-muted'}`}>{subtitle}</p>}
    </Reveal>
  )
}
