import { Player } from '@/models/Player.js'
import { InvalidTokenError } from '@/errors/PlayerErrors.js'

import { getRoom, deleteRoom } from './roomService.js'

type JoinRoomProfileOptions = {
  name: string
  avatar: number
}

export function joinRoom(code: string, profile: JoinRoomProfileOptions) {
  const room = getRoom(code)
  const player = new Player(profile.name, profile.avatar)
  room.join(player)

  return player
}

export function getPlayer(roomCode: string, playerId: string) {
  const room = getRoom(roomCode)
  const player = room.getPlayer(playerId)
  if (!player) throw new InvalidTokenError()

  return { player, room }
}

export function connectPlayer(roomCode: string, playerId: string) {
  const { player } = getPlayer(roomCode, playerId)
  player.isConnected = true
}

export function disconnectPlayer(
  roomCode: string,
  playerId: string,
  leave = false
) {
  const { player, room } = getPlayer(roomCode, playerId)
  player.isConnected = false

  if (leave) room.leave(player.id)

  if (!room.hasConnectedPlayers) deleteRoom(room.code)
}

export function toggleReady(
  roomCode: string,
  playerId: string,
  isReady: boolean
) {
  const { player, room } = getPlayer(roomCode, playerId)
  player.isReady = isReady

  if (room.canStart) room.startRound()
}
