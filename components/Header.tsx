'use client'

import { useEffect, useState } from 'react'
import { Phone, Menu, X, CalendarCheck } from 'lucide-react'
import { BUSINESS } from '@/lib/data'
import { openBooking } from './BookButton'

const NAV = [
  { label: 'La carte', href: '#soins' },
  { label: 'Rituels', href: '#rituels' },
  { label: 'L’institut', href: '#galerie' },
  { label: 'L’équipe', href: '#equipe' },
  { label: 'Cartes cadeaux', href: '#cadeau' },
  { label: 'Infos', href: '#infos' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  return (
    <header className={`sticky top-0 z-50 border-b transition-all ${scrolled ? 'hairline bg-cream/90 shadow-soft backdrop-blur' : 'border-transparent bg-transparent'}`}>
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4">
        <a href="#top" className="flex items-center gap-3" aria-label="L’Écrin, accueil">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-forest">
            <span className="arch block h-5 w-4 bg-terra" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[26px] font-medium tracking-tight text-ink">L’Écrin</span>
            <span className="eyebrow block text-[9px] text-terra">Institut de beauté</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-[14px] font-medium tracking-wide text-ink/70 transition-colors hover:text-terra">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={BUSINESS.tel} className="hidden h-11 w-11 place-items-center rounded-full border hairline text-ink transition-colors hover:border-terra hover:text-terra sm:grid" aria-label={`Appeler ${BUSINESS.phone}`}>
            <Phone size={17} />
          </a>
          <button onClick={() => openBooking()} className="hidden items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-terra sm:inline-flex">
            <CalendarCheck size={16} /> Réserver
          </button>
          <button onClick={() => setOpen((v) => !v)} className="grid h-11 w-11 place-items-center rounded-full border hairline lg:hidden" aria-label="Menu" aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t hairline bg-cream lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b hairline py-3.5 font-display text-2xl text-ink">
                {n.label}
              </a>
            ))}
            <button onClick={() => { setOpen(false); openBooking() }} className="mt-3 mb-2 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 font-medium text-cream">
              <CalendarCheck size={16} /> Réserver en ligne
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
