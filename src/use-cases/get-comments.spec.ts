import { InMemoryCommentsRepository } from '@/repositories/in-memory/in-memory-comments-repository'
import { GetCommentsUseCase } from './get-comments'
import { beforeEach, describe, expect, it } from 'vitest'

let commentsRepository: InMemoryCommentsRepository
let sut: GetCommentsUseCase

describe('GetCommentsUseCase', () => {
  beforeEach(() => {
    commentsRepository = new InMemoryCommentsRepository()
    sut = new GetCommentsUseCase(commentsRepository)
  })

  it('should be able to get comments the video', async () => {
    const comment = {
      author_id: 'any_author_id',
      video_id: 'any_video_id',
      content: 'any_content',
    }

    await commentsRepository.publicComment(comment)

    const comments = await sut.execute({ video_id: 'any_video_id' })

    expect(comments.length).toBe(1)
    expect(comments[0]).toEqual(comment)
  })
})
