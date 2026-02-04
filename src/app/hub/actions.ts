'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createPost(prevState: any, formData: FormData) {
    const supabase = await createClient()

    // Check auth
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'You must be logged in to post.' }
    }

    const category = formData.get('category') as string
    const content = formData.get('content') as string
    const title = formData.get('title') as string
    const mediaUrl = formData.get('mediaUrl') as string
    const mediaType = formData.get('mediaType') as string

    if (!content || content.trim() === '') {
        return { error: 'Content is required' }
    }

    try {
        const { error } = await supabase.from('hub_posts').insert({
            user_id: user.id,
            category,
            title: title || 'Update',
            content,
            media_url: mediaUrl || null,
            media_type: mediaType || 'none'
        })

        if (error) throw error

        revalidatePath(`/hub/${category}`)
        return { success: true, message: 'Post created successfully!' }
    } catch (e: any) {
        return { error: e.message }
    }
}
