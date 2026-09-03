import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession, unauthorized } from '@/lib/auth'
import { getResource } from '@/lib/admin/resources'

export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const table = (model: string) => (prisma as any)[model]

export async function PATCH(req: Request, { params }: { params: { resource: string; id: string } }) {
  const s = await getSession()
  if (!s) return unauthorized()
  const def = getResource(params.resource)
  const id = Number(params.id)
  if (!def || !Number.isInteger(id)) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  const parsed = def.schema.partial().safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Données invalides' }, { status: 400 })
  const t = table(def.model)
  const r = await t.updateMany({ where: { id, tenant: s.tenant }, data: parsed.data })
  if (r.count === 0) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  return NextResponse.json(await t.findUnique({ where: { id } }))
}

export async function DELETE(_: Request, { params }: { params: { resource: string; id: string } }) {
  const s = await getSession()
  if (!s) return unauthorized()
  const def = getResource(params.resource)
  const id = Number(params.id)
  if (!def || !Number.isInteger(id)) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  const r = await table(def.model).deleteMany({ where: { id, tenant: s.tenant } })
  if (r.count === 0) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
