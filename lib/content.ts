import { prisma } from './prisma'
import { ensureFresh } from './demo'
import { getSettings, toSite } from './settings'

export type SoinT = { id: number; categoryId: number; name: string; desc: string; min: number; price: number; signature: boolean; isNew: boolean }
export type CategoryT = { id: number; name: string; image: string; blurb: string; soins: SoinT[] }
export type RituelT = { id: number; name: string; sub: string; min: number; price: number; was: number | null; items: string[]; image: string }
export type TeamT = { id: number; name: string; role: string; spec: string; image: string; years: number }
export type TakenSlot = { date: string; time: string; staff: string }

/** Toutes les données de la page d'accueil, lues en base (après vérification de fraîcheur de la démo). */
export async function getSiteData() {
  await ensureFresh()
  const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' }))
  const from = today.toISOString().slice(0, 10)
  const [settings, categories, rituels, team, gallery, reviews, faq, bookings] = await Promise.all([
    getSettings(),
    prisma.category.findMany({ where: { visible: true }, orderBy: { order: 'asc' }, include: { soins: { where: { visible: true }, orderBy: { order: 'asc' } } } }),
    prisma.rituel.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }),
    prisma.teamMember.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }),
    prisma.galleryItem.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }),
    prisma.review.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }),
    prisma.faqItem.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }),
    prisma.booking.findMany({ where: { status: 'confirmed', date: { gte: from } }, select: { date: true, time: true, staff: true } }),
  ])
  return {
    site: toSite(settings),
    categories: categories.filter((c) => c.soins.length > 0) as CategoryT[],
    rituels: rituels as RituelT[],
    team: team as TeamT[],
    gallery,
    reviews,
    faq,
    taken: bookings as TakenSlot[],
  }
}
