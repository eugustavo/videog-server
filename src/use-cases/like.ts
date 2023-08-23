import { LikesRepository } from '@/repositories/likes-repository'
import { InvalidRequestBodyError } from './errors/invalid-request-body'

interface LikeVideoRequest {
  video_id: string
  user_id: string
}

export class LikeUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute(data: LikeVideoRequest) {
    if (!data.video_id || !data.user_id) {
      throw new InvalidRequestBodyError()
    }

    await this.likesRepository.like(data)
  }
}
