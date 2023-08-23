import { CommentsRepository } from '@/repositories/comments-repository'

interface GetCommentsRequest {
  video_id: string
}

export class GetCommentsUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute(data: GetCommentsRequest) {
    const comments = await this.commentsRepository.getComments(data.video_id)

    return comments
  }
}
