import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'crypto'
import { InMemoryProfilesRepository } from '@/repositories/in-memory/in-memory-profiles-repository'

import { InvalidRequestBodyError } from './errors/invalid-request-body'
import { UnfollowUseCase } from './unfollow'

let profilesRepository: InMemoryProfilesRepository
let sut: UnfollowUseCase

const user_id = randomUUID()
const follow_user_id = randomUUID()

describe('UnfollowUseCase', () => {
  beforeEach(async () => {
    profilesRepository = new InMemoryProfilesRepository()
    sut = new UnfollowUseCase(profilesRepository)
  })

  it('should be able to unfollow a user', async () => {
    await profilesRepository.follow({
      user_id,
      follow_user_id,
    })

    expect(profilesRepository.items).toHaveLength(1)

    await sut.execute({ user_id, follow_user_id })

    expect(profilesRepository.items).toHaveLength(0)
  })

  it('should not be able to unfollow a user if user_id is not provided', async () => {
    await expect(
      sut.execute({ user_id: '', follow_user_id }),
    ).rejects.toBeInstanceOf(InvalidRequestBodyError)
  })

  it('should not be able to unfollow a user if follow_user_id is not provided', async () => {
    const user_id = randomUUID()

    await expect(
      sut.execute({ user_id, follow_user_id: '' }),
    ).rejects.toBeInstanceOf(InvalidRequestBodyError)
  })
})
