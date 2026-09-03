/**
 * Données de démonstration (institut fictif). Réinjectées à chaque remise à zéro de la démo.
 */
import type { HoursConfigRow } from './hours'

/** À incrémenter quand les données ci-dessous changent : la version d'origine est alors recréée au déploiement. */
export const SEED_VERSION = '2026-09-03.1'

export const DEFAULT_HOURS: HoursConfigRow[] = [
  { day: 1, closed: true, open: '09:30', close: '19:00' },
  { day: 2, closed: false, open: '09:30', close: '19:00' },
  { day: 3, closed: false, open: '09:30', close: '19:00' },
  { day: 4, closed: false, open: '09:30', close: '20:00', note: 'nocturne' },
  { day: 5, closed: false, open: '09:30', close: '19:00' },
  { day: 6, closed: false, open: '09:00', close: '18:00' },
  { day: 0, closed: true, open: '09:30', close: '19:00' },
]

export const DEFAULT_SETTINGS: Record<string, string> = {
  name: 'L’Écrin',
  tagline: 'Institut de beauté',
  city: 'Le Raincy',
  phone: '01 98 76 54 32',
  email: 'bonjour@lecrin-beaute.fr',
  address: '12 avenue de la Résistance, 93340 Le Raincy',
  maps: 'https://www.google.com/maps/search/?api=1&query=12+avenue+de+la+R%C3%A9sistance+93340+Le+Raincy',
  instagram: '#',
  instagram_handle: '@lecrin.leraincy',
  rating: '4.9',
  reviews_count: '212',
  since: '2015',
  hero_title: 'Prenez soin de vous,',
  hero_accent: 'vraiment.',
  hero_text: 'Un cocon au cœur du Raincy. Soins visage, massages, épilation, mains et regard, réalisés par trois praticiennes qui prennent le temps.',
  hero_image: '/images/hero.jpg',
  hero_card_title: 'Cabine duo',
  hero_card_text: 'et tisanerie pour prolonger',
  hero_badge: 'RÉSERVATION EN LIGNE · CARTES CADEAUX · ',
  marquee: 'Soins visage\nMassages\nÉpilation\nManucure\nRegard\nRituels signature\nCabine duo\nCartes cadeaux',
  offer_on: 'true',
  offer_text: 'Offre du moment · −20 % sur les rituels',
  gift_amounts: '50,80,120,150',
  fidelity_on: 'true',
  fidelity_title: 'Le 10e soin est offert.',
  fidelity_text: 'Votre carte se remplit toute seule à chaque rendez-vous, sans rien à présenter. Et quand vous parrainez une amie, vous recevez chacune 15 € sur le prochain soin.',
  access_train: 'RER E « Le Raincy – Villemomble », 3 min à pied',
  access_parking: 'Stationnement gratuit dans l’avenue',
  footer_text: 'Soins visage, corps, épilation, mains et regard. Réservation en ligne 24h/24, cartes cadeaux, cabine duo.',
  newsletter_title: 'Une fois par mois, nos conseils beauté et nos offres en avant-première.',
  hours: JSON.stringify(DEFAULT_HOURS),
}

export const CATEGORIES = [
  { name: 'Visage', image: '/images/visage.jpg', blurb: 'Des protocoles sur-mesure, des textures sensorielles.', soins: [
    { name: 'Soin éclat coup d’éclat', desc: 'Nettoyage, gommage enzymatique, masque illuminateur.', min: 45, price: 55 },
    { name: 'Rituel hydratation profonde', desc: 'Acide hyaluronique, modelage drainant, masque hydrogel.', min: 60, price: 79, signature: true },
    { name: 'Soin lift & fermeté', desc: 'Massage kobido, sérum peptides, masque tenseur.', min: 75, price: 95 },
    { name: 'Soin pureté peaux mixtes', desc: 'Extraction douce, argile, LED apaisante.', min: 60, price: 69, isNew: true },
  ] },
  { name: 'Corps', image: '/images/corps.jpg', blurb: 'Massages et rituels pour relâcher vraiment.', soins: [
    { name: 'Massage relaxant', desc: 'Huile tiède, manœuvres lentes et enveloppantes.', min: 60, price: 75 },
    { name: 'Rituel pierres chaudes', desc: 'Basalte chauffé, le grand lâcher-prise.', min: 75, price: 95, signature: true },
    { name: 'Gommage & enveloppement', desc: 'Sucre et huile d’argan, cocon chaud.', min: 45, price: 65 },
    { name: 'Massage dos & nuque', desc: 'Ciblé, profond, pour les journées d’écran.', min: 30, price: 45 },
  ] },
  { name: 'Épilation', image: '/images/epilation.jpg', blurb: 'Cire tiède ou fil, en douceur et sans attente.', soins: [
    { name: 'Jambes complètes', desc: 'Cire tiède à basse température.', min: 30, price: 32 },
    { name: 'Maillot échancré', desc: 'Cire douce, apaisant post-épilation.', min: 20, price: 22 },
    { name: 'Aisselles', desc: '', min: 10, price: 12 },
    { name: 'Sourcils au fil', desc: 'Restructuration précise.', min: 15, price: 14 },
  ] },
  { name: 'Mains & pieds', image: '/images/mains.jpg', blurb: 'Manucure, semi-permanent, soins réparateurs.', soins: [
    { name: 'Manucure soignée', desc: 'Limage, cuticules, modelage des mains.', min: 30, price: 32 },
    { name: 'Pose semi-permanent', desc: 'Tenue 3 semaines, 120 teintes.', min: 45, price: 42 },
    { name: 'Beauté des pieds spa', desc: 'Bain, gommage, masque, vernis.', min: 50, price: 49 },
  ] },
  { name: 'Regard', image: '/images/regard.jpg', blurb: 'Sourcils, cils : un regard structuré et naturel.', soins: [
    { name: 'Rehaussement de cils', desc: 'Courbure naturelle, effet 6 semaines.', min: 60, price: 65, isNew: true },
    { name: 'Brow lift', desc: 'Sourcils disciplinés et brossés.', min: 45, price: 55 },
    { name: 'Teinture cils & sourcils', desc: '', min: 20, price: 24 },
  ] },
]

