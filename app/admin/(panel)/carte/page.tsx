import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth'
import { Collection } from '@/components/admin/Collection'
import { PageHeader } from '@/components/admin/ui'

export const dynamic = 'force-dynamic'

export default async function CartePage() {
  const { tenant } = await requireSession()
  const [categories, soins] = await Promise.all([
    prisma.category.findMany({ where: { tenant }, orderBy: { order: 'asc' } }),
    prisma.soin.findMany({ where: { tenant }, orderBy: { order: 'asc' } }),
  ])
  const catOptions = categories.map((c) => ({ value: c.id, label: c.name }))
  return (
    <div className="space-y-10">
      <PageHeader title="La carte des soins" description="Les catégories et chaque soin avec sa durée et son prix. Tout ce qui est ici est réservable en ligne : un soin masqué disparaît aussi du module de réservation." />
      <Collection resource="soins" rows={soins} selectOptions={{ categoryId: catOptions }} embedded />
      <Collection resource="categories" rows={categories} embedded />
    </div>
  )
}
