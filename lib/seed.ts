import type { Prisma, PrismaClient } from '@prisma/client'
import { DEFAULT_SETTINGS, CATEGORIES, RITUELS, TEAM, GALLERY, REVIEWS, FAQ, BOOKINGS, GIFTS, SUBSCRIBERS } from './seed-data'

type Db = PrismaClient | Prisma.TransactionClient

async function wipe(db: Db, where: { tenant: string } | { tenant: { in: string[] } }) {
  const w = { where }
  await db.booking.deleteMany(w)
  await db.giftOrder.deleteMany(w)
  await db.subscriber.deleteMany(w)
  await db.soin.deleteMany(w)
  await db.category.deleteMany(w)
  await db.rituel.deleteMany(w)
  await db.teamMember.deleteMany(w)
  await db.galleryItem.deleteMany(w)
  await db.review.deleteMany(w)
  await db.faqItem.deleteMany(w)
  await db.media.deleteMany(w)
  await db.setting.deleteMany(w)
}

/** Supprime toutes les données d'une ou plusieurs copies. */
export async function deleteTenants(db: Db, ids: string[]) {
  await wipe(db, { tenant: { in: ids } })
  await db.tenant.deleteMany({ where: { id: { in: ids.filter((i) => i !== 'demo') } } })
}

/** Vide une copie et y réinjecte les données de démonstration. */
export async function seedTenant(db: Db, tenant: string) {
  await wipe(db, { tenant })
  await db.setting.createMany({ data: Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({ tenant, key, value })) })
  for (const [order, c] of CATEGORIES.entries()) {
    const { soins, ...rest } = c
    await db.category.create({ data: { ...rest, order, tenant, soins: { create: soins.map((s, i) => ({ ...s, order: i, tenant })) } } })
  }
  await db.rituel.createMany({ data: RITUELS.map((r, order) => ({ ...r, order, tenant })) })
  await db.teamMember.createMany({ data: TEAM.map((t, order) => ({ ...t, order, tenant })) })
  await db.galleryItem.createMany({ data: GALLERY.map((g, order) => ({ ...g, order, tenant })) })
  await db.review.createMany({ data: REVIEWS.map((r, order) => ({ ...r, order, tenant })) })
  await db.faqItem.createMany({ data: FAQ.map((f, order) => ({ ...f, order, tenant })) })
  await db.booking.createMany({ data: BOOKINGS.map((b) => ({ ...b, tenant })) })
  await db.giftOrder.createMany({ data: GIFTS.map((g) => ({ ...g, tenant })) })
  await db.subscriber.createMany({ data: SUBSCRIBERS.map((email) => ({ email, tenant })) })
}
