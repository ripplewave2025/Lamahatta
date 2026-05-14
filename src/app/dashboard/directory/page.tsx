import Link from 'next/link'
import {
  ArrowLeft,
  Users,
  GraduationCap,
  Heart,
  TrendingUp,
  Briefcase,
  ArrowRight,
  Phone,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/auth/getProfile'

export const dynamic = 'force-dynamic'

const GOLD = '#D4AF37'

type Row = {
  id: string
  hh_code: string
  head_name: string
  occupation: string | null
  family_size: number | null
  notes: string | null
  status: 'Local' | 'Migrant' | 'Mixed' | null
  skills: string[]
  has_elderly: boolean
  has_youth: boolean
  head_phone: string | null
}

export default async function DirectoryPage() {
  const { profile } = await getSession()
  const isAdmin = profile.role === 'admin'
  const supabase = await createClient()

  const { data } = await supabase
    .from('households')
    .select(
      'id, hh_code, head_name, occupation, family_size, notes, status, skills, has_elderly, has_youth, head_phone',
    )
    .order('hh_code')

  const households = (data ?? []) as Row[]

  // ------- Aggregates (mirror village.html maths) -------
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
    h.skills.forEach((s) => skillCounts.set(s, (skillCounts.get(s) ?? 0) + 1)),
  )
  const topSkills = [...skillCounts.entries()].sort((a, b) => b[1] - a[1])

  const occupationCounts = new Map<string, number>()
  households.forEach((h) => {
    const key = (h.occupation ?? '—').split(/[(,]/)[0].trim()
    occupationCounts.set(key, (occupationCounts.get(key) ?? 0) + 1)
  })
  const topOccupations = [...occupationCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)

  // Schools / education signal: pull mentions from notes
  const educationMentions = households.filter((h) =>
    /(school|college|class|\+2|study|education|nurse|english|biology|geography|design|hotel management)/i.test(
      h.notes ?? '',
    ),
  ).length

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
          <h1 className="font-serif text-4xl font-bold text-stone-900">
            Village Development Dashboard
          </h1>
          <p className="mt-2 text-stone-600">
            Transparent · Self-sustaining · Community-powered ·{' '}
            <strong>{totalFamilies}</strong> households · ~{totalMembers} people
          </p>
        </header>

        {/* ───────── Metric strip ───────── */}
        <section className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Metric icon={<Users className="h-5 w-5" />} label="Households" value={totalFamilies} />
          <Metric icon={<TrendingUp className="h-5 w-5" />} label="Migration rate" value={`${migrationRate}%`} />
          <Metric icon={<Heart className="h-5 w-5" />} label="Elderly households" value={elderlyHouseholds} />
          <Metric icon={<GraduationCap className="h-5 w-5" />} label="Youth in education" value={youthHouseholds} />
        </section>

        {/* ───────── 1. Skills & Human Capital ───────── */}
        <Section
          icon={<Briefcase className="h-5 w-5" style={{ color: GOLD }} />}
          title="Skills & Human Capital"
          subtitle="Our biggest strength — hospitality, creativity & farming expertise"
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {topSkills.map(([skill, count]) => (
              <div
                key={skill}
                className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-3 py-2"
              >
                <span className="text-sm font-medium text-stone-800">{skill}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                  style={{ backgroundColor: GOLD }}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* ───────── 2. Education & Youth Pipeline ───────── */}
        <Section
          icon={<GraduationCap className="h-5 w-5" style={{ color: GOLD }} />}
          title="Education & Youth Pipeline"
          subtitle="Lamahatta schools are the backbone — many families have children studying there."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <BigStat
              value={youthHouseholds}
              label="Households with youth currently in education or training"
            />
            <BigStat
              value={educationMentions}
              label="Households mentioning a school, college, or course in their record"
            />
            <BigStat
              value={`${Math.round((youthHouseholds / totalFamilies) * 100)}%`}
              label="Of households actively investing in their next generation"
            />
          </div>
        </Section>

        {/* ───────── 3. Elderly Care ───────── */}
        <Section
          icon={<Heart className="h-5 w-5" style={{ color: GOLD }} />}
          title="Elderly Care · Heart of Gold"
          subtitle={`${elderlyHouseholds} households have elders (60+) living in the village while children work outside`}
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <BigStat value={elderlyHouseholds} label="Households caring for elders today" />
            <BigStat
              value={`${Math.round((elderlyHouseholds / totalFamilies) * 100)}%`}
              label="Of village households shaped by elder-care responsibilities"
            />
            <div className="rounded-2xl border border-stone-200 bg-amber-50 p-4 text-sm text-stone-700">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: GOLD }}>
                Most needed
              </p>
              <ul className="space-y-1 text-stone-700">
                <li>· Daily companion visits</li>
                <li>· Medicine delivery</li>
                <li>· Emergency contact system</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* ───────── 4. Economy & Migration ───────── */}
        <Section
          icon={<TrendingUp className="h-5 w-5" style={{ color: GOLD }} />}
          title="Economy & Migration"
          subtitle="Where households sit today — local roots, outside earnings, and the mix between them"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                Status breakdown
              </p>
              <div className="grid grid-cols-3 gap-3">
                <StatusTile label="Local" count={local} pct={Math.round((local / totalFamilies) * 100)} />
                <StatusTile label="Mixed" count={mixed} pct={Math.round((mixed / totalFamilies) * 100)} />
                <StatusTile label="Migrant" count={migrant} pct={Math.round((migrant / totalFamilies) * 100)} />
              </div>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                Top occupations
              </p>
              <ul className="space-y-1.5">
                {topOccupations.map(([o, c]) => (
                  <li key={o} className="flex items-center justify-between rounded-lg bg-stone-50 px-3 py-2 text-sm">
                    <span className="text-stone-800">{o}</span>
                    <span className="text-stone-500">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ───────── 5. Family Directory (full table with notes) ───────── */}
        <section className="mb-10">
          <h2 className="mb-4 font-serif text-2xl font-bold text-stone-900">Family Directory</h2>
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-stone-100 text-left text-[10px] uppercase tracking-wider text-stone-600">
                  <tr>
                    <th className="px-4 py-3">Code</th>
                    <th className="px-4 py-3">Head</th>
                    <th className="px-4 py-3">Occupation</th>
                    <th className="px-4 py-3">Family</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Skills</th>
                    <th className="px-4 py-3">Notes</th>
                    {isAdmin && <th className="px-4 py-3">Phone</th>}
                  </tr>
                </thead>
                <tbody>
                  {households.map((h) => (
                    <tr key={h.id} className="border-t border-stone-100 align-top hover:bg-amber-50/40">
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
                      <td className="px-4 py-3 max-w-md text-xs text-stone-600">{h.notes ?? '—'}</td>
                      {isAdmin && (
                        <td className="px-4 py-3 text-xs text-stone-700">
                          {h.head_phone ? (
                            <a
                              href={`tel:${h.head_phone}`}
                              className="inline-flex items-center gap-1 hover:text-stone-900"
                            >
                              <Phone className="h-3 w-3" /> {h.head_phone}
                            </a>
                          ) : (
                            <span className="text-stone-400">—</span>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ───────── Voices CTA ───────── */}
        <section
          className="rounded-[2rem] border border-stone-200 bg-white p-6 sm:p-8"
          style={{ borderTop: `4px solid ${GOLD}` }}
        >
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
            Your voice
          </p>
          <h2 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
            What do you think the village needs most right now?
          </h2>
          <p className="mt-2 text-stone-600">
            If the village cannot state its needs clearly, other people will define them badly.
          </p>
          <Link
            href="/voices"
            className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-stone-950 transition hover:brightness-95"
            style={{ backgroundColor: GOLD }}
          >
            Add your voice
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  )
}

// ─────────── presentational helpers ───────────

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

function Section({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-10 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-xl bg-amber-50 p-2.5">{icon}</div>
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl">{title}</h2>
          <p className="mt-1 text-sm text-stone-600">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

function BigStat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
      <p className="font-serif text-4xl font-bold text-stone-900">{value}</p>
      <p className="mt-1 text-xs text-stone-600">{label}</p>
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
