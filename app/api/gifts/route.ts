import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ensureFresh } from '@/lib/demo'

export const dynamic = 'force-dynamic'

const schema = z.object({
  amount: z.coerce.number().int().min(20).max(500),
  to: z.string().trim().max(60).optional(),
  from: z.string().trim().max(60).optional(),
  message: z.string().trim().max(120).optional(),
  mode: z.enum(['email', 'ecrin']),
})

export async function POST(req: Request) {
  await ensureFresh()
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Vérifiez le formulaire' }, { status: 400 })
  const d = parsed.data
  const g = await prisma.giftOrder.create({ data: { amount: d.amount, to: d.to || 'votre proche', from: d.from || '', message: d.message || null, mode: d.mode } })
  return NextResponse.json({ ok: true, id: g.id }, { status: 201 })
}
