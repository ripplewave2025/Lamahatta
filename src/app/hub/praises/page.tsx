import { createClient } from '@/lib/supabase/server'
import PraisesClient from './PraisesClient'

export default async function Page() {
    const supabase = await createClient()
    const { data: posts, error } = await supabase
        .from('hub_posts')
        .select('*, profiles(full_name, avatar_url)')
        .eq('category', 'praises')
        .order('created_at', { ascending: false })

    if (error) console.error("Error fetching praises posts:", error)
    return <PraisesClient posts={posts || []} />
}
