import { ProfilesRepository } from '@/repositories/profile-repository'
import { InvalidRequestBodyError } from './errors/invalid-request-body'

interface FollowRequest {
  user_id: string
  follow_user_id: string
}

export class FollowUseCase {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute(data: FollowRequest) {
    if (!data.user_id || !data.follow_user_id) {
      throw new InvalidRequestBodyError()
    }

    await this.profilesRepository.follow(data)
  }
}
