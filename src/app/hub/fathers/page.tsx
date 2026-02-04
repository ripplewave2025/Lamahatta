import { createClient } from '@/lib/supabase/server'
import FathersClient from './FathersClient'

export default async function Page() {
    const supabase = await createClient()
    const { data: posts, error } = await supabase
        .from('hub_posts')
        .select('*, profiles(full_name, avatar_url)')
        .eq('category', 'fathers')
        .order('created_at', { ascending: false })

    if (error) console.error("Error fetching fathers posts:", error)
    return <FathersClient posts={posts || []} />
}
