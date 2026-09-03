import { prisma } from '@/lib/prisma'
import { Subscribers } from '@/components/admin/Subscribers'

export const dynamic = 'force-dynamic'

export default async function NewsletterPage() {
  const subs = await prisma.subscriber.findMany({ orderBy: { createdAt: 'desc' } })
  return <Subscribers subscribers={subs.map((s) => ({ ...s, createdAt: s.createdAt.toISOString() }))} />
}
