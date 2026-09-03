import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession, unauthorized } from '@/lib/auth'
import { getResource } from '@/lib/admin/resources'

export const dynamic = 'force-dynamic'

// POST { ids: number[] } — l'ordre du tableau devient l'ordre d'affichage (dans la copie du visiteur uniquement)
export async function POST(req: Request, { params }: { params: { resource: string } }) {
  const s = await getSession()
  if (!s) return unauthorized()
  const def = getResource(params.resource)
  if (!def || !def.orderable) return NextResponse.json({ error: 'Collection inconnue' }, { status: 404 })
  const body = await req.json().catch(() => null)
  const ids: unknown = body?.ids
  if (!Array.isArray(ids) || ids.length > 500 || !ids.every((n) => Number.isInteger(n))) return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = (prisma as any)[def.model]
  await prisma.$transaction((ids as number[]).map((id, order) => t.updateMany({ where: { id, tenant: s.tenant }, data: { order } })))
  return NextResponse.json({ ok: true })
}
