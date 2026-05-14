import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/auth/getProfile'

export const dynamic = 'force-dynamic'

type Request = {
  id: string
  field_name: string
  old_value: string | null
  new_value: string
  reason: string | null
  status: 'pending' | 'approved' | 'rejected'
  review_note: string | null
  created_at: string
  reviewed_at: string | null
}

export default async function MyRequestsPage() {
  const { user } = await getSession()
  const supabase = await createClient()

  const { data } = await supabase
    .from('household_update_requests')
    .select('id, field_name, old_value, new_value, reason, status, review_note, created_at, reviewed_at')
    .eq('requested_by', user.id)
    .order('created_at', { ascending: false })

  const requests = (data ?? []) as Request[]

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
          <h1 className="font-serif text-4xl font-bold text-stone-900">My update requests</h1>
          <p className="mt-2 text-stone-600">
            Changes you&apos;ve proposed to your household record.
          </p>
        </header>

        {requests.length === 0 ? (
          <div className="rounded-[2rem] border-2 border-dashed border-stone-300 bg-white/50 p-10 text-center text-stone-600">
            No requests yet.{' '}
            <Link href="/dashboard/household" className="font-semibold text-stone-900 underline">
              Propose a change
            </Link>
            .
          </div>
        ) : (
          <ul className="space-y-4">
            {requests.map((r) => (
              <li key={r.id} className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-700">
                    {r.field_name}
                  </span>
                  <StatusBadge status={r.status} />
                  <span className="ml-auto text-xs text-stone-500">
                    {new Date(r.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-stone-600">
                  <span className="text-stone-400 line-through">{r.old_value || '—'}</span>{' '}
                  <span className="mx-2 text-stone-400">→</span>{' '}
                  <span className="font-semibold text-stone-900">{r.new_value}</span>
                </p>
                {r.reason && <p className="mt-2 text-sm italic text-stone-600">&ldquo;{r.reason}&rdquo;</p>}
                {r.review_note && (
                  <p className="mt-3 rounded-lg bg-stone-50 px-3 py-2 text-xs text-stone-700">
                    <span className="font-semibold">Admin note:</span> {r.review_note}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: 'pending' | 'approved' | 'rejected' }) {
  const cls =
    status === 'approved'
      ? 'bg-emerald-100 text-emerald-800'
      : status === 'rejected'
      ? 'bg-red-100 text-red-700'
      : 'bg-amber-100 text-amber-800'
  return (
    <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${cls}`}>
      {status}
    </span>
  )
}
