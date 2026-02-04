import { createClient } from '@/lib/supabase/server'
import YouthClient from './YouthClient'

export default async function Page() {
    const supabase = await createClient()
    const { data: posts, error } = await supabase
        .from('hub_posts')
        .select('*, profiles(full_name, avatar_url)')
        .eq('category', 'youth')
        .order('created_at', { ascending: false })

    if (error) console.error("Error fetching youth posts:", error)
    return <YouthClient posts={posts || []} />
}
