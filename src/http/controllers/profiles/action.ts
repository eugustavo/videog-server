import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { SupabaseError } from '@/use-cases/errors/supabase-insert-error'
import { makeProfileUseCase } from '@/use-cases/factories/make-profile-use-case'

export async function action(req: FastifyRequest, reply: FastifyReply) {
  const profileActionBodySchema = z.object({
    user_id: z.string(),
    follow_user_id: z.string(),
  })

  const { user_id, follow_user_id } = profileActionBodySchema.parse(req.body)

  try {
    const { followUseCase, unfollowUseCase, hasFollowedUseCase } =
      makeProfileUseCase()

    const hasFollowed = await hasFollowedUseCase.execute({
      user_id,
      follow_user_id,
    })

    if (hasFollowed) {
      await unfollowUseCase.execute({ user_id, follow_user_id })

      return reply.status(200).send()
    }

    await followUseCase.execute({ user_id, follow_user_id })
    return reply.status(200).send()
  } catch (error) {
    if (error instanceof SupabaseError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
