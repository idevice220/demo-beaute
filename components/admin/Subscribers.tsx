'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Copy, Trash2, Check } from 'lucide-react'
import { Button, Card, Confirm, Empty, PageHeader, timeAgo } from './ui'

export type SubscriberRow = { id: number; email: string; createdAt: string }

export function Subscribers({ subscribers }: { subscribers: SubscriberRow[] }) {
  const router = useRouter()
  const [del, setDel] = useState<SubscriberRow | null>(null)
  const [copied, setCopied] = useState(false)

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(subscribers.map((s) => s.email).join(', '))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
      toast.success('Adresses copiées : collez-les dans votre outil d’envoi')
    } catch {
      toast.error('Copie impossible')
    }
  }
  async function remove() {
    if (!del) return
    const res = await fetch(`/api/admin/subscribers/${del.id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Désinscrit'); setDel(null); router.refresh() } else toast.error('Suppression impossible')
  }

  return (
    <section>
      <PageHeader title="Newsletter" description="Les personnes inscrites depuis le site. Copiez la liste pour votre prochain envoi." actions={<Button variant="primary" onClick={copyAll} disabled={!subscribers.length}>{copied ? <Check size={16} /> : <Copy size={16} />} Copier les {subscribers.length} adresses</Button>} />
      {subscribers.length === 0 ? (
        <Empty title="Aucun inscrit pour l’instant" text="Le formulaire en bas du site alimente cette liste." />
      ) : (
        <Card className="divide-y divide-slate-100">
          {subscribers.map((s) => (
            <div key={s.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <p className="font-medium text-slate-900">{s.email}</p>
                <p className="text-xs text-slate-500">inscrit·e {timeAgo(s.createdAt)}</p>
              </div>
              <button onClick={() => setDel(s)} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600" aria-label="Désinscrire"><Trash2 size={16} /></button>
            </div>
          ))}
        </Card>
      )}
      <Confirm open={del !== null} title={`Désinscrire ${del?.email ?? ''} ?`} confirmLabel="Désinscrire" onConfirm={remove} onCancel={() => setDel(null)} />
    </section>
  )
}
