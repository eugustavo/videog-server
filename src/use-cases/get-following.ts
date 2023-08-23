import { ProfilesRepository } from '@/repositories/profile-repository'
import { InvalidRequestBodyError } from './errors/invalid-request-body'

interface GetFollowingRequest {
  user_id: string
}

interface GetFollowingResponse {
  following: number
}

export class GetFollowingUseCase {
  constructor(private readonly profilesRepository: ProfilesRepository) {}

  async execute(data: GetFollowingRequest): Promise<GetFollowingResponse> {
    if (!data.user_id) {
      throw new InvalidRequestBodyError()
    }

    const following = await this.profilesRepository.getFollowing(data.user_id)

    return { following }
  }
}
