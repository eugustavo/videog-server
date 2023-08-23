import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { SupabaseError } from '@/use-cases/errors/supabase-insert-error'
import { makeVideoUseCase } from '@/use-cases/factories/make-video-use-case'

export async function feed(req: FastifyRequest, reply: FastifyReply) {
  const feedQuerySchema = z.object({
    user_id: z.string(),
    page: z.string(),
  })

  const { user_id, page } = feedQuerySchema.parse(req.query)

  try {
    const { feedUseCase } = makeVideoUseCase()

    const feedVideos = await feedUseCase.execute({
      user_id,
      page: Number(page),
    })

    return reply.status(200).send(feedVideos)
  } catch (error) {
    if (error instanceof SupabaseError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
