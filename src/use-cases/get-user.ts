import { UsersRepository } from '@/repositories/users-repository'

interface GetUserRequest {
  user_identifier: string
}

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: GetUserRequest) {
    const user = await this.usersRepository.getUser(data.user_identifier)

    return user
  }
}
