import Link from 'next/link'
import { ArrowLeft, Home, MapPin } from 'lucide-react'
import { getSession } from '@/lib/auth/getProfile'
import RequestUpdateForm from './RequestUpdateForm'

export const dynamic = 'force-dynamic'

export default async function MyHouseholdPage() {
  const { profile, household } = await getSession()

  if (!household) {
    return (
      <div className="min-h-screen bg-[#f4efe4] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/dashboard"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900"
          >
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8 text-amber-900">
            <h1 className="mb-2 font-serif text-2xl font-bold">No household linked</h1>
            <p>
              Your account hasn&apos;t been assigned to a household yet. Please ask the Samaj Head to
              link your account to your HH code.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f4efe4] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900"
        >
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>

        <header className="mb-8 flex flex-col gap-2 border-b border-stone-300 pb-6">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-stone-900 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
              {household.hh_code}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-stone-500">
              <MapPin className="h-3 w-3" /> Sunaraygoan · Lamahatta
            </span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-stone-900">{household.head_name}</h1>
          <p className="text-stone-600">{household.occupation}</p>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Occupation" value={household.occupation ?? '—'} />
          <Field label="Family size" value={household.family_size?.toString() ?? '—'} />
          <Field label="Status" value={household.status ?? '—'} />
          <Field label="Skills" value={household.skills.join(', ') || '—'} />
          <Field
            label="Has elderly (60+)"
            value={household.has_elderly ? 'Yes' : 'No'}
          />
          <Field label="Has youth in education" value={household.has_youth ? 'Yes' : 'No'} />
          <div className="sm:col-span-2">
            <Field label="Notes" value={household.notes ?? '—'} />
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-start gap-3">
            <div className="rounded-xl bg-amber-100 p-3 text-amber-700">
              <Home className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Request an update</h2>
              <p className="text-sm text-stone-600">
                Propose a change to your household record. The Samaj Head reviews and approves
                updates.
              </p>
            </div>
          </div>
          <RequestUpdateForm
            householdId={household.id}
            requesterId={profile.id}
            current={{
              occupation: household.occupation ?? '',
              family_size: household.family_size?.toString() ?? '',
              notes: household.notes ?? '',
              skills: household.skills.join(', '),
              status: household.status ?? '',
            }}
          />
        </section>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">{label}</p>
      <p className="mt-1 text-stone-900">{value || '—'}</p>
    </div>
  )
}
