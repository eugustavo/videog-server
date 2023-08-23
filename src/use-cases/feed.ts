import { VideosRepository } from '@/repositories/videos-repository'
import { InvalidRequestBodyError } from './errors/invalid-request-body'

interface FeedRequest {
  page: number
  user_id: string
}

export class FeedUseCase {
  constructor(private videosRepository: VideosRepository) {}

  async execute(data: FeedRequest) {
    if (!data.page || !data.user_id) {
      throw new InvalidRequestBodyError()
    }

    const feed = await this.videosRepository.getFeed(data.user_id, data.page)

    return feed
  }
}
