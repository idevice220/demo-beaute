import { prisma } from '@/lib/prisma'
import { MediaLibrary } from '@/components/admin/MediaLibrary'

export const dynamic = 'force-dynamic'

export default async function PhotosPage() {
  const rows = await prisma.media.findMany({ orderBy: { createdAt: 'desc' }, select: { id: true, name: true, width: true, height: true, size: true, createdAt: true } })
  return <MediaLibrary items={rows.map((r) => ({ ...r, url: `/api/media/${r.id}`, createdAt: r.createdAt.toISOString() }))} />
}
