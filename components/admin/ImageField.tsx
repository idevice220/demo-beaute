'use client'

import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Upload, Images, ImageOff, Trash2, Check } from 'lucide-react'
import { Button, Drawer, cls } from './ui'
import { BUNDLED_IMAGES } from '@/lib/admin/images'

type MediaItem = { id: string; url: string; name: string; width: number; height: number }

/** Téléverse une image (POST /api/admin/media) et renvoie son URL. */
export async function uploadImage(file: File): Promise<string | null> {
  const fd = new FormData()
  fd.append('file', file)
  const res = await fetch('/api/admin/media', { method: 'POST', body: fd })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) { toast.error(data.error || 'Téléversement impossible'); return null }
  return data.url as string
}

export function ImageField({ value, onChange, label }: { value: string; onChange: (url: string) => void; label?: string }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [pick, setPick] = useState(false)

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setUploading(true)
    const url = await uploadImage(f)
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
    if (url) { onChange(url); toast.success('Photo ajoutée') }
  }

  return (
    <div>
      {label && <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>}
      <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="relative grid h-20 w-28 shrink-0 place-items-center overflow-hidden rounded-lg border border-slate-200 bg-white">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageOff size={20} className="text-slate-300" />
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="primary" loading={uploading} onClick={() => fileRef.current?.click()}><Upload size={15} /> {value ? 'Remplacer' : 'Téléverser'}</Button>
          <Button type="button" size="sm" onClick={() => setPick(true)}><Images size={15} /> Photothèque</Button>
          {value && <Button type="button" size="sm" variant="ghost" onClick={() => onChange('')}><Trash2 size={15} /> Retirer</Button>}
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
      </div>
      <PickerDrawer open={pick} onClose={() => setPick(false)} current={value} onPick={(u) => { onChange(u); setPick(false) }} />
    </div>
  )
}

function PickerDrawer({ open, onClose, current, onPick }: { open: boolean; onClose: () => void; current: string; onPick: (url: string) => void }) {
  const [items, setItems] = useState<MediaItem[] | null>(null)
  useEffect(() => {
    if (!open) return
    setItems(null)
    fetch('/api/admin/media').then((r) => r.json()).then(setItems).catch(() => setItems([]))
  }, [open])
  const all = [...(items ?? []).map((m) => ({ url: m.url, name: m.name })), ...BUNDLED_IMAGES]
  return (
    <Drawer open={open} onClose={onClose} title="Photothèque" subtitle="Vos photos téléversées, puis celles livrées avec le site.">
      {items === null ? (
        <p className="text-sm text-slate-500">Chargement…</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {all.map((m) => {
            const on = m.url === current
            return (
              <button key={m.url} type="button" onClick={() => onPick(m.url)} className={cls('group relative aspect-[4/3] overflow-hidden rounded-xl border-2 bg-slate-100 text-left', on ? 'border-[var(--a)]' : 'border-transparent hover:border-slate-300')}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt={m.name} className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/60 to-transparent px-2 pb-1.5 pt-6 text-[11px] font-medium text-white">{m.name}</span>
                {on && <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-[var(--a)] text-[var(--a-ink)]"><Check size={14} strokeWidth={3} /></span>}
              </button>
            )
          })}
        </div>
      )}
    </Drawer>
  )
}
