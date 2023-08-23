import { InMemoryCommentsRepository } from '@/repositories/in-memory/in-memory-comments-repository'
import { PublicCommentUseCase } from './public-comment'
import { beforeEach, describe, expect, it } from 'vitest'

let commentsRepository: InMemoryCommentsRepository
let sut: PublicCommentUseCase

describe('PublicCommentUseCase', () => {
  beforeEach(() => {
    commentsRepository = new InMemoryCommentsRepository()
    sut = new PublicCommentUseCase(commentsRepository)
  })

  it('should be able to public a comment', async () => {
    const comment = {
      author_id: 'any_author_id',
      video_id: 'any_video_id',
      content: 'any_content',
    }

    await sut.execute(comment)

    expect(commentsRepository.items.length).toBe(1)
    expect(commentsRepository.items[0]).toEqual(comment)
  })
})
