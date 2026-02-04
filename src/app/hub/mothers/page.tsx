import { createClient } from '@/lib/supabase/server'
import MothersClient from './MothersClient'

export default async function Page() {
    const supabase = await createClient()
    const { data: posts, error } = await supabase
        .from('hub_posts')
        .select('*, profiles(full_name, avatar_url)')
        .eq('category', 'mothers')
        .order('created_at', { ascending: false })

    if (error) console.error("Error fetching mothers posts:", error)
    return <MothersClient posts={posts || []} />
}
