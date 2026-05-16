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
  ShoppingBag,
  Briefcase,
  Award,
  FileCheck,
  PenLine,
  ChevronRight,
  Heart,
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
        {isAdmin ? <AdminHome /> : <VillagerHome userId={user.id} household={household} />}
      </main>
    </div>
  )
}

// ─────────────────────── Admin ───────────────────────

async function AdminHome() {
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

async function VillagerHome({ userId, household }: { userId: string; household: Household | null }) {
  const supabase = await createClient()
  const { count: pendingCount } = await supabase
    .from('household_update_requests')
    .select('*', { count: 'exact', head: true })
    .eq('requested_by', userId)
    .eq('status', 'pending')

  const { count: totalRequests } = await supabase
    .from('household_update_requests')
    .select('*', { count: 'exact', head: true })
    .eq('requested_by', userId)

  return (
    <div className="space-y-12">
      {!household && (
        <div className="flex items-start gap-3 rounded-[2rem] border border-amber-200 bg-amber-50 p-6 text-amber-900">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <div className="space-y-1 text-sm">
            <p className="font-semibold">Your account isn&apos;t linked to a household yet.</p>
            <p className="text-amber-900/85">
              The Samaj Head needs to assign your household code (HH-01 … HH-22). Reach out to them, or browse
              the rest of the dashboard in the meantime.
            </p>
          </div>
        </div>
      )}

      {/* ───────── BAND 1: WHAT'S HAPPENING ───────── */}
      <Band
        eyebrow="What's happening"
        title="In and around the village"
        subtitle="The things you might come back to check — alerts, what's for sale, who needs help today, jobs, and schemes you can claim."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FeedCard
            icon={<AlertCircle className="h-5 w-5" />}
            tone="red"
            title="Village status & alerts"
            badge="Coming soon"
            items={[
              { tag: 'Water', text: 'Tank in place; piped supply awaited under Jal Jeevan Mission.' },
              { tag: 'Roads', text: 'Kaccha for now — pucca-road requests on the Gram Sabha list (PMGSY).' },
              { tag: 'Community hall', text: 'Existing space — needs activation for programmes & weddings.' },
              { tag: 'Public ground', text: 'Open for football, festivals, drying crops. Park planned next to it.' },
            ]}
          />
          <FeedCard
            icon={<ShoppingBag className="h-5 w-5" />}
            tone="amber"
            title="Marketplace"
            badge="Coming next"
            items={[
              { tag: 'Sell', text: 'List what you grow, cook, or make. Set your own price.' },
              { tag: 'Buy', text: 'See what your neighbours are offering today.' },
            ]}
          />
          <FeedCard
            icon={<Heart className="h-5 w-5" />}
            tone="rose"
            title="Oldcare requests"
            badge="Heart of Gold"
            items={[
              { tag: 'Today', text: 'Elders who need a companion visit, medicine pickup, or a check-in.' },
              { tag: 'This week', text: 'Standing rota for the daily-companion programme.' },
            ]}
          />
          <FeedCard
            icon={<Briefcase className="h-5 w-5" />}
            tone="sky"
            title="Local jobs & work"
            badge="Coming soon"
            items={[
              { tag: 'MGNREGA', text: 'Active job-card work, wage status, approved public projects.' },
              { tag: 'Local', text: 'Delivery to far households, hospitality at homestays, guiding.' },
            ]}
          />
          <FeedCard
            icon={<Award className="h-5 w-5" />}
            tone="emerald"
            title="Schemes you may qualify for"
            badge="Coming soon"
            items={[
              { tag: 'PM Kisan', text: 'Farming households — check eligibility & next instalment.' },
              { tag: 'PMAY-G', text: 'Rural housing grants — apply or check status.' },
              { tag: 'Poverty-free', text: 'Garib Kalyan & SVAMITVA — what your household qualifies for.' },
            ]}
          />
          <FeedCard
            icon={<Megaphone className="h-5 w-5" />}
            tone="amber"
            title="From the Samaj Head"
            badge="Coming soon"
            items={[
              { tag: 'Meeting', text: 'Date & agenda for the next Gram Sabha posted here.' },
              { tag: 'Decisions', text: 'Decisions, fund allocations, and meeting minutes.' },
            ]}
          />
        </div>
      </Band>

      {/* ───────── BAND 2: THINGS YOU CAN DO ───────── */}
      <Band
        eyebrow="Things you can do"
        title="Make this place work for you"
        subtitle="The actions that turn this from a profile page into a village system."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ActionCard
            icon={<ShoppingBag className="h-5 w-5" />}
            title="Sell something"
            body="List a product or service with a price."
            disabledLabel="Marketplace coming next"
            disabled
          />
          <ActionCard
            icon={<FileCheck className="h-5 w-5" />}
            title="Request a certificate"
            body="Residential proof, birth, or other documents from the Samaj Head."
            disabledLabel="Coming soon"
            disabled
          />
          <ActionCard
            icon={<Heart className="h-5 w-5" />}
            title="Offer help to an elder"
            body="Sign up as a daily companion, do a medicine run, or sponsor care."
            disabledLabel="Heart of Gold programme — soon"
            disabled
          />
          <ActionCard
            icon={<GraduationCap className="h-5 w-5" />}
            title="Join a training"
            body="English · Hospitality · Computer · Content creation · Entrepreneurship."
            disabledLabel="Coming soon"
            disabled
          />
          <ActionCard
            icon={<FileText className="h-5 w-5" />}
            title="Update your household"
            body="Found something out of date? Propose a change."
            href={household ? '/dashboard/household' : undefined}
            disabledLabel="Link your household first"
            disabled={!household}
          />
          <ActionCard
            icon={<PenLine className="h-5 w-5" />}
            title="Add your voice"
            body="Tell the village what you think is needed."
            href="/voices"
          />
        </div>
      </Band>

      {/* ───────── BAND 3: YOUR STUFF ───────── */}
      <Band eyebrow="Your stuff" title="What's yours, at a glance" subtitle="Personal context — the things specific to you and your household.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {household ? (
            <CompactHouseholdCard household={household} />
          ) : (
            <div className="rounded-2xl border border-stone-200 bg-white p-5 text-sm text-stone-600">
              No household linked yet.
            </div>
          )}

          <CountCard
            icon={<FileText className="h-5 w-5" />}
            title="Update requests"
            count={totalRequests ?? 0}
            sub={pendingCount ? `${pendingCount} pending review` : 'None pending'}
            href="/dashboard/requests"
            cta="View"
          />

          <CountCard
            icon={<FileCheck className="h-5 w-5" />}
            title="Certificate requests"
            count={0}
            sub="Backend coming soon"
            disabled
          />

          <CountCard
            icon={<Sparkles className="h-5 w-5" />}
            title="My benefits"
            count={0}
            sub="Group health insurance · property cover · perks — coming soon"
            disabled
          />
        </div>

        <div className="mt-4">
          <Link
            href="/dashboard/directory"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-stone-800 transition hover:bg-stone-100"
          >
            <BookOpen className="h-3.5 w-3.5" /> Visit the Village Directory
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Band>

      {/* ───────── Footer note ───────── */}
      <section className="rounded-[2rem] border border-stone-200 bg-white p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-amber-50 p-2.5">
            <Megaphone className="h-5 w-5" style={{ color: GOLD }} />
          </div>
          <div className="text-sm text-stone-700">
            <p className="font-semibold text-stone-900">This dashboard is growing with the village.</p>
            <p className="mt-1 text-stone-600">
              Most of the strips above show <em>what&apos;s coming</em>. The marketplace lands next, so neighbours can
              sell what they grow, cook, or make. If something on this page would be useful to you sooner, tell the
              Samaj Head and they&apos;ll prioritise it.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─────────────────────── Building blocks ───────────────────────

function Band({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <section>
      <header className="mb-5">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
          {eyebrow}
        </p>
        <h2 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl">{title}</h2>
        <p className="mt-1 max-w-2xl text-sm text-stone-600">{subtitle}</p>
      </header>
      {children}
    </section>
  )
}

function FeedCard({
  icon,
  tone,
  title,
  badge,
  items,
}: {
  icon: React.ReactNode
  tone: 'red' | 'amber' | 'sky' | 'emerald' | 'rose'
  title: string
  badge?: string
  items: { tag: string; text: string }[]
}) {
  const toneRing: Record<string, string> = {
    red: 'bg-red-50 text-red-700',
    amber: 'bg-amber-50 text-amber-700',
    sky: 'bg-sky-50 text-sky-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    rose: 'bg-rose-50 text-rose-700',
  }
  return (
    <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <div className={`rounded-xl p-2 ${toneRing[tone]}`}>{icon}</div>
        <h3 className="flex-1 font-serif text-lg font-bold text-stone-900">{title}</h3>
        {badge && (
          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-600">
            {badge}
          </span>
        )}
      </div>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i} className="rounded-xl bg-stone-50 px-3 py-2 text-sm">
            <span className="mr-2 inline-block rounded bg-stone-200 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-700">
              {it.tag}
            </span>
            <span className="text-stone-700">{it.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ActionCard({
  icon,
  title,
  body,
  href,
  disabled,
  disabledLabel,
}: {
  icon: React.ReactNode
  title: string
  body: string
  href?: string
  disabled?: boolean
  disabledLabel?: string
}) {
  const card = (
    <div
      className={`flex h-full flex-col rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm transition ${
        disabled ? '' : 'hover:border-stone-400 hover:shadow-md'
      }`}
    >
      <div className="mb-3 inline-flex w-fit rounded-xl bg-amber-50 p-2.5" style={{ color: GOLD }}>
        {icon}
      </div>
      <h3 className="mb-1 font-serif text-lg font-bold text-stone-900">{title}</h3>
      <p className="mb-4 flex-1 text-sm text-stone-600">{body}</p>
      {disabled ? (
        <span className="inline-flex items-center justify-center rounded-xl bg-stone-100 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-stone-500">
          {disabledLabel ?? 'Coming soon'}
        </span>
      ) : (
        <span
          className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider text-stone-950"
          style={{ backgroundColor: GOLD }}
        >
          Open <ArrowRight className="h-3.5 w-3.5" />
        </span>
      )}
    </div>
  )
  if (disabled || !href) return <div>{card}</div>
  return <Link href={href}>{card}</Link>
}

function CompactHouseholdCard({ household }: { household: Household }) {
  return (
    <div
      className="flex h-full flex-col rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm"
      style={{ borderTop: `4px solid ${GOLD}` }}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-stone-900 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-300">
          {household.hh_code}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-stone-500">
          <MapPin className="h-3 w-3" /> Sunaraygoan
        </span>
      </div>
      <h3 className="font-serif text-xl font-bold text-stone-900">{household.head_name}</h3>
      <p className="mb-3 text-sm text-stone-600">{household.occupation ?? '—'}</p>
      <div className="mb-4 flex flex-wrap gap-1.5">
        <Tag>{household.status ?? '—'}</Tag>
        <Tag>{household.family_size ?? '—'} members</Tag>
        {household.has_elderly && <Tag>Elderly</Tag>}
        {household.has_youth && <Tag>Youth</Tag>}
      </div>
      <Link
        href="/dashboard/household"
        className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-stone-100 px-3 py-2 text-xs font-bold uppercase tracking-wider text-stone-800 transition hover:bg-stone-200"
      >
        Open my household <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}

function CountCard({
  icon,
  title,
  count,
  sub,
  href,
  cta,
  disabled,
}: {
  icon: React.ReactNode
  title: string
  count: number
  sub: string
  href?: string
  cta?: string
  disabled?: boolean
}) {
  return (
    <div className="flex h-full flex-col rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-3 inline-flex w-fit rounded-xl bg-amber-50 p-2.5" style={{ color: GOLD }}>
        {icon}
      </div>
      <h3 className="mb-1 font-serif text-lg font-bold text-stone-900">{title}</h3>
      <p className="mb-1 font-serif text-3xl font-bold text-stone-900">{count}</p>
      <p className="mb-4 flex-1 text-xs text-stone-500">{sub}</p>
      {disabled || !href ? (
        <span className="inline-flex items-center justify-center rounded-xl bg-stone-100 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-stone-500">
          Coming soon
        </span>
      ) : (
        <Link
          href={href}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-100 px-3 py-2 text-xs font-bold uppercase tracking-wider text-stone-800 hover:bg-stone-200"
        >
          {cta ?? 'View'} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-700">
      {children}
    </span>
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

function firstName(s: string): string {
  return s.split(/[\s@]/)[0]
}
