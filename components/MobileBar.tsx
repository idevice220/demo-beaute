'use client'

import { CalendarCheck, Phone, Navigation } from 'lucide-react'
import { BUSINESS } from '@/lib/data'
import { openBooking } from './BookButton'

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t hairline bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2 p-2">
        <button onClick={() => openBooking()} className="flex items-center justify-center gap-2 rounded-full bg-forest py-3 text-sm font-medium text-cream"><CalendarCheck size={17} /> Réserver</button>
        <a href={BUSINESS.tel} className="flex items-center justify-center gap-2 rounded-full border hairline py-3 text-sm font-medium"><Phone size={16} /> Appeler</a>
        <a href={BUSINESS.maps} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full border hairline py-3 text-sm font-medium"><Navigation size={16} /> Y aller</a>
      </div>
    </div>
  )
}
