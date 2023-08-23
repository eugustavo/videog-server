import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { SupabaseError } from '@/use-cases/errors/supabase-insert-error'
import { makeProfileUseCase } from '@/use-cases/factories/make-profile-use-case'
import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user-use-case'

export async function getAllProfileInfo(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllProfileInfoParamsSchema = z.object({
    user_id: z.string(),
    follow_user_id: z.string().nullable().optional(),
  })

  const { user_id, follow_user_id } = getAllProfileInfoParamsSchema.parse(
    req.params,
  )

  try {
    const { getFollowersUseCase, getFollowingUseCase, hasFollowedUseCase } =
      makeProfileUseCase()
    const getUserUseCase = makeGetUserUseCase()

    const { followers } = await getFollowersUseCase.execute({
      user_id,
    })
    const { following } = await getFollowingUseCase.execute({
      user_id,
    })
    const user = await getUserUseCase.execute({ user_identifier: user_id })

    let hasFollowed = false
    const profileIamSee = user_id
    const Me = follow_user_id

    if (profileIamSee && Me) {
      hasFollowed = await hasFollowedUseCase.execute({
        user_id: Me,
        follow_user_id: profileIamSee,
      })

      return reply.status(200).send({
        followers,
        following,
        hasFollowed,
        user: {
          name: user?.name,
          avatar_url: user?.avatar_url,
        },
      })
    }

    return reply.status(200).send({
      followers,
      following,
      user: {
        name: user?.name,
        avatar_url: user?.avatar_url,
      },
    })
  } catch (error) {
    if (error instanceof SupabaseError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
