import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth'
import { MediaLibrary } from '@/components/admin/MediaLibrary'

export const dynamic = 'force-dynamic'

export default async function PhotosPage() {
  const { tenant } = await requireSession()
  const rows = await prisma.media.findMany({ where: { tenant }, orderBy: { createdAt: 'desc' }, select: { id: true, name: true, width: true, height: true, size: true, createdAt: true } })
  return <MediaLibrary items={rows.map((r) => ({ ...r, url: `/api/media/${r.id}`, createdAt: r.createdAt.toISOString() }))} />
}
