import { InMemoryProfilesRepository } from '@/repositories/in-memory/in-memory-profiles-repository'
import { HasFollowedUseCase } from './has-followed'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let profilesRepository: InMemoryProfilesRepository
let usersRepository: InMemoryUsersRepository
let sut: HasFollowedUseCase

describe('HasFollowedUseCase', () => {
  beforeEach(() => {
    profilesRepository = new InMemoryProfilesRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new HasFollowedUseCase(profilesRepository)
  })

  it('should be able to check if a user has followed another user', async () => {
    const { id: user_id_01 } = await usersRepository.create({
      name: 'John Doe',
      avatar_url: 'http://image.com/image.png',
    })

    const { id: user_id_02 } = await usersRepository.create({
      name: 'John Doe 2',
      avatar_url: 'http://image.com/image.png',
    })

    await profilesRepository.follow({
      user_id: user_id_01,
      follow_user_id: user_id_02,
    })

    const hasFollowed = await sut.execute({
      user_id: user_id_01,
      follow_user_id: user_id_02,
    })

    expect(hasFollowed).toBe(true)
  })
})
