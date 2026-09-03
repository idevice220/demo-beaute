import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ensureFresh } from '@/lib/demo'

export const dynamic = 'force-dynamic'

const schema = z.object({
  item: z.string().trim().min(1).max(120),
  staff: z.string().trim().min(1).max(60),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  duration: z.coerce.number().int().positive(),
  price: z.coerce.number().min(0),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(6).max(30),
  note: z.string().trim().max(500).optional(),
})

/** Prise de rendez-vous depuis le site. Refuse un créneau déjà pris avec la même praticienne. */
export async function POST(req: Request) {
  await ensureFresh()
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Vérifiez le formulaire' }, { status: 400 })
  const d = parsed.data
  if (d.staff !== 'Sans préférence') {
    const clash = await prisma.booking.findFirst({ where: { date: d.date, time: d.time, staff: d.staff, status: 'confirmed' } })
    if (clash) return NextResponse.json({ error: 'Ce créneau vient d’être pris, choisissez-en un autre.' }, { status: 409 })
  }
  const b = await prisma.booking.create({ data: { ...d, note: d.note || null } })
  return NextResponse.json({ ok: true, id: b.id }, { status: 201 })
}
