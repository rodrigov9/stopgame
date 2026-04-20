import * as z from 'zod'
import { roomCodeSchema } from './room.js'

export const profileSchema = z.object({
  name: z.string().min(1),
  avatar: z.string()
})

export type PlayerModel = {
  id: string
  name: string
  avatar: string
  score: number
  isConnected: boolean
  isReady: boolean
}

export const playerTokenPayloadSchema = z.object({
  roomCode: roomCodeSchema,
  playerId: z.uuid()
})
