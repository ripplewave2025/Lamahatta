import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getSession, type Household } from '@/lib/auth/getProfile'
import SignOutButton from '@/components/dashboard/SignOutButton'
import {
  Settings,
  ShieldCheck,
  Users,
  FileText,
  Clock,
  ArrowRight,
  BookOpen,
  MapPin,
  AlertCircle,
  Megaphone,
  GraduationCap,
  Sparkles,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const GOLD = '#D4AF37'

export default async function Dashboard() {
  const { user, profile, household } = await getSession()
  const isAdmin = profile.role === 'admin'
  const displayName = profile.full_name || user.email || 'Member'

  return (
    <div className="min-h-screen bg-[#f4efe4] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <header className="mx-auto mb-10 flex max-w-6xl flex-col gap-4 border-b border-stone-300 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-stone-700">
            {isAdmin ? (
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            ) : (
              <Settings className="h-4 w-4 text-stone-500" />
            )}
            {isAdmin ? 'Role: Samaj Head / Admin' : 'Role: Member · Villager'}
          </div>
          <h1 className="mb-2 font-serif text-4xl font-bold text-stone-900">
            {isAdmin ? 'Admin Dashboard' : `Welcome home, ${firstName(displayName)}`}
          </h1>
          <p className="text-lg text-stone-600">
            {isAdmin ? `Welcome back, ${displayName}` : 'Heart of Gold · your village space'}
          </p>
        </div>
        <SignOutButton />
      </header>

      <main className="mx-auto max-w-6xl">
        {isAdmin ? <AdminHome userId={user.id} /> : <VillagerHome userId={user.id} household={household} />}
      </main>
    </div>
  )
}

// ─────────────────────── Admin ───────────────────────

async function AdminHome({ userId: _userId }: { userId: string }) {
  const supabase = await createClient()
  const { count: pending } = await supabase
    .from('household_update_requests')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  const { count: total } = await supabase
    .from('households')
    .select('*', { count: 'exact', head: true })

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <StatCard
        icon={<Clock className="h-5 w-5" />}
        tone="amber"
        title="Pending Approvals"
        value={pending ?? 0}
        caption="Update requests awaiting your review"
        href="/dashboard/admin/approvals"
        cta="Open queue"
      />
      <StatCard
        icon={<Users className="h-5 w-5" />}
        tone="sky"
        title="Households"
        value={total ?? 0}
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
  )
}

// ─────────────────────── Villager ───────────────────────

type RequestSummary = {
  pending: number
  approved: number
  rejected: number
  latest: { field_name: string; new_value: string; status: string; created_at: string }[]
}

