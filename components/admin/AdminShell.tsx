'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import toast from 'react-hot-toast'
import { LogOut, ExternalLink, RotateCcw, Menu, X, Sparkles, LayoutDashboard, Inbox, Wrench, Calculator, Images, MapPin, Receipt, Star, ListOrdered, HelpCircle, Clock, Image as ImageIcon, Settings, CalendarCheck, Scissors, Sparkle, Users, Gift, Mail, Layers, type LucideIcon } from 'lucide-react'

/** Icônes disponibles pour la navigation (désignées par leur nom depuis le serveur). */
export const NAV_ICONS: Record<string, LucideIcon> = { LayoutDashboard, Inbox, Wrench, Calculator, Images, MapPin, Receipt, Star, ListOrdered, HelpCircle, Clock, Image: ImageIcon, Settings, CalendarCheck, Scissors, Sparkle, Users, Gift, Mail, Layers }
import { Confirm, cls } from './ui'

export type NavItem = { href: string; label: string; icon: string; exact?: boolean; count?: number; section?: string }

export function AdminShell({ brand, nav, email, tenantSince, ttlHours, children }: { brand: { name: string; sub: string; initial: string }; nav: NavItem[]; email: string; tenantSince: string; ttlHours: number; children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [busy, setBusy] = useState(false)

  const sinceMin = Math.max(0, Math.round((Date.now() - new Date(tenantSince).getTime()) / 60_000))
  const sinceLabel = sinceMin < 1 ? 'à l’instant' : sinceMin < 60 ? `il y a ${sinceMin} min` : `il y a ${Math.floor(sinceMin / 60)} h`

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.replace('/admin/login')
    router.refresh()
  }
  async function reset() {
    setBusy(true)
    try {
      const res = await fetch('/api/admin/reset', { method: 'POST' })
      if (!res.ok) throw new Error()
      toast.success('Votre copie est revenue à l’état initial')
      setConfirm(false)
      router.refresh()
    } catch {
      toast.error('Réinitialisation impossible')
    } finally {
      setBusy(false)
    }
  }

  const sections = Array.from(new Set(nav.map((n) => n.section ?? '')))
  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 py-5">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--a)] font-display text-xl font-extrabold text-[var(--a-ink)]">{brand.initial}</span>
        <div className="leading-tight">
          <p className="font-display text-lg font-bold uppercase tracking-wide text-white">{brand.name}</p>
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/50">{brand.sub}</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {sections.map((s) => (
          <div key={s} className="mb-3">
            {s && <p className="mb-1 mt-3 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">{s}</p>}
            {nav.filter((n) => (n.section ?? '') === s).map((n) => {
              const active = n.exact ? pathname === n.href : pathname.startsWith(n.href)
              const Icon = NAV_ICONS[n.icon] ?? Layers
              return (
                <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className={cls('mb-0.5 flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors', active ? 'bg-[var(--a)] text-[var(--a-ink)]' : 'text-white/75 hover:bg-white/10 hover:text-white')}>
                  <Icon size={18} />
                  <span className="flex-1">{n.label}</span>
                  {!!n.count && <span className={cls('rounded-full px-2 py-0.5 text-xs font-bold', active ? 'bg-black/15' : 'bg-[var(--a)] text-[var(--a-ink)]')}>{n.count}</span>}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
      <div className="border-t border-white/10 p-3">
        <div className="mb-2 rounded-xl bg-white/5 px-3 py-2.5 text-xs text-white/60">
          <p className="inline-flex items-center gap-1.5 font-semibold text-white/80"><Sparkles size={13} className="text-[var(--a)]" /> Votre copie de la démo</p>
          <p className="mt-1">Créée {sinceLabel}. Vos changements ne sont visibles que par vous ; la copie s’efface après {ttlHours} h sans activité.</p>
        </div>
        <button onClick={() => setConfirm(true)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/75 hover:bg-white/10 hover:text-white"><RotateCcw size={16} /> Réinitialiser ma copie</button>
        <a href="/" target="_blank" rel="noopener noreferrer" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/75 hover:bg-white/10 hover:text-white"><ExternalLink size={16} /> Voir le site</a>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/75 hover:bg-white/10 hover:text-white"><LogOut size={16} /> Déconnexion</button>
        <p className="mt-2 truncate px-3 text-[11px] text-white/35">{email}</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 hidden w-[260px] bg-[var(--dark)] lg:block">{sidebar}</aside>

      {/* barre mobile */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-[var(--dark)] px-4 py-3 text-white lg:hidden">
        <span className="font-display text-lg font-bold uppercase tracking-wide">{brand.name} · Espace propriétaire</span>
        <button onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-lg bg-white/10" aria-label="Menu"><Menu size={20} /></button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-[280px] bg-[var(--dark)]">{sidebar}</div>
          <button className="flex-1 bg-black/50" onClick={() => setOpen(false)} aria-label="Fermer le menu"><X size={24} className="ml-4 mt-4 text-white" /></button>
        </div>
      )}

      <div className="lg:pl-[260px]">
        <div className="hidden items-center justify-between border-b border-slate-200 bg-white px-8 py-3 lg:flex">
          <p className="text-sm text-slate-500">Espace propriétaire · les modifications sont visibles sur le site <strong className="text-slate-700">immédiatement</strong>.</p>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><ExternalLink size={15} /> Voir le site</a>
          </div>
        </div>
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>

      <Confirm open={confirm} title="Réinitialiser ma copie ?" text="Toutes vos modifications seront effacées et les données de démonstration reviendront. Les autres visiteurs ne sont pas concernés : chacun a sa propre copie." confirmLabel="Réinitialiser" onConfirm={reset} onCancel={() => setConfirm(false)} loading={busy} />
    </div>
  )
}
