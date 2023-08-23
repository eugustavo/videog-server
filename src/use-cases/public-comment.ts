import { CommentsRepository } from '@/repositories/comments-repository'
import { InvalidRequestBodyError } from './errors/invalid-request-body'

interface PublicCommentRequest {
  author_id: string
  video_id: string
  content: string
}

export class PublicCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute(data: PublicCommentRequest) {
    if (!data.author_id || !data.video_id || !data.content) {
      throw new InvalidRequestBodyError()
    }

    await this.commentsRepository.publicComment(data)
  }
}
