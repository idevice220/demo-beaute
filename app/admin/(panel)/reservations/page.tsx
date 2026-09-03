import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth'
import { parisNow } from '@/lib/hours'
import { Agenda } from '@/components/admin/Agenda'

export const dynamic = 'force-dynamic'

export default async function ReservationsPage() {
  const { tenant } = await requireSession()
  const bookings = await prisma.booking.findMany({ where: { tenant }, orderBy: [{ date: 'asc' }, { time: 'asc' }] })
  return <Agenda bookings={bookings.map((b) => ({ ...b, createdAt: b.createdAt.toISOString() }))} today={parisNow().toISOString().slice(0, 10)} />
}
