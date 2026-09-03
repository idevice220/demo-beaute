import { ExternalLink } from 'lucide-react'

export function DemoBadge() {
  return (
    <a href="https://nex-web.fr" target="_blank" rel="noopener noreferrer" className="fixed bottom-4 right-4 z-40 hidden items-center gap-2 rounded-full border hairline bg-cream/90 px-3.5 py-2 text-xs font-medium text-ink shadow-soft backdrop-blur transition-transform hover:-translate-y-0.5 md:inline-flex">
      <span className="h-2 w-2 rounded-full bg-terra" /> Site de démonstration · NEX-WEB <ExternalLink size={12} />
    </a>
  )
}
