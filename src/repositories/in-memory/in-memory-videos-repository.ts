import { randomUUID } from 'node:crypto'
import { VideosRepository } from '../videos-repository'
import { Video } from '@/dtos/Video'

export class InMemoryVideosRepository implements VideosRepository {
  public items: Video[] = []

  async create(data: Video) {
    const video = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      author_id: data.author_id,
      video_url: data.video_url,
    }

    this.items.push(video)

    return video
  }

  async getFeed(user_id: string, page: number) {
    const limit = 10
    const offset = (page - 1) * limit

    const feed = this.items
      .filter((item) => item.author_id !== user_id)
      .slice(offset, offset + limit)

    return feed
  }
}
