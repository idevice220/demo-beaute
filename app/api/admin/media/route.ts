import { NextResponse } from 'next/server'
import sharp from 'sharp'
import { prisma } from '@/lib/prisma'
import { getSession, unauthorized } from '@/lib/auth'
import { QUOTA } from '@/lib/demo'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const MAX = 8 * 1024 * 1024
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif']

export async function GET() {
  const s = await getSession()
  if (!s) return unauthorized()
  const rows = await prisma.media.findMany({ where: { tenant: s.tenant }, orderBy: { createdAt: 'desc' }, select: { id: true, name: true, mime: true, size: true, width: true, height: true, createdAt: true } })
  return NextResponse.json(rows.map((r) => ({ ...r, url: `/api/media/${r.id}` })))
}

/** Téléversement : redimensionné (max 1600 px), converti en WebP, visible uniquement par ce visiteur. */
export async function POST(req: Request) {
  const s = await getSession()
  if (!s) return unauthorized()
  const fd = await req.formData().catch(() => null)
  const file = fd?.get('file')
  if (!file || !(file instanceof File)) return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 })
  if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: 'Format non pris en charge (JPEG, PNG, WebP)' }, { status: 415 })
  if (file.size > MAX) return NextResponse.json({ error: 'Fichier trop lourd (8 Mo max)' }, { status: 413 })
  if ((await prisma.media.count({ where: { tenant: s.tenant } })) >= QUOTA.media) return NextResponse.json({ error: `Limite de ${QUOTA.media} photos atteinte pour cette démo` }, { status: 429 })
  try {
    const input = Buffer.from(await file.arrayBuffer())
    const out = await sharp(input).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toBuffer({ resolveWithObject: true })
    const name = file.name.replace(/\.[^.]+$/, '').slice(0, 80) || 'photo'
    const m = await prisma.media.create({ data: { tenant: s.tenant, name, mime: 'image/webp', size: out.info.size, width: out.info.width, height: out.info.height, data: out.data } })
    return NextResponse.json({ id: m.id, url: `/api/media/${m.id}`, name, width: m.width, height: m.height, size: m.size }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Image illisible' }, { status: 400 })
  }
}
