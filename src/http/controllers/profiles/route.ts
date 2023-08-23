import { FastifyInstance } from 'fastify'

import { action } from './action'
import { getAllProfileInfo } from './getAllProfileInfo'

export async function profilesRoutes(app: FastifyInstance) {
  app.post('/profiles/action', action)

  app.get('/profiles/:user_id', getAllProfileInfo)
  app.get('/profiles/:user_id/:follow_user_id', getAllProfileInfo)
}
