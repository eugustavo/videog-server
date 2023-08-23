import { InMemoryLikesRepository } from '@/repositories/in-memory/in-memory-likes-repository'
import { HasLikedUseCase } from './has-liked'
import { beforeEach, describe, expect, it } from 'vitest'

let likesRepository: InMemoryLikesRepository
let sut: HasLikedUseCase

describe('HasLikedUseCase', () => {
  beforeEach(() => {
    likesRepository = new InMemoryLikesRepository()
    sut = new HasLikedUseCase(likesRepository)
  })

  it('should be able to check if a user has liked a video', async () => {
    const user_id = 'user_id'
    const video_id = 'video_id'

    await likesRepository.like({
      user_id,
      video_id,
    })

    const hasLiked = await sut.execute({ user_id, video_id })

    expect(hasLiked).toBe(true)
  })
})
