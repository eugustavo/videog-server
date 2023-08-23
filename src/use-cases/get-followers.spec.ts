import { describe, beforeEach, it, expect } from 'vitest'
import { randomUUID } from 'crypto'
import { InMemoryProfilesRepository } from '@/repositories/in-memory/in-memory-profiles-repository'
import { GetFollowersUseCase } from './get-followers'
import { InvalidRequestBodyError } from './errors/invalid-request-body'

let profilesRepository: InMemoryProfilesRepository
let sut: GetFollowersUseCase

const user_id = randomUUID()
const follow_user_id = randomUUID()

describe('GetFollowersUseCase', () => {
  beforeEach(() => {
    profilesRepository = new InMemoryProfilesRepository()
    sut = new GetFollowersUseCase(profilesRepository)
  })

  it('should be able to get user followers', async () => {
    await profilesRepository.follow({
      user_id,
      follow_user_id,
    })

    const { followers } = await sut.execute({ user_id: follow_user_id })

    expect(followers).toEqual(1)
  })

  it('should not be able to get user followers if user_id is not provided', async () => {
    await expect(sut.execute({ user_id: '' })).rejects.toBeInstanceOf(
      InvalidRequestBodyError,
    )
  })
})
