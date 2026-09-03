import { HOURS } from './data'

const DAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
const fmt = (h: number) => `${Math.floor(h)}h${Math.round((h % 1) * 60) ? String(Math.round((h % 1) * 60)).padStart(2, '0') : ''}`

export function getStatus(now = new Date()) {
  const day = now.getDay()
  const h = now.getHours() + now.getMinutes() / 60
  const today = HOURS[day]
  const open = !!today && h >= today.open && h < today.close
  if (open && today) return { open, label: `Ouvert · ferme à ${fmt(today.close)}` }
  if (today && h < today.open) return { open, label: `Ouvre aujourd’hui à ${fmt(today.open)}` }
  let nd = (day + 1) % 7
  let g = 0
  while (!HOURS[nd] && g++ < 7) nd = (nd + 1) % 7
  const next = HOURS[nd]!
  return { open, label: `Fermé · ouvre ${nd === (day + 1) % 7 ? 'demain' : DAYS[nd]} à ${fmt(next.open)}` }
}

/** Jours réservables (14 prochains jours ouverts) */
export function bookableDays(from = new Date(), count = 14) {
  const out: Date[] = []
  const d = new Date(from)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 1)
  let guard = 0
  while (out.length < count && guard++ < 40) {
    if (HOURS[d.getDay()]) out.push(new Date(d))
    d.setDate(d.getDate() + 1)
  }
  return out
}

/** Créneaux d'une journée (pas de 30 min), avec quelques indisponibilités pseudo-aléatoires mais stables */
export function slotsFor(day: Date, durationMin: number) {
  const hours = HOURS[day.getDay()]
  if (!hours) return []
  const seed = day.getDate() * 7 + day.getMonth() * 3
  const out: { label: string; h: number; taken: boolean }[] = []
  for (let h = hours.open; h + durationMin / 60 <= hours.close + 0.001; h += 0.5) {
    const k = Math.round(h * 2) + seed
    const taken = k % 5 === 0 || k % 7 === 0
    out.push({ label: fmt(h), h, taken })
  }
  return out
}

export const dayLabel = (d: Date) => d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })
export const dayLong = (d: Date) => d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
