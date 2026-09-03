import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getSession, unauthorized } from '@/lib/auth'

export const dynamic = 'force-dynamic'
const schema = z.array(z.object({ key: z.string().min(1).max(64), value: z.string().max(20000) })).max(100)

// PUT [{ key, value }] — enregistre des réglages dans la copie du visiteur
export async function PUT(req: Request) {
  const s = await getSession()
  if (!s) return unauthorized()
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  await prisma.$transaction(parsed.data.map((x) => prisma.setting.upsert({ where: { tenant_key: { tenant: s.tenant, key: x.key } }, update: { value: x.value }, create: { tenant: s.tenant, key: x.key, value: x.value } })))
  return NextResponse.json({ ok: true })
}
