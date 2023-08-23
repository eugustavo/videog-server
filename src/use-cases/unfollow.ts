import { ProfilesRepository } from '@/repositories/profile-repository'
import { InvalidRequestBodyError } from './errors/invalid-request-body'

interface UnfollowRequest {
  user_id: string
  follow_user_id: string
}

export class UnfollowUseCase {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute(data: UnfollowRequest) {
    if (!data.user_id || !data.follow_user_id) {
      throw new InvalidRequestBodyError()
    }

    await this.profilesRepository.unfollow(data)
  }
}
