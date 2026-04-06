import jwt from 'jsonwebtoken'
import { env } from '@/env.js'

import { InvalidTokenError } from '@/errors/PlayerErrors.js'

type Payload = {
  roomCode: string
  playerId: string
}

export function generateToken(payload: Payload) {
  return jwt.sign(payload, env.JWT_SECRET)
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, env.JWT_SECRET) as Payload
  } catch {
    throw new InvalidTokenError()
  }
}
