import { NextResponse, type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const COOKIE_NAME = 'owner-token'

async function isValid(token?: string) {
  if (!token) return false
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-lecrin'))
    return true
  } catch {
    return false
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const authed = await isValid(req.cookies.get(COOKIE_NAME)?.value)

  if (pathname === '/admin/login') {
    return authed ? NextResponse.redirect(new URL('/admin', req.url)) : NextResponse.next()
  }
  if (pathname.startsWith('/api/admin')) {
    return authed ? NextResponse.next() : NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  if (pathname.startsWith('/admin') && !authed) {
    const url = new URL('/admin/login', req.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] }
