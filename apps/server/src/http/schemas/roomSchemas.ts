import { FastifySchema } from 'fastify'
import * as z from 'zod'

import { roomCodeSchema, roomOptionsSchema } from '@stopgame/schemas/room'
import { profileSchema } from '@stopgame/schemas/player'

const roomParamsSchema = z.object({
  code: roomCodeSchema
})

export const getRoomSchema = {
  params: roomParamsSchema
} satisfies FastifySchema

export type GetRoomSchema = {
  Params: z.infer<typeof roomParamsSchema>
}

const joinRoomBodySchema = profileSchema

export const joinRoomSchema = {
  body: joinRoomBodySchema,
  params: roomParamsSchema
} satisfies FastifySchema

export type JoinRoomSchema = {
  Body: z.infer<typeof joinRoomBodySchema>
  Params: z.infer<typeof roomParamsSchema>
}

const createRoomBodySchema = z.object({
  options: roomOptionsSchema,
  profile: joinRoomBodySchema
})

export const createRoomSchema = {
  body: createRoomBodySchema
} satisfies FastifySchema

export type CreateRoomSchema = {
  Body: z.infer<typeof createRoomBodySchema>
}
