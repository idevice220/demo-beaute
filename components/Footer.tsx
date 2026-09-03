import { Instagram, Phone, Mail, MapPin, KeyRound } from 'lucide-react'
import type { Site } from '@/lib/settings'

export function Footer({ site }: { site: Site }) {
  return (
    <footer className="bg-forest-deep pb-24 pt-14 text-cream md:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl">{site.name}</p>
          <p className="eyebrow mt-1 text-nude">{site.tagline} · {site.city} · depuis {site.since}</p>
          <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-cream/65">{site.footerText}</p>
        </div>
        <div>
          <p className="eyebrow text-cream/50">Nous joindre</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href={site.tel} className="inline-flex items-center gap-2 hover:text-nude"><Phone size={14} className="text-terra" /> {site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-nude"><Mail size={14} className="text-terra" /> {site.email}</a></li>
            <li className="inline-flex items-start gap-2 text-cream/75"><MapPin size={14} className="mt-0.5 text-terra" /> {site.address}</li>
            <li><a href={site.instagram} className="inline-flex items-center gap-2 hover:text-nude"><Instagram size={14} className="text-terra" /> {site.instagramHandle}</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-cream/50">Le site</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {[['#soins', 'La carte des soins'], ['#rituels', 'Rituels signature'], ['#cadeau', 'Cartes cadeaux'], ['#equipe', 'L’équipe'], ['#infos', 'Horaires & accès'], ['#faq', 'Questions fréquentes']].map(([h, l]) => <li key={h}><a href={h} className="hover:text-nude">{l}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-cream/10 px-4 pt-6 text-xs text-cream/50 sm:flex-row">
        <span>© {new Date().getFullYear()} {site.name} · Institut fictif</span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <a href="/admin" className="inline-flex items-center gap-2 rounded-full border border-terra/50 px-3 py-1.5 font-medium text-nude transition-colors hover:bg-terra hover:text-cream"><KeyRound size={13} /> Espace propriétaire (démo ouverte)</a>
          <a href="https://nex-web.fr" className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-3 py-1.5 font-medium text-cream/80 transition-colors hover:border-nude hover:text-nude">Site de démonstration — créé par NEX-WEB</a>
        </div>
      </div>
    </footer>
  )
}
