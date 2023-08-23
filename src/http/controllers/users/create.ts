import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateUserUseCase } from '@/use-cases/factories/make-create-user-use-case'
import { SupabaseError } from '@/use-cases/errors/supabase-insert-error'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    avatar_url: z.string(),
    user_identifier: z.string(),
  })

  const { name, avatar_url, user_identifier } = createUserBodySchema.parse(
    req.body,
  )

  try {
    const createUserUseCase = makeCreateUserUseCase()

    const { user } = await createUserUseCase.execute({
      name,
      avatar_url,
      user_identifier,
    })

    return reply.status(201).send(user)
  } catch (error) {
    if (error instanceof SupabaseError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
