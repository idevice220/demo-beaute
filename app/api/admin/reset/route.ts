import { NextResponse } from 'next/server'
import { getSession, unauthorized } from '@/lib/auth'
import { resetTenant } from '@/lib/demo'

export const dynamic = 'force-dynamic'

/** Remet la copie du visiteur à l'état initial (la version d'origine n'est jamais touchée). */
export async function POST() {
  const s = await getSession()
  if (!s) return unauthorized()
  await resetTenant(s.tenant)
  return NextResponse.json({ ok: true })
}
