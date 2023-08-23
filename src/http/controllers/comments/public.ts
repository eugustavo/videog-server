import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { SupabaseError } from '@/use-cases/errors/supabase-insert-error'
import { makeCommentsUseCase } from '@/use-cases/factories/make-comments-use-case'

export async function publicComment(req: FastifyRequest, reply: FastifyReply) {
  const publicCommentBodySchema = z.object({
    author_id: z.string(),
    video_id: z.string(),
    content: z.string(),
  })

  const { author_id, video_id, content } = publicCommentBodySchema.parse(
    req.body,
  )

  try {
    const { publicCommentUseCase } = makeCommentsUseCase()

    await publicCommentUseCase.execute({ author_id, video_id, content })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof SupabaseError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
