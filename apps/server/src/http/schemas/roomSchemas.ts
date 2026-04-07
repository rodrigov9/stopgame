import { FastifySchema } from 'fastify'
import * as z from 'zod'

const roomParamsSchema = z.object({
  code: z
    .string()
    .length(6)
    .toUpperCase()
    .regex(/^[A-Z0-9]+$/)
})

export const getRoomSchema = {
  params: roomParamsSchema
} satisfies FastifySchema

export type GetRoomSchema = {
  Params: z.infer<typeof roomParamsSchema>
}

const joinRoomBodySchema = z.object({
  name: z.string().min(1),
  avatar: z.int()
})

export const joinRoomSchema = {
  body: joinRoomBodySchema,
  params: roomParamsSchema
} satisfies FastifySchema

export type JoinRoomSchema = {
  Body: z.infer<typeof joinRoomBodySchema>
  Params: z.infer<typeof roomParamsSchema>
}

const createRoomBodySchema = z.object({
  options: z.object({
    maxPlayers: z.int().min(3).max(30).default(10),
    time: z
      .int()
      .min(30)
      .max(5 * 60)
      .multipleOf(30)
      .nullable()
      .default(null),
    categories: z.array(z.string().min(1).max(20)).min(1)
  }),
  profile: joinRoomBodySchema
})

export const createRoomSchema = {
  body: createRoomBodySchema
} satisfies FastifySchema

export type CreateRoomSchema = {
  Body: z.infer<typeof createRoomBodySchema>
}
