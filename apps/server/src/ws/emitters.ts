import { Server } from './types/socketIO.js'

import { appEmitter } from '@/events/appEmitter.js'
import * as socketRooms from './socketRooms.js'

export function emitters(io: Server) {
  appEmitter
    .on('playerAdd', (roomCode, player) => {
      io.to(socketRooms.room(roomCode))
        .except(socketRooms.player(player.id))
        .emit('playerJoin', player.toJSON())
    })
    .on('playerUpdate', (roomCode, player) => {
      io.to(socketRooms.room(roomCode))
        .except(socketRooms.player(player.id))
        .emit('playerUpdate', player.toJSON())
    })
    .on('playerRemove', (roomCode, player) => {
      io.to(socketRooms.room(roomCode))
        .except(socketRooms.player(player.id))
        .emit('playerLeave', player.id)
    })
}
