import { InMemoryLikesRepository } from '@/repositories/in-memory/in-memory-likes-repository'
import { LikeUseCase } from './like'
import { beforeEach, describe, expect, it } from 'vitest'

let likesRepository: InMemoryLikesRepository
let sut: LikeUseCase

describe('LikeUseCase', () => {
  beforeEach(() => {
    likesRepository = new InMemoryLikesRepository()
    sut = new LikeUseCase(likesRepository)
  })

  it('should be able to like a video', async () => {
    await sut.execute({
      video_id: 'video-id',
      user_id: 'user-id',
    })

    expect(likesRepository.items).toHaveLength(1)
  })
})
