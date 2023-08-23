import { Like } from '@/dtos/Like'
import { supabase } from '@/libs/supabase'
import { LikesRepository } from '../likes-repository'

export class SupabaseLikesRepository implements LikesRepository {
  async like(data: Like) {
    await supabase.from('likes').insert(data)
  }

  async dislike(data: Like) {
    await supabase
      .from('likes')
      .delete()
      .match({ user_id: data.user_id, video_id: data.video_id })
  }

  async hasLiked(data: Like) {
    const { data: likes } = await supabase
      .from('likes')
      .select()
      .match({ user_id: data.user_id, video_id: data.video_id })

    return !!likes?.length
  }
}
