'use client'

import { useState } from 'react'
import { Eye, KeyRound, RotateCcw } from 'lucide-react'

/** Bandeau affiché quand la visiteuse regarde sa propre copie de la démo. */
export function TenantBar() {
  const [busy, setBusy] = useState(false)
  async function leave() {
    setBusy(true)
    await fetch('/api/demo/leave', { method: 'POST' })
    window.location.reload()
  }
  return (
    <div className="relative z-[60] bg-terra text-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 text-[13px]">
        <p className="inline-flex items-center gap-2 font-medium"><Eye size={15} /> Vous voyez <u>votre</u> version de la démo : ce que vous changez dans l’espace propriétaire n’est visible que par vous.</p>
        <span className="flex items-center gap-3">
          <a href="/admin" className="inline-flex items-center gap-1.5 font-semibold underline-offset-2 hover:underline"><KeyRound size={14} /> Espace propriétaire</a>
          <button onClick={leave} disabled={busy} className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3 py-1 text-xs font-semibold text-cream disabled:opacity-60"><RotateCcw size={12} /> Revenir à la version d’origine</button>
        </span>
      </div>
    </div>
  )
}
