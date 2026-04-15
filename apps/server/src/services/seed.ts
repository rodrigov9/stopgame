import { seedRooms } from './roomService.js'
import { Player } from '@/models/Player.js'
import { generateToken } from '@/utils/playerTokens.js'

const room = seedRooms()
const player = new Player(
  '9ecf5fa2-782d-48e2-be55-bded0b267250',
  'Player 1',
  'cat'
)
room.join(player)

const token = generateToken({
  playerId: player.id,
  roomCode: room.code
})

console.log('Created seed room with code', room.code)
console.log('Generated token:', token)
