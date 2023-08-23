import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { SupabaseError } from '@/use-cases/errors/supabase-insert-error'
import { makeVideoUseCase } from '@/use-cases/factories/make-video-use-case'

import { supabase, supabaseStorageURL } from '@/libs/supabase'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const videoFile = req.file

  const createVideoBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    author_id: z.string(),
  })

  const { title, description, author_id } = createVideoBodySchema.parse(
    req.body,
  )

  const fileExt = videoFile.originalname.split('.').pop()
  const { data, error } = await supabase.storage
    .from('videos')
    .upload(`${Date.now()}.${fileExt}`, videoFile.buffer)

  if (error) {
    return reply.status(400).send({ message: error.message })
  }

  try {
    const { createVideoUseCase } = makeVideoUseCase()

    await createVideoUseCase.execute({
      title,
      description,
      author_id,
      video_url: `${supabaseStorageURL}/${data?.path}`,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof SupabaseError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
