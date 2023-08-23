import { LikesRepository } from '@/repositories/likes-repository'

interface hasLikedRequest {
  user_id: string
  video_id: string
}

export class HasLikedUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute(data: hasLikedRequest) {
    const hasLiked = await this.likesRepository.hasLiked(data)

    return hasLiked
  }
}
