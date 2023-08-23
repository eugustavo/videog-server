import { FastifyInstance } from 'fastify'

import { reaction } from './reaction'
import { hasLiked } from './hasLiked'

export async function likesRoutes(app: FastifyInstance) {
  app.post('/video/reaction', reaction)
  app.get('/hasliked/:user_id/:video_id', hasLiked)
}
