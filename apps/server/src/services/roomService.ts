import { customAlphabet } from 'nanoid'

import { Room, RoomOptions } from '@/models/Room.js'
import { RoomNotFoundError } from '@/errors/RoomErrors.js'

const rooms = new Map<string, Room>()

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
