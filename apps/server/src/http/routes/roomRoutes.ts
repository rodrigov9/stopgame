import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import * as z from 'zod'

import { roomOptionsSchema } from '@/schemas/roomOptionsSchema.js'
import { profileSchema } from '@/schemas/profileSchema.js'
import { roomCodeSchema } from '@/schemas/roomCodeSchema.js'

import { createRoom, getRoom } from '@/services/roomService.js'
import { joinRoom } from '@/services/playerService.js'
import { generateToken } from '@/utils/playerTokens.js'

export const roomRoutes: FastifyPluginCallbackZod = app => {
  app.post(
    '/',
    {
      schema: {
        body: z.object({
          options: roomOptionsSchema,
          profile: profileSchema
        })
      }
    },
    req => {
      const { options, profile } = req.body

      const { code } = createRoom(options)
      const player = joinRoom(code, profile)

      const token = generateToken({ roomCode: code, playerId: player.id })

      return { roomCode: code, token }
    }
  )

  app.get(
    '/:code',
    {
      schema: {
        params: z.object({
          code: roomCodeSchema
        })
      }
    },
    req => {
      const { code } = req.params
      const room = getRoom(code)

      return {
        code: room.code,
        time: room.time,
        categories: room.categories,
        currentRound: room.currentRound,
        players: {
          current: room.players.length,
          max: room.maxPlayers
        }
      }
    }
  )

  app.post(
    '/:code/join',
    {
      schema: {
        params: z.object({
          code: roomCodeSchema
        }),
        body: profileSchema
      }
    },
    req => {
      const { code } = req.params

      const player = joinRoom(code, req.body)
      const token = generateToken({ roomCode: code, playerId: player.id })

      return { token }
    }
  )
}
