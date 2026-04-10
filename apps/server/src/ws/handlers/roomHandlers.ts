import { Socket } from '@/@types/socket-io.js'

import { toggleReady } from '@/services/playerService.js'

export function roomHandlers(socket: Socket) {
  socket.on('ready', isReady => {
    toggleReady(socket.data.roomCode, socket.data.playerId, isReady)
  })
}
