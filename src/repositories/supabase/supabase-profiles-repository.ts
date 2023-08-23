import { Profile } from '@/dtos/Profile'
import { ProfilesRepository } from '../profile-repository'
import { supabase } from '@/libs/supabase'

export class SupabaseProfilesRepository implements ProfilesRepository {
  async follow(profile: Profile): Promise<void> {
    await supabase.from('profiles').insert(profile).single()
  }

  async unfollow(profile: Profile): Promise<void> {
    await supabase.from('profiles').delete().match({
      user_id: profile.user_id,
      follow_user_id: profile.follow_user_id,
    })
  }

  async getFollowers(user_id: string): Promise<number> {
    const { data } = await supabase
      .from('profiles')
      .select()
      .match({ follow_user_id: user_id })

    return data?.length || 0
  }

  async getFollowing(user_id: string): Promise<number> {
    const { data } = await supabase.from('profiles').select().match({ user_id })

    return data?.length || 0
  }

  async hasFollowed(data: Profile): Promise<boolean> {
    const { data: followed } = await supabase
      .from('profiles')
      .select()
      .match({ user_id: data.user_id, follow_user_id: data.follow_user_id })

    return !!followed?.length
  }
}
