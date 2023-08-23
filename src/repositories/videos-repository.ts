import { Video } from '@/dtos/Video'

export interface VideosRepository {
  create(data: Video): Promise<Video>
  getFeed(user_id: string, page: number): Promise<Video[] | null>
}
