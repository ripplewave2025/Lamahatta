import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type Household = {
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
  updated_at: string
}

export type Profile = {
  id: string
  full_name: string | null
  phone: string | null
  role: 'villager' | 'admin'
  household_id: string | null
  preferred_lang: 'en' | 'ne' | 'hi' | 'bn'
}

export type Session = {
  user: { id: string; email: string | null }
  profile: Profile
  household: Household | null
}

/**
 * Loads the current user's session, profile, and linked household.
 * Redirects to /auth if not signed in. Use in server components under /dashboard.
 */
export async function getSession(): Promise<Session> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, phone, role, household_id, preferred_lang')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/auth')

  let household: Household | null = null
  if (profile.household_id) {
    const { data } = await supabase
      .from('households')
      .select('*')
      .eq('id', profile.household_id)
      .single()
    household = data as Household | null
  }

  return {
    user: { id: user.id, email: user.email ?? null },
    profile: profile as Profile,
    household,
  }
}

/** Same as getSession but throws if not admin. */
export async function requireAdmin(): Promise<Session> {
  const session = await getSession()
  if (session.profile.role !== 'admin') redirect('/dashboard')
  return session
}
