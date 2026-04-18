import * as z from 'zod'
import { roomCodeSchema, roomOptionsSchema } from '../room.js'
import { profileSchema } from '../player.js'

export const roomParamsSchema = z.object({
  code: roomCodeSchema
})

export type RoomParams = z.infer<typeof roomParamsSchema>

export const getRoomResponseSchema = z.object({
  code: roomCodeSchema,
  time: z.number().nullable(),
  categories: z.array(z.string()),
  maxPlayers: z.number(),
  currentRound: z.number(),
  players: z.number(),
  owner: z.string().optional()
})

export type GetRoomResponse = z.infer<typeof getRoomResponseSchema>

export const joinRoomBodySchema = profileSchema

export type JoinRoomBody = z.infer<typeof joinRoomBodySchema>

export const joinRoomResponseSchema = z.object({
  token: z.string()
})

export type JoinRoomResponse = z.infer<typeof joinRoomResponseSchema>

export const createRoomBodySchema = z.object({
  options: roomOptionsSchema,
  profile: joinRoomBodySchema
})

export type CreateRoomBody = z.infer<typeof createRoomBodySchema>

export const createRoomResponseSchema = z.object({
  roomCode: roomCodeSchema,
  token: z.string()
})

export type CreateRoomResponse = z.infer<typeof createRoomResponseSchema>
