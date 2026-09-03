/**
 * Données de démonstration — institut fictif.
 */
export const BUSINESS = {
  name: 'L’Écrin',
  tagline: 'Institut de beauté · Le Raincy',
  phone: '01 98 76 54 32',
  tel: 'tel:+33198765432',
  email: 'bonjour@lecrin-beaute.fr',
  address: '12 avenue de la Résistance, 93340 Le Raincy',
  maps: 'https://www.google.com/maps/search/?api=1&query=12+avenue+de+la+R%C3%A9sistance+93340+Le+Raincy',
  instagram: '#',
  rating: 4.9,
  reviews: 212,
  since: 2015,
}

/** Horaires (0 = dimanche … 6 = samedi), en heures décimales */
export const HOURS: Record<number, { open: number; close: number } | null> = {
  0: null,
  1: null,
  2: { open: 9.5, close: 19 },
  3: { open: 9.5, close: 19 },
  4: { open: 9.5, close: 20 },
  5: { open: 9.5, close: 19 },
  6: { open: 9, close: 18 },
}
export const HOURS_LABEL = [
  { d: 'Mardi, mercredi, vendredi', h: '9h30 – 19h00' },
  { d: 'Jeudi', h: '9h30 – 20h00', note: 'nocturne' },
  { d: 'Samedi', h: '9h00 – 18h00' },
  { d: 'Dimanche & lundi', h: 'Fermé' },
]

export type Category = 'Visage' | 'Corps' | 'Épilation' | 'Mains & pieds' | 'Regard'
export const CATEGORIES: { id: Category; image: string; blurb: string }[] = [
  { id: 'Visage', image: '/images/visage.jpg', blurb: 'Des protocoles sur-mesure, des textures sensorielles.' },
  { id: 'Corps', image: '/images/corps.jpg', blurb: 'Massages et rituels pour relâcher vraiment.' },
  { id: 'Épilation', image: '/images/epilation.jpg', blurb: 'Cire tiède ou fil, en douceur et sans attente.' },
  { id: 'Mains & pieds', image: '/images/mains.jpg', blurb: 'Manucure, semi-permanent, soins réparateurs.' },
  { id: 'Regard', image: '/images/regard.jpg', blurb: 'Sourcils, cils : un regard structuré et naturel.' },
]

export type Soin = { id: string; cat: Category; name: string; desc: string; min: number; price: number; signature?: boolean; new?: boolean }
export const SOINS: Soin[] = [
  { id: 'v-eclat', cat: 'Visage', name: 'Soin éclat coup d’éclat', desc: 'Nettoyage, gommage enzymatique, masque illuminateur.', min: 45, price: 55 },
  { id: 'v-hydra', cat: 'Visage', name: 'Rituel hydratation profonde', desc: 'Acide hyaluronique, modelage drainant, masque hydrogel.', min: 60, price: 79, signature: true },
  { id: 'v-age', cat: 'Visage', name: 'Soin lift & fermeté', desc: 'Massage kobido, sérum peptides, masque tenseur.', min: 75, price: 95 },
  { id: 'v-purete', cat: 'Visage', name: 'Soin pureté peaux mixtes', desc: 'Extraction douce, argile, LED apaisante.', min: 60, price: 69, new: true },
  { id: 'c-relax', cat: 'Corps', name: 'Massage relaxant', desc: 'Huile tiède, manœuvres lentes et enveloppantes.', min: 60, price: 75 },
  { id: 'c-pierres', cat: 'Corps', name: 'Rituel pierres chaudes', desc: 'Basalte chauffé, le grand lâcher-prise.', min: 75, price: 95, signature: true },
  { id: 'c-gommage', cat: 'Corps', name: 'Gommage & enveloppement', desc: 'Sucre et huile d’argan, cocon chaud.', min: 45, price: 65 },
  { id: 'c-dos', cat: 'Corps', name: 'Massage dos & nuque', desc: 'Ciblé, profond, pour les journées d’écran.', min: 30, price: 45 },
  { id: 'e-jambes', cat: 'Épilation', name: 'Jambes complètes', desc: 'Cire tiède à basse température.', min: 30, price: 32 },
  { id: 'e-maillot', cat: 'Épilation', name: 'Maillot échancré', desc: 'Cire douce, apaisant post-épilation.', min: 20, price: 22 },
  { id: 'e-aisselles', cat: 'Épilation', name: 'Aisselles', desc: '', min: 10, price: 12 },
  { id: 'e-sourcils', cat: 'Épilation', name: 'Sourcils au fil', desc: 'Restructuration précise.', min: 15, price: 14 },
  { id: 'm-manucure', cat: 'Mains & pieds', name: 'Manucure soignée', desc: 'Limage, cuticules, modelage des mains.', min: 30, price: 32 },
  { id: 'm-semi', cat: 'Mains & pieds', name: 'Pose semi-permanent', desc: 'Tenue 3 semaines, 120 teintes.', min: 45, price: 42 },
  { id: 'm-pieds', cat: 'Mains & pieds', name: 'Beauté des pieds spa', desc: 'Bain, gommage, masque, vernis.', min: 50, price: 49 },
  { id: 'r-cils', cat: 'Regard', name: 'Rehaussement de cils', desc: 'Courbure naturelle, effet 6 semaines.', min: 60, price: 65, new: true },
  { id: 'r-brow', cat: 'Regard', name: 'Brow lift', desc: 'Sourcils disciplinés et brossés.', min: 45, price: 55 },
  { id: 'r-teinture', cat: 'Regard', name: 'Teinture cils & sourcils', desc: '', min: 20, price: 24 },
]

