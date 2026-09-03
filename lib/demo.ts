import { prisma } from './prisma'
import { seedAll } from './seed'

/** Durée de vie d'une session de démo : au-delà, les données reviennent à l'état initial. */
export const RESET_MINUTES = 120

/**
 * Garantit une démo prête : crée les données au premier appel, et les remet à zéro
 * si la dernière remise à zéro date de plus de RESET_MINUTES. Un verrou Postgres
 * évite deux remises à zéro simultanées.
 */
export async function ensureFresh(): Promise<{ lastReset: Date }> {
  const cutoff = new Date(Date.now() - RESET_MINUTES * 60_000)
  const meta = await prisma.meta.findUnique({ where: { id: 1 } })
  if (meta && meta.lastReset > cutoff) return { lastReset: meta.lastReset }

  return prisma.$transaction(
    async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(424242)`
      const m = await tx.meta.findUnique({ where: { id: 1 } })
      if (m && m.lastReset > cutoff) return { lastReset: m.lastReset }
      await seedAll(tx)
      return { lastReset: new Date() }
    },
    { timeout: 60_000 }
  )
}

/** Remise à zéro manuelle (bouton de l'espace propriétaire). */
export async function resetDemo() {
  await prisma.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(424242)`
    await seedAll(tx)
  }, { timeout: 60_000 })
}
