import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession, unauthorized } from '@/lib/auth'
import { QUOTA } from '@/lib/demo'
import { getResource } from '@/lib/admin/resources'

export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const table = (model: string) => (prisma as any)[model]

export async function GET(_: Request, { params }: { params: { resource: string } }) {
  const s = await getSession()
  if (!s) return unauthorized()
  const def = getResource(params.resource)
  if (!def) return NextResponse.json({ error: 'Collection inconnue' }, { status: 404 })
  const rows = await table(def.model).findMany({ where: { tenant: s.tenant }, orderBy: def.orderable ? { order: 'asc' } : { createdAt: 'desc' } })
  return NextResponse.json(rows)
}

export async function POST(req: Request, { params }: { params: { resource: string } }) {
  const s = await getSession()
  if (!s) return unauthorized()
  const def = getResource(params.resource)
  if (!def || !def.orderable) return NextResponse.json({ error: 'Collection inconnue' }, { status: 404 })
  const parsed = def.schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Données invalides' }, { status: 400 })
  const t = table(def.model)
  if ((await t.count({ where: { tenant: s.tenant } })) >= QUOTA.rows) return NextResponse.json({ error: `Limite de ${QUOTA.rows} éléments atteinte pour cette démo` }, { status: 429 })
  const last = await t.findFirst({ where: { tenant: s.tenant }, orderBy: { order: 'desc' }, select: { order: true } })
  const row = await t.create({ data: { ...parsed.data, tenant: s.tenant, order: (last?.order ?? -1) + 1 } })
  return NextResponse.json(row, { status: 201 })
}
