import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { cookies } from 'next/headers'

export const COOKIE_NAME = 'owner-token'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 jours

/** Identifiants de démonstration : affichés sur la page de connexion. */
export const DEMO_EMAIL = process.env.ADMIN_EMAIL || 'demo@lecrin-beaute.fr'
export const DEMO_PASSWORD = process.env.ADMIN_PASSWORD || 'demo'

function secret() {
  return new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-lecrin')
}

export type Session = JWTPayload & { email: string }

export async function signToken(email: string) {
  return new SignJWT({ email }).setProtectedHeader({ alg: 'HS256' }).setSubject(email).setIssuedAt().setExpirationTime('7d').sign(secret())
}

export async function verifyToken(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, secret())
    return payload as Session
  } catch {
    return null
  }
}

/** Session courante (composants serveur et routes). */
export async function getSession(): Promise<Session | null> {
  const token = cookies().get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}

export function cookieOptions() {
  return { httpOnly: true, sameSite: 'lax' as const, secure: process.env.NODE_ENV === 'production', path: '/', maxAge: MAX_AGE }
}

/** Réponse 401 standard pour les routes d'administration. */
export function unauthorized() {
  return Response.json({ error: 'Non autorisé' }, { status: 401 })
}
