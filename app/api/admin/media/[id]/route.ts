import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession, unauthorized } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const s = await getSession()
  if (!s) return unauthorized()
  const r = await prisma.media.deleteMany({ where: { id: params.id, tenant: s.tenant } })
  if (r.count === 0) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
