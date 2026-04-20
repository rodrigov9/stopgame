import jwt from 'jsonwebtoken'
import * as z from 'zod'
import { env } from '@/env.js'

import { playerTokenPayloadSchema } from '@stopgame/schemas/player'
import { InvalidTokenError } from '@/errors/PlayerErrors.js'

export type TokenPayload = z.infer<typeof playerTokenPayloadSchema>

export function generateToken(payload: TokenPayload) {
  return jwt.sign(payload, env.JWT_SECRET)
}

export function verifyToken(token: string) {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET)
    return playerTokenPayloadSchema.parse(payload)
  } catch {
    throw new InvalidTokenError()
  }
}
