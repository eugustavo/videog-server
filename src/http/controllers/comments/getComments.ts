import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { SupabaseError } from '@/use-cases/errors/supabase-insert-error'
import { makeCommentsUseCase } from '@/use-cases/factories/make-comments-use-case'

export async function getComments(req: FastifyRequest, reply: FastifyReply) {
  const getCommentsParamsSchema = z.object({
    video_id: z.string(),
  })

  const { video_id } = getCommentsParamsSchema.parse(req.params)

  try {
    const { getCommentsUseCase } = makeCommentsUseCase()

    const comments = await getCommentsUseCase.execute({ video_id })

    return reply.status(200).send(comments)
  } catch (error) {
    if (error instanceof SupabaseError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
