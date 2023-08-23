import { User } from '@/dtos/User'
import { UsersRepository } from '@/repositories/users-repository'

interface CreateUserRequest {
  name: string
  avatar_url: string
  user_identifier: string
}

interface CreateUserResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: CreateUserRequest): Promise<CreateUserResponse> {
    const user = await this.usersRepository.create(data)

    return { user }
  }
}
