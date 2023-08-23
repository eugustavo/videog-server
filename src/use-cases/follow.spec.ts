import { InMemoryProfilesRepository } from '@/repositories/in-memory/in-memory-profiles-repository'
import { FollowUseCase } from './follow'
import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'crypto'
import { InvalidRequestBodyError } from './errors/invalid-request-body'

let profilesRepository: InMemoryProfilesRepository
let sut: FollowUseCase

describe('FollowUseCase', () => {
  beforeEach(() => {
    profilesRepository = new InMemoryProfilesRepository()
    sut = new FollowUseCase(profilesRepository)
  })

  it('should be able to follow a user', async () => {
    const user_id = randomUUID()
    const follow_user_id = randomUUID()

    await sut.execute({ user_id, follow_user_id })

    expect(profilesRepository.items).toHaveLength(1)
  })

  it('should not be able to follow a user if user_id is not provided', async () => {
    const follow_user_id = randomUUID()

    await expect(
      sut.execute({ user_id: '', follow_user_id }),
    ).rejects.toBeInstanceOf(InvalidRequestBodyError)
  })

  it('should not be able to follow a user if follow_user_id is not provided', async () => {
    const user_id = randomUUID()

    await expect(
      sut.execute({ user_id, follow_user_id: '' }),
    ).rejects.toBeInstanceOf(InvalidRequestBodyError)
  })
})
