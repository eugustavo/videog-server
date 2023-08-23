import { Profile } from '@/dtos/Profile'
import { ProfilesRepository } from '../profile-repository'

export class InMemoryProfilesRepository implements ProfilesRepository {
  public items: Profile[] = []

  async follow(data: Profile) {
    this.items.push(data)
  }

  async unfollow(data: Profile) {
    const index = this.items.findIndex(
      (item) =>
        item.user_id === data.user_id &&
        item.follow_user_id === data.follow_user_id,
    )

    this.items.splice(index, 1)
  }

  async getFollowers(user_id: string) {
    const followers = this.items.filter(
      (item) => item.follow_user_id === user_id,
    )

    return followers.length
  }

  async getFollowing(user_id: string) {
    const following = this.items.filter((item) => item.user_id === user_id)

    return following.length
  }

  async hasFollowed(data: Profile) {
    const followed = this.items.find((item) => {
      return (
        item.user_id === data.user_id &&
        item.follow_user_id === data.follow_user_id
      )
    })

    return !!followed
  }
}
