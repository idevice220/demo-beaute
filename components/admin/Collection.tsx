'use client'

import { useMemo, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, Search, Eye, EyeOff, ImageOff } from 'lucide-react'
import { COLLECTIONS, badgeOf, type Row, type Option } from '@/lib/admin/fields'
import { Button, Card, Confirm, Drawer, Empty, PageHeader, Badge, cls, inputCls } from './ui'
import { FieldInput } from './FieldInput'

type Props = {
  resource: string
  rows: Row[]
  /** options dynamiques pour les champs « select » (ex. typeId → types de problème) */
  selectOptions?: Record<string, Option[]>
  /** ne pas afficher l'en-tête de page (quand plusieurs collections sur une page) */
  embedded?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Form = Record<string, any>

export function Collection({ resource, rows, selectOptions = {}, embedded }: Props) {
  const ui = COLLECTIONS[resource]
  const router = useRouter()
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState<Row | 'new' | null>(null)
  const [form, setForm] = useState<Form>({})
  const [saving, setSaving] = useState(false)
  const [del, setDel] = useState<Row | null>(null)
  const [busy, setBusy] = useState<number | null>(null)

  const optionLabel = useCallback((key: string, v: unknown) => selectOptions[key]?.find((o) => String(o.value) === String(v))?.label ?? String(v ?? ''), [selectOptions])

  const visibleRows = useMemo(() => {
    const n = q.trim().toLowerCase()
    if (!n) return rows
    return rows.filter((r) => [r[ui.titleKey], ...(ui.subtitleKeys ?? []).map((k) => r[k])].some((v) => String(v ?? '').toLowerCase().includes(n)))
  }, [rows, q, ui])

  const groups = useMemo(() => {
    if (!ui.groupBy) return [{ key: '', label: '', rows: visibleRows }]
    const map = new Map<string, Row[]>()
    for (const r of visibleRows) {
      const k = String(r[ui.groupBy])
      if (!map.has(k)) map.set(k, [])
      map.get(k)!.push(r)
    }
    const order = (selectOptions[ui.groupBy] ?? []).map((o) => String(o.value))
    return Array.from(map.entries())
      .sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]))
      .map(([key, rs]) => ({ key, label: optionLabel(ui.groupBy!, key), rows: rs }))
  }, [visibleRows, ui.groupBy, selectOptions, optionLabel])

  function openNew() {
    const f: Form = {}
    for (const fd of ui.fields) f[fd.key] = fd.type === 'toggle' ? false : fd.type === 'lines' ? [] : fd.type === 'number' ? 0 : fd.type === 'select' ? (selectOptions[fd.key]?.[0]?.value ?? fd.options?.[0]?.value ?? '') : ''
    if (ui.toggleKey) f[ui.toggleKey] = true
    setForm(f)
    setEditing('new')
  }
  function openEdit(r: Row) {
    const f: Form = {}
    for (const fd of ui.fields) f[fd.key] = r[fd.key] ?? (fd.type === 'lines' ? [] : fd.type === 'toggle' ? false : '')
    setForm(f)
    setEditing(r)
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const payload: Form = {}
      for (const fd of ui.fields) {
        let v = form[fd.key]
        if (fd.type === 'lines') v = (Array.isArray(v) ? v : String(v ?? '').split('\n')).map((s: string) => s.trim()).filter(Boolean)
        if (fd.type === 'number') v = v === '' ? 0 : Number(v)
        payload[fd.key] = v
      }
      const isNew = editing === 'new'
      const res = await fetch(isNew ? `/api/admin/${resource}` : `/api/admin/${resource}/${(editing as Row).id}`, { method: isNew ? 'POST' : 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) { toast.error(data.error || 'Enregistrement impossible'); return }
      toast.success(isNew ? 'Ajouté — c’est en ligne' : 'Modifié — c’est en ligne')
      setEditing(null)
      router.refresh()
    } catch {
      toast.error('Erreur réseau')
    } finally {
      setSaving(false)
    }
  }

  async function patch(r: Row, data: Form, okMsg?: string) {
    setBusy(r.id)
    try {
      const res = await fetch(`/api/admin/${resource}/${r.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error()
      if (okMsg) toast.success(okMsg)
      router.refresh()
    } catch {
      toast.error('Modification impossible')
    } finally {
      setBusy(null)
    }
  }

  async function remove() {
    if (!del) return
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/${resource}/${del.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('Supprimé')
      setDel(null)
      router.refresh()
    } catch {
      toast.error('Suppression impossible')
    } finally {
      setSaving(false)
    }
  }

  async function move(r: Row, dir: -1 | 1) {
    // déplacement dans la liste complète (sans filtre), au sein du même groupe si groupé
    const list = ui.groupBy ? rows.filter((x) => String(x[ui.groupBy!]) === String(r[ui.groupBy!])) : rows
    const i = list.findIndex((x) => x.id === r.id)
    const j = i + dir
    if (i < 0 || j < 0 || j >= list.length) return
    const ids = rows.map((x) => x.id)
    const a = ids.indexOf(list[i].id), b = ids.indexOf(list[j].id)
    ;[ids[a], ids[b]] = [ids[b], ids[a]]
    setBusy(r.id)
    try {
      const res = await fetch(`/api/admin/${resource}/reorder`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids }) })
      if (!res.ok) throw new Error()
      router.refresh()
    } catch {
      toast.error('Réorganisation impossible')
    } finally {
      setBusy(null)
    }
  }

  const header = (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher…" className={cls(inputCls, 'w-56 !py-2 pl-9')} />
      </div>
      <Button variant="primary" onClick={openNew}><Plus size={16} /> {ui.addLabel ?? `Ajouter ${ui.singular}`}</Button>
    </div>
  )

  return (
    <section>
      {embedded ? (
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-slate-900">{ui.title}</h2>
            <p className="text-sm text-slate-500">{ui.description}</p>
          </div>
          {header}
        </div>
      ) : (
        <PageHeader title={ui.title} description={ui.description} actions={header} />
      )}

      {visibleRows.length === 0 ? (
        <Empty title={q ? 'Aucun résultat' : `Aucun élément pour l’instant`} text={q ? 'Essayez un autre mot.' : `Ajoutez ${ui.singular} : il apparaît immédiatement sur le site.`} action={!q && <Button variant="primary" onClick={openNew}><Plus size={16} /> Ajouter</Button>} />
      ) : (
        <div className="space-y-6">
          {groups.map((g) => (
            <div key={g.key}>
              {g.label && <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{g.label}</h3>}
              <Card className="divide-y divide-slate-100">
                {g.rows.map((r, i) => {
                  const hidden = ui.toggleKey ? !r[ui.toggleKey] : false
                  const badge = badgeOf(resource, r)
                  const subtitle = (ui.subtitleKeys ?? []).map((k) => (k === ui.groupBy ? null : r[k])).filter(Boolean).join(' · ')
                  return (
                    <div key={r.id} className={cls('flex items-center gap-3 px-4 py-3 transition-opacity sm:gap-4', hidden && 'opacity-55', busy === r.id && 'opacity-50')}>
                      <div className="flex flex-col">
                        <button onClick={() => move(r, -1)} disabled={!!q || i === 0} className="grid h-6 w-6 place-items-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30" aria-label="Monter"><ChevronUp size={16} /></button>
                        <button onClick={() => move(r, 1)} disabled={!!q || i === g.rows.length - 1} className="grid h-6 w-6 place-items-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30" aria-label="Descendre"><ChevronDown size={16} /></button>
                      </div>
                      {ui.imageKey && (
                        <div className="hidden h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 sm:grid sm:place-items-center">
                          {r[ui.imageKey] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={r[ui.imageKey]} alt="" className="h-full w-full object-cover" loading="lazy" />
                          ) : (
                            <ImageOff size={16} className="text-slate-300" />
                          )}
                        </div>
                      )}
                      <button onClick={() => openEdit(r)} className="min-w-0 flex-1 text-left">
                        <p className="flex flex-wrap items-center gap-2">
                          <span className="truncate font-semibold text-slate-900">{r[ui.titleKey]}</span>
                          {badge && <Badge tone="accent">{badge}</Badge>}
                          {hidden && <Badge>masqué</Badge>}
                        </p>
                        {subtitle && <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">{subtitle}</p>}
                      </button>
                      <div className="flex shrink-0 items-center gap-1">
                        {ui.toggleKey && (
                          <button onClick={() => patch(r, { [ui.toggleKey!]: hidden }, hidden ? 'Visible sur le site' : 'Masqué du site')} className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100" aria-label={hidden ? 'Afficher' : 'Masquer'} title={hidden ? 'Afficher sur le site' : 'Masquer du site'}>
                            {hidden ? <EyeOff size={17} /> : <Eye size={17} />}
                          </button>
                        )}
                        <button onClick={() => openEdit(r)} className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Modifier"><Pencil size={17} /></button>
                        <button onClick={() => setDel(r)} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600" aria-label="Supprimer"><Trash2 size={17} /></button>
                      </div>
                    </div>
                  )
                })}
              </Card>
            </div>
          ))}
        </div>
      )}

      <Drawer
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing === 'new' ? `Ajouter ${ui.singular}` : 'Modifier'}
        subtitle={editing && editing !== 'new' ? String(editing[ui.titleKey] ?? '') : undefined}
        footer={
          <>
            <Button type="button" onClick={() => setEditing(null)}>Annuler</Button>
            <Button type="submit" form="collection-form" variant="primary" loading={saving}>{editing === 'new' ? 'Ajouter' : 'Enregistrer'}</Button>
          </>
        }
      >
        <form id="collection-form" onSubmit={save} className="grid grid-cols-2 gap-4">
          {ui.fields.map((f) => (
            <div key={f.key} className={f.half ? 'col-span-1' : 'col-span-2'}>
              <FieldInput field={f} value={form[f.key]} onChange={(v) => setForm((s) => ({ ...s, [f.key]: v }))} options={selectOptions[f.key]} />
            </div>
          ))}
          {ui.toggleKey && (
            <div className="col-span-2">
              <FieldInput field={{ key: ui.toggleKey, label: 'Visible sur le site', type: 'toggle', help: 'Décochez pour préparer un élément sans le publier.' }} value={form[ui.toggleKey]} onChange={(v) => setForm((s) => ({ ...s, [ui.toggleKey!]: v }))} />
            </div>
          )}
        </form>
      </Drawer>

      <Confirm open={del !== null} title={`Supprimer « ${del?.[ui.titleKey] ?? ''} » ?`} text="L’élément disparaît du site immédiatement. Vous pourrez toujours réinitialiser la démo." onConfirm={remove} onCancel={() => setDel(null)} loading={saving} />
    </section>
  )
}
