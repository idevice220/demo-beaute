import { Instagram, Phone, Mail, MapPin } from 'lucide-react'
import { BUSINESS } from '@/lib/data'

export function Footer() {
  return (
    <footer className="bg-forest-deep pb-24 pt-14 text-cream md:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl">L’Écrin</p>
          <p className="eyebrow mt-1 text-nude">Institut de beauté · Le Raincy · depuis {BUSINESS.since}</p>
          <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-cream/65">Soins visage, corps, épilation, mains et regard. Réservation en ligne 24h/24, cartes cadeaux, cabine duo.</p>
        </div>
        <div>
          <p className="eyebrow text-cream/50">Nous joindre</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href={BUSINESS.tel} className="inline-flex items-center gap-2 hover:text-nude"><Phone size={14} className="text-terra" /> {BUSINESS.phone}</a></li>
            <li><a href={`mailto:${BUSINESS.email}`} className="inline-flex items-center gap-2 hover:text-nude"><Mail size={14} className="text-terra" /> {BUSINESS.email}</a></li>
            <li className="inline-flex items-start gap-2 text-cream/75"><MapPin size={14} className="mt-0.5 text-terra" /> {BUSINESS.address}</li>
            <li><a href={BUSINESS.instagram} className="inline-flex items-center gap-2 hover:text-nude"><Instagram size={14} className="text-terra" /> @lecrin.leraincy</a></li>
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
        <span>© {new Date().getFullYear()} {BUSINESS.name} · Institut fictif</span>
        <a href="https://nex-web.fr" className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-3 py-1.5 font-medium text-cream/80 transition-colors hover:border-nude hover:text-nude">Site de démonstration — créé par NEX-WEB</a>
      </div>
    </footer>
  )
}
