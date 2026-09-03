import { prisma } from '@/lib/prisma'
import { Collection } from '@/components/admin/Collection'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const rows = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })
  return <Collection resource="team" rows={rows} />
}
