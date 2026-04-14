import { Room } from '@/models/Room.js'
import { Player } from '@/models/Player.js'

type ServerToClientEventMap = {
  initialData: [ReturnType<typeof Room.prototype.toJSON>]
  playerJoin: [ReturnType<typeof Player.prototype.toJSON>]
  playerUpdate: [ReturnType<typeof Player.prototype.toJSON>]
  playerLeave: [string]
}

export type ServerToClientEvents = {
  [event in keyof ServerToClientEventMap]: (
    ...args: ServerToClientEventMap[event]
  ) => void
}
