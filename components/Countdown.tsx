'use client'

import { useEffect, useState } from 'react'

/** Compte à rebours jusqu'à la fin du mois en cours (offre « évergreen » pour la démo). */
export function Countdown({ className = '' }: { className?: string }) {
  const [t, setT] = useState<{ d: number; h: number; m: number } | null>(null)
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)
      const diff = Math.max(0, end.getTime() - now.getTime())
      setT({ d: Math.floor(diff / 86_400_000), h: Math.floor((diff % 86_400_000) / 3_600_000), m: Math.floor((diff % 3_600_000) / 60_000) })
    }
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])
  if (!t) return <span className={`inline-block h-6 w-40 animate-pulse rounded bg-cream/20 ${className}`} />
  return (
    <span className={`inline-flex items-baseline gap-2 font-display ${className}`}>
      <span><b className="text-3xl font-medium">{t.d}</b> <span className="text-sm opacity-70">j</span></span>
      <span><b className="text-3xl font-medium">{String(t.h).padStart(2, '0')}</b> <span className="text-sm opacity-70">h</span></span>
      <span><b className="text-3xl font-medium">{String(t.m).padStart(2, '0')}</b> <span className="text-sm opacity-70">min</span></span>
    </span>
  )
}
