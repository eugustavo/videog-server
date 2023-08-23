import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryVideosRepository } from '@/repositories/in-memory/in-memory-videos-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { CreateVideoUseCase } from './create-video'
import { InvalidRequestBodyError } from './errors/invalid-request-body'

let videosRepository: InMemoryVideosRepository
let usersRepository: InMemoryUsersRepository
let sut: CreateVideoUseCase

describe('CreateVideoUseCase', () => {
  beforeEach(() => {
    videosRepository = new InMemoryVideosRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateVideoUseCase(videosRepository)
  })

  it('should be able to create a new video', async () => {
    const author = await usersRepository.create({
      name: 'John Doe',
      avatar_url: 'http://example.com/avatar.jpg',
    })

    const { video } = await sut.execute({
      title: 'Video Title',
      description: 'Video Description',
      author_id: author.id,
      video_url: 'http://example.com/video.mp4',
    })

    expect(video.id).toEqual(expect.any(String))
    expect(video.author_id).toEqual(author.id)
  })

  it('should not be able to create a new video with invalid data', async () => {
    await expect(
      sut.execute({
        title: '',
        description: 'Video Description',
        author_id: '',
        video_url: 'http://example.com/video.mp4',
      }),
    ).rejects.toBeInstanceOf(InvalidRequestBodyError)
  })
})
