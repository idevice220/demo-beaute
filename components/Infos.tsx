import { MapPin, Phone, Clock, Train, Car, Navigation } from 'lucide-react'
import type { Site } from '@/lib/settings'
import { SectionHeading } from './Section'
import { Reveal } from './Reveal'
import { OpenStatus } from './Status'

export function Infos({ site }: { site: Site }) {
  return (
    <section id="infos" className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Horaires & accès" title={<>À deux pas de la gare, <em className="italic text-terra">au calme.</em></>} />
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="rounded-3xl bg-cream p-7 shadow-soft">
              <OpenStatus hours={site.hours} />
              <ul className="mt-4 divide-y hairline">
                {site.hoursRows.map((h) => (
                  <li key={h.d} className="flex items-center justify-between py-3 text-[15px]">
                    <span className="inline-flex items-center gap-2 text-ink/80"><Clock size={14} className="text-terra" /> {h.d} {h.note && <span className="rounded-full bg-terra-tint px-2 py-0.5 text-[11px] uppercase tracking-wider text-terra-deep">{h.note}</span>}</span>
                    <span className="font-medium">{h.h}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-5 space-y-2.5 text-[15px] text-ink/80">
                <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-terra" /> {site.address}</li>
                {site.access.train && <li className="flex items-start gap-2"><Train size={16} className="mt-0.5 shrink-0 text-terra" /> {site.access.train}</li>}
                {site.access.parking && <li className="flex items-start gap-2"><Car size={16} className="mt-0.5 shrink-0 text-terra" /> {site.access.parking}</li>}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                <a href={site.maps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-cream hover:bg-terra"><Navigation size={15} /> Itinéraire</a>
                <a href={site.tel} className="inline-flex items-center gap-2 rounded-full border hairline px-5 py-2.5 text-sm font-medium hover:border-terra hover:text-terra"><Phone size={15} /> {site.phone}</a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative h-full min-h-[360px] overflow-hidden rounded-3xl border hairline bg-sand-2 shadow-soft">
              <svg viewBox="0 0 600 420" className="absolute inset-0 h-full w-full" role="img" aria-label="Plan schématique : l’institut avenue de la Résistance, à 3 minutes de la gare RER E du Raincy">
                <rect width="600" height="420" fill="#EAE0D3" />
                {[[20,20,150,110],[200,20,180,110],[410,20,170,110],[20,160,150,110],[410,160,170,110],[20,300,150,100],[200,300,180,100],[410,300,170,100]].map(([x,y,w,h]) => (
                  <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="10" fill="#F3ECE2" />
                ))}
                <path d="M0 145 H600 M0 285 H600 M185 0 V420 M395 0 V420" stroke="#FBF8F3" strokeWidth="14" fill="none" />
                <path d="M185 145 L395 285" stroke="#FBF8F3" strokeWidth="10" fill="none" />
                <text x="300" y="139" textAnchor="middle" fontSize="11" fill="#7A6E68" letterSpacing="1.5">AVENUE DE LA RÉSISTANCE</text>
                <text x="178" y="60" fontSize="11" fill="#7A6E68" letterSpacing="1.5" transform="rotate(-90 178 60)" textAnchor="end">BD DU MIDI</text>
                <path d="M0 360 C120 350 220 372 320 362 S520 340 600 350" stroke="#2E3F36" strokeWidth="4" strokeDasharray="10 7" fill="none" />
                <circle cx="330" cy="362" r="9" fill="#2E3F36" />
                <circle cx="330" cy="362" r="4" fill="#FBF8F3" />
                <text x="345" y="367" fontSize="12" fill="#2E3F36" fontWeight="600">Gare RER E · Le Raincy-Villemomble</text>
                <path d="M330 350 C320 320 305 300 300 230" stroke="#C4715A" strokeWidth="3" strokeDasharray="4 6" fill="none" />
                <text x="312" y="300" fontSize="11" fill="#C4715A" fontWeight="600">3 min à pied</text>
                <g transform="translate(300 215)">
                  <circle r="26" fill="#C4715A" fillOpacity="0.18" />
                  <path d="M0 -26 C-14 -26 -22 -14 -22 -2 C-22 10 -10 22 0 32 C10 22 22 10 22 -2 C22 -14 14 -26 0 -26 Z" fill="#C4715A" />
                  <circle cy="-4" r="7" fill="#FBF8F3" />
                </g>
                <rect x="198" y="245" width="204" height="30" rx="15" fill="#2E3F36" />
                <text x="300" y="264" textAnchor="middle" fontSize="12" fill="#FBF8F3" fontWeight="600">{site.name} · 12 av. de la Résistance</text>
                <rect x="470" y="180" width="26" height="26" rx="6" fill="#2E3F36" />
                <text x="483" y="198" textAnchor="middle" fontSize="14" fill="#FBF8F3" fontWeight="700">P</text>
                <text x="470" y="222" fontSize="10" fill="#7A6E68">gratuit</text>
              </svg>
              <span className="absolute bottom-3 left-3 rounded-full bg-cream/90 px-3 py-1 text-xs text-muted">Plan schématique</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
