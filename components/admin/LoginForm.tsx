'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react'

export function LoginForm({ demoEmail, demoPassword }: { demoEmail: string; demoPassword: string }) {
  const router = useRouter()
  const params = useSearchParams()
  const [email, setEmail] = useState(demoEmail)
  const [password, setPassword] = useState(demoPassword)
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) { toast.error(data.error || 'Connexion impossible'); return }
      const from = params.get('from')
      router.replace(from && from.startsWith('/admin') ? from : '/admin')
      router.refresh()
    } catch {
      toast.error('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  const field = 'w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-[15px] text-slate-900 outline-none focus:border-[var(--a)] focus:ring-2 focus:ring-[var(--a)]/30'
  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-slate-700">E-mail</span>
        <span className="relative block"><Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} autoComplete="username" /></span>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-slate-700">Mot de passe</span>
        <span className="relative block"><Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={field} autoComplete="current-password" /></span>
      </label>
      <button disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--a)] px-5 py-3.5 font-display text-xl font-bold text-[var(--a-ink)] transition-colors hover:bg-[var(--a-hover)] disabled:opacity-60">
        {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />} Entrer dans l’espace propriétaire
      </button>
    </form>
  )
}
