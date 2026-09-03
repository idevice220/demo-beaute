import { getSettings, toSite } from '@/lib/settings'
import { HoursEditor } from '@/components/admin/HoursEditor'
import { PageHeader } from '@/components/admin/ui'

export const dynamic = 'force-dynamic'

export default async function HorairesPage() {
  const site = toSite(await getSettings())
  return (
    <div>
      <PageHeader title="Horaires" description="Le site affiche « Ouvert » ou « Fermé » en temps réel et ne propose des créneaux de réservation que pendant ces horaires. Une mention (« nocturne ») s’affiche à côté du jour." />
      <HoursEditor initial={site.hoursConfig} />
    </div>
  )
}
