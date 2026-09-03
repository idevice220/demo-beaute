import { prisma } from '@/lib/prisma'
import { Gifts } from '@/components/admin/Gifts'

export const dynamic = 'force-dynamic'

export default async function CadeauxPage() {
  const gifts = await prisma.giftOrder.findMany({ orderBy: { createdAt: 'desc' } })
  return <Gifts gifts={gifts.map((g) => ({ ...g, createdAt: g.createdAt.toISOString() }))} />
}
