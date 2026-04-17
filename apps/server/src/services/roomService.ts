import { customAlphabet } from 'nanoid'

import { Room, RoomOptions } from '@/models/Room.js'
import { RoomNotFoundError } from '@/errors/RoomErrors.js'

const ROOM_INACTIVITY_TIMEOUT = 3 * 60 * 1000

const rooms = new Map<string, Room>()
const inactivityTimeouts = new Map<string, NodeJS.Timeout>()

const generateCode = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)

export function createRoom(options: RoomOptions) {
  const code = generateCode()
  const room = new Room(code, options)
  rooms.set(code, room)

  return room
}

export function getRoom(code: string) {
  const room = rooms.get(code)
  if (!room) throw new RoomNotFoundError()

  return room
}

export function deleteRoom(code: string) {
  const deleted = rooms.delete(code)
  if (!deleted) throw new RoomNotFoundError()
}

export function scheduleRoomDeletion(code: string) {
  if (!rooms.has(code)) throw new RoomNotFoundError()

  const timeout = setTimeout(() => deleteRoom(code), ROOM_INACTIVITY_TIMEOUT)

  clearTimeout(inactivityTimeouts.get(code))
  inactivityTimeouts.set(code, timeout)
}

export function cancelRoomDeletion(code: string) {
  const timeout = inactivityTimeouts.get(code)

  if (timeout) {
    clearTimeout(timeout)
    inactivityTimeouts.delete(code)
  }
}

export function seedRooms() {
  const code = 'DEBUG1'
  const room = new Room(code, {
    maxPlayers: 10,
    time: null,
    categories: ['Category 1', 'Category 2', 'Category 3']
  })
  rooms.set(code, room)
  return room
}
