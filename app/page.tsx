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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Carte />
        <Rituels />
        <Galerie />
        <Equipe />
        <Avis />
        <CarteCadeau />
        <Fidelite />
        <Infos />
        <Faq />
        <Newsletter />
      </main>
      <Footer />
      <Booking />
      <MobileBar />
      <DemoBadge />
    </>
  )
}
