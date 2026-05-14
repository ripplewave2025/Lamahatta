import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/auth/getProfile'
import SignOutButton from '@/components/dashboard/SignOutButton'
import { Settings, ShieldCheck, Users, FileText, Clock, ArrowRight, BookOpen } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const { user, profile, household } = await getSession()
  const isAdmin = profile.role === 'admin'

  const supabase = await createClient()

  let pendingCount = 0
  let myRequestCount = 0
  if (isAdmin) {
    const { count } = await supabase
      .from('household_update_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')
    pendingCount = count ?? 0
  } else {
    const { count } = await supabase
      .from('household_update_requests')
      .select('*', { count: 'exact', head: true })
      .eq('requested_by', user.id)
    myRequestCount = count ?? 0
  }

  let totalHouseholds = 0
  if (isAdmin) {
    const { count } = await supabase
      .from('households')
      .select('*', { count: 'exact', head: true })
    totalHouseholds = count ?? 0
  }

  const displayName = profile.full_name || user.email || 'Member'

  return (
    <div className="min-h-screen bg-[#f4efe4] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <header className="mx-auto mb-12 flex max-w-6xl flex-col gap-4 border-b border-stone-300 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-stone-700">
            {isAdmin ? (
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            ) : (
              <Settings className="h-4 w-4 text-stone-500" />
            )}
            {isAdmin ? 'Role: Samaj Head / Admin' : 'Role: Worker / Villager'}
          </div>
          <h1 className="mb-2 font-serif text-4xl font-bold text-stone-900">
            {isAdmin ? 'Admin Dashboard' : 'Member Dashboard'}
          </h1>
          <p className="text-lg text-stone-600">Welcome back, {displayName}</p>
        </div>
        <SignOutButton />
      </header>

      <main className="mx-auto max-w-6xl space-y-10">
        {isAdmin ? (
          <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <StatCard
              icon={<Clock className="h-5 w-5" />}
              tone="amber"
              title="Pending Approvals"
              value={pendingCount}
              caption="Update requests awaiting your review"
              href="/dashboard/admin/approvals"
              cta="Open queue"
            />
            <StatCard
              icon={<Users className="h-5 w-5" />}
              tone="sky"
              title="Households"
              value={totalHouseholds}
              caption="Manage records & invite household heads"
              href="/dashboard/admin/households"
              cta="Manage"
            />
            <StatCard
              icon={<BookOpen className="h-5 w-5" />}
              tone="emerald"
              title="Village Directory"
              value={null}
              caption="Skills, education, elderly, migration"
              href="/dashboard/directory"
              cta="Explore"
            />
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <StatCard
              icon={<Users className="h-5 w-5" />}
              tone="sky"
              title="My Household"
              value={household?.hh_code ?? '—'}
              caption={household ? household.head_name : 'Not linked yet — ask Samaj Head'}
              href="/dashboard/household"
              cta="View"
            />
            <StatCard
              icon={<FileText className="h-5 w-5" />}
              tone="amber"
              title="Update Requests"
              value={myRequestCount}
              caption="Changes you have submitted"
              href="/dashboard/requests"
              cta="View"
            />
            <StatCard
              icon={<BookOpen className="h-5 w-5" />}
              tone="emerald"
              title="Village Directory"
              value={null}
              caption="See skills, education, migration"
              href="/dashboard/directory"
              cta="Explore"
            />
          </section>
        )}

        {!household && !isAdmin && (
          <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
            Your account isn&apos;t linked to a household yet. The Samaj Head needs to assign your household
            code. Please contact them, or come back after they&apos;ve linked you.
          </div>
        )}
      </main>
    </div>
  )
}

function StatCard({
  icon,
  tone,
  title,
  value,
  caption,
  href,
  cta,
}: {
  icon: React.ReactNode
  tone: 'amber' | 'sky' | 'emerald'
  title: string
  value: string | number | null
  caption: string
  href: string
  cta: string
}) {
  const toneClasses: Record<string, string> = {
    amber: 'bg-amber-100 text-amber-700',
    sky: 'bg-sky-100 text-sky-700',
    emerald: 'bg-emerald-100 text-emerald-700',
  }
  return (
    <div className="flex flex-col rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className={`rounded-xl p-3 ${toneClasses[tone]}`}>{icon}</div>
        <h3 className="font-serif text-xl text-stone-900">{title}</h3>
      </div>
      {value !== null && (
        <p className="mb-2 font-serif text-4xl font-bold text-stone-900">{value}</p>
      )}
      <p className="mb-6 text-sm text-stone-600">{caption}</p>
      <Link
        href={href}
        className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-stone-100 px-4 py-3 text-sm font-bold text-stone-800 transition hover:bg-stone-200"
      >
        {cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}
