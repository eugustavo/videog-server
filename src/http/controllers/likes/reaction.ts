import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { SupabaseError } from '@/use-cases/errors/supabase-insert-error'
import { makeLikeUseCase } from '@/use-cases/factories/make-like-use-case'

export async function reaction(req: FastifyRequest, reply: FastifyReply) {
  const actionBodySchema = z.object({
    user_id: z.string(),
    video_id: z.string(),
  })

  const { user_id, video_id } = actionBodySchema.parse(req.body)

  try {
    const { likeUseCase, dislikeUseCase, hasLikedUseCase } = makeLikeUseCase()

    const hasLiked = await hasLikedUseCase.execute({ user_id, video_id })

    if (hasLiked) {
      await dislikeUseCase.execute({ user_id, video_id })

      return reply.status(200).send()
    }

    await likeUseCase.execute({ user_id, video_id })
    return reply.status(200).send()
  } catch (error) {
    if (error instanceof SupabaseError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
