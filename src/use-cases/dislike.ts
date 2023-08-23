import { LikesRepository as DislikesRepository } from '@/repositories/likes-repository'
import { InvalidRequestBodyError } from './errors/invalid-request-body'

interface DislikeVideoRequest {
  video_id: string
  user_id: string
}

export class DislikeUseCase {
  constructor(private dislikesRepository: DislikesRepository) {}

  async execute(data: DislikeVideoRequest) {
    if (!data.video_id || !data.user_id) {
      throw new InvalidRequestBodyError()
    }

    await this.dislikesRepository.dislike(data)
  }
}
