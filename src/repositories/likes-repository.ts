import { Like } from '@/dtos/Like'

export interface LikesRepository {
  like(data: Like): Promise<void>
  dislike(data: Like): Promise<void>
  hasLiked(data: Like): Promise<boolean>
}
