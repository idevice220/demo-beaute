/**
 * Copies de démonstration par visiteur.
 *
 * - La version d'origine (tenant "demo") est en lecture seule : c'est ce que voit tout visiteur anonyme.
 * - Dès qu'une personne entre dans l'espace propriétaire (ou envoie un formulaire), elle reçoit sa propre
 *   copie complète des données, identifiée par un cookie. Ses modifications ne sont visibles que par elle.
 * - Les copies inactives depuis TENANT_TTL_HOURS sont supprimées.
 */
import { cookies } from 'next/headers'
import type { NextResponse } from 'next/server'
import { createId } from '@paralleldrive/cuid2'
import { prisma } from './prisma'
import { seedTenant, deleteTenants } from './seed'
import { SEED_VERSION } from './seed-data'

export const BASE = 'demo'
export const TENANT_COOKIE = 'demo-tenant'
export const TENANT_TTL_HOURS = 24
const SWEEP_MINUTES = 10
const TOUCH_MINUTES = 10
const ID_RE = /^[a-z0-9]{16,40}$/

export function tenantCookieOptions() {
  return { httpOnly: true, sameSite: 'lax' as const, secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 24 * 30 }
}

/** Version d'origine prête (créée au premier appel, recréée si les données de démo ont changé) + nettoyage périodique. */
export async function ensureBase() {
  const base = await prisma.tenant.findUnique({ where: { id: BASE } })
  if (!base || base.seedVersion !== SEED_VERSION) {
    await prisma.$transaction(
      async (tx) => {
        await tx.$executeRaw`SELECT pg_advisory_xact_lock(424242)`
        const b = await tx.tenant.findUnique({ where: { id: BASE } })
        if (b && b.seedVersion === SEED_VERSION) return
        await seedTenant(tx, BASE)
        await tx.tenant.upsert({ where: { id: BASE }, update: { seedVersion: SEED_VERSION }, create: { id: BASE, seedVersion: SEED_VERSION } })
      },
      { timeout: 60_000 }
    )
  }
  await sweepTenants()
}

/** Supprime les copies inactives (au plus une fois toutes les SWEEP_MINUTES). */
async function sweepTenants() {
  const cutoff = new Date(Date.now() - SWEEP_MINUTES * 60_000)
  const claimed = await prisma.meta.updateMany({ where: { id: 1, lastSweep: { lt: cutoff } }, data: { lastSweep: new Date() } })
  if (claimed.count === 0) {
    const exists = await prisma.meta.findUnique({ where: { id: 1 } })
    if (exists) return
    await prisma.meta.createMany({ data: [{ id: 1 }], skipDuplicates: true })
  }
  const stale = await prisma.tenant.findMany({ where: { id: { not: BASE }, lastSeen: { lt: new Date(Date.now() - TENANT_TTL_HOURS * 3_600_000) } }, select: { id: true } })
  if (stale.length) await deleteTenants(prisma, stale.map((t) => t.id))
}

/** Identifiant de copie lu dans le cookie, validé en base. Sinon la version d'origine. */
export async function readTenant(): Promise<string> {
  const id = cookies().get(TENANT_COOKIE)?.value
  if (!id || !ID_RE.test(id)) return BASE
  const t = await prisma.tenant.findUnique({ where: { id } })
  if (!t) return BASE
  await touch(t.id, t.lastSeen)
  return t.id
}

/** Vérifie qu'une copie existe encore (session d'administration) et note l'activité. */
export async function tenantAlive(id: string): Promise<{ id: string; createdAt: Date } | null> {
  if (id === BASE || !ID_RE.test(id)) return null
  const t = await prisma.tenant.findUnique({ where: { id } })
  if (!t) return null
  await touch(t.id, t.lastSeen)
  return { id: t.id, createdAt: t.createdAt }
}

async function touch(id: string, lastSeen: Date) {
  if (Date.now() - lastSeen.getTime() > TOUCH_MINUTES * 60_000) await prisma.tenant.update({ where: { id }, data: { lastSeen: new Date() } })
}

/** Crée une copie privée complète des données de démonstration. */
export async function createTenant(): Promise<string> {
  const id = createId()
  await prisma.$transaction(async (tx) => {
    await tx.tenant.create({ data: { id, seedVersion: SEED_VERSION } })
    await seedTenant(tx, id)
  }, { timeout: 60_000 })
  return id
}

/** Copie du visiteur courant, créée si nécessaire ; le cookie est posé sur la réponse. */
export async function getOrCreateTenant(res: NextResponse): Promise<string> {
  await ensureBase()
  const current = cookies().get(TENANT_COOKIE)?.value
  if (current && ID_RE.test(current)) {
    const t = await prisma.tenant.findUnique({ where: { id: current } })
    if (t) { await touch(t.id, t.lastSeen); return t.id }
  }
  const id = await createTenant()
  res.cookies.set(TENANT_COOKIE, id, tenantCookieOptions())
  return id
}

/** Remet la copie du visiteur à l'état initial. */
export async function resetTenant(id: string) {
  if (id === BASE) throw new Error('La version d’origine ne se modifie pas')
  await prisma.$transaction(async (tx) => { await seedTenant(tx, id) }, { timeout: 60_000 })
}

/** Nombre maximal d'éléments qu'un visiteur peut créer par table (anti-abus). */
export const QUOTA = { rows: 200, media: 30, inbox: 300 }
