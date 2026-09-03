/**
 * Description des formulaires de l'espace propriétaire (importable côté client).
 */
export type FieldType = 'text' | 'textarea' | 'number' | 'toggle' | 'select' | 'image' | 'lines'
export type Option = { value: string | number; label: string }
export type Field = {
  key: string
  label: string
  type: FieldType
  required?: boolean
  help?: string
  placeholder?: string
  options?: Option[]
  half?: boolean
  min?: number
  max?: number
  step?: number
  rows?: number
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Row = Record<string, any> & { id: number }

export type CollectionUI = {
  title: string
  singular: string
  description: string
  fields: Field[]
  titleKey: string
  subtitleKeys?: string[]
  imageKey?: string
  badgeKey?: string
  toggleKey?: string
  groupBy?: string
  addLabel?: string
}

export const COLLECTIONS: Record<string, CollectionUI> = {
  categories: {
    title: 'Catégories de soins', singular: 'une catégorie', description: 'Les onglets de la carte (Visage, Corps…), avec leur photo et leur phrase d’accroche.',
    titleKey: 'name', subtitleKeys: ['blurb'], imageKey: 'image', toggleKey: 'visible',
    fields: [
      { key: 'name', label: 'Nom', type: 'text', required: true },
      { key: 'blurb', label: 'Phrase d’accroche', type: 'text', placeholder: 'Des protocoles sur-mesure, des textures sensorielles.' },
      { key: 'image', label: 'Photo', type: 'image', required: true },
    ],
  },
  soins: {
    title: 'Soins', singular: 'un soin', description: 'Chaque soin avec sa durée et son prix. Il apparaît sur la carte et dans le module de réservation.',
    titleKey: 'name', subtitleKeys: ['desc'], badgeKey: 'priceMin', toggleKey: 'visible', groupBy: 'categoryId',
    fields: [
      { key: 'categoryId', label: 'Catégorie', type: 'select', required: true },
      { key: 'name', label: 'Nom du soin', type: 'text', required: true },
      { key: 'desc', label: 'Description courte', type: 'text', placeholder: 'Nettoyage, gommage enzymatique, masque illuminateur.' },
      { key: 'min', label: 'Durée (minutes)', type: 'number', required: true, half: true, min: 5, step: 5 },
      { key: 'price', label: 'Prix (€)', type: 'number', required: true, half: true, min: 0, step: 1 },
      { key: 'signature', label: 'Soin signature', type: 'toggle', help: 'Affiche le badge « Signature ».' },
      { key: 'isNew', label: 'Nouveauté', type: 'toggle', help: 'Affiche le badge « Nouveau ».' },
    ],
  },
  rituels: {
    title: 'Rituels signature', singular: 'un rituel', description: 'Les parcours composés, avec leur prix barré et ce qu’ils comprennent.',
    titleKey: 'name', subtitleKeys: ['sub'], imageKey: 'image', badgeKey: 'priceWas', toggleKey: 'visible',
    fields: [
      { key: 'name', label: 'Nom', type: 'text', required: true, half: true },
      { key: 'sub', label: 'Sous-titre', type: 'text', required: true, half: true, placeholder: 'Notre signature' },
      { key: 'min', label: 'Durée (minutes)', type: 'number', required: true, half: true, min: 5, step: 5 },
      { key: 'price', label: 'Prix (€)', type: 'number', required: true, half: true, min: 0 },
      { key: 'was', label: 'Ancien prix barré (€)', type: 'number', half: true, min: 0, help: 'Laisser vide pour ne rien barrer.' },
      { key: 'items', label: 'Ce qui est compris (une ligne par élément)', type: 'lines', rows: 3 },
      { key: 'image', label: 'Photo', type: 'image', required: true },
    ],
  },
  team: {
    title: 'L’équipe', singular: 'une praticienne', description: 'Les praticiennes présentées sur le site et proposées à la réservation.',
    titleKey: 'name', subtitleKeys: ['role', 'spec'], imageKey: 'image', badgeKey: 'yearsLabel', toggleKey: 'visible',
    fields: [
      { key: 'name', label: 'Prénom', type: 'text', required: true, half: true },
      { key: 'years', label: 'Années d’expérience', type: 'number', required: true, half: true, min: 0 },
      { key: 'role', label: 'Rôle', type: 'text', required: true, placeholder: 'Esthéticienne' },
      { key: 'spec', label: 'Spécialités', type: 'text', required: true, placeholder: 'Regard, épilation au fil' },
      { key: 'image', label: 'Portrait', type: 'image', required: true },
    ],
  },
  gallery: {
    title: 'Galerie', singular: 'une photo', description: 'Les photos de l’institut affichées en mosaïque.',
    titleKey: 'alt', imageKey: 'src', toggleKey: 'visible',
    fields: [
      { key: 'src', label: 'Photo', type: 'image', required: true },
      { key: 'alt', label: 'Légende', type: 'text', required: true, placeholder: 'Bougies et serviettes en cabine' },
      { key: 'tall', label: 'Format portrait (haut)', type: 'toggle' },
    ],
  },
  reviews: {
    title: 'Avis clientes', singular: 'un avis', description: 'Les témoignages affichés sur le site.',
    titleKey: 'name', subtitleKeys: ['date', 'soin'], toggleKey: 'visible',
    fields: [
      { key: 'name', label: 'Nom', type: 'text', required: true, half: true, placeholder: 'Élodie R.' },
      { key: 'date', label: 'Quand', type: 'text', required: true, half: true, placeholder: 'il y a 1 semaine' },
      { key: 'soin', label: 'Soin concerné', type: 'text', required: true },
      { key: 'rating', label: 'Note (1 à 5)', type: 'number', min: 1, max: 5 },
      { key: 'text', label: 'Texte de l’avis', type: 'textarea', required: true, rows: 4 },
    ],
  },
  faq: {
    title: 'Questions fréquentes', singular: 'une question', description: 'Les questions/réponses affichées en bas de page.',
    titleKey: 'q', subtitleKeys: ['a'], toggleKey: 'visible',
    fields: [
      { key: 'q', label: 'Question', type: 'text', required: true },
      { key: 'a', label: 'Réponse', type: 'textarea', required: true, rows: 4 },
    ],
  },
}

const eur = (n: number) => `${Number(n).toLocaleString('fr-FR')} €`

/** Libellés dérivés pour les badges de liste. */
export function badgeOf(resource: string, row: Row): string | null {
  const ui = COLLECTIONS[resource]
  if (!ui?.badgeKey) return null
  switch (ui.badgeKey) {
    case 'priceMin': return `${eur(row.price)} · ${row.min} min`
    case 'priceWas': return row.was ? `${eur(row.price)} au lieu de ${eur(row.was)}` : eur(row.price)
    case 'yearsLabel': return `${row.years} ans`
    default: return row[ui.badgeKey] ? String(row[ui.badgeKey]) : null
  }
}
