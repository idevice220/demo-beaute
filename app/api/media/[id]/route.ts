import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/** Sert une photo stockée en base (cache long : l'identifiant est unique). */
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const m = await prisma.media.findUnique({ where: { id: params.id } })
  if (!m) return new Response('Not found', { status: 404 })
  return new Response(Buffer.from(m.data), { headers: { 'Content-Type': m.mime, 'Content-Length': String(m.size), 'Cache-Control': 'public, max-age=31536000, immutable' } })
}
