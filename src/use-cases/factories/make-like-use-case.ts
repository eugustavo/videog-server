import { SupabaseLikesRepository } from '@/repositories/supabase/supabase-likes-repository'

import { LikeUseCase } from '../like'
import { DislikeUseCase } from '../dislike'
import { HasLikedUseCase } from '../has-liked'

export function makeLikeUseCase() {
  const likesRepository = new SupabaseLikesRepository()
  const likeUseCase = new LikeUseCase(likesRepository)
  const dislikeUseCase = new DislikeUseCase(likesRepository)
  const hasLikedUseCase = new HasLikedUseCase(likesRepository)

  return {
    likeUseCase,
    dislikeUseCase,
    hasLikedUseCase,
  }
}
