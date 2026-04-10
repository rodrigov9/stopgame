import { Socket } from '@/@types/socket-io.js'

import { toggleReady } from '@/services/playerService.js'
import { getRoom } from '@/services/roomService.js'

export function roomHandlers(socket: Socket) {
  socket.on('ready', isReady => {
    toggleReady(socket.data.roomCode, socket.data.playerId, isReady)

    const room = getRoom(socket.data.roomCode)
    socket.to(`room_${room.code}`).emit('playersUpdate', room.players)
  })
}
