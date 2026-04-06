import { Socket } from '@/@types/socket-io.js'

import { disconnectPlayer } from '@/services/playerService.js'

export function connectionHandlers(socket: Socket) {
  socket.join([
    `room_${socket.data.roomCode}`,
    `player_${socket.data.playerId}`
  ])

  socket.on('disconnect', reason => {
    disconnectPlayer(
      socket.data.roomCode,
      socket.data.playerId,
      reason.endsWith('namespace disconnect')
    )
  })
}
