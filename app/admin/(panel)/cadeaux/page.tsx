import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth'
import { Gifts } from '@/components/admin/Gifts'

export const dynamic = 'force-dynamic'

export default async function CadeauxPage() {
  const { tenant } = await requireSession()
  const gifts = await prisma.giftOrder.findMany({ where: { tenant }, orderBy: { createdAt: 'desc' } })
  return <Gifts gifts={gifts.map((g) => ({ ...g, createdAt: g.createdAt.toISOString() }))} />
}
