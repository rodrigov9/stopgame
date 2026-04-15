import { FastifySchema } from 'fastify'

import {
  roomParamsSchema,
  RoomParams,
  getRoomResponseSchema,
  GetRoomResponse,
  joinRoomBodySchema,
  JoinRoomBody,
  joinRoomResponseSchema,
  JoinRoomResponse,
  createRoomBodySchema,
  CreateRoomBody,
  createRoomResponseSchema,
  CreateRoomResponse
} from '@stopgame/schemas/http/room'

export const getRoomSchema = {
  params: roomParamsSchema,
  response: {
    200: getRoomResponseSchema
  }
} satisfies FastifySchema

export type GetRoomSchema = {
  Params: RoomParams
  Reply: GetRoomResponse
}

export const joinRoomSchema = {
  params: roomParamsSchema,
  body: joinRoomBodySchema,
  response: {
    200: joinRoomResponseSchema
  }
} satisfies FastifySchema

export type JoinRoomSchema = {
  Params: RoomParams
  Body: JoinRoomBody
  Reply: JoinRoomResponse
}

export const createRoomSchema = {
  body: createRoomBodySchema,
  response: {
    201: createRoomResponseSchema
  }
} satisfies FastifySchema

export type CreateRoomSchema = {
  Body: CreateRoomBody
  Reply: CreateRoomResponse
}