export const RITUELS = [
  { name: 'Rituel Écrin', sub: 'Notre signature', min: 105, price: 139, was: 174, items: ['Rituel hydratation profonde', 'Massage dos & nuque', 'Tisane maison'], image: '/images/gal-1.jpg' },
  { name: 'Moment à deux', sub: 'Cabine duo', min: 75, price: 169, was: 190, items: ['Massage relaxant en duo', 'Gommage corps', 'Coupe de bulles'], image: '/images/gal-2.jpg' },
  { name: 'Éclat de mariée', sub: 'Programme 3 séances', min: 60, price: 219, was: 259, items: ['3 soins visage', 'Brow lift', 'Manucure J-1'], image: '/images/gal-3.jpg' },
]

export const TEAM = [
  { name: 'Camille', role: 'Fondatrice · esthéticienne', spec: 'Soins visage, kobido', image: '/images/team-1.jpg', years: 14 },
  { name: 'Inès', role: 'Esthéticienne', spec: 'Regard, épilation au fil', image: '/images/team-2.jpg', years: 6 },
  { name: 'Léa', role: 'Praticienne bien-être', spec: 'Massages, pierres chaudes', image: '/images/team-3.jpg', years: 8 },
]

export const GALLERY = [
  { src: '/images/gal-1.jpg', alt: 'Bougies et serviettes en cabine', tall: true },
  { src: '/images/gal-2.jpg', alt: 'Produits de soin', tall: false },
  { src: '/images/gal-3.jpg', alt: 'Détail de la cabine', tall: false },
  { src: '/images/gal-4.jpg', alt: 'Nuancier de vernis', tall: true },
  { src: '/images/gal-5.jpg', alt: 'Pierres chaudes', tall: false },
  { src: '/images/gal-6.jpg', alt: 'Fleurs à l’accueil', tall: false },
  { src: '/images/gal-7.jpg', alt: 'Masque visage', tall: false },
  { src: '/images/gal-8.jpg', alt: 'Instant de détente', tall: true },
]

export const REVIEWS = [
  { name: 'Élodie R.', date: 'il y a 1 semaine', text: 'Un vrai cocon. Le rituel hydratation est divin, et Camille prend le temps d’expliquer ce qui convient à ma peau. On ressort transformée.', soin: 'Rituel hydratation profonde' },
  { name: 'Nadia K.', date: 'il y a 3 semaines', text: 'Institut impeccable, accueil chaleureux, réservation en ligne en 30 secondes. Mon rendez-vous mensuel incontournable !', soin: 'Semi-permanent' },
  { name: 'Claire M.', date: 'il y a 1 mois', text: 'Le massage aux pierres chaudes de Léa est une merveille. J’ai dormi comme un bébé. Je reviens avec ma sœur.', soin: 'Rituel pierres chaudes' },
  { name: 'Sarah B.', date: 'il y a 1 mois', text: 'Rehaussement de cils parfait, naturel, exactement ce que je voulais. Inès est d’une précision folle.', soin: 'Rehaussement de cils' },
  { name: 'Julie P.', date: 'il y a 2 mois', text: 'Offert par mon mari en carte cadeau. Le moment à deux valait chaque euro. Cabine duo magnifique.', soin: 'Moment à deux' },
]

