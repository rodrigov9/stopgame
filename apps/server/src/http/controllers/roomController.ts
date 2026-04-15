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
  reply: FastifyReply<CreateRoomSchema>
) {
  const { options, profile } = req.body

  const { code } = roomService.createRoom(options)
  const player = playerService.joinRoom(code, profile)

  const token = generateToken({ roomCode: code, playerId: player.id })

  reply.status(201).send({ roomCode: code, token })
}

export function getRoom(
  req: FastifyRequest<GetRoomSchema>,
  reply: FastifyReply<GetRoomSchema>
) {
  const { code } = req.params
  const roomData = roomService.getRoom(code).toJSON()

  reply.send({
    ...roomData,
    players: {
      ...roomData.players,
      current: roomData.players.current.length,
      owner: roomData.players.current[0]?.name
    }
  })
}

export function joinRoom(
  req: FastifyRequest<JoinRoomSchema>,
  reply: FastifyReply<JoinRoomSchema>
) {
  const { code } = req.params

  const player = playerService.joinRoom(code, req.body)
  const token = generateToken({ roomCode: code, playerId: player.id })

  reply.send({ token })
}
