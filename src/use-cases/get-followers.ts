import { ProfilesRepository } from '@/repositories/profile-repository'
import { InvalidRequestBodyError } from './errors/invalid-request-body'

interface GetFollowersRequest {
  user_id: string
}

interface GetFollowersResponse {
  followers: number
}

export class GetFollowersUseCase {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute(data: GetFollowersRequest): Promise<GetFollowersResponse> {
    if (!data.user_id) {
      throw new InvalidRequestBodyError()
    }

    const followers = await this.profilesRepository.getFollowers(data.user_id)

    return { followers }
  }
}
