'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Save } from 'lucide-react'
import type { Field } from '@/lib/admin/fields'
import { Button, Card } from './ui'
import { FieldInput } from './FieldInput'

export type SettingsGroup = { title: string; description?: string; fields: Field[] }

/** Formulaire de réglages clé/valeur : chaque groupe est une carte, tout s'enregistre d'un coup. */
export function SettingsForm({ groups, initial }: { groups: SettingsGroup[]; initial: Record<string, string> }) {
  const router = useRouter()
  const [values, setValues] = useState<Record<string, string>>(() => {
    const v: Record<string, string> = {}
    for (const g of groups) for (const f of g.fields) v[f.key] = initial[f.key] ?? ''
    return v
  })
  const [saving, setSaving] = useState(false)

  const get = (f: Field) => (f.type === 'toggle' ? values[f.key] !== 'false' && values[f.key] !== '' : f.type === 'lines' ? values[f.key].split('\n') : values[f.key])
  const set = (f: Field, v: unknown) => setValues((s) => ({ ...s, [f.key]: f.type === 'toggle' ? (v ? 'true' : 'false') : Array.isArray(v) ? v.join('\n') : String(v ?? '') }))

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.entries(values).map(([key, value]) => ({ key, value }))) })
      if (!res.ok) throw new Error()
      toast.success('Enregistré — c’est en ligne')
      router.refresh()
    } catch {
      toast.error('Enregistrement impossible')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={save} className="space-y-6">
      {groups.map((g) => (
        <Card key={g.title} className="p-5 sm:p-6">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-slate-900">{g.title}</h2>
          {g.description && <p className="mt-1 text-sm text-slate-500">{g.description}</p>}
          <div className="mt-5 grid grid-cols-2 gap-4">
            {g.fields.map((f) => (
              <div key={f.key} className={f.half ? 'col-span-2 sm:col-span-1' : 'col-span-2'}>
                <FieldInput field={f} value={get(f)} onChange={(v) => set(f, v)} />
              </div>
            ))}
          </div>
        </Card>
      ))}
      <div className="sticky bottom-4 flex justify-end">
        <Button type="submit" variant="primary" loading={saving} className="shadow-lg"><Save size={16} /> Enregistrer les modifications</Button>
      </div>
    </form>
  )
}
