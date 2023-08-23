import { SupabaseProfilesRepository } from '@/repositories/supabase/supabase-profiles-repository'

import { FollowUseCase } from '../follow'
import { UnfollowUseCase } from '../unfollow'
import { GetFollowersUseCase } from '../get-followers'
import { GetFollowingUseCase } from '../get-following'
import { HasFollowedUseCase } from '../has-followed'

export function makeProfileUseCase() {
  const profilesRepository = new SupabaseProfilesRepository()

  const followUseCase = new FollowUseCase(profilesRepository)
  const unfollowUseCase = new UnfollowUseCase(profilesRepository)
  const getFollowersUseCase = new GetFollowersUseCase(profilesRepository)
  const getFollowingUseCase = new GetFollowingUseCase(profilesRepository)
  const hasFollowedUseCase = new HasFollowedUseCase(profilesRepository)

  return {
    followUseCase,
    unfollowUseCase,
    getFollowersUseCase,
    getFollowingUseCase,
    hasFollowedUseCase,
  }
}
