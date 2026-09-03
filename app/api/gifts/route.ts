import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getOrCreateTenant, QUOTA } from '@/lib/demo'

export const dynamic = 'force-dynamic'

const schema = z.object({
  amount: z.coerce.number().int().min(20).max(500),
  to: z.string().trim().max(60).optional(),
  from: z.string().trim().max(60).optional(),
  message: z.string().trim().max(120).optional(),
  mode: z.enum(['email', 'ecrin']),
})

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Vérifiez le formulaire' }, { status: 400 })
  const d = parsed.data
  const res = NextResponse.json({ ok: true }, { status: 201 })
  const tenant = await getOrCreateTenant(res)
  if ((await prisma.giftOrder.count({ where: { tenant } })) >= QUOTA.inbox) return NextResponse.json({ error: 'Limite atteinte pour cette démo' }, { status: 429 })
  await prisma.giftOrder.create({ data: { tenant, amount: d.amount, to: d.to || 'votre proche', from: d.from || '', message: d.message || null, mode: d.mode } })
  return res
}
