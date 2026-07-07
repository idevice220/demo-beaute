import Image from 'next/image'
import {
  Phone,
  Flower2,
  Sparkles,
  Hand,
  HeartHandshake,
  Clock,
  MapPin,
  Star,
  CalendarCheck,
} from 'lucide-react'

// ─── Données de la démo (fictives) ───────────────────────────
const PHONE = '01 98 76 54 32'
const TEL = 'tel:0198765432'

const SOINS = [
  {
    title: 'Soins du visage',
    price: 'dès 45€',
    text: 'Nettoyant, hydratant ou anti-âge — des protocoles sur-mesure pour une peau éclatante.',
    image: '/images/soin-visage.jpg',
    icon: Sparkles,
  },
  {
    title: 'Épilation',
    price: 'dès 12€',
    text: 'Au fil ou à la cire, en douceur. Sourcils, visage et corps.',
    image: '/images/epilation.jpg',
    icon: Flower2,
  },
  {
    title: 'Beauté des mains',
    price: 'dès 30€',
    text: 'Manucure soignée, pose de vernis semi-permanent, nail art délicat.',
    image: '/images/manucure.jpg',
    icon: Hand,
  },
  {
    title: 'Massages bien-être',
    price: 'dès 60€',
    text: 'Pierres chaudes, relaxant ou énergisant — une parenthèse hors du temps.',
    image: '/images/massage.jpg',
    icon: HeartHandshake,
  },
]

const AVIS = [
  {
    name: 'Élodie R.',
    text: 'Un vrai cocon. Le soin visage était divin et les conseils très personnalisés.',
  },
  {
    name: 'Nadia K.',
    text: 'Institut impeccable, accueil chaleureux. Mon rendez-vous mensuel incontournable !',
  },
  {
    name: 'Claire M.',
    text: 'Le massage aux pierres chaudes est une merveille. On en ressort régénérée.',
  },
]

const HORAIRES = [
  { j: 'Mardi — Vendredi', h: '9h30 – 19h00' },
  { j: 'Samedi', h: '9h00 – 18h00' },
  { j: 'Dimanche — Lundi', h: 'Fermé' },
]

export default function Home() {
  return (
    <>
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-rose/15 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="#" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-rose text-cream">
              <Flower2 size={17} />
            </span>
            <span className="font-display text-2xl font-semibold tracking-wide text-cocoa">
              L’Écrin
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-cocoa/70 md:flex">
            <a href="#soins" className="hover:text-rose">Nos soins</a>
            <a href="#avis" className="hover:text-rose">Avis</a>
            <a href="#infos" className="hover:text-rose">Horaires & accès</a>
          </nav>
          <a
            href={TEL}
            className="inline-flex items-center gap-2 rounded-full bg-rose px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-rosedark"
          >
            <CalendarCheck size={16} /> Réserver
          </a>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-rose">
                Institut de beauté · Le Raincy
              </span>
              <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.08] text-cocoa sm:text-6xl">
                Prenez soin de vous,
                <br />
                <em className="text-rose">vraiment.</em>
              </h1>
              <p className="mt-5 max-w-md leading-relaxed text-cocoa/70">
                Un cocon de douceur au cœur du Raincy. Soins du visage,
                épilation, manucure et massages — dans une atmosphère pensée
                pour vous ressourcer.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={TEL}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-rose px-7 py-3.5 font-medium text-cream shadow-md transition-all hover:bg-rosedark"
                >
                  <Phone size={17} /> Prendre rendez-vous
                </a>
                <a
                  href="#soins"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cocoa/20 px-7 py-3.5 font-medium text-cocoa transition-colors hover:border-rose hover:text-rose"
                >
                  Découvrir les soins
                </a>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm text-cocoa/60">
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-rose text-rose" />
                  ))}
                </span>
                Notée 4,9/5 par nos clientes
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl">
                <Image
                  src="/images/hero.jpg"
                  alt="Ambiance douce de l’institut"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-4 rounded-2xl bg-white/95 px-5 py-3.5 shadow-lg">
                <p className="font-display text-lg font-semibold text-cocoa">
                  Depuis 2015
                </p>
                <p className="text-xs text-cocoa/60">au service de votre éclat</p>
              </div>
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-blush"
              />
            </div>
          </div>
        </section>

        {/* ── Soins ── */}
        <section id="soins" className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-rose">
                La carte des soins
              </span>
              <h2 className="mt-3 font-display text-4xl font-semibold text-cocoa sm:text-5xl">
                Nos rituels de beauté
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SOINS.map((s) => (
                <div
                  key={s.title}
                  className="group overflow-hidden rounded-3xl bg-cream shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-rose">
                      {s.price}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-cocoa">
                      <s.icon size={18} className="text-rose" />
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-cocoa/65">
                      {s.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Avis ── */}
        <section id="avis" className="py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-rose">
                Elles en parlent
              </span>
              <h2 className="mt-3 font-display text-4xl font-semibold text-cocoa sm:text-5xl">
                Vos plus beaux compliments
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {AVIS.map((a) => (
                <div
                  key={a.name}
                  className="rounded-3xl bg-white p-7 shadow-sm"
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className="fill-rose text-rose" />
                    ))}
                  </div>
                  <p className="mt-4 font-display text-lg leading-relaxed text-cocoa/80">
                    « {a.text} »
                  </p>
                  <p className="mt-4 text-sm font-medium uppercase tracking-wider text-rose">
                    {a.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Infos pratiques ── */}
        <section id="infos" className="bg-blush py-20">
          <div className="mx-auto grid max-w-5xl gap-10 px-4 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-semibold text-cocoa sm:text-4xl">
                Horaires & accès
              </h2>
              <ul className="mt-6 space-y-3">
                {HORAIRES.map((h) => (
                  <li
                    key={h.j}
                    className="flex items-center justify-between border-b border-cocoa/10 pb-3 text-cocoa/80"
                  >
                    <span className="flex items-center gap-2">
                      <Clock size={15} className="text-rose" /> {h.j}
                    </span>
                    <span className="font-medium">{h.h}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-start gap-2 text-cocoa/70">
                <MapPin size={17} className="mt-0.5 shrink-0 text-rose" />
                12 avenue de la Résistance, 93340 Le Raincy
                <br />
              </p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-10 text-center shadow-sm">
              <h3 className="font-display text-2xl font-semibold text-cocoa">
                Réservez votre moment
              </h3>
              <p className="mt-2 text-sm text-cocoa/60">
                Par téléphone, on vous répond avec le sourire.
              </p>
              <a
                href={TEL}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-rose px-7 py-3.5 font-medium text-cream shadow-md transition-colors hover:bg-rosedark"
              >
                <Phone size={17} /> {PHONE}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-rose/15 bg-cream py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-cocoa/60 sm:flex-row">
          <span>
            © {new Date().getFullYear()} L’Écrin — Institut de beauté, Le Raincy
          </span>
          <a
            href="https://nex-web.fr"
            className="font-medium text-rose hover:underline"
          >
            Site de démonstration — créé par NEX-WEB
          </a>
        </div>
      </footer>
    </>
  )
}
