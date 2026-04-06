import { Player } from '@/models/Player.js'
import { InvalidTokenError } from '@/errors/PlayerError.js'

import { getRoom, deleteRoom } from './roomService.js'
import { generateToken, verifyToken } from '@/utils/playerTokens.js'

type JoinRoomProfileOptions = {
  name: string
  avatar: number
}

export function joinRoom(code: string, profile: JoinRoomProfileOptions) {
  const room = getRoom(code)
  const player = new Player(profile.name, profile.avatar)
  room.join(player)

  return generateToken({ roomCode: room.code, playerId: player.id })
}

export function getPlayerFromToken(token: string) {
  const payload = verifyToken(token)
  if (!payload) throw new InvalidTokenError()

  const room = getRoom(payload.roomCode)
  const player = room.getPlayer(payload.playerId)
  if (!player) throw new InvalidTokenError()

  return { player, room }
}

export function connectPlayer(token: string, socketId: string) {
  const { player } = getPlayerFromToken(token)
  player.connect(socketId)
}

export function disconnectPlayer(token: string) {
  const { player, room } = getPlayerFromToken(token)
  player.disconnect()

  if (!room.hasConnectedPlayers) deleteRoom(room.code)
}
