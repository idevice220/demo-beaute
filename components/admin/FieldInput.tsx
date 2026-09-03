'use client'

import type { Field, Option } from '@/lib/admin/fields'
import { inputCls, Toggle } from './ui'
import { ImageField } from './ImageField'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Val = any

/** Un champ de formulaire, rendu selon son type. */
export function FieldInput({ field, value, onChange, options }: { field: Field; value: Val; onChange: (v: Val) => void; options?: Option[] }) {
  const id = `f-${field.key}`
  const label = (
    <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-700">
      {field.label} {field.required && <span className="text-red-500">*</span>}
    </label>
  )
  const help = field.help ? <p className="mt-1 text-xs text-slate-500">{field.help}</p> : null

  switch (field.type) {
    case 'toggle':
      return (
        <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-slate-700">{field.label}</p>
            {help}
          </div>
          <Toggle checked={!!value} onChange={onChange} label={field.label} />
        </div>
      )
    case 'textarea':
      return (
        <div>
          {label}
          <textarea id={id} rows={field.rows ?? 3} value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} required={field.required} className={inputCls} />
          {help}
        </div>
      )
    case 'lines':
      return (
        <div>
          {label}
          <textarea id={id} rows={field.rows ?? 4} value={Array.isArray(value) ? value.join('\n') : value ?? ''} onChange={(e) => onChange(e.target.value.split('\n'))} placeholder={field.placeholder} className={inputCls} />
          <p className="mt-1 text-xs text-slate-500">{field.help ?? 'Une ligne par élément.'}</p>
        </div>
      )
    case 'number':
      return (
        <div>
          {label}
          <input id={id} type="number" inputMode="decimal" value={value ?? ''} onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))} min={field.min} max={field.max} step={field.step ?? 1} required={field.required} className={inputCls} />
          {help}
        </div>
      )
    case 'select': {
      const opts = options ?? field.options ?? []
      return (
        <div>
          {label}
          <select id={id} value={value ?? ''} onChange={(e) => { const o = opts.find((x) => String(x.value) === e.target.value); onChange(o ? o.value : e.target.value) }} required={field.required} className={inputCls}>
            <option value="" disabled>Choisir…</option>
            {opts.map((o) => <option key={String(o.value)} value={String(o.value)}>{o.label}</option>)}
          </select>
          {help}
        </div>
      )
    }
    case 'image':
      return <ImageField label={`${field.label}${field.required ? ' *' : ''}`} value={value ?? ''} onChange={onChange} />
    default:
      return (
        <div>
          {label}
          <input id={id} type="text" value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} required={field.required} className={inputCls} />
          {help}
        </div>
      )
  }
}
