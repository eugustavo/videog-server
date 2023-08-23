import { Comment } from '@/dtos/Comment'
import { CommentsRepository } from '../comments-repository'
import { supabase } from '@/libs/supabase'

export class SupabaseCommentsRepository implements CommentsRepository {
  async publicComment(comment: Comment) {
    await supabase.from('comments').insert(comment)
  }

  async getComments(video_id: string): Promise<Comment[]> {
    const { data: comments } = await supabase
      .from('comments')
      .select('id, content, author_id (name, avatar_url)')
      .match({ video_id })
      .returns<Comment[]>()

    return comments ?? []
  }
}
