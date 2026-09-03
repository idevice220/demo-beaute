import { NextResponse } from 'next/server'
import { COOKIE_NAME, cookieOptions } from '@/lib/auth'
import { TENANT_COOKIE, tenantCookieOptions } from '@/lib/demo'

/** Quitter sa copie : le visiteur revoit la version d'origine (sa copie reste jusqu'à expiration). */
export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, '', { ...cookieOptions(), maxAge: 0 })
  res.cookies.set(TENANT_COOKIE, '', { ...tenantCookieOptions(), maxAge: 0 })
  return res
}
