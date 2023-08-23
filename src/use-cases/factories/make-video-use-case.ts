import { SupabaseVideosRepository } from '@/repositories/supabase/supabase-videos-repository'

import { CreateVideoUseCase } from '../create-video'
import { FeedUseCase } from '../feed'

export function makeVideoUseCase() {
  const videosRepository = new SupabaseVideosRepository()
  const createVideoUseCase = new CreateVideoUseCase(videosRepository)
  const feedUseCase = new FeedUseCase(videosRepository)

  return {
    createVideoUseCase,
    feedUseCase,
  }
}
