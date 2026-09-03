import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.media.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  }
}
