import { getSiteData } from '@/lib/content'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Marquee } from '@/components/Marquee'
import { Carte } from '@/components/Carte'
import { Rituels } from '@/components/Rituels'
import { Galerie } from '@/components/Galerie'
import { Equipe } from '@/components/Equipe'
import { Avis } from '@/components/Avis'
import { CarteCadeau } from '@/components/CarteCadeau'
import { Fidelite } from '@/components/Fidelite'
import { Infos } from '@/components/Infos'
import { Faq } from '@/components/Faq'
import { Newsletter } from '@/components/Newsletter'
import { Footer } from '@/components/Footer'
import { Booking } from '@/components/Booking'
import { MobileBar } from '@/components/MobileBar'
import { DemoBadge } from '@/components/DemoBadge'
import { TenantBar } from '@/components/TenantBar'

// Tout le contenu vient de la base (espace propriétaire) : rendu à chaque requête.
export const dynamic = 'force-dynamic'

export default async function Home() {
  const d = await getSiteData()
  return (
    <>
      {d.personal && <TenantBar />}
      <Header site={d.site} />
      <main>
        <Hero site={d.site} />
        <Marquee items={d.site.marquee} />
        <Carte categories={d.categories} />
        <Rituels rituels={d.rituels} offer={d.site.offer} />
        <Galerie items={d.gallery} site={d.site} />
        <Equipe team={d.team} />
        <Avis reviews={d.reviews} site={d.site} />
        <CarteCadeau amounts={d.site.giftAmounts} />
        <Fidelite fidelity={d.site.fidelity} />
        <Infos site={d.site} />
        <Faq items={d.faq} />
        <Newsletter title={d.site.newsletterTitle} />
      </main>
      <Footer site={d.site} />
      <Booking categories={d.categories} rituels={d.rituels} team={d.team} site={d.site} taken={d.taken} />
      <MobileBar site={d.site} />
      <DemoBadge />
    </>
  )
}
