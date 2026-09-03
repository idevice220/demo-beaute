import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getOrCreateTenant, QUOTA } from '@/lib/demo'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const parsed = z.object({ email: z.string().trim().email().max(120) }).safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Adresse invalide' }, { status: 400 })
  const email = parsed.data.email.toLowerCase()
  const res = NextResponse.json({ ok: true }, { status: 201 })
  const tenant = await getOrCreateTenant(res)
  if ((await prisma.subscriber.count({ where: { tenant } })) >= QUOTA.inbox) return NextResponse.json({ error: 'Limite atteinte pour cette démo' }, { status: 429 })
  await prisma.subscriber.upsert({ where: { tenant_email: { tenant, email } }, update: {}, create: { tenant, email } })
  return res
}
