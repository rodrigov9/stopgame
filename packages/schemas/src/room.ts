import * as z from 'zod'
import { PlayerModel } from './player.js'

export const roomCodeSchema = z
  .string()
  .length(6)
  .toUpperCase()
  .regex(/^[A-Z0-9]+$/)

export const roomOptionsSchema = z.object({
  maxPlayers: z.int().min(3).max(30).default(10),
  time: z
    .int()
    .min(30)
    .max(5 * 60)
    .multipleOf(30)
    .nullable()
    .default(null),
  categories: z.array(z.string().min(1).max(20)).min(1)
})

export type RoomModel = {
  code: string
  time: number | null
  categories: string[]
  currentRound: number
  players: {
    current: PlayerModel[]
    max: number
  }
}
