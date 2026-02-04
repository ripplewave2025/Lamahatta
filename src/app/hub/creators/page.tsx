import { createClient } from '@/lib/supabase/server'
import CreatorsClient from './CreatorsClient'

export default async function Page() {
    const supabase = await createClient()
    const { data: posts, error } = await supabase
        .from('hub_posts')
        .select(`
            *,
            profiles (
                full_name,
                avatar_url
            )
        `)
        .eq('category', 'creators')
        .order('created_at', { ascending: false })

    if (error) {
        console.error("Error fetching posts:", error)
    }

    return <CreatorsClient posts={posts || []} />
}
