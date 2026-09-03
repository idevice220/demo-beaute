import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth'
import { Subscribers } from '@/components/admin/Subscribers'

export const dynamic = 'force-dynamic'

export default async function NewsletterPage() {
  const { tenant } = await requireSession()
  const subs = await prisma.subscriber.findMany({ where: { tenant }, orderBy: { createdAt: 'desc' } })
  return <Subscribers subscribers={subs.map((s) => ({ ...s, createdAt: s.createdAt.toISOString() }))} />
}
