import { FastifyInstance } from 'fastify'

import { publicComment } from './public'
import { getComments } from './getComments'

export async function commentsRoutes(app: FastifyInstance) {
  app.post('/public/comments', publicComment)
  app.get('/comments/:video_id', getComments)
}
