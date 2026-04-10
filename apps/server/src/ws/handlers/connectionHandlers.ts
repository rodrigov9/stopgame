import { Socket } from '../types.js'
import * as socketRooms from '../socketRooms.js'

import { getRoom } from '@/services/roomService.js'
import { disconnectPlayer } from '@/services/playerService.js'

export function connectionHandlers(socket: Socket) {
  socket.join([
    socketRooms.room(socket.data.roomCode),
    socketRooms.player(socket.data.playerId)
  ])

  const room = getRoom(socket.data.roomCode).toJSON()
  socket.emit('initialData', room)

  socket.on('disconnect', reason => {
    disconnectPlayer(
      socket.data.roomCode,
      socket.data.playerId,
      reason.endsWith('namespace disconnect')
    )
  })
}
