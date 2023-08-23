import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import { create } from './create'
import { feed } from './feed'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 1024, // 100MB
  },
})

export async function videosRoutes(app: FastifyInstance) {
  app.post(
    '/videos',
    { bodyLimit: 1024 * 1024 * 1024, preHandler: upload.single('video') },
    create,
  )
  app.get('/feed', feed)
}
