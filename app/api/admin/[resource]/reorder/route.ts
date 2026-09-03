import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getResource } from '@/lib/admin/resources'

export const dynamic = 'force-dynamic'

// POST { ids: number[] } — l'ordre du tableau devient l'ordre d'affichage
export async function POST(req: Request, { params }: { params: { resource: string } }) {
  const def = getResource(params.resource)
  if (!def || !def.orderable) return NextResponse.json({ error: 'Collection inconnue' }, { status: 404 })
  const body = await req.json().catch(() => null)
  const ids: unknown = body?.ids
  if (!Array.isArray(ids) || !ids.every((n) => Number.isInteger(n))) return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = (prisma as any)[def.model]
  await prisma.$transaction((ids as number[]).map((id, order) => t.update({ where: { id }, data: { order } })))
  return NextResponse.json({ ok: true })
}
