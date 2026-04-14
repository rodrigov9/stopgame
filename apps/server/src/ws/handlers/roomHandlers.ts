import { Socket } from '../types/socketIO.js'
import { socketEventHandler } from './handler.js'
import { readySchema } from '../schemas/roomSchemas.js'

import { toggleReady } from '@/services/playerService.js'

export function roomHandlers(socket: Socket) {
  socket.on(
    'ready',
    socketEventHandler(readySchema, isReady => {
      toggleReady(socket.data.roomCode, socket.data.playerId, isReady)
    })
  )
}
