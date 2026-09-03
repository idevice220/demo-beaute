import { requireSession } from '@/lib/auth'
import { getSettings } from '@/lib/settings'
import { SettingsForm, type SettingsGroup } from '@/components/admin/SettingsForm'
import { PageHeader } from '@/components/admin/ui'

export const dynamic = 'force-dynamic'

const GROUPS: SettingsGroup[] = [
  {
    title: 'Identité & contact',
    description: 'En-tête, pied de page, section infos, boutons d’appel et d’itinéraire.',
    fields: [
      { key: 'name', label: 'Nom de l’institut', type: 'text', required: true, half: true },
      { key: 'tagline', label: 'Sous-titre', type: 'text', half: true, placeholder: 'Institut de beauté' },
      { key: 'city', label: 'Ville', type: 'text', half: true },
      { key: 'since', label: 'Depuis (année)', type: 'text', half: true, placeholder: '2015' },
      { key: 'phone', label: 'Téléphone', type: 'text', required: true, half: true },
      { key: 'email', label: 'E-mail', type: 'text', half: true },
      { key: 'address', label: 'Adresse', type: 'text' },
      { key: 'maps', label: 'Lien Google Maps (itinéraire)', type: 'text' },
      { key: 'instagram', label: 'Lien Instagram', type: 'text', half: true, placeholder: 'https://instagram.com/…' },
      { key: 'instagram_handle', label: 'Pseudo Instagram affiché', type: 'text', half: true, placeholder: '@lecrin.leraincy' },
    ],
  },
  {
    title: 'Chiffres affichés',
    fields: [
      { key: 'rating', label: 'Note Google', type: 'text', half: true, placeholder: '4.9' },
      { key: 'reviews_count', label: 'Nombre d’avis', type: 'number', half: true },
    ],
  },
  {
    title: 'Page d’accueil',
    description: 'Le grand titre, la photo dans l’arche et le petit encart en bas à droite.',
    fields: [
      { key: 'hero_title', label: 'Titre', type: 'text', half: true, placeholder: 'Prenez soin de vous,' },
      { key: 'hero_accent', label: 'Fin du titre (en italique couleur)', type: 'text', half: true, placeholder: 'vraiment.' },
      { key: 'hero_text', label: 'Texte d’accroche', type: 'textarea', rows: 3 },
      { key: 'hero_card_title', label: 'Encart : titre', type: 'text', half: true, placeholder: 'Cabine duo' },
      { key: 'hero_card_text', label: 'Encart : sous-titre', type: 'text', half: true, placeholder: 'et tisanerie pour prolonger' },
      { key: 'hero_badge', label: 'Texte du badge tournant', type: 'text', help: 'En majuscules, terminé par « · » pour boucler joliment.' },
      { key: 'hero_image', label: 'Photo de l’arche', type: 'image' },
      { key: 'marquee', label: 'Bandeau défilant (une ligne par mot)', type: 'lines', rows: 4 },
    ],
  },
  {
    title: 'Offre du moment & fidélité',
    fields: [
      { key: 'offer_on', label: 'Afficher l’offre du moment (avec compte à rebours jusqu’à la fin du mois)', type: 'toggle' },
      { key: 'offer_text', label: 'Texte de l’offre', type: 'text', placeholder: 'Offre du moment · −20 % sur les rituels' },
      { key: 'fidelity_on', label: 'Afficher la section fidélité', type: 'toggle' },
      { key: 'fidelity_title', label: 'Titre fidélité', type: 'text' },
      { key: 'fidelity_text', label: 'Texte fidélité', type: 'textarea', rows: 3 },
    ],
  },
  {
    title: 'Cartes cadeaux, accès, pied de page',
    fields: [
      { key: 'gift_amounts', label: 'Montants proposés (€, séparés par des virgules)', type: 'text', placeholder: '50,80,120,150' },
      { key: 'access_train', label: 'Accès transports', type: 'text' },
      { key: 'access_parking', label: 'Stationnement', type: 'text' },
      { key: 'newsletter_title', label: 'Titre de la newsletter', type: 'text' },
      { key: 'footer_text', label: 'Texte du pied de page', type: 'textarea', rows: 2 },
    ],
  },
]

export default async function ReglagesPage() {
  const { tenant } = await requireSession()
  const settings = await getSettings(tenant)
  return (
    <div>
      <PageHeader title="Réglages & textes" description="Coordonnées, titres, offre du moment : tout ce qui n’est pas une liste se modifie ici." />
      <SettingsForm groups={GROUPS} initial={settings} />
    </div>
  )
}
