const ITEMS = ['Soins visage', 'Massages', 'Épilation', 'Manucure', 'Regard', 'Rituels signature', 'Cabine duo', 'Cartes cadeaux']

export function Marquee() {
  return (
    <div className="overflow-hidden border-y hairline bg-sand py-3" aria-hidden>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {[0, 1].map((k) => (
          <div key={k} className="flex gap-10">
            {ITEMS.map((t) => (
              <span key={t} className="flex items-center gap-10 font-display text-xl italic text-ink/80">
                {t}
                <span className="h-1.5 w-1.5 rounded-full bg-terra" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
