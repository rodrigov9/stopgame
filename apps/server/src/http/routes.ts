import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'

import { roomRoutes } from './routes/roomRoutes.js'

export const routes: FastifyPluginCallbackZod = app => {
  app.register(roomRoutes, { prefix: '/rooms' })
}
