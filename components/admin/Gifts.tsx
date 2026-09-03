'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Gift, Mail, Package, Check, RotateCcw, Trash2 } from 'lucide-react'
import { Badge, Button, Card, Confirm, Empty, PageHeader, cls, timeAgo } from './ui'

export type GiftRow = { id: number; amount: number; to: string; from: string; message: string | null; mode: string; status: string; createdAt: string }

export function Gifts({ gifts }: { gifts: GiftRow[] }) {
  const router = useRouter()
  const [busy, setBusy] = useState<number | null>(null)
  const [del, setDel] = useState<GiftRow | null>(null)
  const total = gifts.filter((g) => g.status === 'new').reduce((s, g) => s + g.amount, 0)

  async function setStatus(g: GiftRow, status: 'new' | 'sent') {
    setBusy(g.id)
    try {
      const res = await fetch(`/api/admin/gifts/${g.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
      if (!res.ok) throw new Error()
      toast.success(status === 'sent' ? 'Carte marquée envoyée' : 'Carte remise à traiter')
      router.refresh()
    } catch {
      toast.error('Action impossible')
    } finally {
      setBusy(null)
    }
  }
  async function remove() {
    if (!del) return
    const res = await fetch(`/api/admin/gifts/${del.id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Commande supprimée'); setDel(null); router.refresh() } else toast.error('Suppression impossible')
  }

  return (
    <section>
      <PageHeader title="Cartes cadeaux" description="Les cartes commandées depuis le site. Marquez-les envoyées une fois le paiement reçu et la carte transmise." actions={<Badge tone="accent">{total.toLocaleString('fr-FR')} € à traiter</Badge>} />
      {gifts.length === 0 ? (
        <Empty title="Aucune commande" text="Commandez une carte depuis le site pour la voir apparaître ici." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {gifts.map((g) => (
            <Card key={g.id} className={cls('p-5', busy === g.id && 'opacity-50', g.status === 'new' && 'border-l-4 border-l-[var(--a)]')}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--a)]/15 text-[var(--a-deep)]"><Gift size={20} /></span>
                  <div>
                    <p className="font-display text-2xl text-slate-900">{g.amount} €</p>
                    <p className="text-xs text-slate-500">{timeAgo(g.createdAt)}</p>
                  </div>
                </div>
                <Badge tone={g.status === 'new' ? 'amber' : 'green'}>{g.status === 'new' ? 'à envoyer' : 'envoyée'}</Badge>
              </div>
              <p className="mt-4 text-sm text-slate-700">Pour <strong>{g.to}</strong>{g.from && <> · de la part de <strong>{g.from}</strong></>}</p>
              {g.message && <p className="mt-2 rounded-xl bg-slate-50 px-3.5 py-2.5 font-display text-lg italic text-slate-700">« {g.message} »</p>}
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-slate-600">{g.mode === 'email' ? <><Mail size={14} className="text-[var(--a-deep)]" /> Par e-mail</> : <><Package size={14} className="text-[var(--a-deep)]" /> Dans un écrin, à retirer à l’institut</>}</p>
              <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <Button size="sm" variant="ghost" onClick={() => setDel(g)} aria-label="Supprimer"><Trash2 size={15} /></Button>
                {g.status === 'new' ? <Button size="sm" variant="primary" onClick={() => setStatus(g, 'sent')}><Check size={15} /> Marquer envoyée</Button> : <Button size="sm" onClick={() => setStatus(g, 'new')}><RotateCcw size={15} /> Remettre à traiter</Button>}
              </div>
            </Card>
          ))}
        </div>
      )}
      <Confirm open={del !== null} title="Supprimer cette commande ?" onConfirm={remove} onCancel={() => setDel(null)} />
    </section>
  )
}
