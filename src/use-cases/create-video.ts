import { Video } from '@/dtos/Video'
import { VideosRepository } from '@/repositories/videos-repository'
import { InvalidRequestBodyError } from './errors/invalid-request-body'

interface CreateVideoRequest {
  title: string
  description: string
  author_id: string
  video_url: string
}

interface CreateVideoResponse {
  video: Video
}

export class CreateVideoUseCase {
  constructor(private videosRepository: VideosRepository) {}

  async execute(data: CreateVideoRequest): Promise<CreateVideoResponse> {
    if (
      !data.title ||
      !data.description ||
      !data.author_id ||
      !data.video_url
    ) {
      throw new InvalidRequestBodyError()
    }

    const video = await this.videosRepository.create(data)

    return { video }
  }
}
