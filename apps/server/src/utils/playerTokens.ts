import jwt from 'jsonwebtoken'
import { env } from '@/env.js'

import { InvalidTokenError } from '@/errors/PlayerErrors.js'

export type TokenPayload = {
  roomCode: string
  playerId: string
}

export function generateToken(payload: TokenPayload) {
  return jwt.sign(payload, env.JWT_SECRET)
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload
  } catch {
    throw new InvalidTokenError()
  }
}
