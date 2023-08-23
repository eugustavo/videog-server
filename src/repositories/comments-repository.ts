import { Comment } from '@/dtos/Comment'

export interface CommentsRepository {
  publicComment(comment: Comment): Promise<void>
  getComments(videoId: string): Promise<Comment[]>
}
