import type { Prisma, PrismaClient } from '@prisma/client'
import { DEFAULT_SETTINGS, CATEGORIES, RITUELS, TEAM, GALLERY, REVIEWS, FAQ, BOOKINGS, GIFTS, SUBSCRIBERS } from './seed-data'

type Db = PrismaClient | Prisma.TransactionClient

/** Vide toutes les tables et réinjecte les données de démonstration. */
export async function seedAll(db: Db) {
  await db.booking.deleteMany()
  await db.giftOrder.deleteMany()
  await db.subscriber.deleteMany()
  await db.soin.deleteMany()
  await db.category.deleteMany()
  await db.rituel.deleteMany()
  await db.teamMember.deleteMany()
  await db.galleryItem.deleteMany()
  await db.review.deleteMany()
  await db.faqItem.deleteMany()
  await db.media.deleteMany()
  await db.setting.deleteMany()

  await db.setting.createMany({ data: Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({ key, value })) })
  for (const [order, c] of CATEGORIES.entries()) {
    const { soins, ...rest } = c
    await db.category.create({ data: { ...rest, order, soins: { create: soins.map((s, i) => ({ ...s, order: i })) } } })
  }
  await db.rituel.createMany({ data: RITUELS.map((r, order) => ({ ...r, order })) })
  await db.teamMember.createMany({ data: TEAM.map((t, order) => ({ ...t, order })) })
  await db.galleryItem.createMany({ data: GALLERY.map((g, order) => ({ ...g, order })) })
  await db.review.createMany({ data: REVIEWS.map((r, order) => ({ ...r, order })) })
  await db.faqItem.createMany({ data: FAQ.map((f, order) => ({ ...f, order })) })
  await db.booking.createMany({ data: BOOKINGS })
  await db.giftOrder.createMany({ data: GIFTS })
  await db.subscriber.createMany({ data: SUBSCRIBERS.map((email) => ({ email })) })
  await db.meta.upsert({ where: { id: 1 }, update: { lastReset: new Date() }, create: { id: 1, lastReset: new Date() } })
}
