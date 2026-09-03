'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Upload, Trash2, Link2, Check } from 'lucide-react'
import { Button, Card, Confirm, Empty, PageHeader, cls } from './ui'
import { uploadImage } from './ImageField'

export type MediaRow = { id: string; url: string; name: string; width: number; height: number; size: number; createdAt: string }

export function MediaLibrary({ items }: { items: MediaRow[] }) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [del, setDel] = useState<MediaRow | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [drag, setDrag] = useState(false)

  async function handleFiles(files: FileList | File[]) {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'))
    if (!list.length) return
    setUploading(true)
    let ok = 0
    for (const f of list) if (await uploadImage(f)) ok++
    setUploading(false)
    if (ok) { toast.success(ok > 1 ? `${ok} photos ajoutées` : 'Photo ajoutée'); router.refresh() }
  }
  async function remove() {
    if (!del) return
    const res = await fetch(`/api/admin/media/${del.id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Photo supprimée'); setDel(null); router.refresh() } else toast.error('Suppression impossible')
  }
  async function copy(m: MediaRow) {
    try {
      await navigator.clipboard.writeText(window.location.origin + m.url)
      setCopied(m.id)
      setTimeout(() => setCopied(null), 1500)
    } catch {
      toast.error('Copie impossible')
    }
  }

  return (
    <section>
      <PageHeader title="Photos" description="Vos photos, redimensionnées et optimisées automatiquement. Utilisez-les ensuite dans les réalisations, les services ou la page d’accueil." actions={<Button variant="primary" loading={uploading} onClick={() => fileRef.current?.click()}><Upload size={16} /> Téléverser</Button>} />
      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files)} />

      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files) }}
        className={cls('mb-6 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors', drag ? 'border-[var(--a)] bg-[var(--a)]/10' : 'border-slate-300 bg-white')}
      >
        <p className="font-semibold text-slate-700">Glissez vos photos ici</p>
        <p className="mt-1 text-sm text-slate-500">JPEG, PNG, WebP ou HEIC jusqu’à 8 Mo. Elles sont converties en WebP (1600 px max).</p>
      </div>

      {items.length === 0 ? (
        <Empty title="Aucune photo téléversée" text="Les photos livrées avec le site restent disponibles dans la photothèque des formulaires." />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((m) => (
            <Card key={m.id} className="overflow-hidden">
              <div className="relative aspect-[4/3] bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt={m.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-semibold text-slate-800">{m.name}</p>
                <p className="text-xs text-slate-500">{m.width}×{m.height} · {Math.round(m.size / 1024)} Ko</p>
                <div className="mt-2 flex justify-between">
                  <button onClick={() => copy(m)} className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900">{copied === m.id ? <Check size={13} /> : <Link2 size={13} />} {copied === m.id ? 'Copié' : 'Copier le lien'}</button>
                  <button onClick={() => setDel(m)} className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline"><Trash2 size={13} /> Supprimer</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Confirm open={del !== null} title="Supprimer cette photo ?" text="Si elle est utilisée sur le site, l’emplacement apparaîtra vide." onConfirm={remove} onCancel={() => setDel(null)} />
    </section>
  )
}
