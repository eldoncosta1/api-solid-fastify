import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { create } from './create'
import { history } from './history'
import { metrics } from './metrics'
import { validate } from './validate'

export async function checkinsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/checkins/history', history)
  app.get('/checkins/metrics', metrics)

  app.post('/gyms/:gymId/checkins', create)
  app.patch(
    '/checkins/:checkinId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )
}
