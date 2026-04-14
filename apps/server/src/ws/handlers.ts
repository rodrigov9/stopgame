import { Server } from './types/socketIO.js'

import { authMiddleware } from './middlewares/authMiddleware.js'
import { connectionHandlers } from './handlers/connectionHandlers.js'
import { roomHandlers } from './handlers/roomHandlers.js'

export function handlers(io: Server) {
  io.use(authMiddleware)

  io.on('connection', socket => {
    connectionHandlers(socket)
    roomHandlers(socket)
  })
}
