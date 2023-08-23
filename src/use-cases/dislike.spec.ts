import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLikesRepository as InMemoryDislikesRepository } from '@/repositories/in-memory/in-memory-likes-repository'
import { DislikeUseCase } from './dislike'
import { randomUUID } from 'crypto'

let dislikesRepository: InMemoryDislikesRepository
let sut: DislikeUseCase

describe('LikeUseCase', () => {
  beforeEach(() => {
    dislikesRepository = new InMemoryDislikesRepository()
    sut = new DislikeUseCase(dislikesRepository)
  })

  it('should be able to dislike a video', async () => {
    const user_id = randomUUID()
    const video_id = randomUUID()

    dislikesRepository.like({
      video_id,
      user_id,
    })

    await sut.execute({
      video_id,
      user_id,
    })

    expect(dislikesRepository.items).toHaveLength(0)
  })
})
