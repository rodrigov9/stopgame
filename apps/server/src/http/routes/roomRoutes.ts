import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'

import {
  createRoomSchema,
  getRoomSchema,
  joinRoomSchema
} from '../schemas/roomSchemas.js'
import { createRoom, getRoom, joinRoom } from '../controllers/roomController.js'

export const roomRoutes: FastifyPluginCallbackZod = app => {
  app.post('/', { schema: createRoomSchema }, createRoom)
  app.get('/:code', { schema: getRoomSchema }, getRoom)
  app.post('/:code/join', { schema: joinRoomSchema }, joinRoom)
}
