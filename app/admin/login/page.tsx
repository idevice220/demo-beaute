import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowLeft, KeyRound, ShieldCheck, RotateCcw } from 'lucide-react'
import { DEMO_EMAIL, DEMO_PASSWORD } from '@/lib/auth'
import { LoginForm } from '@/components/admin/LoginForm'

export const dynamic = 'force-dynamic'

export default function LoginPage({ searchParams }: { searchParams: { expired?: string } }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-cream px-4 py-10 text-ink">
      <div className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-terra-tint blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-sand-2 blur-3xl" aria-hidden />
      <div className="relative mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_440px] lg:items-center lg:py-16">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink"><ArrowLeft size={16} /> Retour au site</Link>
          <p className="eyebrow mt-8 text-terra">Démonstration NEX-WEB</p>
          <h1 className="mt-4 font-display text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl">
            L’espace <em className="italic text-terra">propriétaire</em> de L’Écrin.
          </h1>
          <p className="mt-5 max-w-lg text-lg font-light leading-relaxed text-muted">C’est l’envers du site : l’institut y gère son agenda, sa carte de soins, ses prix, son équipe et ses cartes cadeaux, depuis un téléphone. Entrez, touchez à tout.</p>
          <ul className="mt-6 space-y-2.5 text-[15px] text-ink/80">
            <li className="flex items-start gap-2.5"><KeyRound size={17} className="mt-0.5 shrink-0 text-terra" /> Accès libre : les identifiants sont déjà remplis.</li>
            <li className="flex items-start gap-2.5"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-terra" /> Vous travaillez sur votre propre copie : vos modifications ne sont visibles que par vous, immédiatement, sur le site.</li>
            <li className="flex items-start gap-2.5"><RotateCcw size={17} className="mt-0.5 shrink-0 text-terra" /> Votre copie s’efface après 24 h sans activité ; la version d’origine, elle, ne bouge jamais.</li>
          </ul>
        </div>

        <div className="rounded-3xl border hairline bg-white p-7 shadow-lift sm:p-8" style={{ ['--a' as string]: '#C4715A', ['--a-hover' as string]: '#A65A46', ['--a-ink' as string]: '#FBF8F3' }}>
          <p className="eyebrow text-muted">Connexion</p>
          <h2 className="mt-1 font-display text-4xl">L’Écrin</h2>
          {searchParams?.expired && <p className="mt-4 rounded-xl bg-terra-tint px-4 py-3 text-sm text-ink">Votre copie de démonstration a expiré. Entrez de nouveau : une copie neuve sera créée.</p>}
          <div className="mt-5">
            <Suspense>
              <LoginForm demoEmail={DEMO_EMAIL} demoPassword={DEMO_PASSWORD} />
            </Suspense>
          </div>
          <div className="mt-5 rounded-xl bg-sand p-4 text-sm text-muted">
            <p className="font-medium text-ink">Identifiants de démonstration</p>
            <p className="mt-1 font-mono text-[13px]">{DEMO_EMAIL}<br />mot de passe : {DEMO_PASSWORD}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