async function VillagerHome({ userId, household }: { userId: string; household: Household | null }) {
  const supabase = await createClient()
  const { data: myRequests } = await supabase
    .from('household_update_requests')
    .select('field_name, new_value, status, created_at')
    .eq('requested_by', userId)
    .order('created_at', { ascending: false })

  const reqs = (myRequests ?? []) as RequestSummary['latest']
  const summary: RequestSummary = {
    pending: reqs.filter((r) => r.status === 'pending').length,
    approved: reqs.filter((r) => r.status === 'approved').length,
    rejected: reqs.filter((r) => r.status === 'rejected').length,
    latest: reqs.slice(0, 3),
  }

  return (
    <div className="space-y-10">
      {/* Unlinked banner */}
      {!household && (
        <div className="flex items-start gap-3 rounded-[2rem] border border-amber-200 bg-amber-50 p-6 text-amber-900">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <div className="space-y-1 text-sm">
            <p className="font-semibold">Your account isn&apos;t linked to a household yet.</p>
            <p className="text-amber-900/85">
              The Samaj Head needs to assign your household code (HH-01 … HH-22). Reach out to them or check
              back after they&apos;ve linked you. You can still browse the Village Directory below.
            </p>
          </div>
        </div>
      )}

      {/* Household card */}
      {household && <HouseholdCard household={household} />}

      {/* Update requests strip */}
      <RequestsStrip summary={summary} />

      {/* Tutorials & Training (placeholder) */}
      <PlaceholderStrip
        icon={<GraduationCap className="h-5 w-5" style={{ color: GOLD }} />}
        title="Tutorials & Training"
        subtitle="Guides from the Samaj Head — using this site, government schemes, schools and more"
        cards={[
          { title: 'How to update your household record', tag: 'Site', body: 'Step-by-step on submitting an update request.' },
          { title: 'PM Kisan & state farming schemes', tag: 'Schemes', body: 'What you qualify for and how to register.' },
          { title: 'Lamahatta schools — admission window', tag: 'Education', body: 'Dates, documents, and who to talk to.' },
        ]}
        comingSoon
      />

      {/* Announcements (placeholder) */}
      <PlaceholderStrip
        icon={<Megaphone className="h-5 w-5" style={{ color: GOLD }} />}
        title="From the Samaj Head"
        subtitle="Announcements, meeting notes, and decisions the village should know about"
        cards={[
          { title: 'Next village meeting', tag: 'Meeting', body: 'Date & agenda will be posted here.' },
          { title: 'Water tank repair update', tag: 'Infrastructure', body: 'Status of ongoing work in the village.' },
          { title: 'Elderly care roster', tag: 'Heart of Gold', body: 'Daily companions and medicine delivery rota.' },
        ]}
        comingSoon
      />

      {/* CTAs */}
      <section className="grid gap-4 sm:grid-cols-2">
        <CtaCard
          icon={<FileText className="h-5 w-5" />}
          title="Request an update"
          body="Found something wrong about your household? Propose a change — the Samaj Head reviews each one."
          href="/dashboard/household"
          cta="Open your household"
          disabled={!household}
        />
        <CtaCard
          icon={<BookOpen className="h-5 w-5" />}
          title="Village Directory"
          body="See the Heart of Gold view — skills, education, elderly care, economy, and the family directory."
          href="/dashboard/directory"
          cta="Explore"
        />
      </section>
    </div>
  )
}

function HouseholdCard({ household }: { household: Household }) {
  return (
    <section
      className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
      style={{ borderTop: `4px solid ${GOLD}` }}
    >
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-stone-900 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300">
          {household.hh_code}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-stone-500">
          <MapPin className="h-3 w-3" /> Sunaraygoan · Lamahatta
        </span>
        {needsAttention(household) && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800">
            <Sparkles className="h-3 w-3" /> Needs a review
          </span>
        )}
      </div>

      <h2 className="font-serif text-3xl font-bold text-stone-900">{household.head_name}</h2>
      <p className="mt-1 text-stone-600">{household.occupation ?? '—'}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Field label="Family size" value={household.family_size?.toString() ?? '—'} />
        <Field label="Status" value={household.status ?? '—'} />
        <Field label="Elderly (60+)" value={household.has_elderly ? 'Yes' : 'No'} />
        <Field label="Youth in education" value={household.has_youth ? 'Yes' : 'No'} />
      </div>

      <div className="mt-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">Skills</p>
        <p className="mt-1 text-sm text-stone-800">
          {household.skills.length ? household.skills.join(', ') : '—'}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">Notes</p>
        <p className="mt-1 text-sm text-stone-700">{household.notes ?? '—'}</p>
      </div>

      <Link
        href="/dashboard/household"
        className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-stone-950 transition hover:brightness-95"
        style={{ backgroundColor: GOLD }}
      >
        Open your household
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}

