'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Save, Clock } from 'lucide-react'
import { DAY_NAMES, WEEK, hoursRows, toMap, getStatus, type HoursConfigRow } from '@/lib/hours'
import { Button, Card, Toggle, inputCls, cls } from './ui'

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export function HoursEditor({ initial, suffix }: { initial: HoursConfigRow[]; suffix?: string }) {
  const router = useRouter()
  const [rows, setRows] = useState<HoursConfigRow[]>(() => WEEK.map((d) => initial.find((r) => r.day === d) ?? { day: d, closed: true, open: '09:00', close: '18:00' }))
  const [saving, setSaving] = useState(false)
  const preview = useMemo(() => hoursRows(rows), [rows])
  const status = useMemo(() => getStatus(toMap(rows), new Date(), { closedSuffix: suffix }), [rows, suffix])

  const update = (day: number, patch: Partial<HoursConfigRow>) => setRows((rs) => rs.map((r) => (r.day === day ? { ...r, ...patch } : r)))
  const copyToWeek = (from: HoursConfigRow) => setRows((rs) => rs.map((r) => ([1, 2, 3, 4, 5].includes(r.day) ? { ...r, closed: from.closed, open: from.open, close: from.close } : r)))

  async function save() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify([{ key: 'hours', value: JSON.stringify(rows) }]) })
      if (!res.ok) throw new Error()
      toast.success('Horaires enregistrés — le site affiche déjà le nouveau statut')
      router.refresh()
    } catch {
      toast.error('Enregistrement impossible')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
      <Card className="divide-y divide-slate-100">
        {rows.map((r) => (
          <div key={r.day} className={cls('grid items-center gap-3 px-4 py-3 sm:grid-cols-[110px_auto_1fr]', r.closed && 'bg-slate-50/60')}>
            <p className="font-semibold text-slate-800">{cap(DAY_NAMES[r.day])}</p>
            <Toggle checked={!r.closed} onChange={(v) => update(r.day, { closed: !v })} label={r.closed ? 'Fermé' : 'Ouvert'} />
            <div className="flex flex-wrap items-center gap-2">
              <input type="time" value={r.open} disabled={r.closed} onChange={(e) => update(r.day, { open: e.target.value })} className={cls(inputCls, 'w-[7.5rem] !py-1.5')} aria-label="Ouverture" />
              <span className="text-slate-400">–</span>
              <input type="time" value={r.close} disabled={r.closed} onChange={(e) => update(r.day, { close: e.target.value })} className={cls(inputCls, 'w-[7.5rem] !py-1.5')} aria-label="Fermeture" />
              <input value={r.note ?? ''} onChange={(e) => update(r.day, { note: e.target.value })} placeholder={r.closed ? 'Mention (ex. : Urgences uniquement)' : 'Mention (facultatif)'} className={cls(inputCls, 'min-w-[12rem] flex-1 !py-1.5')} />
              {r.day === 1 && <button type="button" onClick={() => copyToWeek(r)} className="text-xs font-semibold text-[var(--a-deep)] hover:underline">Appliquer du lundi au vendredi</button>}
            </div>
          </div>
        ))}
        <div className="flex justify-end px-4 py-3">
          <Button variant="primary" onClick={save} loading={saving}><Save size={16} /> Enregistrer</Button>
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Aperçu sur le site</p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-sm font-medium text-white">
          <span className={cls('h-2.5 w-2.5 rounded-full', status.open ? 'bg-emerald-400' : 'bg-amber-400')} /> {status.label}
        </p>
        <ul className="mt-4 divide-y divide-slate-100">
          {preview.map((p) => (
            <li key={p.d} className="flex items-center justify-between gap-4 py-2.5 text-sm">
              <span className="inline-flex items-center gap-2 text-slate-600"><Clock size={14} className="text-[var(--a-deep)]" /> {p.d}</span>
              <span className="text-right font-semibold text-slate-900">{p.h}{p.note && <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-600">{p.note}</span>}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-slate-500">Le statut « ouvert / fermé » et le prochain créneau proposé sur le site se calculent à partir de ces horaires.</p>
      </Card>
    </div>
  )
}
