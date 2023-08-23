import { InMemoryVideosRepository } from '@/repositories/in-memory/in-memory-videos-repository'
import { FeedUseCase } from './feed'
import { beforeEach, describe, expect, it } from 'vitest'

let videosRepository: InMemoryVideosRepository
let sut: FeedUseCase

describe('FeedUseCase', () => {
  beforeEach(() => {
    videosRepository = new InMemoryVideosRepository()
    sut = new FeedUseCase(videosRepository)
  })

  it('should return a feed', async () => {
    for (let i = 0; i < 20; i++) {
      await videosRepository.create({
        title: 'any_title',
        description: 'any_description',
        author_id: `any_author_id_${i}`,
        video_url: 'any_video_url',
      })
    }

    const feedPageOne = await sut.execute({
      page: 1,
      user_id: 'any_author_id_5',
    })

    const feedPageTwo = await sut.execute({
      page: 2,
      user_id: 'any_author_id_5',
    })

    expect(feedPageOne).toHaveLength(10)
    expect(feedPageTwo).toHaveLength(9)
  })
})
