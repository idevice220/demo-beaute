/** Aide à la réservation (côté client) : jours réservables et créneaux à partir des horaires. */
import type { HoursMap } from './hours'

export const fmtH = (h: number) => `${Math.floor(h)}h${Math.round((h % 1) * 60) ? String(Math.round((h % 1) * 60)).padStart(2, '0') : ''}`
export const pad = (n: number) => String(n).padStart(2, '0')
export const isoDay = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const hm = (h: number) => `${pad(Math.floor(h))}:${pad(Math.round((h % 1) * 60))}`
export const dayLabel = (d: Date) => d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })
export const dayLong = (d: Date) => d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })

/** Les 14 prochains jours d'ouverture, à partir de demain. */
export function bookableDays(hours: HoursMap, from = new Date(), count = 14) {
  const out: Date[] = []
  const d = new Date(from)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 1)
  let guard = 0
  while (out.length < count && guard++ < 60) {
    if (hours[d.getDay()]) out.push(new Date(d))
    d.setDate(d.getDate() + 1)
  }
  return out
}

/** Créneaux d'une journée (pas de 30 min). `isTaken(HH:MM)` vient des réservations réelles. */
export function slotsFor(hours: HoursMap, day: Date, durationMin: number, isTaken: (time: string) => boolean) {
  const h0 = hours[day.getDay()]
  if (!h0) return []
  const seed = day.getDate() * 7 + day.getMonth() * 3
  const out: { label: string; h: number; time: string; taken: boolean }[] = []
  for (let h = h0.open; h + durationMin / 60 <= h0.close + 0.001; h += 0.5) {
    const time = hm(h)
    const k = Math.round(h * 2) + seed
    out.push({ label: fmtH(h), h, time, taken: isTaken(time) || k % 7 === 0 })
  }
  return out
}
