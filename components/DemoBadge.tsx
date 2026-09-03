import { ExternalLink, KeyRound } from 'lucide-react'

export function DemoBadge() {
  return (
    <div className="fixed bottom-4 right-4 z-40 hidden flex-col items-end gap-2 md:flex">
      <a href="/admin" className="inline-flex items-center gap-2 rounded-full bg-forest px-3.5 py-2 text-xs font-medium text-cream shadow-lift transition-transform hover:-translate-y-0.5">
        <KeyRound size={13} className="text-nude" /> Voir l’espace propriétaire
      </a>
      <a href="https://nex-web.fr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border hairline bg-cream/90 px-3.5 py-2 text-xs font-medium text-ink shadow-soft backdrop-blur transition-transform hover:-translate-y-0.5">
        <span className="h-2 w-2 rounded-full bg-terra" /> Site de démonstration · NEX-WEB <ExternalLink size={12} />
      </a>
    </div>
  )
}
