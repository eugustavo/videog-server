import { Profile } from '@/dtos/Profile'

export interface ProfilesRepository {
  follow(profile: Profile): Promise<void>
  unfollow(profile: Profile): Promise<void>
  getFollowers(user_id: string): Promise<number>
  getFollowing(user_id: string): Promise<number>
  hasFollowed(profile: Profile): Promise<boolean>
}
