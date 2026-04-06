export class Player {
  public readonly id: string
  public name: string
  public avatar: number
  public score: number
  public socketId?: string

  constructor(name: string, avatar: number) {
    this.id = crypto.randomUUID()
    this.name = name
    this.avatar = avatar
    this.score = 0
  }

  connect(socketId: string) {
    this.socketId = socketId
  }

  disconnect() {
    this.socketId = undefined
  }

  get isConnected() {
    return this.socketId !== undefined
  }
}
