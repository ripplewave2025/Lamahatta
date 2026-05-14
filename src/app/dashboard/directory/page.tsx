import Link from 'next/link'
import { ArrowLeft, Users, GraduationCap, Heart, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/auth/getProfile'
import type { Household } from '@/lib/auth/getProfile'

export const dynamic = 'force-dynamic'

const GOLD = '#D4AF37'

export default async function DirectoryPage() {
  await getSession()
  const supabase = await createClient()

  const { data } = await supabase
    .from('households')
    .select('*')
    .order('hh_code')

  const households = (data ?? []) as Household[]

  // Stats (matches village.html sections)
  const totalFamilies = households.length
  const totalMembers = households.reduce((sum, h) => sum + (h.family_size ?? 0), 0)
  const elderlyHouseholds = households.filter((h) => h.has_elderly).length
  const youthHouseholds = households.filter((h) => h.has_youth).length
  const migrant = households.filter((h) => h.status === 'Migrant').length
  const mixed = households.filter((h) => h.status === 'Mixed').length
  const local = households.filter((h) => h.status === 'Local').length
  const migrationRate = totalFamilies
    ? Math.round(((migrant + mixed) / totalFamilies) * 100)
    : 0

  const skillCounts = new Map<string, number>()
  households.forEach((h) =>
    h.skills.forEach((s) => skillCounts.set(s, (skillCounts.get(s) ?? 0) + 1))
  )
  const topSkills = [...skillCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)

  const occupationCounts = new Map<string, number>()
  households.forEach((h) => {
    const key = (h.occupation ?? '—').split(/[(,]/)[0].trim()
    occupationCounts.set(key, (occupationCounts.get(key) ?? 0) + 1)
  })
  const topOccupations = [...occupationCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-[#f8f7f2] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900"
        >
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>

        <header className="mb-10 border-b border-stone-300 pb-6">
          <p
            className="mb-1 text-xs font-bold uppercase tracking-[0.22em]"
            style={{ color: GOLD }}
          >
            Heart of Gold · Golden Square
          </p>
          <h1 className="font-serif text-4xl font-bold text-stone-900">Village Directory</h1>
          <p className="mt-2 text-stone-600">
            A transparent record of {totalFamilies} households · ~{totalMembers} people ·
            community-powered.
          </p>
        </header>

        <section className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Metric icon={<Users className="h-5 w-5" />} label="Households" value={totalFamilies} />
          <Metric icon={<TrendingUp className="h-5 w-5" />} label="Migration rate" value={`${migrationRate}%`} />
          <Metric icon={<Heart className="h-5 w-5" />} label="Elderly households" value={elderlyHouseholds} />
          <Metric icon={<GraduationCap className="h-5 w-5" />} label="Youth in education" value={youthHouseholds} />
        </section>

        <section className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Panel title="Skills & Human Capital" subtitle="Top skills across all households">
            <ul className="space-y-2">
              {topSkills.map(([skill, count]) => (
                <li key={skill} className="flex items-center justify-between rounded-xl bg-stone-50 px-3 py-2">
                  <span className="text-sm text-stone-800">{skill}</span>
                  <span className="rounded-full bg-stone-900 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                    {count}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Economy & Migration" subtitle="Where households sit today">
            <div className="grid grid-cols-3 gap-3">
              <StatusTile label="Local" count={local} pct={Math.round((local / totalFamilies) * 100)} />
              <StatusTile label="Mixed" count={mixed} pct={Math.round((mixed / totalFamilies) * 100)} />
              <StatusTile label="Migrant" count={migrant} pct={Math.round((migrant / totalFamilies) * 100)} />
            </div>
            <div className="mt-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                Top occupations
              </p>
              <ul className="space-y-1.5">
                {topOccupations.map(([o, c]) => (
                  <li key={o} className="flex items-center justify-between text-sm">
                    <span className="text-stone-800">{o}</span>
                    <span className="text-stone-500">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-2xl font-bold text-stone-900">Family Directory</h2>
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-stone-100 text-left text-[10px] uppercase tracking-wider text-stone-600">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Head</th>
                  <th className="px-4 py-3">Occupation</th>
                  <th className="px-4 py-3">Family</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Skills</th>
                </tr>
              </thead>
              <tbody>
                {households.map((h) => (
                  <tr key={h.id} className="border-t border-stone-100 hover:bg-amber-50/40">
                    <td className="px-4 py-3 font-mono text-xs text-stone-700">{h.hh_code}</td>
                    <td className="px-4 py-3 font-semibold text-stone-900">{h.head_name}</td>
                    <td className="px-4 py-3 text-stone-700">{h.occupation ?? '—'}</td>
                    <td className="px-4 py-3 text-stone-700">{h.family_size ?? '—'}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={h.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-stone-600">
                      {h.skills.slice(0, 3).join(', ')}
                      {h.skills.length > 3 ? ` +${h.skills.length - 3}` : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: number | string
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-2 inline-flex rounded-xl bg-amber-50 p-2" style={{ color: GOLD }}>
        {icon}
      </div>
      <p className="font-serif text-3xl font-bold text-stone-900">{value}</p>
      <p className="text-xs uppercase tracking-wider text-stone-500">{label}</p>
    </div>
  )
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <h3 className="font-serif text-xl font-bold text-stone-900">{title}</h3>
      <p className="mb-4 text-xs text-stone-500">{subtitle}</p>
      {children}
    </div>
  )
}

function StatusTile({ label, count, pct }: { label: string; count: number; pct: number }) {
  return (
    <div className="rounded-xl bg-stone-50 p-3 text-center">
      <p className="font-serif text-2xl font-bold text-stone-900">{count}</p>
      <p className="text-[10px] uppercase tracking-wider text-stone-500">{label}</p>
      <p className="mt-1 text-xs font-semibold" style={{ color: GOLD }}>
        {pct}%
      </p>
    </div>
  )
}

function StatusBadge({ status }: { status: string | null }) {
  if (!status) return <span className="text-stone-400">—</span>
  const cls =
    status === 'Local'
      ? 'bg-emerald-100 text-emerald-800'
      : status === 'Migrant'
      ? 'bg-amber-100 text-amber-800'
      : 'bg-sky-100 text-sky-800'
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cls}`}>
      {status}
    </span>
  )
}
