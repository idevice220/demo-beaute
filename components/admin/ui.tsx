'use client'

import { useEffect, type ReactNode } from 'react'
import { X, Loader2, AlertTriangle } from 'lucide-react'

export const cls = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(' ')

export const inputCls =
  'w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[var(--a)] focus:ring-2 focus:ring-[var(--a)]/25 disabled:bg-slate-50'

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-slate-900">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-[15px] text-slate-500">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={cls('rounded-2xl border border-slate-200 bg-white shadow-sm', className)}>{children}</div>
}

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; loading?: boolean; size?: 'sm' | 'md' }
export function Button({ variant = 'secondary', loading, size = 'md', className = '', children, disabled, ...rest }: BtnProps) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60'
  const sz = size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2.5 text-sm'
  const v = {
    primary: 'bg-[var(--a)] text-[var(--a-ink)] hover:bg-[var(--a-hover)]',
    secondary: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
    ghost: 'text-slate-600 hover:bg-slate-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }[variant]
  return (
    <button className={cls(base, sz, v, className)} disabled={disabled || loading} {...rest}>
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  )
}

export function Toggle({ checked, onChange, label, small }: { checked: boolean; onChange: (v: boolean) => void; label?: string; small?: boolean }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)} className="inline-flex items-center gap-2">
      <span className={cls('relative inline-flex shrink-0 items-center rounded-full transition-colors', small ? 'h-5 w-9' : 'h-6 w-11', checked ? 'bg-emerald-500' : 'bg-slate-300')}>
        <span className={cls('inline-block transform rounded-full bg-white shadow transition-transform', small ? 'h-3.5 w-3.5' : 'h-4 w-4', checked ? (small ? 'translate-x-[18px]' : 'translate-x-6') : 'translate-x-1')} />
      </span>
      {label && <span className="text-sm text-slate-700">{label}</span>}
    </button>
  )
}

export function Badge({ children, tone = 'slate' }: { children: ReactNode; tone?: 'slate' | 'accent' | 'green' | 'amber' | 'red' | 'blue' }) {
  const t = {
    slate: 'bg-slate-100 text-slate-700',
    accent: 'bg-[var(--a)]/15 text-[var(--a-deep)]',
    green: 'bg-emerald-100 text-emerald-800',
    amber: 'bg-amber-100 text-amber-800',
    red: 'bg-red-100 text-red-700',
    blue: 'bg-sky-100 text-sky-800',
  }[tone]
  return <span className={cls('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', t)}>{children}</span>
}

export function Empty({ title, text, action }: { title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
      <p className="font-semibold text-slate-700">{title}</p>
      {text && <p className="mt-1 text-sm text-slate-500">{text}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

/** Panneau latéral (droite) sur grand écran, feuille plein écran sur mobile. */
export function Drawer({ open, onClose, title, subtitle, children, footer }: { open: boolean; onClose: () => void; title: string; subtitle?: string; children: ReactNode; footer?: ReactNode }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[90] flex justify-end bg-slate-900/40 backdrop-blur-[2px]" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()} className="flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-slate-900">{title}</h2>
            {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-500 hover:bg-slate-100" aria-label="Fermer"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-6 py-4">{footer}</div>}
      </div>
    </div>
  )
}

export function Confirm({ open, title, text, confirmLabel = 'Supprimer', onConfirm, onCancel, loading }: { open: boolean; title: string; text?: string; confirmLabel?: string; onConfirm: () => void; onCancel: () => void; loading?: boolean }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4" onClick={onCancel}>
      <div role="alertdialog" aria-modal="true" onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-red-100 text-red-600"><AlertTriangle size={22} /></span>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            {text && <p className="mt-1 text-sm text-slate-500">{text}</p>}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel}>Annuler</Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  )
}

export { timeAgo } from '@/lib/admin/format'
