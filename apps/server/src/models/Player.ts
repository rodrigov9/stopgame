import { PlayerModel } from '@stopgame/schemas/player'

export class Player {
  readonly id: string
  name: string
  avatar: string
  score: number
  isConnected: boolean
  isReady: boolean

  constructor(id: string, name: string, avatar: string) {
    this.id = id
    this.name = name
    this.avatar = avatar
    this.score = 0
    this.isConnected = false
    this.isReady = false
  }

  toJSON(): PlayerModel {
    return {
      id: this.id,
      name: this.name,
      avatar: this.avatar,
      score: this.score,
      isConnected: this.isConnected,
      isReady: this.isReady
    }
  }
}