function RequestsStrip({ summary }: { summary: RequestSummary }) {
  const total = summary.pending + summary.approved + summary.rejected
  return (
    <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-amber-50 p-2.5">
            <FileText className="h-5 w-5" style={{ color: GOLD }} />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">Your update requests</h3>
            <p className="text-sm text-stone-600">{total === 0 ? 'No requests yet.' : `${total} total · ${summary.pending} pending`}</p>
          </div>
        </div>
        {total > 0 && (
          <Link
            href="/dashboard/requests"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-xs font-bold uppercase tracking-wider text-stone-800 hover:bg-stone-100"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {total === 0 ? (
        <p className="rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 p-6 text-center text-sm text-stone-600">
          When you propose a change to your household, it&apos;ll appear here as <strong>pending</strong> until the
          Samaj Head reviews it.
        </p>
      ) : (
        <>
          <div className="mb-4 flex gap-2">
            <Pill tone="amber" count={summary.pending} label="Pending" />
            <Pill tone="emerald" count={summary.approved} label="Approved" />
            <Pill tone="red" count={summary.rejected} label="Rejected" />
          </div>
          <ul className="space-y-2">
            {summary.latest.map((r, i) => (
              <li key={i} className="flex items-center justify-between rounded-xl bg-stone-50 px-4 py-2.5 text-sm">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500">{r.field_name}</span>
                  <span className="ml-2 text-stone-800">→ {r.new_value}</span>
                </div>
                <StatusBadge status={r.status} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

function PlaceholderStrip({
  icon,
  title,
  subtitle,
  cards,
  comingSoon,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  cards: { title: string; tag: string; body: string }[]
  comingSoon?: boolean
}) {
  return (
    <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-xl bg-amber-50 p-2.5">{icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-serif text-2xl font-bold text-stone-900">{title}</h3>
            {comingSoon && (
              <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-600">
                Coming soon
              </span>
            )}
          </div>
          <p className="text-sm text-stone-600">{subtitle}</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {cards.map((c, i) => (
          <div key={i} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: GOLD }}>
              {c.tag}
            </p>
            <p className="mb-2 font-semibold text-stone-900">{c.title}</p>
            <p className="text-xs text-stone-600">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function CtaCard({
  icon,
  title,
  body,
  href,
  cta,
  disabled,
}: {
  icon: React.ReactNode
  title: string
  body: string
  href: string
  cta: string
  disabled?: boolean
}) {
  const inner = (
    <div
      className={`flex h-full flex-col rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm transition ${
        disabled ? 'opacity-60' : 'hover:border-stone-400'
      }`}
    >
      <div className="mb-3 inline-flex w-fit rounded-xl bg-amber-50 p-2.5" style={{ color: GOLD }}>
        {icon}
      </div>
      <h3 className="mb-1 font-serif text-xl font-bold text-stone-900">{title}</h3>
      <p className="mb-5 flex-1 text-sm text-stone-600">{body}</p>
      <span
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white"
        style={disabled ? { backgroundColor: '#a8a29e' } : undefined}
      >
        {cta}
        <ArrowRight className="h-4 w-4" />
      </span>
    </div>
  )
  if (disabled) return <div>{inner}</div>
  return <Link href={href}>{inner}</Link>
}

// ─────────────────────── shared ───────────────────────

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
      {value !== null && <p className="mb-2 font-serif text-4xl font-bold text-stone-900">{value}</p>}
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

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-stone-50 px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-stone-900">{value || '—'}</p>
    </div>
  )
}

function Pill({ tone, count, label }: { tone: 'amber' | 'emerald' | 'red'; count: number; label: string }) {
  const cls =
    tone === 'amber'
      ? 'bg-amber-100 text-amber-800'
      : tone === 'emerald'
      ? 'bg-emerald-100 text-emerald-800'
      : 'bg-red-100 text-red-700'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${cls}`}>
      <strong className="font-mono text-xs">{count}</strong> {label}
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === 'approved'
      ? 'bg-emerald-100 text-emerald-800'
      : status === 'rejected'
      ? 'bg-red-100 text-red-700'
      : 'bg-amber-100 text-amber-800'
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cls}`}>
      {status}
    </span>
  )
}

function firstName(s: string): string {
  return s.split(/[\s@]/)[0]
}

function needsAttention(h: Household): boolean {
  // Soft hint: surface a 'needs a review' chip if the record looks thin.
  return !h.occupation || !h.notes || h.family_size == null || h.skills.length === 0
}
