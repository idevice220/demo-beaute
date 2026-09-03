import { NextResponse } from 'next/server'
import { COOKIE_NAME, cookieOptions } from '@/lib/auth'
import { TENANT_COOKIE, tenantCookieOptions } from '@/lib/demo'

/** La copie de démo a été effacée (inactivité) : on efface les cookies et on revient à la connexion. */
export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL('/admin/login?expired=1', req.url))
  res.cookies.set(COOKIE_NAME, '', { ...cookieOptions(), maxAge: 0 })
  res.cookies.set(TENANT_COOKIE, '', { ...tenantCookieOptions(), maxAge: 0 })
  return res
}
