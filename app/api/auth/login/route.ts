import { NextResponse } from 'next/server'
import { DEMO_EMAIL, DEMO_PASSWORD, signToken, cookieOptions, COOKIE_NAME } from '@/lib/auth'
import { getOrCreateTenant } from '@/lib/demo'

/** Connexion démo : crée (ou retrouve) la copie privée du visiteur et lie le jeton à cette copie. */
export async function POST(req: Request) {
  let body: { email?: string; password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
  }
  const email = (body.email || '').trim().toLowerCase()
  const password = body.password || ''
  if (email !== DEMO_EMAIL.toLowerCase() || password !== DEMO_PASSWORD) {
    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })
  }
  const res = NextResponse.json({ ok: true, email })
  const tenant = await getOrCreateTenant(res)
  res.cookies.set(COOKIE_NAME, await signToken(email, tenant), cookieOptions())
  return res
}
