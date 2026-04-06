import { Player } from './Player.js'
import { RoomFullError } from '@/errors/RoomErrors.js'

export type RoomOptions = {
  maxPlayers: number
  time: number | null
  categories: string[]
}

export class Room {
  public readonly code: string
  public maxPlayers: number
  public time: number | null
  public categories: string[]
  public currentRound: number
  public players: Player[]

  constructor(code: string, options: RoomOptions) {
    this.code = code
    this.maxPlayers = options.maxPlayers
    this.time = options.time
    this.categories = options.categories
    this.currentRound = 0
    this.players = []
  }

  get isFull() {
    return this.players.length >= this.maxPlayers
  }

  get isEmpty() {
    return this.players.length === 0
  }

  get hasConnectedPlayers() {
    return this.players.some(p => p.isConnected)
  }

  getPlayer(playerId: string) {
    return this.players.find(p => p.id === playerId)
  }

  join(player: Player) {
    if (this.isFull) throw new RoomFullError()
    this.players.push(player)
  }

  leave(playerId: string) {
    this.players = this.players.filter(p => p.id !== playerId)
  }
}
