import { middleware } from './middleware.js'
import { verifyToken } from '@/utils/playerTokens.js'
import { connectPlayer } from '@/services/playerService.js'

export const authMiddleware = middleware(socket => {
  const token = socket.handshake.auth.token ?? socket.handshake.headers.token
  socket.data = verifyToken(token)
  connectPlayer(socket.data.roomCode, socket.data.playerId)
})
