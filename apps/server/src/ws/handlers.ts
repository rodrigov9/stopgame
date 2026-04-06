import { FastifyPluginCallback } from 'fastify'

import { authMiddleware } from './middlewares/authMiddleware.js'
import { connectionHandlers } from './handlers/connectionHandlers.js'

export const handlers: FastifyPluginCallback = app => {
  app.io.use(authMiddleware)

  app.io.on('connection', socket => {
    connectionHandlers(socket)
  })
}