export const RITUELS = [
  { id: 'rit-signature', name: 'Rituel Écrin', sub: 'Notre signature', min: 105, price: 139, was: 174, items: ['Rituel hydratation profonde', 'Massage dos & nuque', 'Tisane maison'], image: '/images/gal-1.jpg' },
  { id: 'rit-duo', name: 'Moment à deux', sub: 'Cabine duo', min: 75, price: 169, was: 190, items: ['Massage relaxant en duo', 'Gommage corps', 'Coupe de bulles'], image: '/images/gal-2.jpg' },
  { id: 'rit-mariee', name: 'Éclat de mariée', sub: 'Programme 3 séances', min: 60, price: 219, was: 259, items: ['3 soins visage', 'Brow lift', 'Manucure J-1'], image: '/images/gal-3.jpg' },
]

export const TEAM = [
  { name: 'Camille', role: 'Fondatrice · esthéticienne', spec: 'Soins visage, kobido', image: '/images/team-1.jpg', years: 14 },
  { name: 'Inès', role: 'Esthéticienne', spec: 'Regard, épilation au fil', image: '/images/team-2.jpg', years: 6 },
  { name: 'Léa', role: 'Praticienne bien-être', spec: 'Massages, pierres chaudes', image: '/images/team-3.jpg', years: 8 },
]

export const GALLERY = [
  { src: '/images/gal-1.jpg', alt: 'Bougies et serviettes en cabine', tall: true },
  { src: '/images/gal-2.jpg', alt: 'Produits de soin' },
  { src: '/images/gal-3.jpg', alt: 'Détail de la cabine' },
  { src: '/images/gal-4.jpg', alt: 'Nuancier de vernis', tall: true },
  { src: '/images/gal-5.jpg', alt: 'Pierres chaudes' },
  { src: '/images/gal-6.jpg', alt: 'Fleurs à l’accueil' },
  { src: '/images/gal-7.jpg', alt: 'Masque visage' },
  { src: '/images/gal-8.jpg', alt: 'Instant de détente', tall: true },
]

export const AVIS = [
  { name: 'Élodie R.', date: 'il y a 1 semaine', text: 'Un vrai cocon. Le rituel hydratation est divin, et Camille prend le temps d’expliquer ce qui convient à ma peau. On ressort transformée.', soin: 'Rituel hydratation profonde' },
  { name: 'Nadia K.', date: 'il y a 3 semaines', text: 'Institut impeccable, accueil chaleureux, réservation en ligne en 30 secondes. Mon rendez-vous mensuel incontournable !', soin: 'Semi-permanent' },
  { name: 'Claire M.', date: 'il y a 1 mois', text: 'Le massage aux pierres chaudes de Léa est une merveille. J’ai dormi comme un bébé. Je reviens avec ma sœur.', soin: 'Rituel pierres chaudes' },
  { name: 'Sarah B.', date: 'il y a 1 mois', text: 'Rehaussement de cils parfait, naturel, exactement ce que je voulais. Inès est d’une précision folle.', soin: 'Rehaussement de cils' },
  { name: 'Julie P.', date: 'il y a 2 mois', text: 'Offert par mon mari en carte cadeau. Le moment à deux valait chaque euro. Cabine duo magnifique.', soin: 'Moment à deux' },
]

export const FAQ = [
  { q: 'Comment réserver ?', a: 'En ligne, 24h/24, depuis cette page : vous choisissez le soin, la praticienne, le créneau, et vous recevez une confirmation immédiate. Par téléphone aussi, aux heures d’ouverture.' },
  { q: 'Puis-je annuler ou déplacer ?', a: 'Oui, gratuitement jusqu’à 24 h avant, depuis le lien de votre confirmation. Passé ce délai, le soin est dû à 50 %.' },
  { q: 'Que dois-je prévoir avant un soin visage ?', a: 'Rien de particulier. Venez sans maquillage si possible, et 5 minutes en avance pour profiter d’une tisane.' },
  { q: 'Les cartes cadeaux ont-elles une date limite ?', a: 'Elles sont valables 12 mois, sur tous les soins et produits. Elles sont envoyées par e-mail immédiatement ou dans un joli écrin à retirer à l’institut.' },
  { q: 'Acceptez-vous les hommes ?', a: 'Bien sûr : massages, soins visage et épilation. Un tiers de nos clients sont des hommes.' },
  { q: 'Y a-t-il un parking ?', a: 'Places gratuites avenue de la Résistance et parking de la gare RER à 3 minutes à pied.' },
]

export const GIFT_AMOUNTS = [50, 80, 120, 150]
