import jwt from 'jsonwebtoken'
import * as z from 'zod'
import { env } from '@/env.js'

import { roomCodeSchema } from '@stopgame/schemas/room'
import { InvalidTokenError } from '@/errors/PlayerErrors.js'

const tokenPayloadSchema = z.object({
  roomCode: roomCodeSchema,
  playerId: z.uuid()
})

export type TokenPayload = z.infer<typeof tokenPayloadSchema>

export function generateToken(payload: TokenPayload) {
  return jwt.sign(payload, env.JWT_SECRET)
}

export function verifyToken(token: string) {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET)
    return tokenPayloadSchema.parse(payload)
  } catch {
    throw new InvalidTokenError()
  }
}
