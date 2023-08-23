import { SupabaseCommentsRepository } from '@/repositories/supabase/supabase-comments-repository'
import { PublicCommentUseCase } from '../public-comment'
import { GetCommentsUseCase } from '../get-comments'

export function makeCommentsUseCase() {
  const commentsRepository = new SupabaseCommentsRepository()

  const publicCommentUseCase = new PublicCommentUseCase(commentsRepository)
  const getCommentsUseCase = new GetCommentsUseCase(commentsRepository)

  return {
    publicCommentUseCase,
    getCommentsUseCase,
  }
}
