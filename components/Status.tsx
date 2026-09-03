'use client'

import { useEffect, useState } from 'react'
import { getStatus } from '@/lib/hours'

export function OpenStatus({ className = '', light = false }: { className?: string; light?: boolean }) {
  const [s, setS] = useState<{ open: boolean; label: string } | null>(null)
  useEffect(() => {
    const tick = () => setS(getStatus())
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])
  if (!s) return <span className={`inline-block h-4 w-36 animate-pulse rounded-full ${light ? 'bg-cream/10' : 'bg-sand-2'} ${className}`} />
  return (
    <span className={`inline-flex items-center gap-2 text-sm ${light ? 'text-cream/85' : 'text-ink/80'} ${className}`}>
      <span className={`h-2 w-2 rounded-full ${s.open ? 'bg-sage' : 'bg-terra'}`} />
      {s.label}
    </span>
  )
}
