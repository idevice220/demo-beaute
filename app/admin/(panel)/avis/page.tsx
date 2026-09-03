import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth'
import { Collection } from '@/components/admin/Collection'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const { tenant } = await requireSession()
  const rows = await prisma.review.findMany({ where: { tenant }, orderBy: { order: 'asc' } })
  return <Collection resource="reviews" rows={rows} />
}
