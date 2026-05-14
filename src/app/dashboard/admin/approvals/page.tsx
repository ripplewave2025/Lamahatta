import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth/getProfile'
import ApprovalRow from './ApprovalRow'

export const dynamic = 'force-dynamic'

type RequestRow = {
  id: string
  field_name: string
  old_value: string | null
  new_value: string
  reason: string | null
  created_at: string
  households: { hh_code: string; head_name: string } | null
  profiles: { full_name: string | null } | null
}

export default async function AdminApprovalsPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data } = await supabase
    .from('household_update_requests')
    .select(
      'id, field_name, old_value, new_value, reason, created_at, households!inner(hh_code, head_name), profiles!household_update_requests_requested_by_fkey(full_name)'
    )
    .eq('status', 'pending')
    .order('created_at', { ascending: true })

  const requests = ((data ?? []) as unknown as RequestRow[])

  return (
    <div className="min-h-screen bg-[#f4efe4] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900"
        >
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>

        <header className="mb-8 border-b border-stone-300 pb-6">
          <h1 className="font-serif text-4xl font-bold text-stone-900">Pending approvals</h1>
          <p className="mt-2 text-stone-600">
            {requests.length} request{requests.length === 1 ? '' : 's'} awaiting review.
          </p>
        </header>

        {requests.length === 0 ? (
          <div className="rounded-[2rem] border-2 border-dashed border-stone-300 bg-white/50 p-10 text-center text-stone-600">
            No pending requests. Good work.
          </div>
        ) : (
          <ul className="space-y-4">
            {requests.map((r) => (
              <ApprovalRow
                key={r.id}
                id={r.id}
                hhCode={r.households?.hh_code ?? '—'}
                headName={r.households?.head_name ?? '—'}
                requesterName={r.profiles?.full_name ?? 'Unknown'}
                fieldName={r.field_name}
                oldValue={r.old_value}
                newValue={r.new_value}
                reason={r.reason}
                createdAt={r.created_at}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
