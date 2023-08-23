import { ProfilesRepository } from '@/repositories/profile-repository'

interface hasFollowedRequest {
  user_id: string
  follow_user_id: string
}

export class HasFollowedUseCase {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute(data: hasFollowedRequest) {
    const hasFollowed = await this.profilesRepository.hasFollowed(data)

    return hasFollowed
  }
}
