import { FastifyRequest, FastifyReply } from 'fastify'
import {
  CreateRoomSchema,
  GetRoomSchema,
  JoinRoomSchema
} from '../schemas/roomSchemas.js'

import * as roomService from '@/services/roomService.js'
import * as playerService from '@/services/playerService.js'
import { generateToken } from '@/utils/playerTokens.js'

export function createRoom(
  req: FastifyRequest<CreateRoomSchema>,
  reply: FastifyReply
) {
  const { options, profile } = req.body

  const { code } = roomService.createRoom(options)
  const player = playerService.joinRoom(code, profile)

  const token = generateToken({ roomCode: code, playerId: player.id })

  return reply.status(201).send({ roomCode: code, token })
}

export function getRoom(req: FastifyRequest<GetRoomSchema>) {
  const { code } = req.params
  const roomData = roomService.getRoom(code).toJSON()

  return {
    ...roomData,
    players: {
      ...roomData.players,
      current: roomData.players.current.length
    }
  }
}

export function joinRoom(req: FastifyRequest<JoinRoomSchema>) {
  const { code } = req.params

  const player = playerService.joinRoom(code, req.body)
  const token = generateToken({ roomCode: code, playerId: player.id })

  return { token }
}
