/** Temps relatif en français (« il y a 3 h »). Module neutre : utilisable côté serveur comme côté client. */
export function timeAgo(iso: string | Date) {
  const d = typeof iso === 'string' ? new Date(iso) : iso
  const s = Math.max(0, (Date.now() - d.getTime()) / 1000)
  if (s < 60) return 'à l’instant'
  const m = Math.floor(s / 60)
  if (m < 60) return `il y a ${m} min`
  const h = Math.floor(m / 60)
  if (h < 24) return `il y a ${h} h`
  const j = Math.floor(h / 24)
  if (j < 7) return `il y a ${j} j`
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}
