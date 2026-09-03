/**
 * Horaires : configuration éditable (7 lignes), calcul ouvert/fermé, prochain créneau,
 * et libellés groupés pour l'affichage. Aucune dépendance : utilisable côté client.
 */
export type HoursConfigRow = { day: number; closed: boolean; open: string; close: string; note?: string }
export type DayHours = { open: number; close: number } | null
export type HoursMap = Record<number, DayHours>

export const DAY_NAMES = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
export const WEEK = [1, 2, 3, 4, 5, 6, 0]

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const toDec = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return (h || 0) + (m || 0) / 60
}
export const fmt = (h: number) => {
  const hh = Math.floor(h)
  const mm = Math.round((h - hh) * 60)
  return `${hh}h${mm ? String(mm).padStart(2, '0') : ''}`
}

export function parseHoursConfig(raw: string | null | undefined, fallback: HoursConfigRow[]): HoursConfigRow[] {
  if (!raw) return fallback
  try {
    const p = JSON.parse(raw)
    if (Array.isArray(p) && p.length === 7) return p as HoursConfigRow[]
  } catch {}
  return fallback
}

export function toMap(cfg: HoursConfigRow[]): HoursMap {
  const map: HoursMap = {}
  for (const r of cfg) map[r.day] = r.closed ? null : { open: toDec(r.open), close: toDec(r.close) }
  return map
}

export type HoursRow = { d: string; h: string; note?: string }

/** Lignes d'affichage : jours consécutifs identiques regroupés (« Lundi – Vendredi »). */
export function hoursRows(cfg: HoursConfigRow[]): HoursRow[] {
  const byDay = new Map(cfg.map((r) => [r.day, r]))
  const groups: { days: number[]; row: HoursConfigRow }[] = []
  for (const d of WEEK) {
    const r = byDay.get(d)
    if (!r) continue
    const key = r.closed ? `closed|${r.note ?? ''}` : `${r.open}-${r.close}|${r.note ?? ''}`
    const last = groups[groups.length - 1]
    const lastKey = last ? (last.row.closed ? `closed|${last.row.note ?? ''}` : `${last.row.open}-${last.row.close}|${last.row.note ?? ''}`) : null
    if (last && lastKey === key) last.days.push(d)
    else groups.push({ days: [d], row: r })
  }
  return groups.map(({ days, row }) => {
    const names = days.map((d) => DAY_NAMES[d])
    const d = names.length === 1 ? cap(names[0]) : names.length === 2 ? `${cap(names[0])} et ${names[1]}` : `${cap(names[0])} – ${cap(names[names.length - 1])}`
    if (row.closed) return { d, h: row.note?.trim() || 'Fermé' }
    return { d, h: `${fmt(toDec(row.open))} – ${fmt(toDec(row.close))}`, note: row.note?.trim() || undefined }
  })
}

export type Status = { open: boolean; label: string; nextSlot: string; slotDay: 'today' | 'tomorrow' | 'later' }

/** Statut ouvert/fermé + prochain créneau d'intervention (90 min de battement, arrondi à la demi-heure). */
export function getStatus(hours: HoursMap, now = new Date(), opts: { closedSuffix?: string } = {}): Status {
  const day = now.getDay()
  const h = now.getHours() + now.getMinutes() / 60
  const today = hours[day]
  const open = !!today && h >= today.open && h < today.close

  let slotDay: Status['slotDay'] = 'today'
  let slotH = Math.ceil((h + 1.5) * 2) / 2
  let d = day
  let guard = 0
  while (guard++ < 8) {
    const hd = hours[d]
    if (hd) {
      if (slotH < hd.open) slotH = hd.open
      if (slotH <= hd.close - 1) break
    }
    d = (d + 1) % 7
    slotH = 0
    slotDay = slotDay === 'today' ? 'tomorrow' : 'later'
  }
  const when = slotDay === 'today' ? 'aujourd’hui' : slotDay === 'tomorrow' ? 'demain' : DAY_NAMES[d]
  const nextSlot = `${when} à ${fmt(slotH)}`

  const suffix = opts.closedSuffix ? ` · ${opts.closedSuffix}` : ''
  let label: string
  if (open && today) label = `Ouvert · ferme à ${fmt(today.close)}`
  else if (today && h < today.open) label = `Ouvre à ${fmt(today.open)}${suffix}`
  else {
    let nd = (day + 1) % 7
    let g = 0
    while (!hours[nd] && g++ < 7) nd = (nd + 1) % 7
    const next = hours[nd]
    label = `Fermé · ouvre ${nd === (day + 1) % 7 ? 'demain' : DAY_NAMES[nd]} à ${fmt(next ? next.open : 8)}${suffix}`
  }
  return { open, label, nextSlot, slotDay }
}

/** Heure de Paris côté serveur (le conteneur tourne en UTC). */
export function parisNow() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' }))
}
