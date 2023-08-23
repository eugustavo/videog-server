import { Video } from '@/dtos/Video'
import { VideosRepository } from '../videos-repository'
import { supabase } from '@/libs/supabase'

export class SupabaseVideosRepository implements VideosRepository {
  async create(data: Video): Promise<Video> {
    const { data: video, error } = await supabase
      .from('videos')
      .insert(data)
      .returns<Video>()

    if (error) throw new Error(error.message)

    return video
  }

  async getFeed(user_id: string, page: number): Promise<Video[] | null> {
    const limit = 10

    const from = (page - 1) * limit
    const to = page * limit

    const { data } = await supabase.rpc('feed_videos', {
      user_id,
      page: from,
      limite: to,
    })

    return data
  }
}
