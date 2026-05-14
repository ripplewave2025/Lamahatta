import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth/getProfile'
import HouseholdsTable from './HouseholdsTable'

export const dynamic = 'force-dynamic'

type Row = {
  id: string
  hh_code: string
  head_name: string
  occupation: string | null
  family_size: number | null
  status: string | null
  linkedHead?: { full_name: string | null; email: string | null } | null
}

export default async function AdminHouseholdsPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data: households } = await supabase
    .from('households')
    .select('id, hh_code, head_name, occupation, family_size, status')
    .order('hh_code')

  // Pull linked profiles in one shot
  const { data: profiles } = await supabase
    .from('profiles')
    .select('full_name, household_id, role')
    .not('household_id', 'is', null)

  const profileByHh = new Map<string, { full_name: string | null }>()
  ;(profiles ?? []).forEach((p) => {
    if (p.household_id) profileByHh.set(p.household_id, { full_name: p.full_name })
  })

  const rows: Row[] = (households ?? []).map((h) => ({
    ...h,
    linkedHead: profileByHh.get(h.id)
      ? { full_name: profileByHh.get(h.id)!.full_name, email: null }
      : null,
  }))

  return (
    <div className="min-h-screen bg-[#f4efe4] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900"
        >
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>

        <header className="mb-8 border-b border-stone-300 pb-6">
          <h1 className="font-serif text-4xl font-bold text-stone-900">Manage households</h1>
          <p className="mt-2 text-stone-600">
            {rows.length} households · invite household heads to give them sign-in access.
          </p>
        </header>

        <HouseholdsTable rows={rows} />
      </div>
    </div>
  )
}
