import { User } from '@/dtos/User'
import { supabase } from '@/libs/supabase'
import { UsersRepository } from '../users-repository'

export class SupabaseUsersRepository implements UsersRepository {
  async create(data: User): Promise<User> {
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        name: data.name,
        avatar_url: data.avatar_url,
        identifier: data.user_identifier,
      })
      .select('id')
      .returns<User[]>()

    if (error) throw new Error('User not created')

    const createdUser: User = user && user[0]

    return createdUser
  }

  async getUser(user_identifier: string): Promise<User | null> {
    const { data } = await supabase
      .from('users')
      .select('*')
      .or(`id.eq.${user_identifier},identifier.eq.${user_identifier}`)

    const user: User = data && data[0]

    return user
  }
}
