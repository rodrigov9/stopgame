import { Player } from './Player.js'
import { Round } from './Round.js'
import { RoomFullError } from '@/errors/RoomErrors.js'

import { RoomModel } from '@stopgame/schemas/room'

export type RoomOptions = {
  maxPlayers: number
  time: number | null
  categories: string[]
}

export class Room {
  readonly code: string
  maxPlayers: number
  time: number | null
  categories: string[]
  players: Player[]
  rounds: Round[]

  constructor(code: string, options: RoomOptions) {
    this.code = code
    this.maxPlayers = options.maxPlayers
    this.time = options.time
    this.categories = options.categories
    this.players = []
    this.rounds = []
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

  get canStart() {
    return this.players.length >= 2 && this.players.every(p => p.isReady)
  }

  get currentRound() {
    if (this.rounds.length === 0) return undefined
    return this.rounds[this.rounds.length - 1]
  }

  startRound() {
    this.players.forEach(p => (p.isReady = false))
    this.rounds.push(new Round())
  }

  toJSON(): RoomModel {
    return {
      code: this.code,
      time: this.time,
      categories: this.categories,
      currentRound: this.rounds.length,
      players: this.players,
      maxPlayers: this.maxPlayers
    }
  }
}
