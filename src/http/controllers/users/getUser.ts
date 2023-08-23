import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user-use-case'
import { SupabaseError } from '@/use-cases/errors/supabase-insert-error'

export async function getUser(req: FastifyRequest, reply: FastifyReply) {
  const getUserParamsSchema = z.object({
    user_identifier: z.string(),
  })

  const { user_identifier } = getUserParamsSchema.parse(req.params)

  try {
    const getUserUseCase = makeGetUserUseCase()

    const user = await getUserUseCase.execute({ user_identifier })

    return reply.status(200).send(user)
  } catch (error) {
    if (error instanceof SupabaseError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
