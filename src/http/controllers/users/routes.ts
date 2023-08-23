import { FastifyInstance } from 'fastify'

import { create } from './create'
import { getUser } from './getUser'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', create)
  app.get('/users/:user_identifier', getUser)
}