export const FAQ = [
  { q: 'Comment réserver ?', a: 'En ligne, 24h/24, depuis cette page : vous choisissez le soin, la praticienne, le créneau, et vous recevez une confirmation immédiate. Par téléphone aussi, aux heures d’ouverture.' },
  { q: 'Puis-je annuler ou déplacer ?', a: 'Oui, gratuitement jusqu’à 24 h avant, depuis le lien de votre confirmation. Passé ce délai, le soin est dû à 50 %.' },
  { q: 'Que dois-je prévoir avant un soin visage ?', a: 'Rien de particulier. Venez sans maquillage si possible, et 5 minutes en avance pour profiter d’une tisane.' },
  { q: 'Les cartes cadeaux ont-elles une date limite ?', a: 'Elles sont valables 12 mois, sur tous les soins et produits. Elles sont envoyées par e-mail immédiatement ou dans un joli écrin à retirer à l’institut.' },
  { q: 'Acceptez-vous les hommes ?', a: 'Bien sûr : massages, soins visage et épilation. Un tiers de nos clients sont des hommes.' },
  { q: 'Y a-t-il un parking ?', a: 'Places gratuites avenue de la Résistance et parking de la gare RER à 3 minutes à pied.' },
]

const pad = (n: number) => String(n).padStart(2, '0')
/** Date AAAA-MM-JJ à J+n (heure de Paris), en évitant dimanche et lundi (institut fermé). */
export function dayPlus(n: number) {
  const d = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' }))
  d.setDate(d.getDate() + n)
  while ([0, 1].includes(d.getDay())) d.setDate(d.getDate() + 1)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
const ago = (h: number) => new Date(Date.now() - h * 3_600_000)

/** Rendez-vous déjà pris, pour que l'agenda de la démo soit vivant. */
export const BOOKINGS = [
  { item: 'Rituel hydratation profonde', staff: 'Camille', date: dayPlus(0), time: '10:00', duration: 60, price: 79, name: 'Élodie Rousseau', email: 'elodie.r@exemple.fr', phone: '06 12 45 78 90', note: null, status: 'confirmed', createdAt: ago(30) },
  { item: 'Pose semi-permanent', staff: 'Inès', date: dayPlus(0), time: '11:30', duration: 45, price: 42, name: 'Nadia Khelifi', email: 'nadia.k@exemple.fr', phone: '06 98 76 54 32', note: 'Teinte nude si possible', status: 'confirmed', createdAt: ago(52) },
  { item: 'Rituel pierres chaudes', staff: 'Léa', date: dayPlus(0), time: '15:00', duration: 75, price: 95, name: 'Claire Morel', email: 'claire.m@exemple.fr', phone: '06 45 32 10 98', note: null, status: 'confirmed', createdAt: ago(6) },
  { item: 'Rehaussement de cils', staff: 'Inès', date: dayPlus(1), time: '10:30', duration: 60, price: 65, name: 'Sarah Benali', email: 'sarah.b@exemple.fr', phone: '07 11 22 33 44', note: null, status: 'confirmed', createdAt: ago(20) },
  { item: 'Moment à deux', staff: 'Sans préférence', date: dayPlus(1), time: '17:00', duration: 75, price: 169, name: 'Julie & Marc Petit', email: 'julie.p@exemple.fr', phone: '06 77 88 99 00', note: 'Cadeau d’anniversaire, merci de ne rien dire !', status: 'confirmed', createdAt: ago(1) },
  { item: 'Massage relaxant', staff: 'Léa', date: dayPlus(2), time: '14:00', duration: 60, price: 75, name: 'Thomas Girard', email: 'thomas.g@exemple.fr', phone: '06 55 44 33 22', note: null, status: 'confirmed', createdAt: ago(3) },
  { item: 'Soin éclat coup d’éclat', staff: 'Camille', date: dayPlus(3), time: '16:30', duration: 45, price: 55, name: 'Manon Lefèvre', email: 'manon.l@exemple.fr', phone: '06 10 20 30 40', note: null, status: 'confirmed', createdAt: ago(0.5) },
  { item: 'Jambes complètes', staff: 'Inès', date: dayPlus(-2), time: '09:30', duration: 30, price: 32, name: 'Inaya Diallo', email: 'inaya.d@exemple.fr', phone: '06 31 41 51 61', note: null, status: 'done', createdAt: ago(90) },
  { item: 'Brow lift', staff: 'Inès', date: dayPlus(-1), time: '18:00', duration: 45, price: 55, name: 'Camille Dubois', email: 'cam.d@exemple.fr', phone: '06 71 81 91 01', note: null, status: 'cancelled', createdAt: ago(70) },
]

export const GIFTS = [
  { amount: 120, to: 'Maman', from: 'Julie', message: 'Joyeux anniversaire, prends soin de toi', mode: 'email', status: 'new', createdAt: ago(4) },
  { amount: 80, to: 'Sophie', from: 'Karim', message: null, mode: 'ecrin', status: 'new', createdAt: ago(28) },
  { amount: 150, to: 'Laura', from: 'Ses collègues', message: 'Pour ta nouvelle vie !', mode: 'email', status: 'sent', createdAt: ago(100) },
]

export const SUBSCRIBERS = ['elodie.r@exemple.fr', 'nadia.k@exemple.fr', 'marie.dupont@exemple.fr', 'thomas.g@exemple.fr', 'lea.martin@exemple.fr']
