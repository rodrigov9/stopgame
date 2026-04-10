import { FastifyPluginCallback } from 'fastify'
import { Server } from 'socket.io'
import { Server as AppServer } from './types.js'

import { handlers } from './handlers.js'
import { emitters } from './emitters.js'

export const websockets: FastifyPluginCallback = app => {
  const io: AppServer = new Server(app.server)

  handlers(io)
  emitters(io)

  app.addHook('preClose', async () => {
    io.local.disconnectSockets(true)
  })

  app.addHook('onClose', async () => {
    await io.close()
  })
}
