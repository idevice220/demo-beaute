import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { BASE, TENANT_COOKIE } from '@/lib/demo'

export const dynamic = 'force-dynamic'

/** Sert une photo : celles de la version d'origine à tous, celles d'une copie uniquement à son visiteur. */
export async function GET(_: Request, { params }: { params: { id: string } }) {
  if (!/^[a-z0-9]{16,40}$/.test(params.id)) return new Response('Not found', { status: 404 })
  const m = await prisma.media.findUnique({ where: { id: params.id } })
  if (!m) return new Response('Not found', { status: 404 })
  if (m.tenant !== BASE && cookies().get(TENANT_COOKIE)?.value !== m.tenant) return new Response('Not found', { status: 404 })
  return new Response(Buffer.from(m.data), { headers: { 'Content-Type': m.mime, 'Content-Length': String(m.size), 'Cache-Control': 'private, max-age=3600' } })
}
