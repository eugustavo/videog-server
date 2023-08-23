import { User } from '@/dtos/User'

export interface UsersRepository {
  create(data: User): Promise<User>
  getUser(id: string): Promise<User | null>
}
