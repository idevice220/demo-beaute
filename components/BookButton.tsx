'use client'

import type { ReactNode } from 'react'

export type BookingDetail = { soinId?: string; staff?: string }

export function openBooking(detail: BookingDetail = {}) {
  window.dispatchEvent(new CustomEvent<BookingDetail>('open-booking', { detail }))
}

/** Bouton qui ouvre le module de réservation (utilisable depuis des composants serveur). */
export function BookButton({ soinId, staff, className = '', children }: BookingDetail & { className?: string; children: ReactNode }) {
  return (
    <button type="button" onClick={() => openBooking({ soinId, staff })} className={className}>
      {children}
    </button>
  )
}
