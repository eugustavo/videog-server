import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserUseCase } from './get-user'
import { beforeEach, describe, expect, it } from 'vitest'

let usersRepository: InMemoryUsersRepository
let sut: GetUserUseCase

describe('GetUserUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserUseCase(usersRepository)
  })

  it('should be able to get a user', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      avatar_url: 'http://example.com/avatar.jpg',
    })

    const userFound = await sut.execute({ user_identifier: user.id })

    expect(userFound).toEqual(user)
  })
})
