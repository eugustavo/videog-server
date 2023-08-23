import { randomUUID } from 'node:crypto'
import { UsersRepository } from '../users-repository'
import { User } from '@/dtos/User'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: User) {
    const user = {
      id: randomUUID(),
      name: data.name,
      avatar_url: data.avatar_url,
      user_identifier: data.user_identifier,
    }

    this.items.push(user)

    return user
  }

  async getUser(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
