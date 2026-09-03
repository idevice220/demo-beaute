import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getResource } from '@/lib/admin/resources'

export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const table = (model: string) => (prisma as any)[model]

export async function PATCH(req: Request, { params }: { params: { resource: string; id: string } }) {
  const def = getResource(params.resource)
  const id = Number(params.id)
  if (!def || !Number.isInteger(id)) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  const parsed = def.schema.partial().safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Données invalides' }, { status: 400 })
  try {
    const row = await table(def.model).update({ where: { id }, data: parsed.data })
    return NextResponse.json(row)
  } catch {
    return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  }
}

export async function DELETE(_: Request, { params }: { params: { resource: string; id: string } }) {
  const def = getResource(params.resource)
  const id = Number(params.id)
  if (!def || !Number.isInteger(id)) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  try {
    await table(def.model).delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  }
}
