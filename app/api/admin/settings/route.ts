import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
const schema = z.array(z.object({ key: z.string().min(1).max(64), value: z.string().max(20000) })).max(100)

// PUT [{ key, value }] — enregistre des réglages
export async function PUT(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  await prisma.$transaction(parsed.data.map((s) => prisma.setting.upsert({ where: { key: s.key }, update: { value: s.value }, create: { key: s.key, value: s.value } })))
  return NextResponse.json({ ok: true })
}
