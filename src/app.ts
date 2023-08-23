import fastify from 'fastify'
import { ZodError } from 'zod'
import multer from 'fastify-multer'

import { usersRoutes } from './http/controllers/users/routes'
import { videosRoutes } from './http/controllers/videos/routes'
import { likesRoutes } from './http/controllers/likes/routes'
import { profilesRoutes } from './http/controllers/profiles/route'
import { commentsRoutes } from './http/controllers/comments/routes'

import { env } from './env'

export const app = fastify()

multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 1024, // 1GB
  },
})

app.register(multer.contentParser)

app.register(usersRoutes)
app.register(videosRoutes)
app.register(likesRoutes)
app.register(profilesRoutes)
app.register(commentsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.issues })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Crashalytics
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
