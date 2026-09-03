import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ensureFresh } from '@/lib/demo'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  await ensureFresh()
  const parsed = z.object({ email: z.string().trim().email().max(120) }).safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Adresse invalide' }, { status: 400 })
  const email = parsed.data.email.toLowerCase()
  await prisma.subscriber.upsert({ where: { email }, update: {}, create: { email } })
  return NextResponse.json({ ok: true }, { status: 201 })
}
