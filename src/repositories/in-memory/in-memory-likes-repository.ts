import { randomUUID } from 'node:crypto'
import { LikesRepository } from '../likes-repository'
import { Like } from '@/dtos/Like'

export class InMemoryLikesRepository implements LikesRepository {
  public items: Like[] = []

  async like(data: Like) {
    const like = {
      id: randomUUID(),
      user_id: data.user_id,
      video_id: data.video_id,
    }

    this.items.push(like)
  }

  async dislike(data: Like) {
    this.items = this.items.filter((item) => {
      return item.user_id !== data.user_id && item.video_id !== data.video_id
    })
  }

  async hasLiked(data: Like): Promise<boolean> {
    const like = this.items.find((item) => {
      return item.user_id === data.user_id && item.video_id === data.video_id
    })

    return !!like
  }
}
