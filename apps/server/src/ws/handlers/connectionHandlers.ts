import { Socket } from '@/@types/socket-io.js'

import { getRoom } from '@/services/roomService.js'
import { disconnectPlayer } from '@/services/playerService.js'

export function connectionHandlers(socket: Socket) {
  socket.join([
    `room_${socket.data.roomCode}`,
    `player_${socket.data.playerId}`
  ])

  const room = getRoom(socket.data.roomCode)
  socket.emit('initialData', room.toJSON())
  socket.to(`room_${room.code}`).emit('playersUpdate', room.players)

  socket.on('disconnect', reason => {
    disconnectPlayer(
      socket.data.roomCode,
      socket.data.playerId,
      reason.endsWith('namespace disconnect')
    )

    socket.to(`room_${room.code}`).emit('playersUpdate', room.players)
  })
}
