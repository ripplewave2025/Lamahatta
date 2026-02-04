import { createClient } from '@/lib/supabase/server'
import UpdatesClient from './UpdatesClient'

export default async function Page() {
    const supabase = await createClient()
    const { data: posts, error } = await supabase
        .from('hub_posts')
        .select('*, profiles(full_name, avatar_url)')
        .eq('category', 'updates')
        .order('created_at', { ascending: false })

    if (error) console.error("Error fetching updates posts:", error)
    return <UpdatesClient posts={posts || []} />
}
