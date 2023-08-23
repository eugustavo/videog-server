import { InMemoryProfilesRepository } from '@/repositories/in-memory/in-memory-profiles-repository'
import { GetFollowingUseCase } from './get-following'
import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'crypto'

let profilesRepository: InMemoryProfilesRepository
let sut: GetFollowingUseCase

const user_id = randomUUID()
const follow_user_id = randomUUID()

describe('GetFollowingUseCase', () => {
  beforeEach(() => {
    profilesRepository = new InMemoryProfilesRepository()
    sut = new GetFollowingUseCase(profilesRepository)
  })

  it('should be able to get user following', async () => {
    await profilesRepository.follow({
      user_id,
      follow_user_id,
    })

    const { following } = await sut.execute({ user_id })

    expect(following).toEqual(1)
  })
})
