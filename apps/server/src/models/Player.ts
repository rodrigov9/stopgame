export class Player {
  public readonly id: string
  public name: string
  public avatar: number
  public score: number
  public isConnected: boolean

  constructor(name: string, avatar: number) {
    this.id = crypto.randomUUID()
    this.name = name
    this.avatar = avatar
    this.score = 0
    this.isConnected = false
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      avatar: this.avatar,
      score: this.score,
      isConnected: this.isConnected
    }
  }
}
