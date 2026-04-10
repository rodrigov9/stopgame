export class Player {
  readonly id: string
  name: string
  avatar: number
  score: number
  isConnected: boolean
  isReady: boolean

  constructor(name: string, avatar: number) {
    this.id = crypto.randomUUID()
    this.name = name
    this.avatar = avatar
    this.score = 0
    this.isConnected = false
    this.isReady = false
  }

  toJSON() {
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
