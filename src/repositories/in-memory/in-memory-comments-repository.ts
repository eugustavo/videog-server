import { Comment } from '@/dtos/Comment'
import { CommentsRepository } from '../comments-repository'

export class InMemoryCommentsRepository implements CommentsRepository {
  public items: Comment[] = []

  async publicComment(comment: Comment) {
    this.items.push(comment)
  }

  async getComments(videoId: string) {
    return this.items.filter((comment) => comment.video_id === videoId)
  }
}
