import { NextResponse } from 'next/server'
import sharp from 'sharp'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const MAX = 8 * 1024 * 1024
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif']

export async function GET() {
  const rows = await prisma.media.findMany({ orderBy: { createdAt: 'desc' }, select: { id: true, name: true, mime: true, size: true, width: true, height: true, createdAt: true } })
  return NextResponse.json(rows.map((r) => ({ ...r, url: `/api/media/${r.id}` })))
}

/** Téléversement : redimensionné (max 1600 px) et converti en WebP avant stockage. */
export async function POST(req: Request) {
  const fd = await req.formData().catch(() => null)
  const file = fd?.get('file')
  if (!file || !(file instanceof File)) return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 })
  if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: 'Format non pris en charge (JPEG, PNG, WebP)' }, { status: 415 })
  if (file.size > MAX) return NextResponse.json({ error: 'Fichier trop lourd (8 Mo max)' }, { status: 413 })
  try {
    const input = Buffer.from(await file.arrayBuffer())
    const out = await sharp(input).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toBuffer({ resolveWithObject: true })
    const name = file.name.replace(/\.[^.]+$/, '').slice(0, 80) || 'photo'
    const m = await prisma.media.create({ data: { name, mime: 'image/webp', size: out.info.size, width: out.info.width, height: out.info.height, data: out.data } })
    return NextResponse.json({ id: m.id, url: `/api/media/${m.id}`, name, width: m.width, height: m.height, size: m.size }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Image illisible' }, { status: 400 })
  }
}
